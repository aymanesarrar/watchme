import { AppSidebar } from "@/components/app-sidebar";
import { CreateReport } from "@/components/create-report";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <SidebarProvider>
        <AppSidebar />
        <Toaster />
        <main className="flex flex-col w-full">
          <div className="flex justify-between px-2">
            <SidebarTrigger />
            <CreateReport />
          </div>

          <Outlet />
        </main>
      </SidebarProvider>
    </>
  ),
});
