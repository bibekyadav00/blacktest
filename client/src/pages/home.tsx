import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { assets } from "@/lib/assets";
import { MapPin, Clock, Star, BookOpen, Phone } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const famousItems = [
  {
    id: 59,
    name: "Mutton Biryani",
    price: 140,
    image: assets.food.muttonBiryani,
    description: "Rich, aromatic rice with tender mutton pieces.",
    rating: 4.8,
  },
  {
    id: 23,
    name: "Mutton Curry",
    price: 150,
    image: assets.food.muttonCurry,
    description: "Spicy, slow-cooked mutton curry.",
    rating: 4.7,
  },
  {
    id: 25,
    name: "Chicken Biryani",
    price: 80,
    image: assets.food.chickenBiryani,
    description: "Classic chicken biryani with fragrant spices.",
    rating: 4.6,
  },
];

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const hours = now.getHours();
      if (hours >= 8) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };
    
    checkTime();
    const interval = setInterval(checkTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full overflow-x-hidden bg-background dark:bg-black">
      {/* Hero Section - Redesigned */}
      <section className="relative h-[100vh] w-full overflow-hidden flex items-center justify-center bg-black">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
           <div className="absolute inset-0 bg-black/40 z-10" />
           <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 z-10" />
           <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
            className="w-full h-full"
          >
            <img 
              src={assets.hero3} 
              alt="Hall 12 Canteen" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
        
        <div className="relative z-20 container mx-auto px-4 flex flex-col items-center text-center mt-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-4xl"
          >
             {/* Open Status Pill */}
             <div className="mb-6 inline-block">
               {isOpen ? (
                  <div className="flex items-center gap-2 bg-green-500 text-black px-4 py-1.5 rounded-full shadow-[0_0_20px_-5px_rgba(34,197,94,0.6)]">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
                    </span>
                    <span className="text-xs font-black uppercase tracking-widest">Serving Fresh</span>
                  </div>
               ) : (
                  <div className="flex items-center gap-2 bg-red-600 text-white px-4 py-1.5 rounded-full shadow-[0_0_20px_-5px_rgba(220,38,38,0.6)]">
                    <span className="h-2.5 w-2.5 rounded-full bg-white"></span>
                    <span className="text-xs font-black uppercase tracking-widest">Closed Now</span>
                  </div>
               )}
             </div>

            <h1 className="font-heading font-black text-6xl md:text-8xl lg:text-9xl mb-2 leading-none text-white tracking-tight drop-shadow-2xl">
              DAFFODILL'S
            </h1>
            <h1 className="font-heading font-black text-6xl md:text-8xl lg:text-9xl mb-8 leading-none text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500 tracking-tight drop-shadow-2xl">
              FOODS
            </h1>
            
            <p className="text-lg md:text-2xl font-bold text-white/90 mb-10 max-w-2xl mx-auto uppercase tracking-widest">
              Fueling the Engineering Souls
            </p>

            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12 text-white/80 font-medium">
               <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>8:00 AM - 12:00 Midnight | 365 Days</span>
               </div>
               <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
                  <Phone className="h-5 w-5 text-primary" />
                  <span className="text-primary font-bold">Delivery:</span>
                  <a href="tel:6296336890" className="hover:text-white transition-colors">6296336890</a>
               </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md mx-auto">
              <Link href="/menu">
                <Button size="lg" className="bg-primary text-black hover:bg-white hover:text-black font-black text-lg px-10 h-14 rounded-full shadow-[0_0_30px_-5px_rgba(249,115,22,0.5)] transition-all w-full sm:w-auto">
                  VIEW MENU
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black font-black text-lg px-10 h-14 rounded-full transition-all w-full sm:w-auto" asChild>
                <a href="https://maps.app.goo.gl/61oVW3TDouptnYjg7" target="_blank" rel="noreferrer">
                  LOCATE US
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Info Cards Section (Floating) */}
      <section className="relative z-30 -mt-20 container mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-12 gap-6">
          {/* Map Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-7"
          >
            <a 
              href="https://maps.app.goo.gl/61oVW3TDouptnYjg7" 
              target="_blank" 
              rel="noreferrer"
              className="group block h-full"
            >
              <Card className="h-full border-none shadow-2xl bg-card/50 dark:bg-gray-900/50 backdrop-blur-2xl overflow-hidden hover:shadow-primary/20 transition-all duration-500 ring-1 ring-border/50 dark:ring-gray-700 rounded-[2rem] group-hover:ring-primary/50">
                <CardContent className="p-0 flex flex-col md:flex-row h-full min-h-[300px]">
                  <div className="relative md:w-1/2 overflow-hidden h-56 md:h-auto">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                    <img 
                      src={assets.mapImage} 
                      alt="Location Map" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute bottom-6 left-6 z-20">
                       <span className="bg-white text-black text-xs font-black uppercase px-3 py-1 rounded-full mb-2 inline-block">Navigation</span>
                       <h3 className="text-white font-heading font-bold text-2xl">Hall-12</h3>
                    </div>
                  </div>

                  <div className="p-8 md:w-1/2 flex flex-col justify-center bg-gradient-to-br from-card to-secondary/50 dark:from-gray-800 dark:to-gray-900">
                    <h3 className="text-3xl font-heading font-black mb-4 uppercase leading-none dark:text-white">Find Us <br/> on Campus</h3>
                    <p className="text-muted-foreground dark:text-gray-400 mb-8 font-medium">
                      Centrally located. The perfect spot for your breaks.
                    </p>
                    <div className="mt-auto">
                       <span className="text-primary font-black text-sm uppercase tracking-widest border-b-2 border-primary pb-1 inline-block group-hover:pl-2 transition-all">Get Directions</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </a>
          </motion.div>

          {/* QR Scanner Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-5"
          >
            <Card className="h-full border-none shadow-2xl bg-white dark:bg-gray-900 text-black dark:text-white overflow-hidden hover:shadow-xl transition-all duration-500 rounded-[2rem] relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 dark:from-gray-800 to-orange-100 dark:to-gray-900 opacity-50" />
              
              <CardContent className="h-full flex flex-col items-center justify-center p-8 text-center relative z-10">
                <h3 className="text-2xl font-heading font-black mb-6 uppercase tracking-tight">Scan & Pay</h3>
                
                <div className="bg-white dark:bg-gray-800 p-2 rounded-3xl shadow-xl mb-6 transform group-hover:scale-105 transition-transform duration-300 border-4 border-black/5 dark:border-white/5">
                  <img src={assets.paymentQr} alt="Scan to Pay" className="w-56 h-56 object-contain rounded-2xl" />
                </div>
                
                <p className="text-black/60 dark:text-white/60 font-bold text-sm tracking-wide bg-black/5 dark:bg-white/5 px-4 py-2 rounded-full">UPI Accepted</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Famous Items Section */}
      <section className="py-24 bg-background dark:bg-black relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
             <div>
                <span className="text-primary font-black uppercase tracking-widest text-xs mb-2 block">Trending Now</span>
                <h2 className="text-5xl md:text-7xl font-heading font-black text-foreground dark:text-white uppercase tracking-tighter">
                  Campus <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">Favorites</span>
                </h2>
             </div>
             <Link href="/menu">
                <Button className="rounded-full px-8 h-12 font-bold bg-primary text-black hover:bg-white hover:text-primary shadow-lg shadow-primary/40 transition-all dark:text-white dark:hover:text-black">
                   See All Dishes
                </Button>
             </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {famousItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="group relative h-[450px] rounded-[2rem] overflow-hidden cursor-pointer shadow-lg">
                   <img 
                      src={item.image} 
                      alt={item.name} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-90 group-hover:brightness-100"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                   
                   <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-white font-bold text-xs">{item.rating}</span>
                   </div>

                   <div className="absolute bottom-0 left-0 w-full p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex justify-between items-end mb-2">
                         <h3 className="text-2xl font-heading font-bold text-white leading-tight max-w-[70%]">{item.name}</h3>
                         <span className="text-2xl font-black text-primary">₹{item.price}</span>
                      </div>
                      <p className="text-white/70 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">{item.description}</p>
                      <Link href="/menu">
                         <Button className="w-full rounded-xl bg-white text-black hover:bg-primary hover:text-white font-bold border-none">
                            View Menu
                         </Button>
                      </Link>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
