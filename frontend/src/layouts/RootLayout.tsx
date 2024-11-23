import { Outlet, Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function RootLayout() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">Hubert Burda Media</span>
          </Link>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
            <nav className="hidden md:flex items-center space-x-4">
              <Link
                to="/"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary"
                )}
              >
                Home
              </Link>
              <Link
                to="/news"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary"
                )}
              >
                News
              </Link>
              <Link
                to="/brands"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary"
                )}
              >
                Brands
              </Link>
              <Link
                to="/ai-generator"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary"
                )}
              >
                AI Generator
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t">
        <div className="container flex flex-col md:flex-row items-center justify-between py-10 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Hubert Burda Media
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/privacy"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
