export const DASHBOARD_METRICS = [
  { title: "Clientes Ativos", value: 124, trend: { value: 12, isPositive: true } },
  { title: "Serviços em Andamento", value: 42, trend: { value: 8, isPositive: true } },
  { title: "Serviços Concluídos", value: 186, trend: { value: 24, isPositive: true } },
  { title: "Previsto para Receber (Mês)", value: 48500, isCurrency: true, trend: { value: 5, isPositive: false } },
  { title: "Recebido no Mês", value: 32000, isCurrency: true, trend: { value: 18, isPositive: true } },
  { title: "Valor em Aberto", value: 16500, isCurrency: true, trend: { value: 2, isPositive: false } },
  { title: "Taxa de Conversão", value: "32%", trend: { value: 4, isPositive: true } },
  { title: "Ticket Médio", value: 12500, isCurrency: true, trend: { value: 7, isPositive: true } },
  { title: "Receita Projetada (30d)", value: 125000, isCurrency: true },
  { title: "Receita Projetada (90d)", value: 480000, isCurrency: true },
];

export const RECENT_CLIENTS = [
  { id: 1, name: "Construtora Horizonte", type: "CNPJ", status: "Ativo", value: 125000, date: "2024-06-15" },
  { id: 2, name: "Roberto Silva", type: "CPF", status: "Em Análise", value: 12000, date: "2024-06-18" },
  { id: 3, name: "Shopping Delta", type: "CNPJ", status: "Inativo", value: 85000, date: "2024-05-10" },
  { id: 4, name: "Engenharia Atlas", type: "CNPJ", status: "Ativo", value: 210000, date: "2024-06-01" },
];

export const UPCOMING_PAYMENTS = [
  { id: 1, client: "Construtora Horizonte", value: 12500, dueDate: "2024-06-25", status: "Previsto" },
  { id: 2, client: "Roberto Silva", value: 4000, dueDate: "2024-06-28", status: "Pendente" },
  { id: 3, client: "Engenharia Atlas", value: 15000, dueDate: "2024-06-30", status: "Vencido" },
];
