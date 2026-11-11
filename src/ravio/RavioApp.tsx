import { lazy, Suspense } from "react";
import { ClientOnly } from "@tanstack/react-router";

const App = lazy(() => import("./App"));

export function RavioApp() {
  return (
    <ClientOnly fallback={<div className="min-h-screen" />}>
      <Suspense fallback={<div className="min-h-screen" />}>
        <App />
      </Suspense>
    </ClientOnly>
  );
}
