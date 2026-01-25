"use client";

import { useForm } from "react-hook-form";
import { usePrepStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function StepReason() {
    const { setStep, updateData, data } = usePrepStore();
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: { reason: data.reason },
    });

    const onSubmit = (formData: { reason: string }) => {
        updateData(formData);
        setStep(3);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2 text-left">
                <label className="text-sm font-medium text-gray-700">이유 (Reason)</label>
                <p className="text-xs text-gray-500">막연한 감정이 아닌, 논리적인 인과관계를 설명해주세요.</p>
                <Textarea
                    {...register("reason", { required: "필수 입력 항목입니다." })}
                    placeholder="예: 왜냐하면 저는 [구체적 직무 경험]을 통해 [관련 성과]를 지속적으로 만들어왔기 때문입니다."
                    className="h-32 text-lg"
                />
                {errors.reason && (
                    <span className="text-sm text-red-500">{errors.reason.message}</span>
                )}
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
