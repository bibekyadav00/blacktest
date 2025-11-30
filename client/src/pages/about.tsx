import { assets } from "@/lib/assets";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";
import { Badge } from "@/components/ui/badge";

export default function About() {
  return (
    <div className="min-h-screen pt-32 pb-20 container mx-auto px-4 bg-background dark:bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <span className="text-primary font-black tracking-widest uppercase text-xs mb-2 block">Behind the Taste</span>
          <h1 className="text-5xl md:text-7xl font-heading font-black mb-6 text-foreground uppercase tracking-tighter dark:text-white">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">Legacy</span>
          </h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-medium dark:text-gray-400">
            Serving quality meals with a side of trust.
          </p>
          <p className="text-primary font-bold text-2xl mt-6 italic">Great Taste, Clean Plates — Even Late!</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start mb-32">
          {/* Carousel */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-orange-600 rounded-[2.5rem] opacity-20 blur-2xl" />
            <Carousel 
              className="w-full"
              plugins={[
                Autoplay({
                  delay: 3000,
                }),
              ]}
            >
              <CarouselContent>
                {[assets.hero1, assets.hero2, assets.hero4].map((img, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card className="border-none shadow-2xl overflow-hidden rounded-[2rem] bg-card aspect-[4/3] dark:bg-gray-900">
                        <CardContent className="flex items-center justify-center p-0 relative h-full w-full">
                          <img 
                            src={img} 
                            alt={`Canteen view ${index + 1}`} 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-6 left-6 text-white">
                             <span className="bg-primary text-white text-[10px] font-black uppercase px-3 py-1 rounded-full mb-2 inline-block">Campus Vibes</span>
                             <p className="font-heading font-bold text-xl">Clean & Hygienic Space</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </motion.div>

          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 p-8 rounded-3xl hover:border-primary/30 transition-colors duration-300 dark:bg-gray-900 dark:border-gray-700">
              <h3 className="text-2xl font-heading font-black mb-4 text-foreground uppercase dark:text-white">New Beginnings</h3>
              <p className="text-lg leading-relaxed text-muted-foreground font-medium dark:text-gray-400">
                Hall-12 Canteen has been newly inaugurated with a refreshed commitment to delivering high-quality, hygienic, and reliable food services for students and staff. The canteen is operated by <span className="text-primary font-bold">Daffodill's Foods</span>, a trusted vendor with extensive experience serving renowned institutions like <span className="font-bold text-foreground dark:text-gray-300">IIT Dhanbad</span> and <span className="font-bold text-foreground dark:text-gray-300">NIT Durgapur</span>, including its Guest House.
              </p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm border border-border/50 p-8 rounded-3xl hover:border-primary/30 transition-colors duration-300 dark:bg-gray-900 dark:border-gray-700">
              <h3 className="text-2xl font-heading font-black mb-4 text-foreground uppercase dark:text-white">Backed by Legacy</h3>
              <p className="text-lg leading-relaxed text-muted-foreground font-medium dark:text-gray-400 mb-6">
                Backed by a strong legacy of operating across multiple states, Daffodill's Foods upholds strict hygiene practices, consistent taste, and professional service at every step. The canteen also provides delivery services across the NIT Durgapur campus, ensuring quick access to fresh meals. Open till midnight, <span className="font-bold text-foreground dark:text-gray-300">Hall-12 Canteen</span> strives to be the preferred choice for everyday meals, late-night cravings, and convenient snacks.
              </p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm border border-border/50 p-8 rounded-3xl hover:border-primary/30 transition-colors duration-300 dark:bg-gray-900 dark:border-gray-700">
              <h3 className="text-2xl font-heading font-black mb-4 text-foreground uppercase dark:text-white">Excellence Across Campus</h3>
              <p className="text-lg leading-relaxed text-muted-foreground font-medium dark:text-gray-400 mb-6">
                Daffodill's Foods additionally manages the <span className="font-bold text-foreground dark:text-gray-300">NIT Durgapur Guest House kitchen</span>, maintaining premium standards for visitors, campus guests, and students who wish to dine there.
              </p>
              <Badge variant="secondary" className="text-xs font-bold uppercase tracking-wide py-2 px-4 bg-primary/10 text-primary hover:bg-primary/20 dark:bg-primary/20">
                 Multi-Campus Operations
              </Badge>
            </div>
          </motion.div>
        </div>

        {/* QR Code Section - Modern Glass Card */}
        <motion.div
             initial={{ opacity: 0, y: 40 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="relative max-w-4xl mx-auto"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-orange-500 to-yellow-500 rounded-[3rem] blur-3xl opacity-20" />
            <div className="relative bg-card/80 backdrop-blur-xl border border-white/10 p-12 rounded-[3rem] text-center overflow-hidden dark:bg-gray-900 dark:border-gray-700">
               <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
               
               <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-12">
                  <div className="text-left">
                     <h3 className="text-4xl font-heading font-black mb-4 uppercase dark:text-white">Scan & <br/>Pay Instantly</h3>
                     <p className="text-muted-foreground font-medium max-w-xs mb-6 dark:text-gray-400">
                        Skip the cash. Use any UPI app to pay securely at our counter.
                     </p>
                     <div className="flex gap-3">
                        <div className="h-8 w-8 rounded-full bg-white/10 dark:bg-white/5" />
                        <div className="h-8 w-8 rounded-full bg-white/10 dark:bg-white/5" />
                        <div className="h-8 w-8 rounded-full bg-white/10 dark:bg-white/5" />
                     </div>
                  </div>

                  <div className="bg-white p-4 rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 dark:bg-gray-800">
                     <img src={assets.paymentQr} alt="Payment QR Code" className="w-64 h-auto rounded-xl" />
                     <div className="mt-4 flex justify-center">
                       <span className="bg-black text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest dark:bg-white dark:text-black">UPI Accepted</span>
                     </div>
                  </div>
               </div>
            </div>
        </motion.div>
      </div>
    </div>
  );
}
