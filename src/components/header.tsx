import { Link, useLocation } from "react-router-dom";
import { ModeToggle } from "./theme/mode-toggle";

export function Header() {
  const { pathname } = useLocation();

  return (
    <nav className="flex justify-between border-b border-solid px-8 py-4">
      {/* ESQUERDA */}
      <div className="flex items-center gap-10">
        <Link
          to={"/user"}
          className={
            pathname === "/user"
              ? "font-bold text-primary"
              : "text-muted-foreground"
          }
        >
          Usuário
        </Link>
        <Link
          to={"/restaurant"}
          className={
            pathname === "/restaurant"
              ? "font-bold text-primary"
              : "text-muted-foreground"
          }
        >
          Restaurante
        </Link>
        <Link
          to={"/menu"}
          className={
            pathname === "/menu"
              ? "font-bold text-primary"
              : "text-muted-foreground"
          }
        >
          Cardápio
        </Link>
        <Link
          to={"/orders"}
          className={
            pathname === "/orders"
              ? "font-bold text-primary"
              : "text-muted-foreground"
          }
        >
          Pedidos
        </Link>
      </div>
      {/* DIREITA */}
      <div className="flex items-center gap-2 justify-center w-max-[250px] p-1 ">
        {/* <AccountMenu /> */}
        <ModeToggle />
      </div>
    </nav>
  );
}
