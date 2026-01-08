import Footer from "@/components/homepage/Footer";
import Header from "@/components/homepage/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency, roomTypes } from "@/data/mockData";
import {
  AirVent,
  Bath,
  Coffee,
  Maximize,
  Refrigerator,
  Tv,
  Users,
  Wifi,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const amenityIcons: Record<string, React.ReactNode> = {
  "Free WiFi": <Wifi className="h-5 w-5" />,
  "Smart TV": <Tv className="h-5 w-5" />,
  TV: <Tv className="h-5 w-5" />,
  "Coffee Maker": <Coffee className="h-5 w-5" />,
  "Private Bathroom": <Bath className="h-5 w-5" />,
  "Air Conditioning": <AirVent className="h-5 w-5" />,
  "Mini Bar": <Refrigerator className="h-5 w-5" />,
};

const DetailRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);

  const room = roomTypes.find((r) => r.id === id);

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Room Not Found</h1>
          <Button onClick={() => navigate("/")}>Back to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <button
            onClick={() => navigate("/")}
            className="hover:text-foreground transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <button
            onClick={() => navigate("/#rooms")}
            className="hover:text-foreground transition-colors"
          >
            Rooms
          </button>
          <span>/</span>
          <span className="text-foreground font-medium">{room.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <img
                src={room.images[selectedImage]}
                alt={room.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <Badge
                  variant={room.available > 0 ? "default" : "destructive"}
                  className="text-sm px-3 py-1"
                >
                  {room.available > 0
                    ? `${room.available} Available`
                    : "Sold Out"}
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-4 ">
              {room.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-video   overflow-hidden rounded-lg border-2 transition-all ${
                    selectedImage === index
                      ? "border-primary"
                      : "border-transparent hover:border-muted-foreground"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${room.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Room Details */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-3" variant="secondary">
                {room.category}
              </Badge>
              <h1 className="font-serif text-4xl font-bold text-foreground mb-4">
                {room.name}
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {room.description}
              </p>
            </div>

            {/* Room Info Cards */}
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">{room.capacity} Guests</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Maximize className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">{room.size} m²</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-primary mb-1">
                    {formatCurrency(room.price)}
                  </p>
                  <p className="text-xs text-muted-foreground">per night</p>
                </CardContent>
              </Card>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="font-serif text-2xl font-semibold mb-4">
                Amenities
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {room.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/30"
                  >
                    <div className="text-primary">
                      {amenityIcons[amenity] || <Wifi className="h-5 w-5" />}
                    </div>
                    <span className="text-sm">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                size="lg"
                className="flex-1"
                disabled={room.available === 0}
                onClick={() => navigate("/booking")}
              >
                {room.available === 0 ? "Sold Out" : "Book Now"}
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/")}>
                Back
              </Button>
            </div>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Check-in Time</h3>
                  <p className="text-sm text-muted-foreground">From 14:00</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Check-out Time</h3>
                  <p className="text-sm text-muted-foreground">Until 12:00</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Free Cancellation</h3>
                  <p className="text-sm text-muted-foreground">
                    Up to 24 hours
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DetailRoom;
