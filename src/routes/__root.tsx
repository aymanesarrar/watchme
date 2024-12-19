import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex flex-col border-solid border-2 border-black w-full">
          <SidebarTrigger />
          <Outlet />
        </main>
      </SidebarProvider>
    </>
  ),
});
