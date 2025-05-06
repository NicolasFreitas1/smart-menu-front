import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { AddDishModal } from "../components/AddDishModal";

// Simulação de API
const mockDishes = [
  {
    id: "1",
    name: "Lasanha",
    description: "Deliciosa lasanha com queijo e molho.",
    price: 29.9,
    categories: ["prato principal"],
  },
  {
    id: "2",
    name: "Refrigerante",
    description: "Coca-Cola gelada.",
    price: 5.0,
    categories: ["bebida"],
  },
  {
    id: "3",
    name: "Petit Gâteau",
    description: "Bolo com sorvete de creme.",
    price: 18.5,
    categories: ["sobremesa"],
  },
];

export function MenuPage() {
  const [dishes, setDishes] = useState(mockDishes);
  const [filter, setFilter] = useState<string>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>([
    "Massas",
    "Carnes",
    "Saladas",
  ]);

  const handleAddDish = (data: {
    name: string;
    description: string;
    price: number;
    categories: string[];
  }) => {
    // Atualiza categorias caso o usuário tenha adicionado alguma nova
    const novasCategorias = data.categories.filter(
      (cat) => !categories.includes(cat)
    );
    if (novasCategorias.length > 0) {
      setCategories((prev) => [...prev, ...novasCategorias]);
    }

    // Aqui você pode fazer o POST para o backend com os dados do prato
    console.log("Prato criado:", data);
  };

  const filteredDishes =
    filter === "all"
      ? dishes
      : dishes.filter((dish) => dish.categories.includes(filter));

  const handleRemove = (id: string) => {
    setDishes((prev) => prev.filter((dish) => dish.id !== id));
  };

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Cardápio</h1>

      <div className="flex items-center gap-4">
        <Select onValueChange={(value) => setFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="bebida">Bebidas</SelectItem>
            <SelectItem value="entrada">Entradas</SelectItem>
            <SelectItem value="prato principal">Prato Principal</SelectItem>
            <SelectItem value="sobremesa">Sobremesas</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={() => setModalOpen(true)}>Adicionar novo prato</Button>
        <AddDishModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          existingCategories={categories}
          onSubmit={handleAddDish}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDishes.map((dish) => (
          <Card key={dish.id}>
            <CardContent className="p-4 space-y-2">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-lg">{dish.name}</h2>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleRemove(dish.id)}
                >
                  Remover
                </Button>
              </div>
              <p className="text-muted-foreground text-sm">
                {dish.description}
              </p>
              <p className="text-sm font-medium">R$ {dish.price.toFixed(2)}</p>
              <div className="flex gap-2 flex-wrap">
                {dish.categories.map((cat) => (
                  <Badge key={cat}>{cat}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
