"use client";

import { 
  BarChart3, 
  Download, 
  Share2, 
  TrendingUp, 
  Users, 
  Briefcase, 
  DollarSign,
  PieChart,
  FileText,
  Filter
} from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const REPORT_CARDS = [
  { title: "Receita Mensal", value: 320000, type: "currency", icon: DollarSign },
  { title: "Novos Clientes", value: 12, type: "number", icon: Users },
  { title: "Conversão Comercial", value: "34%", type: "string", icon: TrendingUp },
  { title: "Ticket Médio", value: 12500, type: "currency", icon: FileText },
];

export default function ReportsPage() {
  return (
    <div className="space-y-10 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-outfit font-bold text-white tracking-tight">Relatórios Executivos</h1>
          <p className="text-muted-foreground mt-1">Visão consolidada de performance para tomada de decisão.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-surface-secondary border border-surface-border text-sm font-bold text-white hover:bg-surface-border transition-all">
            <Share2 size={18} />
            Compartilhar
          </button>
          <button className="flex items-center gap-2 bg-brand hover:bg-brand-hover text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg active:scale-95">
            <Download size={20} />
            <span>Gerar PDF Completo</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {REPORT_CARDS.map((report, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -4 }}
            className="glass-card"
          >
            <div className="flex items-center gap-3 mb-4">
               <div className="p-2 rounded-lg bg-brand/10 text-brand">
                  <report.icon size={18} />
               </div>
               <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">{report.title}</span>
            </div>
            <h3 className="text-2xl font-black text-white tabular-nums">
               {report.type === "currency" ? formatCurrency(report.value as number) : report.value}
            </h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 glass-card">
            <div className="flex items-center justify-between mb-8">
               <h3 className="font-bold text-white text-lg">Crescimento de Receita (Anual)</h3>
               <button className="p-2 text-muted-foreground hover:text-white"><Filter size={20} /></button>
            </div>
            <div className="h-[400px]">
               <Chart 
                 options={{
                    chart: { toolbar: { show: false }, background: 'transparent' },
                    stroke: { curve: 'stepline', width: 3 },
                    colors: ['#2C47DD'],
                    xaxis: { categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago'], labels: { style: { colors: '#64748b' } } },
                    yaxis: { labels: { style: { colors: '#64748b' }, formatter: (v: any) => `R$ ${v/1000}k` } },
                    grid: { borderColor: '#232933', strokeDashArray: 4 },
                    tooltip: { theme: 'dark' }
                 }} 
                 series={[{ name: 'Faturamento', data: [120, 180, 150, 210, 280, 320, 310, 420] }]} 
                 type="line" 
                 height="100%" 
               />
            </div>
         </div>

         <div className="glass-card">
            <h3 className="font-bold text-white text-lg mb-8">Rentabilidade por Serviço</h3>
            <div className="space-y-6">
               {[
                 { label: "Obras Industriais", value: 78, color: "bg-brand" },
                 { label: "Reformas Residenciais", value: 62, color: "bg-emerald-500" },
                 { label: "Manutenção Predial", value: 45, color: "bg-amber-500" },
                 { label: "Projetos Corporativos", value: 89, color: "bg-purple-500" },
               ].map((item, i) => (
                 <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                       <span className="text-muted-foreground">{item.label}</span>
                       <span className="text-white font-bold">{item.value}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                       <div className={cn("h-full", item.color)} style={{ width: `${item.value}%` }} />
                    </div>
                 </div>
               ))}
            </div>
            <div className="mt-10 pt-10 border-t border-white/5 text-center">
               <p className="text-xs text-muted-foreground italic">"Dados baseados nos últimos 12 meses de operação comercial e financeira."</p>
            </div>
         </div>
      </div>
    </div>
  );
}
