"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LucideSearch, 
  LucideFilter, 
  LucideMoreHorizontal, 
  LucidePhone, 
  LucideMail, 
  LucideMapPin, 
  LucidePlus,
  LucideDownload,
  LucideClock,
  LucideChevronRight,
  LucideX
} from "lucide-react";

type Universe = "partners" | "expansion";

const LEADS = {
  partners: [
    { id: 1, name: "Imobiliária Prime", contact: "João Silva", niche: "Imobiliária", location: "João Pessoa, PB", status: "Novo", temperature: "Urgente", value: "R$ 4.5k" },
    { id: 3, name: "Vidraçaria Central", contact: "Pedro Santos", niche: "Vidraçaria", location: "Cabedelo, PB", status: "Negociação", temperature: "Frio", value: "R$ 2.1k" },
    { id: 4, name: "Marmoraria Elite", contact: "Ana Costa", niche: "Marmoraria", location: "Natal, RN", status: "Proposta", temperature: "Urgente", value: "R$ 8.9k" },
  ],
  expansion: [
    { id: 2, name: "ConstruTech Nordeste", contact: "Maria Oliveira", niche: "Tech Construção", location: "Recife, PE", status: "Contato", temperature: "Morno", value: "Escala A" },
    { id: 5, name: "Solaris Energia", contact: "Ricardo Lima", niche: "Energia Solar", location: "João Pessoa, PB", status: "Novo", temperature: "Morno", value: "Escala B" },
  ]
};

const STATUS_STYLING: Record<string, string> = {
  "Novo": "bg-blue-50 text-blue-600 border-blue-100",
  "Contato": "bg-amber-50 text-amber-600 border-amber-100",
  "Proposta": "bg-purple-50 text-purple-600 border-purple-100",
  "Negociação": "bg-emerald-50 text-emerald-600 border-emerald-100",
};

const TEMP_STYLING: Record<string, string> = {
  "Urgente": "bg-[#E11D48]", // Premium Rose
  "Morno": "bg-[#F59E0B]",   // Premium Amber
  "Frio": "bg-[#94A3B8]",    // Premium Slate
};

export default function LeadsPage() {
  const [universe, setUniverse] = useState<Universe>("partners");
  const [selectedLead, setSelectedLead] = useState<any>(null);

  const currentLeads = LEADS[universe];

  return (
    <div className="space-y-8 pb-14">
      {/* Header & Filtro de Contexto */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-[32px] font-bold text-[#1A1D2F] font-outfit tracking-tight leading-none">Hub de Relacionamento</h1>
          <p className="text-[#64748B] font-medium text-sm mt-3">
            Gestão estratégica de prospecção para <span className="text-[#2E5BFF] font-bold">{universe === 'partners' ? 'Parceiros' : 'Expansão Nacional'}</span>.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center p-1.5 bg-white rounded-2xl border border-[#F1F5F9] shadow-sm">
            <button 
              onClick={() => setUniverse("partners")}
              className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${universe === 'partners' ? 'bg-[#1A1D2F] text-white shadow-lg' : 'text-[#64748B] hover:bg-[#F8FAFC]'}`}
            >
              Parceiros
            </button>
            <button 
              onClick={() => setUniverse("expansion")}
              className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${universe === 'expansion' ? 'bg-[#1A1D2F] text-white shadow-lg' : 'text-[#64748B] hover:bg-[#F8FAFC]'}`}
            >
              Expansão
            </button>
          </div>
          <button className="flex items-center gap-2 px-7 py-3.5 bg-[#2E5BFF] text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-2xl shadow-blue-500/20 hover:bg-blue-600 transition-all active:scale-95">
            <LucidePlus size={18} />
            Novo Registro
          </button>
        </div>
      </div>

      {/* Barra de Filtros Elite */}
      <div className="bg-white p-5 rounded-[28px] border border-[#F1F5F9] shadow-sm flex flex-wrap items-center gap-5">
        <div className="relative flex-1 min-w-[300px] group">
          <LucideSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-[#CBD5E1] group-focus-within:text-[#2E5BFF] transition-colors w-5 h-5" />
          <input 
            type="text" 
            placeholder="Pesquisar leads, contatos ou cidades..."
            className="w-full pl-14 pr-6 py-4 bg-[#F8FAFC] border-transparent focus:bg-white focus:border-[#F1F5F9] focus:ring-4 focus:ring-blue-500/5 rounded-2xl outline-none text-sm font-bold text-[#1A1D2F] transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-4 bg-[#F8FAFC] text-[#64748B] text-[10px] font-black uppercase tracking-widest rounded-2xl border border-[#F1F5F9] hover:bg-white transition-all">
          <LucideFilter size={16} />
          Filtros Avançados
        </button>
        <div className="h-10 w-[1px] bg-[#F1F5F9] mx-2" />
        <button className="flex items-center gap-2 px-6 py-4 text-[#94A3B8] hover:text-[#1A1D2F] text-[10px] font-black uppercase tracking-widest transition-all">
          <LucideDownload size={16} />
          Exportar
        </button>
      </div>

      {/* Tabela de Leads High-End */}
      <div className="bg-white rounded-[32px] border border-[#F1F5F9] shadow-sm overflow-hidden">
        <div className="overflow-x-auto overflow-y-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#F1F5F9]">
                <th className="px-10 py-6 text-[10px] font-black text-[#CBD5E1] uppercase tracking-[0.2em]">Empresa / Registro</th>
                <th className="px-10 py-6 text-[10px] font-black text-[#CBD5E1] uppercase tracking-[0.2em]">Status & Estágio</th>
                <th className="px-10 py-6 text-[10px] font-black text-[#CBD5E1] uppercase tracking-[0.2em]">Localização</th>
                <th className="px-10 py-6 text-[10px] font-black text-[#CBD5E1] uppercase tracking-[0.2em]">Nicho</th>
                <th className="px-10 py-6 text-[10px] font-black text-[#CBD5E1] uppercase tracking-[0.2em]">Potencial</th>
                <th className="px-10 py-6 text-[10px] font-black text-[#CBD5E1] uppercase tracking-[0.2em] text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]/50">
              <AnimatePresence mode="popLayout">
                {currentLeads.map((lead, idx) => (
                  <motion.tr 
                    key={`${universe}-${lead.id}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ delay: idx * 0.04 }}
                    className="group hover:bg-[#F8FAFC]/50 cursor-pointer transition-colors"
                    onClick={() => setSelectedLead(lead)}
                  >
                    <td className="px-10 py-7">
                      <div className="flex items-center gap-5">
                        <div className="w-11 h-11 rounded-[14px] bg-[#E0E7FF] flex items-center justify-center text-[#2E5BFF] font-black text-xs shadow-sm group-hover:scale-110 transition-transform duration-300">
                          {lead.name.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-[#1A1D2F] group-hover:text-[#2E5BFF] transition-colors">{lead.name}</span>
                          <span className="text-[10px] text-[#94A3B8] font-black uppercase tracking-tight mt-1">{lead.contact}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-7">
                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase border tracking-widest ${STATUS_STYLING[lead.status]}`}>
                          {lead.status}
                        </span>
                        <div className={`w-2 h-2 rounded-full ${TEMP_STYLING[lead.temperature]} shadow-[0_0_10px_rgba(225,29,72,0.2)]`} title={lead.temperature} />
                      </div>
                    </td>
                    <td className="px-10 py-7">
                      <div className="flex items-center gap-2 text-xs text-[#475569] font-bold">
                        <LucideMapPin size={14} className="text-[#CBD5E1]" />
                        {lead.location}
                      </div>
                    </td>
                    <td className="px-10 py-7">
                      <span className="text-[10px] font-black text-[#94A3B8] uppercase tracking-wider">{lead.niche}</span>
                    </td>
                    <td className="px-10 py-7">
                      <span className="text-sm font-black text-[#1A1D2F]">{lead.value}</span>
                    </td>
                    <td className="px-10 py-7 text-right">
                      <button className="p-2.5 text-[#CBD5E1] hover:text-[#1A1D2F] hover:bg-[#F1F5F9] rounded-xl transition-all">
                        <LucideMoreHorizontal size={20} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        
        <div className="px-10 py-5 bg-[#F8FAFC]/40 border-t border-[#F1F5F9] flex items-center justify-between">
          <span className="text-[10px] text-[#94A3B8] font-black uppercase tracking-widest leading-none">Página 1 de 42 Registros</span>
          <div className="flex items-center gap-3">
             <button className="px-5 py-2.5 border border-[#F1F5F9] rounded-xl text-[10px] font-black uppercase text-[#CBD5E1] hover:bg-white disabled:opacity-30" disabled>Anterior</button>
             <button className="px-5 py-2.5 bg-white border border-[#F1F5F9] rounded-xl text-[10px] font-black uppercase text-[#1A1D2F] shadow-sm hover:shadow-md transition-all">Próximo</button>
          </div>
        </div>
      </div>

      {/* Detalhes do Lead - Elite Drawer */}
      <AnimatePresence>
        {selectedLead && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLead(null)}
              className="fixed inset-0 bg-[#050608]/20 backdrop-blur-[4px] z-[60]"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="fixed right-6 top-6 bottom-6 w-full max-w-[500px] bg-white rounded-[40px] shadow-2xl z-[70] flex flex-col border border-[#F1F5F9] overflow-hidden"
            >
              <div className="p-10 pb-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="w-14 h-14 rounded-2xl bg-[#2E5BFF] flex items-center justify-center text-white font-black text-xl shadow-lg ring-4 ring-blue-50">
                     {selectedLead.name.charAt(0)}
                   </div>
                   <div>
                     <h2 className="text-2xl font-bold text-[#1A1D2F] tracking-tight">{selectedLead.name}</h2>
                     <p className="text-[10px] text-[#2E5BFF] font-black uppercase tracking-[0.2em] mt-0.5">{selectedLead.niche}</p>
                   </div>
                </div>
                <button 
                  onClick={() => setSelectedLead(null)}
                  className="w-12 h-12 flex items-center justify-center bg-[#F8FAFC] border border-[#F1F5F9] rounded-2xl text-[#CBD5E1] hover:text-[#1A1D2F] transition-all group"
                >
                  <LucideX size={22} className="group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-10 pt-4 space-y-10">
                {/* Status Bar */}
                <div className="flex items-center justify-between p-6 bg-[#F8FAFC] rounded-[32px] border border-[#F1F5F9]">
                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-[#CBD5E1] uppercase tracking-[0.2em]">Fase Atual</span>
                    <div className="flex items-center gap-2">
                       <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase border tracking-widest ${STATUS_STYLING[selectedLead.status]}`}>
                         {selectedLead.status}
                       </span>
                    </div>
                  </div>
                  <div className="h-12 w-[1px] bg-[#E2E8F0]" />
                  <div className="space-y-2 text-right">
                    <span className="text-[10px] font-black text-[#CBD5E1] uppercase tracking-[0.2em]">Engajamento</span>
                    <div className="flex items-center justify-end gap-3 text-xs font-black text-[#1A1D2F] uppercase tracking-widest">
                       <div className={`w-2 h-2 rounded-full ${TEMP_STYLING[selectedLead.temperature]} shadow-lg`} />
                       {selectedLead.temperature}
                    </div>
                  </div>
                </div>

                {/* Grid de Informações */}
                <div className="grid grid-cols-2 gap-5">
                   <div className="space-y-2 p-5 bg-white border border-[#F1F5F9] rounded-2xl shadow-sm">
                      <span className="text-[10px] text-[#CBD5E1] font-black uppercase tracking-[0.2em]">Responsável Primário</span>
                      <p className="font-bold text-[#1A1D2F] text-sm tracking-tight">{selectedLead.contact}</p>
                   </div>
                   <div className="space-y-2 p-5 bg-white border border-[#F1F5F9] rounded-2xl shadow-sm">
                      <span className="text-[10px] text-[#CBD5E1] font-black uppercase tracking-[0.2em]">Localidade Ativa</span>
                      <p className="font-bold text-[#1A1D2F] text-sm tracking-tight">{selectedLead.location}</p>
                   </div>
                </div>

                {/* Timeline Feed */}
                <div className="space-y-7 pt-4 border-t border-[#F1F5F9]">
                   <h3 className="text-[11px] font-black text-[#1A1D2F] uppercase tracking-[0.3em] flex items-center gap-3">
                      <LucideClock size={16} className="text-[#2E5BFF]" /> Histórico de Atividades
                   </h3>
                   <div className="space-y-10 relative before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[2.5px] before:bg-[#F8FAFC] px-2">
                      <div className="relative pl-10">
                         <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-white border-4 border-[#2E5BFF] z-10" />
                         <span className="text-[10px] font-black text-[#CBD5E1] uppercase tracking-widest">Out 24, 2023 · 14:30</span>
                         <h4 className="text-[15px] font-bold text-[#1A1D2F] mt-2">Envio de Proposta Iniciado</h4>
                         <p className="text-sm text-[#64748B] mt-2 leading-relaxed font-medium">Pacote padrão de parceria regional enviado com foco em expansão agressiva.</p>
                      </div>
                      <div className="relative pl-10">
                         <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-white border-4 border-[#F1F5F9] z-10" />
                         <span className="text-[10px] font-black text-[#CBD5E1] uppercase tracking-widest">Out 23, 2023 · 09:12</span>
                         <h4 className="text-[15px] font-bold text-[#64748B] mt-2 opacity-60">Lead Captado via Script</h4>
                         <p className="text-sm text-[#CBD5E1] mt-2 leading-relaxed font-medium italic">Dados extraídos para base estratégica regional.</p>
                      </div>
                   </div>
                </div>
              </div>
              
              <div className="p-10 border-t border-[#F1F5F9] bg-[#F8FAFC]/30 flex gap-5">
                 <button className="flex-1 py-5 bg-white border border-[#F1F5F9] text-[#1A1D2F] text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl hover:shadow-md transition-all active:scale-[0.98]">
                   Editar Registro
                 </button>
                 <button className="flex-[1.8] py-5 bg-[#2E5BFF] text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-blue-500/20 hover:bg-blue-600 transition-all active:scale-[0.98] flex items-center justify-center gap-3">
                   Abrir Negociação <LucideChevronRight size={18} />
                 </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
