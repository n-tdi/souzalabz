export type ModelItem = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  url: string;        // link to your cults3d listing
  thumb: string;      // thumbnail URL (or local /public image)
  updated: string;    // ISO date
  downloads?: number; // optional if you scrape it later
};

export const MODELS: ModelItem[] = [
  {
    id: "p6-front-handle",
    title: "P6 3D Print Friendly Front Handle",
    description:
      "Redesigned for 3D printing: fewer voids, stronger internal structure, support-friendly.",
    tags: ["inmotion", "p6", "handle", "tpu"],
    url: "https://cults3d.com/en/3d-model/gadget/inmotion-p6-front-handle-3d-print-friendly", // replace
    thumb: "https://images.cults3d.com/ECSCdXMGeZVno1TH6EMOtZBUSVA=/516x516/filters:no_upscale():format(webp)/https://fbi.cults3d.com/uploaders/25927182/illustration-file/8fe84a69-f553-4186-9eb1-1b1e117cfe61/P6-Front-Handle-3D-Print-Friendly-4.png", // put an image in /public/thumbs
    updated: "2026-01-01",
    downloads: 0,
  },
];
