import type { Props } from "astro";
import IconMail from "@/assets/icons/IconMail.svg";
import IconFacebook from "@/assets/icons/IconFacebook.svg";
import IconPinterest from "@/assets/icons/IconPinterest.svg";
import IconBrandX from "@/assets/icons/IconBrandX.svg";
import IconWhatsapp from "@/assets/icons/IconWhatsapp.svg";
import IconTelegram from "@/assets/icons/IconTelegram.svg";
import { SITE } from "@/config";

interface Social {
  name: string;
  href: string;
  linkTitle: string;
  icon: (_props: Props) => Element;
}

// Public socials shown in the footer.
export const SOCIALS: Social[] = [
  {
    name: "Pinterest",
    href: "https://www.pinterest.fr/",
    linkTitle: `${SITE.title} sur Pinterest`,
    icon: IconPinterest,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/",
    linkTitle: `${SITE.title} sur Facebook`,
    icon: IconFacebook,
  },
  {
    name: "Mail",
    href: "mailto:contact@perfect-skin.fr",
    linkTitle: `Nous contacter`,
    icon: IconMail,
  },
] as const;

// Social share buttons on article pages.
export const SHARE_LINKS: Social[] = [
  {
    name: "WhatsApp",
    href: "https://wa.me/?text=",
    linkTitle: `Partager sur WhatsApp`,
    icon: IconWhatsapp,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/sharer.php?u=",
    linkTitle: `Partager sur Facebook`,
    icon: IconFacebook,
  },
  {
    name: "Pinterest",
    href: "https://pinterest.com/pin/create/button/?url=",
    linkTitle: `Épingler sur Pinterest`,
    icon: IconPinterest,
  },
  {
    name: "X",
    href: "https://x.com/intent/post?url=",
    linkTitle: `Partager sur X`,
    icon: IconBrandX,
  },
  {
    name: "Telegram",
    href: "https://t.me/share/url?url=",
    linkTitle: `Partager sur Telegram`,
    icon: IconTelegram,
  },
  {
    name: "Mail",
    href: "mailto:?subject=À%20lire%20sur%20Perfect%20Skin&body=",
    linkTitle: `Partager par email`,
    icon: IconMail,
  },
] as const;

// Primary navigation shown in the header.
export const NAV: Array<{ label: string; href: string }> = [
  { label: "Beauté", href: "/categorie/beaute/" },
  { label: "Bien-être", href: "/categorie/bien-etre/" },
  { label: "Tendances", href: "/categorie/tendances/" },
  { label: "Top Marques", href: "/categorie/top-marques/" },
  { label: "Blog", href: "/categorie/blog/" },
  { label: "Feed", href: "/feed/" },
];
