import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { BrandShell } from "../../components/brand/BrandShell";
import { Reveal } from "../../components/brand/anim/Reveal";

export default function ProductLabPage() {
  return (
    <BrandShell>
      <Hero />
      <ProductScreen />
      <FeatureSection />
      <SpecSection />
      <BottomCTA />
    </BrandShell>
  );
}

function Hero() {
  return (
    <section className="border-b border-vuno-divider bg-vuno-bg">
      <div className="max-w-[1400px] mx-auto px-6 py-20">
        <Link to="/product" className="inline-flex items-center gap-1.5 text-base text-vuno-muted hover:text-white mb-7">
          <ArrowLeft className="h-5 w-5" /> Products
        </Link>

        <Reveal>
          <div className="text-sm md:text-base text-vuno-muted mb-4">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/product" className="hover:text-white">Products</Link>
            <span className="mx-2">/</span>
            <span className="text-vuno-cyan">EMON LAB</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight text-white">
            EMON LAB<sup className="text-vuno-cyan text-3xl md:text-4xl">®</sup>
            <span className="text-vuno-cyan">™</span>
          </h1>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="inline-flex items-center gap-3 text-vuno-cyan font-semibold mb-4 text-lg md:text-xl">
                <span className="h-9 w-9 rounded-full border border-vuno-cyan/40 grid place-items-center text-base">⚗</span>
                EMON LAB · Rule Engine + XGBoost 5-앙상블
              </div>
              <p className="text-xl md:text-2xl text-white leading-relaxed">
                WBC·Hb·Creatinine·Troponin·NT-proBNP 등 15+ 응급 검사 항목을
                룰엔진으로 정상범위 자동 판정하고, XGBoost 5-앙상블 모델이
                <b className="text-white"> 6시간 후 악화 확률</b>까지 예측합니다.
              </p>
            </div>
            <div className="flex items-end justify-start lg:justify-end">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 h-14 px-9 border border-vuno-cyan text-vuno-cyan hover:bg-vuno-cyan hover:text-vuno-bg transition-colors font-bold tracking-wider uppercase text-base md:text-lg"
              >
                문의사항 남기기
              </Link>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-5">
            <CertBadge icon="⚗" title="AI 통합 검사값 해석 솔루션" />
            <CertBadge icon="🏅" title="혁신의료기기 지정" />
            <CertBadge icon="✓" title="식품의약품안전처 허가획득" />
            <CertBadge icon="CE" title="CE 인증 획득" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CertBadge({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-14 w-14 rounded-full border border-vuno-cyan/30 grid place-items-center text-vuno-cyan text-lg font-bold flex-shrink-0">
        {icon}
      </div>
      <div className="text-base md:text-lg text-white leading-tight">{title}</div>
    </div>
  );
}

function ProductScreen() {
  return (
    <section className="py-28 bg-vuno-bg border-t border-vuno-divider">
      <div className="max-w-[1400px] mx-auto px-6">
        <Reveal className="mb-12 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-vuno-cyan/40 text-vuno-cyan text-sm md:text-base font-bold uppercase tracking-[0.2em] mb-5">
            Ready to Support
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            룰엔진 + 6시간 후 악화 예측
          </h2>
          <p className="mt-5 text-xl md:text-2xl text-vuno-muted leading-relaxed">
            응급실 환자의 LAB 결과를 룰엔진이 즉시 정상범위 판정(Norm/High/Low)하고,
            XGBoost 5-앙상블이 6시간 후 악화 확률을 함께 산출해
            <b className="text-white"> 다음 처치 의사결정</b>을 보조합니다.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <DeepCarsScreen />
        </Reveal>
      </div>
    </section>
  );
}

function DeepCarsScreen() {
  return (
    <div className="border border-vuno-border bg-[#081427] shadow-2xl overflow-hidden">
      {/* 헤더 */}
      <div className="bg-vuno-bg px-4 py-2.5 border-b border-vuno-border flex items-center gap-3 text-xs">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-vuno-cyan/60 bg-vuno-cyan/10">
          <span className="h-1.5 w-1.5 rounded-full bg-vuno-cyan animate-pulse" />
          <span className="text-[10px] font-bold text-vuno-cyan tracking-wider uppercase">EMON LAB · Rule Engine + XGBoost</span>
        </span>
        <span className="text-vuno-muted">PID W-0042 · 김OO M/52 · 6h Prognosis</span>
        <span className="ml-auto text-vuno-cyan font-bold font-numeric text-sm">88</span>
      </div>

      {/* 비디오 영역 (16:9 비율 유지) */}
      <div className="relative aspect-video bg-black">
        <video
          src="/lab.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* 하단 라벨 */}
      <div className="px-4 py-2.5 bg-vuno-bg border-t border-vuno-border flex items-center justify-between text-xs">
        <span className="text-vuno-muted tracking-wider uppercase">Vital Trend · 6h Prediction</span>
        <span className="text-vuno-cyan font-bold tracking-wider uppercase text-[10px]">Real-time</span>
      </div>
    </div>
  );
}

function FeatureSection() {
  const features = [
    {
      num: "01",
      title: "룰엔진 즉시 판정",
      desc: "15+ 응급 검사 항목(WBC·Hb·Creatinine·BUN·Troponin·NT-proBNP·CK-MB 등)을 임상 표준 정상범위로 즉시 Norm/High/Low 분류.",
    },
    {
      num: "02",
      title: "XGBoost 5-앙상블 예측",
      desc: "5개 XGBoost 모델 앙상블이 6시간 후 Hemoglobin·Creatinine·Potassium·Lactate·Troponin 악화 확률 산출.",
    },
    {
      num: "03",
      title: "위험 패턴 자동 탐지",
      desc: "단일 검사가 아닌 다중 검사 조합 인지 — 빈혈+심근손상, Cr↑+Troponin↑ 같은 위험 조합을 룰로 명시 경고.",
    },
    {
      num: "04",
      title: "조기 경보 + EMR 연동",
      desc: "Critical 임계 돌파 시 WebSocket·FCM Push로 즉시 알림. FHIR Observation으로 EMR 자동 저장.",
    },
  ];
  return (
    <section className="py-28 bg-vuno-bg border-t border-vuno-divider">
      <div className="max-w-[1400px] mx-auto px-6">
        <Reveal className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white">Key Features</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <Reveal key={f.num} delay={i * 100}>
              <div className="border border-vuno-border bg-vuno-surface p-7 h-full hover:border-vuno-cyan transition-colors">
                <div className="text-base md:text-lg font-bold text-vuno-cyan font-numeric tracking-[0.25em] mb-4">{f.num}</div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{f.title}</h3>
                <p className="text-base md:text-lg text-vuno-muted leading-relaxed">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SpecSection() {
  const specs = [
    { label: "AI 모델",         value: "Rule Engine + XGBoost 5-앙상블 (PyPI xgboost==3.2)" },
    { label: "처리 레이어",      value: "Layer1 입력 처리 · Layer2 룰엔진 · Layer3 리포트 생성" },
    { label: "입력 형식",        value: "FHIR Observation · JSON 검사값 (S3 MIMIC-IV 또는 라이브 EMR)" },
    { label: "추론 시간",        value: "룰엔진 즉시 + XGBoost 5-앙상블 추론 ~수십 ms" },
    { label: "룰엔진 판정 항목",  value: "WBC·Hb·Platelet·Creatinine·BUN·Na·K·Glucose·AST·Albumin·Lactate·Ca·Troponin T·NT-proBNP·CK-MB 등 15+" },
    { label: "XGBoost 예측 대상", value: "6시간 후 Hemoglobin↓·Creatinine↑·Potassium 악화·Lactate↑·Troponin↑ 확률" },
    { label: "출력",             value: "JSON (per-feature flag + 6h prognosis) · 한국어 소견 · FHIR Observation" },
    { label: "통합",             value: "Orchestrator · HAPI FHIR · S3 (MIMIC 캐시) · WebSocket · FCM Push" },
  ];
  return (
    <section className="py-28 bg-vuno-surface/30">
      <div className="max-w-[1400px] mx-auto px-6">
        <Reveal className="mb-14">
          <h2 className="text-4xl md:text-6xl font-bold text-white">Specifications</h2>
        </Reveal>
        <div className="border border-vuno-border">
          {specs.map((s) => (
            <Reveal key={s.label}>
              <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-6 px-7 py-6 border-b border-vuno-border last:border-0 hover:bg-vuno-surface/40 transition-colors">
                <div className="text-base md:text-lg font-bold text-vuno-cyan uppercase tracking-wider">{s.label}</div>
                <div className="text-lg md:text-xl text-white">{s.value}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            "Troponin T", "CK-MB", "NT-proBNP",
            "WBC", "Hemoglobin", "Platelet",
            "Creatinine", "BUN", "Sodium / Potassium",
            "Glucose", "AST / Albumin", "Lactate · Calcium",
          ].map((tag) => (
            <div key={tag} className="flex items-center gap-2 px-4 py-3 bg-vuno-bg border border-vuno-border/60">
              <CheckCircle2 className="h-5 w-5 text-vuno-cyan flex-shrink-0" />
              <span className="text-base md:text-lg text-white">{tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BottomCTA() {
  return (
    <section className="py-24 border-t border-vuno-divider">
      <div className="max-w-[900px] mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white">EMON LAB, 직접 사용해보세요</h2>
        <p className="mt-4 text-lg md:text-xl text-vuno-muted">데모 환자의 LAB 룰엔진 결과와 6시간 후 악화 예측을 즉시 확인할 수 있습니다.</p>
        <div className="mt-9 flex items-center justify-center gap-3 flex-wrap">
          <Link
            to="/demo/patient/042"
            className="inline-flex items-center gap-2 h-14 px-9 bg-vuno-cyan text-vuno-bg hover:bg-vuno-cyanGlow font-bold tracking-wider uppercase text-base md:text-lg"
          >
            데모 보기 <ArrowUpRight className="h-5 w-5" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 h-14 px-9 border border-vuno-border text-white hover:bg-vuno-surface font-bold tracking-wider uppercase text-base md:text-lg"
          >
            문의하기
          </Link>
        </div>
      </div>
    </section>
  );
}
