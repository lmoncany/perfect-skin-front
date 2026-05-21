import type { Brand } from "./types";

export interface BrandCatalogEntry extends Brand {
  aliases: string[];
}

export const brandCatalog: BrandCatalogEntry[] = [
  {
    slug: "la-roche-posay",
    name: "La Roche-Posay",
    description:
      "Marque française pionnière en dermocosmétique pour peaux sensibles et réactives.",
    aliases: ["la roche posay", "larocheposay"],
  },
  {
    slug: "caudalie",
    name: "Caudalie",
    description:
      "Marque française luxe basée sur les pouvoirs du raisin rouge et des antioxydants.",
    aliases: ["caudali", "caudalie"],
  },
  {
    slug: "nuxe",
    name: "Nuxe",
    description:
      "Marque française botaniste proposant des produits naturels et efficaces.",
    aliases: [],
  },
  {
    slug: "avene",
    name: "Avène",
    description:
      "Laboratoire dermatologique français spécialisé dans l'eau thermale et peaux sensibles.",
    aliases: ["avene"],
  },
  {
    slug: "vichy",
    name: "Vichy",
    description:
      "Marque française leader en soins pour peaux problématiques avec eau minérale thermale.",
    aliases: [],
  },
  {
    slug: "bioderma",
    name: "Bioderma",
    description:
      "Marque française créée par dermatologues pour des soins efficaces et tolérants.",
    aliases: [],
  },
  {
    slug: "clarins",
    name: "Clarins",
    description:
      "Marque française de luxe innovante en soins naturels et phytothérapie.",
    aliases: [],
  },
  {
    slug: "lancome",
    name: "Lancôme",
    description:
      "Marque française de prestige spécialisée en skincare luxe et anti-âge.",
    aliases: ["lancome", "lancôme"],
  },
  {
    slug: "estee-lauder",
    name: "Estée Lauder",
    description:
      "Marque internationale de prestige leader en soins premium et rajeunissants.",
    aliases: ["estee lauder", "estee lauder"],
  },
  {
    slug: "kiehls",
    name: "Kiehl's",
    description:
      "Marque américaine de luxe pionnière en ingrédients naturels et actifs efficaces.",
    aliases: ["kiehl", "kiehl's", "kiehls"],
  },
  {
    slug: "the-ordinary",
    name: "The Ordinary",
    description:
      "Marque accessible proposant des actifs purs et concentrés à prix mini.",
    aliases: [],
  },
  {
    slug: "paulas-choice",
    name: "Paula's Choice",
    description:
      "Marque scientifique américaine reconnue pour ses sérums et traitements puissants.",
    aliases: ["paulas choice", "paula's choice"],
  },
];

export function findBrandCatalogEntry(slug: string): BrandCatalogEntry | null {
  return brandCatalog.find(brand => brand.slug === slug) ?? null;
}
