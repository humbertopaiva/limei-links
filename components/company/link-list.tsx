import { Link } from "@/lib/api";
import { Button } from "@/components/ui/button";

interface LinkListProps {
  links: Link[];
}

export function LinkList({ links }: LinkListProps) {
  if (links.length === 0) return null;

  return (
    <div className="space-y-4">
      {links
        .sort((a, b) => a.ordem - b.ordem)
        .map((link) => (
          <Button
            key={link.url}
            variant="secondary"
            className="w-full text-lg py-6 hover:scale-105 transition-transform"
            asChild
          >
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              {link.texto}
            </a>
          </Button>
        ))}
    </div>
  );
}