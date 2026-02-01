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
  const { input } = await req.json();

  const result = await streamObject({
    model: openai('gpt-4o'),
    schema: prepSchema,
    system: `당신은 논리적 말하기 및 글쓰기 교정 전문가입니다. 
    1. 사용자의 입력 텍스트(주저리)를 분석하여 P-R-E-P(주장-이유-사례-재강조) 구조로 명확하게 재구성하세요.
    2. 톤앤매너: '일기' 같은 가벼운 말투를 지양하고, '면접 답변'이나 '자기소개서'에 적합한 논리적이고 정중한 어조(구어체와 문어체의 조화)를 사용하세요.
    3. Example(사례)이 부족하다면 "[STAR 기법에 맞춰 구체적 경험을 보강해보세요]"와 같은 가이드를 포함하세요.
    4. advice 필드: 단순한 격려보다는, 논리적 설득력을 높이기 위한 구체적인 피드백을 제공하세요.`,
    prompt: input,
  });

  return result.toTextStreamResponse();
}
