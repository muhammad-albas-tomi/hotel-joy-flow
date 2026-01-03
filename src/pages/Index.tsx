import Header from '@/components/homepage/Header';
import HeroSection from '@/components/homepage/HeroSection';
import BookingWidget from '@/components/homepage/BookingWidget';
import RoomShowcase from '@/components/homepage/RoomShowcase';
import FacilitiesSection from '@/components/homepage/FacilitiesSection';
import LocationSection from '@/components/homepage/LocationSection';
import OTASection from '@/components/homepage/OTASection';
import Footer from '@/components/homepage/Footer';

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
