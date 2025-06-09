import { MoneyInput } from "@/components/money-input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

const formSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  price: z.number().positive("Preço deve ser positivo"),
  categories: z.array(optionSchema),
});

type FormData = z.infer<typeof formSchema>;

interface AddDishModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  existingCategories: string[];
  onSubmit: (data: {
    name: string;
    description: string;
    price: number;
    restaurantId: string;
    categories: string[];
  }) => Promise<void>;
}

export function AddDishModal({
  open,
  onOpenChange,
  existingCategories,
  onSubmit: addDish,
}: AddDishModalProps) {
  const { user } = useAuth();

  const [options, setOptions] = useState<Option[]>([]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      categories: [],
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      if (!user) return;

      const payload = {
        name: data.name,
        description: data.description,
        price: data.price,
        restaurantId: user.restaurantId,
        categories: data.categories.map((category) => category.value),
      };

      await addDish(payload);

      toast.success("Prato criado com sucesso!");
      onOpenChange(false);
    } catch (err) {
      console.log(err);
      toast.error("Ops, um erro aconteceu ao criar o prato!");
    }
  };

  useEffect(() => {
    function formatOptions() {
      const formattedOptions: Option[] = existingCategories.map((category) => {
        return {
          label: category,
          value: category,
        };
      });

      setOptions(formattedOptions);
    }

    formatOptions();
  }, [existingCategories]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar novo prato</DialogTitle>
          <DialogDescription>
            Cadastre um novo prato no cardápio
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2 w-full">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o nome..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Digite a descrição..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor</FormLabel>
                    <FormControl>
                      <MoneyInput
                        placeholder="Digite o valor..."
                        onValueChange={({ floatValue }) => {
                          field.onChange(floatValue);
                        }}
                        value={field.value}
                        onBlur={field.onBlur}
                        disabled={field.disabled}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categorias</FormLabel>
                    <FormControl>
                      <MultipleSelector
                        {...field}
                        defaultOptions={options}
                        placeholder="Selecione as categorias..."
                        creatable
                        emptyIndicator={
                          <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                            Nenhuma categoria encontrada.
                          </p>
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit">Adicionar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
