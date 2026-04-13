"use client";

import { useState } from "react";
import { 
  Search, 
  Filter, 
  Plus, 
  LayoutGrid, 
  List, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  MoreVertical,
  Calendar,
  DollarSign
} from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import { motion, Reorder } from "framer-motion";

const STAGES = [
  { id: "new", label: "Novo", color: "text-blue-500", bg: "bg-blue-500/10" },
  { id: "analysis", label: "Em Análise", color: "text-amber-500", bg: "bg-amber-500/10" },
  { id: "progress", label: "Em Andamento", color: "text-brand", bg: "bg-brand/10" },
  { id: "waiting", label: "Aguardando Pagamento", color: "text-purple-500", bg: "bg-purple-500/10" },
  { id: "completed", label: "Concluído", color: "text-emerald-500", bg: "bg-emerald-500/10" },
];

const SERVICES_DATA = [
  { id: 1, title: "Reforma Apartamento 402", client: "Roberto Silva", value: 45000, stage: "progress", progress: 65, dueDate: "25/07/2024" },
  { id: 2, title: "Piso Industrial Galpão B", client: "Engenharia Atlas", value: 120000, stage: "completed", progress: 100, dueDate: "10/06/2024" },
  { id: 3, title: "Fachada Comercial Centro", client: "Construtora Horizonte", value: 85000, stage: "analysis", progress: 15, dueDate: "15/08/2024" },
  { id: 4, title: "Manutenção Predial", client: "Shopping Delta", value: 12500, stage: "waiting", progress: 90, dueDate: "30/06/2024" },
  { id: 5, title: "Instalação Elétrica - Lote 5", client: "Engenharia Atlas", value: 35000, stage: "new", progress: 0, dueDate: "05/09/2024" },
];

export default function ServicesPage() {
  const [viewMode, setViewMode] = useState<"kanban" | "list">("kanban");

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-outfit font-bold text-white tracking-tight">Gestão de Serviços</h1>
          <p className="text-muted-foreground mt-1">Acompanhe cada etapa da sua operação em tempo real.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-surface-secondary border border-surface-border rounded-xl p-1">
             <button 
               onClick={() => setViewMode("kanban")}
               className={cn("p-2 rounded-lg transition-all", viewMode === "kanban" ? "bg-brand/10 text-brand shadow-inner" : "text-muted-foreground")}
             >
               <LayoutGrid size={20} />
             </button>
             <button 
               onClick={() => setViewMode("list")}
               className={cn("p-2 rounded-lg transition-all", viewMode === "list" ? "bg-brand/10 text-brand shadow-inner" : "text-muted-foreground")}
             >
               <List size={20} />
             </button>
          </div>
          <button className="flex items-center gap-2 bg-brand hover:bg-brand-hover text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-brand/20 active:scale-95">
            <Plus size={20} />
            <span>Novo Serviço</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="relative group w-full lg:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-brand transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Pesquisar serviço ou cliente..."
            className="w-full bg-surface-secondary border border-surface-border rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all"
          />
        </div>
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-surface-secondary border border-surface-border text-sm font-medium text-white hover:bg-surface-border transition-all">
            <Filter size={18} />
            Filtros
          </button>
        </div>
      </div>

      {viewMode === "kanban" ? (
        <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
          {STAGES.map((stage) => (
            <div key={stage.id} className="flex-shrink-0 w-80">
              <div className="flex items-center justify-between mb-6 px-1">
                <div className="flex items-center gap-3">
                   <div className={cn("w-2 h-2 rounded-full", stage.id === "progress" ? "bg-brand" : stage.id === "completed" ? "bg-emerald-500" : "bg-muted-foreground")} />
                   <h3 className="text-sm font-black uppercase tracking-widest text-white">{stage.label}</h3>
                   <span className="text-[10px] font-bold bg-white/5 text-muted-foreground px-2 py-0.5 rounded-full">
                     {SERVICES_DATA.filter(s => s.stage === stage.id).length}
                   </span>
                </div>
                <button className="text-muted-foreground hover:text-white transition-colors">
                  <Plus size={16} />
                </button>
              </div>

              <div className="space-y-4">
                {SERVICES_DATA.filter(s => s.stage === stage.id).map((service) => (
                  <motion.div 
                    layoutId={`card-${service.id}`}
                    key={service.id}
                    whileHover={{ y: -4 }}
                    className="glass-card !p-5 hover:border-brand/30 group cursor-grab active:cursor-grabbing"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="font-bold text-white text-[0.95rem] leading-tight group-hover:text-brand transition-colors">{service.title}</h4>
                      <button className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical size={16} />
                      </button>
                    </div>

                    <p className="text-xs text-muted-foreground mb-4 font-medium flex items-center gap-1.5">
                       <span className="w-1.5 h-1.5 bg-brand/40 rounded-full" />
                       {service.client}
                    </p>

                    <div className="space-y-4">
                       <div className="flex items-center justify-between text-xs font-bold">
                          <span className="text-white">{formatCurrency(service.value)}</span>
                          <span className="text-brand">{service.progress}%</span>
                       </div>
                       <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${service.progress}%` }}
                            className="h-full bg-brand" 
                          />
                       </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                       <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-bold">
                          <Calendar size={12} className="text-brand/60" />
                          {service.dueDate}
                       </div>
                       <div className="w-6 h-6 rounded-lg bg-surface-tertiary border border-surface-border flex items-center justify-center overflow-hidden">
                          <img 
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${service.client}`} 
                            alt="Res" 
                            className="w-full h-full object-cover"
                          />
                       </div>
                    </div>
                  </motion.div>
                ))}
                <button className="w-full py-4 border-2 border-dashed border-white/5 rounded-3xl text-xs font-bold text-muted-foreground hover:border-brand/20 hover:text-brand transition-all">
                  + Adicionar tarefa
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card !p-0 overflow-hidden">
           <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] border-b border-white/5">
                <th className="px-8 py-5">Serviço / Cliente</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5">Valor Contract.</th>
                <th className="px-6 py-5">Progresso</th>
                <th className="px-8 py-5 text-right">Data Final</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {SERVICES_DATA.map((service) => (
                <tr key={service.id} className="hover:bg-brand/5 transition-colors group">
                   <td className="px-8 py-6">
                      <p className="font-bold text-white">{service.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{service.client}</p>
                   </td>
                   <td className="px-6 py-6 font-bold text-sm text-brand">{service.stage}</td>
                   <td className="px-6 py-6 font-mono text-white">{formatCurrency(service.value)}</td>
                   <td className="px-6 py-6">
                      <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                         <div className="h-full bg-brand" style={{ width: `${service.progress}%` }} />
                      </div>
                   </td>
                   <td className="px-8 py-6 text-right text-muted-foreground text-sm">{service.dueDate}</td>
                </tr>
              ))}
            </tbody>
           </table>
        </div>
      )}
    </div>
  );
}
