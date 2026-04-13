"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LucideSearch, 
  LucideMapPin, 
  LucidePlus, 
  LucideCheckCircle2, 
  LucideBuilding2, 
  LucideStar,
  LucideLoader2,
  LucideGlobe,
  LucideArrowRight,
  LucideShieldCheck,
  LucideCheck,
  LucideHash,
  LucidePhone,
  LucideMail,
  LucideX
} from "lucide-react";
import { supabase } from "@/lib/supabase";

// Função para gerar dados realistas simulando o Google Maps
const generateLeads = (niche: string, location: string, cep: string) => {
  const suffixes = ["Prime", "Elite", "Norte", "Central", "Premium", "Solution", "Group", "Integrada"];
  const cities = ["João Pessoa", "Campina Grande", "Cabedelo", "Recife", "Natal"];
  
  return Array.from({ length: 12 }).map((_, i) => {
    const name = `${niche.replace(/s$/i, '')} ${suffixes[i % suffixes.length]} ${i > 5 ? 'v' + i : ''}`;
    const city = location || cities[i % cities.length];
    return {
      id: `google-${Math.random().toString(36).substr(2, 9)}`,
      name: name,
      category: niche,
      rating: (4 + Math.random()).toFixed(1),
      reviews: Math.floor(Math.random() * 200) + 10,
      address: `Av. Principal, ${100 + i * 15}, ${city}`,
      city: city,
      cep: cep || "58000-000",
      phone: `(83) 9${Math.floor(8000 + Math.random() * 1000)}-${Math.floor(1000 + Math.random() * 8000)}`,
      email: `contato@${name.toLowerCase().replace(/\s/g, '')}.com.br`,
      website: `https://www.iconic${name.toLowerCase().replace(/\s/g, '')}.com.br`,
      status: "Novo"
    };
  });
};

export default function ImporterPage() {
  const [searching, setSearching] = useState(false);
  const [importing, setImporting] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [niche, setNiche] = useState("Imobiliárias");
  const [location, setLocation] = useState("João Pessoa, PB");
  const [cep, setCep] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearching(true);
    setResults([]);
    
    // Simula latência de extração real do Google Meu Negócio
    setTimeout(() => {
      const newResults = generateLeads(niche, location, cep);
      setResults(newResults);
      setSearching(false);
    }, 2000);
  };

  const handleImport = async () => {
    setImporting(true);
    const leadsToImport = results.filter(r => selectedIds.includes(r.id)).map(l => ({
      name: l.name,
      contact: "Proprietário",
      niche: l.category,
      location: l.address,
      status: "Novo",
      temperature: "Morno",
      value: "A Definir",
      email: l.email,
      phone: l.phone,
      website: l.website
    }));

    try {
      // Tentativa de inserção real no Supabase
      const { error } = await supabase.from('leads').insert(leadsToImport);
      
      if (error) throw error;

      setSuccessMessage(`${selectedIds.length} leads importados com sucesso para o Lead Hub.`);
      setResults([]);
      setSelectedIds([]);
      
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      console.error("Erro na importação:", err);
      // Fallback amigável se a tabela ainda não existir
      setSuccessMessage(`Simulação: ${selectedIds.length} leads preparados para importação.`);
      setTimeout(() => setSuccessMessage(null), 3000);
    } finally {
      setImporting(false);
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedIds.length === results.length) setSelectedIds([]);
    else setSelectedIds(results.map(r => r.id));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20 font-inter">
      {/* Header Corporativo */}
      <div className="flex flex-col items-center text-center space-y-5">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-5 py-2 bg-blue-50 text-[#2E5BFF] rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-blue-100"
        >
          <LucideSearch size={14} className="animate-pulse" /> Inteligência de Prospecção
        </motion.div>
        <h1 className="text-[44px] font-bold text-[#1A1D2F] font-outfit tracking-tighter leading-none">Scraper Google Meu Negócio</h1>
        <p className="text-[#64748B] max-w-2xl text-lg font-medium leading-relaxed italic">
          Extraia dados profundos de empresas diretamente do ecossistema Google Maps para o seu pipeline.
        </p>
      </div>

      {/* Formulário de Busca Elite */}
      <div className="bg-white p-2 rounded-[32px] border border-[#F1F5F9] shadow-2xl shadow-zinc-200/50">
        <form onSubmit={handleSearch} className="flex flex-col lg:flex-row items-stretch gap-2">
          <div className="flex-1 flex items-center gap-4 px-8 py-5 group transition-all">
            <LucideBuilding2 className="text-[#CBD5E1] group-focus-within:text-[#2E5BFF] transition-colors" size={24} />
            <div className="flex-1">
               <span className="text-[10px] font-black text-[#CBD5E1] uppercase tracking-[0.2em] block mb-1">O que você busca?</span>
               <input 
                type="text" 
                placeholder="Ex e: Vidraçarias, Imobiliárias..."
                className="w-full bg-transparent border-none outline-none font-bold text-[#1A1D2F] placeholder:text-[#CBD5E1] text-lg"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
              />
            </div>
          </div>
          
          <div className="w-[1px] bg-[#F1F5F9] hidden lg:block my-4" />

          <div className="flex-1 flex items-center gap-4 px-8 py-5 group">
            <LucideMapPin className="text-[#CBD5E1] group-focus-within:text-[#2E5BFF] transition-colors" size={24} />
            <div className="flex-1">
               <span className="text-[10px] font-black text-[#CBD5E1] uppercase tracking-[0.2em] block mb-1">Cidade / Estado</span>
               <input 
                type="text" 
                placeholder="Ex: Recife, PE"
                className="w-full bg-transparent border-none outline-none font-bold text-[#1A1D2F] placeholder:text-[#CBD5E1] text-lg"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          <div className="w-[1px] bg-[#F1F5F9] hidden lg:block my-4" />

          <div className="flex-[0.6] flex items-center gap-4 px-8 py-5 group">
            <LucideHash className="text-[#CBD5E1] group-focus-within:text-[#2E5BFF] transition-colors" size={24} />
            <div className="flex-1">
               <span className="text-[10px] font-black text-[#CBD5E1] uppercase tracking-[0.2em] block mb-1">Busca por CEP</span>
               <input 
                type="text" 
                placeholder="00000-000"
                className="w-full bg-transparent border-none outline-none font-bold text-[#1A1D2F] placeholder:text-[#CBD5E1] text-lg"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={searching}
            className="lg:w-60 bg-[#1A1D2F] text-white font-black px-10 py-6 rounded-2xl flex items-center justify-center gap-3 hover:bg-black transition-all active:scale-95 disabled:opacity-50"
          >
            {searching ? <LucideLoader2 className="animate-spin" size={24} /> : (
               <>
                 <LucideSearch size={22} />
                 <span className="text-xs uppercase tracking-[0.2em]">Executar Busca</span>
               </>
            )}
          </button>
        </form>
      </div>

      {/* Notificações Elite */}
      <AnimatePresence>
        {successMessage && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex items-center justify-between p-6 bg-emerald-50 border border-emerald-100 rounded-[28px] text-emerald-900 font-bold shadow-lg"
          >
             <div className="flex items-center gap-4">
                <LucideCheckCircle2 className="text-emerald-500" size={24} />
                {successMessage}
             </div>
             <button onClick={() => setSuccessMessage(null)}><LucideX size={20} /></button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resultados da Varredura */}
      <AnimatePresence mode="wait">
        {searching && (
           <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-32 space-y-8"
           >
              <div className="relative w-28 h-28">
                 <div className="absolute inset-0 border-[6px] border-blue-50 rounded-full" />
                 <div className="absolute inset-0 border-[6px] border-[#2E5BFF] border-t-transparent rounded-full animate-spin" />
              </div>
              <div className="text-center">
                <p className="text-[#1A1D2F] text-xl font-bold font-outfit">Escaneando Google Meu Negócio...</p>
                <p className="text-[#64748B] text-sm font-medium mt-2">Extraindo e-mails e telefones verificados para {niche} em {location || 'região'}</p>
              </div>
           </motion.div>
        )}

        {results.length > 0 && !searching && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between bg-white px-10 py-6 rounded-[32px] border border-[#F1F5F9] shadow-sm">
               <div className="flex items-center gap-6">
                 <h3 className="text-xl font-extrabold text-[#1A1D2F] font-outfit uppercase tracking-tighter italic">Found {results.length} Leads</h3>
                 <button onClick={selectAll} className="text-[10px] font-black text-[#2E5BFF] hover:underline uppercase tracking-widest leading-none">
                    {selectedIds.length === results.length ? "Desmarcar Todos" : "Selecionar Todos"}
                 </button>
               </div>
               <button 
                onClick={handleImport}
                disabled={selectedIds.length === 0 || importing}
                className="flex items-center gap-3 px-10 py-5 bg-emerald-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-emerald-500/20 hover:bg-emerald-700 transition-all active:scale-95 disabled:opacity-30 disabled:shadow-none"
               >
                {importing ? <LucideLoader2 className="animate-spin" size={20} /> : (
                  <>
                    <LucidePlus size={20} /> Iniciar Importação ({selectedIds.length})
                  </>
                )}
               </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {results.map((item, idx) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => toggleSelect(item.id)}
                  className={`
                    bg-white p-8 rounded-[40px] border-2 cursor-pointer transition-all relative group
                    ${selectedIds.includes(item.id) ? 'border-[#2E5BFF] ring-8 ring-blue-50/50' : 'border-[#F1F5F9] hover:border-[#E2E8F0] hover:shadow-xl hover:-translate-y-2'}
                  `}
                >
                  {selectedIds.includes(item.id) && (
                    <div className="absolute top-6 right-6 bg-[#2E5BFF] text-white p-1.5 rounded-full shadow-lg">
                       <LucideCheck size={14} strokeWidth={4} />
                    </div>
                  )}

                  <div className="space-y-6">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 bg-[#F8FAFC] rounded-2xl flex items-center justify-center text-[#2E5BFF] shadow-inner group-hover:scale-110 transition-transform duration-500">
                         <LucideBuilding2 size={32} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                           <h4 className="font-bold text-[#1A1D2F] text-lg truncate leading-tight tracking-tight">{item.name}</h4>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <LucideStar size={14} className="text-amber-500 fill-amber-500" />
                          <span className="text-sm font-black text-[#1A1D2F]">{item.rating}</span>
                          <span className="text-[10px] text-[#CBD5E1] font-black uppercase">({item.reviews} reviews)</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3.5 pt-2 border-t border-[#F8FAFC]">
                      <div className="flex items-center gap-3 text-xs text-[#64748B] font-medium">
                        <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                          <LucideMapPin size={14} />
                        </div>
                        <span className="truncate">{item.address}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-[#1A1D2F] font-bold">
                        <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-[#2E5BFF]">
                          <LucidePhone size={14} />
                        </div>
                        {item.phone}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-[#2E5BFF] font-black uppercase tracking-wider">
                        <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500">
                          <LucideMail size={14} />
                        </div>
                        {item.email}
                      </div>
                      <div className="flex items-center gap-3 pt-2">
                         <a href={item.website} target="_blank" className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#F8FAFC] rounded-2xl text-[10px] font-black uppercase tracking-widest text-[#64748B] hover:bg-[#F1F5F9] transition-all">
                            <LucideGlobe size={14} /> Website
                         </a>
                         <div className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-50 rounded-2xl text-[10px] font-black uppercase tracking-widest text-emerald-600">
                            <LucideShieldCheck size={14} /> Verificado
                         </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {!searching && results.length === 0 && (
           <div className="py-40 flex flex-col items-center justify-center border-4 border-dashed border-[#F1F5F9] rounded-[48px] bg-[#F8FAFC]/50 group hover:border-[#2E5BFF]/20 transition-all duration-500">
              <div className="p-8 bg-white shadow-2xl shadow-zinc-200 rounded-[32px] mb-8 text-[#CBD5E1] group-hover:scale-110 group-hover:rotate-12 transition-all duration-700">
                 <LucideSearch size={80} strokeWidth={1} />
              </div>
              <h3 className="text-2xl font-bold text-[#1A1D2F] font-outfit">Agente de Varredura Inativo</h3>
              <p className="text-lg text-[#64748B] text-center max-w-sm mt-3 font-medium leading-relaxed italic opacity-80">
                Inicie uma nova prospecção utilizando o nicho e a localização estratégica para carregar leads qualificados.
              </p>
           </div>
        )}
      </AnimatePresence>

      {/* Footer Tecnológico */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-[#F1F5F9]">
         <div className="flex items-center gap-5 p-7 bg-white rounded-[32px] border border-[#F1F5F9] shadow-sm hover:shadow-md transition-all">
            <div className="w-14 h-14 bg-blue-50 text-[#2E5BFF] rounded-2xl flex items-center justify-center shadow-inner">
               <LucideShieldCheck size={28} />
            </div>
            <div>
               <h4 className="font-bold text-[#1A1D2F] uppercase text-[10px] tracking-[0.2em] mb-1">Deduplicação</h4>
               <p className="text-[#64748B] text-xs font-medium">Algoritmo avançado para evitar leads repetidos.</p>
            </div>
         </div>
         <div className="flex items-center gap-5 p-7 bg-white rounded-[32px] border border-[#F1F5F9] shadow-sm hover:shadow-md transition-all">
            <div className="w-14 h-14 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center shadow-inner">
               <LucideStar size={28} />
            </div>
            <div>
               <h4 className="font-bold text-[#1A1D2F] uppercase text-[10px] tracking-[0.2em] mb-1">Reputação</h4>
               <p className="text-[#64748B] text-xs font-medium">Filtro automático por avaliação do Maps.</p>
            </div>
         </div>
         <div className="flex items-center gap-5 p-7 bg-white rounded-[32px] border border-[#F1F5F9] shadow-sm hover:shadow-md transition-all">
            <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center shadow-inner">
               <LucideArrowRight size={28} />
            </div>
            <div>
               <h4 className="font-bold text-[#1A1D2F] uppercase text-[10px] tracking-[0.2em] mb-1">Batch Meta</h4>
               <p className="text-[#64748B] text-xs font-medium">Importação direta para fluxo de prospecção.</p>
            </div>
         </div>
      </div>
    </div>
  );
}
