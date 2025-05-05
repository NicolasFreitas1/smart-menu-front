import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCart } from "@/context/CartContext";

export function Cart() {
  const { cartItems, addToCart, removeFromCart, clearCart } = useCart();

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold mb-2">Seu carrinho está vazio</h2>
          <p className="text-muted-foreground">
            Adicione pratos para vê-los aqui.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-center">Seu Carrinho</h2>

      <div className="grid grid-cols-1 gap-6 w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
        <ScrollArea className="h-[550px] w-full max-w-3xl">
          <div className="flex flex-col gap-4">
            {cartItems.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="font-bold text-green-700">
                      {Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(item.price * item.quantity)}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground w-full">
                    {item.description}
                  </p>
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={() => removeFromCart(item.id)}
                      variant="outline"
                    >
                      -
                    </Button>
                    <span>{item.quantity}</span>
                    <Button onClick={() => addToCart(item)} variant="outline">
                      +
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="text-center space-y-2">
        <p className="text-lg font-semibold">
          Total:{" "}
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(total)}
        </p>
        <div className="flex justify-center gap-4">
          <Button onClick={clearCart} variant="outline">
            Limpar Carrinho
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 text-white font-bold">
            Finalizar Pedido
          </Button>
        </div>
      </div>
    </div>
  );
}
