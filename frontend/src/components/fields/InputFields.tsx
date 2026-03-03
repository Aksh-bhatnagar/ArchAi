import { useState, useEffect } from "react";
import Navbar from "../commons/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Home, MapPin, Settings } from "lucide-react";

import api from "@/api/api";
import {
  floorplanSchema,
  plotStepSchema,
  houseStepSchema,
  preferencesStepSchema,
} from "./floorplan.schema";
import { z } from "zod";

type BHKType = "1RK" | "1BHK" | "2BHK" | "3BHK" | "Custom";

// Helper to calculate required area (matching schema logic)
const calculateRequiredArea = (house: any, preferences: any) => {
  const BEDROOM_AREA = 120;
  const BATHROOM_AREA = 50;
  const KITCHEN_AREA = 100;
  const LIVING_AREA = 200;
  const CAR_PARKING_AREA = 180;
  const GARDEN_AREA = 150;
  const STORE_ROOM_AREA = 60;
  const CIRCULATION_FACTOR = 1.3;

  let totalArea = 0;
  totalArea += house.bedroom * BEDROOM_AREA;
  totalArea += house.bathroom * BATHROOM_AREA;
  totalArea += house.kitchen * KITCHEN_AREA;
  if (house.living) totalArea += LIVING_AREA;
  if (preferences.car_parking) totalArea += CAR_PARKING_AREA;
  if (preferences.garden) totalArea += GARDEN_AREA;
  if (preferences.store_room) totalArea += STORE_ROOM_AREA;

  return Math.ceil(totalArea * CIRCULATION_FACTOR);
};

const STEPS = ["Plot", "House", "Preferences"];

const STEP_ICONS = [MapPin, Home, Settings];

export default function InputFields() {
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [projectName, setProjectName] = useState("");

  const navigate = useNavigate();

  const [form, setForm] = useState({
    plot: {
      length: "",
      width: "",
      main_enterance: "North" as const,
    },
    house: {
      floor: 0,
      bhk_type: "2BHK" as BHKType,
      bedroom: 2,
      bathroom: 1,
      kitchen: 1,
      living: true,
    },
    preferences: {
      car_parking: false,
      pooja_room: false,
      garden: false,
      store_room: false,
    },
    vastu: false,
  });

  // Auto-update bedroom count when BHK type changes (except for Custom)
  useEffect(() => {
    if (form.house.bhk_type !== "Custom") {
      const bedroomMap: Record<string, number> = {
        "1RK": 0,
        "1BHK": 1,
        "2BHK": 2,
        "3BHK": 3,
      };
      const newBedrooms = bedroomMap[form.house.bhk_type] || 1;
      if (form.house.bedroom !== newBedrooms) {
        update("house.bedroom", newBedrooms);
      }
    }
  }, [form.house.bhk_type]);

  const validateStep = (currentStep: number): boolean => {
    setErrors({});
    try {
      if (currentStep === 0) {
        plotStepSchema.parse({ plot: form.plot });
      } else if (currentStep === 1) {
        houseStepSchema.parse({ house: form.house });
      } else if (currentStep === 2) {
        preferencesStepSchema.parse({
          preferences: form.preferences,
          vastu: form.vastu,
        });
      }
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          const path = err.path.join(".");
          newErrors[path] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const next = () => {
    if (validateStep(step)) {
      setStep((s) => Math.min(s + 1, STEPS.length - 1));
    }
  };

  const back = () => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 0));
  };

  const update = (path: string, value: any) => {
    setForm((prev) => {
      const copy = structuredClone(prev);
      path.split(".").reduce((obj: any, key, i, arr) => {
        if (i === arr.length - 1) obj[key] = value;
        return obj[key];
      }, copy);
      return copy;
    });

    // Clear error for this field when user starts typing
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[path];
      return newErrors;
    });
  };

  const handleGenerate = async () => {
    try {
      setLoading(true);

      // Validate entire form
      floorplanSchema.parse(form);

      const payload = {
        ...form,
        plot: {
          ...form.plot,
          length: Number(form.plot.length),
          width: Number(form.plot.width),
        },
      };

      const res = await api.post("/architech", {
        projectName: projectName || "Untitled",
        propertyData: payload,
      });

  navigate(`/view/${res.data.data.projectId}`);

    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          const path = err.path.join(".");
          newErrors[path] = err.message;
        });
        setErrors(newErrors);
      }
    } finally {
      setLoading(false);
    }
  };

  const isCustom = form.house.bhk_type === "Custom";

  // Calculate area metrics
  const plotArea =
    form.plot.length && form.plot.width
      ? Number(form.plot.length) * Number(form.plot.width)
      : 0;
  const requiredArea = calculateRequiredArea(form.house, form.preferences);
  const hasAreaError = requiredArea > plotArea;

  return (
    <>
      <Navbar mode="" setMode={""} />
      <div className="min-h-screen w-screen bg-linear-to-br p-4 flex items-start justify-center pt-40">
        <div className="w-full max-w-2xl">
          {/* Progress Bar - Fixed Position */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              {STEPS.map((stepName, idx) => {
                const Icon = STEP_ICONS[idx];
                const isActive = idx === step;
                const isCompleted = idx < step;

                return (
                  <div
                    key={stepName}
                    className="flex flex-col items-center flex-1"
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? "bg-blue-950 scale-110 shadow-md shadow-blue-500"
                          : isCompleted
                            ? "bg-blue-500 shadow-md"
                            : "bg-slate-700"
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 ${
                          isActive || isCompleted
                            ? "text-white"
                            : "text-slate-400"
                        }`}
                      />
                    </div>
                    <span
                      className={`text-sm mt-2 font-medium ${
                        isActive
                          ? "text-white"
                          : isCompleted
                            ? "text-white"
                            : "text-slate-500"
                      }`}
                    >
                      {stepName}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Progress Line */}
            <div className="relative h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-linear-to-r from-blue-400 to-blue-900 transition-all duration-500 ease-out"
                style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Form Card */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 shadow-2xl">
            <CardHeader className="border-b border-slate-700">
              <CardTitle className="text-2xl font-bold bg-white bg-clip-text text-transparent">
                {STEPS[step]}
              </CardTitle>
              <CardDescription className="text-slate-400">
                Step {step + 1} of {STEPS.length} - Configure your floor plan
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 pt-6">
              {/* STEP 1 – Plot */}
              {step === 0 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <Label className="text-slate-300 font-medium">
                    Project Name <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    placeholder="My Dream Home"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className={`bg-slate-900/50 border-slate-600 text-white `}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-slate-300 font-medium flex items-center gap-2">
                        Plot Length (ft)
                        <span className="text-red-400">*</span>
                      </Label>
                      <Input
                        placeholder="e.g., 40"
                        type="number"
                        value={form.plot.length}
                        onChange={(e) => update("plot.length", e.target.value)}
                        max={100}
                        min={0}
                        className={`bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20 ${
                          errors["plot.length"] ? "border-red-500" : ""
                        }`}
                      />
                      {errors["plot.length"] && (
                        <p className="text-red-400 text-sm flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors["plot.length"]}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-slate-300 font-medium flex items-center gap-2">
                        Plot Width (ft)
                        <span className="text-red-400">*</span>
                      </Label>
                      <Input
                        placeholder="e.g., 30"
                        type="number"
                        value={form.plot.width}
                        onChange={(e) => update("plot.width", e.target.value)}
                        max={100}
                        min={0}
                        className={`bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20 ${
                          errors["plot.width"] ? "border-red-500" : ""
                        }`}
                      />
                      {errors["plot.width"] && (
                        <p className="text-red-400 text-sm flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors["plot.width"]}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-300 font-medium">
                      Main Entrance Direction
                    </Label>
                    <Select
                      value={form.plot.main_enterance}
                      onValueChange={(v) => update("plot.main_enterance", v)}
                    >
                      <SelectTrigger className="bg-slate-900/50 border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500/20">
                        <SelectValue placeholder="Select Direction" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        {[
                          "North",
                          "South",
                          "East",
                          "West",
                          "North-East",
                          "North-West",
                          "South-East",
                          "South-West",
                        ].map((d) => (
                          <SelectItem
                            key={d}
                            value={d}
                            className="text-white hover:bg-slate-700 focus:bg-slate-700"
                          >
                            {d}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* STEP 2 – House */}
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="space-y-2">
                    <Label className="text-slate-300 font-medium">
                      BHK Type
                    </Label>
                    <Select
                      value={form.house.bhk_type}
                      onValueChange={(v) => update("house.bhk_type", v)}
                    >
                      <SelectTrigger className="bg-slate-900/50 border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500/20">
                        <SelectValue placeholder="Select BHK Type" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        {["1RK", "1BHK", "2BHK", "3BHK", "Custom"].map((b) => (
                          <SelectItem
                            key={b}
                            value={b}
                            className="text-white hover:bg-slate-700 focus:bg-slate-700"
                          >
                            {b}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-slate-300 font-medium">
                        Bedrooms
                      </Label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={form.house.bedroom}
                        onChange={(e) =>
                          update("house.bedroom", Number(e.target.value))
                        }
                        max={8}
                        min={0}
                        disabled={!isCustom}
                        className={`bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20 ${
                          !isCustom ? "opacity-50 cursor-not-allowed" : ""
                        } ${errors["house.bedroom"] ? "border-red-500" : ""}`}
                      />
                      {errors["house.bedroom"] && (
                        <p className="text-red-400 text-xs flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors["house.bedroom"]}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-slate-300 font-medium">
                        Bathrooms
                      </Label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={form.house.bathroom}
                        onChange={(e) =>
                          update("house.bathroom", Number(e.target.value))
                        }
                        max={4}
                        min={0}
                        disabled={!isCustom}
                        className={`bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20 ${
                          !isCustom ? "opacity-50 cursor-not-allowed" : ""
                        } ${errors["house.bathroom"] ? "border-red-500" : ""}`}
                      />
                      {errors["house.bathroom"] && (
                        <p className="text-red-400 text-xs flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors["house.bathroom"]}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-slate-300 font-medium">
                        Kitchens
                      </Label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={form.house.kitchen}
                        onChange={(e) =>
                          update("house.kitchen", Number(e.target.value))
                        }
                        max={3}
                        min={0}
                        disabled={!isCustom}
                        className={`bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20 ${
                          !isCustom ? "opacity-50 cursor-not-allowed" : ""
                        } ${errors["house.kitchen"] ? "border-red-500" : ""}`}
                      />
                      {errors["house.kitchen"] && (
                        <p className="text-red-400 text-xs flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors["house.kitchen"]}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                    <Checkbox
                      id="living-room"
                      checked={form.house.living}
                      onCheckedChange={(v) =>
                        update("house.living", v === true)
                      }
                      disabled={!isCustom}
                      className="border-slate-500 data-[state=checked]:bg-blue-500 justify-center items-center flex"
                    />
                    <Label
                      htmlFor="living-room"
                      className={`text-slate-300 cursor-pointer ${
                        !isCustom ? "opacity-50" : ""
                      }`}
                    >
                      Include Living Room
                    </Label>
                  </div>

                  {/* Area Error Warning */}
                  {plotArea > 0 && hasAreaError && (
                    <div className="mt-4 p-4 rounded-lg border bg-red-950/20 border-red-500/50">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 mt-0.5 text-red-400" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-red-400">
                            Area Insufficient
                          </p>
                          <p className="text-xs text-red-300 mt-1">
                            Required area ({requiredArea} sq ft) exceeds plot
                            area ({plotArea} sq ft)
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 3 – Preferences */}
              {step === 2 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="space-y-3">
                    {[
                      ["car_parking", "Car Parking"],
                      ["garden", "Garden"],
                      ["store_room", "Store Room"],
                    ].map(([key, label]) => (
                      <div
                        key={key}
                        className="flex items-center space-x-3 p-4 bg-slate-900/50 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors"
                      >
                        <Checkbox
                          id={key}
                          checked={
                            form.preferences[
                              key as keyof typeof form.preferences
                            ]
                          }
                          disabled={loading}
                          onCheckedChange={(v) =>
                            update(`preferences.${key}`, v === true)
                          }
                          className="border-slate-500 data-[state=checked]:bg-blue-500 justify-center items-center flex"
                        />
                        <Label
                          htmlFor={key}
                          className="text-slate-300 cursor-pointer flex-1"
                        >
                          {label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between pt-6 border-t border-slate-700">

                <Button
                  variant="ghost"
                  onClick={back}
                  disabled={loading}
                  className={`text-slate-300 hover:text-white hover:bg-slate-700 ${
                    step === 0 ? "invisible" : ""
                  }`}
                >
                  Back
                </Button>
                {step < 2 ? (
                  <Button onClick={next}>Next</Button>
                ) : (
                  <Button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="min-w-[140px]"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Generating...
                      </span>
                    ) : (
                      "Generate"
                    )}
                  </Button>
                )}
              </div>
              {
                loading && <span className="text-white">Please wait it may take few minutes...</span>
              }
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
