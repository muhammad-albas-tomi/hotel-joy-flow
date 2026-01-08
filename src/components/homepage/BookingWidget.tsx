import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { addDays, format } from "date-fns";
import { CalendarIcon, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BookingWidget = () => {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState<Date | undefined>(
    addDays(new Date(), 1)
  );
  const [checkOut, setCheckOut] = useState<Date | undefined>(
    addDays(new Date(), 2)
  );
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");
  const [rooms, setRooms] = useState("1");

  const handleSearch = () => {
    const params = new URLSearchParams({
      checkIn: checkIn ? format(checkIn, "yyyy-MM-dd") : "",
      checkOut: checkOut ? format(checkOut, "yyyy-MM-dd") : "",
      adults,
      children,
      rooms,
    });
    navigate(`/booking?${params.toString()}`);
  };

  return (
    <section className="relative z-20 -mt-24 md:-mt-28 px-4">
      <div className="container mx-auto">
        <div className="bg-card rounded-lg shadow-xl p-6 md:p-8 border border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Check-in Date */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Check-in
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !checkIn && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkIn ? format(checkIn, "MMM dd, yyyy") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={checkIn}
                    onSelect={setCheckIn}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Check-out Date */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Check-out
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !checkOut && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkOut
                      ? format(checkOut, "MMM dd, yyyy")
                      : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={checkOut}
                    onSelect={setCheckOut}
                    disabled={(date) => date <= (checkIn || new Date())}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Adults */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Adults
              </label>
              <Select value={adults} onValueChange={setAdults}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? "Adult" : "Adults"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Children */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Children
              </label>
              <Select value={children} onValueChange={setChildren}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[0, 1, 2, 3, 4].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? "Child" : "Children"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Rooms */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Rooms
              </label>
              <Select value={rooms} onValueChange={setRooms}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? "Room" : "Rooms"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Search Button */}
            <div className="lg:col-span-1 flex items-end">
              <Button className="w-full h-10" onClick={handleSearch}>
                <Search className="mr-2 h-4 w-4" />
                Check Availability
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingWidget;
