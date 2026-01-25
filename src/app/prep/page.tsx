"use client";

import { usePrepStore } from "@/lib/store";
import { WizardLayout } from "@/components/wizard/wizard-layout";
import { StepPoint } from "@/components/wizard/step-point";
import { StepReason } from "@/components/wizard/step-reason";
import { StepExample } from "@/components/wizard/step-example";
import { StepPointRe } from "@/components/wizard/step-point-re";
import { FeedbackView } from "@/components/feedback/feedback-view";

export default function PrepPage() {
    const { currentStep } = usePrepStore();

    const getStepContent = () => {
        switch (currentStep) {
            case 1:
                return {
                    title: "결론부터 말하세요 (Point)",
                    description: "면접관의 뇌는 피로합니다. 두괄식으로 핵심을 꽂아주세요.",
                    component: <StepPoint />,
                };
            case 2:
                return {
                    title: "그 이유는 무엇인가요? (Reason)",
                    description: "단순한 주장이 아닌, 타당한 인과관계를 제시해야 설득됩니다.",
                    component: <StepReason />,
                };
            case 3:
                return {
                    title: "구체적인 증거는? (Example)",
                    description: "가장 강력한 설득은 사실(Fact)에서 나옵니다. S-T-A-R 기법을 활용하세요.",
                    component: <StepExample />,
                };
            case 4:
                return {
                    title: "마무리 제안 (Point)",
                    description: "앞선 내용을 요약하고, 회사에 기여할 점을 다시 한 번 강조하세요.",
                    component: <StepPointRe />,
                };
            case 5:
                return {
                    title: "AI 면접관의 피드백",
                    description: "당신의 답변을 냉철하게 분석했습니다. 아래 스크립트를 확인하세요.",
                    component: <FeedbackView />
                };
            default:
                return {
                    title: "",
                    description: "",
                    component: null
                };
        }
    };

    const { title, description, component } = getStepContent();

    return (
        <WizardLayout title={title} description={description}>
            {component}
        </WizardLayout>
    );
}
