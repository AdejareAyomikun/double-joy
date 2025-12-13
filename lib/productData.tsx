import api from "axios";
import Products from "@/app/components/Products";
import { label } from "framer-motion/client";


export async function getAllProducts() {
  const response = await api.get("/products/");
  return response.data;
}

export async function getProductDetails(slug: string) {
  const response = await api.get(`/products/${slug}/`);
  return response.data;
}

export async function getProductsByCategory(category: string) {
  const response = await api.get(`/products/category/${category}/`);
  return response.data;
}

export const categories = [
  {
    name: "cars",
    label: "Cars",
    products: [
      {
        name: "Tesla Model S",
        product: "model-s",
        price: 120000,
        description: "A premium electric sedan with cutting-edge performance.",
        image: "/images/cars/tesla-s.png",
      },
      {
        name: "Tesla Model X",
        product: "model-x",
        image: "/images/cars/tesla-x.png",
        price: 135000,
        description: "A luxury SUV with falcon-wing doors.",
      },
      {
        name: "Tesla Model Y",
        product: "model-y",
        image: "/images/cars/tesla-y.png",
        price: 135000,
        description: "A luxury SUV with falcon-wing doors.",
      },
      {
        name: "Benz GLE 350",
        product: "benz-gle-350",
        image: "/images/cars/benz-gle350.png",
        price: 135000,
        description: "A luxury SUV with falcon-wing doors.",
      },
      {
        name: "Toyota Rav 4 2020",
        product: "model-y",
        image: "/images/cars/rav4-2020.png",
        price: 135000,
        description: "A luxury SUV with falcon-wing doors.",
      },
      {
        name: "Benz GLE 450",
        product: "benz-gle-450",
        image: "/images/cars/benz-gle450.png",
        price: 135000,
        description:
          "A luxury SUV with falcon-wing doors. The Mercedes-Benz GLE 450 is a luxury SUV that features a 3.0L inline-6 turbo engine with a mild hybrid system, producing 375 hp and 369 lb-ft of torque. It comes standard with 4MATIC all-wheel drive and a 9-speed automatic transmission. Key features include a roomy cabin that seats five (with an optional third row for seven), advanced technology like the MBUX infotainment system, and a towing capacity of 7,700 lbs. ",
      },
    ],
  },
  {
    name: "phones",
    label: "Phones",
    products: [
      {
        name: "IPhone 15 Pro Max",
        product: "iphone-15-pro-max",
        image: "/images/phones/iphone-15-pro-max.png",
        price: 1450,
        description:
          "Apple’s flagship with A17 Pro chip, titanium build, and an advanced 48MP camera system.",
      },
      {
        name: "IPhone 14 Pro",
        product: "iphone-14-pro",
        image: "/images/phones/iphone-14-pro.png",
        price: 1200,
        description:
          "Premium performance with Dynamic Island, ProMotion display, and 48MP sensor.",
      },
      {
        name: "IPhone 13 Pro Max",
        product: "iphone-13-pro-max",
        image: "/images/phones/iphone-13-pro-max.png",
        price: 750,
        description:
          "A powerful everyday iPhone featuring the A15 Bionic chip and excellent battery life.",
      },
      {
        name: "Samsung Galaxy S24 Ultra",
        product: "samsung-s24-ultra",
        image: "/images/phones/samsung-s24-ultra.png",
        price: 1350,
        description:
          "Flagship performance with AI-powered features, 200MP camera, and premium build quality.",
      },
      {
        name: "Samsung Galaxy S23 Ultra",
        product: "samsung-s23-ultra",
        image: "/images/phones/samsung-s23-ultra.png",
        price: 950,
        description:
          "A high-performance smartphone with Snapdragon 8 Gen 2 chip and long-lasting battery.",
      },
      {
        name: "Samsung Galaxy A54",
        product: "samsung-a54",
        image: "/images/phones/samsung-a54.png",
        price: 450,
        description:
          "A mid-range device with Super AMOLED display and excellent camera performance for the price.",
      },
      {
        name: "Infinix Zero 30 5G",
        product: "infinix-zero-30-5g",
        image: "/images/phones/infinix-zero-30.png",
        price: 350,
        description:
          "A stylish 5G phone with a 108MP camera and fast charging for content creators.",
      },
      {
        name: "Infinix Hot 40 Pro",
        product: "infinix-hot-40-pro",
        image: "/images/phones/infinix-hot-40-pro.png",
        price: 250,
        description:
          "Affordable performance featuring a large display and efficient gaming processor.",
      },
      {
        name: "Infinix Note 30",
        product: "infinix-note-30",
        image: "/images/phones/infinix-note-30.png",
        price: 280,
        description:
          "A reliable smartphone with strong battery life and 33W fast charging.",
      },
      {
        name: "Redmi Note 13 Pro+ 5G",
        product: "redmi-note-13-pro-plus",
        image: "/images/phones/redmi-note-13-pro-plus.png",
        price: 420,
        description:
          "A premium mid-range device with curved AMOLED screen and 200MP camera.",
      },
      {
        name: "Redmi Note 12",
        product: "redmi-note-12",
        image: "/images/phones/redmi-note-12.png",
        price: 280,
        description:
          "Affordable phone with AMOLED display and impressive battery performance.",
      },
      {
        name: "Redmi 10A",
        product: "redmi-10a",
        image: "/images/phones/redmi-10a.png",
        price: 140,
        description:
          "Entry-level smartphone built for reliability, large battery, and daily use efficiency.",
      },
      {
        name: "Google Pixel 8 Pro",
        product: "pixel-8-pro",
        image: "/images/phones/pixel-8-pro.png",
        price: 1100,
        description:
          "Powered by Google Tensor G3 with top-tier AI features and industry-leading camera quality.",
      },
      {
        name: "Google Pixel 7",
        product: "pixel-7",
        image: "/images/phones/pixel-7.png",
        price: 650,
        description:
          "A clean Android experience with powerful imaging and excellent performance.",
      },
      {
        name: "Google Pixel 6a",
        product: "pixel-6a",
        image: "/images/phones/pixel-6a.png",
        price: 420,
        description:
          "A compact and affordable device offering reliable speed and Pixel-class photography.",
      },
    ],
  },
  {
    name: "wristwatches",
    label: "Wrist Watches",
    products: [
      {
        name: "Rolex Submariner",
        product: "rolex-submariner",
        image: "/images/watches/rolex-submariner.png",
        price: 12500,
        description:
          "A premium Swiss diving watch known for durability, precision, and timeless luxury.",
      },
      {
        name: "Omega Seamaster 300M",
        product: "omega-seamaster-300m",
        image: "/images/watches/omega-seamaster-300m.png",
        price: 6900,
        description:
          "A professional-grade diving watch combining elegance, reliability, and precision engineering.",
      },
      {
        name: "Casio G-Shock GA-2100",
        product: "gshock-ga2100",
        image: "/images/watches/gshock-ga2100.png",
        price: 150,
        description:
          "A rugged digital-analog watch with shock resistance and iconic octagonal design.",
      },
      {
        name: "Audemars Piguet Royal Oak",
        product: "ap-royal-oak",
        image: "/images/watches/ap-royal-oak.png",
        price: 32000,
        description:
          "A luxury Swiss masterpiece recognized for its octagonal bezel and exquisite craftsmanship.",
      },
      {
        name: "Tag Heuer Carrera Calibre 16",
        product: "tag-carrera-calibre16",
        image: "/images/watches/tag-carrera-calibre16.png",
        price: 4200,
        description:
          "A sporty chronograph designed with motorsport heritage and precision movement.",
      },
    ],
  },
  {
    name: "sneakers",
    label: "Sneakers",
    products: [
      {
        name: "Nike Air Force 1",
        product: "nike-air-force-1",
        image: "/images/sneakers/nike-air-force-1.png",
        price: 120,
        description:
          "A classic basketball-inspired sneaker known for comfort, durability, and iconic streetwear style.",
      },
      {
        name: "Adidas Yeezy Boost 350 V2",
        product: "yeezy-boost-350-v2",
        image: "/images/sneakers/yeezy-boost-350-v2.png",
        price: 350,
        description:
          "A premium lifestyle sneaker featuring Boost cushioning and a stylish Primeknit upper.",
      },
      {
        name: "Jordan Retro 4",
        product: "jordan-retro-4",
        image: "/images/sneakers/jordan-retro-4.png",
        price: 280,
        description:
          "A timeless Jordan model blending basketball heritage with modern street fashion.",
      },
      {
        name: "New Balance 550",
        product: "new-balance-550",
        image: "/images/sneakers/new-balance-550.png",
        price: 140,
        description:
          "A retro-inspired sneaker with clean lines, premium materials, and excellent everyday comfort.",
      },
      {
        name: "Converse Chuck Taylor All Star",
        product: "converse-chuck-taylor",
        image: "/images/sneakers/converse-chuck-taylor.png",
        price: 65,
        description:
          "A legendary canvas sneaker known for its simple design, versatility, and cultural impact.",
      },
    ],
  },
  {
    name: "maleshoes",
    label: "Male Shoes",
    products: [
      {
        name: "Oxford Cap-Toe Leather Shoes",
        product: "oxford-cap-toe",
        image: "/images/men-shoes/oxford-cap-toe.png",
        price: 180,
        description:
          "Classic cap-toe Oxford crafted from premium leather, perfect for business and formal occasions.",
      },
      {
        name: "Derby Polished Leather Shoes",
        product: "derby-polished",
        image: "/images/men-shoes/derby-polished.png",
        price: 160,
        description:
          "A versatile Derby shoe with an open-lace design, offering a blend of comfort and elegance.",
      },
      {
        name: "Loafers Italian Suede",
        product: "italian-suede-loafers",
        image: "/images/men-shoes/italian-suede-loafers.png",
        price: 150,
        description:
          "Premium suede loafers handcrafted with an ultra-soft finish—ideal for business casual outfits.",
      },
      {
        name: "Brogue Wingtip Leather Shoes",
        product: "brogue-wingtip",
        image: "/images/men-shoes/brogue-wingtip.png",
        price: 175,
        description:
          "Elegant wingtip brogues featuring detailed perforations and high-quality leather construction.",
      },
      {
        name: "Double Monk Strap Shoes",
        product: "double-monk-strap",
        image: "/images/men-shoes/double-monk-strap.png",
        price: 190,
        description:
          "Sophisticated double-buckle monk straps that add a modern edge to any corporate or formal look.",
      },
    ],
  },
  {
    name: "malewears",
    label: "Male Wears",
    products: [
      {
        name: "Classic White Dress Shirt",
        product: "white-dress-shirt",
        image: "/images/men-wears/white-dress-shirt.png",
        price: 55,
        description:
          "A crisp white dress shirt tailored for a sharp, professional look. Perfect for office and formal events.",
      },
      {
        name: "Slim-Fit Blue Oxford Shirt",
        product: "blue-oxford-shirt",
        image: "/images/men-wears/blue-oxford-shirt.png",
        price: 60,
        description:
          "Premium slim-fit Oxford shirt crafted from breathable cotton. A stylish choice for business meetings.",
      },
      {
        name: "Striped Button-Up Shirt",
        product: "striped-button-up",
        image: "/images/men-wears/striped-button-up.png",
        price: 58,
        description:
          "A classic striped shirt designed to elevate your professional wardrobe with subtle elegance.",
      },
      {
        name: "Tailored Black Dress Pants",
        product: "black-dress-pants",
        image: "/images/men-wears/black-dress-pants.png",
        price: 75,
        description:
          "High-quality tailored pants with a sleek finish. Ideal for office wear and formal occasions.",
      },
      {
        name: "Grey Slim-Fit Trousers",
        product: "grey-slim-fit-trousers",
        image: "/images/men-wears/grey-slim-fit-trousers.png",
        price: 78,
        description:
          "Modern slim-fit trousers that pair perfectly with shirts and blazers for a complete official outfit.",
      },
      {
        name: "Navy Blue Formal Chinos",
        product: "navy-formal-chinos",
        image: "/images/men-wears/navy-formal-chinos.png",
        price: 70,
        description:
          "Soft yet structured chinos designed for comfort and corporate elegance.",
      },
      {
        name: "Two-Piece Charcoal Grey Suit",
        product: "charcoal-grey-suit",
        image: "/images/men-wears/charcoal-grey-suit.png",
        price: 250,
        description:
          "A refined two-piece suit tailored with precision for a clean, executive look.",
      },
      {
        name: "Navy Blue Executive Suit",
        product: "navy-executive-suit",
        image: "/images/men-wears/navy-executive-suit.png",
        price: 280,
        description:
          "A premium navy suit that exudes confidence and style. Ideal for business leaders and formal events.",
      },
      {
        name: "Three-Piece Black Classic Suit",
        product: "black-three-piece-suit",
        image: "/images/men-wears/black-three-piece-suit.png",
        price: 320,
        description:
          "Elegant three-piece suit featuring a vest, jacket, and trousers. Perfect for weddings, boardrooms, and ceremonies.",
      },
    ],
  },
  {
    name: "femalewears",
    label: "Female Wears",
    products: [
      {
        name: "Classic Black Office Dress",
        product: "black-office-dress",
        image: "/images/women-wears/black-office-dress.png",
        price: 85,
        description:
          "A sleek, knee-length black dress perfect for corporate meetings and everyday professional wear.",
      },
      {
        name: "Navy Blue Pencil Dress",
        product: "navy-pencil-dress",
        image: "/images/women-wears/navy-pencil-dress.png",
        price: 90,
        description:
          "Elegant pencil dress with a flattering fit, ideal for office presentations and formal events.",
      },
      {
        name: "Floral Modest Work Dress",
        product: "floral-work-dress",
        image: "/images/women-wears/floral-work-dress.png",
        price: 78,
        description:
          "A soft, floral corporate dress designed with comfort and professional style in mind.",
      },
      {
        name: "White Chiffon Office Blouse",
        product: "white-chiffon-blouse",
        image: "/images/women-wears/white-chiffon-blouse.png",
        price: 45,
        description:
          "A lightweight chiffon blouse suitable for both formal and semi-formal work environments.",
      },
      {
        name: "Blue Button-Up Office Shirt",
        product: "blue-button-up-shirt",
        image: "/images/women-wears/blue-button-up-shirt.png",
        price: 50,
        description:
          "A tailored blue shirt that pairs perfectly with skirts and trousers for a polished office look.",
      },
      {
        name: "Silk Corporate Top",
        product: "silk-corporate-top",
        image: "/images/women-wears/silk-corporate-top.png",
        price: 65,
        description:
          "Premium silk top designed to elevate your professional appearance with effortless elegance.",
      },
      {
        name: "Black High-Waist Pencil Skirt",
        product: "black-pencil-skirt",
        image: "/images/women-wears/black-pencil-skirt.png",
        price: 55,
        description:
          "A timeless high-waist skirt that adds structure and sophistication to any office outfit.",
      },
      {
        name: "Grey A-Line Office Skirt",
        product: "grey-a-line-skirt",
        image: "/images/women-wears/grey-a-line-skirt.png",
        price: 58,
        description:
          "Modest A-line skirt designed for comfort and easy movement during long workdays.",
      },
      {
        name: "Navy Corporate Midi Skirt",
        product: "navy-midi-skirt",
        image: "/images/women-wears/navy-midi-skirt.png",
        price: 60,
        description:
          "A classy midi-length skirt perfect for a clean and fully corporate appearance.",
      },
      {
        name: "Black Slim Office Trousers",
        product: "black-office-trousers",
        image: "/images/women-wears/black-office-trousers.png",
        price: 70,
        description:
          "Fitted and comfortable trousers suitable for everyday office wear and meetings.",
      },
      {
        name: "Beige Straight-Cut Pants",
        product: "beige-office-pants",
        image: "/images/women-wears/beige-office-pants.png",
        price: 72,
        description:
          "Professional straight-cut trousers crafted for elegance and comfort throughout the day.",
      },
      {
        name: "Navy Blue Corporate Trousers",
        product: "navy-office-pants",
        image: "/images/women-wears/navy-office-pants.png",
        price: 75,
        description:
          "Premium navy trousers that match perfectly with blazers, blouses, and corporate shirts.",
      },
      {
        name: "Black Fitted Blazer",
        product: "black-fitted-blazer",
        image: "/images/women-wears/black-fitted-blazer.png",
        price: 110,
        description:
          "A structured fitted blazer designed to complement dresses, skirts, and trousers.",
      },
      {
        name: "Cream Office Blazer",
        product: "cream-office-blazer",
        image: "/images/women-wears/cream-office-blazer.png",
        price: 115,
        description:
          "Elegant cream blazer that adds a soft professional touch to any outfit.",
      },
      {
        name: "Black Low-Heel Court Shoes",
        product: "black-court-shoes",
        image: "/images/women-wears/black-court-shoes.png",
        price: 65,
        description:
          "Classic low-heel shoes that combine comfort with a corporate-ready look.",
      },
      {
        name: "Nude Corporate Pumps",
        product: "nude-corporate-pumps",
        image: "/images/women-wears/nude-pumps.png",
        price: 70,
        description:
          "A stylish pair of nude pumps that match effortlessly with all office outfits.",
      },
    ],
  },
  {
    name: "laptops",
    label: "Laptops",
    products: [
      {
        name: 'MacBook Pro 16" M2 Max',
        product: "macbook-pro-16-m2-max",
        image: "/images/laptops/macbook-pro-16-m2-max.png",
        price: 3499,
        description:
          "Apple's top-tier laptop with M2 Max chip, 16-inch Retina display, and exceptional battery life.",
      },
      {
        name: "MacBook Air M2",
        product: "macbook-air-m2",
        image: "/images/laptops/macbook-air-m2.png",
        price: 1249,
        description:
          "Ultra-lightweight laptop with M2 chip, silent fanless design, and vibrant Retina display.",
      },
      {
        name: "HP Spectre x360 14",
        product: "hp-spectre-x360-14",
        image: "/images/laptops/hp-spectre-x360-14.png",
        price: 1450,
        description:
          "Premium 2-in-1 convertible laptop with touchscreen, Intel Core i7, and long battery life.",
      },
      {
        name: "HP Envy 13",
        product: "hp-envy-13",
        image: "/images/laptops/hp-envy-13.png",
        price: 950,
        description:
          "Sleek ultrabook with solid performance, lightweight chassis, and excellent build quality.",
      },
      {
        name: "Dell XPS 15",
        product: "dell-xps-15",
        image: "/images/laptops/dell-xps-15.png",
        price: 1700,
        description:
          "High-performance laptop with 15-inch 4K display, Intel Core i9, and premium design.",
      },
      {
        name: "Dell Inspiron 14",
        product: "dell-inspiron-14",
        image: "/images/laptops/dell-inspiron-14.png",
        price: 720,
        description:
          "Affordable and reliable laptop suitable for office work, study, and everyday computing.",
      },
      {
        name: "Lenovo ThinkPad X1 Carbon",
        product: "lenovo-thinkpad-x1-carbon",
        image: "/images/laptops/lenovo-thinkpad-x1-carbon.png",
        price: 1600,
        description:
          "Lightweight business laptop with robust performance, security features, and exceptional keyboard.",
      },
      {
        name: "Lenovo IdeaPad 5",
        product: "lenovo-ideapad-5",
        image: "/images/laptops/lenovo-ideapad-5.png",
        price: 650,
        description:
          "Budget-friendly laptop with solid performance and smooth everyday computing experience.",
      },
      {
        name: "Asus ROG Zephyrus G14",
        product: "asus-rog-zephyrus-g14",
        image: "/images/laptops/asus-rog-g14.png",
        price: 1450,
        description:
          "Gaming laptop with AMD Ryzen 9, high refresh rate display, and strong GPU performance.",
      },
      {
        name: "Asus ZenBook 13",
        product: "asus-zenbook-13",
        image: "/images/laptops/asus-zenbook-13.png",
        price: 950,
        description:
          "Slim ultrabook with long battery life, lightweight design, and reliable daily performance.",
      },
      {
        name: "Acer Swift 3",
        product: "acer-swift-3",
        image: "/images/laptops/acer-swift-3.png",
        price: 680,
        description:
          "Lightweight and affordable laptop with Ryzen 7 or Intel Core i7, suitable for students and professionals.",
      },
      {
        name: "Acer Predator Helios 300",
        product: "acer-predator-helios-300",
        image: "/images/laptops/acer-predator-helios-300.png",
        price: 1200,
        description:
          "Gaming laptop with high refresh rate display, RTX graphics, and powerful performance for heavy tasks.",
      },
    ],
  },
];
