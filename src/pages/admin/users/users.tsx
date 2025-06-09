import { useCallback, useEffect, useState } from "react";
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
import { User } from "@/domain/user";
import { getUsers } from "@/api/get-users";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import { DataWithPagination } from "@/domain/interfaces/data-with-pagination";
import { Pagination } from "@/components/pagination";

export function UsersPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [users, setUsers] = useState<DataWithPagination<User> | undefined>(
    undefined
  );

  const pageIndex = z.coerce.number().parse(searchParams.get("page") ?? 1);
  const perPageIndex = z.coerce
    .number()
    .parse(searchParams.get("per_page") ?? 6);

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

  const fetchUsers = useCallback(async () => {
    const users = await getUsers({
      per_page: perPageIndex,
      page: pageIndex,
    });

    setUsers(users);
  }, [perPageIndex, pageIndex]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Usuários</h1>
        <p className="text-muted-foreground">
          Lista dos usuários cadastrados no sistema.
        </p>
      </div>

      <Separator />

      <Card>
        <CardContent className="p-4">
          {!users ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-6 w-full" />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Admin</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users &&
                    users.data.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          {user.isAdmin ? (
                            <Badge variant="default">Sim</Badge>
                          ) : (
                            <Badge variant="outline">Não</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>

              <Pagination
                onPageChange={handlePagination}
                onPerPageChange={handlePerPagePagination}
                pageIndex={users.actualPage}
                perPageIndex={users.perPage}
                perPage={users.perPage}
                totalCount={users.amount}
                totalPages={users.totalPages}
                hasPerPage
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
