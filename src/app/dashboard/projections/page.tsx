"use client";

import { 
  TrendingUp, 
  Target, 
  Zap, 
  Calendar, 
  ArrowUpRight, 
  ShieldCheck,
  BarChart3,
  PieChart,
  LineChart
} from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function ProjectionsPage() {
  const chartOptions: any = {
    chart: { toolbar: { show: false }, background: 'transparent' },
    stroke: { curve: 'smooth', width: 4 },
    colors: ['#2C47DD', '#4F66EB'],
    fill: { type: 'gradient', gradient: { opacityFrom: 0.4, opacityTo: 0.05 } },
    xaxis: { categories: ['Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'], labels: { style: { colors: '#64748b' } } },
    yaxis: { labels: { style: { colors: '#64748b' }, formatter: (v: any) => `R$ ${v/1000}k` } },
    grid: { borderColor: '#232933', strokeDashArray: 4 },
    tooltip: { theme: 'dark' },
    legend: { show: false }
  };

  const series = [
    { name: 'Cenário Otimista', data: [120, 150, 180, 250, 310, 420] },
    { name: 'Cenário Base', data: [110, 130, 160, 210, 260, 320] }
  ];

  return (
    <div className="space-y-10 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-outfit font-bold text-white tracking-tight">Projeções Inteligentes</h1>
          <p className="text-muted-foreground mt-1">Simulação de crescimento e previsibilidade de caixa baseada em IA.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-brand/10 text-brand border border-brand/20 px-6 py-3 rounded-2xl font-bold transition-all">
            <Target size={18} />
            <span>Ajustar Metas</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 glass-card">
            <div className="flex items-center justify-between mb-10">
               <div>
                  <h3 className="text-xl font-bold text-white">Curva de Crescimento Projetada</h3>
                  <p className="text-sm text-muted-foreground">Comparativo entre cenários base e otimista para o próximo semestre.</p>
               </div>
               <div className="flex items-center gap-4 bg-white/5 p-2 rounded-xl">
                  <div className="flex items-center gap-2 px-3 py-1 bg-surface-tertiary rounded-lg border border-white/5">
                     <div className="w-2 h-2 rounded-full bg-brand" />
                     <span className="text-xs text-white">Otimista</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1">
                     <div className="w-2 h-2 rounded-full bg-brand-light" />
                     <span className="text-xs text-muted-foreground">Base</span>
                  </div>
               </div>
            </div>
            <div className="h-[400px]">
               <Chart options={chartOptions} series={series} type="area" height="100%" />
            </div>
         </div>

         <div className="space-y-8">
            <div className="glass-card relative overflow-hidden bg-gradient-to-br from-brand/20 to-transparent">
               <ShieldCheck className="absolute -right-4 -bottom-4 text-brand/10" size={140} />
               <h3 className="text-lg font-bold text-white mb-6">Confidence Score</h3>
               <div className="flex items-end gap-4 mb-4">
                  <span className="text-6xl font-black text-brand tracking-tighter">98.2%</span>
                  <div className="flex items-center gap-1 text-emerald-500 text-sm font-bold mb-3">
                     <ArrowUpRight size={16} />
                     +2.4%
                  </div>
               </div>
               <p className="text-sm text-muted-foreground leading-relaxed">
                  Alta confiança baseada no histórico de pagamentos e pipelines de propostas assinadas.
               </p>
            </div>

            <div className="glass-card">
               <h3 className="text-lg font-bold text-white mb-6">Market Insights</h3>
               <div className="space-y-4">
                  {[
                    { label: "Demanda Sazonal", value: "Alta", color: "text-emerald-500" },
                    { label: "Risco de Mercado", value: "Baixo", color: "text-brand" },
                    { label: "Conversão Projetada", value: "38%", color: "text-white" },
                  ].map((insight, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                       <span className="text-sm text-muted-foreground">{insight.label}</span>
                       <span className={cn("text-sm font-bold", insight.color)}>{insight.value}</span>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: "Receita Prevista Q3", value: 850000, color: "text-white" },
           { label: "Receita Prevista Q4", value: 1240000, color: "text-brand" },
           { label: "ROI Estimado", value: "4.2x", color: "text-emerald-500" },
           { label: "Burn Rate Médio", value: 45000, color: "text-rose-500" },
         ].map((stat, i) => (
           <div key={i} className="glass-card">
              <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground mb-1">{stat.label}</p>
              <p className={cn("text-xl font-black", stat.color)}>
                 {typeof stat.value === "number" ? formatCurrency(stat.value) : stat.value}
              </p>
           </div>
         ))}
      </div>
    </div>
  );
}
