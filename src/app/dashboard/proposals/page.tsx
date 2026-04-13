"use client";

import { useState } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Target, 
  Calendar, 
  ArrowRight,
  User,
  Zap
} from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const PIPELINE_STAGES = [
  { id: "lead", label: "Lead Recebido", color: "text-blue-400" },
  { id: "contact", label: "Contato Iniciado", color: "text-amber-400" },
  { id: "meeting", label: "Reunião Agendada", color: "text-purple-400" },
  { id: "proposal", label: "Proposta Enviada", color: "text-brand" },
  { id: "negotiation", label: "Em Negociação", color: "text-rose-400" },
];

const OPPORTUNITIES = [
  { id: 1, title: "Expansão Sede Administrativa", client: "TechCorp S.A", value: 450000, stage: "proposal", prob: 75, rep: "Tayrone" },
  { id: 2, title: "Reforma Estrutural Vila Nova", client: "João Pedro", value: 28000, stage: "contact", prob: 30, rep: "Jairo" },
  { id: 3, title: "Piso Epóxi Fábrica Norte", client: "Logistics LTDA", value: 125000, stage: "negotiation", prob: 90, rep: "Tayrone" },
  { id: 4, title: "Manutenção Emergencial", client: "Condomínio Solaris", value: 8500, stage: "lead", prob: 10, rep: "Ana" },
  { id: 5, title: "Projeto Luminotécnico", client: "Restaurante Gourmet", value: 15600, stage: "meeting", prob: 50, rep: "Jairo" },
];

export default function ProposalsPage() {
  const [opportunities, setOpportunities] = useState(OPPORTUNITIES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    client: "",
    value: "",
    stage: "lead",
    prob: 50,
    rep: "Tayrone"
  });

  const handleAddOpportunity = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      const newOpp = {
        id: opportunities.length + 1,
        ...formData,
        value: Number(formData.value),
        prob: Number(formData.prob)
      };
      
      setOpportunities([...opportunities, newOpp]);
      setIsModalOpen(false);
      setIsSubmitting(false);
      setFormData({ title: "", client: "", value: "", stage: "lead", prob: 50, rep: "Tayrone" });
    }, 1500);
  };

  const totalValue = opportunities.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="space-y-10 animate-fade-in pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-outfit font-bold text-white tracking-tight">Propostas & Funil</h1>
          <p className="text-muted-foreground mt-1">Monitore seu pipeline comercial e taxa de fechamento.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-surface-secondary border border-surface-border rounded-xl px-4 py-3 flex items-center gap-3">
             <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Valor do Pipeline</span>
             <span className="text-lg font-black text-white">{formatCurrency(totalValue)}</span>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-brand hover:bg-brand-hover text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg active:scale-95"
          >
            <Plus size={20} />
            <span>Nova Oportunidade</span>
          </button>
        </div>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide min-h-[70vh]">
        {PIPELINE_STAGES.map((stage) => (
          <div key={stage.id} className="flex-shrink-0 w-80">
            <div className="flex items-center justify-between mb-6 px-1">
              <div className="flex items-center gap-3">
                 <h3 className={cn("text-xs font-black uppercase tracking-widest", stage.color)}>
                   {stage.label}
                 </h3>
                 <span className="text-[10px] font-bold bg-white/5 text-muted-foreground px-2 py-0.5 rounded-full">
                   {opportunities.filter(o => o.stage === stage.id).length}
                 </span>
              </div>
            </div>

            <div className="space-y-4">
              {opportunities.filter(o => o.stage === stage.id).map((opp) => (
                <motion.div 
                  layoutId={`opp-${opp.id}`}
                  key={opp.id}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="glass-card !p-5 hover:border-brand/40 group cursor-grab active:cursor-grabbing relative overflow-hidden"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-white text-[0.95rem] leading-tight group-hover:text-brand transition-colors">{opp.title}</h4>
                    <button className="text-muted-foreground hover:text-white transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </div>

                  <p className="text-xs text-muted-foreground mb-6 flex items-center gap-1.5">
                     <User size={12} className="text-brand/50" />
                     {opp.client}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                     <span className="text-lg font-black text-white tabular-nums">{formatCurrency(opp.value)}</span>
                  </div>

                  <div className="space-y-3">
                     <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                        <span className="text-muted-foreground">Probabilidade</span>
                        <span className={cn(
                          opp.prob > 70 ? "text-emerald-500" : opp.prob > 30 ? "text-amber-500" : "text-rose-500"
                        )}>{opp.prob}%</span>
                     </div>
                     <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "h-full transition-all duration-1000",
                            opp.prob > 70 ? "bg-emerald-500" : opp.prob > 30 ? "bg-amber-500" : "bg-rose-500"
                          )} 
                          style={{ width: `${opp.prob}%` }} 
                        />
                     </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                     <div className="flex -space-x-2">
                        {[1, 2].map(i => (
                          <div key={i} className="w-6 h-6 rounded-full border-2 border-surface bg-surface-tertiary flex items-center justify-center overflow-hidden">
                             <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${opp.rep}${i}`} alt="Rep" />
                          </div>
                        ))}
                     </div>
                     <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-bold">
                        <Calendar size={12} />
                        Dez 2024
                     </div>
                  </div>
                </motion.div>
              ))}
              
              <button 
                onClick={() => {
                  setFormData({ ...formData, stage: stage.id });
                  setIsModalOpen(true);
                }}
                className="w-full py-4 border-2 border-dashed border-white/5 rounded-3xl text-sm font-bold text-muted-foreground hover:border-brand/20 hover:text-brand transition-all flex items-center justify-center gap-2"
              >
                 <Plus size={16} />
                 Nova Oportunidade
              </button>
            </div>
          </div>
        ))}
        
        <div className="flex-shrink-0 w-80">
           <div className="h-full rounded-3xl border-2 border-dashed border-white/5 flex flex-col items-center justify-center text-center p-8 grayscale opacity-40">
              <Zap size={32} className="text-brand mb-4" />
              <h3 className="font-bold text-white mb-2 uppercase tracking-widest text-xs">Acelere seu funil</h3>
              <p className="text-xs text-muted-foreground">Novas colunas e automações serão exibidas aqui.</p>
           </div>
        </div>
      </div>

      {/* Modal Nova Oportunidade */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="absolute inset-0 bg-black/60 backdrop-blur-md"
               onClick={() => setIsModalOpen(false)}
            />
            <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, y: 20 }}
               className="relative w-full max-w-xl bg-surface-secondary border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-white/5 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Nova Oportunidade</h2>
                  <p className="text-sm text-muted-foreground mt-1">Adicione um novo negócio ao seu pipeline comercial.</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/5 rounded-xl transition-all">
                   <Plus size={24} className="rotate-45 text-muted-foreground" />
                </button>
              </div>

              <form onSubmit={handleAddOpportunity} className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2 col-span-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Título do Negócio</label>
                    <input 
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="Ex: Reforma Prédio Comercial"
                      className="w-full bg-surface-tertiary border border-white/5 rounded-2xl py-3 px-4 text-white focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Cliente</label>
                    <input 
                      required
                      value={formData.client}
                      onChange={(e) => setFormData({...formData, client: e.target.value})}
                      placeholder="Nome do cliente ou empresa"
                      className="w-full bg-surface-tertiary border border-white/5 rounded-2xl py-3 px-4 text-white focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Valor Estimado (R$)</label>
                    <input 
                      required
                      type="number"
                      value={formData.value}
                      onChange={(e) => setFormData({...formData, value: e.target.value})}
                      className="w-full bg-surface-tertiary border border-white/5 rounded-2xl py-3 px-4 text-white focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Probabilidade (%)</label>
                    <input 
                      required
                      type="number"
                      min="0"
                      max="100"
                      value={formData.prob}
                      onChange={(e) => setFormData({...formData, prob: e.target.value})}
                      className="w-full bg-surface-tertiary border border-white/5 rounded-2xl py-3 px-4 text-white focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Fase Inicial</label>
                    <select 
                      value={formData.stage}
                      onChange={(e) => setFormData({...formData, stage: e.target.value})}
                      className="w-full bg-surface-tertiary border border-white/5 rounded-2xl py-3 px-4 text-white focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all outline-none"
                    >
                      {PIPELINE_STAGES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                    </select>
                  </div>
                </div>

                <div className="pt-6 flex gap-4">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-4 rounded-2xl font-bold bg-white/5 text-white hover:bg-white/10 transition-all"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-4 rounded-2xl font-bold bg-brand text-white hover:bg-brand-hover transition-all flex items-center justify-center gap-2 shadow-xl shadow-brand/20"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      "Criar Proposta"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
