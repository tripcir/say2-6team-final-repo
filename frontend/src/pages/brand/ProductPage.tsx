import { Link } from "react-router-dom";
import {
  Activity, Image as ImageIcon, Sparkles,
  ArrowUpRight, ChevronRight, Check, Monitor,
  BellRing, FileText, Zap, Layers,
} from "lucide-react";
import { BrandShell } from "../../components/brand/BrandShell";
import { Reveal } from "../../components/brand/anim/Reveal";
import { cn } from "../../lib/cn";

export default function ProductPage() {
  return (
    <BrandShell>
      <PageHero />
      <ProductFormats />
      <CoreFlow />
      <BottomCTA />
    </BrandShell>
  );
}

/* ───────────────────────────────────────────────────────
   CORE WORKFLOW — 시스템의 핵심 두 페이지 (가장 중요)
   ① 병렬 AI 판독 검사결과   ② AI 종합소견 생성
   ─────────────────────────────────────────────────────── */
interface FlowSpec {
  step: string;
  badge: string;
  title: string;
  tagline: string;
  desc: string;
  highlights: string[];
  image: string;
  alt: string;
  bigImage?: boolean;   // true면 이 블록의 이미지 영역만 크게
}

const FLOWS: FlowSpec[] = [
  {
    step: "STEP 1",
    badge: "AI READ · 검사 결과",
    title: "AI 판독 검사결과",
    tagline: "ECG · CXR · LAB 3개 모달이 동시에 추론, 한 화면에 통합 표시",
    desc:
      "환자가 도착하면 3개 AI 모달이 즉시 병렬로 동작합니다. ECG(Mamba S6) · CXR(DenseNet + U-Net) · LAB(룰엔진 + XGBoost)가 동시 추론하고, 의료진은 한 화면에서 모든 판독 결과를 신뢰도(%)와 함께 확인합니다.",
    highlights: [
      "3개 모달 병렬 추론 — 각각 독립 ECS 마이크로서비스로 격리 배포",
      "AI 판단결과 + 신뢰도(%) + Critical/Urgent 위험도 자동 표시",
      "CXR PACS 뷰어 · 12-Lead 라이브 차트 · 룰엔진 + 6시간 예측 통합 뷰",
    ],
    image: "/flow-ai-result.png",
    alt: "EMON Med — AI 판독 검사결과 (ECG·CXR·LAB 병렬 분석)",
    bigImage: true,
  },
  {
    step: "STEP 2",
    badge: "DIAGNOSTIC REPORT · 소견서",
    title: "AI 종합소견 생성",
    tagline: "검사 결과 + RAG 유사사례 → 한국어 소견서 초안 자동 작성",
    desc:
      "3개 모달의 판독 결과와 환자 기저질환·활력징후를 종합해 Bedrock Claude가 한국어 소견서 초안을 자동 작성합니다. ChromaDB RAG가 MIMIC-IV 임상노트에서 유사사례를 검색해 근거 자료로 제공하고, 의사는 검토 후 한 번의 클릭으로 EMR로 전송합니다.",
    highlights: [
      "Bedrock Claude (Haiku 4.5 / Sonnet 4.6) — 한국어 소견서 narrative 생성",
      "ChromaDB RAG — MIMIC-IV 49,743건 유사사례 검색해 근거 자료로 첨부",
      "2-step 검토 플로우: 소견 검토 → 소견 확정 · EMR 전송 (FHIR DiagnosticReport)",
    ],
    image: "/flow-ai-report.png",
    alt: "EMON Med — AI 종합소견 생성 (소견서 초안 + RAG 근거자료)",
    bigImage: true,
  },
];

function CoreFlow() {
  return (
    <section className="py-28 border-b border-vuno-divider bg-vuno-bg">
      <div className="max-w-[1400px] mx-auto px-6">
        <Reveal className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-vuno-cyan/40 text-vuno-cyan text-sm md:text-base font-bold uppercase tracking-[0.2em] mb-5">
            <Sparkles className="h-4 w-4" />
            Core Workflow · 핵심 기능
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            병렬 AI 분석부터<br />
            <span className="text-vuno-cyan">종합 소견서 생성까지</span>
          </h2>
          <p className="mt-6 text-xl md:text-2xl text-vuno-muted max-w-3xl mx-auto leading-relaxed">
            환자가 도착한 순간부터 의사가 소견서를 확정하기까지 — EMON Med®의 가장 중요한 두 단계입니다.
          </p>
        </Reveal>

        <div className="space-y-20 lg:space-y-28">
          {FLOWS.map((f, i) => (
            <FlowBlock key={f.title} spec={f} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FlowBlock({ spec, flip }: { spec: FlowSpec; flip: boolean }) {
  return (
    <Reveal>
      <div className={cn(
        "grid grid-cols-1 gap-10 lg:gap-14 items-center",
        // flip(이미지가 우측)이면 큰 트랙을 2번째로, 아니면 1번째로.
        // bigImage가 true면 이미지 트랙을 1.7fr, 아니면 1.3fr.
        !flip && !spec.bigImage && "lg:grid-cols-[1.3fr_1fr]",
        !flip && spec.bigImage  && "lg:grid-cols-[1.7fr_1fr]",
        flip  && !spec.bigImage && "lg:grid-cols-[1fr_1.3fr]",
        flip  && spec.bigImage  && "lg:grid-cols-[1fr_1.7fr]",
      )}>
        {/* 스크린샷 (두 블록 동일 비율로 고정 — STEP 1/2 시각 크기 일치) */}
        <div className={cn("min-w-0", flip ? "lg:order-2" : "lg:order-1")}>
          <div className="rounded-xl overflow-hidden border border-vuno-border shadow-2xl aspect-[3006/1720] bg-vuno-bg">
            <img
              src={spec.image}
              alt={spec.alt}
              loading="lazy"
              className="w-full h-full object-cover object-top block"
            />
          </div>
        </div>
        {/* 텍스트 */}
        <div className={cn("min-w-0", flip ? "lg:order-1" : "lg:order-2")}>
          <div className="text-base md:text-lg font-bold text-vuno-cyan font-numeric tracking-[0.25em] mb-3">
            {spec.step}
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-vuno-cyan/40 text-vuno-cyan text-sm md:text-base font-bold uppercase tracking-[0.15em] mb-4">
            {spec.badge}
          </div>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {spec.title}
          </h3>
          <div className="text-xl md:text-2xl text-vuno-cyan/90 font-medium mb-5">
            {spec.tagline}
          </div>
          <p className="text-lg md:text-xl text-vuno-muted leading-relaxed mb-7 max-w-2xl">
            {spec.desc}
          </p>
          <ul className="space-y-3.5">
            {spec.highlights.map((h) => (
              <li key={h} className="flex items-start gap-3">
                <span className="mt-0.5 h-7 w-7 flex-shrink-0 grid place-items-center bg-vuno-cyan/10 border border-vuno-cyan/30">
                  <Check className="h-4 w-4 text-vuno-cyan" strokeWidth={3} />
                </span>
                <span className="text-base md:text-lg text-white/90 leading-relaxed">{h}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}

function PageHero() {
  return (
    <section className="border-b border-vuno-divider bg-vuno-bg">
      <div className="max-w-[1400px] mx-auto px-6 py-20 md:py-28">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 border border-vuno-cyan/40 text-vuno-cyan text-base md:text-lg font-bold uppercase tracking-[0.2em] mb-7">
            Product · 응급실 진단보조 AI
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight text-white max-w-4xl">
            환자가 도착하면,<br />
            <span className="text-vuno-cyan">AI가 가장 먼저 읽습니다</span>
          </h1>
          <p className="mt-8 text-xl md:text-2xl text-vuno-muted leading-relaxed max-w-3xl">
            <b className="text-white">EMON Med®</b>는 심전도·흉부 X-ray·혈액검사를 <b className="text-white">동시에 분석</b>하고,
            과거 유사 환자 사례까지 찾아 의사에게 <b className="text-white">종합 소견서 초안</b>을 정리해 줍니다.
            의사는 검토하고 확정만 — <b className="text-white">최종 진단과 결정은 언제나 의사</b>의 몫입니다.
          </p>
          {/* 3단계 직관 흐름 */}
          <div className="mt-9 flex flex-wrap gap-3">
            {[
              "① ECG · CXR · LAB 동시 분석",
              "② 유사 환자 사례 검색 (RAG)",
              "③ 소견서 초안 자동 생성",
            ].map((t) => (
              <span
                key={t}
                className="inline-flex items-center px-5 py-3 rounded-md border border-vuno-border bg-vuno-surface text-base md:text-lg font-medium text-white/90"
              >
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────────
   웹 / 앱 — 두 가지 형태로 제공되는 EMON (VUNO 스타일 교차 블록)
   ─────────────────────────────────────────────────────── */
interface FormatSpec {
  badge: string;
  name: string;
  tagline: string;
  desc: string;
  features: { icon: typeof Activity; text: string }[];
  cta: { label: string; to: string };
  visual: () => JSX.Element;
}

const FORMATS: FormatSpec[] = [
  {
    badge: "WEB · 의사 콘솔",
    name: "EMON 웹 콘솔",
    tagline: "응급실 통합 모니터 — 한 화면에서 모든 환자",
    desc: "데스크·대형 모니터에 상시 띄워두는 관제 화면입니다. 들어오는 환자와 AI 분석 현황을 실시간으로 한눈에 보고, 소견서 작성까지 끊김 없이 이어집니다.",
    features: [
      { icon: Layers, text: "환자 워크리스트 · 실시간 AI 분석 현황을 한눈에" },
      { icon: Sparkles, text: "ECG·CXR·LAB 판독 + RAG 유사사례를 통합 뷰로" },
      { icon: FileText, text: "소견서 생성 → 검토 → 확정(EMR 전송)까지 원스톱" },
      { icon: Zap, text: "WebSocket 실시간 갱신 — 새 권고·결과 즉시 반영" },
    ],
    cta: { label: "웹 데모 보기", to: "/demo" },
    visual: WebConsoleMock,
  },
  {
    badge: "APP · 의사 모바일",
    name: "EMON 모바일 앱",
    tagline: "이동 중에도 놓치지 않는 응급 알림",
    desc: "회진·처치로 자리를 비운 의사의 손안으로. Critical 환자와 소견서 확정 대기를 푸시로 즉시 알리고, 폰에서 바로 검토·확정할 수 있습니다.",
    features: [
      { icon: BellRing, text: "Critical 환자 · 소견서 생성 완료를 즉시 푸시 알림" },
      { icon: ImageIcon, text: "환자 상세 · 검사 결과지를 모바일에 최적화" },
      { icon: FileText, text: "소견 검토 · 확정(EMR 전송)을 폰에서 바로" },
      { icon: Monitor, text: "웹과 동일한 데이터 · 동일한 워크플로우" },
    ],
    cta: { label: "iOS · Android 지원", to: "http://localhost:8090/" },
    visual: AppMock,
  },
];

function ProductFormats() {
  return (
    <section className="py-24 border-b border-vuno-divider bg-vuno-bg">
      <div className="max-w-[1400px] mx-auto px-6">
        <Reveal className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-vuno-cyan/40 text-vuno-cyan text-sm md:text-base font-bold uppercase tracking-[0.2em] mb-5">
            <Layers className="h-4 w-4" />
            제품 구성
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            하나의 AI,<br className="md:hidden" />
            <span className="text-vuno-cyan"> 두 가지 화면</span>
          </h2>
          <p className="mt-6 text-xl md:text-2xl text-vuno-muted max-w-3xl mx-auto leading-relaxed">
            응급실 데스크의 <b className="text-white">웹 콘솔</b>과 의사의 <b className="text-white">모바일 앱</b>.
            같은 데이터, 같은 워크플로우를 두 가지 형태로 제공합니다.
          </p>
        </Reveal>

        <div className="space-y-20 lg:space-y-28">
          {FORMATS.map((f, i) => (
            <FormatBlock key={f.name} spec={f} flip={i % 2 === 1} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FormatBlock({ spec, flip, index }: { spec: FormatSpec; flip: boolean; index: number }) {
  return (
    <Reveal>
      <div className={cn(
        "grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center",
      )}>
        {/* 비주얼 */}
        <div className={cn("min-w-0", flip ? "lg:order-2" : "lg:order-1")}>
          {spec.visual()}
        </div>

        {/* 텍스트 */}
        <div className={cn("min-w-0", flip ? "lg:order-1" : "lg:order-2")}>
          <div className="text-sm md:text-base font-bold text-vuno-cyan font-numeric tracking-[0.25em] mb-3">
            0{index + 1}
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-vuno-cyan/40 text-vuno-cyan text-sm font-bold uppercase tracking-[0.15em] mb-4">
            {spec.badge}
          </div>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {spec.name}
          </h3>
          <div className="text-xl md:text-2xl text-vuno-cyan/90 font-medium mb-5">{spec.tagline}</div>
          <p className="text-lg md:text-xl text-vuno-muted leading-relaxed mb-8 max-w-2xl">
            {spec.desc}
          </p>

          <ul className="space-y-3.5 mb-9">
            {spec.features.map((ft) => (
              <li key={ft.text} className="flex items-start gap-3">
                <span className="mt-0.5 h-7 w-7 flex-shrink-0 grid place-items-center bg-vuno-cyan/10 border border-vuno-cyan/30">
                  <Check className="h-4 w-4 text-vuno-cyan" strokeWidth={3} />
                </span>
                <span className="text-base md:text-lg text-white/90 leading-relaxed">{ft.text}</span>
              </li>
            ))}
          </ul>

          {/* 외부 URL(앱 데모 등)이면 새 탭으로, 내부 경로면 SPA 라우팅 */}
          {spec.cta.to.startsWith("http") ? (
            <a
              href={spec.cta.to}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-14 px-8 font-bold bg-vuno-cyan text-vuno-bg hover:bg-vuno-cyanGlow transition-colors tracking-wider uppercase text-base"
            >
              {spec.cta.label}
              <ArrowUpRight className="h-5 w-5" />
            </a>
          ) : (
            <Link
              to={spec.cta.to}
              className="inline-flex items-center gap-2 h-14 px-8 font-bold bg-vuno-cyan text-vuno-bg hover:bg-vuno-cyanGlow transition-colors tracking-wider uppercase text-base"
            >
              {spec.cta.label}
              <ArrowUpRight className="h-5 w-5" />
            </Link>
          )}
        </div>
      </div>
    </Reveal>
  );
}

/* 웹 콘솔 미리보기 — 실제 EMON 콘솔 스크린샷 */
function WebConsoleMock() {
  return (
    <div className="border border-vuno-border bg-vuno-surface shadow-2xl rounded-lg overflow-hidden">
      <img
        src="/product-web.png"
        alt="EMON 웹 콘솔 실제 화면 — 환자정보입력·접수 대기열·환자 목록"
        className="w-full h-auto block"
        loading="lazy"
      />
    </div>
  );
}

/* 모바일 앱 미리보기 — 실제 시연 스크린샷 11종을 가로 스크롤 캐러셀로 */
const APP_SHOTS: [string, string][] = [
  ["/product-app-1.png", "로그인"],
  ["/product-app-2.png", "환자 정보 입력"],
  ["/product-app-3.png", "AI 분석 시작"],
  ["/product-app-4.png", "AI 분석"],
  ["/product-app-5.png", "의사 직접 지시"],
  ["/product-app-6.png", "AI 검사 결과"],
  ["/product-app-7.png", "소견서 생성"],
  ["/product-app-8.png", "소견 근거 자료"],
  ["/product-app-9.png", "운영 모니터링"],
  ["/product-app-10.png", "환자 목록"],
  ["/product-app-11.png", "환자 알림 (웹 연동)"],
];

function AppMock() {
  return (
    <div>
      <div className="overflow-x-auto pb-3 snap-x snap-mandatory [scrollbar-color:theme(colors.vuno-border)_transparent]">
        <div className="flex gap-4 w-max px-0.5">
          {APP_SHOTS.map(([src, cap], i) => (
            <figure key={src} className="snap-center shrink-0 w-[230px]">
              {/* 아이폰 프레임 비율(393:852)로 통일 — 소스 해상도가 달라도 동일 크기 */}
              <img
                src={src}
                alt={`EMON 앱 — ${cap}`}
                loading="lazy"
                className="w-[230px] aspect-[393/852] object-cover object-top block rounded-[1.6rem] drop-shadow-2xl border border-vuno-border/50"
              />
              <figcaption className="mt-2 text-center text-[11px] text-vuno-muted">
                <span className="font-numeric text-vuno-cyan font-bold">{i + 1}</span> · {cap}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      <div className="mt-1 text-[11px] text-vuno-dim flex items-center gap-1.5">
        <ChevronRight className="h-3.5 w-3.5" />
        옆으로 스크롤하면 로그인부터 알림까지 전체 시연 화면을 볼 수 있습니다.
      </div>
    </div>
  );
}

function BottomCTA() {
  return (
    <section className="py-20 border-t border-vuno-divider">
      <div className="max-w-[900px] mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          실제 화면으로 직접 확인하세요
        </h2>
        <p className="mt-4 text-lg md:text-xl text-vuno-muted">
          5명의 데모 환자가 등록되어 있습니다. 클릭 한 번이면 됩니다.
        </p>
        <Link
          to="/demo"
          className="inline-flex items-center gap-2 mt-8 h-14 px-9 font-bold bg-vuno-cyan text-vuno-bg hover:bg-vuno-cyanGlow transition-colors tracking-wider uppercase text-base"
        >
          Live Demo 시작
          <ArrowUpRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  );
}
