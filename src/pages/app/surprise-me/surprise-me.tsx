import { getCategories } from "@/api/get-categories";
import { getRandomDishFromRestaurant } from "@/api/get-random-dish-from-restaurant";
import { CategoryFilter } from "@/components/category-filter";
import { DishItem } from "@/components/dish-item";
import { Button } from "@/components/ui/button";
import { useRestaurant } from "@/context/RestaurantContext";
import { Dish } from "@/domain/dish";
import { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export function SurpriseMe() {
  const { restaurantId } = useRestaurant();

  const [searchParams, setSearchParams] = useSearchParams();

  const categoryFilter = searchParams.get("categoryFilter");

  const [categories, setCategories] = useState<string[]>([]);
  const [randomDish, setRandomDish] = useState<Dish | null>(null);
  const [step, setStep] = useState<1 | 2>(1);
  const [isLoading, setIsLoading] = useState(false);

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

  const fetchCategories = useCallback(async () => {
    try {
      const result = await getCategories();
      const names = result.map((cat) => cat.name);
      setCategories([...names]);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleNextStep = async () => {
    try {
      if (!restaurantId) return;

      console.log(categoryFilter);

      if (!categoryFilter) return;

      setIsLoading(true);

      const random = await getRandomDishFromRestaurant({
        restaurantId,
        category: categoryFilter,
      });
      setRandomDish(random.dish);
      setStep(2);
      setIsLoading(false);
    } catch (error) {
      console.log(error);

      if (error instanceof AxiosError) {
        if (error.status === 404) {
          toast.error("Nenhum prato encontrado com a categoria selecionada!");
        }
      } else {
        toast.error("Algo deu errado!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSearchParams((state) => {
      state.delete("categoryFilter");
      return state;
    });
    setRandomDish(null);
    setStep(1);
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6 text-center">
      {step === 1 && (
        <>
          <h1 className="text-2xl font-bold">Surpreenda-me</h1>
          <p className="text-muted-foreground">
            Escolha uma categoria e descubra um prato aleatório!
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            <CategoryFilter
              categories={categories}
              onSelect={(value) =>
                handleCategoryFilter(value === "Todas" ? "" : value)
              }
              selected={categoryFilter ?? "Todas"}
            />
          </div>

          <Button
            onClick={() => handleNextStep()}
            disabled={!categoryFilter || isLoading}
            className="bg-green-600 hover:bg-green-700 text-white font-bold"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Pensando...
              </div>
            ) : (
              "Próximo"
            )}
          </Button>
        </>
      )}

      {step === 2 && randomDish && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold">Você foi surpreendido com:</h2>
          <DishItem {...randomDish} />

          <Button onClick={handleReset} variant="outline">
            Tentar novamente
          </Button>
        </div>
      )}
    </div>
  );
}
