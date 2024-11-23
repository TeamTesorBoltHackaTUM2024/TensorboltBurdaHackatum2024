import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SearchAndFilter() {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <Select defaultValue="all">
        <SelectTrigger className="w-full md:w-[200px]">
          <SelectValue placeholder="All areas" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All areas</SelectItem>
          <SelectItem value="news">News</SelectItem>
          <SelectItem value="brands">Brands</SelectItem>
          <SelectItem value="media">Media</SelectItem>
        </SelectContent>
      </Select>
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search..." className="pl-10" />
      </div>
    </div>
  );
}
