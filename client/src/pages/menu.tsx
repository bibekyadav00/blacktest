import { useState } from "react";
import { MENU_ITEMS, MenuItem } from "@/lib/menu-data";
import { Input } from "@/components/ui/input";
import { Search, Flame } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TypeIcon = ({ type }: { type: MenuItem['type'] }) => {
  if (type === 'veg') return <div className="h-5 w-5 rounded-md border-2 border-green-500 p-[3px] flex items-center justify-center shadow-[0_0_10px_-3px_rgba(34,197,94,0.5)]"><div className="h-2.5 w-2.5 rounded-full bg-green-500" /></div>;
  if (type === 'non-veg') return <div className="h-5 w-5 rounded-md border-2 border-red-500 p-[3px] flex items-center justify-center shadow-[0_0_10px_-3px_rgba(239,68,68,0.5)]"><div className="h-0 w-0 border-l-[5px] border-r-[5px] border-t-[8px] border-l-transparent border-r-transparent border-t-red-500" /></div>;
  if (type === 'egg') return <div className="h-5 w-5 rounded-md border-2 border-yellow-500 p-[3px] flex items-center justify-center shadow-[0_0_10px_-3px_rgba(234,179,8,0.5)]"><div className="h-2.5 w-2.5 rounded-full bg-yellow-500" /></div>;
  return null;
};

export default function Menu() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === "all") return matchesSearch;
    if (activeFilter === "veg") return matchesSearch && item.type === 'veg';
    if (activeFilter === "non-veg") return matchesSearch && (item.type === 'non-veg' || item.type === 'egg');
    
    return matchesSearch;
  });

  // Group by category
  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  return (
    <div className="min-h-screen pt-32 pb-20 container mx-auto px-4 bg-background dark:bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6"
        >
          <div>
             <span className="text-primary font-black tracking-widest uppercase text-xs mb-2 block flex items-center gap-2">
               <Flame className="h-4 w-4 animate-pulse" /> Hot & Fresh
             </span>
             <h1 className="text-5xl md:text-7xl font-heading font-black mb-2 text-foreground uppercase tracking-tighter dark:text-white">
                Mega <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">Menu</span>
             </h1>
             <p className="text-muted-foreground text-lg font-medium max-w-md dark:text-gray-400">
               Whatever you're craving, we've got the fuel.
             </p>
          </div>
        </motion.div>

        {/* Filters & Search - Redesigned for Mobile */}
        <div className="sticky top-20 z-40 mb-12">
          <div className="bg-background/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/10 dark:border-gray-700 p-3 md:p-2 rounded-3xl md:rounded-full shadow-2xl flex flex-col md:flex-row gap-3 items-center">
            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors dark:text-gray-500" />
              <Input
                placeholder="Search for dishes..."
                className="pl-12 h-12 rounded-2xl md:rounded-full bg-secondary/50 dark:bg-gray-800 border-transparent focus:border-primary/30 focus:bg-background dark:focus:bg-gray-800 transition-all text-lg w-full dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="w-full h-[1px] md:w-[1px] md:h-8 bg-border/50 dark:bg-gray-700 mx-0 md:mx-2" />

            <Tabs defaultValue="all" value={activeFilter} onValueChange={setActiveFilter} className="w-full md:w-auto">
              <TabsList className="grid w-full grid-cols-3 h-12 rounded-2xl md:rounded-full p-1 bg-secondary/50 dark:bg-gray-800">
                <TabsTrigger value="all" className="rounded-xl md:rounded-full font-bold data-[state=active]:bg-background dark:data-[state=active]:bg-gray-700 data-[state=active]:text-foreground dark:data-[state=active]:text-white data-[state=active]:shadow-md transition-all">All</TabsTrigger>
                <TabsTrigger value="veg" className="rounded-xl md:rounded-full font-bold data-[state=active]:bg-green-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all">Veg</TabsTrigger>
                <TabsTrigger value="non-veg" className="rounded-xl md:rounded-full font-bold data-[state=active]:bg-red-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all">Non-Veg</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Menu Grid */}
        {Object.keys(groupedItems).length === 0 ? (
          <div className="text-center py-32 flex flex-col items-center opacity-50">
            <div className="bg-secondary dark:bg-gray-800 rounded-full p-8 mb-6 animate-float">
              <Search className="h-16 w-16 text-muted-foreground dark:text-gray-500" />
            </div>
            <h3 className="text-2xl font-black mb-2 uppercase tracking-tight dark:text-white">Ghost Kitchen?</h3>
            <p className="text-muted-foreground dark:text-gray-400 font-medium">No dishes found matching your search.</p>
          </div>
        ) : (
          <div className="space-y-20">
            {Object.entries(groupedItems).map(([category, items], categoryIndex) => (
              <motion.div 
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: categoryIndex * 0.05 }}
              >
                <div className="flex items-center gap-6 mb-10">
                  <h2 className="text-3xl md:text-5xl font-heading font-black text-foreground/90 dark:text-white uppercase tracking-tighter">
                    {category}
                  </h2>
                  <div className="h-[2px] flex-1 bg-gradient-to-r from-primary/50 via-primary/20 to-transparent rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {items.map((item) => (
                    <Card key={item.id} className="group border-none bg-card dark:bg-gray-900 hover:bg-secondary/30 dark:hover:bg-gray-800 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-visible ring-1 ring-border/30 dark:ring-gray-700 rounded-3xl relative">
                      {item.isFamous && (
                         <div className="absolute -top-3 -right-3 z-20">
                            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-lg animate-pulse">
                               Top Pick
                            </div>
                         </div>
                      )}
                      
                      <CardContent className="p-6 relative z-10">
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <TypeIcon type={item.type} />
                              <h3 className="font-heading font-bold text-xl group-hover:text-primary transition-colors leading-tight dark:text-white">{item.name}</h3>
                            </div>
                            
                            <div className="flex gap-2 flex-wrap mt-2">
                              {item.category === 'Chinese' && (
                                <Badge variant="outline" className="text-[10px] font-bold uppercase border-primary/30 text-primary/80 bg-primary/5 dark:border-primary/30 dark:bg-primary/10">
                                  Spicy
                                </Badge>
                              )}
                              {item.category === 'Biryani' && (
                                <Badge variant="outline" className="text-[10px] font-bold uppercase border-orange-500/30 text-orange-500/80 bg-orange-500/5 dark:border-orange-500/30 dark:bg-orange-500/10">
                                  Aromatic
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="font-heading font-black text-2xl text-primary drop-shadow-sm">
                              ₹{item.price}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      
                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 rounded-3xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </Card>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
