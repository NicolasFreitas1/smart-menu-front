import { useState } from "react";
import { DishItem } from "@/components/dish-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CategoryFilter } from "@/components/category-filter";

// Categorias disponíveis
const categories = [
  "Todos",
  "Massas",
  "Carnes",
  "Saladas",
  "Sobremesas",
  "Sobremesas",
  "Sobremesas",
  "Sobremesas",
  "Sobremesas",
  "Sobremesas",
  "Sobremesas",
];

// Lista simulada de pratos
const dishes = [
  {
    id: "1",
    name: "Lasanha",
    description: "Deliciosa lasanha caseira com molho de tomate e queijo.",
    price: 25.0,
    category: "Massas",
  },
  {
    id: "2",
    name: "Picanha Grelhada",
    description: "Picanha suculenta grelhada no ponto perfeito.",
    price: 45.0,
    category: "Carnes",
  },
  {
    id: "3",
    name: "Salada Caesar",
    description: "Clássica salada Caesar com frango e parmesão.",
    price: 18.0,
    category: "Saladas",
  },
  {
    id: "4",
    name: "Petit Gateau",
    description: "Bolo de chocolate com recheio cremoso e sorvete.",
    price: 22.0,
    category: "Sobremesas",
  },
  {
    id: "5",
    name: "Spaghetti à Bolonhesa",
    description: "Massa com molho de carne moída ao estilo italiano.",
    price: 23.0,
    category: "Massas",
  },
];

export function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  // Filtro baseado na categoria
  const filteredDishes =
    selectedCategory === "Todos"
      ? dishes
      : dishes.filter((dish) => dish.category === selectedCategory);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 space-y-8">
      <h1 className="text-xl font-bold text-center">Cardápio</h1>

      <p className="text-center text-muted-foreground max-w-xl">
        Explore os pratos disponíveis no cardápio do restaurante. Escolha seus
        favoritos e adicione ao carrinho para fazer seu pedido.
      </p>

      {/* Filtro por categoria */}
      <CategoryFilter
        categories={categories}
        onSelect={setSelectedCategory}
        selected={selectedCategory}
      />

      {/* Lista de pratos */}
      <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
        <ScrollArea className="h-[500px] w-full max-w-3xl">
          <div className="flex flex-col gap-4">
            {filteredDishes.map((dish) => (
              <DishItem
                key={dish.id}
                id={dish.id}
                name={dish.name}
                description={dish.description}
                price={dish.price}
              />
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
