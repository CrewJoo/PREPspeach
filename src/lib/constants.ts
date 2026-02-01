export const LANDING_COPY = {
    // 0. Navigation Slogan
    nav_slogan: "생각의 공식 PREP",

    // 1. Desire (욕구): PREP 솔루션 제시 (B = M + A + T) -> Moved to Top as requested
    solution: {
        title: "당신의 프롬프트 작성 '원칙'은?",
        steps: [
            {
                step: "M",
                name: "Meta Prompt",
                desc: "메타 프롬프트 작성 원칙은?",
            },
            {
                step: "R",
                name: "RAG",
                desc: " 검색증강생성의 원칙은?",
            },
            {
                step: "C",
                name: "Context Engineering",
                desc: "컨텍스트 엔지니어링의 원칙은?",
            },
            {
                step: "S",
                name: "Slow Thinking",
                desc: "슬로우 씽킹의 원칙은?",
            },
        ],
    },

    // 2-1. Hero Part 1 (Intro): 상단 소개 그룹
    hero_intro: {
        badge: "PREP Aisper(AI 논리 지휘자) 양성 시스템",
        title: "프롬프트 공식 *PREP*\nAI 보다 한·수·위, *Aisper*",
        //subtitle: "두서없는 경험담을 합격하는 스크립트로.\nThinkPREP이 당신의 답변을 구조화해 드립니다.",
    },

    // 2-2. Hero Part 2 (Practice): 하단 실전/변환 그룹
    hero_practice: {
        badge: "합격하는 답변의 공식, PREP", // 독립적으로 수정 가능
        title: "면접관은 당신의 화려한 *스펙*보다\n논리적인 *1분*을 기억합니다.", // 독립적으로 수정 가능
        subtitle: "두서없는 경험담을 합격하는 스크립트로,\n주절주절 꼬인 생각을 PREP으로 구조화해 드립니다.", // 독립적으로 수정 가능
        ctaStep: "PREP 단계별로 익히기",
        ctaTransform: "주저리 PREP으로 변환하기",
    },

    // 3. Interest (흥미): FBM 모델의 'Trigger' - 왜 지금 필요한가?
    problem: {
        title: "왜\n당신의 답변은 면접관에게 들리지 않을까요?",
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

    // 4. Memory (기억) & Action (행동): Success Green 버튼으로 Ability 높이기
    action: {
        title: "지금 바로 당신의 경험을\n논리적으로 조립해보세요.",
        desc: "회원가입 없음. 1분이면 충분합니다.",
        cta: "지금 시작하기",
    },
};

export const ABOUT_COPY = {
    prep: {
        title: "PREP이란?",
        subtitle: "논리적인 소통의 핵심 구조",
        desc: "Point(결론), Reason(이유), Example(사례), Point(재강조)의 4단계로 구성된 가장 강력한 스피치 프레임워크입니다.",
    },
    aisper: {
        title: "PREP Aisper란?",
        badge: "AI + Whisper (속삭이는 자) / Super (능가하는)",
        subtitle: "생각의 도구 PREP으로\n인공지능을 주도하는 논리 지휘자",
        desc: "AI를 다루는 '영적인 한 수'를 가진,\nAI라는 거대한 시스템에게 영감을 불어넣는 사람",
    },
};

export const COLORS = {
    trustNavy: "#1E3A8A",
    successGreen: "#10B981",
};

export const PROGRAM_GUIDE_COPY = {
    title: "AI 비서 한 수 위, Aisper 양성 프로그램",
    subtitle: "생각의 뼈대(PREP)를 세우고 AI를 다루는 '논리 지휘자' 양성 과정",
    catchphrase: [
        "AI가 20명의 몫을 하는 시대,",
        "기업은 더 이상 '시키면 하는' 신입을 뽑지 않습니다.",
    ],
    overview: {
        title: "1. 프로그램 개요",
        items: [
            { label: "교육 대상", value: "대학 졸업자 및 졸업 예정자 (취업 준비생)" },
            { label: "교육 인원", value: "30명 (실습 및 1:1 코칭 최적화 인원)" },
            { label: "교육 기간", value: "총 5일 (1일 7시간, 총 35시간)" },
            { label: "교육 장소", value: "교내 전산 실습실 또는 노트북 지참 가능한 강의실" },
        ]
    },
    background: {
        title: "2. 기획 배경 및 필요성 (Why Now?)",
        points: [
            {
                title: "\"AI 비서 1명이 신입 20명의 몫을 합니다\"",
                desc: "최근 기업 현장에서는 \"향후 3~5년 간 신입 채용을 중단하겠다\"는 이야기가 들려옵니다. AI 비서가 일정 관리, 회의 요약, 자료 조사 등 기존 신입사원이 수행하던 반복 업무를 압도적인 효율로 처리하기 때문입니다. 기업 입장에서는 신입을 교육하는 비용보다 AI를 도입하는 것이 훨씬 경제적입니다."
            },
            {
                title: "'생각 없는 신입'의 설 자리가 사라졌습니다",
                desc: "AI가 대체하는 것은 사람이 아니라 '손이 필요한 일', '생각이 얕아도 되는 일'입니다. 이제 기업은 단순히 성실한 인재가 아니라, \"AI가 할 수 없는 질문을 던지는 사람\", \"AI에게 논리적인 지시를 내릴 수 있는 사람\"을 원합니다."
            },
            {
                title: "스펙보다 중요한 것은 '생각의 근육(Logical Thinking)'입니다",
                desc: "본 과정은 단순한 자소서 첨삭이나 면접 스킬 교육이 아닙니다. 자신의 생각을 논리적으로 구조화(PREP)하고, 이를 바탕으로 AI를 통제하여 최상의 성과를 내는 '일머리'를 훈련합니다. 이를 통해 기업이 당장 채용하고 싶은 '경력직 같은 신입'을 배출하는 것이 본 과정의 목표입니다."
            }
        ]
    },
    goals: {
        title: "3. 교육 목표",
        items: [
            { title: "사고력 강화", desc: "AI가 흉내 낼 수 없는 인간 고유의 논리적 사고(PREP)와 비판적 사고 함양." },
            { title: "AI 협업 능력", desc: "AI를 단순 검색 도구가 아닌, 논리적 지시를 통해 고품질 산출물을 만들어내는 파트너로 활용하는 프롬프트 엔지니어링 습득." },
            { title: "취업 역량 완성", desc: "자신만의 서사(Odyssey)를 구조화하여 면접관을 설득하는 차별화된 스토리텔링 완성." },
        ]
    },
    curriculum: {
        title: "4. 커리큘럼 (Daily Curriculum)",
        days: [
            {
                day: "1일차",
                theme: "생각의 혁명: \"쓰는 손\"에서 \"설계하는 뇌\"로",
                goal: "핵심 목표: AI 시대의 생존 전략을 이해하고, 논리적 사고의 기본틀인 PREP을 장착한다.",
                modules: [
                    { time: "오전(3H)", name: "오리엔테이션 & 팀 빌딩", desc: "Why Here?: AI 시대, 신입 채용의 비밀과 우리의 생존 전략 / Ice Breaking: 팀별 미션 부여 / 발표: 팀별 그라운드 룰" },
                    { time: "오후(4H)", name: "생각의 공식: PREP 마스터리", desc: "왜 PREP인가?: 비즈니스 소통의 표준 / PREP 개요: 결론-이유-사례-재강조 4단 구조 / PREP 기초 훈련: 두괄식 사고 전환 실습" },
                ]
            },
            {
                day: "2일차",
                theme: "AI 조련술: PREP으로 AI 비서 압도하기",
                goal: "핵심 목표: PREP 구조를 활용해 AI의 환각을 잡고, 명확한 결과물을 도출하는 훈련을 한다.",
                modules: [
                    { time: "오전(3H)", name: "논리 강화 훈련", desc: "PREP 기초 리마인드 / Word Dancing: 키워드 연결 순발력 훈련 / 팀별 발표: 1분 스피치" },
                    { time: "오후(4H)", name: "AI 미친 활용법", desc: "GPT 중언부언 줄이기 / 구조화의 힘: 모호한 지시 구조화 / 실습: 30초 만에 보고서 초안 만들기" },
                ]
            },
            {
                day: "3일차",
                theme: "맥락의 마법: 프롬프트 & 컨텍스트 엔지니어링",
                goal: "핵심 목표: 단순한 논리를 넘어 상황과 맥락(Context)을 설계하여 설득력을 극대화한다.",
                modules: [
                    { time: "오전(3H)", name: "컨텍스트 엔지니어링 이해", desc: "PREP과 컨텍스트: 논리에 감성 입히기 / RAS 프레임워크 / 실습: 페르소나 부여 훈련" },
                    { time: "오후(4H)", name: "고급 프롬프팅 실전", desc: "JSON 프롬프트 / 자기 성찰(Self-Reflection) 메타인지 프롬프트 / 종합 실습: 이메일/제안서 생성 대결" },
                ]
            },
            {
                day: "4일차",
                theme: "나만의 오디세이: 5D-say로 퍼스널 브랜딩",
                goal: "핵심 목표: 5가지 핵심 키워드(5D)를 통해 자신의 경험을 매력적인 직무 역량으로 재해석한다.",
                modules: [
                    { time: "오전(3H)", name: "오디세이: 나를 찾는 항해", desc: "왜 5D-say인가? / Dream: 직무적 꿈 구체화 / TrenD: 세상의 흐름과 연결" },
                    { time: "오후(4H)", name: "차별화 전략: 나만의 무기", desc: "Difficulty: 난관 극복 스토리 / StanD: 나만의 기준과 철학 / Different: 한 끝 차이 발견 / 포트폴리오 초안 작성" },
                ]
            },
            {
                day: "5일차",
                theme: "실전 면접: AI를 이기는 '생각의 뼈대'",
                goal: "핵심 목표: PREP과 5D 스토리를 결합하여 면접관의 뇌리에 박히는 답변을 완성한다.",
                modules: [
                    { time: "오전(3H)", name: "면접 준비: 생각의 뼈대 세우기", desc: "면접의 본질 / STAR-PREP 하이브리드 공식 / 주도적 답변 만들기" },
                    { time: "오후(4H)", name: "Final Stage: 가상 면접", desc: "AI 비서 한 수 위 가상 면접 / 실전 모의 면접 & 피드백 / 수료식" },
                ]
            },
        ]
    },
    outcome: {
        title: "5. 기대 효과 (Outcome)",
        items: [
            { title: "실무형 인재로의 전환", desc: "상사의 의도(Context)를 파악하고 결과물(Output)을 구조화할 줄 아는 '준비된 주니어'로 성장" },
            { title: "면접 경쟁력 확보", desc: "\"말을 잘한다\"를 넘어 \"생각이 논리적이고 일머리가 있다\"는 평가를 받는 면접 답변 완성" },
            { title: "디지털 리터러시 강화", desc: "AI를 자신의 도구로 활용하여 업무 생산성을 10배 높이는 방법 체득" },
        ]
    },
    closing: "이 과정은 단순한 취업 특강이 아닙니다.\nAI 시대, 학생들이 인간의 존엄과 직업적 가치를 지키기 위해 반드시 거쳐야 할 '생각의 사관학교'입니다."
};
