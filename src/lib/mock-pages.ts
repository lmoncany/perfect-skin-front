// Mock WordPress Pages used when WORDPRESS_API_URL is not set.
// These are the static/informational pages (about, legal, contact).
// Keep content minimal but realistic — once WP is wired up, editors
// create real Pages with the same slugs and these become the fallback.

import type { Page } from "./types";

const SITE_URL = "https://perfect-skin.fr";

function seoFor(slug: string, title: string, description: string) {
  return {
    title: `${title} — Perfect Skin`,
    description,
    canonicalUrl: `${SITE_URL}/${slug}/`,
    openGraph: {
      title,
      description,
      type: "website" as const,
    },
    jsonLd: "",
  };
}

export const mockPages: Page[] = [
  {
    id: "page-about",
    slug: "a-propos",
    title: "À propos",
    modified: "2026-01-15T10:00:00.000Z",
    content: `
<p>Perfect Skin est le site de référence francophone sur les soins cosmétiques, le bien-être et les rituels beauté. Notre mission : démystifier les ingrédients, décoder les étiquettes et vous aider à choisir les produits qui correspondent réellement à votre peau.</p>
<h2>Notre ligne éditoriale</h2>
<p>Chaque article est rédigé avec rigueur, sans complaisance, et dans le respect du consommateur. Nous ne publions pas de contenus sponsorisés déguisés et nous identifions clairement nos liens affiliés.</p>
<h2>Notre équipe</h2>
<p>Une équipe de rédactrices passionnées, formées à la cosmétologie et aux sciences de la peau, vous propose guides, comparatifs et avis indépendants.</p>
<h2>Nous contacter</h2>
<p>Une question, une suggestion ? Écrivez-nous à <a href="mailto:contact@perfect-skin.fr">contact@perfect-skin.fr</a>.</p>
    `.trim(),
    seo: seoFor(
      "a-propos",
      "À propos de Perfect Skin",
      "Perfect Skin est le site de référence francophone sur les soins cosmétiques, le bien-être et les rituels beauté. Découvrez notre équipe et notre ligne éditoriale."
    ),
  },
  {
    id: "page-contact",
    slug: "contact",
    title: "Contact",
    modified: "2026-01-15T10:00:00.000Z",
    content: `
<p>Vous avez une remarque, une question ou une proposition de collaboration ? Nous lisons tous les messages.</p>
<h2>Par email</h2>
<p>Écrivez-nous à <strong><a href="mailto:contact@perfect-skin.fr">contact@perfect-skin.fr</a></strong>. Nous répondons généralement sous 48h en semaine.</p>
<h2>Presse &amp; partenariats</h2>
<p>Pour toute demande presse ou partenariat, merci d'envoyer votre dossier à <a href="mailto:presse@perfect-skin.fr">presse@perfect-skin.fr</a>.</p>
<h2>Signaler une erreur</h2>
<p>Vous avez repéré une information inexacte dans un de nos articles ? Envoyez-nous le lien concerné et nous mettrons à jour rapidement.</p>
    `.trim(),
    seo: seoFor(
      "contact",
      "Contact",
      "Contactez l'équipe de Perfect Skin. Email, presse, partenariats et signalement d'erreurs."
    ),
  },
  {
    id: "page-mentions-legales",
    slug: "mentions-legales",
    title: "Mentions légales",
    modified: "2026-01-15T10:00:00.000Z",
    content: `
<h2>Éditeur du site</h2>
<p>Perfect Skin<br/>
Email : <a href="mailto:contact@perfect-skin.fr">contact@perfect-skin.fr</a><br/>
Directeur de la publication : Loïc Moncany</p>
<h2>Hébergement</h2>
  <p>Le site perfect-skin.fr est hébergé sur Cloudflare Pages avec une frontend headless séparée du CMS WordPress. L'objectif est d'offrir une expérience plus rapide et plus robuste que l'ancien thème monolithique.</p>
<h2>Propriété intellectuelle</h2>
<p>L'ensemble des contenus (textes, images, illustrations, logos) présents sur perfect-skin.fr est protégé par le droit d'auteur. Toute reproduction, même partielle, est interdite sans autorisation écrite préalable.</p>
<h2>Responsabilité</h2>
<p>Les informations publiées sur perfect-skin.fr sont fournies à titre informatif. Elles ne remplacent en aucun cas un avis médical, dermatologique ou professionnel. Consultez un professionnel de santé en cas de doute.</p>
    `.trim(),
    seo: seoFor(
      "mentions-legales",
      "Mentions légales",
      "Mentions légales de perfect-skin.fr : éditeur, hébergeur, propriété intellectuelle, liens affiliés et responsabilité."
    ),
  },
  {
    id: "page-privacy",
    slug: "politique-confidentialite",
    title: "Politique de confidentialité",
    modified: "2026-01-15T10:00:00.000Z",
    content: `
<p>Cette politique explique comment perfect-skin.fr collecte, utilise et protège vos données personnelles, conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés.</p>
<h2>Données collectées</h2>
<ul>
  <li><strong>Navigation</strong> — pages consultées, durée, navigateur, pays (données anonymisées via notre outil d'analyse).</li>
  <li><strong>Formulaires</strong> — les données que vous saisissez volontairement (email de contact, inscription newsletter).</li>
</ul>
<h2>Finalités</h2>
<p>Les données sont utilisées uniquement pour améliorer nos contenus, mesurer l'audience et répondre à vos demandes. Nous ne vendons jamais vos données à des tiers.</p>
<h2>Cookies</h2>
<p>Le site utilise des cookies essentiels au fonctionnement (préférence de thème clair/sombre, recherche) et des cookies de mesure d'audience anonymisés. Aucun cookie publicitaire tiers n'est déposé sans votre consentement.</p>
<h2>Vos droits</h2>
<p>Vous disposez d'un droit d'accès, de rectification, d'effacement et d'opposition sur vos données. Pour l'exercer, écrivez à <a href="mailto:contact@perfect-skin.fr">contact@perfect-skin.fr</a>.</p>
<h2>Contact DPO</h2>
<p>Pour toute question relative à la protection de vos données : <a href="mailto:contact@perfect-skin.fr">contact@perfect-skin.fr</a>.</p>
    `.trim(),
    seo: seoFor(
      "politique-confidentialite",
      "Politique de confidentialité",
      "Comment Perfect Skin collecte, utilise et protège vos données personnelles — conformément au RGPD et à la loi Informatique et Libertés."
    ),
  },
];
