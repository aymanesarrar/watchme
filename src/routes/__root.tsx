import { AppSidebar } from "@/components/app-sidebar";
import { CreateReport } from "@/components/create-report";
import { ModeToggle } from "@/components/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <SidebarProvider>
          <AppSidebar />
          <Toaster />
          <main className="flex flex-col w-full">
            <div className="flex justify-between px-2 items-center">
              <SidebarTrigger />
              <div className="flex items-center gap-2">
                <CreateReport />
                <ModeToggle />
              </div>
            </div>

            <Outlet />
          </main>
        </SidebarProvider>
      </ThemeProvider>
    </>
  ),
});
