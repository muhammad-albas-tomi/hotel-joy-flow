import { Link } from 'react-router-dom';
import { hotelInfo } from '@/data/mockData';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Hotel Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary-foreground rounded-lg flex items-center justify-center">
                <span className="text-primary font-serif font-bold text-xl">G</span>
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg">{hotelInfo.name}</h3>
                <p className="text-xs text-primary-foreground/70">{hotelInfo.tagline}</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm mb-4">
              {hotelInfo.description}
            </p>
            <div className="flex gap-4">
              <a 
                href={`https://facebook.com/${hotelInfo.socialMedia.facebook}`} 
                className="hover:text-primary-foreground/80"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href={`https://instagram.com/${hotelInfo.socialMedia.instagram.replace('@', '')}`} 
                className="hover:text-primary-foreground/80"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href={`https://twitter.com/${hotelInfo.socialMedia.twitter.replace('@', '')}`} 
                className="hover:text-primary-foreground/80"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><a href="/#rooms" className="hover:text-primary-foreground">Rooms & Suites</a></li>
              <li><a href="/#facilities" className="hover:text-primary-foreground">Facilities</a></li>
              <li><a href="/#location" className="hover:text-primary-foreground">Location</a></li>
              <li><Link to="/booking" className="hover:text-primary-foreground">Book Now</Link></li>
              <li><Link to="/login" className="hover:text-primary-foreground">Login</Link></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-semibold mb-4">Policies</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><a href="#" className="hover:text-primary-foreground">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-primary-foreground">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary-foreground">Cancellation Policy</a></li>
              <li><a href="#" className="hover:text-primary-foreground">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{hotelInfo.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href={`tel:${hotelInfo.phone}`} className="hover:text-primary-foreground">{hotelInfo.phone}</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href={`mailto:${hotelInfo.email}`} className="hover:text-primary-foreground">{hotelInfo.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} {hotelInfo.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
