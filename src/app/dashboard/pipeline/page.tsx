"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LucideLayoutGrid, 
  LucideList, 
  LucideSearch, 
  LucidePlus, 
  LucideArrowRight,
  LucideMoreVertical,
  LucidePhone,
  LucideMessageSquare,
  LucideAlertCircle,
  LucideClock,
  LucideTarget,
  LucideFilter
} from "lucide-react";

type Universe = "partners" | "expansion";

const STAGES = [
  { id: "s1", title: "Entrada de Lead", color: "bg-[#60A5FA]" },
  { id: "s2", title: "Qualificação", color: "bg-[#F59E0B]" },
  { id: "s3", title: "Negociação", color: "bg-[#6366F1]" },
  { id: "s4", title: "Fechamento", color: "bg-[#10B981]" },
];

const MOCK_PIPELINE = {
  partners: [
    { id: "l1", name: "Imobiliária Prime", stageId: "s1", value: "R$ 1.500", temperature: "Quente", lastActivity: "2h atrás" },
    { id: "l2", name: "Lacerda Tintas", stageId: "s2", value: "R$ 2.200", temperature: "Morno", lastActivity: "5h atrás" },
    { id: "l3", name: "Vidraçaria Central", stageId: "s3", value: "R$ 4.500", temperature: "Quente", lastActivity: "Ontem" },
  ],
  expansion: [
    { id: "l4", name: "Marmoraria Elite", stageId: "s3", value: "Escala B", temperature: "Morno", lastActivity: "1d atrás" },
    { id: "l5", name: "Solaris Energia", stageId: "s1", value: "Escala A", temperature: "Quente", lastActivity: "Agora" },
  ]
};

export default function PipelinePage() {
  const [universe, setUniverse] = useState<Universe>("partners");

  return (
    <div className="space-y-10 pb-20">
      {/* Header & Controles Elite */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-[32px] font-bold text-[#1A1D2F] font-outfit tracking-tight leading-none">Pipeline Comercial</h1>
          <p className="text-[#64748B] font-medium text-sm mt-3">Gestão do fluxo de conversão para <span className="text-[#2E5BFF] font-bold">{universe === 'partners' ? 'Parceiros' : 'Expansão Nacional'}</span>.</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center p-1.5 bg-white rounded-2xl border border-[#F1F5F9] shadow-sm">
            <button 
              onClick={() => setUniverse("partners")}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] transition-all ${universe === 'partners' ? 'bg-[#1A1D2F] text-white shadow-lg' : 'text-[#64748B] hover:bg-[#F8FAFC]'}`}
            >
              Parceiros
            </button>
            <button 
              onClick={() => setUniverse("expansion")}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] transition-all ${universe === 'expansion' ? 'bg-[#1A1D2F] text-white shadow-lg' : 'text-[#64748B] hover:bg-[#F8FAFC]'}`}
            >
              Expansão
            </button>
          </div>
          <button className="flex items-center gap-2 px-8 py-3.5 bg-[#2E5BFF] text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-blue-500/20 hover:bg-blue-600 transition-all active:scale-95">
            <LucidePlus size={18} /> Novo Negócio
          </button>
        </div>
      </div>

      {/* Kanban Board Elite */}
      <div className="flex gap-8 overflow-x-auto pb-10 custom-scrollbar min-h-[750px]">
        {STAGES.map((stage, sIdx) => {
          const leadsInStage = MOCK_PIPELINE[universe].filter(l => l.stageId === stage.id);
          
          return (
            <motion.div 
              key={stage.id} 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: sIdx * 0.1 }}
              className="flex-shrink-0 w-[340px] flex flex-col gap-5"
            >
              {/* Cabeçalho da Etapa */}
              <div className="flex items-center justify-between px-4">
                 <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${stage.color} shadow-[0_0_12px_rgba(0,0,0,0.1)] ring-4 ring-white shadow-sm`} />
                    <h3 className="font-bold text-[#1A1D2F] text-base tracking-tight">{stage.title}</h3>
                    <span className="text-[10px] font-black text-[#CBD5E1] bg-[#F8FAFC] px-2.5 py-1 rounded-lg border border-[#F1F5F9]">
                      {leadsInStage.length}
                    </span>
                 </div>
                 <button className="text-[#CBD5E1] hover:text-[#1A1D2F] transition-colors p-1"><LucideMoreVertical size={18} /></button>
              </div>

              {/* Container de Negócios */}
              <div className="flex-1 space-y-5 px-1 pb-4">
                <AnimatePresence mode="popLayout">
                  {leadsInStage.map((lead) => (
                    <motion.div 
                      key={lead.id}
                      layoutId={lead.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ y: -6, shadow: "0 30px 60px -15px rgba(0,0,0,0.12)" }}
                      className="bg-white p-7 rounded-[32px] border border-[#F1F5F9] shadow-sm cursor-grab active:cursor-grabbing group relative overflow-hidden transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-5">
                         <span className={`text-[9px] px-2.5 py-1 rounded-lg font-black uppercase tracking-widest ${lead.temperature === 'Quente' ? 'bg-rose-50 text-[#E11D48] border border-rose-100' : 'bg-amber-50 text-[#F59E0B] border border-amber-100'}`}>
                            {lead.temperature}
                         </span>
                         <button className="text-[#CBD5E1] opacity-0 group-hover:opacity-100 transition-opacity"><LucideFilter size={16} /></button>
                      </div>
                      
                      <h4 className="font-bold text-[#1A1D2F] text-[17px] mb-2 group-hover:text-[#2E5BFF] transition-colors tracking-tight leading-tight">{lead.name}</h4>
                      <div className="flex items-center gap-2 mb-8">
                        <span className="text-[10px] font-black text-[#CBD5E1] uppercase tracking-widest leading-none">Potencial:</span>
                        <span className="text-[15px] font-black text-[#1A1D2F] tracking-tight">{lead.value}</span>
                      </div>
                      
                      <div className="flex items-center justify-between pt-5 border-t border-[#F8FAFC]">
                         <div className="flex items-center gap-2 text-[10px] font-black text-[#CBD5E1] uppercase tracking-[0.15em] leading-none">
                            <LucideClock size={14} className="text-[#CBD5E1]" /> {lead.lastActivity}
                         </div>
                         <div className="flex items-center -space-x-2">
                            <div className="w-8 h-8 rounded-full border-2 border-white bg-[#E0E7FF] flex items-center justify-center text-[10px] font-black text-[#2E5BFF] shadow-sm">TL</div>
                            <div className="w-8 h-8 rounded-full border-2 border-white bg-[#F8FAFC] flex items-center justify-center text-[#CBD5E1] hover:text-[#1A1D2F] transition-all cursor-pointer">
                               <LucidePlus size={12} />
                            </div>
                         </div>
                      </div>

                      {/* Barra Lateral Sutil */}
                      <div className={`absolute top-0 left-0 bottom-0 w-[3px] ${stage.color} opacity-40`} />
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Placeholder de Novo Negócio */}
                <button className="w-full border-2 border-dashed border-[#F1F5F9] rounded-[32px] py-8 flex flex-col items-center justify-center gap-3 group hover:border-[#2E5BFF]/30 hover:bg-[#F8FAFF] transition-all duration-300">
                   <div className="w-12 h-12 rounded-2xl bg-[#F8FAFC] flex items-center justify-center text-[#CBD5E1] group-hover:bg-[#2E5BFF] group-hover:text-white group-hover:rotate-90 transition-all duration-500">
                      <LucidePlus size={24} />
                   </div>
                   <span className="text-[10px] font-black text-[#CBD5E1] uppercase tracking-[0.25em] group-hover:text-[#2E5BFF] transition-colors">Novo Negócio</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Insight Flutuante Elite */}
      <div className="bg-white p-10 rounded-[48px] border border-[#F1F5F9] shadow-xl flex items-center justify-between gap-10 relative overflow-hidden ring-1 ring-[#F1F5F9] hover:shadow-2xl transition-all duration-500">
         <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#2E5BFF]/5 rounded-full -translate-y-1/2 translate-x-1/2" />
         <div className="flex items-center gap-10 relative z-10 w-full max-w-4xl">
            <div className="w-20 h-20 bg-[#F8FAFF] rounded-[32px] flex items-center justify-center text-[#2E5BFF] shadow-inner border border-blue-50 group">
               <LucideTarget size={36} className="group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div>
               <h3 className="text-2xl font-bold text-[#1A1D2F] font-outfit tracking-tight leading-tight">Inteligência de Pipeline</h3>
               <p className="text-[#64748B] text-base font-medium mt-2 leading-relaxed max-w-2xl">Detectamos <span className="text-[#2E5BFF] font-black underline underline-offset-4 decoration-2">4 negociações estagnadas</span> no estágio final. Sugerimos acionamento imediato para garantir a meta trimestral.</p>
            </div>
         </div>
         <button className="flex items-center gap-3 px-10 py-5 bg-[#1A1D2F] text-white font-black text-xs uppercase tracking-[0.2em] rounded-3xl shadow-2xl shadow-zinc-300 hover:bg-black transition-all active:scale-95 relative z-10 group">
            Ver Prioridades <LucideArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
         </button>
      </div>
    </div>
  );
}
