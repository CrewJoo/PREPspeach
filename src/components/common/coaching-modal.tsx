"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface CoachingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CoachingModal({ isOpen, onClose }: CoachingModalProps) {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

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
                    onClose();
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

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
            <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-8 shadow-2xl animate-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

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
                                <Button type="button" className="bg-gray-500 hover:bg-gray-600 text-white border-none" onClick={onClose}>닫기</Button>
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
    );
}
