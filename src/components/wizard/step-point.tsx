"use client";

import { useForm } from "react-hook-form";
import { usePrepStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function StepPoint() {
    const { setStep, updateData, data } = usePrepStore();
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: { point1: data.point1 },
    });

    const onSubmit = (formData: { point1: string }) => {
        updateData(formData);
        setStep(2);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2 text-left">
                <label className="text-sm font-medium text-gray-700">핵심 결론 (Point)</label>
                <p className="text-xs text-gray-500">면접관은 결론부터 듣고 싶어합니다.</p>
                <Textarea
                    {...register("point1", { required: "필수 입력 항목입니다." })}
                    placeholder="예: 저는 [핵심 역량]을 통해 귀사의 [현재 문제]를 해결할 수 있는 적임자입니다."
                    className="h-32 text-lg"
                />
                {errors.point1 && (
                    <span className="text-sm text-red-500">{errors.point1.message}</span>
                )}
            </div>
            <Button type="submit" className="w-full bg-trust-navy text-white hover:bg-trust-navy/90">
                다음 (이유 설명하기)
            </Button>
        </form>
    );
}
