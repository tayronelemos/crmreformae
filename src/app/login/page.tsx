"use client";

import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, ShieldCheck, Zap, Globe } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col md:flex-row overflow-hidden">
      {/* Left Side: Branding & Value Proposition */}
      <div className="hidden md:flex flex-1 relative bg-surface-secondary border-r border-white/5 p-20 flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand/30 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/20 rounded-full blur-[120px]" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 z-10"
        >
          <div className="w-12 h-12 bg-brand rounded-2xl flex items-center justify-center shadow-lg shadow-brand/20">
             <div className="w-6 h-6 border-4 border-white rounded-md" />
          </div>
          <span className="text-3xl font-outfit font-black tracking-tight text-white">Reformaê</span>
        </motion.div>

        <div className="z-10 space-y-12">
          <motion.h1 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl font-outfit font-black text-white leading-[1.1] tracking-tighter"
          >
            A inteligência por trás da sua <span className="text-brand">operação comercial.</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 gap-8 max-w-md"
          >
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="text-brand" size={24} />
              </div>
              <div>
                <h3 className="text-white font-bold mb-1">Segurança Enterprise</h3>
                <p className="text-sm text-muted-foreground">Seus dados operacionais e financeiros protegidos com criptografia de ponta.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                <Zap className="text-brand" size={24} />
              </div>
              <div>
                <h3 className="text-white font-bold mb-1">Previsibilidade Total</h3>
                <p className="text-sm text-muted-foreground">Enxergue meses à frente do seu caixa com inteligência analítica em tempo real.</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="z-10 flex items-center gap-6 text-sm text-muted-foreground font-medium"
        >
          <div className="flex items-center gap-2">
            <Globe size={16} />
            Versão 2.4.0
          </div>
          <span>&copy; 2024 Reformaê S.A</span>
        </motion.div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        <div className="md:hidden absolute top-10 left-10">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
                 <div className="w-4 h-4 border-2 border-white rounded-sm" />
              </div>
              <span className="text-xl font-outfit font-black text-white">Reformaê</span>
           </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md space-y-10"
        >
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-outfit font-bold text-white tracking-tight">Login Administrativo</h2>
            <p className="text-muted-foreground mt-3">Acesse sua conta para gerenciar clientes e parcerias.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">E-mail Corporativo</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-brand transition-colors" size={20} />
                  <input 
                    type="email" 
                    required
                    placeholder="exemplo@reformae.com.br"
                    className="w-full bg-surface-secondary border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Senha de Acesso</label>
                  <Link href="#" className="text-[10px] font-bold text-brand hover:underline">Esqueceu a senha?</Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-brand transition-colors" size={20} />
                  <input 
                    type="password" 
                    required
                    placeholder="••••••••••••"
                    className="w-full bg-surface-secondary border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all"
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-brand hover:bg-brand-hover text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-xl shadow-brand/20 active:scale-95 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Entrar no Sistema</span>
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="pt-10 border-t border-white/5 text-center">
            <p className="text-sm text-muted-foreground">
              Ainda não tem acesso? <Link href="#" className="text-brand font-bold hover:underline">Solicite ao seu gestor</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
