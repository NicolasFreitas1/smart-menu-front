import { Link, useLocation } from "react-router-dom";
import { ModeToggle } from "./theme/mode-toggle";
import { AccountMenu } from "./account-menu";

export function Header() {
  const { pathname } = useLocation();

  return (
    <nav className="flex justify-between border-b border-solid px-8 py-4">
      {/* ESQUERDA */}
      <div className="flex items-center gap-10">
        <Link
          to={"/admin/users"}
          className={
            pathname === "/admin/users"
              ? "font-bold text-primary"
              : "text-muted-foreground"
          }
        >
          Usuário
        </Link>
        <Link
          to={"/admin/menu"}
          className={
            pathname === "/admin/menu"
              ? "font-bold text-primary"
              : "text-muted-foreground"
          }
        >
          Cardápio
        </Link>
        <Link
          to={"/admin/orders"}
          className={
            pathname === "/admin/orders"
              ? "font-bold text-primary"
              : "text-muted-foreground"
          }
        >
          Pedidos
        </Link>
      </div>
      {/* DIREITA */}
      <div className="flex items-center gap-2 justify-center w-max-[250px] p-1 ">
        <AccountMenu />
        <ModeToggle />
      </div>
    </nav>
  );
}
