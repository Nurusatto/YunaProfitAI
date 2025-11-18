import { Home } from "@/pages/Home";
import { Header } from "@/widget/Header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Header />
      <Home />
    </>
  );
}
