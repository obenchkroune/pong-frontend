import { cn } from "@/lib/utils";
import Button from "./Button";

const navLinks = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/play",
    label: "Play",
  },
  {
    href: "/leaderboard",
    label: "Leaderboard",
  },
  {
    href: "/profile",
    label: "Profile",
  },
];

export default () => {
  return (
    <nav className="bg-background border-b mb-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center py-4">
          <div className="flex-shrink-0 flex items-center">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              className="text-primary"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="8" />
              <path d="M18 12a6 6 0 0 0-12 0" />
            </svg>
            <span className="ml-2 text-xl font-bold text-foreground">
              Transcend
            </span>
          </div>
          <div className="hidden md:block grow ms-4">
            <div className="flex items-baseline space-x-2">
              {navLinks.map((link) => (
                <a
                  href={link.href}
                  className={cn(
                    "hover:text-primary px-3 py-2 rounded-md text-sm font-medium",
                    window.location.pathname === link.href
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div className="ms-auto flex items-center md:ml-6">
            <Button href="/sign-in">Sign In</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
