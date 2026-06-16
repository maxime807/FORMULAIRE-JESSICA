/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import * as Icons from "lucide-react";
import { categoriesData } from "./data";
import ThemeSelector from "./components/ThemeSelector";
import WelcomeScreen from "./components/WelcomeScreen";
import QuizContainer from "./components/QuizContainer";

export default function App() {
  // Theme State
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Sync theme to root DOM
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  // Try to load initial theme from system preferences
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDarkPreferred = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (isDarkPreferred) {
        setTheme("dark");
      }
    }
  }, []);

  // Screen/Routing State
  const [currentScreen, setCurrentScreen] = useState<"home" | "workspace">("home");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Handlers
  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setSearchQuery("");
    setCurrentScreen("workspace");
  };

  const handleSearchDirect = (query: string) => {
    setSelectedCategoryId(null);
    setSearchQuery(query);
    setCurrentScreen("workspace");
  };

  const handleBackToHome = () => {
    setCurrentScreen("home");
    setSelectedCategoryId(null);
    setSearchQuery("");
  };

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F7F2] dark:bg-[#1E201E] text-[#2D302D] dark:text-[#F8F6F0] transition-colors duration-300 md:border-[12px] md:border-[#E8E4DB] dark:md:border-[#2D302D]">
      {/* Upper Navigation Header Bar */}
      <header className="sticky top-0 z-50 bg-[#F9F7F2]/90 dark:bg-[#1E201E]/90 backdrop-blur-md border-b border-[#2D302D]/10 dark:border-[#F8F6F0]/10 transition-colors">
        <div className="max-w-7xl mx-auto px-6 py-6 md:py-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <button
            id="brand-logo"
            onClick={handleBackToHome}
            className="flex flex-col text-left focus:outline-none cursor-pointer group"
          >
            <span className="text-[9px] font-sans font-bold uppercase tracking-[0.25em] text-[#2D302D]/60 dark:text-[#F8F6F0]/60 mb-1.5">
              LIVRE BLANC INTERACTIF • BUSINESS COACHING
            </span>
            <div className="flex items-center gap-2">
              <span className="font-serif font-light italic tracking-tight text-3xl md:text-4xl text-[#2D302D] dark:text-[#F8F6F0] group-hover:opacity-80 transition-opacity">
                L'Art de la Réponse
              </span>
              <Icons.Sparkles className="w-4 h-4 text-[#2D302D]/40 dark:text-[#F8F6F0]/40 group-hover:rotate-12 transition-transform" />
            </div>
          </button>

          {/* Controls Panel */}
          <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-3 md:pt-0 border-[#2D302D]/10 dark:border-[#F8F6F0]/10">
            {currentScreen === "workspace" && (
              <button
                id="header-home-btn"
                onClick={handleBackToHome}
                className="flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-wider text-[#2D302D]/80 dark:text-[#F8F6F0]/80 hover:text-[#2D302D] dark:hover:text-white border-b border-transparent hover:border-[#2D302D] dark:hover:border-white transition-all cursor-pointer pb-0.5"
              >
                <Icons.Home className="w-3.5 h-3.5" />
                Accueil
              </button>
            )}

            <ThemeSelector theme={theme} onToggleTheme={handleToggleTheme} />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {currentScreen === "home" ? (
            <motion.div
              key="home-deck"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <WelcomeScreen
                categories={categoriesData}
                onSelectCategory={handleSelectCategory}
                onSearchDirect={handleSearchDirect}
              />
            </motion.div>
          ) : (
            <motion.div
              key="workspace-deck"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <QuizContainer
                categories={categoriesData}
                initialCategoryId={selectedCategoryId}
                onBackToHome={handleBackToHome}
                initialSearchQuery={searchQuery}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Aesthetic Footer with elegant dots and spacing matching Design HTML */}
      <footer className="py-6 border-t border-[#2D302D]/10 dark:border-[#F8F6F0]/10 bg-[#F9F7F2]/50 dark:bg-[#1E201E]/50 text-xs text-[#2D302D]/60 dark:text-[#F8F6F0]/60 transition-colors">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-[10px] font-sans tracking-[0.2em] uppercase">
            © {new Date().getFullYear()} Réponse Client Express — Guide de Communication Digitale
          </div>
          <div className="flex gap-4">
            <div className="w-2 h-2 rounded-full bg-[#2D302D]/20 dark:bg-[#F8F6F0]/20" />
            <div className="w-2 h-2 rounded-full bg-[#2D302D] dark:bg-[#F8F6F0]" />
            <div className="w-2 h-2 rounded-full bg-[#2D302D]/20 dark:bg-[#F8F6F0]/20" />
          </div>
        </div>
      </footer>
    </div>
  );
}
