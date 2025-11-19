import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Floorplan() {
  // Plot details
  const [plotLength, setPlotLength] = useState(60);
  const [plotWidth, setPlotWidth] = useState(40);
  const [mainEntrance, setMainEntrance] = useState("North");

  // House details
  const [floors, setFloors] = useState(0);
  const [bhkType, setBhkType] = useState("2BHK");
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(1);
  const [kitchens, setKitchens] = useState(1);
  const [hasLiving, setHasLiving] = useState(true);

  // Preferences
  const [carParking, setCarParking] = useState(true);
  const [poojaRoom, setPoojaRoom] = useState(false);
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
          main_enterance: mainEntrance
        },
        house: {
          floor: Number(floors),
          bhk_type: bhkType,
          bedroom: Number(bedrooms),
          bathroom: Number(bathrooms),
          kitchen: Number(kitchens),
          living: hasLiving
        },
        preferences: {
          car_parking: carParking,
          pooja_room: poojaRoom,
          garden: garden,
          store_room: storeRoom
        },
        vastu: vastu
      };

      const res = await fetch(
        "http://localhost:8080/api/v1/architech/floorplan",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
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
        setError(String(err) || "Failed to generate floorplan. Please check your inputs.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">AI Floorplan Generator</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Section */}
        <div className="space-y-6">
          {/* Plot Details */}
          <Card>
            <CardHeader>
              <CardTitle>Plot Details</CardTitle>
              <CardDescription>Enter the dimensions of your plot</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="length">Length (ft)</Label>
                  <Input
                    id="length"
                    type="number"
                    value={plotLength}
                    onChange={(e) => setPlotLength(Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="width">Width (ft)</Label>
                  <Input
                    id="width"
                    type="number"
                    value={plotWidth}
                    onChange={(e) => setPlotWidth(Number(e.target.value))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="entrance">Main Entrance</Label>
                <Select value={mainEntrance} onValueChange={setMainEntrance}>
                  <SelectTrigger id="entrance">
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
          <Card>
            <CardHeader>
              <CardTitle>House Details</CardTitle>
              <CardDescription>Configure your house layout</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="floors">Number of Floors</Label>
                  <Input
                    id="floors"
                    type="number"
                    min="0"
                    value={floors}
                    onChange={(e) => setFloors(Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="bhk">BHK Type</Label>
                  <Select value={bhkType} onValueChange={setBhkType}>
                    <SelectTrigger id="bhk">
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
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input
                    id="bedrooms"
                    type="number"
                    min="1"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Input
                    id="bathrooms"
                    type="number"
                    min="1"
                    value={bathrooms}
                    onChange={(e) => setBathrooms(Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="kitchens">Kitchens</Label>
                  <Input
                    id="kitchens"
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
                />
                <Label htmlFor="living" className="cursor-pointer">Include Living Room</Label>
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card>
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
                />
                <Label htmlFor="parking" className="cursor-pointer">Car Parking</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="pooja"
                  checked={poojaRoom}
                  onCheckedChange={(checked) => setPoojaRoom(checked === true)}
                />
                <Label htmlFor="pooja" className="cursor-pointer">Pooja Room</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="garden"
                  checked={garden}
                  onCheckedChange={(checked) => setGarden(checked === true)}
                />
                <Label htmlFor="garden" className="cursor-pointer">Garden</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="store"
                  checked={storeRoom}
                  onCheckedChange={(checked) => setStoreRoom(checked === true)}
                />
                <Label htmlFor="store" className="cursor-pointer">Store Room</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="vastu"
                  checked={vastu}
                  onCheckedChange={(checked) => setVastu(checked === true)}
                />
                <Label htmlFor="vastu" className="cursor-pointer">Follow Vastu Principles</Label>
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={generateFloorplan}
            disabled={loading}
            className="w-full"
            size="lg"
          >
            {loading ? "Generating..." : "Generate Floorplan"}
          </Button>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
        </div>

        {/* SVG Output Section */}
        <div>
          {svgData ? (
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Generated Floorplan</CardTitle>
                <CardDescription>Your AI-generated floor plan design</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  dangerouslySetInnerHTML={{ __html: svgData }}
                  className="w-full overflow-auto bg-gray-50 rounded-lg p-4"
                />
              </CardContent>
            </Card>
          ) : (
            <Card className="sticky top-6">
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
                      d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z"
                    />
                  </svg>
                  <p className="text-lg font-medium">No floorplan yet</p>
                  <p className="text-sm mt-1">Fill the form and click generate</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}