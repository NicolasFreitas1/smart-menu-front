import { PublicButtonTabs } from "@/components/public-button-tabs";
import { PublicHeader } from "@/components/public-header";
import { CartProvider } from "@/context/CartContext";
import { RestaurantProvider } from "@/context/RestaurantContext";
import { Outlet } from "react-router-dom";

export function PublicLayout() {
  return (
    <RestaurantProvider>
      <CartProvider>
        <div className="flex min-h-screen flex-col">
          {/* Header para telas maiores (desktop/tablet) */}
          <PublicHeader />

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
