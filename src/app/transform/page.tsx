"use client";

import { useState, useEffect } from "react";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, AlertCircle } from "lucide-react";
import { HomeButton } from "@/components/common/home-button";
import { QUESTIONS_INTERVIEW, QUESTIONS_WORK, PrepQuestion } from "@/lib/constants";
import { ModeSelection } from "@/components/prep/mode-selection";
import { usePrepStore } from "@/lib/store";

// Define the schema to match the API (for type inference if needed, though useObject handles partials)
const prepSchema = z.object({
    point1: z.string(),
    reason: z.string(),
    example: z.string(),
    point2: z.string(),
    advice: z.string(),
});

export default function TransformPage() {
    const { mode, setMode, reset } = usePrepStore();
    const [input, setInput] = useState("");
    const [question, setQuestion] = useState<PrepQuestion | null>(null);

    useEffect(() => {
        reset();
    }, [reset]);

    useEffect(() => {
        if (mode) {
            const list = mode === 'WORK' ? QUESTIONS_WORK : QUESTIONS_INTERVIEW;
            setQuestion(list[Math.floor(Math.random() * list.length)]);
        }
    }, [mode]);

    const { object, submit, isLoading, error } = useObject({
        api: "/api/transform",
        schema: prepSchema,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        submit({ input });
    };

    // 'object' contains the partial object as it streams in
    const parsedData = object;

    if (!mode) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative">
                <HomeButton />
                <div className="w-full pt-32 pb-20">
                    <ModeSelection onSelect={(m) => setMode(m)} />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 relative pb-20 p-6">
            <HomeButton />

            <div className="max-w-7xl mx-auto px-6 pt-32">
                {/* Header */}
                <div className="text-center mb-16 space-y-6">
                    <h1 className="text-4xl sm:text-6xl font-black text-trust-navy tracking-tight">
                        PREP 변환기
                    </h1>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto break-keep leading-relaxed">
                        두서없이 떠오르는 생각들을 자유롭게 적어보세요.<br className="hidden sm:block" />
                        AI가 <span className="font-bold text-trust-navy">PREP</span> 공식에 맞춰 논리적이고 체계적인 답변으로 즉시 변환해드립니다.
                    </p>
                </div>

                {/* Content */}
                <div className="w-full space-y-10">

                    {/* Question Context */}
                    {question && (
                        <div className="w-full mb-8">
                            <div className="flex items-start gap-4">
                                <span className="text-4xl font-handwriting text-red-500 font-bold -mt-2">Q.</span>
                                <h3 className="text-2xl font-bold text-gray-800 leading-tight">
                                    {question.q}
                                </h3>
                                <div className="flex-1 h-px bg-red-400/30 mt-4 ml-4 self-center" />
                            </div>
                        </div>
                    )}

                    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                        {/* Input Section */}
                        <div className="space-y-4">
                            <div className="rounded-2xl bg-white p-8 shadow-xl">
                                <h2 className="mb-6 text-2xl font-bold text-gray-800">나의 생각 (비구조화)</h2>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <Textarea
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder={question ? `[작성 예시]\n${question.guide.example}` : "자유롭게 답변을 작성해 주세요."}
                                        className="min-h-[400px] text-lg resize-none p-6 leading-relaxed bg-white text-gray-900 border-gray-300 focus:ring-trust-navy"
                                    />
                                    <div className="text-center space-y-2 p-4 bg-gray-50 rounded-xl">
                                        <h1 className="text-xl font-bold text-trust-navy">주저리 PREP 변환기</h1>
                                        <p className="text-sm text-gray-600">하고 싶은 말을 마음껏 적으세요. AI가 논리적인 구조로 잡아드립니다.</p>
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={isLoading || !input.trim()}
                                        className="w-full bg-trust-navy py-8 text-xl font-bold hover:bg-trust-navy/90 rounded-xl shadow-lg transition-transform active:scale-95 text-white"
                                    >
                                        {isLoading ? (
                                            <span className="flex items-center gap-3">
                                                <Sparkles className="animate-spin h-6 w-6" /> 구조화 분석 중...
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-3">
                                                <Sparkles className="h-6 w-6" /> PREP으로 변환하기
                                            </span>
                                        )}
                                    </Button>
                                </form>
                            </div>
                        </div>

                        {/* Output Section */}
                        <div className="space-y-4">
                            <div className="h-full min-h-[600px] rounded-2xl bg-white p-8 shadow-xl flex flex-col">
                                <h2 className="mb-6 text-2xl font-bold text-gray-800">변환 결과 (PREP)</h2>

                                {error && (
                                    <div className="flex items-center gap-3 rounded-xl bg-red-50 p-6 text-red-600 text-lg">
                                        <AlertCircle className="h-6 w-6" />
                                        <p>오류가 발생했습니다. 다시 시도해주세요.</p>
                                    </div>
                                )}

                                {!parsedData && !isLoading && !error && (
                                    <div className="flex flex-1 items-center justify-center rounded-xl border-2 border-dashed border-gray-200 text-xl text-gray-400">
                                        왼쪽에서 내용을 입력하고 버튼을 눌러보세요.
                                    </div>
                                )}

                                {isLoading && !parsedData && (
                                    <div className="flex flex-1 flex-col items-center justify-center gap-6 text-trust-navy animate-pulse">
                                        <Sparkles className="h-12 w-12" />
                                        <p className="text-xl font-medium">논리 구조를 잡고 있습니다...</p>
                                    </div>
                                )}

                                {parsedData && (
                                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 flex-1 overflow-y-auto">
                                        <div className="space-y-4">
                                            <div className="rounded-xl bg-blue-50 p-5 shadow-sm border border-blue-100">
                                                <span className="font-bold text-trust-navy text-lg block mb-2">Point (결론)</span>
                                                <p className="text-xl text-gray-900 leading-relaxed">{parsedData.point1}</p>
                                            </div>
                                            <div className="rounded-xl bg-gray-50 p-5 shadow-sm border border-gray-100">
                                                <span className="font-bold text-gray-700 text-lg block mb-2">Reason (이유)</span>
                                                <p className="text-xl text-gray-900 leading-relaxed">{parsedData.reason}</p>
                                            </div>
                                            <div className="rounded-xl bg-gray-50 p-5 shadow-sm border border-gray-100">
                                                <span className="font-bold text-gray-700 text-lg block mb-2">Example (사례)</span>
                                                <p className="text-xl text-gray-900 leading-relaxed">{parsedData.example}</p>
                                            </div>
                                            <div className="rounded-xl bg-blue-50 p-5 shadow-sm border border-blue-100">
                                                <span className="font-bold text-trust-navy text-lg block mb-2">Point (요약)</span>
                                                <p className="text-xl text-gray-900 leading-relaxed">{parsedData.point2}</p>
                                            </div>
                                        </div>

                                        <div className="mt-8 border-t pt-6">
                                            <h3 className="mb-4 text-xl font-bold text-success-green flex items-center gap-2">
                                                <Sparkles className="h-5 w-5" /> AI 코칭 조언
                                            </h3>
                                            <p className="text-gray-700 text-lg leading-relaxed bg-green-50 p-6 rounded-xl border border-green-100 shadow-sm">
                                                {parsedData.advice}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
