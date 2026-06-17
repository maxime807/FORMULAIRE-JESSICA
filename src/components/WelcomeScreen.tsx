/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import * as Icons from "lucide-react";
import { CategoryItem } from "../types";

interface WelcomeScreenProps {
  categories: CategoryItem[];
  onSelectCategory: (categoryId: string) => void;
  onSearchDirect: (query: string) => void;
}

export default function WelcomeScreen({
  categories,
  onSelectCategory,
  onSearchDirect,
}: WelcomeScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      onSearchDirect(searchQuery);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 md:py-20 flex flex-col items-center justify-center min-h-[80vh]">
      {/* Cover / Header section (from PDF Page 1) */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 flex flex-col items-center"
      >
        {/* Yellow Pill Badge exactly from screenshot */}
        <div className="bg-[#febd2f] text-black font-semibold tracking-[0.18em] text-xs px-6 py-2 rounded-full shadow-xs uppercase mb-6 font-sans">
          Réponse Client Express
        </div>

        <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light italic tracking-tight text-[#2D302D] dark:text-[#F8F6F0] leading-tight max-w-2xl mb-4">
          L'Art de la Réponse
        </h1>

        <p className="text-base md:text-lg italic text-[#2D302D]/70 dark:text-[#F8F6F0]/70 font-serif max-w-lg mt-2 font-light">
          "Ce guide interactif vous aide à transformer chaque question client en une opportunité de vente tout en préservant votre temps précieux."
        </p>
        
        <div className="h-[2px] w-12 bg-[#2D302D]/20 dark:bg-[#F8F6F0]/20 mt-6" />
      </motion.div>

      {/* Guide Card showing detailed interactive whitepaper intro */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="w-full bg-white/40 dark:bg-[#2D302D]/20 border border-[#2D302D]/10 dark:border-[#F8F6F0]/10 rounded-[2rem] p-8 md:p-10 shadow-xs mb-14 text-center"
      >
        <p className="text-sm md:text-base text-[#2D302D]/85 dark:text-[#F8F6F0]/85 font-sans leading-relaxed max-w-3xl mx-auto font-light">
          Faites de vos conversations une signature artisanale. Sélectionnez une catégorie ci-dessous pour filtrer les questions fréquentes, personnalisez instantanément les variables de réponse (délais, tarifs, pièces jointes) et copiez des messages impeccables en un clic.
        </p>
      </motion.div>

      {/* Search Bar section */}
      <motion.form
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        onSubmit={handleSearchSubmit}
        className="w-full max-w-xl mb-16 relative flex items-center"
        id="direct-search-form"
      >
        <div className="relative w-full">
          <input
            id="direct-search-input"
            type="text"
            placeholder="Rechercher un modèle de réponse... (ex. 'personnaliser', 'délais')"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-32 py-4 bg-white dark:bg-[#1E201E] border border-[#2D302D]/30 dark:border-[#F8F6F0]/30 rounded-xl focus:ring-2 focus:ring-[#2D302D]/20 focus:border-[#2D302D] dark:focus:border-[#F8F6F0] outline-none text-[#2D302D] dark:text-[#F8F6F0] placeholder-[#2D302D]/55 dark:placeholder-[#F8F6F0]/55 transition-all font-sans text-sm shadow-xs"
          />
          <Icons.Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2D302D]/40 dark:text-[#F8F6F0]/40 w-4 h-4 pointer-events-none" />
          
          <button
            id="direct-search-btn"
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#2D302D] hover:bg-[#2D302D]/90 text-white dark:bg-[#F8F6F0] dark:text-[#2D302D] dark:hover:bg-[#F8F6F0]/90 font-sans uppercase tracking-wider text-[10px] font-bold px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
          >
            Rechercher
          </button>
        </div>
      </motion.form>

      {/* Categories Grid */}
      <div className="w-full">
        <h2 className="text-xs font-sans font-bold uppercase tracking-[0.25em] text-[#2D302D]/50 dark:text-[#F8F6F0]/50 text-center mb-8 flex items-center justify-center gap-2">
          <Icons.BookOpen className="w-3.5 h-3.5 text-[#2D302D]/40 dark:text-[#F8F6F0]/40" />
          01. Sélectionner une catégorie d'achat
        </h2>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {categories.map((category) => {
            // Get Lucide Icon
            const IconComponent = (Icons[category.iconName as keyof typeof Icons] || Icons.HelpCircle) as React.ComponentType<{ className?: string }>;

            return (
              <motion.div
                key={category.id}
                variants={{
                  hidden: { opacity: 0, scale: 0.98, y: 15 },
                  visible: { opacity: 1, scale: 1, y: 0 }
                }}
                whileHover={{ y: -4 }}
                onClick={() => onSelectCategory(category.id)}
                className="group cursor-pointer bg-white/40 dark:bg-[#2D302D]/10 border border-[#2D302D]/10 dark:border-[#F8F6F0]/10 rounded-[1.5rem] p-6.5 shadow-xs hover:shadow-sm hover:bg-white dark:hover:bg-[#2D302D]/20 hover:border-[#2D302D]/30 dark:hover:border-[#F8F6F0]/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-xl font-serif font-light italic text-[#2D302D]/60 dark:text-[#F8F6F0]/60">{category.emoji}.</span>
                    <div className="p-2 rounded-lg bg-[#E8E4DB]/40 dark:bg-[#2D302D] text-[#2D302D] dark:text-[#F8F6F0] transition-colors group-hover:bg-[#E8E4DB]/70 dark:group-hover:bg-[#2D302D]/80">
                      <IconComponent className="w-4 h-4" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-serif font-light italic leading-tight text-[#2D302D] dark:text-[#F8F6F0] mb-2 group-hover:underline decoration-1 underline-offset-4">
                    {category.title}
                  </h3>
                  
                  <p className="text-xs text-[#2D302D]/60 dark:text-[#F8F6F0]/60 line-clamp-2 leading-relaxed font-light">
                    {category.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#2D302D]/5 dark:border-[#F8F6F0]/5 flex items-center justify-between text-[11px] font-sans font-bold uppercase tracking-wider text-[#2D302D]/70 dark:text-[#F8F6F0]/70">
                  <span className="italic normal-case font-serif font-normal opacity-60">{category.questions.length} modèles</span>
                  <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform opacity-80 group-hover:opacity-100">
                    Accéder <Icons.ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
