import { createFileRoute } from "@tanstack/react-router";
import { AutorizationPage } from "@/pages/Autorization/auth";

export const Route = createFileRoute("/auth/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <AutorizationPage />;
}
