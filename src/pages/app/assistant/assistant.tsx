import { generateAISuggestion } from "@/api/generate-ai-suggestion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRestaurant } from "@/context/RestaurantContext";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const initialMessages = [
  {
    role: "assistant",
    content: "Olá! Vamos encontrar o prato ideal para você 🍽️",
  },
  { role: "assistant", content: "Você está com muita fome agora?" },
];

const questions = [
  "Prefere algo leve ou mais reforçado?",
  "Tem preferência por tipo de comida (massa, carne, salada...)?",
  "Alguma restrição alimentar?",
];

export function Assistant() {
  const { restaurantId } = useRestaurant();

  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [step, setStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim()) return;
    if (!restaurantId) return;

    const userMessage = { role: "user", content: input.trim() };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      if (step < questions.length) {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: questions[step] },
          ]);
          setStep((prevStep) => prevStep + 1);
          setIsLoading(false);
        }, 800);
      } else {
        const { text, dish } = await generateAISuggestion({
          restaurantId, // troque conforme necessário
          messages: updatedMessages,
        });

        let finalMessage = text;
        if (dish) {
          finalMessage += `\n\n🍽️ *${dish.name}*\n${dish.description}`;
        }

        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: finalMessage },
        ]);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Erro ao buscar sugestão da IA:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Ocorreu um erro ao buscar a sugestão. Tente novamente.",
        },
      ]);
      setIsLoading(false);
    }
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
              </div>
            ))}

            {isLoading && (
              <div className="max-w-[75%] px-4 py-2 rounded-lg text-sm bg-muted text-muted-foreground animate-pulse">
                ...
              </div>
            )}
          </div>
        </ScrollArea>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="mt-4 flex items-center gap-2"
        >
          <Input
            placeholder="Digite sua resposta..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" className="gap-1">
            <Send size={16} />
            <span className="sr-only">Enviar</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
