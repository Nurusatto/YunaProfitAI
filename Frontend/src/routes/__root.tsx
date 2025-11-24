import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Check } from "@/shared/hooks/useStateCheck";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  Check();
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
}
