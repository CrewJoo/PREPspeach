"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInterviewStore } from "@/lib/interview-store";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight, ChevronLeft, Send, CheckCircle2 } from "lucide-react";

const STEPS = [
    { key: 'dream', label: 'Dream (꿈/목표)', icon: '🌟' },
    { key: 'difficulty', label: 'Difficulty (고난)', icon: '🧗' },
    { key: 'trend', label: 'Trend (통찰)', icon: '📈' },
    { key: 'stand', label: 'Stand (가치관)', icon: '🚩' },
    { key: 'different', label: 'Different (차별성)', icon: '💎' },
] as const;

type StepKey = typeof STEPS[number]['key'];

export function InterviewWizard() {
    const { mode, step, answers, currentQuestions, setStep, setAnswer, setAnalyzing, setAnalysisResult } = useInterviewStore();
    const [inputValue, setInputValue] = useState("");

    // Load current step answer into input
    useEffect(() => {
        const currentKey = STEPS[step].key;
        setInputValue(answers[currentKey] || "");
    }, [step, answers]);

    const handleNext = () => {
        const currentKey = STEPS[step].key;
        setAnswer(currentKey, inputValue);

        if (step < STEPS.length - 1) {
            setStep(step + 1);
        } else {
            handleSubmit();
        }
    };

    const handlePrev = () => {
        const currentKey = STEPS[step].key;
        setAnswer(currentKey, inputValue); // Save current input before going back
        if (step > 0) setStep(step - 1);
    };

    const handleSubmit = async () => {
        setAnalyzing(true);
        try {
            // Need to construct final answers object to be sure
            const finalAnswers = { ...answers, [STEPS[step].key]: inputValue };

            const response = await fetch("/api/interview/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ answers: finalAnswers, mode }),
            });

            if (!response.ok) throw new Error("Analysis failed");

        } catch (error) {
            console.error(error);
            alert("분석 중 오류가 발생했습니다.");
            setAnalyzing(false); // Reset analyzing state on error
        }
    };

    const currentKey = STEPS[step].key;
    // Fallback if currentQuestions is empty (should not happen with persist, but safe to handle)
    const currentQuestion = currentQuestions?.[currentKey] || {
        q: "질문을 불러오는 중입니다...",
        guide: "잠시만 기다려주세요."
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            {/* Progress Steps */}
            <div className="flex justify-between mb-12 relative px-4">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 -translate-y-1/2 rounded-full" />
                {STEPS.map((s, idx) => (
                    <div key={s.key} className={`relative flex flex-col items-center gap-2 bg-white px-2 ${idx <= step ? 'text-trust-navy' : 'text-gray-400'}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 font-bold ${idx === step ? 'border-trust-navy bg-trust-navy text-white scale-110 shadow-lg' :
                            idx < step ? 'border-trust-navy bg-white text-trust-navy' : 'border-gray-200 bg-white text-gray-300'
                            }`}>
                            {idx < step ? <CheckCircle2 className="w-6 h-6" /> : idx + 1}
                        </div>
                        <span className={`text-xs font-bold whitespace-nowrap hidden sm:block ${idx === step ? 'opacity-100' : 'opacity-70'}`}>
                            {s.key.toUpperCase()}
                        </span>
                    </div>
                ))}
            </div>

            <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-100"
            >
                {/* Question Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-4xl">{STEPS[step].icon}</span>
                        <h2 className="text-xl font-bold text-trust-navy uppercase tracking-wider">{STEPS[step].label}</h2>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 leading-tight mb-4">
                        {currentQuestion.q}
                    </h3>
                    <p className="text-slate-500 bg-slate-50 p-4 rounded-xl border border-slate-200 inline-block text-sm">
                        💡 {currentQuestion.guide}
                    </p>
                </div>

                {/* Input Section */}
                <div className="space-y-6">
                    <Textarea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="이곳에 답변을 작성해주세요. (공백 포함 200자 이상 권장)"
                        className="min-h-[200px] text-lg p-6 rounded-2xl resize-none border-gray-200 focus:border-trust-navy focus:ring-trust-navy/10 shadow-inner"
                    />

                    <div className="flex justify-between items-center pt-4">
                        <Button
                            variant="ghost"
                            onClick={handlePrev}
                            disabled={step === 0}
                            className="text-slate-400 hover:text-slate-600"
                        >
                            <ChevronLeft className="w-5 h-5 mr-1" /> 이전 질문
                        </Button>
                        <Button
                            onClick={handleNext}
                            disabled={!inputValue.trim()}
                            className="bg-trust-navy hover:bg-trust-navy/90 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                        >
                            {step === STEPS.length - 1 ? (
                                <span className="flex items-center">분석하기 <Send className="w-5 h-5 ml-2" /></span>
                            ) : (
                                <span className="flex items-center">다음 질문 <ChevronRight className="w-5 h-5 ml-1" /></span>
                            )}
                        </Button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
