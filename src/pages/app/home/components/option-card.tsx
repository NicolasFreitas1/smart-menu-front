import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface OptionCardProps {
  title: string;
  redirectTo: string;
  icon?: LucideIcon;
}

export function OptionCard({ redirectTo, title, icon: Icon }: OptionCardProps) {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate(redirectTo)}
      variant="outline"
      className="text-muted-foreground font-bold w-full p-6 flex items-center gap-2 justify-start"
    >
      {Icon && <Icon size={20} />}
      {title}
    </Button>
  );
}
