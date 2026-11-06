import type { MetadataRoute } from "next";
import { profile } from "@/content/site";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${profile.siteUrl}/`, changeFrequency: "monthly", priority: 1 }];
}
