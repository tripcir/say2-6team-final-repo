import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { BrandShell } from "../../components/brand/BrandShell";
import { Reveal } from "../../components/brand/anim/Reveal";

export default function ProductCxrPage() {
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
            <span className="text-vuno-cyan">EMON CXR</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight text-white">
            EMON CXR<sup className="text-vuno-cyan text-3xl md:text-4xl">®</sup>
            <span className="text-vuno-cyan">™</span>
          </h1>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="inline-flex items-center gap-3 text-vuno-cyan font-semibold mb-4 text-lg md:text-xl">
                <span className="h-9 w-9 rounded-full border border-vuno-cyan/40 grid place-items-center text-base">🫁</span>
                EMON CXR · DenseNet + U-Net
              </div>
              <p className="text-xl md:text-2xl text-white leading-relaxed">
                흉부 X-ray를 DenseNet(분류) + U-Net(세그멘테이션) 듀얼 모델로 판독합니다.
                흉곽·심장·종격동을 픽셀 단위로 분리하고, CTR(심흉비) 자동 측정 및 7+ 질환
                확률을 함께 제공합니다.
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
            <CertBadge icon="🫁" title="인공지능 흉부 X-ray 판독 보조 솔루션" />
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
        <Reveal className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-vuno-cyan/40 text-vuno-cyan text-sm md:text-base font-bold uppercase tracking-[0.2em] mb-5">
            Ready to Support
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            주요 흉부 X-ray 소견의 정상·비정상 여부와<br />
            <span className="text-vuno-cyan">소견명을 확신도(%)와 함께</span> 제공합니다.
          </h2>
          <div className="mt-7 overflow-x-auto pb-2 -mx-6 px-6 [scrollbar-color:theme(colors.vuno-border)_transparent]">
            <p className="text-lg md:text-xl text-vuno-muted leading-relaxed whitespace-nowrap">
              DenseNet 분류와 U-Net 세그멘테이션이 결합된 듀얼 모델로 폐·심장·종격동을 픽셀 단위로 분리하고, CTR(심흉비) 자동 측정 + 한국어 소견·결론을 자동 생성합니다.
            </p>
          </div>
        </Reveal>

        {/* 실제 CXR PACS 판독 화면 (스캔 스윕 오버레이) */}
        <Reveal delay={200}>
          <div className="relative overflow-hidden rounded-lg border border-vuno-border bg-black shadow-2xl">
            <img
              src="/modal-cxr.png"
              alt="EMON CXR — 흉부 X-ray PACS 판독 화면 (양정인 케이스)"
              loading="lazy"
              className="w-full h-auto block"
            />
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div
                className="absolute inset-x-0 h-[32%] bg-gradient-to-b from-transparent via-vuno-cyan/25 to-transparent"
                style={{ animation: "scanSweepY 3.6s linear infinite" }}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FeatureSection() {
  const features = [
    {
      num: "01",
      title: "DenseNet + U-Net 듀얼",
      desc: "분류(DenseNet) + 세그멘테이션(U-Net) 듀얼 추론으로 질환 확률과 해부학적 위치를 동시에 제공.",
    },
    {
      num: "02",
      title: "CTR 자동 측정",
      desc: "U-Net이 분리한 심장/흉곽 마스크에서 CTR(심흉비) 자동 측정 — Cardiomegaly 교차검증 효과적.",
    },
    {
      num: "03",
      title: "7+ 클래스 다중 분류",
      desc: "Cardiomegaly · Pleural Effusion · Pneumothorax · Atelectasis · Edema · Consolidation 등 동시 분류.",
    },
    {
      num: "04",
      title: "한국어 소견·결론",
      desc: "Layer3 임상 로직이 클래스/CTR/마스크를 결합해 한국어 Findings · Impression 자동 생성.",
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
    { label: "AI 모델",         value: "DenseNet (분류) + U-Net (세그멘테이션) — ONNX Runtime 추론" },
    { label: "처리 레이어",      value: "Layer1 세그멘테이션 · Layer2 분류 · Layer3 임상 로직" },
    { label: "입력 형식",        value: "PNG / JPG / DICOM (PA·AP 흉부 단순촬영)" },
    { label: "세그멘테이션 대상", value: "흉곽 · 심장 · 종격동 · 기관 · 횡격막 · CP각" },
    { label: "측정값",           value: "CTR (심흉비) · 종격동 폭 · 늑횡각 · 폐면적비" },
    { label: "분류 클래스",      value: "Cardiomegaly · Pleural Effusion · Pneumothorax · Atelectasis · Edema · Consolidation · Enlarged Cardiomediastinum 등" },
    { label: "출력",             value: "JSON (확률·마스크·측정값) · 한국어 Findings/Impression · FHIR Observation" },
    { label: "통합",             value: "Orchestrator · HAPI FHIR · S3 PACS · WebSocket" },
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
            "Cardiomegaly", "Pleural Effusion", "Pneumothorax",
            "Atelectasis", "Edema", "Consolidation",
            "Enlarged Cardiomediastinum", "Lung Opacity", "No Finding",
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
        <h2 className="text-4xl md:text-5xl font-bold text-white">EMON CXR, 직접 사용해보세요</h2>
        <p className="mt-4 text-lg md:text-xl text-vuno-muted">데모 환자의 CXR 판독 결과를 즉시 확인할 수 있습니다.</p>
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
