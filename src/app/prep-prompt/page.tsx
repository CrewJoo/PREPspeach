"use client";

import { HomeButton } from "@/components/common/home-button";
import { motion } from "framer-motion";
import { PromptExampleModal, PromptExampleType } from "@/components/prep/prompt-example-modal";
import { useState } from "react";

export default function PrepPromptPage() {
    const [activeExample, setActiveExample] = useState<PromptExampleType | null>(null);

    return (
        <div className="min-h-screen bg-slate-50 relative pb-20 p-6">
            <HomeButton />

            <div className="max-w-6xl mx-auto px-6 pt-32">

                {/* Header */}
                <div className="text-center mb-16 space-y-6">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl sm:text-6xl font-black text-trust-navy tracking-tight"
                    >
                        PREP 프롬프트
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-slate-600 max-w-3xl mx-auto break-keep leading-relaxed"
                    >
                        <span className="text-trust-navy font-bold">PREP 프롬프트</span>는 AI에게 가장 정확한 지시를 내릴 수 있는 최적의 명령어 템플릿입니다.<br className="hidden sm:block" />
                        복잡한 기술 없이도 Point(결론)-Reason(이유)-Example(예시)-Point(재강조) 구조만 적용하면, 누구나 <span className="text-trust-navy font-bold">전문가 수준의 답변</span>을 이끌어낼 수 있습니다.
                    </motion.p>
                </div>

                {/* Content Cards */}
                <div className="space-y-8">

                    {/* Meta Prompt */}
                    <PromptCard
                        label="META PROMPT"
                        title="메타 프롬프트란?"
                        description={<>메타 프롬프트는 AI에게 단순히 <strong>'무엇을 하라'</strong>고 지시하는 것을 넘어, <strong>'어떤 사고방식으로 문제에 접근해야 하는지'</strong> 그 <strong>생각의 틀(Frame)</strong>을 먼저 설계해주는 최상위 명령어입니다. 마치 AI에게 특정 전문가의 영혼을 불어넣듯 <strong>페르소나</strong>, <strong>잠재적 목표</strong>, 그리고 <strong>답변의 논리적 구조</strong>를 미리 정의함으로써, 단순한 답변 기계를 통찰력 있는 파트너로 진화시키는 핵심 설계도입니다.</>}
                        prepTitle="PREP 활용방법"
                        prepDescription={<>PREP 구조는 AI가 <strong>페르소나</strong>를 완벽히 체화하도록 돕는 가장 강력한 <strong>'사고의 가드레일'</strong>입니다. 단순히 '넌 전문가야'라고 롤플레잉을 시키는 것보다, <strong>'Point(역할 정의)'</strong>로 전문가로서의 정체성을 명확히 확립하고, <strong>'Reason(이유)'</strong>을 통해 왜 이 역할을 수행해야 하는지 배경과 목적을 깊이 이해시킵니다. 더불어 <strong>'Example(예시)'</strong>로 구체적인 답변 스타일과 톤앤매너, 금지 사항 등을 학습시키면, AI는 모호함을 벗어나 환각 현상 없이 사용자가 의도한 그대로의 고품질 답변을 생성하게 됩니다.</>}
                        delay={0.2}
                        onExampleClick={() => setActiveExample('META_PROMPT')}
                    />

                    {/* RAG */}
                    <PromptCard
                        label="RAG"
                        title="검색증강생성이란?"
                        description={<>검색증강생성(RAG)은 AI가 학습하지 않은 최신 뉴스나 기업의 내부 비공개 데이터 등 <strong>'외부 지식'</strong>을 실시간으로 검색하여 답변에 반영하는 기술입니다. AI의 고질적인 문제인 <strong>환각(Hallucination)</strong>을 막고, 근거가 명확한 사실 기반의 답변을 얻기 위해 필수적입니다. 즉, AI라는 두뇌에 <strong>'도서관 검색 능력'</strong>을 장착시켜 신뢰도를 극대화하는 기술입니다.</>}
                        prepTitle="PREP 활용방법"
                        prepDescription={<>RAG(검색증강생성)의 성공 여부는 AI가 질문의 의도를 얼마나 정확히 파악하느냐, 즉 <strong>'검색 쿼리의 명확성'</strong>에 달려 있습니다. 질문이 모호하면 AI는 엉뚱한 문서를 참고하여 거짓 정보를 만듭니다. 이때 PREP을 활용하여 <strong>질문의 핵심 의도(Point)</strong>를 명시하고, 왜 이 정보가 필요한지 <strong>구체적인 이유(Reason)</strong>를 설명하며, <strong>검색 결과에 반드시 포함되어야 할 키워드나 데이터 형식의 예시(Example)</strong>를 제시하면, 검색의 정확도와 답변의 신뢰도가 비약적으로 상승합니다.</>}
                        delay={0.3}
                        labelColor="text-pink-600"
                        onExampleClick={() => setActiveExample('RAG')}
                    />

                    {/* Context Engineering */}
                    <PromptCard
                        label="CONTEXT ENGINEERING"
                        title="컨텍스트 엔지니어링이란?"
                        description={<>컨텍스트 엔지니어링은 AI가 사용자의 복잡한 상황과 숨겨진 의도를 인간처럼 정확히 파악할 수 있도록, <strong>배경 정보(Context)</strong>를 가장 논리적이고 효율적인 순서로 재가공하여 주입하는 기술입니다. 단순히 많은 양의 정보를 던져주는 것이 아니라, AI가 정보의 우선순위를 명확히 이해하고 혼란 없이 핵심에 집중할 수 있도록 문맥의 흐름을 최적화하는 <strong>'정보 설계'</strong> 과정입니다.</>}
                        prepTitle="PREP 활용방법"
                        prepDescription={<>AI에게 방대한 양의 정보를 입력할 때, 두서없이 전달하면 AI는 핵심 맥락을 놓치거나 가장 마지막 정보에만 집중하는 <strong>'Recency Bias(최신 정보 편향)'</strong>에 빠지기 쉽습니다. PREP은 복잡한 상황을 논리적으로 분해하여 전달하는 최적의 도구입니다. 전체 상황의 <strong>핵심 요약(Point)</strong>, <strong>사건의 배경이나 원인(Reason)</strong>, 그리고 <strong>관련된 구체적인 수치나 세부 정황(Example)</strong>으로 정보를 구조화하여 주입하면, AI는 긴 문맥 속에서도 길을 잃지 않고 모든 정보를 유기적으로 연결하여 이해하게 됩니다.</>}
                        delay={0.4}
                        labelColor="text-indigo-600"
                        onExampleClick={() => setActiveExample('CONTEXT_ENGINEERING')}
                    />

                    {/* Slow Thinking */}
                    <PromptCard
                        label="SLOW THINKING"
                        title="슬로우 씽킹이란?"
                        description={<>슬로우 씽킹은 노벨경제학상 수상자 대니얼 카너먼이 제시한 <strong>'시스템 2'</strong> 사고방식처럼, AI가 <strong>직관적으로 즉답</strong>하는 것을 멈추고 단계별로 깊이 고민하며 문제를 해결하도록 유도하는 기법입니다. <strong>'생각의 사슬(Chain of Thought)'</strong>을 통해 복잡한 문제를 논리적 단위로 쪼개어 풀게 함으로써, 수학적 계산이나 고도의 추론이 필요한 영역에서 치명적인 논리 오류를 획기적으로 줄여줍니다.</>}
                        prepTitle="PREP 활용방법"
                        prepDescription={<>PREP은 AI에게 인간의 심사숙고 과정인 <strong>'시스템 2'</strong> 사고를 유도하는 가장 완벽한 <strong>'슬로우 씽킹'</strong> 템플릿입니다. 단순히 답을 내라고 재촉하는 대신, <strong>'먼저 핵심 결론을 가설로 세우고(P)'</strong>, <strong>'그에 대한 타당한 이유를 분석한 뒤(R)'</strong>, <strong>'적절한 사례나 증거를 찾아 검증하고(E)'</strong>, <strong>'마지막으로 내용을 종합하여 정리하라(P)'</strong>는 논리적 단계를 강제합니다. 이 과정은 AI의 성급한 답변을 방지하고, 논리적 비약이 없는 깊이 있고 완결성 높은 답변을 보장합니다.</>}
                        delay={0.5}
                        labelColor="text-purple-600"
                        onExampleClick={() => setActiveExample('SLOW_THINKING')}
                    />

                </div>
            </div>

            <PromptExampleModal
                isOpen={!!activeExample}
                onClose={() => setActiveExample(null)}
                type={activeExample}
            />
        </div>
    );
}

function PromptCard({
    label, title, description, prepTitle, prepDescription, delay, labelColor = "text-blue-600", onExampleClick
}: {
    label: string, title: string, description: string | React.ReactNode, prepTitle: string, prepDescription: string | React.ReactNode, delay: number, labelColor?: string, onExampleClick?: () => void
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className="bg-white rounded-3xl p-8 sm:p-10 shadow-lg border border-slate-100 flex flex-col lg:flex-row gap-8 lg:gap-12 items-start"
        >
            {/* Left Col: Concept */}
            <div className="flex-1 space-y-4">
                <span className={`text-xs font-black tracking-widest uppercase ${labelColor}`}>
                    {label}
                </span>
                <h3 className="text-2xl font-bold text-slate-800 break-keep">
                    {title}
                </h3>
                <div className="bg-slate-50 p-6 rounded-2xl text-slate-600 leading-relaxed text-lg break-keep shadow-inner">
                    {description}
                </div>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px bg-slate-200 self-stretch my-2" />

            {/* Right Col: PREP Application */}
            <div className="flex-1 space-y-4">
                <div className="bg-trust-navy text-white text-xs font-bold px-3 py-1.5 rounded-md inline-block mb-1">
                    {prepTitle}
                </div>
                <div className="text-slate-700 leading-relaxed text-lg break-keep mb-6">
                    {prepDescription}
                </div>
                {onExampleClick && (
                    <div className="flex justify-end">
                        <button
                            onClick={onExampleClick}
                            className="px-5 py-2 rounded-full border-2 border-slate-200 text-slate-500 font-bold hover:border-trust-navy hover:text-trust-navy hover:bg-slate-50 transition-all text-sm"
                        >
                            예시
                        </button>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
