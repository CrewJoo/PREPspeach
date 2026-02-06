"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
// import { HomeButton } from "@/components/common/home-button";

export default function AboutPrepPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center p-6 relative">
            {/* <HomeButton /> */}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-5xl w-full pt-32 pb-20"
            >
                {/* Header */}
                <div className="text-center mb-16">
                    {/* <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-bold text-sm mb-4">
                        Logical Framework
                    </span> */}
                    <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-trust-navy mb-6">
                        PREP이란?
                    </h1>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto break-keep leading-relaxed">
                        PREP은 단순한 말하기 기법이 아닌, <br className="hidden sm:block" />복잡한 머릿속을 가장 명료하게 정렬하는 강력한<span className="text-trust-navy font-bold">'생각의 공식'</span>입니다.<br className="hidden sm:block" />
                        <span className="text-trust-navy font-bold">Point-Reason-Example-Point</span>로 이어지는 4단계 완벽한 논리 구조를 통해, <br className="hidden sm:block" />당신의 직관을 확신으로 바꾸고 상대를 매혹하는 커뮤니케이션의 정수를 경험하세요.
                    </p>
                </div>

                {/* PREP Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {[
                        {
                            step: "P",
                            name: "Point",
                            desc: "핵심 결론",
                            detail: "청중이 가장 궁금해하는 핵심 주장이나 결론을 두괄식으로 간결하게 제시합니다.",
                            color: "bg-red-400 text-white",
                            bar: "bg-red-400"
                        },
                        {
                            step: "R",
                            name: "Reason",
                            desc: "이유 및 근거",
                            detail: "왜 그런 결론이 나왔는지 논리적이고 타당한 이유를 설명하여주장의 신뢰를 얻습니다.",
                            color: "bg-blue-100 text-trust-navy",
                            bar: "bg-blue-400"
                        },
                        {
                            step: "E",
                            name: "Example",
                            desc: "구체적 사례",
                            detail: "데이터, 경험담, 예시 등을 통해 추상적인 이유를 구체화하고 설득력을 극대화합니다.",
                            color: "bg-green-100 text-green-800",
                            bar: "bg-success-green"
                        },
                        {
                            step: "P",
                            name: "Point",
                            desc: "요약 및 재강조",
                            detail: "앞선 내용을 요약하고 핵심 메시지를 다시 한번 강조하여 청중의 기억에 각인시킵니다.",
                            color: "bg-orange-400 text-white",
                            bar: "bg-orange-400"
                        },
                    ].map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 + 0.3 }}
                            className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300 h-full"
                        >
                            <div className={`absolute top-0 left-0 w-full h-3 ${step.bar}`} />
                            <span className={`flex h-20 w-20 items-center justify-center rounded-2xl text-3xl font-black mb-6 shadow-md ${step.color}`}>
                                {step.step}
                            </span>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{step.name}</h3>
                            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">{step.desc}</span>
                            <p className="text-slate-600 leading-relaxed font-medium break-keep">
                                {step.detail}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Detailed Description Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="bg-white rounded-3xl p-10 sm:p-14 shadow-2xl border border-trust-navy/10 text-center max-w-4xl mx-auto relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-slate-50/50 -z-10" />
                    <h3 className="text-2xl font-bold text-trust-navy mb-6">왜 PREP인가요?</h3>
                    <div className="space-y-6 text-lg text-slate-700 leading-relaxed break-keep text-left sm:text-center">
                        <p>
                            현대 비즈니스 환경과 AI 커뮤니케이션에서 가장 중요한 것은 <strong className="text-trust-navy bg-blue-50 px-1 rounded">"명확성"</strong>입니다.
                            장황한 설명은 청중의 집중력을 흐트러뜨리고, AI에게는 환각(Hallucination)을 유발합니다.
                        </p>
                        <p>
                            PREP은 이러한 문제를 해결하는 <strong className="text-trust-navy">가장 검증된 솔루션</strong>입니다.
                            결론부터 말하는 습관(Point)은 듣는 이의 뇌를 준비시키고,
                            명확한 근거(Reason)와 생생한 사례(Example)는 신뢰를 쌓으며,
                            마지막 강조(Point)는 강력한 여운을 남깁니다.
                        </p>
                        <p className="pt-4 font-bold text-slate-800">
                            지금 바로 이 절대적인 '생각의 공식'을 당신의 것으로 만들어보세요.
                        </p>
                    </div>

                    <div className="mt-12">
                        <Link href="/prep-word-dancing">
                            <Button size="lg" className="bg-trust-navy text-white hover:bg-trust-navy/90 font-bold px-12 h-16 text-xl rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all ring-4 ring-trust-navy/10">
                                'PREP 워드댄싱' 체험하기
                            </Button>
                        </Link>
                    </div>
                </motion.div>

            </motion.div>
        </div>
    );
}
