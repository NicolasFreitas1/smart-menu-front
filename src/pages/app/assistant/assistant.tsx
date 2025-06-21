import React, { useRef, useState, useEffect } from "react";
import { generateAISuggestion } from "@/api/generate-ai-suggestion";
import { getDishById } from "@/api/get-dish-by-id";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRestaurant } from "@/context/RestaurantContext";
import { useCart } from "@/context/CartContext";
import { Dish } from "@/domain/dish";

interface Option {
  label: string;
  value: string;
}

interface Step {
  id: string;
  question: string;
  options: Option[];
  nextStep?: string;
  end?: boolean;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const conversationFlow: Record<string, Step> = {
  start: {
    id: "start",
    question: "O que você quer pedir?",
    options: [
      { label: "Entrada", value: "entrada" },
      { label: "Bebida", value: "bebida" },
      { label: "Salada", value: "salada" },
      { label: "Prato Principal", value: "prato_principal" },
      { label: "Sobremesa", value: "sobremesa" },
    ],
  },

  entrada: {
    id: "entrada",
    question: "Porções ou saladas?",
    options: [
      { label: "Porções", value: "entrada_porcoes" },
      { label: "Saladas", value: "entrada_saladas" },
    ],
  },
  entrada_porcoes: {
    id: "entrada_porcoes",
    question: "Porções fritas ou não fritas?",
    options: [
      { label: "Fritas", value: "entrada_porcoes_fritas" },
      { label: "Não fritas", value: "entrada_porcoes_nao_fritas" },
    ],
    end: true,
  },
  entrada_saladas: {
    id: "entrada_saladas",
    question: "Com parmesão ou sem?",
    options: [
      { label: "Com parmesão", value: "entrada_saladas_com_parmesao" },
      { label: "Sem parmesão", value: "entrada_saladas_sem_parmesao" },
    ],
    end: true,
  },

  bebida: {
    id: "bebida",
    question: "Bebida com gás ou sem?",
    options: [
      { label: "Com gás", value: "bebida_com_gas" },
      { label: "Sem gás", value: "bebida_sem_gas" },
    ],
  },
  bebida_com_gas: {
    id: "bebida_com_gas",
    question: "Refrigerante ou energético?",
    options: [
      { label: "Refrigerante", value: "bebida_com_gas_refrigerante" },
      { label: "Energético", value: "bebida_com_gas_energetico" },
    ],
    end: true,
  },
  bebida_sem_gas: {
    id: "bebida_sem_gas",
    question: "Suco ou água?",
    options: [
      { label: "Suco", value: "bebida_sem_gas_suco" },
      { label: "Água", value: "bebida_sem_gas_agua" },
    ],
    end: true,
  },

  salada: {
    id: "salada",
    question: "Com queijo parmesão ou sem?",
    options: [
      { label: "Com parmesão", value: "salada_com_parmesao" },
      { label: "Sem parmesão", value: "salada_sem_parmesao" },
    ],
    end: true,
  },

  prato_principal: {
    id: "prato_principal",
    question: "Para quantas pessoas?",
    options: [
      { label: "Individual", value: "prato_individual" },
      { label: "2 pessoas", value: "prato_duas_pessoas" },
    ],
  },
  prato_individual: {
    id: "prato_individual",
    question: "Escolha o tipo:",
    options: [
      { label: "Grill", value: "prato_individual_grill" },
      { label: "Pastas", value: "prato_individual_pastas" },
      { label: "Peixes", value: "prato_individual_peixes" },
      { label: "Risotos", value: "prato_individual_risotos" },
      { label: "Pratos Fitness", value: "prato_individual_fitness" },
    ],
  },
  prato_individual_grill: {
    id: "prato_individual_grill",
    question: "Escolha a carne:",
    options: [
      { label: "Frango", value: "prato_individual_grill_frango" },
      { label: "Costela suína", value: "prato_individual_grill_costela_suina" },
      {
        label: "Pernil de cordeiro",
        value: "prato_individual_grill_pernil_cordeiro",
      },
      { label: "Filé", value: "prato_individual_grill_file" },
      { label: "Picanha", value: "prato_individual_grill_picanha" },
      { label: "Iscas de carne", value: "prato_individual_grill_iscas_carne" },
    ],
    end: true,
  },
  prato_individual_pastas: {
    id: "prato_individual_pastas",
    question: "Escolha o molho:",
    options: [
      { label: "Molho branco", value: "prato_individual_pastas_molho_branco" },
      { label: "Molho misto", value: "prato_individual_pastas_molho_misto" },
      { label: "Molho sugo", value: "prato_individual_pastas_molho_sugo" },
      {
        label: "Molho de tomate",
        value: "prato_individual_pastas_molho_tomate",
      },
    ],
    end: true,
  },
  prato_individual_peixes: {
    id: "prato_individual_peixes",
    question: "Escolha o peixe:",
    options: [
      { label: "Camarão", value: "prato_individual_peixes_camarao" },
      { label: "Congrio", value: "prato_individual_peixes_congrio" },
      { label: "Paella", value: "prato_individual_peixes_paella" },
      { label: "Salmão", value: "prato_individual_peixes_salmao" },
      { label: "Siri", value: "prato_individual_peixes_siri" },
    ],
    end: true,
  },
  prato_individual_risotos: {
    id: "prato_individual_risotos",
    question: "Com algum tipo de carne ou sem?",
    options: [
      { label: "Com carne", value: "prato_individual_risotos_com_carne" },
      { label: "Sem carne", value: "prato_individual_risotos_sem_carne" },
    ],
    end: true,
  },
  prato_individual_fitness: {
    id: "prato_individual_fitness",
    question: "Escolha o prato:",
    options: [
      { label: "Escondidinho", value: "prato_individual_fitness_escondidinho" },
      { label: "Nhoque", value: "prato_individual_fitness_nhoque" },
      {
        label: "Bolinho de carne",
        value: "prato_individual_fitness_bolinho_carne",
      },
      { label: "Omelete", value: "prato_individual_fitness_omelete" },
    ],
    end: true,
  },
  prato_duas_pessoas: {
    id: "prato_duas_pessoas",
    question: "Escolha o tipo:",
    options: [
      {
        label: "Escalopes e pastas",
        value: "prato_duas_pessoas_escalopes_pastas",
      },
      { label: "Peixes", value: "prato_duas_pessoas_peixes" },
    ],
  },
  prato_duas_pessoas_escalopes_pastas: {
    id: "prato_duas_pessoas_escalopes_pastas",
    question: "Escolha:",
    options: [
      { label: "Filé", value: "prato_duas_pessoas_escalopes_pastas_file" },
      { label: "Frango", value: "prato_duas_pessoas_escalopes_pastas_frango" },
      {
        label: "Talharim",
        value: "prato_duas_pessoas_escalopes_pastas_talharim",
      },
    ],
    end: true,
  },
  prato_duas_pessoas_peixes: {
    id: "prato_duas_pessoas_peixes",
    question: "Escolha o peixe:",
    options: [
      { label: "Camarão", value: "prato_duas_pessoas_peixes_camarao" },
      { label: "Congrio", value: "prato_duas_pessoas_peixes_congrio" },
      { label: "Paella", value: "prato_duas_pessoas_peixes_paella" },
      { label: "Salmão", value: "prato_duas_pessoas_peixes_salmao" },
      { label: "Siri", value: "prato_duas_pessoas_peixes_siri" },
    ],
    end: true,
  },

  sobremesa: {
    id: "sobremesa",
    question: "Escolha a sobremesa:",
    options: [{ label: "Panqueca", value: "sobremesa_panqueca" }],
    end: true,
  },
};

export function Assistant() {
  const { restaurantId } = useRestaurant();
  const { addToCart } = useCart();
  const containerRef = useRef<HTMLDivElement>(null);

  const [currentStepId, setCurrentStepId] = useState("start");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Olá! Vamos encontrar o prato ideal para você 🍽️",
    },
    { role: "assistant", content: "Do que você precisa de sugestão?" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatEnded, setChatEnded] = useState(false);
  const [suggestedDish, setSuggestedDish] = useState<Dish | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const [userChoices, setUserChoices] = useState<string[]>([]);

  const currentStep = conversationFlow[currentStepId];

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleOptionClick = async (option: Option) => {
    setMessages((prev) => [...prev, { role: "user", content: option.label }]);
    setUserChoices((prev) => [...prev, option.value]);

    if (currentStep?.end) {
      setIsLoading(true);
      setChatEnded(true);

      try {
        if (!restaurantId) throw new Error("Restaurante não selecionado");

        const context = userChoices.join(", ") + ", " + option.value;

        const { text, dish } = await generateAISuggestion({
          restaurantId: String(restaurantId),
          messages: [{ role: "user", content: context }],
        });

        let finalMessage = text;

        if (dish) {
          finalMessage += `\n\n🍽️ *${dish.name}*\n${dish.description}`;

          try {
            const fullDish = await getDishById({ dishId: dish.id });
            setSuggestedDish(fullDish);
          } catch (error) {
            const fallbackDish: Dish = {
              id: dish.id,
              name: dish.name,
              description: dish.description,
              price: 0,
              restaurantId: String(restaurantId),
            };
            setSuggestedDish(fallbackDish);
          }
        }

        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: finalMessage },
        ]);
      } catch (error) {
        console.error("Erro ao gerar sugestão:", error);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Ocorreu um erro ao buscar a sugestão. Tente novamente.",
          },
        ]);
      }

      setIsLoading(false);
    } else {
      const nextStepId = option.value;
      setCurrentStepId(nextStepId);

      const nextStep = conversationFlow[nextStepId];
      if (nextStep) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: nextStep.question },
        ]);
      }
    }
  };

  const handleAddToCart = () => {
    if (suggestedDish) {
      addToCart(suggestedDish);
      setAddedToCart(true);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "✅ Prato adicionado ao carrinho com sucesso!",
        },
      ]);
    }
  };

  const handleNewSuggestion = () => {
    setCurrentStepId("start");
    setMessages([
      {
        role: "assistant",
        content: "Olá! Vamos encontrar o prato ideal para você 🍽️",
      },
      { role: "assistant", content: "Do que você precisa de sugestão?" },
    ]);
    setIsLoading(false);
    setChatEnded(false);
    setSuggestedDish(null);
    setAddedToCart(false);
    setUserChoices([]);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 space-y-8">
      <h1 className="text-xl font-bold text-center">Assistente de Sugestão</h1>

      <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
        <ScrollArea className="h-[600px] w-full max-w-3xl rounded-md border bg-card p-4">
          <div ref={containerRef} className="space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-[75%] px-4 py-2 rounded-lg text-sm whitespace-pre-wrap transition-colors ${
                  msg.role === "assistant"
                    ? "bg-muted text-muted-foreground"
                    : "ml-auto bg-primary text-primary-foreground"
                }`}
              >
                {msg.content}

                {suggestedDish &&
                  msg.role === "assistant" &&
                  msg.content.includes("🍽️") &&
                  !addedToCart &&
                  idx === messages.length - 1 && (
                    <div className="mt-3">
                      <Button
                        onClick={handleAddToCart}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        🛒 Adicionar ao carrinho
                      </Button>
                    </div>
                  )}
              </div>
            ))}

            {isLoading && (
              <div className="max-w-[75%] px-4 py-2 rounded-lg text-sm bg-muted text-muted-foreground animate-pulse">
                Gerando sugestão...
              </div>
            )}
          </div>
        </ScrollArea>

        {chatEnded && !isLoading && (
          <div className="mt-4 flex justify-center">
            <Button
              onClick={handleNewSuggestion}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              🔄 Nova sugestão
            </Button>
          </div>
        )}

        {!isLoading && !chatEnded && currentStep && currentStep.options && (
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {currentStep.options.map((option) => (
              <Button
                key={option.value}
                onClick={() => handleOptionClick(option)}
                className="min-w-[120px]"
              >
                {option.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
