import { createAccount } from "@/api/create-account";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const signUpForm = z.object({
  name: z.string().min(1, "Preencha este campo para continuar."),
  email: z
    .string()
    .min(1, "Preencha este campo para continuar.")
    .email("E-mail inválido"),
  password: z.string().min(1, "Preencha este campo para continuar"),
});

type SignUpFormType = z.infer<typeof signUpForm>;

export function SignUp() {
  const form = useForm<SignUpFormType>({
    resolver: zodResolver(signUpForm),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  async function onSubmit(data: SignUpFormType) {
    try {
      await createAccount(data);
      toast.success("Conta criada com sucesso!", {
        action: {
          label: "Login",
          onClick: () => {
            navigate(`/sign-in`);
          },
        },
      });

      form.reset();
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        switch (error.status) {
          case 400:
            toast.error("Erro ao cadastrar sua conta!");
            break;
          case 409:
            toast.error("Esse e-mail já está em uso!");
            break;
        }
        return;
      }

      toast.error("Erro ao cadastrar sua conta!");
    }
  }

  useEffect(() => {
    form.reset();
  }, [form]);

  return (
    <div className="p-8">
      <div className="w-[350px] flex flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-4xl font-semibold tracking-tight">
            Faça seu cadastro
          </h1>
          <p className="text-muted-foreground">
            Faça seu cadastro para começar a gerenciar seus restaurantes
          </p>
        </div>
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
                      <Input placeholder="Digite seu nome..." {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu e-mail..." {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite sua senha..."
                        type="password"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full text-white font-bold">
              Cadastrar
            </Button>
          </form>
        </Form>
        <p className="text-center">
          Já possui uma conta?{" "}
          <Link to={"/sign-in"} className="font-bold text-primary">
            Faça seu login aqui
          </Link>
        </p>
      </div>
    </div>
  );
}
