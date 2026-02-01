"use client";

import { motion } from "framer-motion";
import { HomeButton } from "@/components/common/home-button";
import { Sparkles } from "lucide-react";

export default function AboutAisperPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative">
            <HomeButton />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl w-full pt-12"
            >

                {/* Section 1 (Formerly Section 3): PREP Aisper - NOW TOP, LARGER */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-trust-navy/10 text-center max-w-4xl mx-auto relative overflow-hidden mb-16"
                >
                    {/* Decorative background for emphasis */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50 opacity-50 z-0" />

                    <div className="relative z-10">
                        {/* Enlarged Badge/Title */}
                        <span className="inline-block px-10 py-5 rounded-full bg-trust-navy text-white font-black text-4xl sm:text-6xl mb-10 shadow-xl tracking-tight">
                            PREP Aisper란?
                        </span>
                        <h2 className="text-3xl sm:text-5xl text-gray-900 font-extrabold leading-relaxed whitespace-pre-wrap break-keep">
                            "생각의 도구 PREP으로<br />인공지능을 주도하는 <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">논리 지휘자</span>"
                        </h2>
                    </div>
                </motion.div>

                {/* Section 2 (Formerly Section 1): Aisper Header - NOW MIDDLE/BOTTOM, LARGER */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-700 mb-6">
                        Aisper (아이스퍼)란?
                    </h1>
                    <p className="text-2xl sm:text-3xl text-slate-500 font-medium whitespace-pre-wrap break-keep leading-relaxed">
                        AI를 다루는 '영적인 한 수'를 가진 논리 지휘자
                    </p>
                </div>

                {/* Section 3 (Formerly Section 2): Cards - Moved below Aisper Header */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {/* Card 1 */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white rounded-2xl p-8 shadow-lg shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center relative overflow-hidden hover:-translate-y-1 transition-transform duration-300"
                    >
                        <div className="absolute top-0 left-0 w-full h-2 bg-purple-600" />
                        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 text-3xl font-bold mb-6">
                            Ai
                        </span>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">AI + Whisper</h3>
                        <p className="text-lg text-gray-500 break-keep">속삭이는 자<br />AI와 교감하는 능력</p>
                    </motion.div>

                    {/* Card 2 */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="bg-white rounded-2xl p-8 shadow-lg shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center relative overflow-hidden hover:-translate-y-1 transition-transform duration-300"
                    >
                        <div className="absolute top-0 left-0 w-full h-2 bg-indigo-600" />
                        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 text-3xl font-bold mb-6">
                            Sp
                        </span>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Super</h3>
                        <p className="text-lg text-gray-500 break-keep">능가하는<br />단순 사용자를 넘어선 경지</p>
                    </motion.div>

                    {/* Card 3 */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 }}
                        className="bg-white rounded-2xl p-8 shadow-lg shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center relative overflow-hidden hover:-translate-y-1 transition-transform duration-300"
                    >
                        <div className="absolute top-0 left-0 w-full h-2 bg-pink-600" />
                        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-50 text-pink-600 text-3xl font-bold mb-6">
                            <Sparkles className="h-8 w-8" />
                        </span>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Inspiration</h3>
                        <p className="text-lg text-gray-500 break-keep">AI에게 영감을<br />불어넣는 사람</p>
                    </motion.div>
                </div>

            </motion.div>
        </div>
    );
}
