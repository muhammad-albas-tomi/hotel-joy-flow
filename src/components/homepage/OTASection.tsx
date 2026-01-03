import { Button } from '@/components/ui/button';
import { ExternalLink, Percent } from 'lucide-react';
import { otaLinks } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';

const OTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Direct Booking Promo */}
        <div className="bg-primary text-primary-foreground rounded-lg p-8 md:p-12 mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-foreground/10 mb-6">
            <Percent className="h-8 w-8" />
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
            Book Direct & Save 10%
          </h2>
          <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
            Get the best rates guaranteed when you book directly with us. Enjoy exclusive perks including free breakfast, room upgrades when available, and flexible cancellation.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => navigate('/booking')}
          >
            Book Direct Now
          </Button>
        </div>

        {/* OTA Links */}
        <div className="text-center">
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">Also Available On</p>
          <h3 className="font-serif text-2xl font-bold text-foreground mb-8">
            Our Partner Platforms
          </h3>
          
          <div className="flex flex-wrap justify-center gap-4">
            {otaLinks.map((ota) => (
              <Button
                key={ota.name}
                variant="outline"
                size="lg"
                className="min-w-[160px]"
                onClick={() => window.open(ota.url, '_blank')}
              >
                <span className="text-xl mr-2">{ota.logo}</span>
                {ota.name}
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OTASection;
