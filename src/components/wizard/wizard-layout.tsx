"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePrepStore } from "@/lib/store";

import { HomeButton } from "@/components/common/home-button";

interface WizardLayoutProps {
    children: ReactNode;
    title: string;
    description?: string;
}

export function WizardLayout({ children, title, description }: WizardLayoutProps) {
    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-gray-50 p-4">
            <HomeButton />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-4xl text-center"
            >
                <div className="h-8" /> {/* Spacer instead of old nav */}

                <h2 className="mb-4 text-4xl font-bold text-trust-navy">{title}</h2>
                {description && (
                    <p className="mb-10 text-xl text-gray-500">{description}</p>
                )}

                <div className="w-full overflow-hidden rounded-2xl bg-white p-8 shadow-2xl sm:p-12">
                    <AnimatePresence mode="wait">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="w-full"
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}
