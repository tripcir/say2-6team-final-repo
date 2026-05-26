import { Link } from "react-router-dom";
import {
  AlertTriangle, TrendingDown, UserCheck, Clock, Building2,
  ShieldCheck, Search, Gavel, ArrowUpRight, ChevronDown,
} from "lucide-react";
import { Reveal } from "./anim/Reveal";
import { CountUp } from "./anim/CountUp";

/* ───────────────────────────────────────────────────────
   문제 · 시장 — 발표용 슬라이드 한 컷 분량 섹션
   2024 응급의료 통계연보(제23호) 기준 정량 근거
   ─────────────────────────────────────────────────────── */

export function ProblemAndMarket() {
  return (
    <section id="problem-market" className="border-y border-vuno-divider bg-vuno-bg">
      <div className="max-w-[1400px] mx-auto px-6 py-24 md:py-28">
        <SectionHeader />
        <CrisisStats />
        <ProblemCards />
        <MarketStructure />
        <ValueProposition />
      </div>
    </section>
  );
}

/* ── Header ─────────────────────────────────────────── */
function SectionHeader() {
  return (
    <Reveal className="text-center mb-14">
      <div className="inline-flex items-center gap-2 px-4 py-2 border border-rose-400/40 text-rose-300 text-sm md:text-base font-bold uppercase tracking-[0.2em] mb-6">
        <AlertTriangle className="h-4 w-4 md:h-5 md:w-5" />
        Problem · Market
      </div>
      <h2 className="text-4xl md:text-6xl font-bold leading-tight text-white">
        왜 지금 <span className="text-vuno-cyan">EMON</span>이 필요한가?
      </h2>
      <p className="mt-6 text-xl md:text-2xl text-vuno-muted max-w-4xl mx-auto break-keep">
        2024 의료대란 이후 한국 응급의료 전달체계는 구조적 위기에 놓였습니다.
        <br className="hidden md:block" />
        통계연보 제23호 정량 근거로 문제를 정의하고, 528개 응급의료기관 시장을 겨냥합니다.
      </p>
    </Reveal>
  );
}

/* ── 위기 통계 4종 — CountUp 동적 ────────────────────── */
function CrisisStats() {
  type Stat = {
    end: number;
    suffix?: string;
    prefix?: string;
    label: string;
    sub: string;
    danger?: boolean;
  };
  const stats: Stat[] = [
    { end: 18, suffix: ".6%", prefix: "↓", danger: true,
      label: "응급실 이용 급감", sub: "전년 대비 △1,797,722건 (5년 최저)" },
    { end: 1,  suffix: ".9명", danger: true,
      label: "응급의학 전문의 / 소", sub: "지역응급의료기관 — 24h 교대 불가" },
    { end: 26, suffix: ".6%", danger: true,
      label: '전원 "전문응급요함"', sub: "야간 당직 의사결정 한계" },
    { end: 54, suffix: ".4%",
      label: "AI 개입 가능 영역", sub: "연 72,000건 전원 의사결정" },
  ];
  return (
    <Reveal>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-14">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 100}>
            <div className={`border p-7 h-full ${
              s.danger
                ? "border-rose-500/30 bg-rose-500/[0.04]"
                : "border-vuno-cyan/40 bg-vuno-cyan/[0.04]"
            }`}>
              <div className={`text-4xl md:text-6xl font-bold font-numeric tracking-tight tabular-nums ${
                s.danger ? "text-rose-400" : "text-vuno-cyan"
              }`}>
                {s.prefix && <span className="mr-1">{s.prefix}</span>}
                <CountUp end={s.end} duration={1600} delay={i * 120} />
                {s.suffix && <span>{s.suffix}</span>}
              </div>
              <div className="mt-3 text-base md:text-lg font-bold text-white">{s.label}</div>
              <div className="mt-1 text-sm md:text-base text-vuno-muted break-keep">{s.sub}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </Reveal>
  );
}

/* ── 핵심 문제 3가지 ──────────────────────────────────── */
function ProblemCards() {
  const cards = [
    {
      icon: TrendingDown,
      no: "01",
      title: "응급실에 도달조차 어렵다",
      desc: "2024년 응급실 이용 7,844,739건 — 전년 대비 18.6% 급감. 응급 의료 수요가 줄어든 것이 아니라 환자가 적시에 도달하지 못한 결과입니다.",
      kpi: "천명당 이용률 187.9 → 153.2 (5년 최저)",
    },
    {
      icon: UserCheck,
      no: "02",
      title: "야간 당직, 전문의가 없다",
      desc: "지역응급의료기관(233개소) 1개소당 응급의학 전문의 1.9명. 야간·주말은 타과 전문의·일반의가 결정을 수행하며, KTAS·필수 검사 누락 위험이 큽니다.",
      kpi: "권역 10.1명 · 지역센터 7.0명 · 지역기관 1.9명",
    },
    {
      icon: Clock,
      no: "03",
      title: "골든타임 손실 — 전원 뺑뺑이",
      desc: "전원 사유 26.6% \"전문응급의료 요함\". 5대 중증질환 모두 감소 — 허혈성 뇌졸중 -11.2%, 중증외상 -14.4%. 출혈성 뇌졸중 전원율은 36.1%.",
      kpi: "AI 개입 가능 전원 합계 54.4% — 연 72,000건",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
      {cards.map((c, i) => (
        <Reveal key={c.no} delay={i * 120}>
          <div className="relative border border-rose-500/30 bg-vuno-surface p-7 md:p-8 h-full hover:border-rose-400/70 transition-colors">
            {/* 좌측 빨간 strip */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-rose-500/70" />
            <div className="flex items-start gap-4 mb-5">
              <div className="h-12 w-12 bg-rose-500/10 border border-rose-500/40 grid place-items-center text-rose-400 flex-shrink-0">
                <c.icon className="h-6 w-6" />
              </div>
              <div className="text-sm md:text-base font-bold text-rose-300 font-numeric tracking-[0.25em] pt-3">{c.no}</div>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-3 break-keep">{c.title}</h3>
            <p className="text-base md:text-lg text-vuno-muted leading-relaxed mb-5 break-keep">{c.desc}</p>
            <div className="px-3 py-2 border border-rose-500/30 bg-rose-500/[0.06] text-sm md:text-base text-rose-200 font-numeric break-keep">
              {c.kpi}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ── 시장 구조 — 528개 응급의료기관 (4-tier 막대) ───── */
function MarketStructure() {
  const tiers = [
    { name: "권역응급의료센터", count: 44,  phys: "10.1명", phase: "—",       width: 33, accent: false },
    { name: "지역응급의료센터", count: 137, phys: "7.0명",  phase: "Phase 1", width: 64, accent: true  },
    { name: "지역응급의료기관", count: 233, phys: "1.9명",  phase: "Phase 3", width: 100, accent: true },
    { name: "응급의료시설",     count: 114, phys: "—",      phase: "—",       width: 51, accent: false },
  ];
  return (
    <Reveal>
      <div className="mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 items-start">
          {/* 좌측 — 막대 그래프 */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-vuno-cyan/40 text-vuno-cyan text-sm md:text-base font-bold uppercase tracking-[0.2em] mb-5">
              <Building2 className="h-4 w-4 md:h-5 md:w-5" />
              Total Addressable Market
            </div>
            <h3 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
              <span className="text-vuno-cyan">528</span>개 응급의료기관
            </h3>
            <p className="text-lg md:text-xl text-vuno-muted mb-7 break-keep">
              전국 응급의료자원 전수 — 1·2차 타깃은 지역응급의료센터·기관(370개소).
            </p>

            <div className="space-y-4">
              {tiers.map((t, i) => (
                <Reveal key={t.name} delay={i * 120}>
                  <div className={`border ${
                    t.accent ? "border-vuno-cyan/40 bg-vuno-cyan/[0.04]" : "border-vuno-border bg-vuno-surface"
                  } p-4 md:p-5`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`text-base md:text-lg font-bold ${t.accent ? "text-vuno-cyan" : "text-white"} truncate`}>
                          {t.name}
                        </div>
                        {t.phase !== "—" && (
                          <span className="px-2 py-0.5 border border-vuno-cyan text-vuno-cyan text-xs md:text-sm font-bold font-numeric flex-shrink-0">
                            {t.phase}
                          </span>
                        )}
                      </div>
                      <div className="flex items-baseline gap-2 flex-shrink-0">
                        <span className={`text-3xl md:text-4xl font-bold font-numeric tabular-nums ${t.accent ? "text-vuno-cyan" : "text-white"}`}>
                          {t.count}
                        </span>
                        <span className="text-sm md:text-base text-vuno-muted">개소</span>
                      </div>
                    </div>
                    <div className="relative h-2 bg-vuno-bg border border-vuno-border overflow-hidden">
                      <div
                        className={`absolute inset-y-0 left-0 ${t.accent ? "bg-vuno-cyan" : "bg-vuno-muted/50"}`}
                        style={{ width: `${t.width}%` }}
                      />
                    </div>
                    <div className="mt-2 text-sm md:text-base text-vuno-muted">
                      1개소당 응급의학 전문의 <span className="font-numeric text-white">{t.phys}</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* 우측 — 정량 시장 KPI */}
          <div className="grid grid-cols-2 gap-4 lg:sticky lg:top-32">
            <MarketKPI big="72,000" unit="건/년" label="정량 Transfer 시장" sub="전원 13.3만건 × 54.4% AI 개입" />
            <MarketKPI big="45~60" unit="억원" label="3년 ARR SOM" sub="단계별 도입률 가정" highlight />
            <MarketKPI big="50%" unit="" label="5년 내 도입 목표" sub="528개소 중 264+ 도입" />
            <MarketKPI big="11B" unit="USD" label="글로벌 CDS 시장 (2030)" sub="Clinical Decision Support TAM" />
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function MarketKPI({
  big, unit, label, sub, highlight,
}: { big: string; unit: string; label: string; sub: string; highlight?: boolean }) {
  return (
    <div className={`border p-5 md:p-6 ${
      highlight ? "border-vuno-cyan bg-vuno-cyan/[0.06]" : "border-vuno-border bg-vuno-surface"
    }`}>
      <div className="flex items-baseline gap-1.5">
        <div className={`text-3xl md:text-4xl font-bold font-numeric tabular-nums ${
          highlight ? "text-vuno-cyan" : "text-white"
        }`}>
          {big}
        </div>
        {unit && <div className={`text-base md:text-lg ${highlight ? "text-vuno-cyan/80" : "text-vuno-muted"}`}>{unit}</div>}
      </div>
      <div className="mt-2 text-base md:text-lg font-bold text-white break-keep">{label}</div>
      <div className="mt-1 text-sm md:text-base text-vuno-muted break-keep">{sub}</div>
    </div>
  );
}

/* ── 우리의 답 — 3대 가치 ──────────────────────────── */
function ValueProposition() {
  const values = [
    {
      icon: Clock,
      title: "시간단축",
      sub: "Door-to-Decision 단축",
      from: "50분",
      to: "15분",
      desc: "주호소 입력 즉시 ECG·CXR·Lab 능동 호출 → 9섹션 한국어 소견서 자동 생성",
      kpi: "D2B 90→60분 · 재실 2h 미만 48.8% 환자군",
    },
    {
      icon: Search,
      title: "놓침방지",
      sub: "필수 검사 누락 차단",
      from: "15~20%",
      to: "5%",
      desc: "Chief Complaint별 검사 프로파일 + Rule Engine + Negation Leak 차단",
      kpi: "전원 사유 26.6% \"전문응급요함\" 타깃",
    },
    {
      icon: Gavel,
      title: "법적방어",
      sub: "Audit Log + 가이드라인 인용",
      from: "—",
      to: "100%",
      desc: "모든 판단에 timestamp + RAG 사례 + heatmap 자동 저장 (FHIR R4 표준)",
      kpi: "모든 결정 시점 + 근거 + 모델 버전 추적",
    },
  ];
  return (
    <Reveal>
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 border border-vuno-cyan/40 text-vuno-cyan text-sm md:text-base font-bold uppercase tracking-[0.2em] mb-5">
          <ShieldCheck className="h-4 w-4 md:h-5 md:w-5" />
          Our Answer
        </div>
        <h3 className="text-3xl md:text-5xl font-bold text-white leading-tight">
          EMON의 <span className="text-vuno-cyan">3대 가치</span>
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {values.map((v, i) => (
          <Reveal key={v.title} delay={i * 120}>
            <div className="border border-vuno-cyan/50 bg-vuno-surface p-7 md:p-8 h-full hover:border-vuno-cyan hover:bg-vuno-cyan/[0.04] transition-all shadow-[0_0_0_1px_rgba(67,224,212,0.15)]">
              <div className="flex items-start gap-4 mb-5">
                <div className="h-14 w-14 bg-vuno-cyan/10 border border-vuno-cyan/50 grid place-items-center text-vuno-cyan flex-shrink-0">
                  <v.icon className="h-7 w-7" />
                </div>
              </div>

              <h4 className="text-2xl md:text-3xl font-bold text-white mb-2">{v.title}</h4>
              <div className="text-base md:text-lg text-vuno-cyan/80 mb-5">{v.sub}</div>

              {/* Before → After */}
              <div className="flex items-center gap-3 mb-5 px-4 py-3 bg-vuno-bg border border-vuno-border">
                <span className="text-base md:text-lg text-rose-300 line-through font-numeric flex-shrink-0">
                  {v.from}
                </span>
                <ChevronDown className="h-5 w-5 -rotate-90 text-vuno-muted flex-shrink-0" />
                <span className="text-2xl md:text-3xl font-bold text-vuno-cyan font-numeric tabular-nums">
                  {v.to}
                </span>
              </div>

              <p className="text-base md:text-lg text-vuno-muted leading-relaxed mb-5 break-keep">
                {v.desc}
              </p>
              <div className="text-sm md:text-base text-vuno-cyan/80 font-numeric break-keep">
                ▸ {v.kpi}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-12 text-center">
        <Link
          to="/technology"
          className="inline-flex items-center gap-2 h-14 px-9 font-bold border border-vuno-cyan text-vuno-cyan hover:bg-vuno-cyan hover:text-vuno-bg transition-colors tracking-wider uppercase text-base md:text-lg"
        >
          기술 아키텍처 자세히 보기 <ArrowUpRight className="h-5 w-5" />
        </Link>
      </div>
    </Reveal>
  );
}
