import { getDishes } from "@/api/get-dishes";
import { DishItem } from "@/components/dish-item";
import { Button } from "@/components/ui/button";
import { Dish } from "@/domain/dish";
import { useEffect, useState } from "react";

export function SurpriseMe() {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [randomDish, setRandomDish] = useState<Dish | null>(null);
  const [step, setStep] = useState<1 | 2>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [dishes, setDishes] = useState<Dish[]>([]);

  async function fetchDishes() {
    const fetchedDishes = await getDishes();

    setDishes(fetchedDishes);
  }

  useEffect(() => {
    fetchDishes();
    setCategories(["Massas", "Carnes", "Saladas", "Sobremesas"]);
  }, []);

  const handleNextStep = () => {
    if (!selectedCategory) return;

    setIsLoading(true);

    setTimeout(() => {
      // const filtered = dishes.filter(
      //   (dish) => dish.category === selectedCategory
      // );
      const random = dishes[Math.floor(Math.random() * dishes.length)];
      setRandomDish(random);
      setStep(2);
      setIsLoading(false);
    }, 1500);
  };

  const handleReset = () => {
    setSelectedCategory("");
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
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded border text-sm font-medium whitespace-nowrap transition ${
                  selectedCategory === category
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <Button
            onClick={handleNextStep}
            disabled={!selectedCategory || isLoading}
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
