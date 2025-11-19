import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";   // shadcn button
import { Textarea } from "@/components/ui/textarea"; // shadcn textarea

export default function Floorplan() {
  const [jsonInput, setJsonInput] = useState(`{
  "plot": { "length": 60, "width": 40, "main_enterance": "North" },
  "house": {
    "floor": 0,
    "bhk_type": "2BHK",
    "bedroom": 2,
    "bathroom": 1,
    "kitchen": 1,
    "living": true
  },
  "preferences": {
    "car_parking": true,
    "pooja_room": false,
    "garden": false,
    "store_room": false
  },
  "vastu": false
}`);
  
  const [svgData, setSvgData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateFloorplan = async () => {
    setLoading(true);
    setError("");
    setSvgData(null);

    try {
      const parsedJSON = JSON.parse(jsonInput);

      const res = await axios.post(
        "http://localhost:8080/api/v1/architech/floorplan",
        parsedJSON,
        {
          headers: { "Content-Type": "application/json" }
        }
      );

      setSvgData(res.data.data); // your controller returns: response.text
    } catch (err) {
      console.error(err);
      setError("Failed to generate floorplan.");
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">AI Floorplan Generator</h1>

      {/* JSON Input */}
      <label className="font-semibold">Enter Property JSON:</label>
      <Textarea
        className="mb-4 h-48"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />

      {/* Submit */}
      <Button onClick={generateFloorplan} disabled={loading}>
        {loading ? "Generating..." : "Generate Floorplan"}
      </Button>

      {/* Error */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* SVG Output */}
      {svgData && (
        <div className="mt-6 border rounded-lg p-4 bg-white shadow">
          <h2 className="font-semibold mb-2">Generated Floorplan:</h2>

          {/* render raw SVG safely */}
          <div
            dangerouslySetInnerHTML={{ __html: svgData }}
            className="w-full overflow-auto"
          />
        </div>
      )}
    </div>
  );
}
