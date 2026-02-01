"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export function HomeButton() {
    return (
        <div className="absolute top-6 left-6 z-50">
            <Link href="/">
                <Button
                    variant="outline"
                    className="group flex items-center gap-2 rounded-full border-gray-200 bg-white/80 px-5 py-6 text-base font-bold text-gray-700 shadow-lg backdrop-blur-sm transition-all hover:border-trust-navy hover:bg-white hover:text-trust-navy hover:scale-105"
                >
                    <Home className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
                    <span>홈으로</span>
                </Button>
            </Link>
        </div>
    );
}
