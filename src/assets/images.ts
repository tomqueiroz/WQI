// WQI Mentorship — Image Registry

export const IMAGES = {
  // === LOGOS ===
  LOGO_WQI_BRANCO:  "/images/wqi branco.png",
  LOGO_WQI_COLOR:   "/images/wqi copper.png",

  // === WELLINGTON QUEIROZ PORTRAITS ===
  TOM_HERO_PORTRAIT: "/images/1.png",
  TOM_SOBRE:         "/images/tom_sobre_speaker_20260502_034950.png",
  TOM_HERO_BG:       "/images/tom speaking 11.png",
  TOM_PROFILE_ALT:   "/images/magnific_photo-a-40yearold-middle-_2905621111.png",

  // === PARALLAX QUOTE SECTIONS ===
  PARALLAX_EXECUTIVE:          "/images/105957.jpg",
  PARALLAX_HUMAN_ROBOT:        "/images/1439.jpg",
  PARALLAX_HOLOGRAPHIC:        "/images/1657.jpg",
  PARALLAX_AI_PRESENTATION:    "/images/11548.jpg",
  PARALLAX_HANDSHAKE_ROBOT:    "/images/1662.jpg",
  PARALLAX_AI_MARKETING:       "/images/1715.jpg",
} as const;

export type ImageKey = keyof typeof IMAGES;
