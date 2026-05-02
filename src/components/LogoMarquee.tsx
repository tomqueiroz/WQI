/**
 * LogoMarquee — 3 faixas deslizantes com sentidos alternados
 * CSS-only animation (requestAnimationFrame-free) → máxima leveza
 */

import { IMAGES } from '@/assets/images';

// ─── Todos os logos disponíveis (antigos nomeados + 21 novos) ───
const ALL_LOGOS: { src: string; alt: string }[] = [
  // Logos nomeados existentes
  { src: IMAGES.MCD_13,      alt: 'McDonald\'s' },
  { src: IMAGES.ITAU_14,     alt: 'Itaú' },
  { src: IMAGES.HERING_15,   alt: 'Hering' },
  { src: IMAGES.GREENP_16,   alt: 'Greenpeace' },
  { src: IMAGES.GPA_17,      alt: 'GPA' },
  { src: IMAGES.CEA_18,      alt: 'C&A' },
  { src: IMAGES.ANIMA_19,    alt: 'Ânima' },
  { src: IMAGES.UNIVERSAL_20,alt: 'Universal' },
  { src: IMAGES.STONE_21,    alt: 'Stone' },
  { src: IMAGES.SAMS_22,     alt: 'Sam\'s Club' },
  { src: IMAGES.PUBLI_23,    alt: 'Publi' },
  { src: IMAGES.PEPSI_24,    alt: 'Pepsi' },
  { src: IMAGES.EPIC_25,     alt: 'Epic' },
  { src: IMAGES.COINBASE_26, alt: 'Coinbase' },
  { src: IMAGES.SG_27,       alt: 'SG' },
  { src: IMAGES.NVIDIA_28,   alt: 'Nvidia' },
  { src: IMAGES.WMC_29,      alt: 'WMC' },
  { src: IMAGES.SPOTIFY_30,  alt: 'Spotify' },
  { src: IMAGES.REMAX_31,    alt: 'Remax' },
  { src: IMAGES.MULTIP_32,   alt: 'Multiplan' },
  { src: IMAGES.FLAM_33,     alt: 'Flamengo' },
  { src: IMAGES.SHOPIFY_34,  alt: 'Shopify' },
  { src: IMAGES.SALTA_35,    alt: 'Salta' },
  { src: IMAGES.NIVEA_36,    alt: 'Nivea' },
  // 21 novos logos (numerados) — sem IMG_1_54 (foto, não logo)
  { src: IMAGES.IMG_2_51,    alt: 'Cliente 2' },
  { src: IMAGES.IMG_3_56,    alt: 'Cliente 3' },
  { src: IMAGES.IMG_4_45,    alt: 'Cliente 4' },
  { src: IMAGES.IMG_5_44,    alt: 'Cliente 5' },
  { src: IMAGES.IMG_6_43,    alt: 'Cliente 6' },
  { src: IMAGES.IMG_7_40,    alt: 'Cliente 7' },
  { src: IMAGES.IMG_8_39,    alt: 'Cliente 8' },
  { src: IMAGES.IMG_9_37,    alt: 'Cliente 9' },
  { src: IMAGES.IMG_10_38,   alt: 'Cliente 10' },
  { src: IMAGES.IMG_11_55,   alt: 'Cliente 11' },
  { src: IMAGES.IMG_12_57,   alt: 'Cliente 12' },
  { src: IMAGES.IMG_13_53,   alt: 'Cliente 13' },
  { src: IMAGES.IMG_14_47,   alt: 'Cliente 14' },
  { src: IMAGES.IMG_15_52,   alt: 'Cliente 15' },
  { src: IMAGES.IMG_16_49,   alt: 'Cliente 16' },
  { src: IMAGES.IMG_17_50,   alt: 'Cliente 17' },
  { src: IMAGES.IMG_18_48,   alt: 'Cliente 18' },
  { src: IMAGES.IMG_19_42,   alt: 'Cliente 19' },
  { src: IMAGES.IMG_20_46,   alt: 'Cliente 20' },
  { src: IMAGES.IMG_21_41,   alt: 'Cliente 21' },
];

// ─── Distribui logos em 3 grupos circulares ───
function chunk(arr: typeof ALL_LOGOS, n: number) {
  const size = Math.ceil(arr.length / n);
  return Array.from({ length: n }, (_, i) => arr.slice(i * size, i * size + size));
}

const ROWS = chunk(ALL_LOGOS, 3);

// ─── Cada faixa recebe direção e velocidade distintas ───
const ROW_CONFIG = [
  { direction: 'left',  duration: '50s', label: 'Faixa 1' },
  { direction: 'right', duration: '37s', label: 'Faixa 2' },
  { direction: 'left',  duration: '62s', label: 'Faixa 3' },
] as const;

interface MarqueeRowProps {
  logos: typeof ALL_LOGOS;
  direction: 'left' | 'right';
  duration: string;
}

function MarqueeRow({ logos, direction, duration }: MarqueeRowProps) {
  // Duplica para loop contínuo sem gap
  const items = [...logos, ...logos];
  const animClass = direction === 'left' ? 'marquee-left' : 'marquee-right';

  return (
    <div className="relative overflow-hidden py-3 group">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10" style={{ background: 'linear-gradient(to right, #001123, transparent)' }} />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10" style={{ background: 'linear-gradient(to left, #001123, transparent)' }} />

      <div
        className={`flex gap-10 w-max ${animClass} group-hover:[animation-play-state:paused]`}
        style={{ animationDuration: duration }}
      >
        {items.map((logo, idx) => (
          <div
            key={idx}
            className="flex items-center justify-center flex-shrink-0 px-4"
            style={{ height: '80px', minWidth: '160px' }}
          >
            <img
              src={logo.src}
              alt={logo.alt}
            className="w-auto object-contain transition-all duration-300"
              style={{ maxHeight: '60px', maxWidth: '260px', opacity: 0.6, filter: 'brightness(10) saturate(0)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.opacity = '1'; (e.currentTarget as HTMLImageElement).style.filter = 'none'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0.55'; (e.currentTarget as HTMLImageElement).style.filter = 'brightness(10) saturate(0)'; }}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function LogoMarquee() {
  return (
    <section className="py-14 overflow-hidden" style={{ background: '#001123' }}>
      {/* CSS keyframes inlined via style tag */}
      <style>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-left  { animation: marquee-left  linear infinite; }
        .marquee-right { animation: marquee-right linear infinite; }
      `}</style>

      <div className="container mx-auto px-4 mb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em' }}>
          Empresas que já transformaram resultados com W-Qi
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {ROWS.map((logos, i) => (
          <MarqueeRow
            key={i}
            logos={logos}
            direction={ROW_CONFIG[i].direction}
            duration={ROW_CONFIG[i].duration}
          />
        ))}
      </div>
    </section>
  );
}
