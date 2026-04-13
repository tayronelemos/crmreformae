"use client";

import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

import { 
  Users, 
  Component, 
  CheckCircle2, 
  ArrowUpRight, 
  TrendingUp, 
  DollarSign, 
  Activity,
  Filter,
  Download
} from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { DASHBOARD_METRICS, RECENT_CLIENTS, UPCOMING_PAYMENTS } from "@/constants/mockData";
import { formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const chartOptions: any = {
    chart: {
      type: 'area',
      toolbar: { show: false },
      sparkline: { enabled: false },
      background: 'transparent',
    },
    colors: ['#2C47DD', '#2ecc71'],
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 2 },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [20, 100]
      }
    },
    grid: {
      borderColor: '#232933',
      strokeDashArray: 4,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: false } },
    },
    xaxis: {
      categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: '#64748b', fontSize: '12px' } }
    },
    yaxis: {
      labels: { 
        style: { colors: '#64748b', fontSize: '12px' },
        formatter: (val: number) => `R$ ${val/1000}k`
      }
    },
    tooltip: { theme: 'dark' },
    legend: { show: false }
  };

  const chartSeries = [
    { name: 'Receita Prevista', data: [30000, 40000, 35000, 50000, 49000, 60000] },
    { name: 'Receita Recebida', data: [28000, 32000, 31000, 42000, 45000, 52000] }
  ];

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-outfit font-bold text-white tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-1">Bem-vindo ao centro de inteligência operacional Reformaê.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-secondary border border-surface-border text-sm font-medium text-white hover:bg-surface-border transition-all">
            <Filter size={18} />
            Filtrar Período
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-secondary border border-surface-border text-sm font-medium text-white hover:bg-surface-border transition-all">
            <Download size={18} />
            Exportar dados
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {DASHBOARD_METRICS.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            icon={metric.title.includes("Clientes") ? Users : metric.title.includes("Serviços") ? Component : DollarSign}
            trend={metric.trend}
            isCurrency={metric.isCurrency}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-white">Performance Financeira</h3>
              <p className="text-sm text-muted-foreground">Comparativo de receita prevista vs. realizada</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-brand" />
                <span className="text-xs text-muted-foreground">Projetado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-xs text-muted-foreground">Recebido</span>
              </div>
            </div>
          </div>
          <div className="h-[350px]">
            <Chart options={chartOptions} series={chartSeries} type="area" height="100%" />
          </div>
        </div>

        <div className="glass-card">
          <h3 className="text-lg font-bold text-white mb-6">Próximos Recebimentos</h3>
          <div className="space-y-4">
            {UPCOMING_PAYMENTS.map((payment) => (
              <div key={payment.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-brand/20 transition-all group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-white group-hover:text-brand transition-colors">{payment.client}</span>
                  <span className="text-sm font-black text-white">{formatCurrency(payment.value)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Vencimento: {payment.dueDate}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                    payment.status === "Vencido" ? "bg-rose-500/10 text-rose-500" : "bg-emerald-500/10 text-emerald-500"
                  }`}>
                    {payment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 rounded-xl bg-surface-tertiary text-sm font-bold text-muted-foreground hover:text-white transition-all border border-surface-border">
            Ver Fluxo de Caixa Completo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="glass-card">
          <h3 className="text-lg font-bold text-white mb-6">Status dos Serviços</h3>
          <div className="h-[250px] flex items-center justify-center">
             <Chart 
              options={{
                chart: { type: 'donut' },
                colors: ['#2C47DD', '#2ecc71', '#f59e0b', '#ef4444'],
                labels: ['Em Andamento', 'Concluído', 'Aguardando', 'Atrasado'],
                stroke: { show: false },
                legend: { position: 'bottom', labels: { colors: '#64748b' } },
                plotOptions: { pie: { donut: { size: '75%' } } }
              }} 
              series={[42, 186, 12, 5]} 
              type="donut" 
              height="100%" 
            />
          </div>
        </div>

        <div className="lg:col-span-2 glass-card">
          <h3 className="text-lg font-bold text-white mb-6">Clientes Recentes</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs font-bold text-muted-foreground uppercase tracking-widest border-b border-white/5">
                  <th className="pb-4">Cliente / Empresa</th>
                  <th className="pb-4">Tipo</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4">Valor Gerado</th>
                  <th className="pb-4 text-right">Cadastrado em</th>
                </tr>
              </thead>
              <tbody>
                {RECENT_CLIENTS.map((client) => (
                  <tr key={client.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                    <td className="py-4 font-bold text-white">{client.name}</td>
                    <td className="py-4 text-sm text-muted-foreground">{client.type}</td>
                    <td className="py-4 text-sm">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                        client.status === "Ativo" ? "text-emerald-500" : "text-amber-500"
                      }`}>
                        {client.status}
                      </span>
                    </td>
                    <td className="py-4 font-mono text-sm text-white">{formatCurrency(client.value)}</td>
                    <td className="py-4 text-sm text-muted-foreground text-right">{client.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
