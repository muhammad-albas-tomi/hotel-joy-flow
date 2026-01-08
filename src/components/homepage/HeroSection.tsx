import { Button } from "@/components/ui/button";
import { hotelInfo } from "@/data/mockData";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const heroImages = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920",
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1920",
  "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1920",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920",
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  const prevSlide = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + heroImages.length) % heroImages.length
    );

  return (
    <section className="relative z-10 h-screen min-h-[600px] overflow-hidden">
      {/* Background Images */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute  z-[1] inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={image}
            alt={`Hotel view ${index + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/70" />
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-[99] p-2 rounded-full bg-background/20 hover:bg-background/40 text-primary-foreground transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-[99] p-2 rounded-full bg-background/20 hover:bg-background/40 text-primary-foreground transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-32 md:bottom-40 left-1/2 -translate-x-1/2 z-[99] flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full  transition-all ${
              index === currentSlide
                ? "bg-primary-foreground w-8"
                : "bg-primary-foreground/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center px-4 max-w-4xl">
          <p className="text-primary-foreground/80 text-sm md:text-base tracking-widest uppercase mb-4">
            Welcome to
          </p>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-4">
            {hotelInfo.name}
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 font-light">
            {hotelInfo.tagline}
          </p>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto mb-8 hidden md:block">
            {hotelInfo.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="text-lg px-8"
              onClick={() => navigate("/booking")}
            >
              Book Your Stay
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-foreground"
              onClick={() =>
                document
                  .getElementById("rooms")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore Rooms
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
