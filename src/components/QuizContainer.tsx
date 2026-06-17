/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import * as Icons from "lucide-react";
import { CategoryItem, QuestionItem, QuestionCondition } from "../types";
import {
  extractPlaceholders,
  getPlaceholderLabel,
  getPlaceholderInputType,
  renderTemplateToText,
} from "../utils";

interface QuizContainerProps {
  categories: CategoryItem[];
  initialCategoryId: string | null;
  onBackToHome: () => void;
  initialSearchQuery?: string;
}

export default function QuizContainer({
  categories,
  initialCategoryId,
  onBackToHome,
  initialSearchQuery = "",
}: QuizContainerProps) {
  // Navigation & State
  const [activeCategoryId, setActiveCategoryId] = useState<string>(
    initialCategoryId || categories[0].id
  );
  
  // Search query
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [globalSearch, setGlobalSearch] = useState(false);

  // Active category object
  const activeCategory = categories.find((c) => c.id === activeCategoryId) || categories[0];

  // List of filtered questions
  const [filteredQuestions, setFilteredQuestions] = useState<QuestionItem[]>(activeCategory.questions);
  
  // Active question state
  const [activeQuestionId, setActiveQuestionId] = useState<string>("");

  // When category changes, reset active question to the first available in filtered list
  useEffect(() => {
    let questionsPool = activeCategory.questions;
    if (searchQuery.trim() !== "") {
      if (globalSearch) {
        // Search across all questions of all categories
        questionsPool = categories.flatMap((c) => c.questions);
      } else {
        // Search just within current category
        questionsPool = activeCategory.questions;
      }

      const queryLower = searchQuery.toLowerCase();
      questionsPool = questionsPool.filter(
        (q) =>
          q.text.toLowerCase().includes(queryLower) ||
          (q.template && q.template.toLowerCase().includes(queryLower)) ||
          (q.conditions &&
            q.conditions.some(
              (cond) =>
                cond.label.toLowerCase().includes(queryLower) ||
                cond.template.toLowerCase().includes(queryLower)
            ))
      );
    }
    
    setFilteredQuestions(questionsPool);
    if (questionsPool.length > 0) {
      // Keep old active question if it exists in new filtered pool, else default to first
      const exists = questionsPool.some((q) => q.id === activeQuestionId);
      if (!exists) {
        setActiveQuestionId(questionsPool[0].id);
      }
    } else {
      setActiveQuestionId("");
    }
  }, [activeCategoryId, searchQuery, globalSearch]);

  // Track the active question object
  const activeQuestion =
    categories.flatMap((c) => c.questions).find((q) => q.id === activeQuestionId) ||
    filteredQuestions[0];

  // If active question belongs to another category (from global search), synchronize the active category tab
  useEffect(() => {
    if (activeQuestion) {
      const parentCat = categories.find((c) =>
        c.questions.some((q) => q.id === activeQuestion.id)
      );
      if (parentCat && parentCat.id !== activeCategoryId) {
        setActiveCategoryId(parentCat.id);
      }
    }
  }, [activeQuestionId]);

  // Selected condition index for branching questions
  const [selectedConditionIndex, setSelectedConditionIndex] = useState<number>(0);

  // Reset condition index when question shifts
  useEffect(() => {
    setSelectedConditionIndex(0);
  }, [activeQuestionId]);

  // Dynamic placeholder values (Global dictionary so info like client name persists!)
  const [placeholderValues, setPlaceholderValues] = useState<Record<string, string>>({
    "nom du client": "",
    "nom du produit": "",
    "délai, ex. 2 jours ouvrés": "",
    "date estimée": "",
    "détail du matériau": "",
    "dimensions": "",
    "explication simple": "",
    "date": "",
    "nombre de jours": "",
    "nom de l’article": "",
    "code": "",
    "xx%": "",
    "xxxx": "",
    "pourcentage": "",
    "nombre": "",
    "lien vers le suivi": "",
    "numéro de suivi": "",
    "boutique": "",
    "nom de la boutique": "",
    "adresse fournie par le client": "",
    "nouvelle adresse renseignée": "",
    "adresse renseignée": "",
    "résumé du problème": "",
    "date prévue": "",
    "X jours": "",
    "projet spécifique": "",
    "XXX": "",
    "ancienne date": "",
    "nouvelle date": "",
    "raison, ex. un volume élevé de commandes, un souci d’approvisionnement": "",
    "nom": "",
    "adresse": "",
    "matériaux, techniques, ou détails uniques": "",
    "date précise": "",
    "détail": "",
    "3 ou 4 étoiles": "",
    "mentionnez un point positif soulevé dans l’avis, par exemple : \"la qualité de mon produit\" ou \"la rapidité de l’envoi\"": "",
    "résumé du problème mentionné, par exemple : \"le délai d’expédition plus long que prévu\" ou \"le produit qui n’a pas correspondu à vos attentes\"": "",
    "Proposez une solution, si possible, par exemple : \"Je vais vérifier immédiatement avec le transporteur\" ou \"Je peux vous proposer un remplacement/ajustement si cela vous convient\"": "",
  });

  // Current active template string
  let activeTemplate = "";
  if (activeQuestion) {
    if (activeQuestion.conditions && activeQuestion.conditions.length > 0) {
      activeTemplate =
        activeQuestion.conditions[selectedConditionIndex]?.template || "";
    } else {
      activeTemplate = activeQuestion.template || "";
    }
  }

  // Live text area / manual editing state
  const [isManualEditMode, setIsManualEditMode] = useState(false);
  const [manualEditedText, setManualEditedText] = useState("");

  // Sync manual text to compiled text whenever template or placeholders shift (unless we are manually editing)
  const compiledText = activeQuestion ? renderTemplateToText(activeTemplate, placeholderValues) : "";
  
  useEffect(() => {
    if (!isManualEditMode) {
      setManualEditedText(compiledText);
    }
  }, [compiledText, isManualEditMode]);

  // Extract placeholders for the active template
  const activePlaceholders = activeQuestion ? extractPlaceholders(activeTemplate) : [];

  // Clipboard success state
  const [isCopied, setIsCopied] = useState(false);
  const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCopy = () => {
    const textToCopy = isManualEditMode ? manualEditedText : compiledText;
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    
    if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    copyTimeoutRef.current = setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  // Switch to next/prev question
  const handleNextQuestion = () => {
    if (filteredQuestions.length < 2) return;
    const currentIndex = filteredQuestions.findIndex((q) => q.id === activeQuestionId);
    if (currentIndex < filteredQuestions.length - 1) {
      setActiveQuestionId(filteredQuestions[currentIndex + 1].id);
      setIsManualEditMode(false);
    }
  };

  const handlePrevQuestion = () => {
    if (filteredQuestions.length < 2) return;
    const currentIndex = filteredQuestions.findIndex((q) => q.id === activeQuestionId);
    if (currentIndex > 0) {
      setActiveQuestionId(filteredQuestions[currentIndex - 1].id);
      setIsManualEditMode(false);
    }
  };

  // Reset search
  const handleClearSearch = () => {
    setSearchQuery("");
  };

  // Helper to split and render styled placeholders
  const renderRichTextDraft = (template: string) => {
    if (!template) return null;
    const regex = /(\[[^\]]+\])/g;
    const segments = template.split(regex);

    return segments.map((segment, index) => {
      if (segment.startsWith("[") && segment.endsWith("]")) {
        const key = segment.slice(1, -1);
        const val = placeholderValues[key];
        const isFilled = val && val.trim() !== "";
        
        if (isFilled) {
          return (
            <span
              key={index}
              className="inline-block bg-[#E8E4DB] text-[#2D302D] border-b border-[#2D302D] font-mono text-[11px] px-1.5 py-0.5 mx-0.5 rounded font-semibold dark:bg-[#2D302D] dark:text-[#F8F6F0] dark:border-[#F8F6F0] transition-all"
              title={`Donnée remplie pour: ${key}`}
            >
              {val}
            </span>
          );
        } else {
          return (
            <span
              key={index}
              className="inline-block bg-[#febd2f]/20 text-[#2D302D] border-b border-[#febd2f] font-mono text-[11px] px-1.5 py-0.5 mx-0.5 rounded font-bold animate-pulse dark:text-[#febd2f] transition-all"
              title={`À remplir dans le menu de gauche: ${key}`}
            >
              [{key}]
            </span>
          );
        }
      }
      return <span key={index}>{segment}</span>;
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8" id="quiz-workspace">
      {/* Category selector header wrapper */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#2D302D]/10 dark:border-[#F8F6F0]/10 pb-4">
        <button
          id="back-btn"
          onClick={onBackToHome}
          className="flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-wider text-[#2D302D]/60 dark:text-[#F8F6F0]/60 hover:text-[#2D302D] dark:hover:text-white transition-colors self-start cursor-pointer group"
        >
          <Icons.ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          Retour à l'accueil
        </button>

        {/* Global vs Local Search Toggle */}
        <div className="flex items-center gap-1 bg-[#E8E4DB]/40 dark:bg-[#2D302D]/40 border border-[#2D302D]/10 dark:border-[#F8F6F0]/10 rounded-lg p-1 text-[11px] font-medium text-xs">
          <button
            id="local-search-tab"
            onClick={() => setGlobalSearch(false)}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer font-sans uppercase tracking-wider ${
              !globalSearch
                ? "bg-[#2D302D] text-white dark:bg-[#F8F6F0] dark:text-[#2D302D] font-bold"
                : "text-[#2D302D]/60 dark:text-[#F8F6F0]/60 hover:text-[#2D302D] dark:hover:text-white"
            }`}
          >
            Recherche par catégorie
          </button>
          <button
            id="global-search-tab"
            onClick={() => setGlobalSearch(true)}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer font-sans uppercase tracking-wider ${
              globalSearch
                ? "bg-[#2D302D] text-white dark:bg-[#F8F6F0] dark:text-[#2D302D] font-bold"
                : "text-[#2D302D]/60 dark:text-[#F8F6F0]/60 hover:text-[#2D302D] dark:hover:text-[#F8F6F0]"
            }`}
          >
            Recherche globale (tout le livre)
          </button>
        </div>
      </div>

      {/* Category Navigation Tabs */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex gap-3 min-w-max pb-2 md:pb-0 justify-start">
          {categories.map((category) => {
            const Icon = (Icons[category.iconName as keyof typeof Icons] || Icons.HelpCircle) as React.ComponentType<{ className?: string }>;
            const isActive = category.id === activeCategoryId;

            return (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategoryId(category.id);
                  setSearchQuery(""); // Clear search to show new category templates
                }}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl border transition-all cursor-pointer ${
                  isActive
                    ? "bg-white border-[#2D302D]" +
                      " dark:bg-[#2D302D]/50 dark:border-[#F8F6F0] text-[#2D302D] dark:text-[#F8F6F0] font-serif italic font-medium shadow-xs"
                    : "bg-white/40 border-[#2D302D]/15 hover:border-[#2D302D]/35 dark:bg-[#2D302D]/10 dark:border-[#F8F6F0]/10 text-[#2D302D]/60 dark:text-[#F8F6F0]/60 hover:text-[#2D302D] dark:hover:text-[#F8F6F0]"
                }`}
              >
                <span className="text-xs font-serif font-light italic text-[#2D302D]/50 dark:text-[#F8F6F0]/50">{category.emoji}.</span>
                <Icon className="w-3.5 h-3.5" />
                <span className="text-sm font-serif">{category.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (Question Drawer & Params Form) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Question List Module */}
          <div className="bg-white/40 dark:bg-[#2D302D]/10 border border-[#2D302D]/10 dark:border-[#F8F6F0]/10 rounded-[1.5rem] overflow-hidden flex flex-col max-h-[460px] md:max-h-[500px]">
            <div className="p-4 bg-[#E8E4DB]/20 dark:bg-[#1E201E]/40 border-b border-[#2D302D]/10 dark:border-[#F8F6F0]/10 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-[#2D302D]/70 dark:text-[#F8F6F0]/70">
                  {globalSearch ? "Tout le livre blanc" : activeCategory.title} — {filteredQuestions.length} modèles
                </span>
                {searchQuery && (
                  <button
                    id="clear-search-btn"
                    onClick={handleClearSearch}
                    className="text-xs font-serif font-light italic text-[#2D302D] dark:text-[#F8F6F0] hover:underline cursor-pointer"
                  >
                    Effacer le filtre
                  </button>
                )}
              </div>
              
              {/* Search Inside Drawer */}
              <div className="relative">
                <input
                  id="internal-search-input"
                  type="text"
                  placeholder="Rechercher une question ou un mot..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-8 py-2.5 text-xs bg-white dark:bg-[#1E201E] border border-[#2D302D]/35 dark:border-[#F8F6F0]/35 rounded-lg focus:ring-2 focus:ring-[#2D302D]/20 outline-none text-[#2D302D] dark:text-[#F8F6F0] placeholder-[#2D302D]/55 dark:placeholder-[#F8F6F0]/55 transition-all font-sans shadow-xs"
                />
                <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#2D302D]/40 dark:text-[#F8F6F0]/40 pointer-events-none" />
                {searchQuery && (
                  <button
                    id="clear-search-x-btn"
                    onClick={handleClearSearch}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#2D302D]/40 dark:text-[#F8F6F0]/40 hover:text-[#2D302D] dark:hover:text-[#F8F6F0]"
                  >
                    <Icons.X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Questions Scroller */}
            <div className="overflow-y-auto divide-y divide-[#2D302D]/10 dark:divide-[#F8F6F0]/10 flex-1">
              <AnimatePresence mode="popLayout">
                {filteredQuestions.length > 0 ? (
                  filteredQuestions.map((question) => {
                    const isActive = question.id === activeQuestionId;
                    return (
                      <motion.button
                        key={question.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => {
                          setActiveQuestionId(question.id);
                          setIsManualEditMode(false);
                        }}
                        className={`w-full text-left p-4.5 transition-all flex gap-3 text-xs md:text-sm items-start cursor-pointer focus:outline-none ${
                          isActive
                            ? "bg-[#2D302D]/5 text-[#2D302D] border-l-4 border-[#2D302D] dark:border-[#F8F6F0] font-medium dark:bg-[#F8F6F0]/5 dark:text-[#F8F6F0]"
                            : "hover:bg-white/40 dark:hover:bg-[#2D302D]/20 text-[#2D302D]/70 dark:text-[#F8F6F0]/70"
                        }`}
                      >
                        <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#E8E4DB]/40 text-[#2D302D]/70 dark:bg-[#2D302D] dark:text-[#F8F6F0]/70 shrink-0 select-none">
                          Q{question.number}
                        </span>
                        <span className="line-clamp-2 pr-2 font-serif font-light">{question.text}</span>
                      </motion.button>
                    );
                  })
                ) : (
                  <div className="p-8 text-center flex flex-col items-center justify-center gap-2 bg-transparent">
                    <Icons.Inbox className="w-8 h-8 text-[#2D302D]/20 dark:text-[#F8F6F0]/20" />
                    <p className="text-xs text-[#2D302D]/60">Aucun modèle ne correspond à votre recherche.</p>
                    <button
                      id="reset-filter-btn"
                      onClick={handleClearSearch}
                      className="text-xs text-[#2D302D] font-bold uppercase tracking-wider hover:underline mt-2 cursor-pointer"
                    >
                      Effacer les filtres
                    </button>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Dynamic Placeholder Form Module */}
          {activeQuestion && activePlaceholders.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/40 dark:bg-[#2D302D]/10 border border-[#2D302D]/10 dark:border-[#F8F6F0]/10 rounded-[1.5rem] p-6.5 shadow-xs"
            >
              <h3 className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-[#2D302D]/55 dark:text-[#F8F6F0]/55 mb-4 flex items-center gap-1.5">
                <Icons.Sliders className="w-3.5 h-3.5 text-[#2D302D]/40" />
                Données à personnaliser ({activePlaceholders.length})
              </h3>
              
              <div className="flex flex-col gap-4">
                {activePlaceholders.map((key) => {
                  const label = getPlaceholderLabel(key);
                  const config = getPlaceholderInputType(key);
                  const val = placeholderValues[key] || "";

                  return (
                    <div key={key} className="flex flex-col gap-1.5">
                      <label className="text-xs font-serif italic text-[#2D302D]/80 dark:text-[#F8F6F0]/80 flex items-center justify-between">
                        <span>{label}</span>
                        {val && (
                          <button
                            id={`clear-placeholder-${key}`}
                            onClick={() =>
                              setPlaceholderValues((prev) => ({
                                ...prev,
                                [key]: "",
                              }))
                            }
                            className="text-[10px] font-sans font-bold uppercase tracking-widest text-rose-600 hover:text-rose-700 transition-colors cursor-pointer"
                            title="Réinitialiser"
                          >
                            Effacer
                          </button>
                        )}
                      </label>
                      <input
                        id={`placeholder-input-${key}`}
                        type={config.type}
                        placeholder={config.placeholder}
                        value={val}
                        onChange={(e) => {
                          setPlaceholderValues((prev) => ({
                            ...prev,
                            [key]: e.target.value,
                          }));
                        }}
                        className="w-full px-3.5 py-2.5 text-xs bg-white dark:bg-[#1E201E] border border-[#2D302D]/35 dark:border-[#F8F6F0]/35 rounded-lg focus:bg-white dark:focus:bg-[#1E201E] focus:ring-2 focus:ring-[#2D302D]/20 outline-none text-[#2D302D] dark:text-[#F8F6F0] placeholder-[#2D302D]/55 dark:placeholder-[#F8F6F0]/55 transition-all font-sans shadow-xs"
                      />
                    </div>
                  );
                })}
              </div>

              {/* Utility reset form */}
              <div className="mt-5 pt-4 border-t border-[#2D302D]/10 dark:border-[#F8F6F0]/10 flex justify-end">
                <button
                  id="reset-form-btn"
                  onClick={() => {
                    const resetObj: Record<string, string> = { ...placeholderValues };
                    activePlaceholders.forEach((p) => {
                      resetObj[p] = "";
                    });
                    setPlaceholderValues(resetObj);
                  }}
                  className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#2D302D]/50 hover:text-rose-600 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Icons.Trash2 className="w-3.5 h-3.5 animate-pulse" />
                  Effacer ces champs
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Column (Live Sandbox Mockup) */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {activeQuestion ? (
              <motion.div
                key={activeQuestion.id + "-" + selectedConditionIndex}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="bg-white/40 dark:bg-[#2D302D]/5 border border-[#2D302D]/10 dark:border-[#F8F6F0]/10 rounded-[2rem] p-8 md:p-10 shadow-xs"
              >
                {/* Header question status bar */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-[#2D302D]/10 dark:border-[#F8F6F0]/10 pb-5 mb-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold opacity-50 flex items-center gap-1.5 text-[#2D302D] dark:text-[#F8F6F0]">
                      02. Modèle de réponse active
                    </span>
                    <h2 className="text-xl md:text-3xl font-serif font-light italic text-[#2D302D] dark:text-[#F8F6F0] mt-2 leading-tight">
                      {activeQuestion.text}
                    </h2>
                  </div>

                  {/* Manual / Automatic mode Toggle */}
                  <div className="flex items-center gap-2 self-start md:self-center bg-[#E8E4DB]/40 dark:bg-[#2D302D]/40 px-3 py-2 rounded-lg border border-[#2D302D]/10 dark:border-[#F8F6F0]/10 select-none shrink-0 text-xs">
                    <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#2D302D]/70 dark:text-[#F8F6F0]/70">
                      Touche personnelle
                    </span>
                    <button
                      id="manual-edit-toggle"
                      onClick={() => setIsManualEditMode(!isManualEditMode)}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        isManualEditMode ? "bg-[#2D302D] dark:bg-[#F8F6F0]" : "bg-[#2D302D]/15 dark:bg-[#F8F6F0]/15"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white dark:bg-[#2D302D] shadow ring-0 transition duration-200 ease-in-out ${
                          isManualEditMode ? "translate-x-4" : "translate-x-0"
                        }`}
                      />
                    </button>
                    <Icons.Edit3 className="w-3.5 h-3.5 text-[#2D302D]/70 dark:text-[#F8F6F0]/70" />
                  </div>
                </div>

                {/* Conditional Scenarios Toggle Segment (If multiple conditions exist) */}
                {activeQuestion.conditions && activeQuestion.conditions.length > 0 && (
                  <div className="mb-6 bg-[#E8E4DB]/20 dark:bg-[#2D302D]/20 p-4 rounded-xl border border-[#2D302D]/10 dark:border-[#F8F6F0]/10">
                    <span className="text-[9px] uppercase tracking-widest font-bold text-[#2D302D]/60 dark:text-[#F8F6F0]/60 font-sans block mb-3">
                      Scénario de réponse :
                    </span>
                    <div className="flex flex-col md:flex-row gap-2">
                      {activeQuestion.conditions.map((condition, idx) => (
                        <button
                          key={idx}
                          id={`scenario-tab-${idx}`}
                          onClick={() => {
                            setSelectedConditionIndex(idx);
                            setIsManualEditMode(false);
                          }}
                          className={`flex-1 text-left md:text-center px-4 py-2.5 text-xs rounded-lg transition-all border duration-300 cursor-pointer font-sans uppercase tracking-wider font-bold ${
                            selectedConditionIndex === idx
                              ? "bg-[#2D302D] text-white dark:bg-[#F8F6F0] dark:text-[#2D302D] border-transparent"
                              : "bg-white/50 hover:bg-[#E8E4DB]/40 dark:bg-[#2D302D]/40 border-[#2D302D]/10 dark:border-[#F8F6F0]/10 text-[#2D302D]/70 dark:text-[#F8F6F0]/70"
                          }`}
                        >
                          {condition.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Simulated Speech Bubble Chatbox layout */}
                <div className="space-y-6 mb-8">
                  {/* Client inquiry bubble */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#E8E4DB] dark:bg-[#2D302D] border border-[#2D302D]/10 dark:border-[#F8F6F0]/10 flex items-center justify-center text-[#2D302D] dark:text-[#F8F6F0]/80 font-bold text-xs select-none shrink-0 uppercase">
                      Cl
                    </div>
                    <div className="bg-white/70 dark:bg-[#2D302D]/35 rounded-2xl rounded-tl-none px-4 py-3.5 max-w-[85%] border border-[#2D302D]/10 dark:border-[#F8F6F0]/10">
                      <p className="text-[9px] text-[#2D302D]/50 dark:text-[#F8F6F0]/50 uppercase font-sans tracking-widest mb-1.5 select-none font-bold">
                        Acheteur
                      </p>
                      <p className="text-xs md:text-sm text-[#2D302D] dark:text-[#F8F6F0] font-sans">
                        {activeQuestion.text}
                      </p>
                    </div>
                  </div>

                  {/* Artisan Response Bubble (Live preview bubble) */}
                  <div className="flex items-start gap-3 flex-row-reverse">
                    <div className="w-8 h-8 rounded-full bg-[#202120] text-[#F8F6F0] dark:bg-[#F8F6F0] dark:text-[#202120] flex items-center justify-center font-bold text-xs select-none shrink-0 shadow-xs">
                      Moi
                    </div>
                    
                    <div className="w-full max-w-[85%] rounded-[1.5rem] rounded-tr-none border border-[#2D302D]/15 dark:border-[#F8F6F0]/15 bg-white dark:bg-[#202120] shadow-xs relative overflow-hidden">
                      {/* Bubble title header */}
                      <div className="bg-[#E8E4DB]/30 dark:bg-[#2D302D]/40 border-b border-[#2D302D]/10 dark:border-[#F8F6F0]/10 px-4 py-2.5 flex items-center justify-between">
                        <span className="text-[9px] text-[#2D302D]/70 dark:text-[#F8F6F0]/70 font-bold uppercase tracking-[0.16em] font-sans">
                          {isManualEditMode ? "✍️ TOUCHE PERSONNELLE ACTIVE" : "⭐ APERÇU DYNAMIQUE"}
                        </span>
                        <div className="flex gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2D302D]/20 dark:bg-[#F8F6F0]/20" />
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2D302D]/20 dark:bg-[#F8F6F0]/20" />
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2D302D]/20 dark:bg-[#F8F6F0]/20" />
                        </div>
                      </div>

                      {/* Display live text body */}
                      <div className="p-5 font-sans text-sm md:text-base leading-relaxed whitespace-pre-line text-[#2D302D] dark:text-[#F8F6F0] min-h-[160px]">
                        {isManualEditMode ? (
                          <div className="relative">
                            <textarea
                              id="manual-textarea"
                              value={manualEditedText}
                              onChange={(e) => setManualEditedText(e.target.value)}
                              rows={8}
                              className="w-full p-3 bg-white dark:bg-[#1E201E] border border-[#2D302D]/35 dark:border-[#F8F6F0]/35 rounded-lg text-sm text-[#2D302D] dark:text-[#F8F6F0] outline-none focus:ring-2 focus:ring-[#2D302D]/20 focus:border-[#2D302D] dark:focus:border-[#F8F6F0] placeholder-[#2D302D]/55 dark:placeholder-[#F8F6F0]/55 transition-all font-sans shadow-xs"
                              placeholder="Écrivez ou modifiez le texte ici libre-service..."
                            />
                            <p className="text-[10px] text-[#2D302D]/40 dark:text-[#F8F6F0]/40 mt-1.5 italic font-serif">
                              * Vous éditez manuellement. Pour écraser vos modifications et récupérer le modèle dynamique synchronisé, désactivez la "Touche personnelle" ci-dessus.
                            </p>
                          </div>
                        ) : (
                          renderRichTextDraft(activeTemplate)
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Important guidance cards parsed from emojis inside screenshot instructions */}
                {activeTemplate && (activeTemplate.includes("⚠️") || activeTemplate.includes("💡") || activeTemplate.includes("🎁") || activeTemplate.includes("📦")) && (
                  <div className="bg-[#E8E4DB]/30 dark:bg-[#2D302D]/20 p-5 rounded-xl border border-[#2D302D]/10 dark:border-[#F8F6F0]/10 mb-6 text-xs text-[#2D302D]/80 dark:text-[#F8F6F0]/80 flex flex-col gap-2 font-light leading-relaxed">
                    <span className="font-bold tracking-widest uppercase font-sans text-[9px] text-[#2D302D]/60 dark:text-[#F8F6F0]/60 flex items-center gap-1">
                      <Icons.AlertCircle className="w-3.5 h-3.5 text-[#2D302D]/50" />
                      Conseils de rédaction & Conditions
                    </span>
                    <ul className="list-disc pl-4 space-y-1.5 font-serif italic text-xs leading-relaxed">
                      {activeTemplate.includes("🎨") && <li><strong>Personnalisation :</strong> Demandez des précisions explicites et vérifiez d'abord la faisabilité avant de facturer quoi que ce soit.</li>}
                      {activeTemplate.includes("🎁") && <li><strong>Réduction :</strong> Idéal pour inciter à l'achat tout en protégeant votre rentabilité d'artisan.</li>}
                      {activeTemplate.includes("⚠️") && <li><strong>Frais de retour :</strong> Rappelez contractuellement que les frais de retour restent à la charge du client en cas d'erreur de taille.</li>}
                      {activeTemplate.includes("📦") && <li><strong>Livraison :</strong> Pensez à ajuster le [délai] selon votre charge de travail et le service postal utilisé.</li>}
                      {activePlaceholders.includes("nom du client") && <li>Personnalisez toujours d'abord le prénom du client pour réchauffer le lien relationnel.</li>}
                    </ul>
                  </div>
                )}

                {/* Main Action Call Trigger Panels */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    id="copy-text-btn"
                    onClick={handleCopy}
                    className={`flex-1 sm:flex-[2] py-4 px-6 rounded-xl font-bold font-sans text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer ${
                      isCopied
                        ? "bg-emerald-700 text-white shadow-md"
                        : "bg-[#2D302D] text-[#F9F7F2] dark:bg-[#F8F6F0] dark:text-[#2D302D] hover:opacity-90 active:scale-98"
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Icons.Check className="w-4 h-4 shrink-0 animate-bounce" />
                        Réponse copiée !
                      </>
                    ) : (
                      <>
                        <Icons.Copy className="w-4 h-4 shrink-0" />
                        Copier la réponse
                      </>
                    )}
                  </button>

                  <button
                    id="reset-placeholders-btn"
                    onClick={() => {
                      setIsManualEditMode(false);
                      // Reset current template specific values
                      const resetObj = { ...placeholderValues };
                      activePlaceholders.forEach((p) => {
                        resetObj[p] = "";
                      });
                      setPlaceholderValues(resetObj);
                    }}
                    className="flex-1 py-4 px-4 rounded-xl bg-[#E8E4DB]/40 dark:bg-[#2D302D]/35 hover:bg-[#E8E4DB]/70 dark:hover:bg-[#2D302D]/60 text-[#2D302D] dark:text-[#F8F6F0] text-[10px] font-sans font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-[#2D302D]/10"
                    title="Réinitialiser tous les champs et modifier la réponse à ses valeurs d'origine"
                  >
                    <Icons.RotateCcw className="w-3.5 h-3.5 shrink-0" />
                    Réinitialiser
                  </button>
                </div>

                {/* Workspace navigation pagination buttons */}
                {filteredQuestions.length > 1 && (
                  <div className="mt-8 pt-4 border-t border-[#2D302D]/15 dark:border-[#F8F6F0]/15 flex items-center justify-between">
                    <button
                      id="prev-question-btn"
                      onClick={handlePrevQuestion}
                      disabled={filteredQuestions.findIndex((q) => q.id === activeQuestionId) === 0}
                      className="flex items-center gap-1 text-xs font-sans font-bold uppercase tracking-wider text-[#2D302D]/60 dark:text-[#F8F6F0]/60 hover:text-[#2D302D] dark:hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors group cursor-pointer"
                    >
                      <Icons.ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                      Précédente
                    </button>
                    
                    <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#2D302D]/50 dark:text-[#F8F6F0]/50">
                      Modèle {filteredQuestions.findIndex((q) => q.id === activeQuestionId) + 1} / {filteredQuestions.length}
                    </span>

                    <button
                      id="next-question-btn"
                      onClick={handleNextQuestion}
                      disabled={
                        filteredQuestions.findIndex((q) => q.id === activeQuestionId) ===
                        filteredQuestions.length - 1
                      }
                      className="flex items-center gap-1 text-xs font-sans font-bold uppercase tracking-wider text-[#2D302D]/60 dark:text-[#F8F6F0]/60 hover:text-[#2D302D] dark:hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors group cursor-pointer"
                    >
                      Suivante
                      <Icons.ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="bg-[#F9F7F2]/40 dark:bg-[#2D302D]/10 border border-[#2D302D]/10 dark:border-[#F8F6F0]/10 rounded-[2rem] p-12 text-center flex flex-col items-center justify-center gap-3">
                <Icons.AlertCircle className="w-10 h-10 text-[#2D302D]/30" />
                <h3 className="text-lg font-serif italic text-[#2D302D] dark:text-[#F8F6F0]">Aucun modèle sélectionné</h3>
                <p className="text-xs text-[#2D302D]/60 max-w-sm font-light">
                  Utilisez le volet de gauche ou la barre de recherche pour sélectionner une question fréquente de vos artisanes de confiance et afficher son gabarit.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
