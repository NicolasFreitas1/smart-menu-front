import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MultiSelect } from "@/components/ui/MultiSelect";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  price: z.number().positive("Preço deve ser positivo"),
  categories: z.array(z.string()).optional(),
});

type FormData = z.infer<typeof formSchema>;

interface AddDishModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void; // ✅ aqui está o que faltava
  existingCategories: string[];
  onSubmit: (data: {
    name: string;
    description: string;
    price: number;
    categories: string[];
  }) => void;
}

export const AddDishModal: React.FC<AddDishModalProps> = ({
  open,
  onOpenChange,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 1,
      categories: [],
    },
  });

  const categories = watch("categories") || [];

  const onSubmit = (data: FormData) => {
    console.log("✅ Dados do formulário:", data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar novo prato</DialogTitle>
          <DialogDescription>
            Cadastre um novo prato no cardápio
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="text-sm font-medium">
              Nome
            </label>
            <Input
              id="name"
              type="text"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="text-sm font-medium">
              Descrição
            </label>
            <Textarea
              id="description"
              {...register("description", { required: true })}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="price" className="text-sm font-medium">
              Preço (R$)
            </label>
            <Input
              id="price"
              type="number"
              step="0.01"
              {...register("price", { valueAsNumber: true, required: true })}
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Categorias</label>
            <MultiSelect
              value={categories}
              onChange={(values) => setValue("categories", values)}
              options={["Massas", "Carnes", "Saladas", "Bebidas"]}
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>

            <Button type="submit">Salvar</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
