import { 
  Wifi, 
  Waves, 
  UtensilsCrossed, 
  Dumbbell, 
  Sparkles, 
  Car, 
  Clock, 
  ConciergeBell, 
  Shirt, 
  Plane, 
  Briefcase, 
  Users 
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Wifi: <Wifi className="h-8 w-8" />,
  Waves: <Waves className="h-8 w-8" />,
  UtensilsCrossed: <UtensilsCrossed className="h-8 w-8" />,
  Dumbbell: <Dumbbell className="h-8 w-8" />,
  Sparkles: <Sparkles className="h-8 w-8" />,
  Car: <Car className="h-8 w-8" />,
  Clock: <Clock className="h-8 w-8" />,
  ConciergeBell: <ConciergeBell className="h-8 w-8" />,
  Shirt: <Shirt className="h-8 w-8" />,
  Plane: <Plane className="h-8 w-8" />,
  Briefcase: <Briefcase className="h-8 w-8" />,
  Users: <Users className="h-8 w-8" />,
};

const facilities = [
  { name: 'Free WiFi', icon: 'Wifi', description: 'High-speed internet throughout the hotel' },
  { name: 'Swimming Pool', icon: 'Waves', description: 'Outdoor infinity pool with city views' },
  { name: 'Restaurant', icon: 'UtensilsCrossed', description: 'Fine dining with international cuisine' },
  { name: 'Fitness Center', icon: 'Dumbbell', description: '24/7 gym with modern equipment' },
  { name: 'Spa & Wellness', icon: 'Sparkles', description: 'Relaxing spa treatments and therapies' },
  { name: 'Free Parking', icon: 'Car', description: 'Secure parking for all guests' },
  { name: '24/7 Reception', icon: 'Clock', description: 'Round-the-clock front desk service' },
  { name: 'Room Service', icon: 'ConciergeBell', description: 'In-room dining available 24/7' },
  { name: 'Laundry', icon: 'Shirt', description: 'Same-day laundry and dry cleaning' },
  { name: 'Airport Shuttle', icon: 'Plane', description: 'Convenient airport transfer service' },
  { name: 'Business Center', icon: 'Briefcase', description: 'Fully equipped business facilities' },
  { name: 'Meeting Rooms', icon: 'Users', description: 'Conference rooms for events' },
];

const FacilitiesSection = () => {
  return (
    <section id="facilities" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">Amenities</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Hotel Facilities
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Enjoy our world-class amenities designed to make your stay comfortable and memorable.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {facilities.map((facility) => (
            <div 
              key={facility.name} 
              className="group text-center p-6 rounded-lg border border-border hover:border-primary hover:shadow-md transition-all"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted group-hover:bg-primary/10 text-muted-foreground group-hover:text-primary transition-colors mb-4">
                {iconMap[facility.icon]}
              </div>
              <h3 className="font-medium text-foreground text-sm mb-1">{facility.name}</h3>
              <p className="text-xs text-muted-foreground hidden md:block">{facility.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FacilitiesSection;
