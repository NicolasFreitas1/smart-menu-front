import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dish } from "@/domain/dish";

interface DishCardProps {
  dish: Dish;
  onRemove?: (id: string) => void;
}

export function DishCard({ dish, onRemove }: DishCardProps) {
  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-lg">{dish.name}</h2>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => onRemove?.(dish.id)}
          >
            Remover
          </Button>
        </div>
        <p className="text-muted-foreground text-sm">{dish.description}</p>
        <p className="text-sm font-medium">R$ {dish.price.toFixed(2)}</p>
        <div className="flex gap-2 flex-wrap">
          {dish.categories?.map((cat) => (
            <Badge key={cat}>{cat}</Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
