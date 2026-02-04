"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export type PromptExampleType = 'META_PROMPT' | 'RAG' | 'CONTEXT_ENGINEERING' | 'SLOW_THINKING';

interface PromptExampleModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: PromptExampleType | null;
}

const EXAMPLES: Record<PromptExampleType, { title: string; desc: string; content: string }> = {
    META_PROMPT: {
        title: "META PROMPT 예시",
        desc: "AI의 페르소나와 임무를 PREP 구조로 명확히 정의합니다.",
        content: `**[Point: 역할 정의]**
당신은 20년 경력의 시니어 UX 디자이너입니다. 사용자의 행동 심리를 깊이 이해하고 직관적인 UI를 설계하는 것이 당신의 핵심 역량입니다.

**[Reason: 배경 및 이유]**
현재 개발 중인 '노인용 헬스케어 앱'은 디지털 기기에 익숙하지 않은 60대 이상이 주 사용자입니다. 기존 앱들은 글씨가 작고 메뉴가 복잡하여 이탈률이 높습니다.

**[Example: 구체적 지침]**
- 글꼴 크기는 최소 18pt 이상을 유지하세요 (예: 토스 앱의 큰 글씨 모드 참조).
- 색상 대비는 WCAG AAA 등급을 준수하세요.
- 전문 용어 대신 '건강 기록', '약 먹을 시간' 같은 쉬운 일상 용어를 사용하세요.

**[Point: 최종 임무]**
위의 가이드라인을 바탕으로, 앱의 '메인 홈 화면'과 '약 복용 알림 화면'의 와이어프레임 구조를 텍스트로 제안해주세요.`
    },
    RAG: {
        title: "RAG (검색증강) 예시",
        desc: "AI가 정확한 정보를 찾을 수 있도록 검색 의도를 구조화합니다.",
        content: `**[Point: 검색 목표]**
2023년 한국의 전기차 배터리 시장 점유율 변화와 그 원인을 찾아서 요약해주세요.

**[Reason: 검색 이유]**
단순한 통계 수치만 필요한 것이 아니라, 특정 기업(LG엔솔, SK온 등)의 점유율이 왜 변동했는지 '원자재 가격 이슈'나 '미국의 IRA 법안'과 연관 지어 분석해야 하기 때문입니다.

**[Example: 포함해야 할 키워드]**
- '리튬 가격 변동 추이'
- 'IRA 법안 세부 수칙에 따른 보조금 변화'
- '유럽 시장 수출 규제'

**[Point: 답변 형식]**
검색된 정보를 종합하여, [시장 현황 수치] - [주요 변동 원인 3가지] - [2024년 전망] 순서로 보고서 형태로 정리해주세요.`
    },
    CONTEXT_ENGINEERING: {
        title: "CONTEXT ENGINEERING 예시",
        desc: "복잡한 상황을 PREP으로 정리하여 AI에게 맥락을 주입합니다.",
        content: `**[Point: 핵심 요청]**
우리 회사의 신규 커피 브랜드 'EcoBrew'의 마케팅 슬로건을 제안해주세요.

**[Reason: 브랜드 배경]**
기존 커피 브랜드들은 '맛'이나 '향'을 강조하지만, 우리는 '지속 가능성'이 핵심 가치입니다. 하지만 너무 진지하거나 교훈적인 느낌(Green-washing)은 피하고 싶습니다.

**[Example: 타겟 및 톤앤매너]**
- 타겟: 가치 소비를 중시하지만 힙한 이미지를 좋아하는 2030 세대 (Gen Z).
- 벤치마킹: '프라이탁(Freitag)'처럼 투박하지만 쿨한 느낌.
- 피해야 할 단어: '환경 보호', '지구 사랑' (너무 진부함).

**[Point: 결과물 요건]**
짧고 강렬한 영어 슬로건 3개와, 이를 한국어로 힙하게 푼 서브 카피 3개를 각각 매칭해서 제안해주세요.`
    },
    SLOW_THINKING: {
        title: "SLOW THINKING 예시",
        desc: "AI가 단계별로 논리적인 추론을 하도록 강제합니다.",
        content: `**[Point: 문제 정의]**
다음 환자의 증상을 보고 가장 의심되는 질환 3가지를 진단하되, 바로 결론을 내리지 말고 단계적으로 추론하세요.
"환자: 45세 남성, 3일 전부터 명치 부근에 타는 듯한 통증, 식사 후 악화됨, 누우면 더 심해짐."

**[Reason: 추론 단계 설정]**
1. 먼저 환자의 핵심 증상(Key Symptoms)을 나열하고 의학적 용어로 변환하세요.
2. 각 증상과 연관될 수 있는 소화기 질환 후보군을 모두 나열하세요.
3. '누우면 심해짐'이라는 특이 증상을 기준으로 후보군을 좁혀가세요. (감별 진단)

**[Example: 참고 지식]**
- 위궤양은 식사 시 통증이 완화되기도 함.
- 역류성 식도염은 복압 상승이나 누운 자세에서 악화됨.

**[Point: 최종 결론]**
위의 논리적 추론 과정을 거쳐, 가장 가능성 높은 질환 1순위와 배제해야 할 2, 3순위 질환을 제시하고 그 근거를 설명하세요.`
    }
};

export function PromptExampleModal({ isOpen, onClose, type }: PromptExampleModalProps) {
    const [copied, setCopied] = useState(false);

    if (!isOpen || !type) return null;

    const data = EXAMPLES[type];

    const handleCopy = () => {
        navigator.clipboard.writeText(data.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white pointer-events-auto w-full max-w-3xl max-h-[85vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col"
                        >
                            {/* Header */}
                            <div className="p-6 sm:p-8 border-b border-slate-100 flex justify-between items-start bg-slate-50/50">
                                <div>
                                    <h2 className="text-2xl font-black text-trust-navy">{data.title}</h2>
                                    <p className="text-slate-500 mt-2 font-medium">{data.desc}</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Scrollable Content */}
                            <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-slate-50">
                                <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
                                    <pre className="whitespace-pre-wrap font-sans text-slate-700 leading-relaxed text-base sm:text-lg">
                                        <div dangerouslySetInnerHTML={{
                                            __html: data.content
                                                .replace(/\*\*(.*?)\*\*/g, '<strong class="text-trust-navy block mb-1 mt-4 first:mt-0 text-xl overflow-visible">$1</strong>')
                                                .replace(/^- (.*)/gm, '<li class="ml-4 list-disc marker:text-slate-300">$1</li>')
                                        }} />
                                    </pre>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="p-6 border-t border-slate-100 bg-white flex justify-end gap-3">
                                <Button
                                    variant="outline"
                                    onClick={onClose}
                                    className="rounded-full px-6 font-bold"
                                >
                                    닫기
                                </Button>
                                <Button
                                    onClick={handleCopy}
                                    className="rounded-full px-6 bg-trust-navy hover:bg-trust-navy/90 text-white font-bold gap-2"
                                >
                                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    {copied ? "복사완료" : "프롬프트 복사"}
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
