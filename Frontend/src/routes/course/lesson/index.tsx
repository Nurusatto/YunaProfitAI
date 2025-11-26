import { ContainerLayout } from "@/layout/container";
import { LessonPage } from "@/pages/Lesson";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/course/lesson/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ContainerLayout>
      <LessonPage />
    </ContainerLayout>
  );
}
