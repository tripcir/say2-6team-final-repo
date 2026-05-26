import { useEffect, useState } from "react";
import { useInView } from "./useInView";

interface CountUpProps {
  /** 최종 숫자 (예: 92, 28, 49743) */
  end: number;
  /** 시작 숫자 (기본 0) */
  start?: number;
  /** 애니메이션 지속 시간 (ms, 기본 1800) */
  duration?: number;
  /** 천 단위 콤마 포맷 (예: 49,743) */
  comma?: boolean;
  /** 숫자 뒤에 붙는 접미사 (예: "%", "s") */
  suffix?: string;
  /** 숫자 앞에 붙는 접두사 */
  prefix?: string;
  /** 시작 지연 (ms) */
  delay?: number;
  /** 추가 className */
  className?: string;
}

/**
 * 뷰포트 진입 시 0 → end 까지 부드럽게 증가하는 카운트업 표시.
 * easeOutQuart 곡선으로 끝부분이 자연스럽게 감속.
 */
export function CountUp({
  end,
  start = 0,
  duration = 1800,
  comma = false,
  suffix = "",
  prefix = "",
  delay = 0,
  className,
}: CountUpProps) {
  const { ref, visible } = useInView<HTMLSpanElement>({ threshold: 0.3 });
  const [value, setValue] = useState(start);

  useEffect(() => {
    if (!visible) return;

    let rafId = 0;
    let cancelled = false;
    const timer = window.setTimeout(() => {
      const startTs = performance.now();
      const animate = (now: number) => {
        if (cancelled) return;
        const elapsed = now - startTs;
        const t = Math.min(elapsed / duration, 1);
        // easeOutQuart — 끝부분이 천천히 감속
        const eased = 1 - Math.pow(1 - t, 4);
        const current = start + (end - start) * eased;
        setValue(current);
        if (t < 1) rafId = requestAnimationFrame(animate);
        else setValue(end);
      };
      rafId = requestAnimationFrame(animate);
    }, delay);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [visible, start, end, duration, delay]);

  const display = Math.floor(value);
  const formatted = comma ? display.toLocaleString("en-US") : String(display);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
