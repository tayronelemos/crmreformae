"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  LucideCalendar, 
  LucideClock, 
  LucideCheckCircle2, 
  LucidePhone, 
  LucideVideo, 
  LucideMail, 
  LucidePlus,
  LucideCalendarDays,
  LucideChevronLeft,
  LucideChevronRight,
  LucideAlertCircle
} from "lucide-react";

const TASKS = [
  { id: 1, title: "Ligar para Imobiliária Prime", lead: "João Silva", time: "09:00", priority: "Alta", type: "Call", status: "Pendente" },
  { id: 2, title: "Enviar Proposta - Vidraçaria Central", lead: "Pedro Santos", time: "11:30", priority: "Alta", type: "Mail", status: "Atrasado" },
  { id: 3, title: "Reunião de Expansão PE", lead: "Maria Oliveira", time: "14:00", priority: "Média", type: "Meeting", status: "Pendente" },
  { id: 4, title: "Follow-up Marmoraria Elite", lead: "Ana Costa", time: "16:00", priority: "Baixa", type: "Call", status: "Concluído" },
];

export default function AgendaPage() {
  const [selectedDate, setSelectedDate] = useState("11 de Abril, 2026");

  return (
    <div className="space-y-8 font-inter">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-secondary font-outfit text-left">Agenda Comercial</h1>
          <p className="text-muted-foreground text-sm mt-1">Gerencie seus compromissos e nunca perca um follow-up.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:shadow-xl transition-all">
          <LucidePlus size={18} /> Novo Compromisso
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Calendar Sidebar */}
        <div className="space-y-6">
          <div className="premium-card p-6">
            <div className="flex items-center justify-between mb-6">
               <h3 className="font-bold text-secondary text-sm">Abril 2026</h3>
               <div className="flex items-center gap-1">
                  <button className="p-1.5 hover:bg-muted rounded-lg transition-colors"><LucideChevronLeft size={16} /></button>
                  <button className="p-1.5 hover:bg-muted rounded-lg transition-colors"><LucideChevronRight size={16} /></button>
               </div>
            </div>
            {/* Mock Calendar Grid */}
            <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-bold text-muted-foreground mb-4">
               {["D", "S", "T", "Q", "Q", "S", "S"].map(d => <div key={d}>{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1">
               {Array.from({ length: 30 }).map((_, i) => (
                 <div 
                  key={i} 
                  className={`
                    aspect-square flex items-center justify-center text-xs font-bold rounded-lg cursor-pointer transition-all
                    ${i + 1 === 11 ? 'bg-primary text-white shadow-lg' : 'hover:bg-muted text-secondary'}
                  `}
                 >
                   {i + 1}
                 </div>
               ))}
            </div>
          </div>

          <div className="premium-card p-6 bg-rose-50 border-rose-100">
             <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-500">
                   <LucideAlertCircle size={24} />
                </div>
                <div>
                   <h4 className="text-sm font-bold text-rose-900 leading-none uppercase tracking-tighter">Tarefa Urgente</h4>
                   <p className="text-[11px] text-rose-700/70 mt-1 font-bold">Atrasos reduzem conversão</p>
                </div>
             </div>
             <p className="text-xs text-rose-800 leading-relaxed font-medium">
                Contatos que não recebem retorno em menos de 24h têm <span className="font-bold">40% menos</span> chance de fechamento.
             </p>
          </div>
        </div>

        {/* Tasks List */}
        <div className="xl:col-span-2 space-y-6">
          <div className="flex items-center gap-4">
             <h2 className="text-xl font-bold text-secondary font-outfit">{selectedDate}</h2>
             <span className="px-3 py-1 bg-muted rounded-full text-[10px] font-bold text-muted-foreground uppercase tracking-wider">4 Tarefas</span>
          </div>

          <div className="space-y-4">
            {TASKS.map((task) => (
              <motion.div 
                key={task.id}
                whileHover={{ scale: 1.005 }}
                className={`
                  premium-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-l-4
                  ${task.status === 'Atrasado' ? 'border-l-rose-500' : task.status === 'Concluído' ? 'border-l-emerald-500' : 'border-l-blue-500'}
                `}
              >
                <div className="flex items-start gap-5 text-left">
                   <div className="flex flex-col items-center">
                      <span className="text-lg font-bold text-secondary font-outfit leading-none">{task.time}</span>
                      <span className="text-[10px] uppercase font-bold text-muted-foreground mt-1">Hoje</span>
                   </div>
                   <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className={`text-base font-bold transition-all ${task.status === 'Concluído' ? 'text-muted-foreground line-through' : 'text-secondary'}`}>
                          {task.title}
                        </h4>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${task.priority === 'Alta' ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-600'}`}>
                          {task.priority}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
                         Lead: <span className="text-secondary font-bold hover:text-primary cursor-pointer transition-colors">{task.lead}</span>
                      </p>
                   </div>
                </div>

                <div className="flex items-center gap-2">
                   <div className="flex items-center gap-1">
                      {task.type === 'Call' && <button className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors"><LucidePhone size={18} /></button>}
                      {task.type === 'Meeting' && <button className="p-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-colors"><LucideVideo size={18} /></button>}
                      {task.type === 'Mail' && <button className="p-2 bg-purple-50 text-purple-600 rounded-xl hover:bg-purple-100 transition-colors"><LucideMail size={18} /></button>}
                   </div>
                   
                   <div className="h-8 w-[1px] bg-border mx-2 hidden md:block" />
                   
                   <button 
                    className={`
                      flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all
                      ${task.status === 'Concluído' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-secondary text-white hover:bg-secondary/90 shadow-md shadow-secondary/10'}
                    `}
                   >
                     {task.status === 'Concluído' ? (
                       <> <LucideCheckCircle2 size={18} /> Concluída </>
                     ) : (
                       "Concluir"
                     )}
                   </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
