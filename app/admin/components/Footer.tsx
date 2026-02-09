"use client";

import Link from "next/link";
import { ShieldCheck, Cpu, ExternalLink, Github } from "lucide-react";

export default function AdminFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-auto border-t border-[#d791be]/20 bg-white/50 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-8 py-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">

                    {/* Brand & Status Section */}
                    <div className="space-y-3 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#360212]">
                                System Operational
                            </span>
                        </div>
                        <p className="font-serif text-lg font-bold text-[#360212]">
                            Double-Joy <span className="text-[#fe5457]">Admin</span>
                        </p>
                        <p className="text-[9px] text-[#89547c] uppercase tracking-widest leading-loose">
                            Boutique Management Suite v2.0.4 <br />
                            Connected to Production API
                        </p>
                    </div>

                    {/* Quick Technical Links */}
                    <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
                        <div className="space-y-3">
                            <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-[#d791be]">Resources</h4>
                            <ul className="space-y-2 text-[10px] font-bold uppercase tracking-widest">
                                <li>
                                    <Link href="/admin/docs" className="text-[#360212] hover:text-[#fe5457] transition-colors">Documentation</Link>
                                </li>
                                <li>
                                    <a href="#" className="text-[#360212] hover:text-[#fe5457] transition-colors flex items-center gap-1">
                                        API Reference <ExternalLink size={10} />
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-[#d791be]">Security</h4>
                            <ul className="space-y-2 text-[10px] font-bold uppercase tracking-widest">
                                <li className="flex items-center gap-2 text-[#89547c]">
                                    <ShieldCheck size={12} className="text-[#fe5457]" /> Encrypted Session
                                </li>
                                <li className="flex items-center gap-2 text-[#89547c]">
                                    <Cpu size={12} /> Edge Optimized
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-10 pt-6 border-t border-[#fcf9f6] flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[9px] text-[#89547c] font-medium tracking-widest">
                        &copy; {currentYear} DOUBLE-JOY COLLECTIVE. ALL RIGHTS RESERVED.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link href="/" className="text-[9px] font-bold uppercase tracking-widest text-[#360212] hover:text-[#fe5457]">
                            View Storefront
                        </Link>
                        <div className="h-3 w-px bg-[#d791be]/30" />
                        <Github size={14} className="text-[#360212] cursor-pointer hover:text-[#fe5457]" />
                    </div>
                </div>
            </div>
        </footer>
    );
}