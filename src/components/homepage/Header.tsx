import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, User, Phone } from 'lucide-react';
import { hotelInfo } from '@/data/mockData';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Rooms', href: '/#rooms' },
    { name: 'Facilities', href: '/#facilities' },
    { name: 'Location', href: '/#location' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-serif font-bold text-xl">G</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-serif font-bold text-lg text-foreground leading-tight">{hotelInfo.name}</h1>
              <p className="text-xs text-muted-foreground">{hotelInfo.tagline}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <a href={`tel:${hotelInfo.phone}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <Phone className="h-4 w-4" />
              <span>{hotelInfo.phone}</span>
            </a>
            <Button variant="outline" size="sm" onClick={() => navigate('/login')}>
              <User className="h-4 w-4 mr-2" />
              Login
            </Button>
            <Button size="sm" onClick={() => navigate('/booking')}>
              Book Now
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
                <hr className="my-4 border-border" />
                <Button variant="outline" className="justify-start" onClick={() => { navigate('/login'); setIsOpen(false); }}>
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
                <Button className="justify-start" onClick={() => { navigate('/booking'); setIsOpen(false); }}>
                  Book Now
                </Button>
                <a href={`tel:${hotelInfo.phone}`} className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
                  <Phone className="h-4 w-4" />
                  <span>{hotelInfo.phone}</span>
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
