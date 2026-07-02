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
  "Cold Drinks",
  "Fresh Juice",
  "Tea",
  "Coffee",
  "Lassi",
  "Mocktails",
] as const;

export const MENU: MenuItem[] = [
  { id: "pbm", name: "Paneer Butter Masala", category: "Paneer Specials", price: 240, veg: true, rating: 4.9,
    desc: "Cottage cheese simmered in a silky tomato-cashew gravy.",
    image: img("photo-1631452180519-c014fe946bc7") },
  { id: "dt", name: "Dal Tadka", category: "Dal", price: 160, veg: true, rating: 4.8,
    desc: "Slow-cooked yellow lentils tempered with ghee & cumin.",
    image: img("photo-1546833999-b9f581a1996d") },
  { id: "vb", name: "Veg Biryani", category: "Rice", price: 220, veg: true, rating: 4.7,
    desc: "Fragrant basmati layered with garden vegetables & saffron.",
    image: img("photo-1563379091339-03246963d51a") },
  { id: "hn", name: "Hakka Noodles", category: "Chinese", price: 180, veg: true, rating: 4.6,
    desc: "Wok-tossed noodles with crunchy vegetables & soy.",
    image: img("photo-1585032226651-759b368d7246") },
  { id: "cp", name: "Chilli Paneer", category: "Chinese", price: 230, veg: true, rating: 4.7,
    desc: "Indo-Chinese crispy paneer in tangy chilli-garlic sauce.",
    image: img("photo-1626777553635-e7c3a76debb2") },
  { id: "md", name: "Masala Dosa", category: "South Indian", price: 140, veg: true, rating: 4.8,
    desc: "Golden crispy dosa with spiced potato masala & chutneys.",
    image: img("photo-1668236543090-82eba5ee5976") },
  { id: "pb", name: "Pav Bhaji", category: "Fast Food", price: 150, veg: true, rating: 4.8,
    desc: "Buttery Mumbai-style bhaji served with soft toasted pav.",
    image: img("photo-1606491956689-2ea866880c84") },
  { id: "vbg", name: "Veg Burger", category: "Fast Food", price: 120, veg: true, rating: 4.5,
    desc: "Crispy patty, fresh veggies & house sauce in a toasted bun.",
    image: img("photo-1568901346375-23c9450c58cd") },
  { id: "cc", name: "Cold Coffee", category: "Coffee", price: 130, veg: true, rating: 4.7,
    desc: "Chilled espresso blended with milk & a scoop of ice-cream.",
    image: img("photo-1461023058943-07fcbe16d735") },
  { id: "fls", name: "Fresh Lime Soda", category: "Mocktails", price: 80, veg: true, rating: 4.6,
    desc: "Zesty lime, mint & soda — sweet, salt or masala.",
    image: img("photo-1621263764928-df1444c5e859") },
  { id: "ml", name: "Mango Lassi", category: "Lassi", price: 110, veg: true, rating: 4.9,
    desc: "Alphonso mango whisked with creamy chilled yogurt.",
    image: img("photo-1571877227200-a0d98ea607e9") },
  { id: "gt", name: "Masala Chai", category: "Tea", price: 40, veg: true, rating: 4.9,
    desc: "Slow-simmered chai with cardamom, ginger & clove.",
    image: img("photo-1597318374671-4d33f7dbb890") },
  { id: "sm", name: "Samosa (2 pc)", category: "Snacks", price: 60, veg: true, rating: 4.7,
    desc: "Golden pastry stuffed with spiced potatoes & peas.",
    image: img("photo-1601050690597-df0568f70950") },
  { id: "gj", name: "Gulab Jamun", category: "Desserts", price: 90, veg: true, rating: 4.8,
    desc: "Warm milk dumplings soaked in rose-cardamom syrup.",
    image: img("photo-1601050690597-df0568f70950") },
  { id: "rot", name: "Butter Roti", category: "Roti", price: 25, veg: true, rating: 4.6,
    desc: "Soft tandoor-baked whole wheat roti brushed with ghee.",
    image: img("photo-1626074353765-517a681e40be") },
  { id: "cd", name: "Chilled Cola", category: "Cold Drinks", price: 50, veg: true, rating: 4.4,
    desc: "Ice-cold classic cola to refresh every bite.",
    image: img("photo-1554866585-cd94860890b7") },
  { id: "oj", name: "Orange Juice", category: "Fresh Juice", price: 90, veg: true, rating: 4.7,
    desc: "Hand-pressed sun-ripe oranges, nothing else.",
    image: img("photo-1613478223719-2ab802602423") },
  { id: "kb", name: "Kadai Paneer", category: "North Indian", price: 250, veg: true, rating: 4.8,
    desc: "Paneer & peppers roasted in a smoky kadai masala.",
    image: img("photo-1631452180775-cd2ff56d09b3") },
];

export const SIGNATURE_IDS = ["pbm","dt","vb","hn","cp","md","pb","vbg","cc","fls","ml"];
