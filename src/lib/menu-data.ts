import butterRotiImg from "@/assets/butter-roti.jpg";

export type MenuItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  veg: boolean;
  rating: number;
  desc: string;
  image: string;
};

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`;

export const CATEGORIES = [
  "All",
  "North Indian",
  "Chinese",
  "Fast Food",
  "South Indian",
  "Paneer Specials",
  "Dal",
  "Rice",
  "Roti",
  "Snacks",
  "Desserts",
] as const;

export const MENU: MenuItem[] = [
  { id: "pbm", name: "Paneer Butter Masala", category: "Paneer Specials", price: 240, veg: true, rating: 4.9,
    desc: "Cottage cheese simmered in a silky tomato-cashew gravy.",
    image: img("photo-1631452180519-c014fe946bc7") },
  { id: "dt", name: "Dal Tadka", category: "Dal", price: 160, veg: true, rating: 4.8,
    desc: "Slow-cooked yellow lentils tempered with ghee & cumin.",
    image: img("photo-1585937421612-70a008356fbe") },
  { id: "vb", name: "Veg Biryani", category: "Rice", price: 220, veg: true, rating: 4.7,
    desc: "Fragrant basmati layered with garden vegetables & saffron.",
    image: img("photo-1589302168068-964664d93dc0") },
  { id: "hn", name: "Hakka Noodles", category: "Chinese", price: 180, veg: true, rating: 4.6,
    desc: "Wok-tossed noodles with crunchy vegetables & soy.",
    image: img("photo-1585032226651-759b368d7246") },
  { id: "cp", name: "Chilli Paneer", category: "Chinese", price: 230, veg: true, rating: 4.7,
    desc: "Indo-Chinese crispy paneer in tangy chilli-garlic sauce.",
    image: img("photo-1596797038530-2c107229654b") },
  { id: "md", name: "Masala Dosa", category: "South Indian", price: 140, veg: true, rating: 4.8,
    desc: "Golden crispy dosa with spiced potato masala & chutneys.",
    image: img("photo-1668236543090-82eba5ee5976") },
  { id: "pb", name: "Pav Bhaji", category: "Fast Food", price: 150, veg: true, rating: 4.8,
    desc: "Buttery Mumbai-style bhaji served with soft toasted pav.",
    image: img("photo-1606491956689-2ea866880c84") },
  { id: "vbg", name: "Veg Burger", category: "Fast Food", price: 120, veg: true, rating: 4.5,
    desc: "Crispy patty, fresh veggies & house sauce in a toasted bun.",
    image: img("photo-1550317138-10000687a72b") },
  { id: "cc", name: "Cold Coffee", category: "Coffee", price: 130, veg: true, rating: 4.7,
    desc: "Chilled espresso blended with milk & a scoop of ice-cream.",
    image: img("photo-1517701604599-bb29b565090c") },
  { id: "fls", name: "Fresh Lime Soda", category: "Mocktails", price: 80, veg: true, rating: 4.6,
    desc: "Zesty lime, mint & soda — sweet, salt or masala.",
    image: img("photo-1556679343-c7306c1976bc") },
  { id: "gt", name: "Masala Chai", category: "Tea", price: 40, veg: true, rating: 4.9,
    desc: "Slow-simmered chai with cardamom, ginger & clove.",
    image: img("photo-1544787219-7f47ccb76574") },
  { id: "sm", name: "Samosa (2 pc)", category: "Snacks", price: 60, veg: true, rating: 4.7,
    desc: "Golden pastry stuffed with spiced potatoes & peas.",
    image: img("photo-1601050690597-df0568f70950") },
  { id: "gj", name: "Gulab Jamun", category: "Desserts", price: 90, veg: true, rating: 4.8,
    desc: "Warm milk dumplings soaked in rose-cardamom syrup.",
    image: img("photo-1590080875515-8a3a8dc5735e") },
  { id: "rot", name: "Butter Roti", category: "Roti", price: 25, veg: true, rating: 4.6,
    desc: "Soft tandoor-baked whole wheat roti brushed with ghee.",
    image: butterRotiImg },
  { id: "kb", name: "Kadai Paneer", category: "North Indian", price: 250, veg: true, rating: 4.8,
    desc: "Paneer & peppers roasted in a smoky kadai masala.",
    image: img("photo-1585937421612-70a008356fbe") },

  // Tea & Coffee
  { id: "cappuccino", name: "Cappuccino", category: "Tea & Coffee", price: 120, veg: true, rating: 4.8, desc: "Classic espresso with steamed milk foam.", image: img("photo-1572442388796-11668a67e53d") },
  { id: "coffee-hazelnut", name: "Coffee Hazelnut", category: "Tea & Coffee", price: 180, veg: true, rating: 4.9, desc: "Rich coffee blended with roasted hazelnut syrup.", image: img("photo-1557006021-b85faa2bc5e2") },
  { id: "tea-regular", name: "Tea", category: "Tea & Coffee", price: 40, veg: true, rating: 4.5, desc: "Classic refreshing Indian tea.", image: img("photo-1544787219-7f47ccb76574") },
  { id: "masala-tea-60", name: "Masala Tea", category: "Tea & Coffee", price: 60, veg: true, rating: 4.8, desc: "Classic Indian spiced tea boiled with milk.", image: img("photo-1544787219-7f47ccb76574") },
  { id: "kesar-tea", name: "Kesar Tea", category: "Tea & Coffee", price: 60, veg: true, rating: 4.7, desc: "Aromatic tea infused with saffron strands.", image: img("photo-1576092768241-dec231879fc3") },
  { id: "masala-kesar-tea", name: "Masala Kesar Tea", category: "Tea & Coffee", price: 80, veg: true, rating: 4.9, desc: "Spiced saffron tea for a royal experience.", image: img("photo-1561336313-0bd5e0b27ec8") },

  // Shakes
  { id: "chocolate-shake", name: "Chocolate Shake", category: "Shakes", price: 180, veg: true, rating: 4.8, desc: "Thick creamy chocolate goodness.", image: img("photo-1572490122747-3968b75cc699") },
  { id: "butter-scotch-shake", name: "Butter Scotch Shake", category: "Shakes", price: 160, veg: true, rating: 4.7, desc: "Crunchy and sweet butter scotch blend.", image: img("photo-1579954115545-a95591f28bfc") },
  { id: "oreo-shake", name: "Oreo Shake", category: "Shakes", price: 170, veg: true, rating: 4.9, desc: "Crushed Oreos blended with vanilla ice cream.", image: img("photo-1553177595-4de2bb0842b9") },
  { id: "blueberry-shake", name: "Blueberry Shake", category: "Shakes", price: 190, veg: true, rating: 4.8, desc: "Sweet and tangy blueberry milk blend.", image: img("photo-1626074964464-924b48ec4259") },
  { id: "vanilla-shake", name: "Vanilla Shake", category: "Shakes", price: 160, veg: true, rating: 4.6, desc: "Classic smooth vanilla bean shake.", image: img("photo-1572490122747-3968b75cc699") },
  { id: "strawberry-shake", name: "Strawberry Shake", category: "Shakes", price: 190, veg: true, rating: 4.7, desc: "Fresh strawberries blended to perfection.", image: img("photo-1579954115545-a95591f28bfc") },
  { id: "mango-pie", name: "Mango Pie Shake", category: "Shakes", price: 170, veg: true, rating: 4.8, desc: "Tropical mango delight in a glass.", image: img("photo-1553177595-4de2bb0842b9") },
  { id: "kitkat-shake", name: "Kitkat Shake", category: "Shakes", price: 180, veg: true, rating: 4.9, desc: "Crunchy chocolate wafer blended shake.", image: img("photo-1626074964464-924b48ec4259") },

  // Mocktails
  { id: "virgin-mojito", name: "Virgin Mojito", category: "Mocktails", price: 180, veg: true, rating: 4.7, desc: "Classic mint and lime cooler.", image: img("photo-1513558161293-cdaf765ed2fd") },
  { id: "blueberry-mojito", name: "Blueberry Mojito", category: "Mocktails", price: 190, veg: true, rating: 4.8, desc: "Minty mocktail bursting with blueberry flavor.", image: img("photo-1556679343-c7306c1976bc") },
  { id: "cranberry-mojito", name: "Cranberry Mojito", category: "Mocktails", price: 170, veg: true, rating: 4.7, desc: "Tart and refreshing cranberry twist.", image: img("photo-1513558161293-cdaf765ed2fd") },
  { id: "strawberry-mojito", name: "Strawberry Mojito", category: "Mocktails", price: 170, veg: true, rating: 4.8, desc: "Sweet strawberry and mint fusion.", image: img("photo-1556679343-c7306c1976bc") },
  { id: "raspberry-lime-mojito", name: "Raspberry Lime Mojito", category: "Mocktails", price: 180, veg: true, rating: 4.9, desc: "Zesty raspberry lime combination.", image: img("photo-1513558161293-cdaf765ed2fd") },

];

export const SIGNATURE_IDS = ["pbm","dt","vb","hn","cp","md","pb","vbg","cc","fls"];
