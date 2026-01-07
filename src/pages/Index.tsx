import BookingWidget from "@/components/homepage/BookingWidget";
import FacilitiesSection from "@/components/homepage/FacilitiesSection";
import Footer from "@/components/homepage/Footer";
import Header from "@/components/homepage/Header";
import HeroSection from "@/components/homepage/HeroSection";
import LocationSection from "@/components/homepage/LocationSection";
import OTASection from "@/components/homepage/OTASection";
import RoomShowcase from "@/components/homepage/RoomShowcase";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <BookingWidget />
        <RoomShowcase />
        <FacilitiesSection />
        <LocationSection />
        <OTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
