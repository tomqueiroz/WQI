/**
 * AiFirstTm — renders "AI First" with ™ as a superscript at 50% font-size.
 * Use inside any heading where you'd otherwise write "AI First™".
 *
 * Usage:
 *   import { AiFirstTm } from '@/components/AiFirstTm';
 *   <h1>Liderança <AiFirstTm /> que o mercado vai seguir</h1>
 *
 * For "Geração AI First™" use <GeracaoAiFirstTm /> shorthand.
 */

export function AiFirstTm() {
  return (
    <>
      AI First<sup style={{ fontSize: '0.5em', fontWeight: 'inherit', verticalAlign: 'super', lineHeight: 0 }}>™</sup>
    </>
  );
}

export function GeracaoAiFirstTm() {
  return (
    <>
      Geração AI First<sup style={{ fontSize: '0.5em', fontWeight: 'inherit', verticalAlign: 'super', lineHeight: 0 }}>™</sup>
    </>
  );
}

/**
 * Utility: replace "AI First™" occurrences in a plain string with JSX.
 * Useful when the text comes from a data array and can't be hardcoded as JSX.
 *
 * Usage:
 *   import { renderAiFirst } from '@/components/AiFirstTm';
 *   <h2>{renderAiFirst(prog.title)}</h2>
 */
import React from 'react';

export function renderAiFirst(text: string): React.ReactNode {
  // Split on "AI First™" (and variants with ™ entity or without)
  const regex = /AI[\s-]First[™™]?/g;
  const parts = text.split(regex);
  const matches = text.match(regex) ?? [];

  if (matches.length === 0) return text;

  return (
    <>
      {parts.map((part, i) => (
        <React.Fragment key={i}>
          {part}
          {i < matches.length && <AiFirstTm />}
        </React.Fragment>
      ))}
    </>
  );
}
