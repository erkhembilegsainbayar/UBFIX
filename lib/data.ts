export const categories = [
  "Pothole / Road",
  "Streetlight",
  "Trash",
  "Sidewalk",
  "Traffic Light",
  "Manhole",
  "Pedestrian Safety",
  "Other",
] as const;
export const districts = [
  "Bayangol",
  "Bayanzürkh",
  "Chingeltei",
  "Khan-Uul",
  "Nalaikh",
  "Songino Khairkhan",
  "Sükhbaatar",
  "Bagakhangai",
  "Baganuur",
];
export const statuses = [
  "Reported",
  "Verified",
  "Sent to Authority",
  "In Progress",
  "Fixed",
] as const;
export type Status = (typeof statuses)[number];
export type Profile = {
  id: string;
  username: string;
  role: "resident" | "admin";
};
export type Report = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  category: string;
  district: string;
  latitude: number;
  longitude: number;
  image_url: string;
  status: Status;
  created_at: string;
  updated_at: string;
  vote_count: number;
  location_description: string;
  is_demo: boolean;
  rejected: boolean;
};
export type Comment = {
  id: string;
  report_id: string;
  user_id: string;
  body: string;
  created_at: string;
};
export type Update = {
  id: string;
  report_id: string;
  user_id: string;
  body: string;
  image_url: string;
  created_at: string;
};
export const photos = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Pothole_in_the_street.jpg/1280px-Pothole_in_the_street.jpg",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Streetlight_in_Frankfurt_am_Main_at_night_2021-04-04_01.jpg?width=1280",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Overflowing_Bin_Talpiot_01.jpg/1280px-Overflowing_Bin_Talpiot_01.jpg",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Icy_sidewalk_on_S%C3%B6rn%C3%A4isten_rantatie_in_January_2022.jpg?width=1280",
];
const items: [
  string,
  string,
  string,
  number,
  number,
  number,
  Status,
  number,
][] = [
  [
    "Large pothole on Peace Avenue",
    "Pothole / Road",
    "Sükhbaatar",
    47.9169,
    106.9154,
    84,
    "Verified",
    0,
  ],
  [
    "Streetlights not working near Zaisan",
    "Streetlight",
    "Khan-Uul",
    47.8863,
    106.9168,
    51,
    "In Progress",
    1,
  ],
  [
    "Trash piling up near 13th District",
    "Trash",
    "Bayanzürkh",
    47.9152,
    106.9575,
    39,
    "Reported",
    2,
  ],
  [
    "Dangerous icy sidewalk",
    "Sidewalk",
    "Chingeltei",
    47.9329,
    106.9061,
    32,
    "Reported",
    3,
  ],
  [
    "Road surface damaged in 3rd Microdistrict",
    "Pothole / Road",
    "Bayangol",
    47.9225,
    106.8669,
    27,
    "Sent to Authority",
    0,
  ],
  [
    "Overflowing bins near Narantuul market",
    "Trash",
    "Bayanzürkh",
    47.9037,
    106.9478,
    24,
    "Verified",
    2,
  ],
  [
    "Street lighting restored in Yarmag",
    "Streetlight",
    "Khan-Uul",
    47.879,
    106.847,
    19,
    "Fixed",
    1,
  ],
  [
    "Crossing needs attention near the square",
    "Pedestrian Safety",
    "Sükhbaatar",
    47.9218,
    106.9218,
    17,
    "Reported",
    0,
  ],
  [
    "Sidewalk cleared in 4th Microdistrict",
    "Sidewalk",
    "Bayangol",
    47.914,
    106.865,
    22,
    "Fixed",
    3,
  ],
];
export const seedReports: Report[] = items.map((r, i) => ({
  id: `demo-${i + 1}`,
  user_id: "demo-neighbor",
  title: r[0],
  category: r[1],
  district: r[2],
  latitude: r[3],
  longitude: r[4],
  vote_count: r[5],
  status: r[6],
  image_url: photos[r[7]],
  description:
    i === 0
      ? "A deep pothole in the eastbound lane of Peace Avenue is making drivers swerve into adjacent traffic. It fills with water after rain and is difficult to see at night. Please inspect and repair the road surface."
      : `Residents have noticed this ${r[1].toLowerCase()} issue in the ${r[2]} area. It affects people walking and commuting nearby. An inspection and maintenance visit would help make the neighborhood safer.`,
  location_description: r[0].replace(/^.*?(near|in|on) /, ""),
  created_at: `2026-09-${String(11 - i).padStart(2, "0")}T07:30:00Z`,
  updated_at: `2026-09-${String(12 - Math.floor(i / 2)).padStart(2, "0")}T08:00:00Z`,
  is_demo: true,
  rejected: false,
}));
export function dateLabel(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
export const categoryColor = (category: string) =>
  category === "Streetlight"
    ? "#e6a12b"
    : category === "Trash"
      ? "#8a65c8"
      : category === "Sidewalk"
        ? "#488eac"
        : category === "Pedestrian Safety"
          ? "#d54f73"
          : "#ed5937";
