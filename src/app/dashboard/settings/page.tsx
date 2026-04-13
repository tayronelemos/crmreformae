"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  LucideUser, 
  LucideBell, 
  LucideShield, 
  LucideDatabase, 
  LucideLayout, 
  LucideMail,
  LucideSave,
  LucideLogOut,
  LucideChevronRight,
  LucideZap
} from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20">
      {/* Header */}
      <div>
        <h1 className="text-[32px] font-bold text-[#1A1D2F] font-outfit tracking-tight">System Settings</h1>
        <p className="text-[#64748B] font-medium text-sm mt-1">Configure o ecossistema Reformaê para sua escala comercial.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Elite Sidebar Nav */}
        <div className="lg:col-span-3 space-y-2">
          {[
            { label: "Account Profile", icon: LucideUser, active: true },
            { label: "Notification Desk", icon: LucideBell },
            { label: "Security & Access", icon: LucideShield },
            { label: "Data Integrations", icon: LucideDatabase },
            { label: "Interface Layout", icon: LucideLayout },
          ].map((item, i) => (
            <button 
              key={i}
              className={`w-full flex items-center justify-between px-5 py-3.5 rounded-2xl text-[13px] font-bold transition-all ${item.active ? 'bg-[#1A1D2F] text-white shadow-xl shadow-zinc-200' : 'text-[#64748B] hover:text-[#1A1D2F] hover:bg-white'}`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} /> {item.label}
              </div>
              {item.active && <LucideChevronRight size={14} className="opacity-50" />}
            </button>
          ))}
          
          <div className="pt-8 px-5">
            <button className="flex items-center gap-3 text-xs font-bold text-rose-500 hover:text-rose-600 transition-all uppercase tracking-widest">
               <LucideLogOut size={16} /> Logout System
            </button>
          </div>
        </div>

        {/* Elite Content Area */}
        <div className="lg:col-span-9 space-y-8">
           {/* Profile Section */}
           <div className="bg-white rounded-[32px] border border-[#F1F5F9] p-10 shadow-sm relative overflow-hidden">
              <div className="flex items-start justify-between mb-10">
                 <div>
                   <h3 className="text-xl font-bold text-[#1A1D2F] tracking-tight">Perfil de Especialista</h3>
                   <p className="text-sm text-[#94A3B8] font-medium mt-1">Seus dados públicos no ambiente CRM.</p>
                 </div>
                 <div className="w-16 h-16 rounded-[24px] bg-[#E0E7FF] flex items-center justify-center text-[#2E5BFF] font-black text-xl shadow-inner border-2 border-white ring-1 ring-[#F1F5F9]">
                    TL
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-[0.1em] ml-1">Full Identity</label>
                    <input type="text" defaultValue="Tamyres Lemos" className="w-full bg-[#F8FAFC] border border-[#F1F5F9] focus:bg-white focus:border-[#2E5BFF] focus:shadow-sm px-5 py-3.5 rounded-2xl outline-none text-sm font-bold text-[#1A1D2F] transition-all" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-[0.1em] ml-1">Corporate Email</label>
                    <input type="email" defaultValue="contato@reformae.com.br" className="w-full bg-[#F8FAFC] border border-[#F1F5F9] focus:bg-white focus:border-[#2E5BFF] focus:shadow-sm px-5 py-3.5 rounded-2xl outline-none text-sm font-bold text-[#1A1D2F] transition-all" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-[0.1em] ml-1">Current Role</label>
                    <input type="text" defaultValue="Product Director" className="w-full bg-[#F8FAFC] border border-[#F1F5F9] focus:bg-white focus:border-[#2E5BFF] focus:shadow-sm px-5 py-3.5 rounded-2xl outline-none text-sm font-bold text-[#1A1D2F] transition-all" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-[0.1em] ml-1">Business Mobile</label>
                    <input type="text" defaultValue="+55 (83) 99999-9999" className="w-full bg-[#F8FAFC] border border-[#F1F5F9] focus:bg-white focus:border-[#2E5BFF] focus:shadow-sm px-5 py-3.5 rounded-2xl outline-none text-sm font-bold text-[#1A1D2F] transition-all" />
                 </div>
              </div>
           </div>

           {/* Integrations Section */}
           <div className="bg-white rounded-[32px] border border-[#F1F5F9] p-10 shadow-sm">
              <div className="mb-10">
                <h3 className="text-xl font-bold text-[#1A1D2F] tracking-tight">Intelligence Bridges</h3>
                <p className="text-sm text-[#94A3B8] font-medium mt-1">Conecte o Reformaê com suas ferramentas de prospecção.</p>
              </div>

              <div className="space-y-4">
                 <div className="flex items-center justify-between p-6 bg-[#F8FAFC] rounded-[28px] border border-[#F1F5F9] group hover:bg-white hover:border-[#2E5BFF]/30 transition-all cursor-pointer">
                    <div className="flex items-center gap-5">
                       <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-[#2E5BFF]">
                          <LucideDatabase size={24} />
                       </div>
                       <div>
                          <p className="text-sm font-bold text-[#1A1D2F]">Google Places Discovery</p>
                          <p className="text-xs text-[#94A3B8] font-medium">Auto-import de leads locais e nichos.</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-xl border border-emerald-100">
                       <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                       <span className="text-[10px] font-bold uppercase tracking-widest">Active</span>
                    </div>
                 </div>

                 <div className="flex items-center justify-between p-6 bg-[#F8FAFC] rounded-[28px] border border-[#F1F5F9] opacity-70 hover:opacity-100 transition-all cursor-pointer">
                    <div className="flex items-center gap-5">
                       <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-[#1A1D2F]">
                          <LucideZap size={24} />
                       </div>
                       <div>
                          <p className="text-sm font-bold text-[#1A1D2F]">WhatsApp Business Engine</p>
                          <p className="text-xs text-[#94A3B8] font-medium">Automação de primeira abordagem.</p>
                       </div>
                    </div>
                    <button className="text-[10px] font-bold text-[#2E5BFF] hover:bg-white px-4 py-2 border border-[#2E5BFF]/20 rounded-xl uppercase tracking-widest transition-all">Connect Bridge</button>
                 </div>
              </div>
           </div>

           <div className="flex justify-end gap-4 pt-4">
              <button className="px-8 py-4 bg-white border border-[#F1F5F9] text-[#1A1D2F] font-bold text-xs uppercase tracking-widest rounded-2xl hover:shadow-md transition-all">
                Discard
              </button>
              <button className="flex items-center gap-2 px-10 py-4 bg-[#2E5BFF] text-white font-bold text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-500/20 hover:bg-blue-600 transition-all active:scale-95">
                 <LucideSave size={18} /> Save Settings
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
