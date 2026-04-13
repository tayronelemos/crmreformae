"use client";

import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight,
  Filter,
  Download,
  ShieldCheck,
  Zap,
  Target
} from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const FINANCE_METRICS = [
  { label: "Previsto Total", value: 480000, color: "text-white" },
  { label: "Recebido", value: 320000, color: "text-emerald-500" },
  { label: "Vencido", value: 15600, color: "text-rose-500" },
  { label: "A Vencer (30d)", value: 85400, color: "text-amber-500" },
];

export default function FinancePage() {
  const splineOptions: any = {
    chart: { toolbar: { show: false }, background: 'transparent' },
    stroke: { curve: 'smooth', width: 3 },
    colors: ['#2C47DD'],
    fill: { type: 'gradient', gradient: { opacityFrom: 0.3, opacityTo: 0 } },
    xaxis: { categories: ['Set', 'Out', 'Nov', 'Dez', 'Jan', 'Fev'], labels: { style: { colors: '#64748b' } } },
    yaxis: { show: false },
    grid: { show: false },
    tooltip: { theme: 'dark' }
  };

  return (
    <div className="space-y-10 animate-fade-in">
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-outfit font-bold text-white tracking-tight">Financeiro & Projeções</h1>
          <p className="text-muted-foreground mt-1">Visão clara do seu caixa futuro e inteligência de recebimento.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-sm font-bold text-white hover:bg-white/10 transition-all">
            <Download size={18} />
            Exportar Fluxo
          </button>
          <button className="flex items-center gap-2 bg-brand hover:bg-brand-hover text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg active:scale-95">
            Nova Projeção
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {FINANCE_METRICS.map((metric, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card"
          >
            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">{metric.label}</p>
            <h3 className={cn("text-2xl font-black tabular-nums tracking-tighter", metric.color)}>
              {formatCurrency(metric.value)}
            </h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 glass-card relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8">
              <div className="bg-emerald-500/10 text-emerald-500 px-4 py-2 rounded-2xl flex items-center gap-2 text-sm font-bold">
                 <Zap size={16} />
                 Alta previsibilidade identificada
              </div>
            </div>
            
            <div className="mb-10">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand mb-2 block">Previsão Inteligente</span>
              <h3 className="text-3xl font-bold text-white max-w-md leading-tight">Projeção de caixa para os próximos 6 meses</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
               <div className="space-y-1">
                  <p className="text-xs text-muted-foreground font-medium">Probabilidade de Recebimento</p>
                  <p className="text-3xl font-black text-white">94%</p>
               </div>
               <div className="space-y-1">
                  <p className="text-xs text-muted-foreground font-medium">Valor em Risco</p>
                  <p className="text-3xl font-black text-rose-500">{formatCurrency(12400)}</p>
               </div>
               <div className="space-y-1">
                  <p className="text-xs text-muted-foreground font-medium">Meta Trimestral</p>
                  <p className="text-3xl font-black text-white">R$ 1.2M</p>
               </div>
            </div>

            <div className="h-[250px] -mx-4">
               <Chart options={splineOptions} series={[{ name: 'Caixa Projetado', data: [450, 520, 480, 610, 590, 720] }]} type="area" height="100%" />
            </div>
         </div>

         <div className="space-y-8">
            <div className="glass-card !border-amber-500/20">
               <div className="flex items-center gap-3 text-amber-500 mb-6">
                  <AlertTriangle size={24} />
                  <h3 className="font-bold">Alertas de Atenção</h3>
               </div>
               <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 hover:bg-amber-500/10 transition-all">
                     <p className="text-sm font-bold text-white mb-1">3 Clientes com atraso iminente</p>
                     <p className="text-xs text-muted-foreground">O comportamento de pagamento sugere risco de inadimplência nestas contas.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-brand/5 border border-brand/10 hover:bg-brand/10 transition-all">
                     <p className="text-sm font-bold text-white mb-1">Concentração de Receita</p>
                     <p className="text-xs text-muted-foreground">O cliente 'Engenharia Atlas' representa 45% do seu faturamento previsto.</p>
                  </div>
               </div>
            </div>

            <div className="glass-card">
               <div className="flex items-center gap-3 text-brand mb-6">
                  <Target size={24} />
                  <h3 className="font-bold">Distribuição de Receita</h3>
               </div>
               <div className="h-[200px]">
                  <Chart 
                    options={{
                      chart: { type: 'polarArea' },
                      colors: ['#2C47DD', '#2ecc71', '#f59e0b', '#ef4444'],
                      labels: ['CPF', 'CNPJ', 'Escopo Fixo', 'Recorrência'],
                      stroke: { show: false },
                      legend: { show: false },
                      tooltip: { theme: 'dark' }
                    }} 
                    series={[45, 80, 25, 60]} 
                    type="polarArea" 
                    height="100%" 
                  />
               </div>
            </div>
         </div>
      </div>

      <div className="glass-card !p-0 overflow-hidden">
        <div className="p-8 flex items-center justify-between border-b border-white/5">
           <h3 className="font-bold text-white text-lg">Detalalhamento de Recebíveis</h3>
           <div className="flex items-center gap-4">
              <button className="p-2 text-muted-foreground hover:text-white"><Filter size={20} /></button>
              <button className="text-xs font-bold text-brand hover:underline">Ver Histórico Completo</button>
           </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] border-b border-white/5">
                <th className="px-8 py-5">Cliente / Serviço</th>
                <th className="px-6 py-5">Vencimento</th>
                <th className="px-6 py-5">Valor</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-8 py-5 text-right">Método</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[1,2,3,4,5].map(i => (
                <tr key={i} className="hover:bg-white/5 transition-colors group">
                   <td className="px-8 py-6">
                      <p className="font-bold text-white">Projeto Unidade {i}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Cliente Exemplo LTDA</p>
                   </td>
                   <td className="px-6 py-6 text-sm text-muted-foreground font-medium">25 de Jul, 2024</td>
                   <td className="px-6 py-6 font-mono font-bold text-white">{formatCurrency(12500 + (i * 1000))}</td>
                   <td className="px-6 py-6">
                      <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                        i % 2 === 0 ? "bg-emerald-500/10 text-emerald-500" : "bg-brand/10 text-brand"
                      }`}>
                        {i % 2 === 0 ? "Recebido" : "Previsto"}
                      </span>
                   </td>
                   <td className="px-8 py-6 text-right text-muted-foreground text-xs font-bold uppercase tracking-widest">Boleto / ASAAS</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
