import { ReactNode } from "react";
import { Icon, IconifyIcon, IconProps } from "@iconify/react";

export type iconAsProp = IconifyIcon | ReactNode;
export type iconRN = Record<allRequiredIcons, ReactNode>;

export const AIIcon = ({ className }: { className?: string }) => {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M9.107 5.448C9.705 3.698 12.123 3.645 12.832 5.289L12.892 5.449L13.699 7.809C13.8839 8.35023 14.1828 8.84551 14.5754 9.26142C14.9681 9.67734 15.4453 10.0042 15.975 10.22L16.192 10.301L18.552 11.107C20.302 11.705 20.355 14.123 18.712 14.832L18.552 14.892L16.192 15.699C15.6506 15.8838 15.1551 16.1826 14.739 16.5753C14.3229 16.9679 13.9959 17.4452 13.78 17.975L13.699 18.191L12.893 20.552C12.295 22.302 9.877 22.355 9.169 20.712L9.107 20.552L8.301 18.192C8.11618 17.6506 7.81737 17.1551 7.42474 16.739C7.03211 16.3229 6.55479 15.9959 6.025 15.78L5.809 15.699L3.449 14.893C1.698 14.295 1.645 11.877 3.289 11.169L3.449 11.107L5.809 10.301C6.35023 10.1161 6.84551 9.81719 7.26142 9.42457C7.67733 9.03195 8.00421 8.55469 8.22 8.025L8.301 7.809L9.107 5.448ZM19 2C19.1871 2 19.3704 2.05248 19.5292 2.15147C19.6879 2.25046 19.8157 2.392 19.898 2.56L19.946 2.677L20.296 3.703L21.323 4.053C21.5105 4.1167 21.6748 4.23462 21.7952 4.39182C21.9156 4.54902 21.9866 4.73842 21.9993 4.93602C22.0119 5.13362 21.9656 5.33053 21.8662 5.50179C21.7668 5.67304 21.6188 5.81094 21.441 5.898L21.323 5.946L20.297 6.296L19.947 7.323C19.8832 7.51043 19.7652 7.6747 19.6079 7.79499C19.4507 7.91529 19.2612 7.98619 19.0636 7.99872C18.866 8.01125 18.6692 7.96484 18.498 7.86538C18.3268 7.76591 18.189 7.61787 18.102 7.44L18.054 7.323L17.704 6.297L16.677 5.947C16.4895 5.8833 16.3252 5.76538 16.2048 5.60819C16.0844 5.45099 16.0134 5.26158 16.0007 5.06398C15.9881 4.86638 16.0344 4.66947 16.1338 4.49821C16.2332 4.32696 16.3812 4.18906 16.559 4.102L16.677 4.054L17.703 3.704L18.053 2.677C18.1204 2.47943 18.248 2.30791 18.4178 2.1865C18.5877 2.06509 18.7912 1.99987 19 2Z"
        fill="url(#paint0_linear_17_10)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_17_10"
          x1="21.5"
          y1="1.5"
          x2="1"
          y2="20.5"
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#3BC4F2" />
          <stop offset="0.33" stopColor="#7A69F9" />
          <stop offset="0.66" stopColor="#F26378" />
          <stop offset="0.95" stopColor="#F5833F" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export function Icon2RN({ icon, ...props }: IconProps | { icon: iconAsProp }): ReactNode {
  if (typeof icon === "string" || (typeof icon === "object" && icon !== null && "body" in icon)) {
    return <Icon {...props} icon={icon} />;
  }
  return icon;
}

const R_icons = [
  "settings",
  "widget",
  "lock",
  "unlock",
  "habitTracker",
  "pin",
  "show",
  "hide",
  "search",
  "checklist",
  "space",
  "bookmark",
  "reset",
  "edit",
  "delete_",
  "menu",
  "add",
  "note",
] as const;
export type allRequiredIcons = (typeof R_icons)[number];
export const requiredIcons: allRequiredIcons[] = [...R_icons];
export type iconData = Record<allRequiredIcons, iconAsProp>;

export function transformIcons<T extends Partial<iconData>>(
  iconObject: T,
  prefix: string | null = null,
  itemToReplace: string = "",
  replacementItem: string = ""
): T extends iconData ? iconRN : Partial<iconRN> {
  const transformed: Partial<iconRN> = {};

  for (const [name, val] of Object.entries(iconObject)) {
    let transformedVal: iconAsProp = val;
    if (typeof val === "string") {
      if (itemToReplace !== replacementItem) {
        transformedVal = val.replace(itemToReplace, replacementItem);
      }
      if (prefix) {
        transformedVal = `${prefix}:${transformedVal}`;
      }
    }
    transformed[name as allRequiredIcons] = (
      <Icon2RN className="theme-icons" icon={transformedVal} />
    );
  }

  return transformed as T extends iconData ? iconRN : Partial<iconRN>;
}

export const IconPacks = [
  "oui",
  "dashicons",
  "icons8",
  "raphael",
  "flat-color-icons",
  "eva",
  "fe",
  "la",
  "gridicons",
  "maki",
  "zondicons",
  "el",
  "pixelarticons",
  "foundation",
  "fxemoji",
  "jam",
  "noto",
  "fluent-emoji-flat",
];

export const iconPackNames: Record<string, string> = {
  "material-symbols": "Material Symbols",
  "material-symbols-light": "Material Symbols Light",
  ic: "Google Material Icons",
  mdi: "Material Design Icons",
  ph: "Phosphor",
  solar: "Solar",
  tabler: "Tabler Icons",
  hugeicons: "Huge Icons",
  mingcute: "MingCute Icon",
  ri: "Remix Icon",
  bi: "Bootstrap Icons",
  carbon: "Carbon",
  iconamoon: "IconaMoon",
  iconoir: "Iconoir",
  ion: "IonIcons",
  lucide: "Lucide",
  "lucide-lab": "Lucide Lab",
  uil: "Unicons",
  tdesign: "TDesign Icons",
  teenyicons: "Teenyicons",
  clarity: "Clarity",
  bx: "BoxIcons",
  bxs: "BoxIcons Solid",
  majesticons: "Majesticons",
  "ant-design": "Ant Design Icons",
  lsicon: "Lsicon",
  gg: "css.gg",
  "gravity-ui": "Gravity UI Icons",
  octicon: "Octicons",
  memory: "Memory Icons",
  cil: "CoreUI Free",
  flowbite: "Flowbite Icons",
  mynaui: "Myna UI Icons",
  basil: "Basil",
  pixelarticons: "Pixelarticons",
  "akar-icons": "Akar Icons",
  ci: "coolicons",
  proicons: "ProIcons",
  "system-uicons": "System UIcons",
  typcn: "Typicons",
  "radix-icons": "Radix Icons",
  zondicons: "Zondicons",
  ep: "Element Plus",
  circum: "Circum Icons",
  "mdi-light": "Material Design Light",
  fe: "Feather Icon",
  "eos-icons": "EOS Icons",
  "bitcoin-icons": "Bitcoin Icons",
  charm: "Charm Icons",
  prime: "Prime Icons",
  humbleicons: "Humbleicons",
  uiw: "uiw icons",
  uim: "Unicons Monochrome",
  uit: "Unicons Thin Line",
  uis: "Unicons Solid",
  maki: "Maki",
  gridicons: "Gridicons",
  mi: "Mono Icons",
  cuida: "Cuida Icons",
  weui: "WeUI Icon",
  quill: "Quill Icons",
  "duo-icons": "Duoicons",
  gala: "Gala Icons",
  "lets-icons": "Lets Icons",
  f7: "Framework7 Icons",
  mage: "Mage Icons",
  marketeq: "Marketeq",
  fluent: "Fluent UI System Icons",
  "fluent-color": "Fluent UI System Color Icons",
  "icon-park-outline": "IconPark Outline",
  "icon-park-solid": "IconPark Solid",
  "icon-park-twotone": "IconPark TwoTone",
  "icon-park": "IconPark",
  jam: "Jam Icons",
  heroicons: "HeroIcons",
  pajamas: "Gitlab SVGs",
  "pepicons-pop": "Pepicons Pop!",
  "pepicons-print": "Pepicons Print",
  "pepicons-pencil": "Pepicons Pencil",
  bytesize: "Bytesize Icons",
  ei: "Evil Icons",
  streamline: "Streamline",
  guidance: "Guidance",
  "fa6-solid": "Font Awesome Solid",
  "fa6-regular": "Font Awesome Regular",
  ooui: "OOUI",
  "rivet-icons": "Rivet Icons",
  nimbus: "Nimbus",
  oui: "OpenSearch UI",
  formkit: "FormKit Icons",
  "line-md": "Material Line Icons",
  meteocons: "Meteocons",
  "svg-spinners": "SVG Spinners",
  openmoji: "OpenMoji",
  twemoji: "Twitter Emoji",
  noto: "Noto Emoji",
  "fluent-emoji": "Fluent Emoji",
  "fluent-emoji-flat": "Fluent Emoji Flat",
  "fluent-emoji-high-contrast": "Fluent Emoji High Contrast",
  "noto-v1": "Noto Emoji (v1)",
  emojione: "Emoji One (Colored)",
  "emojione-monotone": "Emoji One (Monotone)",
  "emojione-v1": "Emoji One (v1)",
  fxemoji: "Firefox OS Emoji",
  "streamline-emojis": "Streamline Emojis",
  bxl: "BoxIcons Logo",
  logos: "SVG Logos",
  "simple-icons": "Simple Icons",
  cib: "CoreUI Brands",
  "fa6-brands": "Font Awesome Brands",
  nonicons: "Nonicons",
  arcticons: "Arcticons",
  cbi: "Custom Brand Icons",
  brandico: "Brandico",
  "entypo-social": "Entypo+ Social",
  token: "Web3 Icons",
  "token-branded": "Web3 Icons Branded",
  cryptocurrency: "Cryptocurrency Icons",
  "cryptocurrency-color": "Cryptocurrency Color Icons",
  flag: "Flag Icons",
  "circle-flags": "Circle Flags",
  flagpack: "Flagpack",
  cif: "CoreUI Flags",
  gis: "Font-GIS",
  map: "Map Icons",
  geo: "GeoGlyphs",
  "vscode-icons": "VSCode Icons",
  codicon: "Codicons",
  "file-icons": "File Icons",
  devicon: "Devicon",
  "devicon-plain": "Devicon Plain",
  catppuccin: "Catppuccin Icons",
  "skill-icons": "Skill Icons",
  unjs: "UnJS Logos",
  "game-icons": "Game Icons",
  fad: "FontAudio",
  academicons: "Academicons",
  wi: "Weather Icons",
  healthicons: "Health Icons",
  "medical-icon": "Medical Icons",
  covid: "Covid Icons",
  la: "Line Awesome",
  eva: "Eva Icons",
  dashicons: "Dashicons",
  "flat-color-icons": "Flat Color Icons",
  entypo: "Entypo+",
  foundation: "Foundation",
  raphael: "Raphael",
  icons8: "Icons8 Windows 10 Icons",
  iwwa: "Innowatio Font",
  "heroicons-outline": "HeroIcons v1 Outline",
  "heroicons-solid": "HeroIcons v1 Solid",
  "fa-solid": "Font Awesome 5 Solid",
  "fa-regular": "Font Awesome 5 Regular",
  "fa-brands": "Font Awesome 5 Brands",
  fa: "Font Awesome 4",
  "fluent-mdl2": "Fluent UI MDL2",
  fontisto: "Fontisto",
  "icomoon-free": "IcoMoon Free",
  subway: "Subway Icon Set",
  oi: "Open Iconic",
  wpf: "Icons8 Windows 8 Icons",
  "simple-line-icons": "Simple line icons",
  et: "Elegant",
  el: "Elusive Icons",
  vaadin: "Vaadin Icons",
  "grommet-icons": "Grommet Icons",
  whh: "WebHostingHub Glyphs",
  "si-glyph": "SmartIcons Glyph",
  zmdi: "Material Design Iconic Font",
  ls: "Ligature Symbols",
  bpmn: "BPMN",
  "flat-ui": "Flat UI Icons",
  vs: "Vesper Icons",
  topcoat: "TopCoat Icons",
  il: "Icalicons",
  websymbol: "Web Symbols Liga",
  fontelico: "Fontelico",
  ps: "PrestaShop Icons",
  feather: "Feather Icons",
  "mono-icons": "Mono Icons",
  pepicons: "Pepicons",
};
