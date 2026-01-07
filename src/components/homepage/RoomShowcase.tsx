import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency, roomTypes } from "@/data/mockData";
import { Bath, Coffee, Maximize, Tv, Users, Wifi } from "lucide-react";
import { useNavigate } from "react-router-dom";

const amenityIcons: Record<string, React.ReactNode> = {
  "Free WiFi": <Wifi className="h-4 w-4" />,
  "Smart TV": <Tv className="h-4 w-4" />,
  TV: <Tv className="h-4 w-4" />,
  "Coffee Maker": <Coffee className="h-4 w-4" />,
  "Private Bathroom": <Bath className="h-4 w-4" />,
};

const RoomShowcase = () => {
  const navigate = useNavigate();

  return (
    <section id="rooms" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">
            Accommodations
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Rooms & Suites
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose from our selection of elegantly designed rooms, each offering
            comfort, style, and modern amenities for an unforgettable stay.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roomTypes.map((room) => (
            <Card
              key={room.id}
              className="group overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={room.images[0]}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <Badge
                    variant={room.available > 0 ? "default" : "destructive"}
                  >
                    {room.available > 0
                      ? `${room.available} Available`
                      : "Sold Out"}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-serif text-xl font-semibold text-foreground">
                    {room.name}
                  </h3>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">
                      {formatCurrency(room.price)}
                    </p>
                    <p className="text-xs text-muted-foreground">per night</p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {room.description}
                </p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{room.capacity} Guests</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Maximize className="h-4 w-4" />
                    <span>{room.size} m²</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {room.amenities.slice(0, 4).map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded"
                    >
                      {amenityIcons[amenity] || null}
                      <span>{amenity}</span>
                    </div>
                  ))}
                  {room.amenities.length > 4 && (
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                      +{room.amenities.length - 4} more
                    </span>
                  )}
                </div>

                <Button
                  className="w-full"
                  disabled={room.available === 0}
                  onClick={() => navigate(`/detail/${room.id}`)}
                >
                  Detail
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoomShowcase;
