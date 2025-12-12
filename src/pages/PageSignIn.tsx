import { Input } from "../components/Input";
import { PrimaryButton } from "../components/PrimaryButton";
import { IconLogIn } from "../icons/IconLogIn";
import { WrapperDelimiter } from "../wrappers/WrapperDelimiter";
import type { TargetedEvent } from "preact";
import { ServiceAuth } from "../services/ServiceAuth";
import { isLoadingUser, user } from "../stores/session";
import { route } from "preact-router";
import { ROUTES } from "../lib/constants/routes";

export const PageSignIn = () => {
  const onSubmit = async (e: TargetedEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    const entries = Object.fromEntries(new FormData(e.currentTarget));
    if (
      typeof entries.email !== "string" ||
      typeof entries.password !== "string"
    ) {
      return;
    }
    isLoadingUser.value = true;
    const { data, ok, error } = await ServiceAuth.signIn(
      entries.email.trim(),
      entries.password.trim(),
    );
    isLoadingUser.value = false;
    error && console.error(error);
    if (ok && data) {
      user.value = data;
      route(ROUTES.root.path);
      return;
    }
  };
  return (
    <WrapperDelimiter
      as="main"
      className="min-h-screen flex flex-col justify-center relative"
    >
      <form onSubmit={onSubmit}>
        <Input
          className="mb-6"
          label="Correo"
          id="email"
          name="email"
          type="email"
          autoComplete="on"
          disabled={isLoadingUser.value}
        />
        <Input
          className="mb-6"
          label="Contraseña"
          id="password"
          name="password"
          type="password"
          autoComplete="on"
          disabled={isLoadingUser.value}
        />
        <PrimaryButton className="ml-auto" disabled={isLoadingUser.value}>
          <IconLogIn strokeWidth={2} />
          <span>Iniciar sesión</span>
        </PrimaryButton>
      </form>
    </WrapperDelimiter>
  );
};
