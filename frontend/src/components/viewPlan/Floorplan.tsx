import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Home } from "lucide-react";
import { redirect } from "react-router-dom";

export default function Floorplan() {
  // Plot details
  const [plotLength, setPlotLength] = useState(0);
  const [plotWidth, setPlotWidth] = useState(0);
  const [mainEntrance, setMainEntrance] = useState("North");

  // House details
  const [floors, setFloors] = useState(0);
  // const [bhkType, setBhkType] = useState("2BHK");
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(1);
  const [kitchens, setKitchens] = useState(1);
  const [hasLiving, setHasLiving] = useState(true);

  // Preferences
  const [carParking, setCarParking] = useState(false);
  const [garden, setGarden] = useState(false);
  const [storeRoom, setStoreRoom] = useState(false);
  const [vastu, setVastu] = useState(false);

  // UI state
  const [svgData, setSvgData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateFloorplan = async () => {
    setLoading(true);
    setError("");
    setSvgData(null);

    try {
      const payload = {
        plot: {
          length: Number(plotLength),
          width: Number(plotWidth),
          main_enterance: mainEntrance,
        },
        house: {
          floor: Number(floors),
          // bhk_type: bhkType,
          bedroom: Number(bedrooms),
          bathroom: Number(bathrooms),
          kitchen: Number(kitchens),
          living: hasLiving,
        },
        preferences: {
          car_parking: carParking,
          garden: garden,
          store_room: storeRoom,
        },
        vastu: vastu,
      };

      const res = await fetch(
        "http://localhost:8080/api/v1/architech/floorplan",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setSvgData(data.data);
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          String(err) ||
            "Failed to generate floorplan. Please check your inputs."
        );
      }
    }

    setLoading(false);
  };

  return (
  <div className="h-screen w-screen flex flex-col">

    {/* Main Body (Sidebar + Output) */}
    <div className="flex flex-1 overflow-hidden">

      {/* ------- LEFT SIDEBAR FORM ------- */}
      <div className="w-1/3 bg-gray-900 text-white p-4 overflow-y-auto space-y-4 flex flex-col justify-between">

        {/* Plot Details */}
        <Card className="bg-gray-800 text-white">
          <CardHeader>
            <CardTitle>Plot Details</CardTitle>
            <CardDescription>Enter the dimensions of your plot</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <Label htmlFor="length" className="pb-2">Length (ft)</Label>
                <Input
                  id="length"
                  type="number"
                  value={plotLength} 
                  onChange={(e) => setPlotLength(Number(e.target.value))}
                />
              </div>

              <div>
                <Label htmlFor="width" className="pb-2">Width (ft)</Label>
                <Input
                  id="width"
                  type="number"
                  value={plotWidth}
                  onChange={(e) => setPlotWidth(Number(e.target.value))}
                />
              </div>
            </div>

            <div>
              <Label className="py-2 px-2">Main Entrance</Label>
              <Select value={mainEntrance} onValueChange={setMainEntrance}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="North">North</SelectItem>
                  <SelectItem value="South">South</SelectItem>
                  <SelectItem value="East">East</SelectItem>
                  <SelectItem value="West">West</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* House Details */}
        <Card className="bg-gray-800 text-white">
          <CardHeader>
            <CardTitle>House Details</CardTitle>
            <CardDescription>Configure your house layout</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <Label htmlFor="floors" className="pb-2">Number of Floors</Label>
                <Input
                  id="floors"
                  type="number"
                  min="0"
                  value={floors}
                  onChange={(e) => setFloors(Number(e.target.value))}
                />
              </div>

              {/* <div>
                <Label htmlFor="bhk">BHK Type</Label>
                <Select value={bhkType} onValueChange={setBhkType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1BHK">1BHK</SelectItem>
                    <SelectItem value="2BHK">2BHK</SelectItem>
                    <SelectItem value="3BHK">3BHK</SelectItem>
                    <SelectItem value="4BHK">4BHK</SelectItem>
                    <SelectItem value="5BHK">5BHK</SelectItem>
                  </SelectContent>
                </Select>
              </div> */}
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label className="pb-2">Bedrooms</Label>
                <Input
                  type="number"
                  min="1"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(Number(e.target.value))}
                />
              </div>
              <div>
                <Label className="pb-2">Bathrooms</Label>
                <Input
                  type="number"
                  min="1"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(Number(e.target.value))}
                />
              </div>
              <div>
                <Label className="pb-2">Kitchens</Label>
                <Input
                  type="number"
                  min="1"
                  value={kitchens}
                  onChange={(e) => setKitchens(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="living"
                checked={hasLiving}
                onCheckedChange={(checked) => setHasLiving(checked === true)}
                className="flex justify-center items-center"
              />
              <Label htmlFor="living">Include Living Room</Label>
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card className="bg-gray-800 text-white">
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>Select additional features</CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="parking"
                checked={carParking}
                onCheckedChange={(checked) => setCarParking(checked === true)}
                className="flex justify-center items-center"
              />
              <Label htmlFor="parking">Car Parking</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="garden"
                checked={garden}
                onCheckedChange={(checked) => setGarden(checked === true)}
                className="flex justify-center items-center"
              />
              <Label htmlFor="garden">Garden</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="store"
                checked={storeRoom}
                onCheckedChange={(checked) => setStoreRoom(checked === true)}
                className="flex justify-center items-center"
              />
              <Label htmlFor="store">Store Room</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="vastu"
                checked={vastu}
                onCheckedChange={(checked) => setVastu(checked === true)}
                className="flex justify-center items-center"
                
              />
              <Label htmlFor="vastu">Follow Vastu Principles</Label>
            </div>
          </CardContent>
        </Card>

        {/* Generate Button */}
        <Button
          onClick={generateFloorplan}
          disabled={loading}
          variant={"default"}
          className="w-half mt-2 text-white !bg-gray-800 rounded-2xl"
        >
          {loading ? "Generating..." : "Generate Floorplan"}
        </Button>

        {error && (
          <div className="p-3 bg-red-200 text-red-800 rounded-lg text-sm">
            {error}
          </div>
        )}
      </div>

      {/* ------- RIGHT OUTPUT AREA ------- */}
      <div className="flex-1 bg-gray-100 overflow-y-auto">
           {/* Header */}
    <div className="bg-gray-900 p-4 mb-50 shadow-md flex justify-center">
      <h1 className="text-3xl font-bold text-white">Floorplan Generator</h1>
    </div>
        {svgData ? (
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>Generated Floorplan</CardTitle>
              <CardDescription>Your AI-generated design</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                dangerouslySetInnerHTML={{ __html: svgData }}
                className="w-full bg-white rounded-lg p-4 shadow overflow-auto"
              />
            </CardContent>
          </Card>
        ) : (
          <Card className="max-w-3xl mx-auto">
            <CardContent className="flex items-center justify-center h-96">
              <div className="text-center text-gray-400">
                <svg
                  className="mx-auto h-16 w-16 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 5h4v7H4zM14 5h4v7h-4zM4 16h4v3H4zM14 16h4v3h-4z"
                  />
                </svg>
                <p className="text-lg font-medium">No floorplan yet</p>
                <p className="text-sm">Fill the form and click generate</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  </div>
);

}
