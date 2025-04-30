import { Link, useRouteError } from "react-router-dom";

export function Error() {
  const error = useRouteError() as Error;

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">Whoops, algo aconteceu...</h1>
      <p className="accent-foreground ">
        um erro aconteceu na aplacação, abaixo você encontra mais detalhes
      </p>
      <pre>{error?.message || JSON.stringify(error)}</pre>
      <p className="text-accent-foreground">
        Voltar para a{" "}
        <Link to={"/"} className="text-primary font-bold">
          Página inicial
        </Link>
      </p>
    </div>
  );
}
