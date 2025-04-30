import { signIn } from "@/api/sign-in";
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
import { useAuth } from "@/context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const signInForm = z.object({
  email: z
    .string()
    .min(1, "Preencha este campo para continuar.")
    .email("E-mail inválido"),
  password: z.string().min(1, "Preencha este campo para continuar"),
});

type SignInFormType = z.infer<typeof signInForm>;

export function SignIn() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const form = useForm<SignInFormType>({
    resolver: zodResolver(signInForm),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: SignInFormType) {
    try {
      const auth = await signIn(data);

      login(auth.access_token, auth.user);
      form.reset();
      toast.success("Login realizado com sucesso!");
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);

      if (error instanceof AxiosError) {
        switch (error.status) {
          case 422:
            toast.error("Credenciais invalidas");
            break;
          case 400:
            toast.error("Erro ao cadastrar sua conta!");
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
            Faça seu login
          </h1>
          <p className="text-muted-foreground">
            Faça seu login para gerenciar seu restaurante
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
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
              Login
            </Button>
          </form>
        </Form>
        <p className="text-center">
          Não possui uma conta?{" "}
          <Link to={"/sign-up"} className="font-bold text-primary">
            Cadastre-se aqui
          </Link>
        </p>
      </div>
    </div>
  );
}
