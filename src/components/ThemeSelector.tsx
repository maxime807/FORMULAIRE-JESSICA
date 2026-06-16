/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

interface ThemeSelectorProps {
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

export default function ThemeSelector({ theme, onToggleTheme }: ThemeSelectorProps) {
  return (
    <button
      id="theme-toggle-btn"
      onClick={onToggleTheme}
      className="flex items-center gap-3 md:gap-5 pb-1 focus:outline-none cursor-pointer select-none group"
      aria-label="Changer de thème"
      title={theme === "light" ? "Passer au style Sombre" : "Passer au style Clair"}
    >
      <div className={`flex items-center gap-1.5 transition-all duration-300 ${theme === "light" ? "opacity-100" : "opacity-30 group-hover:opacity-60"}`}>
        <div className="w-2.5 h-2.5 rounded-full bg-[#2D302D] dark:bg-[#F8F6F0] border border-[#2D302D] dark:border-[#F8F6F0]" />
        <span className="text-[10px] font-sans tracking-widest uppercase font-bold">Clair</span>
      </div>
      
      <div className="w-6 md:w-10 h-[2px] bg-[#2D302D]/20 dark:bg-[#F8F6F0]/20" />
      
      <div className={`flex items-center gap-1.5 transition-all duration-300 ${theme === "dark" ? "opacity-100" : "opacity-30 group-hover:opacity-60"}`}>
        <div className="w-2.5 h-2.5 rounded-full border border-[#2D302D] dark:border-[#F8F6F0] bg-transparent dark:bg-[#F8F6F0]" />
        <span className="text-[10px] font-sans tracking-widest uppercase font-bold">Sombre</span>
      </div>
    </button>
  );
}
