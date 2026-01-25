import { streamObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

const feedbackSchema = z.object({
  feedback: z.string().describe("지원자 답변에 대한 날카로운 지적과 수정 제안"),
  script: z.string().describe("면접장에서 그대로 읽을 수 있는 1분 길이의 다듬어진 스크립트"),
  coaching: z.string().describe("P-R-E-P 각 단계별로 구체적으로 어떻게 개선해야 하는지에 대한 상세 코칭"),
  improved_prep: z.object({
    point1: z.string().describe("개선된 결론 (P)"),
    reason: z.string().describe("개선된 이유 (R)"),
    example: z.string().describe("개선된 사례 (E)"),
    point2: z.string().describe("개선된 재강조 (P)")
  }).describe("지원자의 초안을 바탕으로 더 논리적이고 임팩트 있게 재구성한 PREP 구조")
});

export async function POST(req: Request) {
  const { point1, reason, example, point2 } = await req.json();

  const prompt = `
  지원자의 면접 답변 초안입니다:
  1. 결론(P): ${point1}
  2. 이유(R): ${reason}
  3. 경험(E): ${example}
  4. 재강조(P): ${point2}
  
  당신의 역할:
  당신은 15년차 대기업 채용 전문가이자 '독설가' 면접관입니다. 
  
  지시사항:
  1. [feedback] 필드: 부족한 점을 날카롭게 지적하고 해결책 제시
  2. [script] 필드: 합격 가능한 수준의 1분 스피킹용 스크립트 작성
  3. [coaching] 필드: P-R-E-P 각 단계별 구체적인 개선 팁 제공
  4. [improved_prep] 필드: 지원자의 초안을 바탕으로 완벽하게 다듬어진 PREP 구조(Point, Reason, Example, Point)를 새로 작성하세요. 내용이 빈약하면 논리를 보강하십시오.
  
  말투는 정중하지만 내용은 직설적이어야 합니다.
  `;

  const result = await streamObject({
    model: openai('gpt-4o'),
    schema: feedbackSchema,
    system: "당신은 냉철하고 논리적인 면접관입니다.",
    prompt: prompt,
  });

  return result.toTextStreamResponse();
}
