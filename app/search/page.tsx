"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import api from "@/api/axios";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Header from "../components/Header";
import Footer from "../components/Footer";

type Product = {
    id: number;
    name: string;
    image: string;
    description: string;
    price: number;
    tag: string;
};

// --- This part handles the search logic ---
function SearchContent() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";

    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getFilteredProducts = async () => {
            setLoading(true);
            try {
                const res = await api.get<Product[]>("/products/");
                const results = res.data.filter(p =>
                    p.name.toLowerCase().includes(query.toLowerCase()) ||
                    p.description.toLowerCase().includes(query.toLowerCase())
                );
                setFilteredProducts(results);
            } catch (error) {
                console.error("Search error:", error);
            } theme: {
                setLoading(false);
            }
        };
        getFilteredProducts();
    }, [query]);

    return (
        <div className="container mx-auto px-3 md:px-6 py-12">
            <div className="text-center mb-16">
                <h1 className="font-serif text-2xl md:text-4xl text-[#360212] font-bold">Search Results</h1>
                <p className="text-[#89547c] mt-2">
                    {loading ? "Searching..." : `Found ${filteredProducts.length} results for: `}
                    <span className="font-bold text-[#fe5457]">"{query}"</span>
                </p>
                <div className="w-24 h-1 bg-[#fe5457] mx-auto mt-4"></div>
            </div>

            <div className="grid gap-3 md:gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredProducts.map((product) => (
                    <motion.div key={product.id} whileHover={{ y: -8 }}>
                        <Card className="border-none bg-white shadow-sm overflow-hidden h-full flex flex-col">
                            <Link href={`/product/${product.id}`} className="relative block group">
                                <CardContent className="p-0">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-40 md:h-64 object-contain p-4 group-hover:scale-105 transition-transform"
                                    />
                                </CardContent>
                            </Link>
                            <CardFooter className="flex flex-col p-4 md:p-6 text-center mt-auto">
                                <h3 className="font-serif text-base md:text-lg text-[#360212] font-semibold mb-2 line-clamp-1">{product.name}</h3>
                                <span className="text-xl md:text-2xl font-bold text-[#9f002b] mb-4">₦{Number(product.price).toLocaleString()}</span>
                                <button className="w-full py-2 bg-[#fe5457] text-white font-bold uppercase tracking-widest text-[10px]">Add To Cart</button>
                            </CardFooter>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

// --- This part prevents the deployment errors (The Fix) ---
export default function SearchPage() {
    return (
        <main className="min-h-screen bg-[#fcf9f6]">
            <Header />
            <Suspense fallback={<div className="text-center py-20 font-serif">Loading Search...</div>}>
                <SearchContent />
            </Suspense>
            <Footer />
        </main>
    );
}