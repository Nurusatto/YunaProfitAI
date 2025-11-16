import { MainLayout } from "@/layout/main";
import { AiPage } from "@/pages/AI";
import { Header } from "@/widget/Header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/AI/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MainLayout>
      <Header />
      <AiPage />
    </MainLayout>
  );
}
