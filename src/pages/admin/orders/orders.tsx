// src/pages/admin/orders.tsx
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

type OrderStatus = "PENDING" | "IN_PROGRESS" | "DELIVERED" | "CANCELED";

interface Order {
  id: string;
  tableNumber: number | null;
  status: OrderStatus;
  customerName: string | null;
  createdAt: string;
}

export function OrdersPage() {
  const [orders, setOrders] = useState<Order[] | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setOrders([
        {
          id: "1",
          tableNumber: 5,
          status: "PENDING",
          customerName: "João Silva",
          createdAt: "2025-05-06T14:30:00Z",
        },
        {
          id: "2",
          tableNumber: null,
          status: "DELIVERED",
          customerName: null,
          createdAt: "2025-05-06T13:00:00Z",
        },
      ]);
    }, 1000);
  }, []);

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "PENDING":
        return <Badge variant="outline">Pendente</Badge>;
      case "IN_PROGRESS":
        return <Badge variant="default">Em preparo</Badge>;
      case "DELIVERED":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">Entregue</Badge>
        );
      case "CANCELED":
        return <Badge variant="destructive">Cancelado</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Pedidos</h1>
        <p className="text-muted-foreground">
          Acompanhe todos os pedidos realizados.
        </p>
      </div>

      <Separator />

      <Card>
        <CardContent className="p-4">
          {!orders ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-6 w-full" />
              ))}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Mesa</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.customerName ?? "Anônimo"}</TableCell>
                    <TableCell>{order.tableNumber ?? "N/A"}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell>
                      {new Date(order.createdAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
