import { Header } from "@/components/header";
import { Outlet } from "react-router-dom";

export function AdminLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}
