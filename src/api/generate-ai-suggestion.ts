import { api } from "@/lib/axios";

interface MessageSent {
  role: string;
  content: string;
}


interface GenerateAISuggestionRequest {
    restaurantId: string;
    messages: MessageSent[];

}

export async function generateAISuggestion({
  restaurantId,
  messages,
}: GenerateAISuggestionRequest): Promise<{
  text: string;
  dish: { id: string; name: string; description: string } | null;
}> {
  const { data } = await api.post(`ai/suggestion/${restaurantId}`, { messages });

  const raw = data.message?.message || "";

  // Extrai JSON embutido (entre crases ou markdown)
  const jsonMatch = raw.match(/```json([\s\S]*?)```/);
  let dish = null;

  if (jsonMatch) {
    try {
      dish = JSON.parse(jsonMatch[1].trim());
    } catch (err) {
      console.error("Erro ao fazer parse do JSON da IA:", err);
    }
  }

  const cleanedText = raw.replace(/```json[\s\S]*?```/, "").trim();

  return { text: cleanedText, dish };
}
