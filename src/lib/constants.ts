export const LANDING_COPY = {
    // 1. Attention (주목): 강렬한 헤드라인으로 문제 인식
    hero: {
        badge: "취업 준비생을 위한 AI 논리 코칭",
        title: "면접관은 당신의 화려한 스펙보다\n'논리적인 1분'을 기억합니다.",
        subtitle: "두서없는 경험담을 합격하는 스크립트로.\nThinkPREP이 당신의 답변을 구조화해 드립니다.",
        ctaStep: "PREP 단계별로 익히기",
        ctaTransform: "주절이 PREP으로 변환하기",
    },

    // 2. Interest (흥미): FBM 모델의 'Trigger' - 왜 지금 필요한가?
    problem: {
        title: "왜 당신의 답변은 면접관에게 들리지 않을까요?",
        cards: [
            {
                emoji: "🤔",
                title: "결론 없는 나열",
                desc: "배경 설명만 30초, 정작 하고 싶은 말은 뒤로 밀림",
            },
            {
                emoji: "😰",
                title: "떨어지는 신뢰",
                desc: "구체적인 근거와 숫자가 없어 '주장'일 뿐인 답변",
            },
            {
                emoji: "🤖",
                title: "AI 의존증",
                desc: "ChatGPT가 써준 영혼 없는 답변을 그대로 암기",
            },
        ],
    },

    // 3. Desire (욕구): PREP 솔루션 제시 (B = M + A + T)
    solution: {
        title: "합격하는 답변의 공식, P-R-E-P",
        steps: [
            {
                step: "P",
                name: "Point",
                desc: "결론부터 강력하게 던지세요.",
            },
            {
                step: "R",
                name: "Reason",
                desc: "타당한 이유로 설득하세요.",
            },
            {
                step: "E",
                name: "Example",
                desc: "경험과 증거로 증명하세요.",
            },
            {
                step: "P",
                name: "Point",
                desc: "다시 한 번 각인시키세요.",
            },
        ],
    },

    // 4. Memory (기억) & Action (행동): Success Green 버튼으로 Ability 높이기
    action: {
        title: "지금 바로 당신의 경험을\n논리적으로 조립해보세요.",
        desc: "회원가입 없음. 1분이면 충분합니다.",
        cta: "지금 시작하기",
    },
};

export const COLORS = {
    trustNavy: "#1E3A8A",
    successGreen: "#10B981",
};
