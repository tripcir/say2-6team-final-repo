import 'package:flutter/material.dart';

/// say-6 컬러 토큰 — frontend/tailwind.config.js와 동일 값(라이트).
/// 다크모드: 중립(slate) 스케일 + 카드 surface + 소프트 배지 배경/텍스트를
/// 모드 인식 getter로 전환해 [AppColors.dark] 한 플래그로 전체가 뒤집힌다.
/// (강한 솔리드 액센트 — brand600·critical·KTAS 등 — 은 양 모드 공통 유지)
class AppColors {
  /// 전역 다크 플래그. 루트 위젯 build에서 themeProvider 값으로 세팅.
  static bool dark = false;

  static Color _m(Color light, Color darkC) => dark ? darkC : light;

  // 의료 표준 응급도 (양 모드 공통)
  static const critical = Color(0xFFDC2626); // red-600
  static const urgent = Color(0xFFEA580C);   // orange-600
  static const warning = Color(0xFFCA8A04);  // yellow-600
  static const normal = Color(0xFF16A34A);   // green-600

  // say-6 브랜드 (인디고) — 솔리드는 공통, 소프트 배경만 다크 대응
  static Color get brand50 => _m(const Color(0xFFEEF2FF), const Color(0xFF1A1E3A));
  static Color get brand100 => _m(const Color(0xFFE0E7FF), const Color(0xFF222748));
  static const brand200 = Color(0xFFC7D2FE);
  static const brand500 = Color(0xFF6366F1);
  static const brand600 = Color(0xFF4F46E5);
  static const brand700 = Color(0xFF4338CA);

  // AI 영역 (바이올렛)
  static const aiAccent = Color(0xFF8B5CF6);
  static Color get aiBg => _m(const Color(0xFFF5F3FF), const Color(0xFF1C1733));
  static Color get aiBorder => _m(const Color(0xFFDDD6FE), const Color(0xFF3A2E5C));

  // VUNO (다크 모드 브랜드 사이트) — 공통
  static const vunoBg = Color(0xFF0F172A);     // slate-900
  static const vunoSurface = Color(0xFF162439);
  static const vunoCyan = Color(0xFF2DD4BF);   // teal-400
  static const vunoCyanDim = Color(0xFF14B8A6);

  // 카드/시트 표면 — 라이트: 흰색, 다크: 짙은 카드
  static Color get surface => _m(Colors.white, const Color(0xFF131C2E));
  static Color get surfaceAlt => _m(const Color(0xFFF8FAFC), const Color(0xFF0B1220));

  // Slate (Tailwind) — 중립 스케일. 다크에서 명도 반전.
  static Color get slate50 => _m(const Color(0xFFF8FAFC), const Color(0xFF0B1220));
  static Color get slate100 => _m(const Color(0xFFF1F5F9), const Color(0xFF131C2E));
  static Color get slate200 => _m(const Color(0xFFE2E8F0), const Color(0xFF243049));
  static Color get slate300 => _m(const Color(0xFFCBD5E1), const Color(0xFF31405C));
  static Color get slate400 => _m(const Color(0xFF94A3B8), const Color(0xFF6B7892));
  static Color get slate500 => _m(const Color(0xFF64748B), const Color(0xFF94A3B8));
  static Color get slate600 => _m(const Color(0xFF475569), const Color(0xFFB4BECC));
  static Color get slate700 => _m(const Color(0xFF334155), const Color(0xFFCDD5E0));
  static Color get slate800 => _m(const Color(0xFF1E293B), const Color(0xFFE2E8F0));
  static Color get slate900 => _m(const Color(0xFF0F172A), const Color(0xFFF3F6FA));

  // KTAS 컬러 (한국 응급의료 표준) — 솔리드, 공통
  static const ktasBg1 = Color(0xFF2563EB); // blue-600 (소생)
  static const ktasBg2 = Color(0xFFDC2626); // red-600 (긴급)
  static const ktasBg3 = Color(0xFFF59E0B); // amber-500 (응급)
  static const ktasBg4 = Color(0xFF059669); // emerald-600 (준응급)
  static const ktasBg5 = Color(0xFF64748B); // slate-500 (비응급)

  // Emerald (검사 완료) — 소프트 배경/텍스트 다크 대응, 솔리드(600/800)는 공통
  static Color get emerald50 => _m(const Color(0xFFECFDF5), const Color(0xFF0E2A20));
  static Color get emerald100 => _m(const Color(0xFFD1FAE5), const Color(0xFF123A2A));
  static Color get emerald300 => _m(const Color(0xFF6EE7B7), const Color(0xFF1E5C46));
  static const emerald400 = Color(0xFF34D399);
  static const emerald600 = Color(0xFF059669);
  static Color get emerald700 => _m(const Color(0xFF047857), const Color(0xFF6EE7B7));
  static const emerald800 = Color(0xFF065F46);

  // Amber (분석 중)
  static Color get amber50 => _m(const Color(0xFFFFFBEB), const Color(0xFF2A2210));
  static Color get amber100 => _m(const Color(0xFFFEF3C7), const Color(0xFF3A2E12));
  static const amber200 = Color(0xFFFDE68A);
  static Color get amber300 => _m(const Color(0xFFFCD34D), const Color(0xFF6E5413));
  static const amber400 = Color(0xFFFBBF24);
  static const amber600 = Color(0xFFD97706);
  static Color get amber700 => _m(const Color(0xFFB45309), const Color(0xFFFCD34D));
  static Color get amber900 => _m(const Color(0xFF78350F), const Color(0xFFFDE68A));

  // Purple (AI rec status) — 솔리드(600)는 공통
  static Color get purple50 => _m(const Color(0xFFFAF5FF), const Color(0xFF1E1633));
  static Color get purple100 => _m(const Color(0xFFF3E8FF), const Color(0xFF2A1E45));
  static Color get purple300 => _m(const Color(0xFFD8B4FE), const Color(0xFF4A2E6E));
  static const purple600 = Color(0xFF9333EA);
  static Color get purple700 => _m(const Color(0xFF7E22CE), const Color(0xFFD8B4FE));

  // Blue (소견서 생성 완료 · 확정 대기)
  static Color get blue50 => _m(const Color(0xFFEFF6FF), const Color(0xFF0F2038));
  static Color get blue300 => _m(const Color(0xFF93C5FD), const Color(0xFF1E456E));
  static Color get blue700 => _m(const Color(0xFF1D4ED8), const Color(0xFF93C5FD));
}

/// KTAS 1~5 메타 (label, bg color) — types/triage.ts의 KTAS_META 그대로
class KtasMeta {
  final String label;
  final Color bg;
  const KtasMeta({required this.label, required this.bg});

  static const Map<int, KtasMeta> all = {
    1: KtasMeta(label: '소생', bg: AppColors.ktasBg1),
    2: KtasMeta(label: '긴급', bg: AppColors.ktasBg2),
    3: KtasMeta(label: '응급', bg: AppColors.ktasBg3),
    4: KtasMeta(label: '준응급', bg: AppColors.ktasBg4),
    5: KtasMeta(label: '비응급', bg: AppColors.ktasBg5),
  };

  static KtasMeta of(int k) => all[k] ?? all[5]!;
}

/// AI 1·2·3차 권고 컬러 — 웹 RANK_META 그대로.
/// 소프트 배경이 모드 인식 getter라 const 맵 불가 → of()가 매번 생성.
class RankMeta {
  final String label;
  final Color badgeBg;
  final Color barBg;
  final Color barBorder;
  const RankMeta({
    required this.label,
    required this.badgeBg,
    required this.barBg,
    required this.barBorder,
  });

  static RankMeta of(int r) {
    switch (r) {
      case 2:
        return RankMeta(
          label: '2차 권고',
          badgeBg: const Color(0xFF2563EB), // blue-600 (솔리드)
          barBg: AppColors.blue50,
          barBorder: AppColors.blue300,
        );
      case 3:
        return RankMeta(
          label: '3차 권고',
          badgeBg: AppColors.emerald600,
          barBg: AppColors.emerald50,
          barBorder: AppColors.emerald300,
        );
      default:
        return RankMeta(
          label: '1차 권고',
          badgeBg: AppColors.purple600,
          barBg: AppColors.purple50,
          barBorder: AppColors.purple300,
        );
    }
  }
}

/// 라이트/다크 ThemeData — [dark]에 맞춰 AppColors getter가 이미 반전돼 있다.
/// (루트 build에서 AppColors.dark 세팅 후 호출)
ThemeData buildSay6Theme({bool dark = false}) {
  return ThemeData(
    useMaterial3: true,
    brightness: dark ? Brightness.dark : Brightness.light,
    colorScheme: ColorScheme.fromSeed(
      seedColor: AppColors.brand600,
      brightness: dark ? Brightness.dark : Brightness.light,
      surface: AppColors.surface,
    ),
    scaffoldBackgroundColor: AppColors.slate50,
    fontFamily: 'system-ui',
    appBarTheme: AppBarTheme(
      backgroundColor: AppColors.surface,
      foregroundColor: AppColors.slate900,
      elevation: 0,
      scrolledUnderElevation: 0,
      surfaceTintColor: Colors.transparent,
      shape: Border(bottom: BorderSide(color: AppColors.slate200)),
      centerTitle: false,
    ),
    cardTheme: CardThemeData(
      color: AppColors.surface,
      elevation: 0,
      shape: RoundedRectangleBorder(
        side: BorderSide(color: AppColors.slate300),
      ),
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: AppColors.brand600,
        foregroundColor: Colors.white,
        minimumSize: const Size(double.infinity, 48),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(6)),
      ),
    ),
  );
}
