"use client";

import { Button } from "@/components/ui/button";
import { HomeButton } from "@/components/common/home-button";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Music, CheckCircle2, ListOrdered, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { LogicDashboard } from "@/components/prep/logic-dashboard";
import { useWordDancingStore } from "@/lib/word-dancing-store";
import { WORD_DANCING_DATA } from "@/lib/word-dancing-data";
import { useEffect, useState } from "react";

export default function WordDancingPage() {
    const { completedBunches } = useWordDancingStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const steps = [
        {
            id: 1,
            title: "Level 1: P와 R 구분하기",
            desc: "직관적으로 결론(Point)과 이유(Reason)를 구분하는 감각을 익힙니다.",
            icon: <CheckCircle2 className="h-8 w-8 text-purple-300" />,
            link: "/prep/step1",
            active: true
        },
        {
            id: 2,
            title: "Level 2: P, R, E 정리하기 -1",
            desc: "핵심 요소를 3가지 덩어리로 분류하는 기초 훈련입니다.",
            icon: <ListOrdered className="h-8 w-8 text-purple-500" />,
            link: "/prep/step2",
            active: true
        },
        {
            id: 3,
            title: "Level 3: P, R, E 정리하기 -2",
            desc: "복잡한 문장에서 P-R-E 구조를 찾아내는 심화 훈련입니다.",
            icon: <Sparkles className="h-8 w-8 text-purple-700" />,
            link: "/prep/step3",
            active: true
        },
        {
            id: 4,
            title: "Level 4: P, R, E, P' 완성하기",
            desc: "완벽한 4단 논법으로 당신의 생각을 구조화해보세요.",
            icon: <Music className="h-8 w-8 text-purple-900" />,
            link: "/prep/step4",
            active: true
        }
    ].map(step => {
        if (!mounted) return { ...step, progress: 0 };
        const levelData = WORD_DANCING_DATA.find(d => d.level === step.id);
        const total = levelData?.bunches.length || 1;
        const completed = completedBunches[step.id]?.length || 0;
        return {
            ...step,
            progress: Math.min(100, Math.round((completed / total) * 100))
        };
    });

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center p-6 relative">
            <HomeButton />

            <div className="max-w-5xl w-full pt-32 pb-20">
                <div className="text-center mb-16 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-trust-navy">
                            PREP 워드 댄싱
                        </h1>
                        <p className="text-xl text-slate-600 mt-6 md:mt-0 max-w-3xl mx-auto break-keep leading-relaxed">
                            생각의 리듬을 타며 논리를 완성하는 4단계 훈련
                        </p>
                    </motion.div>
                </div>

                <LogicDashboard />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {steps.map((step, idx) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <Link href={step.active ? step.link : "#"} className={!step.active ? "cursor-not-allowed" : ""}>
                                <div className={`bg-white rounded-xl shadow-sm border p-8 h-full flex flex-col justify-between hover:shadow-xl transition-all duration-300 border-2 ${step.active ? "border-transparent hover:border-trust-navy/20 cursor-pointer" : "opacity-60 border-slate-100 bg-slate-50"}`}>
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="p-3 bg-white rounded-2xl shadow-sm">
                                            {step.icon}
                                        </div>
                                        <span className="text-4xl font-black text-slate-100">0{step.id}</span>
                                    </div>

                                    <div>
                                        <h3 className={`text-2xl font-bold mb-3 ${step.active ? "text-slate-800" : "text-slate-400"}`}>
                                            <span className={cn(
                                                "font-black mr-2",
                                                step.id === 1 && "text-purple-300",
                                                step.id === 2 && "text-purple-500",
                                                step.id === 3 && "text-purple-700",
                                                step.id === 4 && "text-purple-900"
                                            )}>
                                                {step.title.split(':')[0]}
                                            </span>
                                            <span>{step.title.substring(step.title.indexOf(':') + 1)}</span>
                                        </h3>
                                        <p className="text-slate-500 font-medium leading-relaxed mb-4">
                                            {step.desc}
                                        </p>

                                        {/* Progress Bar */}
                                        <div className="space-y-1">
                                            <div className="flex justify-between text-xs font-bold text-slate-400">
                                                <span>진행률</span>
                                                <span className={step.active ? "text-slate-600" : ""}>
                                                    {Math.round(step.progress)}%
                                                </span>
                                            </div>
                                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                                <div
                                                    className={cn(
                                                        "h-full rounded-full transition-all duration-500",
                                                        step.id === 1 && "bg-purple-300",
                                                        step.id === 2 && "bg-purple-400",
                                                        step.id === 3 && "bg-purple-600",
                                                        step.id === 4 && "bg-purple-800"
                                                    )}
                                                    style={{ width: `${step.progress}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 flex justify-end">
                                        <div className={`p-2 rounded-full ${step.active ? "bg-trust-navy/5 text-trust-navy" : "bg-slate-100 text-slate-300"}`}>
                                            <ArrowRight className="h-6 w-6" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
