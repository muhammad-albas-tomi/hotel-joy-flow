import { MapPin, Phone, Mail, MessageCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { hotelInfo } from '@/data/mockData';

const LocationSection = () => {
  return (
    <section id="location" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">Find Us</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Location & Contact
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Conveniently located in the heart of Jakarta, we're easily accessible from major attractions and business districts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map */}
          <div className="rounded-lg overflow-hidden h-[400px] border border-border">
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d${hotelInfo.coordinates.lng}!3d${hotelInfo.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTInMzEuNyJTIDEwNsKwNTAnNDQuMiJF!5e0!3m2!1sen!2sid!4v1234567890`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Hotel Location"
            />
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="font-serif text-xl font-semibold text-foreground mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Address</p>
                    <p className="text-muted-foreground">{hotelInfo.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Phone</p>
                    <a href={`tel:${hotelInfo.phone}`} className="text-muted-foreground hover:text-primary">
                      {hotelInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <a href={`mailto:${hotelInfo.email}`} className="text-muted-foreground hover:text-primary">
                      {hotelInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">WhatsApp</p>
                    <a 
                      href={`https://wa.me/${hotelInfo.whatsapp.replace(/\s/g, '')}`} 
                      className="text-muted-foreground hover:text-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {hotelInfo.whatsapp}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Check-in / Check-out</p>
                    <p className="text-muted-foreground">
                      Check-in: {hotelInfo.checkInTime} | Check-out: {hotelInfo.checkOutTime}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Button 
              size="lg" 
              className="w-full"
              onClick={() => window.open(`https://wa.me/${hotelInfo.whatsapp.replace(/\s/g, '')}`, '_blank')}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Chat with Us on WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
