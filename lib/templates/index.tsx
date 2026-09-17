import { ComponentType } from "react";
import type { TemplatePage, TemplateId, WebsiteData } from "@/types/website";

import Website1 from "@/components/templates/website1";
import Website2 from "@/components/templates/website2";
import Website3 from "@/components/templates/website3";
import Website4 from "@/components/templates/website4";

export type MultiTemplateConfig = {
  type: "multi";
  name: string;
  description: string;
  component: ComponentType<{
    data: WebsiteData;
    page?: TemplatePage;
  }>;
};
export const templates: Record<string, MultiTemplateConfig> = {
  website1: {
    type: "multi",
    name: "Website 1",
    description: "Business website design 1.",
    component: Website1,
  },

  website2: {
    type: "multi",
    name: "Website 2",
    description: "Business website design 2.",
    component: Website2,
  },

  website3: {
    type: "multi",
    name: "Website 3",
    description: "Business website design 3.",
    component: Website3,
  },

    website4: {
    type: "multi",
    name: "Website 4",
    description: "Business website design 4.",
    component: Website4,
  },
};

let lastTemplateId: TemplateId | null = null;

export function getRandomTemplateId(): TemplateId {
  const ids = Object.keys(templates) as TemplateId[];

  if (ids.length === 0) {
    throw new Error("No templates configured");
  }

  if (ids.length === 1) {
    return ids[0];
  }

  const availableIds = ids.filter((id) => id !== lastTemplateId);

  const selected =
    availableIds[Math.floor(Math.random() * availableIds.length)];

  lastTemplateId = selected;

  console.log("AVAILABLE TEMPLATES:", ids);
  console.log("SELECTED TEMPLATE:", selected);

  return selected;
}