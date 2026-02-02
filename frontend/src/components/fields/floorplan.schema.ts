import { z } from "zod";

/* =========================
   Plot schema
========================= */
const plotSchema = z.object({
  length: z
    .string()
    .min(1, "Plot length is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Plot length must be greater than 0",
    })
    .refine((val) => Number(val) <= 100, {
      message: "Plot length cannot exceed 100ft",
    }),
  width: z
    .string()
    .min(1, "Plot width is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Plot width must be greater than 0",
    })
    .refine((val) => Number(val) <= 100, {
      message: "Plot width cannot exceed 100ft",
    }),
  main_enterance: z.enum([
    "North",
    "South",
    "East",
    "West",
    "North-East",
    "North-West",
    "South-East",
    "South-West",
  ]),
});

/* =========================
   House schema
========================= */
const houseSchema = z.object({
  floor: z.number().min(0).max(10),
  bhk_type: z.enum(["1RK", "1BHK", "2BHK", "3BHK", "Custom"]),
  bedroom: z.number().min(0).max(8),
  bathroom: z.number().min(0).max(4),
  kitchen: z.number().min(0).max(3),
  living: z.boolean(),
});

/* =========================
   Preferences schema
========================= */
const preferencesSchema = z.object({
  car_parking: z.boolean(),
  pooja_room: z.boolean(),
  garden: z.boolean(),
  store_room: z.boolean(),
});

/* =========================
   Area calculation helper
========================= */
const calculateMinimumArea = (
  house: z.infer<typeof houseSchema>,
  preferences: z.infer<typeof preferencesSchema>
) => {
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

/* =========================
   Main floorplan schema
========================= */
export const floorplanSchema = z
  .object({
    plot: plotSchema,
    house: houseSchema,
    preferences: preferencesSchema,
    vastu: z.boolean(),
  })

  // Bedroom count must match BHK type (non-custom)
  .refine(
    (data) => {
      if (data.house.bhk_type !== "Custom") {
        const expectedBedrooms: Record<
          Exclude<z.infer<typeof houseSchema>["bhk_type"], "Custom">,
          number
        > = {
          "1RK": 0,
          "1BHK": 1,
          "2BHK": 2,
          "3BHK": 3,
        };

        return data.house.bedroom === expectedBedrooms[data.house.bhk_type];
      }
      return true;
    },
    {
      message: "Bedroom count should match BHK type",
      path: ["house", "bedroom"],
    }
  )

  // Area + utilization validation (dynamic messages → superRefine)
  .superRefine((data, ctx) => {
    const plotArea =
      Number(data.plot.length) * Number(data.plot.width);
    const minRequiredArea = calculateMinimumArea(
      data.house,
      data.preferences
    );

    if (plotArea < minRequiredArea) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["plot"],
        message: `Plot area (${plotArea} sq ft) is too small. Minimum required: ${minRequiredArea} sq ft for ${data.house.bedroom} bedroom(s), ${data.house.bathroom} bathroom(s), ${data.house.kitchen} kitchen(s)${
          data.house.living ? ", living room" : ""
        }${data.preferences.car_parking ? ", car parking" : ""}${
          data.preferences.garden ? ", garden" : ""
        }${data.preferences.store_room ? ", store room" : ""}. Please increase plot size or reduce room requirements.`,
      });
    }

    const utilization = (minRequiredArea / plotArea) * 100;

    if (utilization > 85) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["plot"],
        message: `Warning: Plot utilization is ${utilization.toFixed(
          1
        )}% (very tight). Consider a larger plot or fewer rooms for comfortable living space.`,
      });
    }
  });

/* =========================
   Step schemas
========================= */
export const plotStepSchema = z.object({
  plot: plotSchema,
});

export const houseStepSchema = z.object({
  house: houseSchema,
});

export const preferencesStepSchema = z.object({
  preferences: preferencesSchema,
  vastu: z.boolean(),
});

/* =========================
   Type exports
========================= */
export type FloorplanFormData = z.infer<typeof floorplanSchema>;
export type PlotData = z.infer<typeof plotSchema>;
export type HouseData = z.infer<typeof houseSchema>;
export type PreferencesData = z.infer<typeof preferencesSchema>;
