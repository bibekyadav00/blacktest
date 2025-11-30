import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Star, MessageSquare, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const formSchema = z.object({
  contact: z.string().optional().refine(
    (val) => !val || /^[0-9]{10}$/.test(val),
    { message: "Contact number must be 10 digits" }
  ),
  rating: z.number().min(1, { message: "Please select a rating" }).max(5),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

export default function Feedback() {
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contact: "",
      rating: 0,
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }

      toast({
        title: "Feedback Sent!",
        description: "Thanks for helping us level up. 🚀",
      });
      form.reset();
      setRating(0);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send feedback. Please try again.",
        variant: "destructive",
      });
      console.error("Feedback error:", error);
    }
  }

  return (
    <div className="min-h-screen pt-32 pb-20 container mx-auto px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-black tracking-widest uppercase text-xs mb-2 block">Your Voice</span>
          <h1 className="text-5xl md:text-7xl font-heading font-black mb-6 text-foreground uppercase tracking-tighter">
            Feedback
          </h1>
          <p className="text-muted-foreground text-xl font-medium max-w-xl mx-auto">
            Loved the food? Or have suggestions? Let us know.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-8">
           {/* Visual Side */}
           <motion.div 
             initial={{ opacity: 0, x: -30 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.2 }}
             className="md:col-span-5 flex flex-col justify-center"
           >
              <div className="bg-gradient-to-br from-primary to-orange-600 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10" />
                 <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full blur-2xl -ml-10 -mb-10" />
                 
                 <MessageSquare className="h-12 w-12 mb-6" />
                 <h3 className="text-3xl font-heading font-black mb-4 uppercase">We Value You</h3>
                 <p className="text-white/80 font-medium leading-relaxed mb-8">
                    Your feedback helps us maintain our high standards and serve you better every day.
                 </p>
                 
                 <div className="space-y-4">
                    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                       <div className="flex items-center gap-2 mb-2">
                          <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                          <span className="text-xs font-bold uppercase tracking-wider">Response Time</span>
                       </div>
                       <p className="font-bold text-lg">Within 24 Hours</p>
                    </div>
                    
                    <a 
                      href="https://wa.me/919056011913?text=I%20have%20a%20complaint" 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center justify-center gap-3 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-2xl transition-all hover:scale-105 shadow-lg"
                    >
                       <MessageCircle className="h-5 w-5" />
                       <span>Instant Complaint</span>
                    </a>
                 </div>
              </div>
           </motion.div>

           {/* Form Side */}
           <motion.div 
             initial={{ opacity: 0, x: 30 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.3 }}
             className="md:col-span-7"
           >
            <Card className="border-none shadow-2xl ring-1 ring-border/50 bg-card/50 backdrop-blur-xl rounded-[2.5rem]">
              <CardHeader className="pb-8 border-b border-border/50 px-8 pt-8">
                <CardTitle className="text-2xl font-heading font-black uppercase">Drop a Message</CardTitle>
                <CardDescription className="font-medium">
                  Share your experience with us.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="contact"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold uppercase text-xs tracking-wider">Contact Number <span className="text-muted-foreground text-xs font-normal">(Optional)</span></FormLabel>
                          <FormControl>
                            <Input placeholder="10-digit number" {...field} className="bg-secondary/50 h-14 rounded-xl border-transparent focus:border-primary/30 focus:bg-background transition-all font-medium" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="rating"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold uppercase text-xs tracking-wider">Rate Us</FormLabel>
                          <FormControl>
                            <div className="flex gap-3 items-center bg-secondary/30 p-4 rounded-2xl w-fit">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  type="button"
                                  onClick={() => {
                                    setRating(star);
                                    field.onChange(star);
                                  }}
                                  className="focus:outline-none transition-transform hover:scale-125 active:scale-95"
                                >
                                  <Star 
                                    className={`h-8 w-8 ${star <= rating ? "fill-yellow-400 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]" : "text-muted-foreground/30"}`} 
                                  />
                                </button>
                              ))}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold uppercase text-xs tracking-wider">Message</FormLabel>
                          <FormControl>
                            <Textarea placeholder="How can we improve?" {...field} className="bg-secondary/50 min-h-[150px] resize-none p-4 rounded-2xl border-transparent focus:border-primary/30 focus:bg-background transition-all font-medium" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-end pt-4">
                      <Button type="submit" size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-10 h-14 font-black text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-transform w-full md:w-auto">
                        Send It <Send className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
           </motion.div>
        </div>
      </div>
    </div>
  );
}
