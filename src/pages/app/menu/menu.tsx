import { useCallback, useEffect, useState } from "react";
import { DishItem } from "@/components/dish-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CategoryFilter } from "@/components/category-filter";
import { getRestaurantDishes } from "@/api/get-restaurant-dishes";
import { Dish } from "@/domain/dish";
import { useRestaurant } from "@/context/RestaurantContext";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import { DataWithPagination } from "@/domain/interfaces/data-with-pagination";
import { getCategories } from "@/api/get-categories";

export function Menu() {
  const { restaurantId } = useRestaurant();

  const [dishes, setDishes] = useState<DataWithPagination<Dish> | undefined>(
    undefined
  );
  const [searchParams, setSearchParams] = useSearchParams();

  const pageIndex = z.coerce.number().parse(searchParams.get("page") ?? 1);
  const perPageIndex = z.coerce
    .number()
    .parse(searchParams.get("per_page") ?? 9999);

  const categoryFilter = searchParams.get("categoryFilter");

  const [categories, setCategories] = useState<string[]>([]);

  function handleCategoryFilter(category: string) {
    setSearchParams((state) => {
      if (category) {
        state.set("categoryFilter", category);
      } else {
        state.delete("categoryFilter");
      }

      state.set("page", "1");

      return state;
    });
  }

  const fetchDishes = useCallback(async () => {
    if (!restaurantId) return;

    const dishes = await getRestaurantDishes({
      restaurantId,
      per_page: perPageIndex,
      page: pageIndex,
      categoryFilter: categoryFilter ?? undefined,
    });

    setDishes(dishes);
  }, [restaurantId, perPageIndex, pageIndex, categoryFilter]);

  const fetchCategories = useCallback(async () => {
    try {
      const result = await getCategories();
      const allowedCategories = [
        "entrada",
        "saladas", 
        "Carnes",
        "grills",
        "escalopes e pastas",
        "pastas",
        "peixe",
        "bebidas",
        "porções",
        "pratos fitness",
        "Risoto",
        "sobremesas",
        
      ];
      
      const filteredCategories = result
        .map((cat) => cat.name)
        .filter((name) => allowedCategories.includes(name.toLowerCase()));
      
      setCategories(["Todas", ...filteredCategories]);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchDishes();
  }, [fetchDishes]);

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
        onSelect={(value) =>
          handleCategoryFilter(value === "Todas" ? "" : value)
        }
        selected={categoryFilter ?? "Todas"}
      />

      {/* Lista de pratos */}
      <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
        <ScrollArea className="h-[500px] w-full max-w-3xl">
          <div className="flex flex-col gap-4">
            {dishes &&
              dishes.data.map((dish) => (
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
