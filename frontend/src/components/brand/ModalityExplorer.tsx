import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Activity, FlaskConical, Image as ImageIcon, Sparkles,
  ArrowUpRight, ChevronRight,
} from "lucide-react";
import { Reveal } from "./anim/Reveal";
import { cn } from "../../lib/cn";

/* ───────────────────────────────────────────────────────
   EMON Modality — 3종 AI 판독 엔진 탐색기 (ECG · CXR · LAB)
   좌측 리스트 + 우측 미리보기. Technology 페이지에서 사용.
   ─────────────────────────────────────────────────────── */

type ModalKey = "ecg" | "cxr" | "lab";

interface ModalSpec {
  key: ModalKey;
  num: string;
  title: string;          // 영문 제품명
  ko: string;             // 한글 부제
  shortDesc: string;      // 좌측 리스트용 짧은 설명
  longDesc: string;       // 우측 미리보기용 긴 설명
  highlights: string[];   // 핵심 강조 포인트 (불릿 리스트)
  link: string;
  preview: () => JSX.Element;
  icon: typeof Activity;
}

const MODALS: ModalSpec[] = [
  {
    key: "ecg",
    num: "01",
    title: "EMON ECG",
    ko: "심전도 12-Lead AI 판독",
    shortDesc: "STEMI · 부정맥 · 전도 장애 분류",
    longDesc:
      "12-Lead 심전도를 Mamba S6 시퀀스 모델로 자동 판독합니다. ONNX Runtime 기반 추론으로 24개 질환의 확률을 산출하고, 임상 로직 레이어가 측정값을 교차검증해 결과를 보정합니다.",
    highlights: [
      "Mamba S6 + ONNX Runtime — 평균 2초 내 추론",
      "24개 질환 다중분류 (심방세동·STEMI·전도장애·서맥/빈맥 등)",
      "임상 로직 레이어가 모델 결과 + 측정값 교차검증",
    ],
    link: "/product/ecg",
    preview: EcgPreview,
    icon: Activity,
  },
  {
    key: "cxr",
    num: "02",
    title: "EMON CXR",
    ko: "흉부 X-ray AI 판독",
    shortDesc: "심비대 · 기흉 · 폐부종 등 7+ 분류",
    longDesc:
      "흉부 X-ray를 DenseNet(분류) + U-Net(세그멘테이션) 듀얼 모델로 판독합니다. 폐·심장·종격동을 픽셀 단위로 분리하고, CTR(심흉비) 자동 측정 및 7+ 질환 확률을 함께 제공합니다.",
    highlights: [
      "DenseNet + U-Net 듀얼 추론 (ONNX Runtime)",
      "흉곽·심장·종격동·기관·횡격막 자동 세그멘테이션 + CTR 자동 측정",
      "Cardiomegaly·Pleural Effusion·Pneumothorax·Atelectasis·Edema 등 다중 분류",
      "한국어 소견(Findings) + 결론(Impression) 자동 생성",
    ],
    link: "/product/cxr",
    preview: CxrPreview,
    icon: ImageIcon,
  },
  {
    key: "lab",
    num: "03",
    title: "EMON LAB",
    ko: "혈액 검사 AI 위험도 평가",
    shortDesc: "룰엔진 + 6시간 후 악화 예측",
    longDesc:
      "15+ 응급 검사 항목(WBC·Hb·Creatinine·BUN·Troponin T·NT-proBNP·CK-MB 등)을 룰엔진으로 정상범위 자동 판정하고, XGBoost 5-앙상블 모델이 6시간 후 악화 확률까지 예측합니다.",
    highlights: [
      "룰엔진: 15+ 항목 정상범위 자동 판정 (Norm/High/Low)",
      "XGBoost 5-앙상블: 6시간 후 악화 확률 예측 (Hemoglobin·Creatinine·Lactate 등)",
      "위험 패턴 자동 탐지 — 빈혈 + 심근손상, Cr↑ + Troponin↑ 등 조합 경고",
    ],
    link: "/product/lab",
    preview: LabPreview,
    icon: FlaskConical,
  },
];

export function ModalityExplorer() {
  const [active, setActive] = useState<ModalKey>("ecg");
  const current = MODALS.find((m) => m.key === active)!;

  return (
    <section className="py-28 border-t border-vuno-divider bg-vuno-bg">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* 카테고리 헤더 */}
        <Reveal className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-vuno-cyan/40 text-vuno-cyan text-sm md:text-base font-bold uppercase tracking-[0.2em] mb-5">
            <Sparkles className="h-4 w-4" />
            AI Modality
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            EMON Modality<br />
            <span className="text-vuno-cyan">3종 AI 판독 엔진</span>
          </h2>
          <p className="mt-6 text-xl md:text-2xl text-vuno-muted max-w-3xl mx-auto leading-relaxed">
            ECG · CXR · LAB을 각각 독립 모델로 추론합니다. 모달을 선택하면
            실제 판독 화면을 미리 볼 수 있고, 클릭하면 상세 페이지로 이동합니다.
          </p>
        </Reveal>

        {/* 좌측 리스트 + 우측 미리보기 */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-12">
          {/* 좌측 모달 리스트 */}
          <Reveal>
            <nav className="space-y-1 lg:sticky lg:top-32">
              {MODALS.map((m) => {
                const isActive = m.key === active;
                return (
                  <button
                    key={m.key}
                    onMouseEnter={() => setActive(m.key)}
                    onClick={() => setActive(m.key)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-4 text-left border-l-2 transition-all",
                      isActive
                        ? "border-vuno-cyan bg-vuno-surface text-vuno-cyan"
                        : "border-transparent text-white hover:text-vuno-cyan hover:bg-vuno-surface/30",
                    )}
                  >
                    <m.icon className={cn("h-7 w-7 flex-shrink-0", isActive ? "text-vuno-cyan" : "text-vuno-muted")} />
                    <div className="flex-1">
                      <div className="text-xl md:text-2xl font-bold">{m.title}</div>
                      <div className={cn("text-sm md:text-base mt-1", isActive ? "text-vuno-cyan/70" : "text-vuno-muted")}>
                        {m.ko}
                      </div>
                    </div>
                    {isActive && <ChevronRight className="h-5 w-5" />}
                  </button>
                );
              })}
            </nav>
          </Reveal>

          {/* 우측 미리보기 */}
          <div className="min-h-[500px]">
            <Reveal key={active}>
              <div className="border border-vuno-border bg-vuno-surface overflow-hidden">
                <div className="bg-vuno-bg p-8 border-b border-vuno-border">
                  {current.preview()}
                </div>

                <div className="p-8">
                  <div className="text-base md:text-lg font-bold text-vuno-cyan font-numeric tracking-[0.25em] mb-4">
                    {current.num}
                  </div>
                  <h3 className="text-3xl md:text-5xl font-bold text-white mb-3">
                    {current.title}<span className="text-vuno-cyan">®</span>
                  </h3>
                  <div className="text-lg md:text-2xl text-vuno-cyan/80 mb-6">{current.ko}</div>
                  <p className="text-lg md:text-2xl text-vuno-muted leading-relaxed mb-7">
                    {current.longDesc}
                  </p>

                  {/* 강조 포인트 */}
                  <ul className="mb-9 space-y-3">
                    {current.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-3 text-base md:text-lg text-white/90 leading-relaxed">
                        <span className="mt-1.5 h-2 w-2 rounded-full bg-vuno-cyan flex-shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={current.link}
                    className="inline-flex items-center gap-2 h-14 px-8 font-bold bg-vuno-cyan text-vuno-bg hover:bg-vuno-cyanGlow transition-colors tracking-wider uppercase text-base md:text-lg"
                  >
                    {current.title} 자세히 보기
                    <ArrowUpRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────────
   각 모달 우측 미리보기 — 실제 판독 화면 (모두 풀폭 동일 규격)
   ECG·CXR 은 라이브 스캔 스윕 오버레이로 동적 연출.
   ─────────────────────────────────────────────────────── */
// 실제 스크린샷 위로 청록 스윕 라인이 지나가는 "라이브 판독" 오버레이.
function ScanImage({ src, alt, axis }: { src: string; alt: string; axis: "x" | "y" }) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-vuno-border/40">
      <img src={src} alt={alt} loading="lazy" className="w-full h-auto block" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {axis === "x" ? (
          <div
            className="absolute inset-y-0 w-[32%] bg-gradient-to-r from-transparent via-vuno-cyan/25 to-transparent"
            style={{ animation: "scanSweepX 3s linear infinite" }}
          />
        ) : (
          <div
            className="absolute inset-x-0 h-[32%] bg-gradient-to-b from-transparent via-vuno-cyan/25 to-transparent"
            style={{ animation: "scanSweepY 3.6s linear infinite" }}
          />
        )}
      </div>
    </div>
  );
}

function EcgPreview() {
  // 실제 라이브 ECG 영상 — 0~5초 구간만 반복 재생 (전체 21초 → 5초 루프)
  return (
    <div className="relative overflow-hidden rounded-lg border border-vuno-border/40 bg-black">
      <video
        src="/ecg-video.mov"
        autoPlay
        muted
        playsInline
        preload="auto"
        onLoadedMetadata={(e) => { e.currentTarget.currentTime = 0; }}
        onTimeUpdate={(e) => {
          const v = e.currentTarget;
          if (v.currentTime >= 5) v.currentTime = 0;
        }}
        className="w-full h-auto block"
        aria-label="EMON ECG — 12-Lead 심전도 라이브 판독 영상 (5초 루프)"
      />
    </div>
  );
}

function CxrPreview() {
  return <ScanImage src="/modal-cxr.png" alt="EMON CXR — 흉부 X-ray PACS 판독 화면" axis="y" />;
}

function LabPreview() {
  const panels: [string, string][] = [
    ["/modal-lab-rule.png", "룰엔진 결과"],
    ["/modal-lab-prognosis.png", "6시간 후 악화 예측"],
  ];
  // CXR과 동일 규격: 각 패널 = 미리보기 박스 풀폭. 옆으로 스냅 스크롤.
  // 명시적 폭(부모 200%, 자식 50%)으로 어떤 환경에서도 패널이 잘리지 않게.
  return (
    <div>
      <div className="overflow-x-auto snap-x snap-mandatory [scrollbar-color:theme(colors.vuno-border)_transparent]">
        <div className="flex w-[200%]">
          {panels.map(([src, cap], i) => (
            <figure key={src} className="flex-none w-1/2 snap-center px-1 first:pl-0 last:pr-0">
              <img
                src={src}
                alt={`EMON LAB — ${cap}`}
                loading="lazy"
                className="w-full h-auto block rounded-lg border border-vuno-border/40"
              />
              <figcaption className="mt-3 text-center text-base md:text-lg text-vuno-muted">
                <span className="font-numeric text-vuno-cyan font-bold">{i + 1}</span> · {cap}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      <div className="mt-2 text-base md:text-lg text-vuno-dim flex items-center gap-2">
        <ChevronRight className="h-5 w-5" />
        옆으로 스크롤하면 6시간 후 악화 예측까지 볼 수 있습니다.
      </div>
    </div>
  );
}
