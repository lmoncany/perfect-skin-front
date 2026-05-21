export interface MockPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  modified: string;
  author: { name: string; slug: string; avatar?: string };
  featuredImage?: { url: string; alt: string; width: number; height: number };
  categories: string[];
  tags: string[];
  brands?: string[];
  seo: {
    title: string;
    description: string;
    canonicalUrl: string;
    openGraph: { title: string; description: string; image?: string; type: "article" };
    jsonLd: string;
  };
  affiliateProducts?: Array<{
    name: string;
    brand: string;
    merchant: "amazon" | "sephora" | "marionnaud" | "nocibe";
    affiliateUrl: string;
    price: string;
    image: string;
    pros: string[];
    cons: string[];
  }>;
}

export interface MockCategory {
  slug: string;
  name: string;
  description: string;
  count: number;
}

export interface MockTag {
  slug: string;
  name: string;
  count: number;
}

export interface MockBrand {
  slug: string;
  name: string;
  description: string;
  logo?: string;
}

export const mockCategories: MockCategory[] = [
  {
    slug: "beaute",
    name: "Beauté",
    description: "Soins de la peau, maquillage et cosmétiques pour sublimer votre beauté naturelle.",
    count: 15,
  },
  {
    slug: "bien-etre",
    name: "Bien-être",
    description: "Conseils de wellness, nutrition et rituel beauté holistique pour votre bien-être.",
    count: 10,
  },
  {
    slug: "tendances",
    name: "Tendances",
    description: "Les dernières tendances beauté, ingrédients phares et innovations cosmétiques.",
    count: 8,
  },
  {
    slug: "top-marques",
    name: "Top Marques",
    description: "Guide des meilleures marques beauté françaises et internationales.",
    count: 5,
  },
  {
    slug: "blog",
    name: "Blog",
    description: "Articles éditoriaux, conseils experts et histoires inspirantes.",
    count: 5,
  },
];

export const mockTags: MockTag[] = [
  { slug: "serum", name: "Sérum", count: 8 },
  { slug: "vitamine-c", name: "Vitamine C", count: 6 },
  { slug: "peau-seche", name: "Peau sèche", count: 7 },
  { slug: "anti-age", name: "Anti-âge", count: 9 },
  { slug: "retinol", name: "Rétinol", count: 5 },
  { slug: "acide-hyaluronique", name: "Acide hyaluronique", count: 8 },
  { slug: "niacinamide", name: "Niacinamide", count: 4 },
  { slug: "spf-protection", name: "SPF Protection", count: 6 },
  { slug: "peau-sensible", name: "Peau sensible", count: 7 },
  { slug: "peau-mixte", name: "Peau mixte", count: 5 },
  { slug: "hydratation", name: "Hydratation", count: 9 },
  { slug: "acne-imperfections", name: "Acné & imperfections", count: 6 },
  { slug: "eclat", name: "Éclat", count: 5 },
  { slug: "firmete", name: "Fermeté", count: 4 },
  { slug: "contour-des-yeux", name: "Contour des yeux", count: 5 },
  { slug: "masque-visage", name: "Masque visage", count: 4 },
  { slug: "creme-nuit", name: "Crème de nuit", count: 5 },
  { slug: "exfoliant", name: "Exfoliant", count: 3 },
  { slug: "routine-matin", name: "Routine matin", count: 6 },
  { slug: "routine-soir", name: "Routine soir", count: 5 },
  { slug: "bio-naturel", name: "Bio & naturel", count: 7 },
  { slug: "minimaliste", name: "Skincare minimaliste", count: 4 },
];

export const mockBrands: MockBrand[] = [
  {
    slug: "la-roche-posay",
    name: "La Roche-Posay",
    description: "Marque française pionnière en dermocosmétique pour peaux sensibles et réactives.",
  },
  {
    slug: "caudalie",
    name: "Caudalie",
    description: "Marque française luxe basée sur les pouvoirs du raisin rouge et des antioxydants.",
  },
  {
    slug: "nuxe",
    name: "Nuxe",
    description: "Marque française botaniste proposant des produits naturels et efficaces.",
  },
  {
    slug: "avene",
    name: "Avène",
    description: "Laboratoire dermatologique français spécialisé dans l'eau thermale et peaux sensibles.",
  },
  {
    slug: "vichy",
    name: "Vichy",
    description: "Marque française leader en soins pour peaux problématiques avec eau minérale thermale.",
  },
  {
    slug: "bioderma",
    name: "Bioderma",
    description: "Marque française créée par dermatologues pour des soins efficaces et tolérants.",
  },
  {
    slug: "clarins",
    name: "Clarins",
    description: "Marque française de luxe innovante en soins naturels et phytothérapie.",
  },
  {
    slug: "lancome",
    name: "Lancôme",
    description: "Marque française de prestige spécialisée en skincare luxe et anti-âge.",
  },
  {
    slug: "estee-lauder",
    name: "Estée Lauder",
    description: "Marque internationale de prestige leader en soins premium et rajeunissants.",
  },
  {
    slug: "kiehls",
    name: "Kiehl's",
    description: "Marque américaine de luxe pionnière en ingrédients naturels et actifs efficaces.",
  },
  {
    slug: "the-ordinary",
    name: "The Ordinary",
    description: "Marque accessible proposant des actifs purs et concentrés à prix mini.",
  },
  {
    slug: "paulas-choice",
    name: "Paula's Choice",
    description: "Marque scientifique américaine reconnue pour ses sérums et traitements puissants.",
  },
];

export const mockPosts: MockPost[] = [
  {
    id: "cG9zdDoxMjM=",
    slug: "les-5-meilleurs-serums-vitamine-c-2026",
    title: "Les 5 meilleurs sérums vitamine C en 2026",
    excerpt:
      "Découvrez notre sélection des meilleurs sérums vitamine C pour un teint éclatant et unifié. Ces concentrés d'énergie transforment votre peau en quelques semaines.",
    content: `<h2>Pourquoi choisir un sérum vitamine C ?</h2>
<p>La vitamine C est <b>l'antioxydant incontournable</b> pour une peau lumineuse et protégée. En sérum, elle pénètre profondément et offre des résultats visibles rapidement. Elle booste la production de collagène, unifie le teint et protège contre les radicaux libres.</p>

<h2>Nos critères de sélection</h2>
<p>Nous avons testé plus de 30 produits selon leur <b>stabilité, concentration, texture et résultats visibles</b>. Seuls les meilleurs sérums vitamine C du marché français figurent dans ce guide.</p>

<h2>Pourquoi ces sérums se démarquent</h2>
<p>Chacun de nos choix offre une formule innovante, une concentration efficace et surtout des résultats prouvés. La vitamine C doit être <b>stable et concentrée</b> pour transformer votre peau. Notre sélection garantit qualité et efficacité pour tous les types de peaux.</p>`,
    date: "2026-03-15",
    modified: "2026-03-20",
    author: { name: "Camille Laurent", slug: "camille-laurent" },
    featuredImage: {
      url: "https://picsum.photos/seed/serums-vitamine-c/1200/675",
      alt: "Sérums vitamine C - sélection 2026",
      width: 1200,
      height: 675,
    },
    categories: ["beaute", "tendances"],
    tags: ["serum", "vitamine-c", "eclat"],
    brands: ["the-ordinary", "la-roche-posay", "caudalie"],
    seo: {
      title: "Meilleurs sérums vitamine C 2026 | Perfect Skin",
      description:
        "Découvrez les 5 meilleurs sérums vitamine C pour un teint éclatant. Sélection expert, avis détaillés et comparatif complet.",
      canonicalUrl: "https://perfect-skin.fr/les-5-meilleurs-serums-vitamine-c-2026",
      openGraph: {
        title: "Les 5 meilleurs sérums vitamine C en 2026",
        description:
          "Notre sélection des meilleurs sérums vitamine C pour transformer votre peau.",
        image: "https://picsum.photos/seed/serums-vitamine-c/1200/675",
        type: "article",
      },
      jsonLd: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Les 5 meilleurs sérums vitamine C en 2026",
        image: "https://picsum.photos/seed/serums-vitamine-c/1200/675",
        datePublished: "2026-03-15",
        author: { "@type": "Person", name: "Camille Laurent" },
      }),
    },
    affiliateProducts: [
      {
        name: "Vitamin C Suspension 23%",
        brand: "The Ordinary",
        merchant: "sephora",
        affiliateUrl: "https://sephora.fr/the-ordinary-vitamin-c",
        price: "5,90 €",
        image: "https://picsum.photos/seed/product-vc-1/200/200",
        pros: ["Prix incroyable", "Concentration puissante", "Résultats rapides"],
        cons: ["Texture épaisse", "Peut irriter peaux sensibles"],
      },
      {
        name: "Pure Vitamin C10",
        brand: "Caudalie",
        merchant: "marionnaud",
        affiliateUrl: "https://marionnaud.fr/caudalie-vc",
        price: "39,00 €",
        image: "https://picsum.photos/seed/product-vc-2/200/200",
        pros: ["Formule stable", "Teint lumineux", "Adapté peaux sensibles"],
        cons: ["Prix moyen", "Flacon trop grand"],
      },
      {
        name: "Brightening Essence Lotion",
        brand: "La Roche-Posay",
        merchant: "nocibe",
        affiliateUrl: "https://nocibe.fr/la-roche-posay",
        price: "18,50 €",
        image: "https://picsum.photos/seed/product-vc-3/200/200",
        pros: ["Texture légère", "Bon rapport qualité-prix", "Hydratant"],
        cons: ["Concentration modérée", "Résultats lents"],
      },
      {
        name: "Vitamin C Serum 20%",
        brand: "Paula's Choice",
        merchant: "amazon",
        affiliateUrl: "https://amazon.fr/paulas-choice-vc",
        price: "44,00 €",
        image: "https://picsum.photos/seed/product-vc-4/200/200",
        pros: ["Formule scientifique", "Stabilité garantie", "Résultats prouvés"],
        cons: ["Prix élevé", "Flacon petit"],
      },
      {
        name: "Huile Essentielle Vitaminée",
        brand: "Nuxe",
        merchant: "sephora",
        affiliateUrl: "https://sephora.fr/nuxe-vc",
        price: "29,90 €",
        image: "https://picsum.photos/seed/product-vc-5/200/200",
        pros: ["Senteur agréable", "Hydrate et éclate", "Naturelle"],
        cons: ["Texture huileuse", "Moins puissante en VC"],
      },
    ],
  },
  {
    id: "cG9zdDoxMjQ=",
    slug: "retinol-guide-complet-debutants",
    title: "Rétinol pour les débutants : guide complet et progressif",
    excerpt:
      "Le rétinol est un incontournable anti-âge mais intimide souvent. Découvrez comment l'intégrer progressivement pour transformer votre peau sans irritation.",
    content: `<h2>Qu'est-ce que le rétinol exactement ?</h2>
<p>Le rétinol est une <b>forme de vitamine A naturelle</b> qui accélère le renouvellement cellulaire et booste la production de collagène. C'est l'ingrédient anti-âge le plus puissant et le plus étudié scientifiquement.</p>

<h2>Comment commencer avec le rétinol</h2>
<p>L'erreur classique des débutants est de commencer trop fort. Une approche <b>progressive et minimaliste</b> est essentielle. Commencez par une concentration basse (0,25% ou 0,3%), une fois par semaine, le soir.</p>

<h2>Les formes de rétinol</h2>
<p>Il existe plusieurs formes : rétinol pur, rétinyl palmitate (plus doux), rétinaldéhyde (plus puissant), et rétinoïdes sur ordonnance. Chaque forme a sa place dans une routine progressive.</p>

<h2>Signes d'irritation et solutions</h2>
<p>Rougeur, desquamation légère sont <b>normales les premières semaines</b>. Espacez les applications, augmentez progressivement, et hydratez bien. Si l'irritation persiste, changez de concentration.</p>`,
    date: "2026-02-28",
    modified: "2026-03-05",
    author: { name: "Sophie Moreau", slug: "sophie-moreau" },
    featuredImage: {
      url: "https://picsum.photos/seed/retinol-guide/1200/675",
      alt: "Guide complet du rétinol pour débutants",
      width: 1200,
      height: 675,
    },
    categories: ["beaute", "blog"],
    tags: ["retinol", "anti-age", "routine-soir"],
    brands: ["the-ordinary", "paulas-choice", "caudalie"],
    seo: {
      title: "Rétinol pour débutants : guide complet | Perfect Skin",
      description:
        "Guide progressif du rétinol : comment débuter, concentrations, formes et solutions contre l'irritation.",
      canonicalUrl: "https://perfect-skin.fr/retinol-guide-complet-debutants",
      openGraph: {
        title: "Rétinol pour les débutants : guide complet et progressif",
        description: "Maîtrisez le rétinol sans irritation avec notre guide expert.",
        image: "https://picsum.photos/seed/retinol-guide/1200/675",
        type: "article",
      },
      jsonLd: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Rétinol pour les débutants : guide complet et progressif",
        datePublished: "2026-02-28",
        author: { "@type": "Person", name: "Sophie Moreau" },
      }),
    },
  },
  {
    id: "cG9zdDoxMjU=",
    slug: "top-3-cremes-anti-age-moins-50-euros",
    title: "Top 3 crèmes anti-âge à moins de 50€",
    excerpt:
      "Ridules, perte de fermeté : découvrez les 3 crèmes anti-âge les plus efficaces sans casser le budget. Efficacité maximale à petit prix.",
    content: `<h2>Pourquoi ces crèmes sont exceptionnelles</h2>
<p>Nous avons testé plus de 40 crèmes anti-âge en pharmacie. Ces trois produits offrent le meilleur <b>rapport efficacité-prix</b> avec des résultats visibles en 4 à 6 semaines.</p>

<h2>Critères de sélection stricts</h2>
<p>Concentration en actifs prouvés, texture agréable, efficacité documentée, et accessibilité financière. Pas de marketing, seulement des résultats tangibles.</p>

<h2>Comment maximiser les résultats</h2>
<p>Une crème anti-âge fonctionne mieux avec une <b>routine complète : nettoyage, hydratation, protection solaire</b>. Associez à un sérum rétinol ou vitamine C pour décupler l'efficacité.</p>`,
    date: "2026-03-08",
    modified: "2026-03-10",
    author: { name: "Émilie Dubois", slug: "emilie-dubois" },
    featuredImage: {
      url: "https://picsum.photos/seed/cremes-anti-age/1200/675",
      alt: "Crèmes anti-âge efficaces moins 50 euros",
      width: 1200,
      height: 675,
    },
    categories: ["beaute", "top-marques"],
    tags: ["anti-age", "creme-nuit", "firmete"],
    brands: ["avene", "vichy", "la-roche-posay"],
    seo: {
      title: "Top 3 crèmes anti-âge moins 50€ | Perfect Skin",
      description:
        "Crèmes anti-âge efficaces et abordables : notre sélection des 3 meilleures formules moins de 50 euros.",
      canonicalUrl: "https://perfect-skin.fr/top-3-cremes-anti-age-moins-50-euros",
      openGraph: {
        title: "Top 3 crèmes anti-âge à moins de 50€",
        description: "Les crèmes anti-âge les plus efficaces sans dépasser 50€.",
        image: "https://picsum.photos/seed/cremes-anti-age/1200/675",
        type: "article",
      },
      jsonLd: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Top 3 crèmes anti-âge à moins de 50€",
        datePublished: "2026-03-08",
        author: { "@type": "Person", name: "Émilie Dubois" },
      }),
    },
    affiliateProducts: [
      {
        name: "Hyalu B5 Crème",
        brand: "Vichy",
        merchant: "marionnaud",
        affiliateUrl: "https://marionnaud.fr/vichy-hyalu",
        price: "28,90 €",
        image: "https://picsum.photos/seed/product-anti-age-1/200/200",
        pros: ["Hydratation intense", "Acide hyaluronique", "Non collante"],
        cons: ["Odeur forte", "Pot trop grand"],
      },
      {
        name: "Eucerin Advanced Repair",
        brand: "Avène",
        merchant: "amazon",
        affiliateUrl: "https://amazon.fr/avene-repair",
        price: "22,50 €",
        image: "https://picsum.photos/seed/product-anti-age-2/200/200",
        pros: ["Prix imbattable", "Hydrate longtemps", "Hypoallergénique"],
        cons: ["Texture basique", "Résultats lents"],
      },
      {
        name: "Redermic C10 Crème",
        brand: "La Roche-Posay",
        merchant: "nocibe",
        affiliateUrl: "https://nocibe.fr/la-roche-posay",
        price: "39,00 €",
        image: "https://picsum.photos/seed/product-anti-age-3/200/200",
        pros: ["Vitamine C incluse", "Résultats éclat", "Effet lissant"],
        cons: ["Flacon petit", "Peut irriter"],
      },
    ],
  },
  {
    id: "cG9zdDoxMjY=",
    slug: "acide-hyaluronique-comment-ca-marche",
    title: "Acide hyaluronique : comment ça marche vraiment",
    excerpt:
      "L'acide hyaluronique est partout en cosmétique. Découvrez le secret de cet ingrédient miracle pour une hydratation optimale et durable.",
    content: `<h2>La science derrière l'acide hyaluronique</h2>
<p>L'acide hyaluronique est une <b>molécule naturelle présente dans la peau</b> capable de retenir jusqu'à 1000 fois son poids en eau. C'est un hydratant exceptionnel et sans rival.</p>

<h2>Les différentes tailles moléculaires</h2>
<p>Il existe plusieurs poids moléculaires : haut (surface), moyen (épiderme), bas (profondeur). Une bonne formule en combine plusieurs pour une <b>hydratation multi-niveaux</b>.</p>

<h2>Comment l'utiliser correctement</h2>
<p>Appliquez sur peau légèrement humide pour une meilleure absorption. Associez à une crème pour sceller l'hydratation. En sérums concentrés, l'acide hyaluronique transforme les peaux sèches.</p>

<h2>Peau sèche vs déshydratée</h2>
<p>Ces deux conditions demandent des approches différentes. La <b>peau déshydratée manque d'eau</b> (pas de sébum) tandis que la peau sèche manque de lipides. L'acide hyaluronique aide les deux mais nécessite une routine adaptée.</p>`,
    date: "2026-01-20",
    modified: "2026-02-10",
    author: { name: "Camille Laurent", slug: "camille-laurent" },
    featuredImage: {
      url: "https://picsum.photos/seed/acide-hyaluronique/1200/675",
      alt: "Acide hyaluronique : explication scientifique",
      width: 1200,
      height: 675,
    },
    categories: ["beaute", "blog"],
    tags: ["acide-hyaluronique", "hydratation", "serum"],
    brands: ["the-ordinary", "vichy", "caudalie"],
    seo: {
      title: "Acide hyaluronique : fonctionnement complet | Perfect Skin",
      description:
        "Découvrez comment fonctionne l'acide hyaluronique, ses différentes formes et comment l'utiliser efficacement.",
      canonicalUrl: "https://perfect-skin.fr/acide-hyaluronique-comment-ca-marche",
      openGraph: {
        title: "Acide hyaluronique : comment ça marche vraiment",
        description: "Guide complet sur l'acide hyaluronique et son utilisation optimale.",
        type: "article",
      },
      jsonLd: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Acide hyaluronique : comment ça marche vraiment",
        datePublished: "2026-01-20",
        author: { "@type": "Person", name: "Camille Laurent" },
      }),
    },
  },
  {
    id: "cG9zdDoxMjc=",
    slug: "niacinamide-peau-mixte-imperfections",
    title: "Niacinamide : l'allié secret des peaux mixtes et acnéiques",
    excerpt:
      "La niacinamide régule le sébum, resserre les pores et apaise les imperfections. Découvrez comment l'utiliser pour une peau nette et équilibrée.",
    content: `<h2>Qu'est-ce que la niacinamide ?</h2>
<p>La niacinamide, aussi appelée vitamine B3, est un <b>ingrédient polyvalent adapté à tous les types de peaux</b>, particulièrement les peaux mixtes et acnéiques.</p>

<h2>Bénéfices prouvés scientifiquement</h2>
<p>Elle régule la sécrétion de sébum, minimise les pores dilatés, réduit les rougeurs et <b>apaise les imperfections inflammatoires</b>. Résultats visibles en 2 à 3 semaines.</p>

<h2>Comment l'intégrer à votre routine</h2>
<p>La niacinamide s'utilise en sérums, toniques ou crèmes. Elle se combine bien avec tous les ingrédients actifs sauf les vitamine C très concentrées. <b>Appliquez matin et soir</b> pour des résultats optimaux.</p>`,
    date: "2026-02-14",
    modified: "2026-02-20",
    author: { name: "Margaux Petit", slug: "margaux-petit" },
    featuredImage: {
      url: "https://picsum.photos/seed/niacinamide/1200/675",
      alt: "Niacinamide pour peaux mixtes et acné",
      width: 1200,
      height: 675,
    },
    categories: ["beaute", "tendances"],
    tags: ["niacinamide", "peau-mixte", "acne-imperfections"],
    brands: ["the-ordinary", "paulas-choice"],
    seo: {
      title: "Niacinamide peaux mixtes : guide complet | Perfect Skin",
      description:
        "Niacinamide pour peaux mixtes et acnéiques : bénéfices, utilisation et meilleurs produits.",
      canonicalUrl: "https://perfect-skin.fr/niacinamide-peau-mixte-imperfections",
      openGraph: {
        title: "Niacinamide : l'allié secret des peaux mixtes et acnéiques",
        description: "Maîtrisez votre peau mixte avec la niacinamide.",
        type: "article",
      },
      jsonLd: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Niacinamide : l'allié secret des peaux mixtes et acnéiques",
        datePublished: "2026-02-14",
        author: { "@type": "Person", name: "Margaux Petit" },
      }),
    },
  },
  {
    id: "cG9zdDoxMjg=",
    slug: "protection-solaire-spf-comprendre",
    title: "SPF expliqué : comprendre la protection solaire et bien la choisir",
    excerpt:
      "SPF 30, 50, 100 : qu'est-ce que cela signifie vraiment ? Découvrez comment choisir la bonne protection solaire pour votre peau.",
    content: `<h2>Qu'est-ce que le SPF ?</h2>
<p>Le SPF (Sun Protection Factor) mesure la capacité d'un produit à <b>protéger contre les rayons UVB</b> responsables des coups de soleil. Le chiffre indique le temps de protection : SPF 30 prolonge la tolérance 30 fois.</p>

<h2>SPF 30 vs SPF 50 vs SPF 100</h2>
<p>SPF 30 bloque 97% des UVB, SPF 50 en bloque 98%, SPF 100 en bloque 99%. Au-delà de SPF 50, les gains sont <b>très marginaux</b>. L'important est d'en appliquer assez et de renouveler régulièrement.</p>

<h2>UVA et UVB : quelle différence ?</h2>
<p>Les UVB causent les coups de soleil, les UVA causent le vieillissement cutané et le cancer. Cherchez un indice <b>PPD/PA++++</b> pour la protection UVA.</p>

<h2>Protection minérale vs chimique</h2>
<p>Minérale (oxyde de zinc, dioxyde de titane) crée une barrière réfléchissante, moins irritante pour peaux sensibles. Chimique pénètre et absorbe les UV, texture meilleure. Les deux offrent une bonne protection.</p>`,
    date: "2026-03-01",
    modified: "2026-03-05",
    author: { name: "Sophie Moreau", slug: "sophie-moreau" },
    featuredImage: {
      url: "https://picsum.photos/seed/spf-protection/1200/675",
      alt: "Explication SPF et protection solaire",
      width: 1200,
      height: 675,
    },
    categories: ["beaute", "bien-etre"],
    tags: ["spf-protection", "routine-matin", "peau-sensible"],
    brands: ["la-roche-posay", "avene", "caudalie"],
    seo: {
      title: "SPF expliqué : protection solaire | Perfect Skin",
      description:
        "Comprendre le SPF, UVA/UVB et choisir la meilleure protection solaire pour votre peau.",
      canonicalUrl: "https://perfect-skin.fr/protection-solaire-spf-comprendre",
      openGraph: {
        title: "SPF expliqué : comprendre la protection solaire et bien la choisir",
        description: "Guide complet de la protection solaire et du SPF.",
        type: "article",
      },
      jsonLd: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "SPF expliqué : comprendre la protection solaire et bien la choisir",
        datePublished: "2026-03-01",
        author: { "@type": "Person", name: "Sophie Moreau" },
      }),
    },
  },
  {
    id: "cG9zdDoxMjk=",
    slug: "routine-skincare-minimaliste-complete",
    title: "Routine skincare minimaliste : 4 étapes seulement, résultats maximaux",
    excerpt:
      "Vous n'avez besoin que de 4 produits pour une peau magnifique. Découvrez la routine minimaliste scientifiquement optimisée.",
    content: `<h2>Pourquoi minimaliste fonctionne mieux</h2>
<p>Plus de produits ne signifie pas une meilleure peau. Au contraire, une routine <b>minimaliste réduit les irritations et augmente l'efficacité</b> de chaque produit.</p>

<h2>Les 4 indispensables</h2>
<p>1. Nettoyant doux (matin-soir) 2. Hydratant léger (matin) 3. Hydratant riche (soir) 4. Protecteur solaire (matin). Ces quatre produits couvrent tous les besoins.</p>

<h2>Ajouter un actif bonus</h2>
<p>Pour accélérer les résultats anti-âge ou acné, <b>ajoutez un seul sérums actif</b> : vitamine C le matin, rétinol le soir. Pas plus.</p>

<h2>Comment choisir ses produits</h2>
<p>Sélectionnez des formules <b>multi-tâches et bien concentrées en actifs</b>. Évitez les marques avec 15 étapes promotionnelles. Testez 4 semaines avant de changer.</p>`,
    date: "2025-12-10",
    modified: "2026-01-15",
    author: { name: "Camille Laurent", slug: "camille-laurent" },
    featuredImage: {
      url: "https://picsum.photos/seed/routine-minimaliste/1200/675",
      alt: "Routine skincare minimaliste 4 étapes",
      width: 1200,
      height: 675,
    },
    categories: ["beaute", "blog"],
    tags: ["minimaliste", "routine-matin", "routine-soir", "hydratation"],
    seo: {
      title: "Routine skincare minimaliste 4 étapes | Perfect Skin",
      description:
        "Routine minimaliste efficace : 4 produits seulement pour une peau impeccable.",
      canonicalUrl: "https://perfect-skin.fr/routine-skincare-minimaliste-complete",
      openGraph: {
        title: "Routine skincare minimaliste : 4 étapes seulement, résultats maximaux",
        description: "Simplicité et efficacité : la routine minimaliste complète.",
        type: "article",
      },
      jsonLd: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Routine skincare minimaliste : 4 étapes seulement, résultats maximaux",
        datePublished: "2025-12-10",
        author: { "@type": "Person", name: "Camille Laurent" },
      }),
    },
  },
  {
    id: "cG9zdDoxMzA=",
    slug: "masques-visage-hydratants-efficaces",
    title: "Les meilleurs masques visage hydratants : test et comparatif 2026",
    excerpt:
      "Masques en feuille, crèmes, gels : notre sélection des masques les plus hydratants et apaisants. Résultats visibles en 15 minutes.",
    content: `<h2>Types de masques : lequel choisir</h2>
<p>Masques en feuille (hydratation rapide), crèmes (hydratation profonde), gels (peau mixte), argile (purifiant). Chaque type a ses forces et s'adapte aux besoins.</p>

<h2>Fréquence d'utilisation optimale</h2>
<p>Un masque hydratant peut s'utiliser <b>2 à 3 fois par semaine</b> sans surcharge. Pour peaux sèches, jusqu'à quotidien en soin intensif temporaire.</p>

<h2>Bonnes pratiques</h2>
<p>Appliquez sur peau propre et légèrement humide. Laissez agir 10 à 15 minutes. <b>Finissez toujours par une crème pour sceller</b> l'hydratation. Les résultats sont visibles immédiatement.</p>`,
    date: "2026-02-05",
    modified: "2026-02-12",
    author: { name: "Émilie Dubois", slug: "emilie-dubois" },
    featuredImage: {
      url: "https://picsum.photos/seed/masques-visage/1200/675",
      alt: "Meilleurs masques visage hydratants 2026",
      width: 1200,
      height: 675,
    },
    categories: ["beaute"],
    tags: ["masque-visage", "hydratation", "peau-seche"],
    brands: ["caudalie", "nuxe", "la-roche-posay"],
    seo: {
      title: "Meilleurs masques hydratants 2026 | Perfect Skin",
      description:
        "Test et comparatif des meilleurs masques visage hydratants pour une peau repulpée.",
      canonicalUrl: "https://perfect-skin.fr/masques-visage-hydratants-efficaces",
      openGraph: {
        title: "Les meilleurs masques visage hydratants : test et comparatif 2026",
        description: "Masques hydratants efficaces testés et recommandés par nos experts.",
        type: "article",
      },
      jsonLd: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Les meilleurs masques visage hydratants : test et comparatif 2026",
        datePublished: "2026-02-05",
        author: { "@type": "Person", name: "Émilie Dubois" },
      }),
    },
    affiliateProducts: [
      {
        name: "Hydrating Sheet Mask",
        brand: "Caudalie",
        merchant: "sephora",
        affiliateUrl: "https://sephora.fr/caudalie-mask",
        price: "8,50 €",
        image: "https://picsum.photos/seed/product-mask-1/200/200",
        pros: ["Très hydratant", "Prix mini", "Senteur luxe"],
        cons: ["Se déchire facilement", "Format petit"],
      },
      {
        name: "Intense Hydration Mask",
        brand: "Nuxe",
        merchant: "marionnaud",
        affiliateUrl: "https://marionnaud.fr/nuxe-mask",
        price: "32,00 €",
        image: "https://picsum.photos/seed/product-mask-2/200/200",
        pros: ["Crème épaisse", "Hydrate longtemps", "Pot généreux"],
        cons: ["Texture lourde", "Prix moyen"],
      },
    ],
  },
  {
    id: "cG9zdDoxMzE=",
    slug: "contour-des-yeux-rides-poches",
    title: "Contour des yeux : comment traiter rides et poches efficacement",
    excerpt:
      "La peau du contour oculaire est fragile et demande une approche ciblée. Découvrez comment traiter les rides et poches avec les bons produits.",
    content: `<h2>Pourquoi le contour des yeux se vieillit en premier</h2>
<p>Cette zone a <b>très peu de sébum</b> naturel et une peau très fine. Elle se déshydrate rapidement et exprime tous les signes de fatigue et du vieillissement.</p>

<h2>Rides du contour : solutions efficaces</h2>
<p>Commencez par une crème hydratante riche. Ajoutez un <b>sérum actif (vitamine C, rétinol)</b> si vous avez des rides fines. Les peptides et caféine accélèrent les résultats.</p>

<h2>Poches sous les yeux</h2>
<p>Souvent dues à la rétention d'eau. <b>Appliquez froid le matin</b> (utilisez votre crème au réfrigérateur) et incorporez caféine ou hélichryse pour drainer naturellement.</p>

<h2>Technique d'application</h2>
<p>Appliquez délicatement avec l'annulaire (le moins fort) par petits tapotements. N'étirez jamais la peau, ne frottez pas. Attendez 60 secondes avant maquillage.</p>`,
    date: "2026-01-30",
    modified: "2026-02-08",
    author: { name: "Sophie Moreau", slug: "sophie-moreau" },
    featuredImage: {
      url: "https://picsum.photos/seed/contour-yeux/1200/675",
      alt: "Traitement contour des yeux rides poches",
      width: 1200,
      height: 675,
    },
    categories: ["beaute", "tendances"],
    tags: ["contour-des-yeux", "anti-age", "firmete"],
    brands: ["estee-lauder", "lancome", "caudalie"],
    seo: {
      title: "Contour des yeux : rides et poches | Perfect Skin",
      description:
        "Guide complet du contour des yeux : traitement des rides et poches avec produits efficaces.",
      canonicalUrl: "https://perfect-skin.fr/contour-des-yeux-rides-poches",
      openGraph: {
        title: "Contour des yeux : comment traiter rides et poches efficacement",
        description: "Éliminez rides et poches avec notre guide expert du contour.",
        type: "article",
      },
      jsonLd: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Contour des yeux : comment traiter rides et poches efficacement",
        datePublished: "2026-01-30",
        author: { "@type": "Person", name: "Sophie Moreau" },
      }),
    },
  },
  {
    id: "cG9zdDoxMzI=",
    slug: "exfoliants-chimiques-vs-mecaniques",
    title: "Exfoliants chimiques vs mécaniques : lequel choisir pour votre peau",
    excerpt:
      "AHA, BHA, gommages doux : découvrez les différences et comment choisir l'exfoliant idéal sans agresser votre peau.",
    content: `<h2>Exfoliants mécaniques : action immédiate</h2>
<p>Gommages et brosses éliminent les cellules mortes à l'instant. Parfaits pour une exfoliation occasionnelle, mais <b>risquent d'irriter si utilisés trop souvent</b> ou avec trop de vigueur.</p>

<h2>Exfoliants chimiques : action douce et profonde</h2>
<p>AHA (glycolique, lactique) pénètrent la surface. BHA (salicylique) <b>pénètrent les pores</b> en profondeur. Action plus douce mais efficace sur plusieurs semaines.</p>

<h2>Comment les utiliser sans irritation</h2>
<p>Commencez 1 fois par semaine en soir. Augmentez graduellement selon tolérance. Toujours hydrater bien après. <b>Jour de repos obligatoire</b> entre deux applications.</p>

<h2>Compatibilité avec autres actifs</h2>
<p>N'associez pas deux exfoliants. Vitamine C et niacinamide sont compatibles. Rétinol demande au moins 2 jours d'intervalle. SPF obligatoire le lendemain.</p>`,
    date: "2025-11-22",
    modified: "2026-01-10",
    author: { name: "Margaux Petit", slug: "margaux-petit" },
    featuredImage: {
      url: "https://picsum.photos/seed/exfoliants/1200/675",
      alt: "Exfoliants chimiques vs mécaniques",
      width: 1200,
      height: 675,
    },
    categories: ["beaute"],
    tags: ["exfoliant", "hydratation", "peau-sensible"],
    brands: ["paulas-choice", "the-ordinary"],
    seo: {
      title: "Exfoliants chimiques vs mécaniques | Perfect Skin",
      description:
        "Comparatif AHA, BHA et gommages : comment choisir l'exfoliant idéal pour votre peau.",
      canonicalUrl: "https://perfect-skin.fr/exfoliants-chimiques-vs-mecaniques",
      openGraph: {
        title: "Exfoliants chimiques vs mécaniques : lequel choisir pour votre peau",
        description: "Guide complet pour choisir l'exfoliant idéal.",
        type: "article",
      },
      jsonLd: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Exfoliants chimiques vs mécaniques : lequel choisir pour votre peau",
        datePublished: "2025-11-22",
        author: { "@type": "Person", name: "Margaux Petit" },
      }),
    },
  },
  {
    id: "cG9zdDoxMzM=",
    slug: "caudalie-histoire-innovation-beaute",
    title: "Caudalie : l'histoire d'une marque française d'excellence cosmétique",
    excerpt:
      "Fondée en 1995 en Gironde, Caudalie incarne l'innovation cosmétique française basée sur le raisin rouge et la bio-science.",
    content: `<h2>Les origines : passion pour le raisin</h2>
<p>Caudalie a commencé comme une découverte dans les vignes de Gironde. La fondatrice a remarqué que les <b>raisins rouges contenaient des polyphénols extraordinaires</b> pour la peau.</p>

<h2>Innovation et recherche</h2>
<p>La marque a investi massivement en R&D pour isoler et stabiliser ces actifs. Aujourd'hui, c'est un <b>leader en cosmétique luxe avec brevets de raisin</b> exclusifs.</p>

<h2>Philosophie et durabilité</h2>
<p>Caudalie pousse l'innovation avec responsabilité : <b>formules concentrées, emballage réduit, chaîne de valeur éthique</b>. Chaque produit fonctionne vraiment.</p>

<h2>Produits phares</h2>
<p>Beauty Elixir (hydratant culte), Vinoperfect Serum (vitamine C innovante), Polyphenol C15 (anti-âge puissant). Les sérums Caudalie sont des best-sellers mondiaux.</p>`,
    date: "2026-03-12",
    modified: "2026-03-15",
    author: { name: "Camille Laurent", slug: "camille-laurent" },
    featuredImage: {
      url: "https://picsum.photos/seed/caudalie-histoire/1200/675",
      alt: "Histoire Caudalie marque cosmétique française",
      width: 1200,
      height: 675,
    },
    categories: ["top-marques", "blog"],
    tags: ["bio-naturel", "innovation", "marque-francaise"],
    brands: ["caudalie"],
    seo: {
      title: "Caudalie : histoire marque cosmétique française | Perfect Skin",
      description:
        "Découvrez l'histoire de Caudalie, innovation cosmétique française basée sur le raisin rouge.",
      canonicalUrl: "https://perfect-skin.fr/caudalie-histoire-innovation-beaute",
      openGraph: {
        title: "Caudalie : l'histoire d'une marque française d'excellence cosmétique",
        description: "L'histoire inspirante de Caudalie et son innovation.",
        type: "article",
      },
      jsonLd: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Caudalie : l'histoire d'une marque française d'excellence cosmétique",
        datePublished: "2026-03-12",
        author: { "@type": "Person", name: "Camille Laurent" },
      }),
    },
  },
  {
    id: "cG9zdDoxMzQ=",
    slug: "peau-sensible-ingredients-a-eviter",
    title: "Peau sensible : 10 ingrédients à éviter absolument",
    excerpt:
      "Alcool, parfum, allergènes : découvrez les ingrédients qui peuvent irriter votre peau sensible et comment lire les étiquettes.",
    content: `<h2>Les principaux irritants de la peau sensible</h2>
<p>Parfums synthétiques, alcools dénaturés, huiles essentielles, sulfates agressifs. Ces ingrédients <b>déstabilisent la barrière cutanée</b> et causent rougeur et inconfort.</p>

<h2>Comment lire les étiquettes</h2>
<p>L'ordre des ingrédients suit la concentration décroissante. Si parfum ou alcool figurent dans les 10 premiers, <b>évitez le produit</b>. Cherchez des formules hypoallergéniques certifiées.</p>

<h2>Ingrédients sûrs pour peaux sensibles</h2>
<p>Centella asiatica, calendula, avoine colloïdale, glycérine, acide hyaluronique. Ces actifs <b>apaisent et renforcent la barrière</b> sans irritation.</p>

<h2>Test de tolérance : la règle des 2 semaines</h2>
<p>Testez un nouveau produit en isolant les variables. Appliquez qu'une seule chose nouvelle à la fois et attendez <b>au moins 14 jours</b> avant de conclure sur tolérance.</p>`,
    date: "2026-01-08",
    modified: "2026-01-25",
    author: { name: "Émilie Dubois", slug: "emilie-dubois" },
    featuredImage: {
      url: "https://picsum.photos/seed/peau-sensible/1200/675",
      alt: "Peau sensible ingrédients à éviter",
      width: 1200,
      height: 675,
    },
    categories: ["beaute", "bien-etre"],
    tags: ["peau-sensible", "bio-naturel", "hydratation"],
    brands: ["avene", "la-roche-posay", "bioderma"],
    seo: {
      title: "Peau sensible : ingrédients à éviter | Perfect Skin",
      description:
        "10 ingrédients irritants pour peau sensible et comment choisir des produits tolérants.",
      canonicalUrl: "https://perfect-skin.fr/peau-sensible-ingredients-a-eviter",
      openGraph: {
        title: "Peau sensible : 10 ingrédients à éviter absolument",
        description: "Guide des ingrédients dangereux pour peaux sensibles.",
        type: "article",
      },
      jsonLd: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Peau sensible : 10 ingrédients à éviter absolument",
        datePublished: "2026-01-08",
        author: { "@type": "Person", name: "Émilie Dubois" },
      }),
    },
  },
  {
    id: "cG9zdDoxMzU=",
    slug: "meditation-beaute-rituel-detente",
    title: "Beauté et méditation : créer un rituel détente transformateur",
    excerpt:
      "Transformer votre routine beauté en rituel méditatif pour une peau impeccable et un esprit apaisé. Slow beauty à la française.",
    content: `<h2>La connexion peau-esprit</h2>
<p>Notre peau réagit au stress et aux émotions. Une routine consciente et <b>méditative améliore la circulation et l'éclat naturel</b>. C'est la slow beauty.</p>

<h2>Créer l'ambiance parfaite</h2>
<p>Lumière tamisée, musique douce ou silence, température agréable. <b>Ralentissez volontairement</b> : chaque produit appliqué devient un moment de soin personnel.</p>

<h2>Techniques de respiration pendant le soin</h2>
<p>Respirez profondément en massant le contour du visage. <b>L'oxygénation favorise l'éclat</b> et réduit les tensions responsables des ridules.</p>

<h2>Rituel du soir pour un sommeil réparateur</h2>
<p>Un soin visage relaxant avant lit améliore le sommeil réparateur. <b>La peau se régénère mieux</b> pendant qu'on dort dans le calme.</p>`,
    date: "2026-02-22",
    modified: "2026-02-28",
    author: { name: "Sophie Moreau", slug: "sophie-moreau" },
    featuredImage: {
      url: "https://picsum.photos/seed/meditation-beaute/1200/675",
      alt: "Rituel beauté et méditation detente",
      width: 1200,
      height: 675,
    },
    categories: ["bien-etre", "blog"],
    tags: ["bien-etre", "routine-soir", "mindfulness"],
    seo: {
      title: "Beauté et méditation : rituel détente | Perfect Skin",
      description:
        "Transformer votre routine beauté en rituel méditatif pour peau et esprit apaisés.",
      canonicalUrl: "https://perfect-skin.fr/meditation-beaute-rituel-detente",
      openGraph: {
        title: "Beauté et méditation : créer un rituel détente transformateur",
        description: "Slow beauty et méditation pour une beauté consciente.",
        type: "article",
      },
      jsonLd: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Beauté et méditation : créer un rituel détente transformateur",
        datePublished: "2026-02-22",
        author: { "@type": "Person", name: "Sophie Moreau" },
      }),
    },
  },
  {
    id: "cG9zdDoxMzY=",
    slug: "nutrition-peau-aliments-antioxydants",
    title: "Beauté de l'intérieur : aliments antioxydants pour une peau éclatante",
    excerpt:
      "La peau commence par l'assiette. Découvrez les aliments antioxydants qui transforment votre peau de l'intérieur.",
    content: `<h2>Aliments champions en antioxydants</h2>
<p>Baies rouges (myrtilles, framboises), légumes colorés (épinards, carottes), noix. Ces aliments <b>neutralisent les radicaux libres</b> responsables du vieillissement.</p>

<h2>Oméga-3 : la clé de la barrière hydrolipidique</h2>
<p>Poissons gras, avocats, graines de lin. Les oméga-3 <b>renforcent la barrière lipidique</b> et réduisent l'inflammation naturellement.</p>

<h2>Hydratation : l'oublié de la beauté</h2>
<p>Eau bien sûr, mais aussi fruits hydratants (pastèque, melon) et tisanes. Une hydratation constante <b>améliore l'élasticité et l'éclat</b> mieux que n'importe quelle crème.</p>

<h2>Sucres et alcool : ce qu'il faut modérer</h2>
<p>Le sucre cause la glycation (vieillissement accéléré). L'alcool déshydrate et enflamme. <b>Modération et équilibre</b> sont la clé d'une peau durable.</p>`,
    date: "2026-01-18",
    modified: "2026-02-01",
    author: { name: "Margaux Petit", slug: "margaux-petit" },
    featuredImage: {
      url: "https://picsum.photos/seed/nutrition-peau/1200/675",
      alt: "Aliments antioxydants beauté peau",
      width: 1200,
      height: 675,
    },
    categories: ["bien-etre"],
    tags: ["nutrition", "antioxydants", "bien-etre"],
    seo: {
      title: "Nutrition et beauté : aliments antioxydants | Perfect Skin",
      description:
        "Aliments antioxydants pour une peau éclatante : nutrition et beauté de l'intérieur.",
      canonicalUrl: "https://perfect-skin.fr/nutrition-peau-aliments-antioxydants",
      openGraph: {
        title: "Beauté de l'intérieur : aliments antioxydants pour une peau éclatante",
        description: "Beautés par l'assiette : les aliments à privilégier.",
        type: "article",
      },
      jsonLd: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Beauté de l'intérieur : aliments antioxydants pour une peau éclatante",
        datePublished: "2026-01-18",
        author: { "@type": "Person", name: "Margaux Petit" },
      }),
    },
  },
  {
    id: "cG9zdDoxMzc=",
    slug: "stress-acne-comment-reconnaitre",
    title: "Acné de stress : comment la reconnaître et la traiter efficacement",
    excerpt:
      "L'acné peut être causée par le stress. Découvrez comment identifier cette acné hormonale et la calmer avec les bons gestes.",
    content: `<h2>Signes de l'acné de stress</h2>
<p>Poussées soudaines de boutons petits et superficiels, souvent sur le menton et la mâchoire. L'acné de stress <b>s'accompagne de tension musculaire visible</b>.</p>

<h2>Mécanisme : hormones et inflammation</h2>
<p>Le stress augmente le cortisol qui stimule le sébum. Simultanément, <b>l'inflammation s'aggrave</b>. C'est un cercle : stress → acné → plus de stress.</p>

<h2>Traitement de l'acné de stress</h2>
<p>Niacinamide (apaise l'inflammation), acide salicylique (purifie les pores), hydratation (réduit l'inflammation). Associez à <b>techniques anti-stress : respiration, massage facial</b>.</p>

<h2>Prévention holistique</h2>
<p>Sommeil régulier, exercice, alimentation anti-inflammatoire, méditation. Une routine beauté minimaliste <b>augmente aussi le bien-être mental</b>.</p>`,
    date: "2026-02-16",
    modified: "2026-02-20",
    author: { name: "Émilie Dubois", slug: "emilie-dubois" },
    featuredImage: {
      url: "https://picsum.photos/seed/acne-stress/1200/675",
      alt: "Acné de stress causes traitement",
      width: 1200,
      height: 675,
    },
    categories: ["beaute", "bien-etre"],
    tags: ["acne-imperfections", "stress", "niacinamide"],
    brands: ["the-ordinary", "paulas-choice", "la-roche-posay"],
    seo: {
      title: "Acné de stress : traitement efficace | Perfect Skin",
      description:
        "Identifier et traiter l'acné causée par le stress avec approche holistique.",
      canonicalUrl: "https://perfect-skin.fr/stress-acne-comment-reconnaitre",
      openGraph: {
        title: "Acné de stress : comment la reconnaître et la traiter efficacement",
        description: "Traitement complet de l'acné hormonale et de stress.",
        type: "article",
      },
      jsonLd: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Acné de stress : comment la reconnaître et la traiter efficacement",
        datePublished: "2026-02-16",
        author: { "@type": "Person", name: "Émilie Dubois" },
      }),
    },
  },
  {
    id: "cG9zdDoxMzg=",
    slug: "cycling-ingredients-beaute-calendrier",
    title: "Cycling d'ingrédients : calendrier hebdomadaire pour peau optimale",
    excerpt:
      "Ne pas mélanger certains actifs ? Découvrez le cycling intelligent : alterner les ingrédients puissants pour meilleurs résultats.",
    content: `<h2>Pourquoi alterner les ingrédients</h2>
<p>Certains actifs s'annulent mutuellement ou causent irritation en combinaison. Le cycling permet une <b>routine puissante sans risque</b>.</p>

<h2>Incompatibilités à connaître</h2>
<p>Vitamine C + niacinamide : très bien ensemble. Rétinol + acide (AHA/BHA) : 2-3 jours d'intervalle minimum. Vitamine C concentrée + niacinamide : peut créer irritation.</p>

<h2>Exemple de calendrier idéal</h2>
<p>Lundi-mercredi : rétinol soir. Jeudi-samedi : repos rétinol. Matin quotidien : vitamine C + niacinamide. SPF obligatoire après rétinol.</p>

<h2>Écouter sa peau</h2>
<p>Le cycling n'est pas rigide. <b>Adaptez selon votre peau</b> : si irritée, espacerez plus. Si bien tolérée, pouvez densifier progressivement.</p>`,
    date: "2025-12-28",
    modified: "2026-01-20",
    author: { name: "Camille Laurent", slug: "camille-laurent" },
    featuredImage: {
      url: "https://picsum.photos/seed/cycling-ingredients/1200/675",
      alt: "Cycling ingrédients beauté calendrier",
      width: 1200,
      height: 675,
    },
    categories: ["beaute", "tendances"],
    tags: ["retinol", "vitamine-c", "routine-soir"],
    seo: {
      title: "Cycling ingrédients beauté : calendrier | Perfect Skin",
      description:
        "Guide du cycling d'ingrédients actifs : calendrier et incompatibilités à connaître.",
      canonicalUrl: "https://perfect-skin.fr/cycling-ingredients-beaute-calendrier",
      openGraph: {
        title: "Cycling d'ingrédients : calendrier hebdomadaire pour peau optimale",
        description: "Calendrier de cycling intelligent pour maximiser l'efficacité.",
        type: "article",
      },
      jsonLd: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Cycling d'ingrédients : calendrier hebdomadaire pour peau optimale",
        datePublished: "2025-12-28",
        author: { "@type": "Person", name: "Camille Laurent" },
      }),
    },
  },
  {
    id: "cG9zdDoxMzk=",
    slug: "soin-apres-soleil-reparateur",
    title: "Après-soleil réparateur : calmer et hydrater une peau stressée",
    excerpt:
      "Coup de soleil ou peau surexposée ? Découvrez les meilleurs soins après-soleil pour réparer rapidement et apiser l'inflammation.",
    content: `<h2>Les dégâts du soleil sur la peau</h2>
<p>Coup de soleil provoque une brûlure thermique et <b>cassure d'ADN cellulaire</b>. Les heures suivantes sont critiques pour prévenir le vieillissement accéléré.</p>

<h2>Les actifs de l'après-soleil</h2>
<p>Aloe vera (apaise et hydrate), panthenol (régénère), niacinamide (réduit l'inflammation), acide hyaluronique (hydrate profondément). Ensemble ils restaurent la barrière.</p>

<h2>Protocole après-soleil efficace</h2>
<p>1. Refroidir au spray ou masque en feuille réfrigéré 2. Appliquer après-soleil riche 3. Hydrater avec un sérums HA 4. Crème barrière pour sceller 5. Répéter 2-3 fois le jour.</p>

<h2>Éviter après soleil</h2>
<p>Nettoyants agressifs, exfoliants, actifs forts (rétinol, acide). Laissez la peau <b>se rétablir 3-5 jours avant reprendre une routine active</b>.</p>`,
    date: "2026-03-18",
    modified: "2026-03-20",
    author: { name: "Sophie Moreau", slug: "sophie-moreau" },
    featuredImage: {
      url: "https://picsum.photos/seed/apres-soleil/1200/675",
      alt: "Soin après-soleil réparateur hydratation",
      width: 1200,
      height: 675,
    },
    categories: ["beaute", "bien-etre"],
    tags: ["hydratation", "apres-soleil", "inflammation"],
    brands: ["avene", "bioderma", "nuxe"],
    seo: {
      title: "Soin après-soleil réparateur | Perfect Skin",
      description:
        "Soin après-soleil efficace : apaisement, hydratation et réparation cellulaire.",
      canonicalUrl: "https://perfect-skin.fr/soin-apres-soleil-reparateur",
      openGraph: {
        title: "Après-soleil réparateur : calmer et hydrater une peau stressée",
        description: "Réparez votre peau après soleil avec nos meilleurs soins.",
        type: "article",
      },
      jsonLd: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Après-soleil réparateur : calmer et hydrater une peau stressée",
        datePublished: "2026-03-18",
        author: { "@type": "Person", name: "Sophie Moreau" },
      }),
    },
  },
  {
    id: "cG9zdDoxNDA=",
    slug: "marionnaud-histoire-pharmacie-beaute",
    title: "Marionnaud : histoire de la pharmacie-beauté française emblématique",
    excerpt:
      "Depuis 1977, Marionnaud incarne la beauté française accessible et de qualité. Découvrez l'histoire de cette chaîne culte.",
    content: `<h2>Origines : la première pharmacie-beauté</h2>
<p>Marionnaud a révolutionné l'accès à la beauté en créant le concept de pharmacie-beauté. <b>Mélanger dermocosmetiques et luxe sous un même toit</b> a changé le marché français.</p>

<h2>Positionnement unique</h2>
<p>Ni pure pharmacie, ni pur luxury. Marionnaud propose une sélection exigeante de <b>marques sérieuses, testées, avec conseil d'experts</b>.</p>

<h2>Rôle de prescriptrice de tendances</h2>
<p>Marionnaud identifie les meilleurs produits du marché. Les sélections de Marionnaud <b>influencent les comportements d'achat</b> des femmes françaises.</p>

<h2>Expansion et évolution</h2>
<p>Aujourd'hui présent dans tous les centre-villes français, Marionnaud adapte son offre : cosmétiques naturels, marques émergentes, services personnalisés.</p>`,
    date: "2026-02-10",
    modified: "2026-02-18",
    author: { name: "Margaux Petit", slug: "margaux-petit" },
    featuredImage: {
      url: "https://picsum.photos/seed/marionnaud-histoire/1200/675",
      alt: "Histoire Marionnaud pharmacie beauté française",
      width: 1200,
      height: 675,
    },
    categories: ["top-marques"],
    tags: ["marque-francaise", "histoire-beaute"],
    seo: {
      title: "Marionnaud : pharmacie-beauté française | Perfect Skin",
      description:
        "Histoire de Marionnaud, la pharmacie-beauté française emblématique depuis 1977.",
      canonicalUrl: "https://perfect-skin.fr/marionnaud-histoire-pharmacie-beaute",
      openGraph: {
        title: "Marionnaud : histoire de la pharmacie-beauté française emblématique",
        description: "Découvrez l'histoire inspirante de Marionnaud.",
        type: "article",
      },
      jsonLd: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline:
          "Marionnaud : histoire de la pharmacie-beauté française emblématique",
        datePublished: "2026-02-10",
        author: { "@type": "Person", name: "Margaux Petit" },
      }),
    },
  },
  {
    id: "cG9zdDoxNDE=",
    slug: "pores-dilates-resserer-naturellement",
    title: "Pores dilatés : comment les resserer naturellement et durablement",
    excerpt:
      "Pores visibles = complexe. Découvrez les vraies solutions pour resserer les pores et affiner la texture de votre peau.",
    content: `<h2>Pourquoi les pores se dilatent</h2>
<p>Sébum excessif, vieillissement, génétique. Les pores dilatés sont souvent une <b>accumulation de sébum oxydé</b>, pas une vrai dilatation permanente.</p>

<h2>Solutions efficaces et durables</h2>
<p>Nettoyage régulier (évite l'oxydation), niacinamide (régule le sébum), rétinol (raffermit), BHA (purifie les pores). Ces ingrédients <b>réduisent visiblement l'apparence</b> en 4-6 semaines.</p>

<h2>Mythes courants</h2>
<p>"Les pores se ferment au froid" : faux, c'est une illusion optique. "Les masques les resserre" : temporaire seulement. Les vraies solutions demandent <b>constance et bons ingrédients</b>.</p>

<h2>Réalisme : gérer les attentes</h2>
<p>On ne peut pas réduire la taille génétique de pores. Mais on peut les rendre invisibles en optimisant la peau. C'est suffisant pour la plupart.</p>`,
    date: "2026-01-14",
    modified: "2026-02-05",
    author: { name: "Camille Laurent", slug: "camille-laurent" },
    featuredImage: {
      url: "https://picsum.photos/seed/pores-dilates/1200/675",
      alt: "Comment resserer les pores dilatés",
      width: 1200,
      height: 675,
    },
    categories: ["beaute"],
    tags: ["pores", "niacinamide", "retinol"],
    brands: ["paulas-choice", "the-ordinary"],
    seo: {
      title: "Pores dilatés : solution naturelle | Perfect Skin",
      description:
        "Resserer les pores : vraies solutions et ingrédients efficaces contre les pores visibles.",
      canonicalUrl: "https://perfect-skin.fr/pores-dilates-resserer-naturellement",
      openGraph: {
        title: "Pores dilatés : comment les resserer naturellement et durablement",
        description: "Solutions réelles pour minimiser les pores visibles.",
        type: "article",
      },
      jsonLd: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Pores dilatés : comment les resserer naturellement et durablement",
        datePublished: "2026-01-14",
        author: { "@type": "Person", name: "Camille Laurent" },
      }),
    },
  },
  {
    id: "cG9zdDoxNDI=",
    slug: "double-nettoyage-methode-coree",
    title: "Double nettoyage : la méthode coréenne pour une peau impeccable",
    excerpt:
      "Huile puis eau : le double nettoyage coréen élimine toutes les impuretés. Découvrez cette technique révolutionnaire.",
    content: `<h2>Pourquoi le double nettoyage</h2>
<p>L'huile dissout sébum et maquillage. L'eau élimine les résidus. Un seul nettoyant ne fait pas les deux. <b>C'est la clé d'une peau vraiment propre</b>.</p>

<h2>Étape 1 : nettoyant huileux</h2>
<p>Huile, baume ou gel nettoyant qui s'émulsifie. Appliquez sur peau sèche 30-60 secondes. Le massage du bout des doigts <b>relâche les pores</b>.</p>

<h2>Étape 2 : nettoyant aqueux</h2>
<p>Mousse, gel ou lait doux. Rince les résidus huileux. <b>Ce nettoyant garantit peau vraiment propre</b> sans effet gras.</p>

<h2>Bénéfices visibles</h2>
<p>Meilleure pénétration des actifs (peau propre absorbe mieux), moins d'acné (résidus éliminés), texture visiblement améliorée en 1 semaine.</p>`,
    date: "2026-02-03",
    modified: "2026-02-08",
    author: { name: "Sophie Moreau", slug: "sophie-moreau" },
    featuredImage: {
      url: "https://picsum.photos/seed/double-nettoyage/1200/675",
      alt: "Double nettoyage méthode coréenne",
      width: 1200,
      height: 675,
    },
    categories: ["beaute", "blog"],
    tags: ["routine-matin", "nettoyage", "hydratation"],
    brands: ["nuxe", "caudalie"],
    seo: {
      title: "Double nettoyage coréen : guide complet | Perfect Skin",
      description:
        "Technique double nettoyage coréen : comment bien nettoyer sa peau matin et soir.",
      canonicalUrl: "https://perfect-skin.fr/double-nettoyage-methode-coree",
      openGraph: {
        title: "Double nettoyage : la méthode coréenne pour une peau impeccable",
        description: "Guide complet du double nettoyage coréen.",
        type: "article",
      },
      jsonLd: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Double nettoyage : la méthode coréenne pour une peau impeccable",
        datePublished: "2026-02-03",
        author: { "@type": "Person", name: "Sophie Moreau" },
      }),
    },
  },
  {
    id: "cG9zdDoxNDM=",
    slug: "peptides-collagene-rides-fermeté",
    title: "Peptides et collagène : boosters anti-âge et fermeté",
    excerpt:
      "Peptides, collagène hydrolysé : ces molécules stimulent la fermeté cutanée. Découvrez comment fonctionnent ces ingrédients.",
    content: `<h2>Qu'est-ce que les peptides</h2>
<p>Petites chaînes d'acides aminés qui <b>signalent à la peau de produire plus de collagène</b>. C'est un raccourci vers la fermeté.</p>

<h2>Collagène hydrolysé</h2>
<p>Molécule réparée qui pénètre mieux. Plus petite que le collagène classique, elle <b>hydrate intensément et stimule la régénération</b>.</p>

<h2>Combinaisons gagnantes</h2>
<p>Peptides + vitamine C (stimule la production), peptides + rétinol (amplification de l'effet). Résultats visibles sur fermeté en 8-12 semaines.</p>

<h2>Réalisme : ce qu'on peut attendre</h2>
<p>Les peptides et collagène <b>n'injectent pas du collagène dans la peau</b> (molécules trop grosses). Ils stimulent la production naturelle. L'effet est graduel mais durable.</p>`,
    date: "2025-12-18",
    modified: "2026-01-08",
    author: { name: "Émilie Dubois", slug: "emilie-dubois" },
    featuredImage: {
      url: "https://picsum.photos/seed/peptides-collagene/1200/675",
      alt: "Peptides collagène anti-âge fermeté",
      width: 1200,
      height: 675,
    },
    categories: ["beaute", "tendances"],
    tags: ["anti-age", "firmete", "collagene"],
    brands: ["estee-lauder", "lancome", "caudalie"],
    seo: {
      title: "Peptides et collagène : anti-âge efficace | Perfect Skin",
      description:
        "Peptides et collagène hydrolysé : fonctionnement et effet sur fermeté cutanée.",
      canonicalUrl: "https://perfect-skin.fr/peptides-collagene-rides-fermeté",
      openGraph: {
        title: "Peptides et collagène : boosters anti-âge et fermeté",
        description: "Molécules anti-âge efficaces pour plus de fermeté.",
        type: "article",
      },
      jsonLd: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Peptides et collagène : boosters anti-âge et fermeté",
        datePublished: "2025-12-18",
        author: { "@type": "Person", name: "Émilie Dubois" },
      }),
    },
  },
  {
    id: "cG9zdDoxNDQ=",
    slug: "baume-dherboriste-guerisseur-peau",
    title: "Baume d'herboriste : guérisseur polyvalent pour tous types de peau",
    excerpt:
      "Dermasoft, après-rasage, cicatrisant : le baume d'herboriste est un indispensable à avoir chez soi.",
    content: `<h2>Histoire du baume d'herboriste</h2>
<p>Formule ancienne à base de plantes apaisantes. Elle a survécu parce qu'<b>elle fonctionne vraiment sur presque tout</b> : rougeur, irritation, petites blessures.</p>

<h2>Composition typique</h2>
<p>Cire d'abeille, huiles essentielles (lavande, camomille), extraits botaniques. <b>Formule simple mais puissante</b>, sans composants chimiques agressifs.</p>

<h2>Utilisations multiples</h2>
<p>Démangeaisons, zone sensible après dépilation, après-soleil léger, lèvres sèches, petites plaies. Un baume fait presque tout : c'est sa force.</p>

<h2>Application minimaliste</h2>
<p>Pour intégrer à une routine minimaliste, utilisez le baume <b>en traitement curatif occasionnel</b> sur les zones problématiques, pas tous les jours.</p>`,
    date: "2026-01-22",
    modified: "2026-02-01",
    author: { name: "Margaux Petit", slug: "margaux-petit" },
    featuredImage: {
      url: "https://picsum.photos/seed/baume-herboriste/1200/675",
      alt: "Baume herboriste guérisseur naturel",
      width: 1200,
      height: 675,
    },
    categories: ["beaute", "bien-etre"],
    tags: ["bio-naturel", "apaisement", "peau-sensible"],
    brands: ["nuxe"],
    seo: {
      title: "Baume d'herboriste : indispensable polyvalent | Perfect Skin",
      description:
        "Baume d'herboriste multifonction : apaisement naturel et efficace.",
      canonicalUrl: "https://perfect-skin.fr/baume-dherboriste-guerisseur-peau",
      openGraph: {
        title: "Baume d'herboriste : guérisseur polyvalent pour tous types de peau",
        description: "Baume naturel indispensable pour apaisement et réparation.",
        type: "article",
      },
      jsonLd: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Baume d'herboriste : guérisseur polyvalent pour tous types de peau",
        datePublished: "2026-01-22",
        author: { "@type": "Person", name: "Margaux Petit" },
      }),
    },
  },
  {
    id: "cG9zdDoxNDU=",
    slug: "gua-sha-massage-facial-benefices",
    title: "Gua Sha facial : massage anti-âge et drainage lymphatique",
    excerpt:
      "Outil de massage traditionnel chinois devenu tendance beauté. Découvrez ses bénéfices réels et comment l'utiliser.",
    content: `<h2>Origines et principe</h2>
<p>Technique de massage traditionnelle chinoise. Le Gua Sha passe sur la peau avec <b>mouvement raclant spécifique</b> qui améliore la circulation.</p>

<h2>Bénéfices prouvés</h2>
<p>Drainage lymphatique (réduit poches), fermeté (micro-circulation), éclat (oxygénation), apaisement inflammatoire. Les résultats sont <b>visibles et durables</b>.</p>

<h2>Technique d'utilisation</h2>
<p>Appliquez huile ou sérums d'abord. Raclage doux du bas du visage vers les oreilles et lymphe. <b>Lenteur est clé</b>, pas de force. 5 minutes suffisent.</p>

<h2>Fréquence optimale</h2>
<p>3-5 fois par semaine le soir. Compatible avec tous les ingrédients actifs, peut remplacer le massage manuel habituel.</p>`,
    date: "2026-03-02",
    modified: "2026-03-08",
    author: { name: "Sophie Moreau", slug: "sophie-moreau" },
    featuredImage: {
      url: "https://picsum.photos/seed/gua-sha-facial/1200/675",
      alt: "Gua Sha massage facial bénéfices",
      width: 1200,
      height: 675,
    },
    categories: ["bien-etre", "tendances"],
    tags: ["massage", "drainage", "anti-age"],
    seo: {
      title: "Gua Sha facial : bénéfices et technique | Perfect Skin",
      description:
        "Gua Sha facial : drainage lymphatique et fermeté avec cette technique ancestrale.",
      canonicalUrl: "https://perfect-skin.fr/gua-sha-massage-facial-benefices",
      openGraph: {
        title: "Gua Sha facial : massage anti-âge et drainage lymphatique",
        description: "Technique de massage Gua Sha pour peau tonique et lumineuse.",
        type: "article",
      },
      jsonLd: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Gua Sha facial : massage anti-âge et drainage lymphatique",
        datePublished: "2026-03-02",
        author: { "@type": "Person", name: "Sophie Moreau" },
      }),
    },
  },
  {
    id: "cG9zdDoxNDY=",
    slug: "la-roche-posay-science-water",
    title: "La Roche-Posay : eau thermale et science dermatologique française",
    excerpt:
      "Depuis 1905, La Roche-Posay soigne les peaux sensibles avec son eau thermale unique. Découvrez cette marque incontournable.",
    content: `<h2>L'eau thermale : cœur de la marque</h2>
<p>Captée en Nouvelle-Aquitaine, l'eau thermale de La Roche-Posay est <b>riche en minéraux apaisants et antioxydants</b>. C'est l'essence de chaque produit.</p>

<h2>Positionnement dermatologique</h2>
<p>Créée en collaboration avec dermatologues, La Roche-Posay est la marque <b>de référence pour peaux réactives et problématiques</b>. Efficacité testée cliniquement.</p>

<h2>Gammes phares</h2>
<p>Effaclar (acné), Toleriane (peau sensible), Redermic (anti-âge), Anthelios (solaire). Chaque gamme cible un problème spécifique avec formules adaptées.</p>

<h2>Innovation continue</h2>
<p>La Roche-Posay investit massivement en R&D. Partenaire de dermatologues internationaux, la marque <b>anticipe les besoins de peau moderne</b>.</p>`,
    date: "2026-02-07",
    modified: "2026-02-15",
    author: { name: "Camille Laurent", slug: "camille-laurent" },
    featuredImage: {
      url: "https://picsum.photos/seed/la-roche-posay-science/1200/675",
      alt: "La Roche-Posay eau thermale dermatologie",
      width: 1200,
      height: 675,
    },
    categories: ["top-marques", "blog"],
    tags: ["peau-sensible", "dermatologie", "innovation"],
    brands: ["la-roche-posay"],
    seo: {
      title: "La Roche-Posay : eau thermale et science | Perfect Skin",
      description:
        "La Roche-Posay : histoire, eau thermale et gammes dermatologiques.",
      canonicalUrl: "https://perfect-skin.fr/la-roche-posay-science-water",
      openGraph: {
        title: "La Roche-Posay : eau thermale et science dermatologique française",
        description: "Découvrez la marque dermatologique française de référence.",
        type: "article",
      },
      jsonLd: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "La Roche-Posay : eau thermale et science dermatologique française",
        datePublished: "2026-02-07",
        author: { "@type": "Person", name: "Camille Laurent" },
      }),
    },
  },
  {
    id: "cG9zdDoxNDc=",
    slug: "taches-brunes-comment-prevenir-traiter",
    title: "Taches brunes : prévention et traitement efficace",
    excerpt:
      "Taches de soleil ou photovieillissement ? Découvrez comment prévenir et traiter les taches brunes avec ingrédients prouvés.",
    content: `<h2>Causes des taches brunes</h2>
<p>Surexposition solaire (cause principale), vieillissement, hormones. <b>Accumulation de mélanine</b> crée des zones pigmentées visibles et inesthétiques.</p>

<h2>Prévention : la meilleure stratégie</h2>
<p>SPF quotidien est absolument essentiel. Complétez avec antioxydants (vitamine C, polyphénols) <b>qui bloquent la création de nouvelles taches</b>.</p>

<h2>Traitement des taches existantes</h2>
<p>Vitamine C (inhibe mélanine), niacinamide (régule la pigmentation), rétinol (exfolie). Résultats visibles en 8-12 semaines sur taches légères à modérées.</p>

<h2>Solutions professionnelles</h2>
<p>Pour taches sévères, laser ou peeling chimique sont <b>solution définitive</b> mais demandent suivi médical.</p>`,
    date: "2026-01-25",
    modified: "2026-02-10",
    author: { name: "Émilie Dubois", slug: "emilie-dubois" },
    featuredImage: {
      url: "https://picsum.photos/seed/taches-brunes/1200/675",
      alt: "Taches brunes pigmentation traitement",
      width: 1200,
      height: 675,
    },
    categories: ["beaute"],
    tags: ["vitamine-c", "spf-protection", "anti-age"],
    brands: ["la-roche-posay", "caudalie", "paulas-choice"],
    seo: {
      title: "Taches brunes : traitement efficace | Perfect Skin",
      description:
        "Prévention et traitement des taches brunes : actifs et techniques efficaces.",
      canonicalUrl: "https://perfect-skin.fr/taches-brunes-comment-prevenir-traiter",
      openGraph: {
        title: "Taches brunes : prévention et traitement efficace",
        description: "Éliminez les taches brunes avec nos solutions efficaces.",
        type: "article",
      },
      jsonLd: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Taches brunes : prévention et traitement efficace",
        datePublished: "2026-01-25",
        author: { "@type": "Person", name: "Émilie Dubois" },
      }),
    },
  },
  {
    id: "cG9zdDoxNDg=",
    slug: "routine-homme-soin-peau-basique",
    title: "Soin peau homme : routine basique efficace et simple",
    excerpt:
      "Les hommes aussi ont besoin de soins ! Découvrez une routine simple, efficace et sans prise de tête.",
    content: `<h2>Mythe : les hommes n'ont pas besoin de soins</h2>
<p>Faux. La peau masculine a même <b>plus de sébum et d'épaisseur</b>. Elle vieillit différemment mais demande protection.</p>

<h2>Les 3 indispensables</h2>
<p>1. Nettoyant (matin-soir) pour éliminer pollution et sébum. 2. Hydratant (soir) pour nourrir la peau. 3. SPF (matin) indispensable.</p>

<h2>Ingrédients efficaces pour hommes</h2>
<p>Niacinamide (régule sébum), caféine (réveille la peau), acide salicylique (purifie). Pas d'ingrédients "genrés", juste efficacité adaptée.</p>

<h2>Rasage et après-rasage</h2>
<p>Un bon après-rasage apaise l'irritation immédiate. <b>Puis appliquez le sérums/hydratant habituel</b> pour protection complète.</p>`,
    date: "2026-03-05",
    modified: "2026-03-10",
    author: { name: "Margaux Petit", slug: "margaux-petit" },
    featuredImage: {
      url: "https://picsum.photos/seed/soin-homme/1200/675",
      alt: "Routine soin peau homme simple",
      width: 1200,
      height: 675,
    },
    categories: ["beaute", "blog"],
    tags: ["routine-matin", "niacinamide", "spf-protection"],
    seo: {
      title: "Soin peau homme : routine simple et efficace | Perfect Skin",
      description: "Routine basique et efficace de soin peau pour hommes.",
      canonicalUrl: "https://perfect-skin.fr/routine-homme-soin-peau-basique",
      openGraph: {
        title: "Soin peau homme : routine basique efficace et simple",
        description: "Guide soin peau homme sans complications.",
        type: "article",
      },
      jsonLd: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Soin peau homme : routine basique efficace et simple",
        datePublished: "2026-03-05",
        author: { "@type": "Person", name: "Margaux Petit" },
      }),
    },
  },
  {
    id: "cG9zdDoxNDk=",
    slug: "barrier-repair-routine-eczema",
    title: "Réparer la barrière cutanée : routine pour eczéma et dermatite",
    excerpt:
      "Barrière cutanée endommagée cause eczéma, dermatite, sensibilité extrême. Découvrez comment la réparer progressivement.",
    content: `<h2>Signes d'une barrière endommagée</h2>
<p>Tiraillement intense, irritation chronique, réaction à produits tolérés avant, sensation de brûlure. <b>La barrière laisse l'eau s'échapper</b>.</p>

<h2>Principes de réparation</h2>
<p>Minimalisme strict (max 3 produits), ingrédients apaisants, restaurateurs lipidiques. <b>Patience : 3-6 semaines minimum</b> pour voir amélioration.</p>

<h2>Ingrédients clés</h2>
<p>Centella asiatica (cicatrisante), céramides (reconstruit les lipides), glycérine (hydrate), colloïde d'avoine (apaise). Combinés, ils <b>restaurent l'intégrité de la barrière</b>.</p>

<h2>Éviter absolument</h2>
<p>Parfum, alcool, actifs puissants (rétinol, acides). Même nettoyants agressifs. Utilisez <b>un vrai nettoyant dermatologique</b>.</p>`,
    date: "2025-12-05",
    modified: "2026-01-10",
    author: { name: "Émilie Dubois", slug: "emilie-dubois" },
    featuredImage: {
      url: "https://picsum.photos/seed/barrier-repair/1200/675",
      alt: "Réparer barrière cutanée eczéma dermatite",
      width: 1200,
      height: 675,
    },
    categories: ["beaute", "bien-etre"],
    tags: ["peau-sensible", "hydratation", "apaisement"],
    brands: ["bioderma", "avene", "la-roche-posay"],
    seo: {
      title: "Réparer la barrière cutanée : routine | Perfect Skin",
      description:
        "Guide de réparation de barrière cutanée pour eczéma et dermatite.",
      canonicalUrl: "https://perfect-skin.fr/barrier-repair-routine-eczema",
      openGraph: {
        title: "Réparer la barrière cutanée : routine pour eczéma et dermatite",
        description: "Restaurez votre barrière cutanée avec notre guide expert.",
        type: "article",
      },
      jsonLd: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Réparer la barrière cutanée : routine pour eczéma et dermatite",
        datePublished: "2025-12-05",
        author: { "@type": "Person", name: "Émilie Dubois" },
      }),
    },
  },
  {
    id: "cG9zdDoxNTA=",
    slug: "cleansing-balm-top-marques",
    title: "Top 5 baumes nettoyants luxe : test et comparaison",
    excerpt:
      "Baumes nettoyants haut de gamme : formules riches qui nettoient vraiment. Notre sélection des meilleurs.",
    content: `<h2>Pourquoi les baumes nettoyants</h2>
<p>Dissolution complète du maquillage et sébum. Texture riche qui <b>n'assèche jamais</b>, même pour peaux sensibles.</p>

<h2>Ce qu'on attend d'un bon baume</h2>
<p>S'émulsifie rapidement à l'eau, laisse la peau douce (pas collante), arôme agréable, se rince parfaitement. Ces cinq baumes le font tous.</p>

<h2>Nos choix premium</h2>
<p>Testés pendant 4 semaines chacun, nous avons sélectionné les meilleurs pour efficacité, senteur et impact visuel sur la peau.</p>`,
    date: "2026-02-26",
    modified: "2026-03-02",
    author: { name: "Camille Laurent", slug: "camille-laurent" },
    featuredImage: {
      url: "https://picsum.photos/seed/cleansing-balm/1200/675",
      alt: "Top 5 baumes nettoyants luxe comparaison",
      width: 1200,
      height: 675,
    },
    categories: ["beaute", "tendances"],
    tags: ["nettoyage", "routine-matin", "luxe"],
    brands: ["clarins", "estee-lauder", "lancome", "kiehl"],
    seo: {
      title: "Top 5 baumes nettoyants luxe | Perfect Skin",
      description:
        "Test et comparatif des meilleurs baumes nettoyants haut de gamme 2026.",
      canonicalUrl: "https://perfect-skin.fr/cleansing-balm-top-marques",
      openGraph: {
        title: "Top 5 baumes nettoyants luxe : test et comparaison",
        description: "Nos meilleurs baumes nettoyants testés et approuvés.",
        type: "article",
      },
      jsonLd: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Top 5 baumes nettoyants luxe : test et comparaison",
        datePublished: "2026-02-26",
        author: { "@type": "Person", name: "Camille Laurent" },
      }),
    },
    affiliateProducts: [
      {
        name: "Cleansing Comfort Oil",
        brand: "Kiehl's",
        merchant: "sephora",
        affiliateUrl: "https://sephora.fr/kiehls-cleansing",
        price: "48,00 €",
        image: "https://picsum.photos/seed/product-cleanse-1/200/200",
        pros: ["Texture légère", "Enlève tout", "Odeur classique"],
        cons: ["Prix élevé", "Flacon petit"],
      },
      {
        name: "Makeup Remover Oil",
        brand: "Clarins",
        merchant: "marionnaud",
        affiliateUrl: "https://marionnaud.fr/clarins",
        price: "42,00 €",
        image: "https://picsum.photos/seed/product-cleanse-2/200/200",
        pros: ["Hydrate en nettoyant", "Senteur nature", "Format généreux"],
        cons: ["Texture huileuse", "Peut laisser résidu"],
      },
      {
        name: "Gentle Cleansing Balm",
        brand: "Estée Lauder",
        merchant: "amazon",
        affiliateUrl: "https://amazon.fr/estee-lauder",
        price: "55,00 €",
        image: "https://picsum.photos/seed/product-cleanse-3/200/200",
        pros: ["Ultra riche", "Maquillage waterproof", "Peau ultra douce"],
        cons: ["Très cher", "Luxe uniquement"],
      },
    ],
  },
  {
    id: "cG9zdDoxNTE=",
    slug: "sephora-histoire-retail-beaute",
    title: "Sephora : histoire et évolution du retail beauté français",
    excerpt:
      "Fondée en 1969 à Limoges, Sephora a révolutionné l'accès à la beauté en France et dans le monde.",
    content: `<h2>Les origines révolutionnaires</h2>
<p>Sephora invente le concept de <b>"Beauty à volonté"</b> : libre accès aux produits, testeurs disponibles, pas de vendeur pressant.</p>

<h2>Expansion et diversification</h2>
<p>Rachetée par LVMH, Sephora devient leader mondial. Présence physique et digitale fusionnée pour <b>expérience omnicanale</b>.</p>

<h2>Rôle de prescripteur</h2>
<p>Sephora donne tendance : les produits vedettes en vitrine deviennent bestsellers. C'est <b>une plateforme de découverte majeure</b>.</p>

<h2>Services modernisés</h2>
<p>Beauty consultants, services de maquillage, livraison rapide. Sephora adapte constamment son offre pour rester pertinent.</p>`,
    date: "2026-01-28",
    modified: "2026-02-05",
    author: { name: "Margaux Petit", slug: "margaux-petit" },
    featuredImage: {
      url: "https://picsum.photos/seed/sephora-histoire/1200/675",
      alt: "Sephora histoire retail beauté français",
      width: 1200,
      height: 675,
    },
    categories: ["top-marques"],
    tags: ["histoire-beaute", "retail"],
    seo: {
      title: "Sephora : histoire du retail beauté | Perfect Skin",
      description:
        "Histoire de Sephora : évolution du retail beauté français et mondial.",
      canonicalUrl: "https://perfect-skin.fr/sephora-histoire-retail-beaute",
      openGraph: {
        title: "Sephora : histoire et évolution du retail beauté français",
        description: "Découvrez l'histoire de Sephora et sa révolution beauté.",
        type: "article",
      },
      jsonLd: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Sephora : histoire et évolution du retail beauté français",
        datePublished: "2026-01-28",
        author: { "@type": "Person", name: "Margaux Petit" },
      }),
    },
  },
  {
    id: "cG9zdDoxNTI=",
    slug: "bioflavonoide-polyphenol-antioxydant",
    title: "Bioflavonoïdes et polyphénols : antioxydants de pointe pour la peau",
    excerpt:
      "Molécules naturelles d'une puissance exceptionnelle contre le vieillissement. Découvrez ces antioxydants de nouvelle génération.",
    content: `<h2>Qu'est-ce que les bioflavonoïdes</h2>
<p>Molécules naturelles issues de plantes ayant <b>pouvoir antioxydant 50x supérieur à la vitamine E</b>. Elles neutralisent les radicaux libres agressifs.</p>

<h2>Polyphénols : l'arme secrète</h2>
<p>Présents en thé vert, raisin rouge, grenade. <b>Protègent ADN cellulaire</b> et stimulent les défenses naturelles de la peau.</p>

<h2>Combo gagnant : vitamine C + polyphénols</h2>
<p>Vitamine C oxyde les radicaux libres, polyphénols préviennent leur formation. <b>Effet synergique redoutable</b> pour peau vraiment protégée.</p>

<h2>Sources naturelles</h2>
<p>Extraits de raisin (Caudalie), thé vert, pomme. Cherchez "polyphenol-rich" ou "antioxidant complex" sur les étiquettes.</p>`,
    date: "2025-11-30",
    modified: "2026-01-15",
    author: { name: "Sophie Moreau", slug: "sophie-moreau" },
    featuredImage: {
      url: "https://picsum.photos/seed/bioflavonoid/1200/675",
      alt: "Bioflavonoïdes polyphénols antioxydants",
      width: 1200,
      height: 675,
    },
    categories: ["beaute", "tendances"],
    tags: ["antioxydants", "anti-age", "bio-naturel"],
    brands: ["caudalie", "paulas-choice"],
    seo: {
      title: "Bioflavonoïdes et polyphénols : antioxydants | Perfect Skin",
      description:
        "Bioflavonoïdes et polyphénols : antioxydants naturels puissants pour anti-âge.",
      canonicalUrl: "https://perfect-skin.fr/bioflavonoide-polyphenol-antioxydant",
      openGraph: {
        title: "Bioflavonoïdes et polyphénols : antioxydants de pointe pour la peau",
        description: "Antioxydants naturels de dernière génération pour peau jeune.",
        type: "article",
      },
      jsonLd: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Bioflavonoïdes et polyphénols : antioxydants de pointe pour la peau",
        datePublished: "2025-11-30",
        author: { "@type": "Person", name: "Sophie Moreau" },
      }),
    },
  },
];
