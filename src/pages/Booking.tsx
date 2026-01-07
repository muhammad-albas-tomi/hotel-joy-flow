import Footer from "@/components/homepage/Footer";
import Header from "@/components/homepage/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency, hotelInfo, roomTypes } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { addDays, differenceInDays, format } from "date-fns";
import {
  ArrowLeft,
  ArrowRight,
  Bath,
  CalendarIcon,
  Check,
  Coffee,
  CreditCard,
  Maximize,
  Tv,
  Users,
  Wifi,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const amenityIcons: Record<string, React.ReactNode> = {
  "Free WiFi": <Wifi className="h-4 w-4" />,
  "Smart TV": <Tv className="h-4 w-4" />,
  TV: <Tv className="h-4 w-4" />,
  "Coffee Maker": <Coffee className="h-4 w-4" />,
  "Private Bathroom": <Bath className="h-4 w-4" />,
};

type BookingStep = "room" | "guest" | "payment" | "confirmation";

const Booking = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();

  const [step, setStep] = useState<BookingStep>("room");
  const [checkIn, setCheckIn] = useState<Date | undefined>(
    searchParams.get("checkIn")
      ? new Date(searchParams.get("checkIn")!)
      : addDays(new Date(), 1)
  );
  const [checkOut, setCheckOut] = useState<Date | undefined>(
    searchParams.get("checkOut")
      ? new Date(searchParams.get("checkOut")!)
      : addDays(new Date(), 2)
  );
  const [adults, setAdults] = useState(searchParams.get("adults") || "2");
  const [children, setChildren] = useState(searchParams.get("children") || "0");
  const [selectedRoom, setSelectedRoom] = useState<
    (typeof roomTypes)[0] | null
  >(null);
  const [guestInfo, setGuestInfo] = useState({
    name: "",
    email: "",
    phone: "",
    idNumber: "",
    specialRequests: "",
  });
  const [bookingId, setBookingId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const nights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 1;
  const totalPrice = selectedRoom ? selectedRoom.price * nights : 0;
  const taxAmount = Math.round(totalPrice * 0.11);
  const serviceCharge = Math.round(totalPrice * 0.05);
  const grandTotal = totalPrice + taxAmount + serviceCharge;

  // Auto-select room from URL param
  useEffect(() => {
    const roomTypeId = searchParams.get("roomType");
    if (roomTypeId) {
      const room = roomTypes.find((r) => r.id === roomTypeId);
      if (room) setSelectedRoom(room);
    }
  }, [searchParams]);

  const handleGuestInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setGuestInfo({ ...guestInfo, [e.target.name]: e.target.value });
  };

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      const id = "BK" + Math.random().toString(36).substr(2, 6).toUpperCase();
      setBookingId(id);
      setStep("confirmation");
      setIsProcessing(false);
      toast({
        title: "Booking Confirmed!",
        description: `Your booking ID is ${id}`,
      });
    }, 2000);
  };

  const steps = [
    { id: "room", label: "Select Room" },
    { id: "guest", label: "Guest Info" },
    { id: "payment", label: "Payment" },
    { id: "confirmation", label: "Confirmation" },
  ];

  const canProceed = () => {
    if (step === "room") return selectedRoom !== null;
    if (step === "guest")
      return (
        guestInfo.name &&
        guestInfo.email &&
        guestInfo.phone &&
        guestInfo.idNumber
      );
    return true;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20 pb-12 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            {steps.map((s, index) => (
              <div key={s.id} className="flex items-center">
                <div
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium",
                    step === s.id
                      ? "bg-primary text-primary-foreground"
                      : steps.findIndex((st) => st.id === step) > index
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {steps.findIndex((st) => st.id === step) > index ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={cn(
                    "ml-2 text-sm hidden sm:inline",
                    step === s.id
                      ? "font-medium text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {s.label}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "w-8 sm:w-16 h-0.5 mx-2",
                      steps.findIndex((st) => st.id === step) > index
                        ? "bg-primary"
                        : "bg-muted"
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Step 1: Room Selection */}
              {step === "room" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Select Your Room</CardTitle>
                    <div className="flex flex-wrap gap-4 mt-4">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="justify-start">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {checkIn ? format(checkIn, "MMM dd") : "Check-in"}
                            {" - "}
                            {checkOut
                              ? format(checkOut, "MMM dd")
                              : "Check-out"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <div className="flex">
                            <div className="p-2">
                              <p className="text-sm font-medium mb-2">
                                Check-in
                              </p>
                              <Calendar
                                mode="single"
                                selected={checkIn}
                                onSelect={setCheckIn}
                                disabled={(date) => date < new Date()}
                              />
                            </div>
                            <div className="p-2 border-l">
                              <p className="text-sm font-medium mb-2">
                                Check-out
                              </p>
                              <Calendar
                                mode="single"
                                selected={checkOut}
                                onSelect={setCheckOut}
                                disabled={(date) =>
                                  date <= (checkIn || new Date())
                                }
                              />
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <Select value={adults} onValueChange={setAdults}>
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5, 6].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num} Adults
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select value={children} onValueChange={setChildren}>
                          <SelectTrigger className="w-28">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[0, 1, 2, 3, 4].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num} Children
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {roomTypes.map((room) => (
                      <div
                        key={room.id}
                        className={cn(
                          "border rounded-lg p-4 cursor-pointer transition-all",
                          selectedRoom?.id === room.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        )}
                        onClick={() => setSelectedRoom(room)}
                      >
                        <div className="flex flex-col md:flex-row gap-4">
                          <img
                            src={room.images[0]}
                            alt={room.name}
                            className="w-full md:w-48 h-32 object-cover rounded-md"
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-semibold text-lg">
                                  {room.name}
                                </h3>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                  <span className="flex items-center gap-1">
                                    <Users className="h-4 w-4" />
                                    {room.capacity} Guests
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Maximize className="h-4 w-4" />
                                    {room.size} m²
                                  </span>
                                </div>
                              </div>
                              <Badge
                                variant={
                                  room.available > 0
                                    ? "secondary"
                                    : "destructive"
                                }
                              >
                                {room.available > 0
                                  ? `${room.available} left`
                                  : "Sold Out"}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                              {room.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-3">
                              {room.amenities.slice(0, 4).map((amenity) => (
                                <span
                                  key={amenity}
                                  className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded"
                                >
                                  {amenityIcons[amenity] || null}
                                  {amenity}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-primary">
                              {formatCurrency(room.price)}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              per night
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Guest Information */}
              {step === "guest" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Guest Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="John Doe"
                          value={guestInfo.name}
                          onChange={handleGuestInfoChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          value={guestInfo.email}
                          onChange={handleGuestInfoChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+62 812 3456 7890"
                          value={guestInfo.phone}
                          onChange={handleGuestInfoChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="idNumber">
                          ID Number (KTP/Passport) *
                        </Label>
                        <Input
                          id="idNumber"
                          name="idNumber"
                          placeholder="1234567890123456"
                          value={guestInfo.idNumber}
                          onChange={handleGuestInfoChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="specialRequests">
                        Special Requests (Optional)
                      </Label>
                      <Textarea
                        id="specialRequests"
                        name="specialRequests"
                        placeholder="Early check-in, extra bed, dietary requirements..."
                        value={guestInfo.specialRequests}
                        onChange={handleGuestInfoChange}
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 3: Payment */}
              {step === "payment" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Payment
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-muted/50 rounded-lg p-6 text-center">
                      <p className="text-muted-foreground mb-4">
                        Secure payment integration with Stripe requires Cloud
                        activation.
                      </p>
                      <p className="text-sm text-muted-foreground mb-6">
                        For demo purposes, click "Complete Booking" to simulate
                        a successful payment.
                      </p>
                      <Button
                        onClick={handlePayment}
                        disabled={isProcessing}
                        size="lg"
                      >
                        {isProcessing
                          ? "Processing..."
                          : `Pay ${formatCurrency(grandTotal)}`}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 4: Confirmation */}
              {step === "confirmation" && (
                <Card>
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">
                      Booking Confirmed!
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-muted rounded-lg p-6 text-center">
                      <p className="text-sm text-muted-foreground mb-1">
                        Booking Reference
                      </p>
                      <p className="text-3xl font-mono font-bold text-primary">
                        {bookingId}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold">Booking Details</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Guest Name</p>
                          <p className="font-medium">{guestInfo.name}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Room Type</p>
                          <p className="font-medium">{selectedRoom?.name}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Check-in</p>
                          <p className="font-medium">
                            {checkIn
                              ? format(checkIn, "EEEE, MMM dd, yyyy")
                              : "-"}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Check-out</p>
                          <p className="font-medium">
                            {checkOut
                              ? format(checkOut, "EEEE, MMM dd, yyyy")
                              : "-"}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Guests</p>
                          <p className="font-medium">
                            {adults} Adults, {children} Children
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Total Paid</p>
                          <p className="font-medium text-primary">
                            {formatCurrency(grandTotal)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">
                        A confirmation email has been sent to{" "}
                        <strong>{guestInfo.email}</strong> with your booking
                        details and invoice.
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => window.print()}
                      >
                        Print Invoice
                      </Button>
                      <Button className="flex-1" onClick={() => navigate("/")}>
                        Back to Home
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Booking Summary Sidebar */}
            {step !== "confirmation" && (
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle className="text-lg">Booking Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedRoom ? (
                      <>
                        <img
                          src={selectedRoom.images[0]}
                          alt={selectedRoom.name}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="font-semibold">{selectedRoom.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {hotelInfo.name}
                          </p>
                        </div>
                        <Separator />
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Check-in
                            </span>
                            <span>
                              {checkIn ? format(checkIn, "MMM dd, yyyy") : "-"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Check-out
                            </span>
                            <span>
                              {checkOut
                                ? format(checkOut, "MMM dd, yyyy")
                                : "-"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Nights
                            </span>
                            <span>{nights}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Guests
                            </span>
                            <span>
                              {adults} Adults, {children} Children
                            </span>
                          </div>
                        </div>
                        <Separator />
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              {formatCurrency(selectedRoom.price)} x {nights}{" "}
                              nights
                            </span>
                            <span>{formatCurrency(totalPrice)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Tax (11%)
                            </span>
                            <span>{formatCurrency(taxAmount)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Service (5%)
                            </span>
                            <span>{formatCurrency(serviceCharge)}</span>
                          </div>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-semibold text-lg">
                          <span>Total</span>
                          <span className="text-primary">
                            {formatCurrency(grandTotal)}
                          </span>
                        </div>
                      </>
                    ) : (
                      <p className="text-muted-foreground text-center py-8">
                        Select a room to see the summary
                      </p>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex gap-2 pt-4">
                      {step !== "room" && (
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => {
                            if (step === "guest") setStep("room");
                            if (step === "payment") setStep("guest");
                          }}
                        >
                          <ArrowLeft className="h-4 w-4 mr-2" />
                          Back
                        </Button>
                      )}
                      {step !== "payment" && (
                        <Button
                          className="flex-1"
                          disabled={!canProceed()}
                          onClick={() => {
                            if (step === "room") setStep("guest");
                            if (step === "guest") setStep("payment");
                          }}
                        >
                          Continue
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Booking;
