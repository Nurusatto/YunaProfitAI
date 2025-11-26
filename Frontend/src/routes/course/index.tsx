import { ContainerLayout } from "@/layout/container";
import { CoursePage } from "@/pages/Course";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/course/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ContainerLayout>
      <CoursePage />
    </ContainerLayout>
  );
}
