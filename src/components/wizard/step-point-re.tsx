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
                <p className="text-xs text-gray-500">앞선 주장과 근거를 요약하며 입사 후 포부를 밝히세요.</p>
                <Textarea
                    {...register("point2", { required: "필수 입력 항목입니다." })}
                    placeholder="예: 따라서 저는 입사 후에도 이러한 역량을 바탕으로 귀사의 성장에 기여하겠습니다."
                    className="h-32 text-lg"
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
