"use client";

import { useState } from "react";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { z } from "zod";
import { usePrepStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Volume2, Lock, AlertCircle, PlayCircle, GraduationCap, Sparkles } from "lucide-react";

// Schema for type inference
const feedbackSchema = z.object({
    feedback: z.string(),
    script: z.string(),
    coaching: z.string(),
    improved_prep: z.object({
        point1: z.string(),
        reason: z.string(),
        example: z.string(),
        point2: z.string(),
    }).optional(),
});

export function FeedbackView() {
    const { data } = usePrepStore();
    const [showCoaching, setShowCoaching] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const { object, submit, isLoading, error } = useObject({
        api: "/api/generate",
        schema: feedbackSchema,
    });

    const handleAnalyze = () => {
        submit(data as any);
    };

    const handleSpeak = () => {
        if (!object?.script) return;
        const utterance = new SpeechSynthesisUtterance(object.script);
        utterance.lang = "ko-KR";
        utterance.rate = 1.0;
        window.speechSynthesis.speak(utterance);
    };

    const handleWaitlistSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Waitlist email:", email);
        localStorage.setItem("thinkprep_waitlist", email);
        setSubmitted(true);
        setTimeout(() => {
            setShowModal(false);
            setSubmitted(false);
            setEmail("");
        }, 2000);
    };

    return (
        <div className="flex flex-col gap-8 text-left">
            {/* User Input Summary */}
            <div className="rounded-2xl bg-gray-50 p-6 border border-gray-200">
                <h3 className="mb-4 text-xl font-bold text-trust-navy">내가 작성한 초안</h3>
                <div className="space-y-2 text-lg">
                    <p className="text-gray-700"><span className="font-bold text-trust-navy">P:</span> {data.point1}</p>
                    <p className="text-gray-700"><span className="font-bold text-trust-navy">R:</span> {data.reason}</p>
                    <p className="text-gray-700"><span className="font-bold text-trust-navy">E:</span> {data.example}</p>
                    <p className="text-gray-700"><span className="font-bold text-trust-navy">P:</span> {data.point2}</p>
                </div>
            </div>

            {/* Action Button & Status */}
            {!object && !isLoading && !error && (
                <div className="flex justify-center py-8">
                    <Button
                        onClick={handleAnalyze}
                        className="h-16 px-8 text-xl font-bold bg-trust-navy hover:bg-trust-navy/90 rounded-full shadow-xl hover:scale-105 transition-transform"
                    >
                        <PlayCircle className="mr-2 h-6 w-6" />
                        AI 면접관의 피드백 받기
                    </Button>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="rounded-xl bg-red-50 p-6 ring-1 ring-red-200 text-red-600 flex items-center gap-3">
                    <AlertCircle className="h-6 w-6" />
                    <p className="text-lg">오류가 발생했습니다. 다시 시도해주세요.</p>
                </div>
            )}

            {/* Analysis Result */}
            {(object || isLoading) && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <h3 className="font-bold text-2xl text-trust-navy">AI 면접관의 피드백 & 스크립트</h3>
                            {isLoading && <span className="animate-pulse text-lg text-success-green font-medium">분석 중...</span>}
                        </div>
                        <Button variant="ghost" onClick={handleSpeak} disabled={isLoading || !object?.script}>
                            <Volume2 className="mr-2 h-5 w-5" />
                            TTS 듣기
                        </Button>
                    </div>

                    <div className="min-h-[200px] rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200">
                        {!object ? (
                            <div className="flex h-full items-center justify-center text-gray-400 py-12">
                                <span className="animate-pulse">면접관이 당신의 답변을 분석하고 있습니다...</span>
                            </div>
                        ) : (
                            <div className="space-y-8">
                                <div>
                                    <h4 className="font-bold text-lg text-red-500 mb-2">💡 독설 피드백</h4>
                                    <p className="text-gray-800 leading-relaxed text-lg whitespace-pre-wrap">{object.feedback}</p>
                                </div>
                                <div className="pt-6 border-t">
                                    <h4 className="font-bold text-lg text-success-green mb-2">📝 합격 스크립트</h4>
                                    <p className="text-gray-900 leading-relaxed text-lg font-medium whitespace-pre-wrap">{object.script}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Coaching Section (Hidden by default) */}
                    {showCoaching && object?.coaching && (
                        <div className="rounded-2xl bg-blue-50 p-8 border border-blue-100 animate-in fade-in zoom-in-95 duration-300">
                            <h4 className="flex items-center gap-2 font-bold text-xl text-trust-navy mb-4">
                                <GraduationCap className="h-6 w-6" />
                                PREP 단계별 코칭
                            </h4>
                            <p className="text-gray-800 leading-relaxed text-lg whitespace-pre-wrap bg-white p-6 rounded-xl shadow-sm">
                                {object.coaching}
                            </p>
                        </div>
                    )}

                    {/* Improved PREP Section (New) */}
                    {showCoaching && object?.improved_prep && (
                        <div className="rounded-2xl bg-indigo-50 p-8 border border-indigo-100 animate-in fade-in zoom-in-95 duration-500 delay-100">
                            <h4 className="flex items-center gap-2 font-bold text-xl text-trust-navy mb-6">
                                <Sparkles className="h-6 w-6 text-indigo-600" />
                                업그레이드된 PREP 초안
                            </h4>
                            <div className="space-y-4">
                                <div className="bg-white p-5 rounded-xl border border-indigo-100 shadow-sm">
                                    <span className="block font-bold text-indigo-600 mb-1">Point (결론)</span>
                                    <p className="text-gray-900 text-lg">{object.improved_prep.point1}</p>
                                </div>
                                <div className="bg-white p-5 rounded-xl border border-indigo-100 shadow-sm">
                                    <span className="block font-bold text-gray-500 mb-1">Reason (이유)</span>
                                    <p className="text-gray-900 text-lg">{object.improved_prep.reason}</p>
                                </div>
                                <div className="bg-white p-5 rounded-xl border border-indigo-100 shadow-sm">
                                    <span className="block font-bold text-gray-500 mb-1">Example (사례)</span>
                                    <p className="text-gray-900 text-lg">{object.improved_prep.example}</p>
                                </div>
                                <div className="bg-white p-5 rounded-xl border border-indigo-100 shadow-sm">
                                    <span className="block font-bold text-indigo-600 mb-1">Point (재강조)</span>
                                    <p className="text-gray-900 text-lg">{object.improved_prep.point2}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Bottom Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between pt-4 border-t">
                <div className="flex gap-4">
                    <Button variant="outline" size="lg" onClick={() => window.print()} className="text-lg">
                        PDF 저장
                    </Button>
                    {object && (
                        <Button
                            variant={showCoaching ? "secondary" : "default"}
                            size="lg"
                            onClick={() => setShowCoaching(!showCoaching)}
                            className="bg-success-green hover:bg-success-green/90 text-white text-lg"
                        >
                            <GraduationCap className="mr-2 h-5 w-5" />
                            {showCoaching ? "코칭 닫기" : "PREP 코칭"}
                        </Button>
                    )}
                </div>

                <Button
                    size="lg"
                    className="bg-gray-900 text-white hover:bg-gray-800 shadow-lg text-lg"
                    onClick={() => setShowModal(true)}
                >
                    <Lock className="mr-2 h-5 w-5" />
                    프리미엄 ($9.9/월)
                </Button>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
                        {!submitted ? (
                            <>
                                <h3 className="mb-2 text-2xl font-bold text-trust-navy">현재 대기자가 많습니다!</h3>
                                <p className="mb-6 text-gray-600 text-lg">프리미엄 플랜은 초대제로 운영됩니다.</p>
                                <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                                    <input
                                        type="email"
                                        required
                                        placeholder="name@example.com"
                                        className="w-full rounded-xl border border-gray-300 p-3 text-lg text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-trust-navy"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <div className="flex justify-end gap-2 pt-2">
                                        <Button type="button" variant="outline" className="border-gray-300 hover:bg-gray-100 text-gray-700" onClick={() => setShowModal(false)}>닫기</Button>
                                        <Button type="submit" className="bg-success-green hover:bg-success-green/90 text-white">예약하기</Button>
                                    </div>
                                </form>
                            </>
                        ) : (
                            <div className="text-center py-8">
                                <h3 className="text-2xl font-bold text-success-green mb-2">예약 완료!</h3>
                                <p className="text-gray-600">곧 연락드리겠습니다.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
