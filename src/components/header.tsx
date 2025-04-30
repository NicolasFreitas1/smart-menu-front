import { Link, useLocation } from "react-router-dom";
import { ModeToggle } from "./theme/mode-toggle";

export function Header() {
  const { pathname } = useLocation();

  return (
    <nav className="flex justify-between border-b border-solid px-8 py-4">
      {/* ESQUERDA */}
      <div className="flex items-center gap-10">
        <Link
          to={"/gyms"}
          className={
            pathname === "/gyms"
              ? "font-bold text-primary"
              : "text-muted-foreground"
          }
        >
          Academias
        </Link>
        <Link
          to={"/check-ins"}
          className={
            pathname === "/check-ins"
              ? "font-bold text-primary"
              : "text-muted-foreground"
          }
        >
          Histórico de Check-ins
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
