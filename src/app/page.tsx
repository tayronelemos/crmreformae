import { redirect } from "next/navigation";

export default function Home() {
  // Redireciona automaticamente para o login como ponto de entrada
  redirect("/login");
}
