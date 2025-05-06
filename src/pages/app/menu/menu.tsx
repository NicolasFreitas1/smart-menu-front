import { useEffect, useState } from "react";
import { DishItem } from "@/components/dish-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CategoryFilter } from "@/components/category-filter";
import { getDishes } from "@/api/get-dishes";
import { Dish } from "@/domain/dish";

// Categorias disponíveis
const categories = ["Todos", "Massas", "Carnes", "Saladas", "Sobremesas"];

export function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [dishes, setDishes] = useState<Dish[]>([]);

  async function fetchDishes() {
    const fetchedDishes = await getDishes();

    setDishes(fetchedDishes);
  }

  useEffect(() => {
    fetchDishes();
  }, []);

  // Filtro baseado na categoria
  // const filteredDishes =
  //   selectedCategory === "Todos"
  //     ? dishes
  //     : dishes.filter((dish) => dish.category === selectedCategory);

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
            {dishes.map((dish) => (
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
