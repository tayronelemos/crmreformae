"use client";

import { Bell, Search, Plus, Calendar, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export function Topbar() {
  return (
    <header className="h-20 border-b border-surface-border bg-surface/50 backdrop-blur-md sticky top-0 z-40 px-8 flex items-center justify-between">
      <div className="flex items-center gap-8 flex-1">
        <div className="relative group w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-brand transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Buscar clientes, serviços ou financeiro..."
            className="w-full bg-surface-tertiary/50 border border-surface-border rounded-xl py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-surface-border px-1.5 py-0.5 rounded text-[10px] text-muted-foreground font-mono">
            <span>⌘</span>
            <span>K</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden lg:flex items-center gap-4 text-sm text-muted-foreground mr-4">
          <Calendar size={18} />
          <span className="font-medium">Seg, 20 de Junho</span>
        </div>

        <button className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-surface-tertiary border border-surface-border text-muted-foreground hover:text-white hover:bg-surface-border transition-all">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-brand rounded-full border-2 border-surface" />
        </button>

        <button className="flex items-center gap-2 bg-brand hover:bg-brand-hover text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-brand/20 active:scale-95">
          <Plus size={18} />
          <span>Ação Rápida</span>
        </button>

        <div className="h-8 w-[1px] bg-surface-border mx-2" />

        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right">
            <p className="text-sm font-bold text-white leading-tight">Tayrone Lemos</p>
            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Administrador</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand/80 to-indigo-600 flex items-center justify-center text-sm font-bold border border-white/10 shadow-inner group-hover:scale-105 transition-transform">
            TL
          </div>
          <ChevronDown size={14} className="text-muted-foreground group-hover:text-white transition-colors" />
        </div>
      </div>
    </header>
  );
}
