"use client";

import { motion } from "framer-motion";
import { ABOUT_COPY, LANDING_COPY, COLORS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { HomeButton } from "@/components/common/home-button";

export default function AboutPrepPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative">
            <HomeButton />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl w-full pt-12"
            >

                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-trust-navy mb-6">
                        {ABOUT_COPY.prep.title}
                    </h1>
                    <p className="text-xl sm:text-2xl text-slate-600 font-medium">
                        {ABOUT_COPY.prep.subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {LANDING_COPY.solution.steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 + 0.3 }}
                            className="bg-white rounded-2xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300"
                        >
                            <div className={`absolute top-0 left-0 w-full h-2 ${idx === 0 || idx === 3 ? 'bg-trust-navy' : 'bg-slate-300'}`} />
                            <span className={`flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-bold mb-6 shadow-lg ${idx === 0 || idx === 3 ? 'bg-trust-navy text-white' : 'bg-slate-100 text-slate-500'}`}>
                                {step.step}
                            </span>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{step.name}</h3>
                            <p className="text-gray-500">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-trust-navy/10 text-center max-w-3xl mx-auto"
                >
                    <p className="text-xl text-slate-700 leading-relaxed mb-8">
                        {ABOUT_COPY.prep.desc}
                    </p>
                    <Link href="/prep">
                        <Button size="lg" className="bg-trust-navy text-white hover:bg-trust-navy/90 font-bold px-10 h-14 text-lg rounded-full shadow-lg hover:scale-105 transition-all">
                            PREP 실습하러 가기
                        </Button>
                    </Link>
                </motion.div>

            </motion.div>
        </div>
    );
}
