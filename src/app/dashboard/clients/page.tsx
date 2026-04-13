"use client";

import { useState } from "react";
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  Download,
  ArrowUpDown,
  UserPlus,
  Building2,
  Phone,
  Mail,
  MapPin
} from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const CLIENTS_DATA = [
  { id: 1, name: "Construtora Horizonte", document: "12.345.678/0001-90", type: "CNPJ", email: "contato@horizonte.com", city: "São Paulo", state: "SP", status: "Ativo", totalValue: 125000, services: 4 },
  { id: 2, name: "Roberto Silva", document: "123.456.789-00", type: "CPF", email: "roberto@gmail.com", city: "Rio de Janeiro", state: "RJ", status: "Em Análise", totalValue: 12000, services: 1 },
  { id: 3, name: "Shopping Delta", document: "98.765.432/0001-10", type: "CNPJ", email: "financeiro@delta.com", city: "Curitiba", state: "PR", status: "Inativo", totalValue: 85000, services: 2 },
  { id: 4, name: "Engenharia Atlas", document: "45.123.789/0001-55", type: "CNPJ", email: "atlas@eng.br", city: "Belo Horizonte", state: "MG", status: "Ativo", totalValue: 210000, services: 7 },
  { id: 5, name: "Mariana Costa", document: "987.654.321-11", type: "CPF", email: "mariana@uol.com.br", city: "Campinas", state: "SP", status: "Ativo", totalValue: 4500, services: 1 },
];

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [clients, setClients] = useState(CLIENTS_DATA);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    document: "",
    type: "CNPJ",
    email: "",
    city: "",
    state: "",
  });

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simula processamento
    setTimeout(() => {
      const newClient = {
        id: clients.length + 1,
        ...formData,
        status: "Ativo",
        totalValue: 0,
        services: 0
      };
      
      setClients([newClient, ...clients]);
      setIsModalOpen(false);
      setIsSubmitting(false);
      setFormData({ name: "", document: "", type: "CNPJ", email: "", city: "", state: "" });
    }, 1500);
  };

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.document.includes(searchTerm) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in px-2">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-outfit font-bold text-white tracking-tight">Gestão de Clientes</h1>
          <p className="text-muted-foreground mt-1">Gerencie sua carteira de clientes, contratos e faturamento individual.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-brand hover:bg-brand-hover text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-brand/20 active:scale-95"
        >
          <UserPlus size={20} />
          <span>Novo Cliente</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="relative group w-full lg:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-brand transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Pesquisar por nome, documento ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-surface-secondary border border-surface-border rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all"
          />
        </div>
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-surface-secondary border border-surface-border text-sm font-medium text-white hover:bg-surface-border transition-all">
            <Filter size={18} />
            Filtros
          </button>
          <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-surface-secondary border border-surface-border text-sm font-medium text-white hover:bg-surface-border transition-all">
            <Download size={18} />
            Exportar
          </button>
        </div>
      </div>

      <div className="glass-card !p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] border-b border-white/5">
                <th className="px-8 py-5">Cliente / Documento</th>
                <th className="px-6 py-5">Informações</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5">Faturamento Total</th>
                <th className="px-6 py-5">Serviços</th>
                <th className="px-8 py-5 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredClients.map((client) => (
                <tr 
                  key={client.id} 
                  onClick={() => setSelectedClient(client)}
                  className="hover:bg-brand/5 transition-colors cursor-pointer group"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-surface-tertiary border border-surface-border flex items-center justify-center text-brand font-bold">
                        {client.type === "CNPJ" ? <Building2 size={18} /> : client.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-white group-hover:text-brand transition-colors">{client.name}</p>
                        <p className="text-xs text-muted-foreground font-mono mt-0.5">{client.document}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Mail size={12} />
                        {client.email}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin size={12} />
                        {client.city}, {client.state}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className={cn(
                      "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider",
                      client.status === "Ativo" ? "bg-emerald-500/10 text-emerald-500" : 
                      client.status === "Em Análise" ? "bg-amber-500/10 text-amber-500" : 
                      "bg-rose-500/10 text-rose-500"
                    )}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-6 font-mono font-bold text-white">
                    {formatCurrency(client.totalValue)}
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-2">
                       <div className="h-1.5 w-12 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-brand" style={{ width: `${(client.services / 10) * 100}%` }} />
                       </div>
                       <span className="text-xs text-muted-foreground font-bold">{client.services}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 hover:bg-brand/20 hover:text-brand rounded-lg transition-all text-muted-foreground">
                      <MoreHorizontal size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-6 border-t border-white/5 flex items-center justify-between text-sm text-muted-foreground">
          <p>Exibindo <span className="text-white font-bold">{filteredClients.length}</span> de <span className="text-white font-bold">{clients.length}</span> clientes</p>
          <div className="flex items-center gap-2">
             <button className="px-4 py-2 rounded-xl bg-white/5 hover:bg-brand/20 hover:text-brand transition-all disabled:opacity-50" disabled>Anterior</button>
             <button className="px-4 py-2 rounded-xl bg-white/5 hover:bg-brand/20 hover:text-brand transition-all">Próxima</button>
          </div>
        </div>
      </div>

      {/* Modal Novo Cliente */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60]"
               onClick={() => setIsModalOpen(false)}
            />
            <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, y: 20 }}
               className="fixed inset-0 z-[70] flex items-center justify-center p-4"
            >
              <div 
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-2xl bg-surface-secondary border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
              >
                <div className="p-8 border-b border-white/5 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Cadastrar Novo Cliente</h2>
                    <p className="text-sm text-muted-foreground mt-1">Preencha os dados básicos para iniciar a gestão.</p>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/5 rounded-xl transition-all">
                     <Plus size={24} className="rotate-45 text-muted-foreground" />
                  </button>
                </div>

                <form onSubmit={handleAddClient} className="p-8 space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2 col-span-2">
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Nome Completo / Razão Social</label>
                      <input 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-surface-tertiary border border-white/5 rounded-2xl py-3 px-4 text-white focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Documento (CPF/CNPJ)</label>
                      <input 
                        required
                        value={formData.document}
                        onChange={(e) => setFormData({...formData, document: e.target.value})}
                        placeholder="000.000.000-00"
                        className="w-full bg-surface-tertiary border border-white/5 rounded-2xl py-3 px-4 text-white focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Tipo</label>
                      <select 
                        value={formData.type}
                        onChange={(e) => setFormData({...formData, type: e.target.value})}
                        className="w-full bg-surface-tertiary border border-white/5 rounded-2xl py-3 px-4 text-white focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all outline-none"
                      >
                        <option value="CNPJ">CNPJ (Empresa)</option>
                        <option value="CPF">CPF (Pessoa Física)</option>
                      </select>
                    </div>
                    <div className="space-y-2 col-span-2">
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">E-mail para Faturamento</label>
                      <input 
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-surface-tertiary border border-white/5 rounded-2xl py-3 px-4 text-white focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Cidade</label>
                      <input 
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                        className="w-full bg-surface-tertiary border border-white/5 rounded-2xl py-3 px-4 text-white focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Estado (UF)</label>
                      <input 
                        required
                        maxLength={2}
                        value={formData.state}
                        onChange={(e) => setFormData({...formData, state: e.target.value.toUpperCase()})}
                        placeholder="SP"
                        className="w-full bg-surface-tertiary border border-white/5 rounded-2xl py-3 px-4 text-white focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all outline-none"
                      />
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
                        "Confirmar Cadastro"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedClient && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedClient(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-xl bg-surface-secondary border-l border-white/5 shadow-2xl z-50 p-10 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand font-bold text-xl">
                    {selectedClient.type === "CNPJ" ? <Building2 size={24} /> : selectedClient.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedClient.name}</h2>
                    <p className="text-muted-foreground">{selectedClient.document}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedClient(null)} className="p-2 hover:bg-white/5 rounded-xl transition-all">
                   <Plus size={24} className="rotate-45 text-muted-foreground" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-10">
                 <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-black mb-1">Status Geral</p>
                    <p className="text-emerald-500 font-bold">{selectedClient.status}</p>
                 </div>
                 <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-black mb-1">Faturamento Total</p>
                    <p className="text-white font-bold">{formatCurrency(selectedClient.totalValue)}</p>
                 </div>
              </div>

              <div className="space-y-8">
                 <section>
                    <h3 className="text-sm font-black uppercase tracking-widest text-white mb-6 flex items-center gap-2">
                       <Activity size={16} className="text-brand" />
                       Linha do Tempo
                    </h3>
                    <div className="space-y-6 pl-2">
                       {[1, 2, 3].map(i => (
                         <div key={i} className="relative pl-6 border-l border-white/5 py-1">
                            <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-brand" />
                            <p className="text-xs text-muted-foreground">22 de Maio, 2024</p>
                            <p className="text-sm text-white font-medium mt-1">Novo serviço contratado: Reforma Estrutural - Unidade {i}</p>
                         </div>
                       ))}
                    </div>
                 </section>

                 <section>
                    <h3 className="text-sm font-black uppercase tracking-widest text-white mb-6 flex items-center gap-2">
                       <Phone size={16} className="text-brand" />
                       Contatos e Endereço
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                       <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-brand/5 transition-all">
                          <Mail className="text-brand" size={20} />
                          <div>
                             <p className="text-xs text-muted-foreground">E-mail Principal</p>
                             <p className="text-sm text-white font-medium">{selectedClient.email}</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-brand/5 transition-all">
                          <MapPin className="text-brand" size={20} />
                          <div>
                             <p className="text-xs text-muted-foreground">Localização</p>
                             <p className="text-sm text-white font-medium">{selectedClient.city}, {selectedClient.state}</p>
                          </div>
                       </div>
                    </div>
                 </section>
              </div>

              <div className="mt-12 flex gap-4">
                 <button className="flex-1 bg-brand text-white py-4 rounded-2xl font-bold hover:bg-brand-hover transition-all">Editar Cadastro</button>
                 <button className="flex-1 bg-white/5 text-white py-4 rounded-2xl font-bold hover:bg-white/10 transition-all">Ver Contratos</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
