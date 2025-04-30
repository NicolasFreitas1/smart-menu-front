import { ModeToggle } from "@/components/theme/mode-toggle";
import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="min-h-screen antialiased flex flex-col items-center justify-center">
      <div className="absolute right-8 top-8">
        <ModeToggle />
      </div>
      <div className="flex flex-col">
        <Outlet />
      </div>
    </div>
  );
}
