import { Link, useLocation } from "wouter";
import { assets } from "@/lib/assets";
import { Menu, Phone, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/menu", label: "Menu" },
    { href: "/about", label: "About" },
    { href: "/feedback", label: "Feedback" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-black font-sans transition-colors duration-300 selection:bg-primary/30 dark:text-white">
      {/* Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          isScrolled 
            ? "bg-black/80 backdrop-blur-xl shadow-lg border-white/10 py-3 dark:bg-black/90" 
            : "bg-gradient-to-b from-black/80 to-transparent border-transparent py-6 dark:from-black/90"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/50 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img src={assets.logo} alt="Logo" className="relative h-14 w-14 rounded-full object-cover border-0 shadow-lg group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-heading font-black leading-none text-xl md:text-2xl tracking-tight text-white drop-shadow-md">
                  HALL-12 Canteen
                </span>
                <span className="text-[10px] font-bold tracking-widest uppercase text-primary/90 drop-shadow-md mt-0.5">
                  by Daffodill's Foods
                </span>
              </div>
            </a>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <a
                    className={`text-sm font-bold uppercase tracking-wide transition-all duration-300 hover:text-primary ${
                      location === link.href
                        ? "text-primary"
                        : "text-white/80"
                    }`}
                  >
                    {link.label}
                  </a>
                </Link>
              ))}
            </nav>

            {/* Delivery CTA Button */}
            <a 
              href="tel:6296336890"
              className="bg-primary text-black font-black px-6 py-2 rounded-full hover:bg-white hover:text-primary shadow-lg shadow-primary/40 transition-all transform hover:scale-105 flex items-center gap-2 text-sm uppercase tracking-wide"
            >
              <Phone className="h-4 w-4" />
              Order: 6296336890
            </a>
          </div>

          {/* Mobile Nav */}
          <div className="flex items-center gap-2 md:hidden">
            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[300px] border-l border-white/10 bg-black/95 backdrop-blur-3xl text-white p-0 dark:bg-black">
                <div className="flex flex-col h-full">
                  <div className="flex flex-col items-center justify-center pt-12 pb-8 gap-4 bg-white/5">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary blur-2xl opacity-20 rounded-full" />
                      <img src={assets.logo} alt="Logo" className="relative h-24 w-24 rounded-full border-0 shadow-xl" />
                    </div>
                    <div className="text-center">
                      <h3 className="font-heading font-bold text-xl tracking-tight text-white">HALL-12 Canteen</h3>
                      <p className="text-primary font-bold uppercase tracking-widest text-[10px] mt-1">by Daffodill's Foods</p>
                    </div>
                  </div>
                  
                  <nav className="flex flex-col p-6 gap-2 flex-1">
                    {navLinks.map((link) => (
                      <Link key={link.href} href={link.href}>
                        <a
                          className={`text-lg font-bold px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-between group ${
                            location === link.href
                              ? "bg-primary text-black shadow-lg shadow-primary/20"
                              : "hover:bg-white/10 text-white/80 hover:text-white"
                          }`}
                          onClick={() => setIsMobileOpen(false)}
                        >
                          {link.label}
                        </a>
                      </Link>
                    ))}
                    
                    {/* Mobile Delivery CTA */}
                    <a 
                      href="tel:6296336890"
                      className="bg-primary text-black font-bold px-4 py-4 rounded-xl hover:bg-white hover:text-primary shadow-lg shadow-primary/40 transition-all flex items-center justify-center gap-2 text-lg uppercase tracking-wide mt-4 border-2 border-primary"
                      onClick={() => setIsMobileOpen(false)}
                    >
                      <Phone className="h-5 w-5" />
                      Order: 6296336890
                    </a>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-16 relative overflow-hidden dark:bg-black">
        <div className="container mx-auto px-4">
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 border-b border-white/10 pb-12 mb-12">
              <div className="space-y-2">
                 <h3 className="font-heading font-black text-4xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-500">Daffodill's Foods</h3>
                 <p className="text-white/60 max-w-md">Campus's cleanest, safest, and most hygienic food—made in a high-standard kitchen.</p>
              </div>
              
              <nav className="flex flex-col sm:flex-row gap-6">
                 <Link href="/menu">
                    <a className="text-white/80 hover:text-primary font-bold uppercase tracking-wide text-sm transition-colors">Menu</a>
                 </Link>
                 <Link href="/about">
                    <a className="text-white/80 hover:text-primary font-bold uppercase tracking-wide text-sm transition-colors">About</a>
                 </Link>
              </nav>
              
              <div className="flex flex-col sm:flex-row gap-8">
                 <div>
                    <h4 className="text-primary font-bold uppercase tracking-widest text-xs mb-2">Delivery</h4>
                    <div className="flex items-center gap-2 text-xl font-heading font-bold">
                       <Phone className="h-5 w-5 text-white/50" />
                       <a href="tel:6296336890" className="hover:text-primary transition-colors">6296336890</a>
                    </div>
                 </div>
                 <div>
                    <h4 className="text-green-500 font-bold uppercase tracking-widest text-xs mb-2">Complaints</h4>
                    <div className="flex items-center gap-2 text-xl font-heading font-bold">
                       <MessageCircle className="h-5 w-5 text-white/50" />
                       <a href="https://wa.me/919056011913" target="_blank" rel="noreferrer" className="hover:text-green-500 transition-colors">+91-9056011913</a>
                    </div>
                 </div>
              </div>
           </div>

           <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-white/40">
              <p>© 2025 Daffodill's Foods. All rights reserved.</p>
              <div className="flex items-center gap-2">
                 <span>Developed by</span>
                 <span className="text-white font-bold">Bibek Yadav</span>
                 <span className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-bold uppercase">CSE Final Year</span>
              </div>
           </div>
        </div>
      </footer>
    </div>
  );
}
