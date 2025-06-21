import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dish } from "@/domain/dish";
import { Edit, Trash2 } from "lucide-react";

interface DishCardProps {
  dish: Dish;
  onRemove?: (id: string) => void;
  onEdit?: (dish: Dish) => void;
}

export function DishCard({ dish, onRemove, onEdit }: DishCardProps) {
  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-lg">{dish.name}</h2>
          <div className="flex gap-2">
            {onEdit && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit(dish)}
              >
                <Edit className="w-4 h-4" />
              </Button>
            )}
            {onRemove && (
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onRemove(dish.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
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
