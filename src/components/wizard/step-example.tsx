"use client";

import { useForm } from "react-hook-form";
import { usePrepStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function StepExample() {
    const { setStep, updateData, data } = usePrepStore();
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: { example: data.example },
    });

    const onSubmit = (formData: { example: string }) => {
        updateData(formData);
        setStep(4);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2 text-left">
                <label className="text-sm font-medium text-gray-700">경험/증거 (Example)</label>
                <p className="text-xs text-gray-500">S-T-A-R 기법(상황-행동-결과)으로 구체적인 수치와 함께 작성하세요.</p>
                <Textarea
                    {...register("example", { required: "필수 입력 항목입니다." })}
                    placeholder="예: 실제로 전 직장에서 [문제 상황]이 발생했을 때, [나의 행동]을 통해 [숫자 성과]를 달성한 경험이 있습니다."
                    className="h-40 text-lg"
                />
                {errors.example && (
                    <span className="text-sm text-red-500">{errors.example.message}</span>
                )}
            </div>
            <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(2)} className="w-1/3">
                    이전
                </Button>
                <Button type="submit" className="w-2/3 bg-trust-navy text-white hover:bg-trust-navy/90">
                    다음 (마무리 짓기)
                </Button>
            </div>
        </form>
    );
}
