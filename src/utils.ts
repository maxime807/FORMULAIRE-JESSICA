/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Parses a template string and extracts all placeholder names in the format [some placeholder].
 * Safeguards and normalizes spacing and characters.
 */
export function extractPlaceholders(template: string): string[] {
  const regex = /\[([^\]]+)\]/g;
  const matches: string[] = [];
  let match;
  
  while ((match = regex.exec(template)) !== null) {
    if (!matches.includes(match[1])) {
      matches.push(match[1]);
    }
  }
  
  return matches;
}

/**
 * Normalizes a placeholder key into a human-friendly field label.
 * E.g., "nom du client" -> "Nom du client"
 * E.g., "délai, ex. 2 jours ouvrés" -> "Délai (ex. 2 jours ouvrés)"
 */
export function getPlaceholderLabel(key: string): string {
  let label = key.trim();
  // Capitalize first letter
  label = label.charAt(0).toUpperCase() + label.slice(1);
  return label;
}

/**
 * Performs simple text replacement for copying to clipboard.
 */
export function renderTemplateToText(template: string, values: Record<string, string>): string {
  let output = template;
  const placeholders = extractPlaceholders(template);
  
  for (const placeholder of placeholders) {
    const val = values[placeholder];
    if (val !== undefined && val.trim() !== "") {
      // Escape for regex and replace all instances
      const escaped = placeholder.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      output = output.replace(new RegExp(`\\[${escaped}\\]`, 'g'), val);
    }
  }
  
  return output;
}

/**
 * Formats a key suffix or helper info based on the placeholder key name.
 * Useful for assisting the user with inputs like dates, percentages, etc.
 */
export function getPlaceholderInputType(key: string): { type: string; placeholder: string } {
  const lower = key.toLowerCase();
  
  if (lower.includes("xx%") || lower.includes("pourcentage") || lower.includes("réduction")) {
    return { type: "text", placeholder: "ex. 15%" };
  }
  if (lower.includes("xxxx") || lower.includes("code")) {
    return { type: "text", placeholder: "ex. WELCOME15" };
  }
  if (lower.includes("date")) {
    return { type: "text", placeholder: "ex. 18 juin" };
  }
  if (lower.includes("délai") || lower.includes("jours")) {
    return { type: "text", placeholder: "ex. 2 jours ouvrés" };
  }
  if (lower.includes("client")) {
    return { type: "text", placeholder: "ex. Sophie" };
  }
  if (lower.includes("produit") || lower.includes("article")) {
    return { type: "text", placeholder: "ex. Vase en céramique" };
  }
  if (lower.includes("adresse")) {
    return { type: "text", placeholder: "ex. 42 Rue de l'Artisan, Paris" };
  }
  
  return { type: "text", placeholder: "Saisir la valeur..." };
}
