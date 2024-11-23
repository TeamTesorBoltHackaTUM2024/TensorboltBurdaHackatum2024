import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PhoneCall, Mail } from "lucide-react";

export function MediaLibrary() {
  return (
    <Card className="bg-cyan-100 mb-4">
      <CardHeader>
        <CardTitle className="text-black font-bold">Media Library</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-black">Access our comprehensive media resources.</p>
        <Button className="mt-4 bg-black text-white hover:bg-black/90">
          Explore Library
        </Button>
      </CardContent>
    </Card>
  );
}

export function ContactPerson() {
  return (
    <Card className="bg-yellow-100 mb-4">
      <CardHeader>
        <CardTitle className="text-black font-bold">Contact Person</CardTitle>
      </CardHeader>
      <CardContent className="text-black">
        <p className="mb-2">Jane Doe</p>
        <p className="mb-2">Media Relations</p>
        <div className="flex items-center mb-2">
          <PhoneCall className="mr-2 h-4 w-4" />
          <span>+1 234 567 890</span>
        </div>
        <div className="flex items-center">
          <Mail className="mr-2 h-4 w-4" />
          <span>jane.doe@burdamedia.com</span>
        </div>
      </CardContent>
    </Card>
  );
}

export function Podcast() {
  return (
    <Card className="bg-teal-100 mb-4">
      <CardHeader>
        <CardTitle className="text-black font-bold">Latest Podcast</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-black mb-2">Listen to our latest episode:</p>
        <p className="text-black font-semibold mb-4">"The Future of Media"</p>
        <Button className="bg-black text-white hover:bg-black/90">
          Listen Now
        </Button>
      </CardContent>
    </Card>
  );
}

export function Questions() {
  return (
    <Card className="border-cyan-500 border-2">
      <CardHeader>
        <CardTitle className="text-black font-bold">Questions?</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-black mb-2">Corporate Communications</p>
        <p className="text-black mb-2">press@burda.com</p>
        <p className="text-black">+49 89 9250-2575</p>
      </CardContent>
    </Card>
  );
}

export function RightSidebar() {
  return (
    <div className="w-full lg:w-64 space-y-4">
      <MediaLibrary />
      <ContactPerson />
      <Podcast />
      <Questions />
    </div>
  );
}
