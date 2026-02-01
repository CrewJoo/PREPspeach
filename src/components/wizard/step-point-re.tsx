"use client";

import { useForm } from "react-hook-form";
import { usePrepStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function StepPointRe() {
    const { setStep, updateData, data } = usePrepStore();
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: { point2: data.point2 },
    });

    const onSubmit = (formData: { point2: string }) => {
        updateData(formData);
        setStep(5); // Navigate to AI Feedback
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2 text-left">
                <label className="text-sm font-medium text-gray-700">마무리 결론 (Point)</label>
                <div className="rounded-md bg-blue-50 p-3 text-sm text-blue-700">
                    <p className="font-semibold">💡 Tip: 수미상관으로 완벽하게.</p>
                    <p className="mt-1 text-xs opacity-90">앞선 주장과 근거를 한 문장으로 요약하며, 포부와 함께 마무리하세요.</p>
                </div>
                <Textarea
                    {...register("point2", { required: "필수 입력 항목입니다." })}
                    placeholder="작성 예시: 이러한 강점을 바탕으로, 입사 후 [구체적 기간] 내에 [구체적 목표]를 달성하는 인재가 되겠습니다."
                    className="h-32 text-lg focus:ring-trust-navy"
                />
                {errors.point2 && (
                    <span className="text-sm text-red-500">{errors.point2.message}</span>
                )}
            </div>
            <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(3)} className="w-1/3">
                    이전
                </Button>
                <Button type="submit" className="w-2/3 bg-success-green text-white hover:bg-success-green/90 shadow-lg shadow-success-green/20">
                    AI 분석 받기
                </Button>
            </div>
        </form>
    );
}
