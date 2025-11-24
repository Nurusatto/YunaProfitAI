import { AiPage } from "@/pages/AI";
import { ProtectRoute } from "@/shared/hooks/useProtectRoute";
import { Header } from "@/widget/Header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/AI/")({
  component: RouteComponent,
  beforeLoad: () => ProtectRoute(),
});

function RouteComponent() {
  return (
    <>
      <Header />
      <AiPage />
    </>
  );
}
