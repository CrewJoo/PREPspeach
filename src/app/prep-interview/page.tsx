"use client";

import { useEffect } from "react";

import { useInterviewStore } from "@/lib/interview-store";
import { ModeSelection } from "@/components/prep/mode-selection";
// import { HomeButton } from "@/components/common/home-button";
import { InterviewWizard } from "@/components/interview/interview-wizard";
import { AnalysisResult } from "@/components/interview/analysis-result";
import { motion, AnimatePresence } from "framer-motion";

export default function PrepInterviewPage() {
    const { mode, setMode, startInterview, isAnalyzing, analysisResult, reset } = useInterviewStore();

    // Reset loop check: If analyzing but no object, reset to avoid stuck state
    // Reset state when the component unmounts (navigating away)
    useEffect(() => {
        return () => {
            useInterviewStore.getState().reset();
        };
    }, []);

    // Actually, looking at MainNav, it calls `useInterviewStore.getState().reset()`.
    // If that works, state should be clear. 
    // Maybe the Next.js Link behavior with onClick is tricky?
    // Let's force a reset effect if mode is selected but we want a fresh start? No, that kills persistence during use.

    // Better fix: Ensure `AnalysisResult` handles the "stuck" state.
    // If `isAnalyzing` is true, it renders AnalysisResult (or the loading view).
    // If `AnalysisResult` mounts and sees no `object` (from useObject) and no `analysisResult` (stored), 
    // it tries to submit. If submission fails or was already done but state is stale, it might spin forever.

    // Let's add a timeout or error state in AnalysisResult.

    if (!mode) {
        return (
            <div className="min-h-screen bg-slate-50 relative pb-20 p-6">
                {/* <HomeButton /> */}

                <div className="max-w-6xl mx-auto px-6 pt-32">
                    {/* Header */}
                    <div className="text-center mb-16 space-y-6">
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl sm:text-6xl font-black text-trust-navy tracking-tight"
                        >
                            PREP 면접 오디세이
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-slate-600 max-w-3xl mx-auto break-keep leading-relaxed"
                        >
                            <span className="text-trust-navy font-bold">오디세이(5D-say)</span>는 당신의 잠재력을 5가지 차원(Dream, Difficulty, Trend, Stand, Different)에서 입체적으로 분석하는 AI 면접 코칭 서비스입니다. <span className="text-trust-navy font-bold">5가지 차원</span>은 면접관들이 질문을 통해 파악하고 싶은 지원자에 대한 핵심 역량입니다.<br className="hidden sm:block" />
                            실제 면접처럼 이어지는 심층 질문을 통해 나만의 고유한 스토리를 발견하고, <span className="text-trust-navy font-bold">PREP 구조</span>로 논리를 완성하는 특별한 여정을 시작해보세요.
                        </motion.p>
                    </div>

                    <div className="text-center mb-8">
                        <span className="inline-block py-1 px-3 rounded-full bg-slate-100 text-slate-600 text-sm font-bold mb-2 border border-slate-200">
                            MODE SELECT
                        </span>
                        <h2 className="text-2xl font-bold text-slate-700">
                            어떤 면접을 준비하시나요?
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* School Mode (Advancement) */}
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => startInterview('SCHOOL')}
                            className="flex flex-col items-center p-12 bg-white rounded-3xl shadow-xl hover:shadow-2xl border-2 border-transparent hover:border-trust-navy transition-all group"
                        >
                            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-8 group-hover:bg-trust-navy transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-trust-navy group-hover:text-white transition-colors">
                                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-4">진학 면접</h3>
                            <p className="text-slate-500 text-center leading-relaxed">
                                입학 사정관과의 1:1 심층 면접<br />
                                잠재력과 학업 의지를 어필하세요
                            </p>
                        </motion.button>

                        {/* Job Mode (Employment) */}
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => startInterview('JOB')}
                            className="flex flex-col items-center p-12 bg-white rounded-3xl shadow-xl hover:shadow-2xl border-2 border-transparent hover:border-trust-navy transition-all group"
                        >
                            <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-8 group-hover:bg-trust-navy transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600 group-hover:text-white transition-colors">
                                    <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-4">취업 면접</h3>
                            <p className="text-slate-500 text-center leading-relaxed">
                                인사 담당자와의 역량 면접<br />
                                직무 적합성과 가치관을 보여주세요
                            </p>
                        </motion.button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white relative pb-20 p-6">
            {/* <HomeButton /> */}

            <div className="max-w-5xl mx-auto px-4 pt-28">
                {/* Header Area */}
                <div className="mb-12 text-center space-y-4">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                        <h1 className="text-3xl font-bold text-trust-navy">
                            {mode === 'SCHOOL' ? '입학사정관 INTERVIEW' : 'HR 면접관 INTERVIEW'}
                        </h1>
                        <p className="text-xl text-slate-500 mt-2">
                            {isAnalyzing || analysisResult
                                ? "대화 내용을 바탕으로 잠재력을 분석했습니다."
                                : "편안하게 대화하며 당신만의 이야기를 들려주세요."}
                        </p>
                    </motion.div>
                </div>

                {/* Content Area */}
                <AnimatePresence mode="wait">
                    {isAnalyzing || analysisResult ? (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            transition={{ duration: 0.5 }}
                        >
                            <AnalysisResult />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="chat"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <InterviewWizard />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
