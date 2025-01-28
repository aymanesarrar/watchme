import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="border-solid border-2 border-black h-full">
      <h1>shoofoni</h1>
    </div>
  );
}
