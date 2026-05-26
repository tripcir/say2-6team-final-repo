import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight, ChevronDown, Globe } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

interface BrandShellProps {
  children: ReactNode;
  /** 헤더 투명/반투명 (Hero 위에 올릴 때) */
  transparent?: boolean;
}

const NAV_ITEMS = [
  { to: "/product",    label: "Product" },
  { to: "/technology", label: "Technology" },
  { to: "/team",       label: "Team" },
  { to: "/contact",    label: "Contact" },
];

export function BrandShell({ children, transparent }: BrandShellProps) {
  return (
    <div className="v2-root min-h-screen bg-vuno-bg text-vuno-text">
      <BrandHeader transparent={transparent} />
      <main>{children}</main>
      <BrandFooter />
    </div>
  );
}

function BrandHeader({ transparent }: { transparent?: boolean }) {
  const loc = useLocation();
  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-colors",
        transparent
          ? "bg-vuno-bg/70 backdrop-blur-xl border-b border-transparent"
          : "bg-vuno-bg/95 backdrop-blur-xl border-b border-vuno-divider",
      )}
    >
      <div className="max-w-[1400px] mx-auto px-6 h-[72px] flex items-center gap-10">
        {/* 로고 — mix-blend-mode로 곤색 배경 사이트와 자연스럽게 병합 */}
        <Link to="/" className="inline-flex items-center gap-3 font-bold text-2xl tracking-tight">
          <img
            src="/EMON.jpg"
            alt="EMON"
            className="h-11 w-11 object-contain"
            style={{ mixBlendMode: "screen" }}
          />
          <span className="text-white tracking-wider">
            EMON<span className="text-vuno-cyan"> Med</span>
            <sup className="text-vuno-cyan text-xs">®</sup>
          </span>
        </Link>

        {/* 메뉴 */}
        <nav className="hidden md:flex items-center gap-2">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "h-9 px-5 text-xl font-semibold transition-colors flex items-center",
                  isActive
                    ? "text-vuno-cyan"
                    : "text-vuno-muted hover:text-white",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* 우측 */}
        <div className="ml-auto flex items-center gap-4">
          {/* 언어 */}
          <div className="hidden md:flex items-center gap-2 text-xs font-semibold">
            <button className="text-vuno-cyan">KR</button>
            <button className="text-vuno-muted hover:text-white">EN</button>
            <Globe className="h-4 w-4 text-vuno-muted ml-1" />
          </div>

          {/* Live Demo CTA */}
          <Link
            to="/demo"
            className={cn(
              "inline-flex items-center gap-2 h-10 px-5 text-sm font-semibold transition-all",
              "border border-vuno-cyan text-vuno-cyan",
              "hover:bg-vuno-cyan hover:text-vuno-bg",
            )}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-vuno-cyan opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-vuno-cyan" />
            </span>
            Live Demo
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* 브레드크럼 */}
      {loc.pathname !== "/" && (
        <div className="hidden md:block border-t border-vuno-divider/50">
          <div className="max-w-[1400px] mx-auto px-6 h-10 flex items-center text-xs text-vuno-muted">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="mx-2 text-vuno-dim">/</span>
            <span className="text-white font-medium capitalize">
              {loc.pathname.replace("/", "")}
            </span>
          </div>
        </div>
      )}
    </header>
  );
}

function BrandFooter() {
  return (
    <footer className="border-t border-vuno-divider bg-vuno-bg mt-24">
      <div className="max-w-[1400px] mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* 브랜드 */}
          <div>
            <Link to="/" className="inline-flex items-center gap-3 font-bold mb-4">
              <img
                src="/EMON.jpg"
                alt="EMON"
                className="h-10 w-10 object-contain"
                style={{ mixBlendMode: "screen" }}
              />
              <span className="text-white tracking-wider text-xl md:text-2xl">
                EMON<span className="text-vuno-cyan"> Med</span>
                <sup className="text-vuno-cyan text-sm">®</sup>
              </span>
            </Link>
          </div>

          <ProductColumn />
          <CompanyColumn />
          <FooterColumn
            title="Resources"
            links={[
              { label: "AWS 아키텍처", to: "/technology#aws" },
              { label: "MIMIC-IV 데이터", to: "/technology#data" },
              { label: "파일럿 문의", to: "/contact" },
            ]}
          />
        </div>

        <div className="mt-14 pt-7 border-t border-vuno-divider flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-sm md:text-base text-vuno-dim">
          <div>© 2026 EMON. All rights reserved.</div>
          <div className="flex gap-4">
            <span>v1.0</span>
            <span>·</span>
            <span>Built with AWS + Anthropic Claude</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: Array<{ label: string; to: string }> }) {
  return (
    <div>
      <h4 className="text-base md:text-lg font-bold text-vuno-cyan uppercase tracking-[0.15em] mb-5">{title}</h4>
      <ul className="space-y-3.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="text-base md:text-lg text-vuno-muted hover:text-white transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** 외부 URL이면 새 탭으로, 내부 경로면 SPA Link로 자동 분기 */
function SmartLink({ to, className, children }: { to: string; className?: string; children: React.ReactNode }) {
  if (to.startsWith("http")) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return <Link to={to} className={className}>{children}</Link>;
}

/** 트리 구조 푸터 컬럼 — 상위 1개 + 하위 탭들 + 별도 extras */
function FooterTreeColumn({
  title,
  parent,
  children,
  extras,
}: {
  title: string;
  parent: { label: string; to: string };
  children: Array<{ label: string; to: string }>;
  extras?: Array<{ label: string; to: string }>;
}) {
  return (
    <div>
      <h4 className="text-xs font-bold text-vuno-cyan uppercase tracking-[0.15em] mb-4">{title}</h4>
      {/* 상위 */}
      <SmartLink
        to={parent.to}
        className="block text-sm font-bold text-white hover:text-vuno-cyan transition-colors mb-2"
      >
        {parent.label}
      </SmartLink>
      {/* 하위 — 자식 링크들 */}
      <ul className="space-y-1.5 ml-3 mb-3 border-l border-vuno-border pl-3">
        {children.map((c) => (
          <li key={c.label}>
            <SmartLink to={c.to} className="text-sm text-vuno-muted hover:text-white transition-colors">
              {c.label}
            </SmartLink>
          </li>
        ))}
      </ul>
      {/* extras — 별도 항목 */}
      {extras && extras.length > 0 && (
        <ul className="space-y-2.5 mt-3 pt-3 border-t border-vuno-border/50">
          {extras.map((e) => (
            <li key={e.label}>
              <SmartLink to={e.to} className="text-sm text-vuno-muted hover:text-white transition-colors">
                {e.label}
              </SmartLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** 푸터 호버 서브메뉴 — 트리거 라벨 + 호버 시 위쪽으로 서브 리스트 팝업 */
function HoverSubmenu({
  label,
  to,
  items,
}: {
  label: string;
  to: string;
  items: Array<{ label: string; to: string }>;
}) {
  return (
    <li className="group relative">
      <SmartLink
        to={to}
        className="inline-flex items-center gap-1.5 text-base md:text-lg font-bold text-white hover:text-vuno-cyan transition-colors"
      >
        {label}
        <ChevronDown className="h-4 w-4 opacity-60 group-hover:opacity-100 transition-transform group-hover:-rotate-180" />
      </SmartLink>
      <div className="absolute left-0 bottom-full mb-3 invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-150 z-20">
        <div className="min-w-[180px] bg-vuno-surface border border-vuno-border shadow-2xl py-2">
          {items.map((s) => (
            <SmartLink
              key={s.label}
              to={s.to}
              className="block px-5 py-2.5 text-base md:text-lg text-vuno-muted hover:text-vuno-cyan hover:bg-vuno-bg/60 transition-colors"
            >
              {s.label}
            </SmartLink>
          ))}
        </div>
        <div className="absolute left-6 top-full -mt-px h-2.5 w-2.5 border-r border-b border-vuno-border bg-vuno-surface rotate-45" />
      </div>
    </li>
  );
}

/** Product 컬럼 — 응급 의료 AI 시스템 호버 시 웹/앱 서브메뉴 */
function ProductColumn() {
  return (
    <div>
      <h4 className="text-base md:text-lg font-bold text-vuno-cyan uppercase tracking-[0.15em] mb-5">Product</h4>
      <ul className="space-y-3.5">
        <HoverSubmenu
          label="응급 의료 AI 시스템"
          to="/product"
          items={[
            { label: "웹", to: "/demo" },
            { label: "앱", to: "http://localhost:8090/" },
          ]}
        />
        <li>
          <Link to="/demo" className="text-base md:text-lg text-vuno-muted hover:text-white transition-colors">
            Live Demo
          </Link>
        </li>
      </ul>
    </div>
  );
}

/** Company 컬럼 — Technology 호버 시 ECG/CXR/LAB 서브메뉴 */
function CompanyColumn() {
  return (
    <div>
      <h4 className="text-base md:text-lg font-bold text-vuno-cyan uppercase tracking-[0.15em] mb-5">Company</h4>
      <ul className="space-y-3.5">
        <HoverSubmenu
          label="Technology"
          to="/technology"
          items={[
            { label: "ECG 분석", to: "/product/ecg" },
            { label: "CXR 분석", to: "/product/cxr" },
            { label: "LAB 분석", to: "/product/lab" },
          ]}
        />
        <li>
          <Link to="/team" className="text-base md:text-lg text-vuno-muted hover:text-white transition-colors">
            Team
          </Link>
        </li>
        <li>
          <Link to="/contact" className="text-base md:text-lg text-vuno-muted hover:text-white transition-colors">
            Contact
          </Link>
        </li>
      </ul>
    </div>
  );
}
