export type SlotType = "P" | "R" | "E" | "P'";

export interface TrainingSentence {
    id: string;
    text: string;
    type: SlotType; // The correct answer slot type
}

export interface TrainingBunch {
    id: string;
    title: string;
    questions: TrainingSentence[];
    correctOrder: string[]; // IDs in correct order
}

export interface TrainingLevel {
    level: number;
    title: string;
    description: string;
    slots: SlotType[]; // The target slots to show (e.g., ["P", "R"])
    bunches: TrainingBunch[];
}

export const WORD_DANCING_DATA: TrainingLevel[] = [
    {
        level: 1,
        title: "Level 1: 결론(P)과 근거(R) 구분하기",
        description: "주장의 방향을 정하고 왜(Reason) 그런지를 설명하는 논리 흐름 익히기",
        slots: ["P", "R", "R"],
        bunches: [
            {
                id: "l1-b1",
                title: "주제: AI 시대의 경쟁력",
                questions: [
                    { id: "l1-b1-q3", text: "기술적인 표현보다 무엇을 주장할지 결정하는 '사고의 뼈대'가 경쟁력의 본질이 되었기 때문입니다.", type: "R" },
                    { id: "l1-b1-q2", text: "이제는 잘 쓰는 사람이 아니라 잘 생각하는 사람이 강해지는 시대입니다.", type: "P" },
                    { id: "l1-b1-q1", text: "AI는 문장력과 요약 능력에서 이미 인간을 앞서가고 있기 때문입니다.", type: "R" },
                ],
                correctOrder: ["l1-b1-q2", "l1-b1-q1", "l1-b1-q3"] // P - R - R (Logic needs to handle multiple correct Rs if order doesn't matter, but here we assume a logical flow or just P vs R grouping)
                // WAIT: The user prompt says "P(2) - R(1) - R(3)". So there is a specific order.
                // But for Level 1, is it just sorting into buckets (P vs R) or ordering them? 
                // "1단계: 결론(P)과 근거(R) 구분하기" -> Distinguish. 
                // The dragging UI usually implies ordering if it's a list. 
                // Let's implement ordered slots.
            },
            {
                id: "l1-b2",
                title: "주제: 대학 교육의 변화",
                questions: [
                    { id: "l1-b2-q1", text: "학생들의 사고력이 퇴화하는 '디지털 치매' 현상을 막아야 하기 때문입니다.", type: "R" },
                    { id: "l1-b2-q3", text: "기업은 이제 단순히 도구를 쓰는 사람이 아니라 논리를 설계하는 인재를 원하기 때문입니다.", type: "R" },
                    { id: "l1-b2-q2", text: "대학은 학생들에게 AI를 지휘하는 '생각의 공식'을 우선적으로 가르쳐야 합니다.", type: "P" },
                ],
                correctOrder: ["l1-b2-q2", "l1-b2-q1", "l1-b2-q3"]
            },
            {
                id: "l1-b3",
                title: "주제: 프롬프트의 본질",
                questions: [
                    { id: "l1-b3-q1", text: "프롬프트는 단순한 질문이 아니라 인공지능의 사고를 설계하는 '업무 지시서'입니다.", type: "P" },
                    { id: "l1-b3-q3", text: "인간이 부여하는 목표와 역할이 AI의 사고 범위를 결정하는 가드레일이 되기 때문입니다.", type: "R" },
                    { id: "l1-b3-q2", text: "AI는 지시문의 구조와 조건에 따라 결과물의 품질을 완전히 다르게 내놓기 때문입니다.", type: "R" },
                ],
                correctOrder: ["l1-b3-q1", "l1-b3-q2", "l1-b3-q3"]
            },
            {
                id: "l1-b4",
                title: "주제: 원격 근무의 효용",
                questions: [
                    { id: "l1-b4-q2", text: "출퇴근 시간이 절약되어 업무 몰입도가 높아지기 때문입니다.", type: "R" },
                    { id: "l1-b4-q3", text: "사무실 유지 비용을 줄여 기업의 이익 구조를 개선할 수 있기 때문입니다.", type: "R" },
                    { id: "l1-b4-q1", text: "기업은 선택적 원격 근무 제도를 적극적으로 도입해야 합니다.", type: "P" },
                ],
                correctOrder: ["l1-b4-q1", "l1-b4-q2", "l1-b4-q3"]
            },
            {
                id: "l1-b5",
                title: "주제: 아침 운동의 중요성",
                questions: [
                    { id: "l1-b5-q1", text: "하루를 활기차게 시작하려면 아침 운동이 필수적입니다.", type: "P" },
                    { id: "l1-b5-q2", text: "신진대사를 높여 하루 종일 에너지를 유지해주기 때문입니다.", type: "R" },
                    { id: "l1-b5-q3", text: "뇌에 산소를 공급하여 오전 업무 집중력을 극대화하기 때문입니다.", type: "R" },
                ],
                correctOrder: ["l1-b5-q1", "l1-b5-q2", "l1-b5-q3"]
            }
        ]
    },
    {
        level: 2,
        title: "Level 2: 결론(P), 근거(R), 증명자료(E) 연결하기",
        description: "추상적인 이유에 구체적인 데이터나 사례(Example)를 붙여 설득력 높이기",
        slots: ["P", "R", "E", "E"],
        bunches: [
            {
                id: "l2-b1",
                title: "주제: 채용 시장의 변화",
                questions: [
                    { id: "l2-b1-q3", text: "신입 구직자들은 이제 실전 직무 역량을 증명할 결과물을 반드시 갖추어야 합니다.", type: "P" },
                    { id: "l2-b1-q2", text: "기업은 교육 비용 절감을 위해 즉시 업무에 투입 가능한 경력직을 선호합니다.", type: "R" },
                    { id: "l2-b1-q1", text: "2025년 상반기 채용 공고 중 신입 채용 비중은 단 2.6%에 불과했습니다.", type: "E" },
                    { id: "l2-b1-q4", text: "인턴십조차 정규직 공채 수준의 높은 경쟁률을 기록하며 진입 장벽이 높아졌습니다.", type: "E" },
                ],
                correctOrder: ["l2-b1-q3", "l2-b1-q2", "l2-b1-q1", "l2-b1-q4"] // P(3) - R(2) - E(1) - E(4)
            },
            {
                id: "l2-b2",
                title: "주제: AI 결과물의 품질 보정",
                questions: [
                    { id: "l2-b2-q4", text: "단순 요약을 요청했을 때보다 특정 형식을 지정했을 때 재작업 횟수가 현저히 줄어듭니다.", type: "E" },
                    { id: "l2-b2-q2", text: "인공지능은 사용자가 제시하는 논리적 가이드라인에 따라 출력물의 수준이 결정됩니다.", type: "R" },
                    { id: "l2-b2-q1", text: "같은 질문이라도 '경영진 보고용'이라는 역할을 부여하면 답변의 전문성이 비약적으로 상승합니다.", type: "E" },
                    { id: "l2-b2-q3", text: "AI를 활용할 때는 명확한 구조를 먼저 설계하여 지시하는 것이 필수적입니다.", type: "P" },
                ],
                correctOrder: ["l2-b2-q3", "l2-b2-q2", "l2-b2-q1", "l2-b2-q4"] // P(3) - R(2) - E(1) - E(4)
            },
            {
                id: "l2-b3",
                title: "주제: 사고 구조화의 중요성",
                questions: [
                    { id: "l2-b3-q2", text: "실제 프로젝트 보고에서 결론부터 말하는 방식을 적용하자 의사결정 속도가 빨라졌습니다.", type: "E" },
                    { id: "l2-b3-q1", text: "생각을 먼저 구조화하면 복잡한 문제도 짧고 명확하게 설명할 수 있게 됩니다.", type: "P" },
                    { id: "l2-b3-q4", text: "핵심이 보이지 않는다는 피드백을 받던 보고서가 단 한 번의 보고로 승인되는 비율이 높아졌습니다.", type: "E" },
                    { id: "l2-b3-q3", text: "상대방은 배경보다 내가 내린 결론과 그 이유를 가장 먼저 알고 싶어 하기 때문입니다.", type: "R" },
                ],
                correctOrder: ["l2-b3-q1", "l2-b3-q3", "l2-b3-q2", "l2-b3-q4"] // P(1) - R(3) - E(2) - E(4)
            },
            {
                id: "l2-b4",
                title: "주제: 숏폼 콘텐츠 마케팅",
                questions: [
                    { id: "l2-b4-q3", text: "유튜브 쇼츠 도입 후 채널 조회수가 3개월 만에 200% 증가했습니다.", type: "E" },
                    { id: "l2-b4-q1", text: "브랜드 인지도를 높이려면 숏폼 콘텐츠 제작에 집중해야 합니다.", type: "P" },
                    { id: "l2-b4-q2", text: "최근 플랫폼 알고리즘이 짧은 영상을 우선적으로 노출해주기 때문입니다.", type: "R" },
                    { id: "l2-b4-q4", text: "15초 내외의 영상이 MZ세대의 시청 지속 시간을 가장 길게 확보하고 있습니다.", type: "E" },
                ],
                correctOrder: ["l2-b4-q1", "l2-b4-q2", "l2-b4-q3", "l2-b4-q4"]
            },
            {
                id: "l2-b5",
                title: "주제: 독서의 재발견",
                questions: [
                    { id: "l2-b5-q2", text: "영상 매체보다 텍스트를 읽을 때 뇌의 복합적 사고 영역이 활성화되기 때문입니다.", type: "R" },
                    { id: "l2-b5-q4", text: "매일 30분 독서를 한 그룹이 그렇지 않은 그룹보다 어휘력이 15% 높게 측정되었습니다.", type: "E" },
                    { id: "l2-b5-q1", text: "깊이 있는 사고력을 기르기 위해서는 종이책 독서가 여전히 가장 유효합니다.", type: "P" },
                    { id: "l2-b5-q3", text: "스티브 잡스와 빌 게이츠도 바쁜 일정 속에서 '생각 주간'을 갖고 독서를 했습니다.", type: "E" },
                ],
                correctOrder: ["l2-b5-q1", "l2-b5-q2", "l2-b5-q3", "l2-b5-q4"]
            }
        ]
    },
    {
        level: 3,
        title: "Level 3: 복합 논리(P - R - E) 설계하기",
        description: "여러 개의 근거와 풍부한 증명 자료를 배치하여 전문적인 문서 구조 만들기",
        slots: ["P", "R", "E", "E", "R", "E", "E"],
        bunches: [
            {
                id: "l3-b1",
                title: "주제: 기업의 가상 직무 과정 도입 필요성",
                questions: [
                    { id: "l3-b1-q3", text: "대졸 구직자의 53.9%가 '경력 중심 채용'을 취업의 가장 큰 장벽으로 꼽았습니다.", type: "E" },
                    { id: "l3-b1-q6", text: "AI 비서 한 대가 최대 30명분의 단순 자료 정리와 요약 업무를 처리하고 있습니다.", type: "E" },
                    { id: "l3-b1-q1", text: "대학 취업지원센터는 '가상 직무능력 개발 과정'을 최우선으로 도입해야 합니다.", type: "P" },
                    { id: "l3-b1-q5", text: "AI 비서의 확산으로 신입 사원이 담당하던 단순 업무가 자동화되었기 때문입니다.", type: "R" },
                    { id: "l3-b1-q4", text: "최근 조사에서 국내 기업의 82%가 신입보다 수시 경력 채용을 선호한다고 답했습니다.", type: "E" },
                    { id: "l3-b1-q2", text: "현재 채용 시장은 신입에게도 경력직 수준의 실무 능력을 요구하고 있습니다.", type: "R" },
                    { id: "l3-b1-q7", text: "실제로 신입 사원의 65%가 이미 실무에서 AI를 활용하며 업무 방식을 바꾸고 있습니다.", type: "E" },
                ],
                correctOrder: ["l3-b1-q1", "l3-b1-q2", "l3-b1-q3", "l3-b1-q4", "l3-b1-q5", "l3-b1-q6", "l3-b1-q7"]
            },
            {
                id: "l3-b2",
                title: "주제: 전기차 도입 확대",
                questions: [
                    { id: "l3-b2-q1", text: "도심 물류 배송 차량을 전기차로 전면 교체해야 합니다.", type: "P" },
                    { id: "l3-b2-q2", text: "내연기관 차량이 배출하는 탄소가 도심 대기 오염의 주원인이기 때문입니다.", type: "R" },
                    { id: "l3-b2-q3", text: "서울시 분석 결과, 전체 미세먼지의 25%가 수송 부문에서 발생하고 있습니다.", type: "E" },
                    { id: "l3-b2-q4", text: "런던 등 해외 대도시에서는 배출가스 제로 구역 설정 후 공기 질이 뚜렷하게 개선되었습니다.", type: "E" },
                    { id: "l3-b2-q5", text: "장기적으로 유류비보다 전기 충전 비용이 저렴하여 운영비 절감 효과가 크기 때문입니다.", type: "R" },
                    { id: "l3-b2-q6", text: "연간 2만km 주행 시 연료비가 디젤 트럭 대비 약 300만 원 절약됩니다.", type: "E" },
                    { id: "l3-b2-q7", text: "엔진 오일 교체 등 소모품 관리 비용도 내연기관 대비 50% 수준입니다.", type: "E" },
                ],
                correctOrder: ["l3-b2-q1", "l3-b2-q2", "l3-b2-q3", "l3-b2-q4", "l3-b2-q5", "l3-b2-q6", "l3-b2-q7"]
            },
            {
                id: "l3-b3",
                title: "주제: 파이썬 코딩 교육",
                questions: [
                    { id: "l3-b3-q1", text: "비전공자라도 기본적은 파이썬(Python) 코딩 능력은 갖추어야 합니다.", type: "P" },
                    { id: "l3-b3-q2", text: "데이터 분석과 인공지능 활용에 가장 범용적으로 쓰이는 언어이기 때문입니다.", type: "R" },
                    { id: "l3-b3-q3", text: "전 세계 프로그래밍 언어 점유율 1위가 파이썬이며, 가장 방대한 라이브러리를 보유하고 있습니다.", type: "E" },
                    { id: "l3-b3-q4", text: "마케팅, 재무 등 비개발 직군에서도 엑셀 대신 판다스(Pandas)를 활용하는 사례가 늘고 있습니다.", type: "E" },
                    { id: "l3-b3-q5", text: "코딩 역량이 취업과 승진에 직접적인 경쟁력이 되고 있기 때문입니다.", type: "R" },
                    { id: "l3-b3-q6", text: "주요 대기업 신입 공채에서 디지털 역량 검정 시험을 필수 전형으로 도입했습니다.", type: "E" },
                    { id: "l3-b3-q7", text: "IT 활용 능력을 갖춘 직원의 평균 연봉이 그렇지 않은 경우보다 높다는 통계가 있습니다.", type: "E" },
                ],
                correctOrder: ["l3-b3-q1", "l3-b3-q2", "l3-b3-q3", "l3-b3-q4", "l3-b3-q5", "l3-b3-q6", "l3-b3-q7"]
            }
        ]
    },
    {
        level: 4,
        title: "Level 4: 완결된 사고 체계(P - R - E - P') 완성하기",
        description: "주장을 입증한 후 다시 결론을 확정하여 흔들리지 않는 '생각의 고정' 완성하기",
        slots: ["P", "R", "E", "E", "P'"],
        bunches: [
            {
                id: "l4-b1",
                title: "주제: 생각의 공식, PREP",
                questions: [
                    { id: "l4-b1-q2", text: "AI가 문장을 대신 만드는 시대에 인간에게 남은 본질적 역할은 논리 설계이기 때문입니다.", type: "R" },
                    { id: "l4-b1-q4", text: "실제 프롬프트 설계에 이를 적용하면 AI의 환각 현상이 줄어들고 결과의 정교함이 높아집니다.", type: "E" },
                    { id: "l4-b1-q1", text: "PREP은 단순한 글쓰기 기법이 아니라 인공지능 시대의 '생각의 공식'입니다.", type: "P" },
                    { id: "l4-b1-q5", text: "그러므로 우리는 글을 쓰기 전 반드시 PREP으로 사고의 골격을 먼저 세워야 합니다.", type: "P'" },
                    { id: "l4-b1-q3", text: "미국 초등학교의 '5줄 글쓰기' 교육은 이를 통해 학생들의 사고 뼈대를 세워줍니다.", type: "E" },
                ],
                correctOrder: ["l4-b1-q1", "l4-b1-q2", "l4-b1-q3", "l4-b1-q4", "l4-b1-q5"]
            },
            {
                id: "l4-b2",
                title: "주제: 디지털 치매 극복",
                questions: [
                    { id: "l4-b2-q2", text: "핸드폰과 프롬프트에 의존하면서 인간이 스스로 생각하는 힘을 잃어가고 있기 때문입니다.", type: "R" },
                    { id: "l4-b2-q5", text: "PREP은 디지털 치매를 극복하고 기술의 주인이 되게 하는 가장 인간적인 도구입니다.", type: "P'" },
                    { id: "l4-b2-q3", text: "정보화 시대 이후 현대인의 기억력과 수리 능력이 과거보다 감퇴했다는 연구 결과가 있습니다.", type: "E" },
                    { id: "l4-b2-q1", text: "무분별한 도구 사용으로 인한 인류의 지능 퇴화를 PREP으로 막아야 합니다.", type: "P" },
                    { id: "l4-b2-q4", text: "반면 PREP 구조로 매일 5줄씩 생각을 정리하는 훈련은 뇌의 논리 회로를 다시 깨워줍니다.", type: "E" },
                ],
                correctOrder: ["l4-b2-q1", "l4-b2-q2", "l4-b2-q3", "l4-b2-q4", "l4-b2-q5"]
            },
            {
                id: "l4-b3",
                title: "주제: 프롬프트 엔지니어의 핵심",
                questions: [
                    { id: "l4-b3-q5", text: "결국 뛰어난 프롬프트 엔지니어가 된다는 것은 생각을 구조화하는 능력을 갖춘다는 뜻입니다.", type: "P'" },
                    { id: "l4-b3-q1", text: "모델의 성능보다 질문의 논리 구조가 AI 활용의 성패를 결정합니다.", type: "P" },
                    { id: "l4-b3-q3", text: "'요약해줘'라는 단순 지시는 모호한 답을 내지만, 구조를 지정하면 품질이 비약적으로 향상됩니다.", type: "E" },
                    { id: "l4-b3-q4", text: "실제로 PREP 템플릿을 사용한 프롬프트는 재작업 횟수를 절반 이하로 줄여줍니다.", type: "E" },
                    { id: "l4-b3-q2", text: "AI는 의도를 추측하는 데는 약하지만 명확한 순서와 역할 부여에는 매우 강하기 때문입니다.", type: "R" },
                ],
                correctOrder: ["l4-b3-q1", "l4-b3-q2", "l4-b3-q3", "l4-b3-q4", "l4-b3-q5"]
            },
            {
                id: "l4-b4",
                title: "주제: 정기적 피드백의 힘",
                questions: [
                    { id: "l4-b4-q1", text: "팀의 성과를 높이려면 분기별 평가보다 주간 피드백 문화를 정착시켜야 합니다.", type: "P" },
                    { id: "l4-b4-q2", text: "작은 실수를 즉시 교정하고 성공 경험을 빠르게 공유할 수 있기 때문입니다.", type: "R" },
                    { id: "l4-b4-q3", text: "A팀은 매주 금요일 회고 미팅을 도입한 후 프로젝트 지연 건수가 0건이 되었습니다.", type: "E" },
                    { id: "l4-b4-q4", text: "반면 연말 평가만 진행한 B팀은 이미 돌이킬 수 없는 문제로 프로젝트가 중단되었습니다.", type: "E" },
                    { id: "l4-b4-q5", text: "이처럼 잦은 피드백은 감시가 아니라 목표 달성을 돕는 네비게이션 역할을 합니다.", type: "P'" },
                ],
                correctOrder: ["l4-b4-q1", "l4-b4-q2", "l4-b4-q3", "l4-b4-q4", "l4-b4-q5"]
            },
            {
                id: "l4-b5",
                title: "주제: 혼자 떠나는 여행",
                questions: [
                    { id: "l4-b5-q1", text: "살면서 한 번쯤은 타지로 혼자 여행을 떠나보는 경험이 필요합니다.", type: "P" },
                    { id: "l4-b5-q2", text: "낯선 환경에서 스스로 결정하며 진정한 자립심과 문제 해결력을 기를 수 있기 때문입니다.", type: "R" },
                    { id: "l4-b5-q3", text: "길을 잃었을 때 지도를 보며 스스로 길을 찾던 경험이 삶의 자신감이 됩니다.", type: "E" },
                    { id: "l4-b5-q4", text: "누구에게도 얽매이지 않고 온전히 나 자신과 대화하는 시간을 가질 수 있습니다.", type: "E" },
                    { id: "l4-b5-q5", text: "결국 혼자만의 여행은 세상을 배우는 학교이자 나를 만나는 가장 좋은 방법입니다.", type: "P'" },
                ],
                correctOrder: ["l4-b5-q1", "l4-b5-q2", "l4-b5-q3", "l4-b5-q4", "l4-b5-q5"]
            }
        ]
    }
];
