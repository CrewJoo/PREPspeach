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
    system: `당신은 논리적 말하기 교정 전문가입니다. 
    1. 사용자의 두서없는 말을 입력받아 P-R-E-P 구조로 명확하게 재구성하세요.
    2. Example(사례)이 부족하면 "[관련 경험을 구체적으로 추가해보세요]"와 같이 가이드를 넣어주세요.
    3. advice 필드에는 논리적 설득력을 높이기 위한 구체적인 피드백을 남겨주세요.`,
    prompt: input,
  });

  return result.toTextStreamResponse();
}
