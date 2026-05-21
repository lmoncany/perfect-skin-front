export const SITE = {
  website: "https://perfect-skin.fr/",
  author: "Perfect Skin",
  profile: "https://perfect-skin.fr/",
  desc: "Le site de référence dans les soins cosmétiques — guides, avis et comparatifs pour votre rituel beauté.",
  title: "Perfect Skin",
  tagline: "Le site de référence dans les soins cosmétiques",
  ogImage: "og-default.jpg",
  lightAndDarkMode: true,
  postPerIndex: 8,
  postPerPage: 12,
  scheduledPostMargin: 15 * 60 * 1000,
  showArchives: true,
  showBackButton: true,
  editPost: {
    enabled: false,
    text: "",
    url: "",
  },
  dynamicOgImage: false,
  dir: "ltr",
  lang: "fr",
  timezone: "Europe/Paris",
  // For Organization structured data
  orgName: "Perfect Skin",
  orgEmail: "contact@perfect-skin.fr",
  orgSameAs: [] as string[], // fill with Pinterest/Facebook/Instagram URLs when ready
} as const;

export const MERCHANT_LABELS: Record<string, string> = {
  amazon: "Voir sur Amazon",
  sephora: "Voir sur Sephora",
  marionnaud: "Voir sur Marionnaud",
  nocibe: "Voir sur Nocibé",
  other: "Voir le produit",
};
