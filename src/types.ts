/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface QuestionCondition {
  label: string;
  template: string;
}

export interface QuestionItem {
  id: string; // e.g. "avant-1"
  number: number;
  text: string;
  template?: string; // used if no conditions
  conditions?: QuestionCondition[]; // used if there are branches (e.g., personalization possible / not possible)
}

export interface CategoryItem {
  id: string; // "avant", "pendant", "apres", "relationnel", "autres"
  number: number;
  title: string;
  emoji: string;
  iconName: string; // Lucide icon identifier
  description: string;
  questions: QuestionItem[];
}
