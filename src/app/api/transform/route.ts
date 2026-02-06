import { streamObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

// Define the schema for the PREP response
const prepSchema = z.object({
  point1: z.string().describe("핵심 주장 (결론)"),
  reason: z.string().describe("주장을 뒷받침하는 근거"),
  example: z.string().describe("구체적인 경험이나 사례"),
  point2: z.string().describe("마무리 요약 및 재강조"),
  advice: z.string().describe("논리적 보완을 위한 구체적인 조언"),
});

export async function POST(req: Request) {
  const { input, question } = await req.json();

  const systemPrompt = `당신은 논리적 말하기 및 글쓰기 교정 전문가입니다. 
    1. 사용자의 입력 텍스트(주저리)를 분석하여 P-R-E-P(주장-이유-사례-재강조) 구조로 명확하게 재구성하세요.
    2. 질문(Q)이 주어진 경우, 반드시 그 질문에 대한 답변이 되도록 내용을 구성해야 합니다. 입력값이 질문과 무관하거나 무의미하다면, 질문에 맞는 올바른 답변 방향을 제시하며 재구성하세요. 
    3. 톤앤매너: '일기' 같은 가벼운 말투를 지양하고, '면접 답변'이나 '자기소개서'에 적합한 논리적이고 정중한 어조(구어체와 문어체의 조화)를 사용하세요.
    4. Example(사례)이 부족하다면 "[STAR 기법에 맞춰 구체적 경험을 보강해보세요]"와 같은 가이드를 포함하세요.
    5. advice 필드: 단순한 격려보다는, 사용자의 논리적 허점이나 부족한 점을 **날카롭고 직설적으로 지적하는 '쓴소리 코칭'**을 해주세요. (예: "이런 식으로는 면접관을 설득할 수 없습니다.", "핵심이 없습니다." 등)`;

  const result = await streamObject({
    model: openai('gpt-4o'),
    schema: prepSchema,
    system: systemPrompt,
    prompt: `질문: ${question || '자유 주제'}\n사용자 입력: ${input}`,
  });

  return result.toTextStreamResponse();
}
