import { Link } from "react-router-dom";
import { Mail, Github, Linkedin, ArrowUpRight, Crown, UserRound } from "lucide-react";
import { BrandShell } from "../../components/brand/BrandShell";

interface Member {
  name: string;
  role: string;
  focus: string;
  bio: string;
  initial: string;
  isLead?: boolean;
}

const MEMBERS: Member[] = [
  {
    name: "원정아",
    role: "Project Lead · Founder",
    focus: "기획 · 총괄 · 아키텍처 · ECG 모달",
    bio: "EMON Med Solution 기획·총괄. 프론트엔드/백엔드 설계, 시스템 아키텍처 기초 설계를 주도하고 ECG(12-Lead 심전도) AI 판독 모달을 직접 구축.",
    initial: "원",
    isLead: true,
  },
  {
    name: "양정인",
    role: "RAG · Security & Network Lead",
    focus: "RAG · 보안 · 네트워킹",
    bio: "RAG(ChromaDB 49,743건 MIMIC-IV 임베딩) 구축, AWS VPC 4-tier 설계, IAM Least Privilege, WAF/KMS/Cognito Defense-in-Depth 다층 방어.",
    initial: "양",
  },
  {
    name: "이정인",
    role: "Compute Lead",
    focus: "컴퓨팅 · 중앙 오케스트레이션",
    bio: "ECS Fargate 6서비스(12 tasks) 멀티모달 추론 배포, ALB Auto Scaling/Rolling Update. 데이터 기반 중앙 오케스트레이터 설계.",
    initial: "이",
  },
  {
    name: "홍경태",
    role: "Data & Observability Lead",
    focus: "혈액 모달 · DB · 모니터링",
    bio: "혈액 검사 LAB AI 모달(룰엔진 15+항목 + XGBoost 5-앙상블 6시간 악화 예측) 구축. Aurora Serverless v2 설계 + CloudWatch 23 Alarm + SNS 2 Topics 운영.",
    initial: "홍",
  },
];

export default function TeamPage() {
  return (
    <BrandShell>
      <Hero />
      <MembersSection />
      <MissionSection />
      <BottomCTA />
    </BrandShell>
  );
}

function Hero() {
  return (
    <section className="border-b border-vuno-divider bg-vuno-surface/30">
      <div className="max-w-[1400px] mx-auto px-6 py-24 md:py-32">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-vuno-cyan/40 text-vuno-cyan text-sm md:text-base font-bold uppercase tracking-[0.2em] mb-7">
            Team
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight text-white">
            응급실에 AI를 <br />
            <span className="text-vuno-cyan">제대로 가져다 놓는 팀</span>
          </h1>
        </div>
        <p className="mt-8 text-xl md:text-2xl text-vuno-muted leading-relaxed whitespace-nowrap">
          의료 도메인 + 클라우드 인프라 + AI 엔지니어링. 응급 의료의 1초가 얼마나 무거운지 알고 시스템을 설계합니다.
        </p>
      </div>
    </section>
  );
}

function MembersSection() {
  return (
    <section className="py-28">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white">Core Team</h2>
          <p className="mt-7 text-2xl md:text-3xl text-vuno-muted break-keep">
            4명이 EMON Med Solution의 기획부터 5개 인프라 영역까지 함께 만듭니다
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MEMBERS.map((m) => (
            <MemberCard key={m.name} member={m} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MemberCard({ member }: { member: Member }) {
  return (
    <div className="border border-vuno-border bg-vuno-surface p-8 transition-all hover:bg-vuno-elevated hover:border-vuno-cyan">
      {/* 아바타 + 역할 배지 (모든 멤버 동일 스타일) */}
      <div className="flex items-start justify-between mb-6">
        <div className="h-24 w-24 bg-vuno-bg border-2 border-vuno-cyan grid place-items-center text-vuno-cyan text-4xl font-bold">
          {member.initial}
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-vuno-cyan/40 text-vuno-cyan text-xs md:text-sm font-bold uppercase tracking-wider">
          {member.isLead ? <Crown className="h-4 w-4" /> : <UserRound className="h-4 w-4" />}
          {member.isLead ? "팀장" : "팀원"}
        </div>
      </div>

      <h3 className="text-2xl md:text-3xl font-bold text-white">{member.name}</h3>
      <div className="text-base md:text-lg text-vuno-cyan font-semibold mt-2">{member.role}</div>
      <div className="text-sm md:text-base text-vuno-dim mt-2 uppercase tracking-wider break-keep">{member.focus}</div>

      <p className="text-base md:text-lg text-vuno-muted mt-6 leading-relaxed break-keep">{member.bio}</p>

      <div className="mt-7 pt-6 border-t border-vuno-border flex items-center gap-2">
        <a className="h-10 w-10 bg-vuno-bg border border-vuno-border hover:border-vuno-cyan hover:text-vuno-cyan grid place-items-center text-vuno-muted transition-colors" title="이메일">
          <Mail className="h-5 w-5" />
        </a>
        <a className="h-10 w-10 bg-vuno-bg border border-vuno-border hover:border-vuno-cyan hover:text-vuno-cyan grid place-items-center text-vuno-muted transition-colors" title="GitHub">
          <Github className="h-5 w-5" />
        </a>
        <a className="h-10 w-10 bg-vuno-bg border border-vuno-border hover:border-vuno-cyan hover:text-vuno-cyan grid place-items-center text-vuno-muted transition-colors" title="LinkedIn">
          <Linkedin className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}

function MissionSection() {
  return (
    <section className="py-28 border-t border-vuno-divider bg-vuno-surface/30">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
          <div>
            <div className="text-sm md:text-base font-bold text-vuno-cyan uppercase tracking-[0.2em] mb-5">Mission</div>
            <h3 className="text-3xl md:text-5xl font-bold text-white leading-tight break-keep">
              응급실 의사의 <br />
              "혼자 보는 시간"을 줄입니다.
            </h3>
            <p className="mt-7 text-lg md:text-xl text-vuno-muted leading-relaxed break-keep">
              한 명의 의사가 동시에 12명을 봐야 하는 응급실에서,
              AI가 1차 소견을 정리해주면 의사는 가장 위급한 환자부터 깊이 봅니다.
              우리가 만드는 건 의사를 대체하는 AI가 아니라, 의사가 더 잘하도록 돕는 시스템입니다.
            </p>
          </div>
          <div>
            <div className="text-sm md:text-base font-bold text-vuno-cyan uppercase tracking-[0.2em] mb-5">Values</div>
            <ul className="space-y-6 text-vuno-muted">
              <li className="flex gap-5">
                <span className="text-vuno-cyan font-bold font-numeric text-xl md:text-2xl">01</span>
                <div>
                  <div className="font-bold text-white text-xl md:text-2xl">의료 표준 우선</div>
                  <div className="text-base md:text-lg mt-1 break-keep">FHIR R4 · KTAS · 의료법 5년 보관</div>
                </div>
              </li>
              <li className="flex gap-5">
                <span className="text-vuno-cyan font-bold font-numeric text-xl md:text-2xl">02</span>
                <div>
                  <div className="font-bold text-white text-xl md:text-2xl">최종 결정은 의사</div>
                  <div className="text-base md:text-lg mt-1 break-keep">AI는 항상 근거를 함께 제시, 승인·거부 권한은 의사</div>
                </div>
              </li>
              <li className="flex gap-5">
                <span className="text-vuno-cyan font-bold font-numeric text-xl md:text-2xl">03</span>
                <div>
                  <div className="font-bold text-white text-xl md:text-2xl">임상 무중단</div>
                  <div className="text-base md:text-lg mt-1 break-keep">시스템이 다운돼도 환자 등록은 항상 성공</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function BottomCTA() {
  return (
    <section className="py-24 border-t border-vuno-divider">
      <div className="max-w-[900px] mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white">함께 만드시겠어요?</h2>
        <p className="mt-4 text-lg md:text-xl text-vuno-muted break-keep">파일럿 병원, 임상 자문, 협력 개발자를 찾고 있습니다.</p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 mt-9 h-14 px-9 font-bold border border-vuno-cyan text-vuno-cyan hover:bg-vuno-cyan hover:text-vuno-bg transition-colors tracking-wider uppercase text-base md:text-lg"
        >
          협력 문의 <ArrowUpRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  );
}
