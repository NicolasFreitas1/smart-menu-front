import { getCategories } from "@/api/get-categories"; // ✅ Certifique-se de importar
import { getRestaurantDishes } from "@/api/get-restaurant-dishes";
import { updateDish } from "@/api/update-dish";
import { Pagination } from "@/components/pagination";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import { Dish } from "@/domain/dish";
import { DataWithPagination } from "@/domain/interfaces/data-with-pagination";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import { AddDishModal } from "../components/add-dish-modal";
import { DishCard } from "./components/dish-card";
import { deleteDish } from "@/api/delete-dish";
import { toast } from "sonner";
import { createDish } from "@/api/create-dish";
import { Separator } from "@/components/ui/separator";

export function MenuPage() {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const pageIndex = z.coerce.number().parse(searchParams.get("page") ?? 1);
  const perPageIndex = z.coerce
    .number()
    .parse(searchParams.get("per_page") ?? 6);

  const [dishes, setDishes] = useState<DataWithPagination<Dish> | undefined>(
    undefined
  );

  const categoryFilter = searchParams.get("categoryFilter");

  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingDish, setEditingDish] = useState<Dish | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  function handlePagination(pageIndex: number) {
    setSearchParams((state) => {
      state.set("page", (pageIndex + 1).toString());
      return state;
    });
  }

  function handlePerPagePagination(perPage: number) {
    setSearchParams((state) => {
      state.set("per_page", perPage.toString());
      return state;
    });
  }

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

  async function handleAddDish(data: {
    name: string;
    description: string;
    price: number;
    restaurantId: string;
    categories: string[];
  }) {
    await createDish(data);
    await fetchDishes();
    await fetchCategories();
  }

  async function handleEditDish(data: {
    name: string;
    description: string;
    price: number;
    restaurantId: string;
    categories: string[];
  }) {
    if (!editingDish) return;
    
    try {
      await updateDish({ dishId: editingDish.id, ...data });
      await fetchDishes();
      await fetchCategories();
      setEditModalOpen(false);
      setEditingDish(null);
      toast.success("Prato atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar prato:", error);
      toast.error("Erro ao atualizar prato");
    }
  }

  function handleEdit(dish: Dish) {
    setEditingDish(dish);
    setEditModalOpen(true);
  }

  async function handleRemove(id: string) {
    try {
      await deleteDish({ dishId: id });
      await fetchDishes();
      setDishes((prev) =>
        prev
          ? {
              ...prev,
              data: prev.data.filter((dish) => dish.id !== id),
            }
          : prev
      );
      toast.success("Prato removido com sucesso");
    } catch (error) {
      console.error("Erro ao remover prato:", error);
      toast.error("Erro ao remover prato");
    }
  }

  const fetchDishes = useCallback(async () => {
    if (!user) return;

    const dishes = await getRestaurantDishes({
      restaurantId: user.restaurantId,
      per_page: perPageIndex,
      page: pageIndex,
      categoryFilter: categoryFilter ?? undefined,
    });

    setDishes(dishes);
  }, [user, perPageIndex, pageIndex, categoryFilter]);

  const fetchCategories = useCallback(async () => {
    try {
      const result = await getCategories();
      const names = result.map((cat) => cat.name);
      setCategories(["todas", ...names]);
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

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Cardápio</h1>
        <p className="text-muted-foreground">
          Lista dos pratos cadastrados no sistema.
        </p>
      </div>

      <Separator />

      <div className="flex items-center gap-4">
        <Select
          onValueChange={(value) =>
            handleCategoryFilter(value === "todas" ? "" : value)
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por categoria" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button onClick={() => setModalOpen(true)}>Adicionar novo prato</Button>
        <AddDishModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          existingCategories={categories.filter((c) => c !== "todas")}
          onSubmit={handleAddDish}
        />
      </div>

      {dishes && dishes.data.length > 0 ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dishes.data.map((dish) => (
              <DishCard 
                dish={dish} 
                key={dish.id} 
                onRemove={handleRemove}
                onEdit={handleEdit}
              />
            ))}
          </div>

          <Pagination
            onPageChange={handlePagination}
            onPerPageChange={handlePerPagePagination}
            pageIndex={dishes.actualPage}
            perPageIndex={dishes.perPage}
            perPage={dishes.perPage}
            totalCount={dishes.amount}
            totalPages={dishes.totalPages}
            hasPerPage={false}
          />
        </div>
      ) : (
        <p>Nenhum prato cadastrado</p>
      )}

      <AddDishModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        existingCategories={categories.filter((c) => c !== "todas")}
        onSubmit={handleEditDish}
        isEditing={true}
        editingDish={editingDish}
      />
    </div>
  );
}
