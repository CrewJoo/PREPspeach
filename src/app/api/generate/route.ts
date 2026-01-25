import { streamObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

const feedbackSchema = z.object({
  feedback: z.string().describe("지원자 답변에 대한 날카로운 지적과 수정 제안"),
  script: z.string().describe("면접장에서 그대로 읽을 수 있는 1분 길이의 다듬어진 스크립트"),
  coaching: z.string().describe("P-R-E-P 각 단계별로 구체적으로 어떻게 개선해야 하는지에 대한 상세 코칭 (예: Point는 두괄식으로, Reason은 수치를 포함해서 등)")
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
  1. [feedback] 필드에는 부족한 점을 날카롭게 지적하고 어떻게 고쳐야 할지 제안하세요.
  2. [script] 필드에는 합격할 수 있는 수준으로 다듬어진 완성된 스크립트를 작성하세요.
  3. [coaching] 필드에는 PREP 각 단계(P, R, E, P)별로 구체적인 개선 팁을 제공하세요.
  
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
