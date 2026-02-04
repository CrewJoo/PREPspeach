"use client";

import { useForm } from "react-hook-form";
import { usePrepStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function StepReason() {
    const { setStep, updateData, data, question } = usePrepStore();
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: { reason: data.reason },
    });

    const onSubmit = (formData: { reason: string }) => {
        updateData(formData);
        setStep(3);
    };

    const placeholder = question?.guide.reason || "작성 예시: 왜냐하면 지난 [기간] 동안 [관련 경험]을 수행하며 [구체적 성과 수치]를 달성했기 때문입니다.";

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4 text-left">
                <label className="text-sm font-medium text-gray-700">이유/근거 (Reason)</label>

                <Textarea
                    {...register("reason", { required: "필수 입력 항목입니다." })}
                    placeholder={placeholder}
                    className="h-32 text-lg focus:ring-trust-navy"
                />
                {errors.reason && (
                    <span className="text-sm text-red-500">{errors.reason.message}</span>
                )}

                <div className="rounded-md bg-gray-50 p-3 text-sm text-gray-700">
                    <p className="font-semibold">💡 Tip: 주관적 감정보다는 '객관적 사실'을.</p>
                    <p className="mt-1 text-xs opacity-80">왜 그렇게 생각하시나요? 상대방이 납득할 수 있는 구체적인 근거를 제시해주세요.</p>
                </div>
            </div>
            <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(1)} className="w-1/3">
                    이전
                </Button>
                <Button type="submit" className="w-2/3 bg-trust-navy text-white hover:bg-trust-navy/90">
                    다음 (경험 증명하기)
                </Button>
            </div>
        </form>
    );
}
