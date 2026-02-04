import { ReactNode, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePrepStore } from "@/lib/store";
import { QUESTIONS_INTERVIEW, QUESTIONS_WORK } from "@/lib/constants";

import { HomeButton } from "@/components/common/home-button";

interface WizardLayoutProps {
    children: ReactNode;
    title: string;
    description?: string;
    pageTitle?: string;
    pageDescription?: string | ReactNode;
}

export function WizardLayout({ children, title, description, pageTitle, pageDescription }: WizardLayoutProps) {
    const { question, setQuestion, mode } = usePrepStore();
    // Use local state to avoid hydration mismatch for random selection if needed, 
    // but store syncing is better. We'll set it in useEffect.

    useEffect(() => {
        if (!question && mode) {
            const list = mode === 'WORK' ? QUESTIONS_WORK : QUESTIONS_INTERVIEW;
            const randomQ = list[Math.floor(Math.random() * list.length)];
            setQuestion(randomQ);
        }
    }, [question, setQuestion, mode]);

    return (
        <div className="min-h-screen bg-slate-50 relative pb-20 p-6">
            <HomeButton />

            <div className="max-w-6xl mx-auto px-6 pt-32">
                {/* Page Header (Optional) - Global Page Title */}
                {(pageTitle || pageDescription) && (
                    <div className="text-center mb-16 space-y-6">
                        {pageTitle && (
                            <motion.h1
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-4xl sm:text-6xl font-black text-trust-navy tracking-tight"
                            >
                                {pageTitle}
                            </motion.h1>
                        )}
                        {pageDescription && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-xl text-slate-600 max-w-3xl mx-auto break-keep leading-relaxed"
                            >
                                {pageDescription}
                            </motion.div>
                        )}
                    </div>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-4xl mx-auto text-center"
                >
                    {/* Question Context Display */}
                    {question && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-8 text-left w-full"
                        >
                            <div className="flex items-start gap-4">
                                <span className="text-4xl font-handwriting text-red-500 font-bold -mt-2">Q.</span>
                                <h3 className="text-2xl font-bold text-gray-800 leading-tight">
                                    {question.q}
                                </h3>
                                <div className="flex-1 h-px bg-red-400/30 mt-4 ml-4 self-center" />
                            </div>
                        </motion.div>
                    )}

                    <div className="w-full overflow-hidden rounded-2xl bg-white p-8 shadow-2xl sm:p-12 text-left">
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

                    <div className="mt-8 mb-4">
                        <h2 className="mb-2 text-3xl font-bold text-trust-navy">{title}</h2>
                        {description && (
                            <p className="text-xl text-gray-500">{description}</p>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
