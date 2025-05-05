import { PublicButtonTabs } from "@/components/public-button-tabs";
import { CartProvider } from "@/context/CartContext";
import { RestaurantProvider } from "@/context/RestaurantContext";
import { Outlet, NavLink } from "react-router-dom";

export function PublicLayout() {
  return (
    <RestaurantProvider>
      <CartProvider>
        <div className="flex min-h-screen flex-col">
          {/* Header para telas maiores (desktop/tablet) */}
          <header className="hidden md:flex items-center justify-between px-6 py-4 bg-white shadow">
            <h1 className="text-lg font-bold">Meu Restaurante</h1>
            <nav className="flex space-x-4">
              <NavLink to="/menu" className="text-sm font-medium">
                Cardápio
              </NavLink>
              <NavLink to="/sugestao" className="text-sm font-medium">
                Sugestão
              </NavLink>
              <NavLink to="/pedido" className="text-sm font-medium">
                Meu Pedido
              </NavLink>
            </nav>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 md:px-8">
            <Outlet />
          </main>

          {/* Bottom Navigation para mobile */}
          <PublicButtonTabs />
        </div>
      </CartProvider>
    </RestaurantProvider>
  );
}
