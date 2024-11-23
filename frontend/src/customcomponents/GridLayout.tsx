import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

interface GridItem {
  id: string;
  title: string;
  summary: string;
  image: string;
  date: string;
  category: string;
  brandingLogo?: string;
}

interface GridLayoutProps {
  items: GridItem[];
}

export function GridLayout({ items }: GridLayoutProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, index) => (
        <Card
          key={item.id}
          className={`overflow-hidden ${
            index === 0 ? "md:col-span-2 md:row-span-2" : ""
          }`}
        >
          <div
            className={`relative ${
              index === 0 ? "aspect-video" : "aspect-square"
            }`}
          >
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 object-cover w-full h-full"
            />
            {item.brandingLogo && (
              <img
                src={item.brandingLogo}
                alt="Branding"
                className="absolute bottom-2 right-2 w-8 h-8"
              />
            )}
          </div>
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">{item.category}</span>
              <span className="text-sm text-muted-foreground">
                {formatDate(item.date)}
              </span>
            </div>
            <CardTitle
              className={`${index === 0 ? "text-2xl" : "text-lg"} line-clamp-2`}
            >
              {item.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p
              className={`text-muted-foreground ${
                index === 0 ? "line-clamp-4" : "line-clamp-2"
              }`}
            >
              {item.summary}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
