import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Download, CheckCircle2 } from "lucide-react";
import { BrandShell } from "../../components/brand/BrandShell";
import { Reveal } from "../../components/brand/anim/Reveal";

export default function ProductEcgPage() {
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
          <ArrowLeft className="h-5 w-5" />
          Products
        </Link>

        <Reveal>
          <div className="text-sm md:text-base text-vuno-muted mb-4">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/product" className="hover:text-white">Products</Link>
            <span className="mx-2">/</span>
            <span className="text-vuno-cyan">EMON ECG</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight text-white">
            EMON ECG<sup className="text-vuno-cyan text-3xl md:text-4xl">®</sup>
            <span className="text-vuno-cyan">™</span>
          </h1>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="inline-flex items-center gap-3 text-vuno-cyan font-semibold mb-4 text-lg md:text-xl">
                <span className="h-9 w-9 rounded-full border border-vuno-cyan/40 grid place-items-center text-base">⚡</span>
                EMON ECG · Mamba S6 Engine
              </div>
              <p className="text-xl md:text-2xl text-white leading-relaxed">
                12-Lead 심전도를 Mamba S6 시퀀스 모델로 자동 판독합니다.
                ST 상승·부정맥·전도장애 등 응급 심혈관 이벤트 24종 확률을
                평균 2초 내 산출해 의료진의 판독을 보조합니다.
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
            <CertBadge icon="🫀" title="인공지능 ECG 판독 보조 솔루션" />
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
            Ready to Support
          </h2>
          <p className="mt-5 text-xl md:text-2xl text-vuno-muted leading-relaxed">
            주요 심전도 비정상 소견을 확신도(%)와 함께 제공하고, 의료진 선호도에 따라
            소견 표시 여부를 설정할 수 있습니다. 12-Lead 표준 입력 지원.
          </p>
        </Reveal>

        {/* DeepECG LVSD 스타일 화면 — 빨간 그리드 + 파형 */}
        <Reveal delay={200}>
          <DeepEcgScreen />
        </Reveal>
      </div>
    </section>
  );
}

function DeepEcgScreen() {
  return (
    <div className="border border-vuno-border bg-white shadow-2xl overflow-hidden">
      {/* 상단 환자 정보 바 */}
      <div className="bg-slate-700 text-white px-4 py-2 text-xs flex items-center justify-between">
        <span className="font-bold tracking-wider">EMON ECG · Mamba S6 Engine</span>
        <span className="text-slate-300 font-numeric">김OO</span>
      </div>

      {/* 환자 메타 정보 */}
      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
        <div className="flex flex-wrap items-center gap-5 text-xs">
          <span className="inline-flex items-center gap-2 px-2.5 py-1 bg-red-100 text-red-700 font-bold">
            <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
            STEMI Detected
          </span>
          <MetaItem label="PID" value="S0042" />
          <MetaItem label="Name" value="김OO" />
          <MetaItem label="Birthdate" value="1973-08-15" />
          <MetaItem label="Sex" value="M" />
          <MetaItem label="측정일시" value="2026-05-13 14:32:00" />
          <MetaItem label="Age" value="52" />
          <MetaItem label="Heart Rate" value="88 bpm" />
          <MetaItem label="PR interval" value="160 ms" />
          <MetaItem label="QRS duration" value="95 ms" />
          <MetaItem label="QT interval" value="380 ms" />
          <MetaItem label="QTc interval" value="412 ms" />
          <MetaItem label="R Axis" value="42" />
          <span className="ml-auto inline-flex items-center gap-1.5 px-2.5 py-1 border border-slate-300 text-slate-700 text-xs font-medium hover:bg-slate-100 cursor-pointer">
            <Download className="h-3 w-3" />
            Download
          </span>
        </div>
      </div>

      {/* 12-Lead ECG — 빨간 그리드 + 검정 파형 (의료 표준) */}
      <div className="bg-white p-4 relative" style={{
        backgroundImage:
          "linear-gradient(rgba(239, 68, 68, 0.15) 1px, transparent 1px)," +
          "linear-gradient(90deg, rgba(239, 68, 68, 0.15) 1px, transparent 1px)," +
          "linear-gradient(rgba(239, 68, 68, 0.4) 1px, transparent 1px)," +
          "linear-gradient(90deg, rgba(239, 68, 68, 0.4) 1px, transparent 1px)",
        backgroundSize: "8px 8px, 8px 8px, 40px 40px, 40px 40px",
      }}>
        <div className="grid grid-cols-1 gap-1">
          {[
            ["I",   "aVR", "V1", "V4"],
            ["II",  "aVL", "V2", "V5"],
            ["III", "aVF", "V3", "V6"],
          ].map((row, rowIdx) => (
            <div key={rowIdx} className="grid grid-cols-4 gap-2">
              {row.map((lead) => (
                <EcgLead key={lead} lead={lead} abnormal={["V2", "V3", "V4"].includes(lead)} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex flex-col">
      <span className="text-[10px] text-slate-500 leading-none mb-0.5">{label}</span>
      <span className="text-xs font-bold text-slate-800 font-numeric">{value}</span>
    </span>
  );
}

function EcgLead({ lead, abnormal }: { lead: string; abnormal?: boolean }) {
  return (
    <div className="relative h-14 flex items-center">
      <span className="absolute top-0.5 left-1 text-[10px] font-bold text-slate-700 z-10">{lead}</span>
      <svg viewBox="0 0 200 40" className="w-full h-full" preserveAspectRatio="none">
        <path
          d={abnormal
            ? "M0,22 L20,22 L25,8 L30,32 L35,4 L45,22 L70,22 L75,8 L80,32 L85,4 L95,22 L120,22 L125,8 L130,32 L135,4 L145,22 L170,22 L175,8 L180,32 L185,4 L195,22 L200,22"
            : "M0,22 L20,22 L25,16 L30,28 L35,10 L45,22 L70,22 L75,16 L80,28 L85,10 L95,22 L120,22 L125,16 L130,28 L135,10 L145,22 L170,22 L175,16 L180,28 L185,10 L195,22 L200,22"}
          stroke="#1A1A1A" strokeWidth="0.8" fill="none"
        />
      </svg>
    </div>
  );
}

function FeatureSection() {
  const features = [
    {
      num: "01",
      title: "Mamba S6 시퀀스 모델",
      desc: "PyTorch로 학습된 Mamba S6 모델을 ONNX Runtime으로 추론. 평균 2초 내 24개 질환 확률 산출.",
    },
    {
      num: "02",
      title: "24종 질환 다중분류",
      desc: "심방세동/심방조동·STEMI·전도장애(AV/LBBB)·서맥/빈맥·발작성 빈맥 등 응급 심혈관 이벤트 동시 분류.",
    },
    {
      num: "03",
      title: "임상 로직 보정",
      desc: "Layer3 임상 로직이 측정값(PR/QRS/QT)과 모델 결과를 교차검증해 거짓 양성 억제.",
    },
    {
      num: "04",
      title: "FHIR R4 연동",
      desc: "Observation 리소스로 HAPI FHIR 서버에 자동 저장. 병원 EMR과 즉시 호환.",
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
    { label: "AI 모델",         value: "Mamba S6 시퀀스 모델 (PyTorch 학습 → ONNX 추론)" },
    { label: "추론 런타임",      value: "ONNX Runtime · AWS ECS Fargate (독립 마이크로서비스)" },
    { label: "입력 형식",        value: "12-Lead 심전도 (waveform JSON · S3 경로)" },
    { label: "추론 시간",        value: "평균 ~2초 (전처리 + 추론 + 임상 로직)" },
    { label: "출력 클래스",      value: "24종 질환 확률 (심방세동·STEMI·전도장애·서맥/빈맥 등)" },
    { label: "처리 레이어",      value: "Layer1 전처리 · Layer2 추론 · Layer3 임상 로직 보정" },
    { label: "출력 포맷",        value: "JSON 24-class 확률 · FHIR Observation · 의사 한국어 소견" },
    { label: "통합",             value: "Orchestrator · HAPI FHIR · WebSocket fan-out · FCM Push" },
  ];
  return (
    <section className="py-28 bg-vuno-surface/30">
      <div className="max-w-[1400px] mx-auto px-6">
        <Reveal className="mb-14">
          <h2 className="text-4xl md:text-6xl font-bold text-white">Specifications</h2>
        </Reveal>
        <div className="border border-vuno-border">
          {specs.map((s, i) => (
            <Reveal key={s.label} delay={i * 50}>
              <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-6 px-7 py-6 border-b border-vuno-border last:border-0 hover:bg-vuno-surface/40 transition-colors">
                <div className="text-base md:text-lg font-bold text-vuno-cyan uppercase tracking-wider">{s.label}</div>
                <div className="text-lg md:text-xl text-white">{s.value}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            "심방세동/조동", "STEMI", "전도장애 (AV/LBBB)",
            "서맥 (Bradycardia)", "빈맥 (Tachycardia)", "발작성 빈맥",
            "심실 조기수축", "방실 차단",
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
        <h2 className="text-4xl md:text-5xl font-bold text-white">EMON ECG, 직접 사용해보세요</h2>
        <p className="mt-4 text-lg md:text-xl text-vuno-muted">데모 환자의 ECG 분석 결과를 확인할 수 있습니다.</p>
        <div className="mt-9 flex items-center justify-center gap-3 flex-wrap">
          <Link
            to="/demo/patient/042"
            className="inline-flex items-center gap-2 h-14 px-9 bg-vuno-cyan text-vuno-bg hover:bg-vuno-cyanGlow font-bold tracking-wider uppercase text-base md:text-lg"
          >
            데모 환자 보기 <ArrowUpRight className="h-5 w-5" />
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
