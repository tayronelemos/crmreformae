"use client";

import { LucideIcon, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  isCurrency?: boolean;
}

export function MetricCard({ title, value, icon: Icon, trend, isCurrency }: MetricCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="glass-card flex flex-col justify-between group"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all duration-300">
          <Icon size={24} />
        </div>
        {trend && (
          <div className={cn(
            "flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg",
            trend.isPositive ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
          )}>
            {trend.isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {trend.value}%
          </div>
        )}
      </div>

      <div>
        <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-1">
          {title}
        </p>
        <h3 className="text-2xl font-bold tracking-tight text-white">
          {isCurrency && typeof value === "number" ? formatCurrency(value) : value}
        </h3>
      </div>

      <div className="mt-4 pt-4 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
        <p className="text-[10px] text-muted-foreground font-medium underline cursor-pointer decoration-brand/50 underline-offset-4">
          Visualizar detalhes
        </p>
      </div>
    </motion.div>
  );
}
