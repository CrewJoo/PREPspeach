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
                <label className="text-sm font-medium text-gray-700">구체적 사례 (Example)</label>

                <div className="rounded-md bg-green-50 p-4 border border-green-100">
                    <p className="font-bold text-success-green text-sm mb-2">💡 STAR 기법으로 증명하기</p>
                    <ul className="text-xs space-y-1 text-gray-700">
                        <li><span className="font-bold text-trust-navy">S (Situation):</span> 어떤 상황이었나요?</li>
                        <li><span className="font-bold text-trust-navy">T (Task):</span> 어떤 과제/목표가 있었나요?</li>
                        <li><span className="font-bold text-trust-navy">A (Action):</span> 본인이 구체적으로 어떤 행동을 했나요?</li>
                        <li><span className="font-bold text-trust-navy">R (Result):</span> 그 결과 어떤 수치적 성과가 났나요?</li>
                    </ul>
                </div>

                <Textarea
                    {...register("example", { required: "필수 입력 항목입니다." })}
                    placeholder="작성 예시: [S] 프로젝트 마감이 3일 남은 긴급 상황에서, [T] 1,000개의 데이터를 전수 조사해야 했습니다. [A] 저는 팀원들과 역할을 분담하고 엑셀 자동화 매크로를 도입하여, [R] 당초 예상보다 5시간 빠르게 업무를 완수했습니다."
                    className="h-40 text-lg focus:ring-trust-navy"
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
