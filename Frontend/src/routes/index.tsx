import { Home } from "@/pages/Home";
import { ProtectRoute } from "@/shared/hooks/useProtectRoute";
import { Header } from "@/widget/Header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  beforeLoad: () => ProtectRoute(),
});

function RouteComponent() {
  return (
    <>
      <Header />
      <Home />
    </>
  );
}
