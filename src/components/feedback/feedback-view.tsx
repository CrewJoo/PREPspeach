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
    const [showImproved, setShowImproved] = useState(false);
    const [showScript, setShowScript] = useState(false);
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
        if (!object?.improved_prep) return;
        const text = `${object.improved_prep.point1} ${object.improved_prep.reason} ${object.improved_prep.example} ${object.improved_prep.point2}`;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "ko-KR";
        utterance.rate = 1.0;
        window.speechSynthesis.speak(utterance);
    };

    const handleWaitlistSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("유효한 이메일 주소를 입력해주세요.");
            return;
        }

        const formData = new FormData(e.currentTarget);

        const payload = {
            email: formData.get("email"),
            age: formData.get("age"),
            job: formData.get("job"),
            goal: formData.get("goal"),
            types: formData.getAll("type"),
            timestamp: new Date().toISOString(),
        };

        console.log("Submitting consultation:", payload);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setSubmitted(true);
                setTimeout(() => {
                    setShowModal(false);
                    setSubmitted(false);
                    setEmail("");
                }, 3000);
            } else {
                alert("신청 중 오류가 발생했습니다.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("신청 중 오류가 발생했습니다.");
        }
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
                            </div>
                        )}
                    </div>

                    {/* Coaching Section */}
                    {object && (
                        <div className="space-y-4">
                            <Button
                                variant={showCoaching ? "secondary" : "outline"}
                                size="lg"
                                onClick={() => setShowCoaching(!showCoaching)}
                                className={`w-full justify-between h-14 text-lg border transition-all ${showCoaching ? 'bg-trust-navy border-trust-navy text-white hover:bg-trust-navy/90' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                            >
                                <span className="flex items-center font-bold">
                                    <GraduationCap className={`mr-2 h-5 w-5 ${showCoaching ? 'text-blue-200' : 'text-gray-500'}`} />
                                    PREP 코칭
                                </span>
                                <span className={`text-sm ${showCoaching ? 'text-blue-200' : 'text-gray-400'}`}>{showCoaching ? '접기' : '펼치기'}</span>
                            </Button>

                            {showCoaching && object?.coaching && (
                                <div className="rounded-2xl bg-blue-50 p-6 border border-blue-100 animate-in fade-in zoom-in-95 duration-300">
                                    <p className="text-gray-800 leading-relaxed text-lg whitespace-pre-wrap bg-white p-6 rounded-xl shadow-sm">
                                        {object.coaching}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Improved PREP Section */}
                    {object && (
                        <div className="space-y-4">
                            <Button
                                variant={showImproved ? "secondary" : "outline"}
                                size="lg"
                                onClick={() => setShowImproved(!showImproved)}
                                className={`w-full justify-between h-14 text-lg border transition-all ${showImproved ? 'bg-indigo-600 border-indigo-600 text-white hover:bg-indigo-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                            >
                                <span className="flex items-center font-bold">
                                    <Sparkles className={`mr-2 h-5 w-5 ${showImproved ? 'text-indigo-200' : 'text-gray-500'}`} />
                                    PREP 업그레이드
                                </span>
                                <span className={`text-sm ${showImproved ? 'text-indigo-200' : 'text-gray-400'}`}>{showImproved ? '접기' : '펼치기'}</span>
                            </Button>

                            {showImproved && object?.improved_prep && (
                                <div className="rounded-2xl bg-indigo-50 p-6 border border-indigo-100 animate-in fade-in zoom-in-95 duration-500">
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

                    {/* Final Success Script */}
                    {object && (
                        <div className="space-y-4">
                            <Button
                                variant={showScript ? "secondary" : "outline"}
                                size="lg"
                                onClick={() => setShowScript(!showScript)}
                                className={`w-full justify-between h-14 text-lg border transition-all ${showScript ? 'bg-success-green border-success-green text-white hover:bg-green-600' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                            >
                                <span className="flex items-center font-bold">
                                    <Volume2 className={`mr-2 h-5 w-5 ${showScript ? 'text-green-100' : 'text-gray-500'}`} />
                                    합격 스크립트
                                </span>
                                <span className={`text-sm ${showScript ? 'text-green-100' : 'text-gray-400'}`}>{showScript ? '접기' : '펼치기'}</span>
                            </Button>

                            {showScript && object?.improved_prep && (
                                <div className="rounded-xl bg-gradient-to-br from-success-green/10 to-emerald-50 p-8 border border-success-green/20 animate-in fade-in zoom-in-95 duration-500">
                                    <p className="text-gray-900 text-lg leading-relaxed font-medium whitespace-pre-wrap">
                                        {object.improved_prep.point1} {object.improved_prep.reason} {object.improved_prep.example} {object.improved_prep.point2}
                                    </p>
                                </div>
                            )}
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
                </div>

                <Button
                    size="lg"
                    className="bg-gray-900 text-white hover:bg-gray-800 shadow-lg text-lg"
                    onClick={() => setShowModal(true)}
                >
                    <Lock className="mr-2 h-5 w-5" />
                    1:1 코칭 요청
                </Button>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-8 shadow-2xl">
                        {!submitted ? (
                            <>
                                <h3 className="mb-2 text-2xl font-bold text-trust-navy">현재 대기자가 많습니다!</h3>
                                <p className="mb-6 text-gray-600 text-lg">
                                    1:1 코칭은 이메일 상담 후 진행됩니다.<br />
                                    이메일 주소를 남겨주세요.
                                </p>
                                <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="space-y-1">
                                            <label className="text-sm font-semibold text-gray-700">연령대</label>
                                            <select name="age" className="w-full rounded-lg border border-gray-300 p-2 text-gray-700 focus:ring-2 focus:ring-trust-navy">
                                                <option>10대</option>
                                                <option>20대</option>
                                                <option>30대</option>
                                                <option>40대</option>
                                                <option>50대 이상</option>
                                            </select>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-sm font-semibold text-gray-700">직업</label>
                                            <select name="job" className="w-full rounded-lg border border-gray-300 p-2 text-gray-700 focus:ring-2 focus:ring-trust-navy">
                                                <option>학생 (취준생)</option>
                                                <option>직장인</option>
                                                <option>기타</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-sm font-semibold text-gray-700">목표</label>
                                        <div className="flex gap-4 p-1">
                                            <label className="flex items-center gap-2 text-gray-700 cursor-pointer">
                                                <input type="radio" name="goal" value="employment" defaultChecked className="accent-trust-navy w-4 h-4" /> 취업/이직
                                            </label>
                                            <label className="flex items-center gap-2 text-gray-700 cursor-pointer">
                                                <input type="radio" name="goal" value="admission" className="accent-trust-navy w-4 h-4" /> 진학/입시
                                            </label>
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-sm font-semibold text-gray-700">필요한 코칭 유형</label>
                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                            <label className="flex items-center gap-2 text-gray-700 cursor-pointer hover:bg-gray-50 p-1 rounded">
                                                <input type="checkbox" name="type" value="interview" className="accent-trust-navy w-4 h-4 rounded" /> 면접 준비
                                            </label>
                                            <label className="flex items-center gap-2 text-gray-700 cursor-pointer hover:bg-gray-50 p-1 rounded">
                                                <input type="checkbox" name="type" value="planning" className="accent-trust-navy w-4 h-4 rounded" /> 기획서 작성
                                            </label>
                                            <label className="flex items-center gap-2 text-gray-700 cursor-pointer hover:bg-gray-50 p-1 rounded">
                                                <input type="checkbox" name="type" value="proposal" className="accent-trust-navy w-4 h-4 rounded" /> 제안서/PT
                                            </label>
                                            <label className="flex items-center gap-2 text-gray-700 cursor-pointer hover:bg-gray-50 p-1 rounded">
                                                <input type="checkbox" name="type" value="other" className="accent-trust-navy w-4 h-4 rounded" /> 기타
                                            </label>
                                        </div>
                                    </div>

                                    <div className="space-y-1 pt-2">
                                        <label className="text-sm font-semibold text-gray-700">이메일 주소</label>
                                        <input
                                            type="email"
                                            required
                                            placeholder="contact@example.com"
                                            className="w-full rounded-xl border border-gray-300 p-3 text-lg text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-trust-navy"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>

                                    <div className="flex justify-end gap-2 pt-4">
                                        <Button type="button" className="bg-gray-500 hover:bg-gray-600 text-white border-none" onClick={() => setShowModal(false)}>닫기</Button>
                                        <Button type="submit" className="bg-success-green hover:bg-success-green/90 text-white">신청하기</Button>
                                    </div>
                                </form>
                            </>
                        ) : (
                            <div className="text-center py-8">
                                <h3 className="text-2xl font-bold text-success-green mb-2">신청 완료!</h3>
                                <p className="text-gray-600">작성해주신 내용을 바탕으로<br />빠른 시일 내에 이메일로 연락드리겠습니다.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
