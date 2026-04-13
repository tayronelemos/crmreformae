"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BarChart3, 
  Users, 
  Briefcase, 
  DollarSign, 
  FileText, 
  Settings, 
  PieChart,
  LayoutDashboard,
  TrendingUp,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Users, label: "Clientes", href: "/dashboard/clients" },
  { icon: Briefcase, label: "Serviços", href: "/dashboard/services" },
  { icon: DollarSign, label: "Financeiro", href: "/dashboard/finance" },
  { icon: TrendingUp, label: "Projeções", href: "/dashboard/projections" },
  { icon: FileText, label: "Propostas", href: "/dashboard/proposals" },
  { icon: PieChart, label: "Relatórios", href: "/dashboard/reports" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.div 
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      className="h-screen sticky top-0 bg-surface-secondary border-r border-surface-border flex flex-col transition-all duration-300"
    >
      <div className="p-6 flex items-center justify-between">
        {!collapsed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white rounded-sm" />
            </div>
            <span className="text-xl font-outfit font-bold tracking-tight text-white">Reformaê</span>
          </motion.div>
        )}
        {collapsed && (
          <div className="w-8 h-8 bg-brand rounded-lg mx-auto flex items-center justify-center">
             <div className="w-4 h-4 border-2 border-white rounded-sm" />
          </div>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 bg-surface-border rounded-full flex items-center justify-center text-muted-foreground hover:text-white border border-white/5"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      <nav className="mt-10 flex-1 px-3 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200 group relative overflow-hidden",
                isActive 
                  ? "bg-brand/10 text-white shadow-[0_0_20px_rgba(44,71,221,0.1)]" 
                  : "text-muted-foreground hover:bg-white/5 hover:text-white"
              )}
            >
              {isActive && (
                <motion.div 
                  layoutId="active-pill"
                  className="absolute left-0 w-1 h-6 bg-brand rounded-r-full"
                />
              )}
              <item.icon size={22} className={cn(isActive && "text-brand")} />
              {!collapsed && (
                <span className="font-medium text-[0.95rem]">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-surface-border space-y-2">
        <Link
          href="/dashboard/settings"
          className={cn(
            "flex items-center gap-4 px-4 py-3.5 rounded-2xl text-muted-foreground hover:bg-white/5 hover:text-white transition-all",
            pathname === "/dashboard/settings" && "bg-brand/10 text-white"
          )}
        >
          <Settings size={22} />
          {!collapsed && <span className="font-medium">Configurações</span>}
        </Link>
        {!collapsed && (
          <div className="mt-4 p-4 rounded-2xl bg-brand/5 border border-brand/10">
            <p className="text-xs text-muted-foreground mb-2">Plano Pro Evolution</p>
            <div className="h-1.5 bg-surface-tertiary rounded-full overflow-hidden">
              <div className="h-full bg-brand w-3/4" />
            </div>
            <p className="text-[10px] text-muted-foreground mt-2">75% da cota utilizada</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
