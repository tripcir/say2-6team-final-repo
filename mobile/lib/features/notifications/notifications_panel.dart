import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/api/reports_api.dart';
import '../../shared/theme/app_theme.dart';
import '../../shared/widgets/ktas_badge.dart';

/// FCM 푸시를 받은 의사가 알림 종을 탭하면 열리는 패널.
///   섹션 1: 미서명 소견서   (preliminary + reviewed)
///   섹션 2: Critical 환자   (ai_risk_level == 'critical')
///   섹션 3: 검사 완료·작성 가능 (preliminary)
///
/// 모달 바텀시트로 띄우면 작은 화면도 자연스럽고, 행 탭 시 /patient/{enc}로 deep link.
class NotificationsPanel extends ConsumerWidget {
  NotificationsPanel({super.key});

  static Future<void> show(BuildContext context) {
    return showModalBottomSheet<void>(
      context: context,
      isScrollControlled: true,
      backgroundColor: AppColors.surface,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
      ),
      builder: (_) => FractionallySizedBox(
        heightFactor: 0.85,
        child: NotificationsPanel(),
      ),
    );
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final async = ref.watch(reportsListProvider);
    return SafeArea(
      child: async.when(
        loading: () => Center(child: CircularProgressIndicator()),
        error: (e, _) => Center(child: Text('알림 로드 실패: $e')),
        data: (rows) {
          // 데모용 2섹션 구성:
          //   · 소견서 생성 완료 · 확정 대기: preliminary (파랑)
          //   · ✓ 소견 완료: signed / amended (초록)
          final ready =
              rows.where((r) => r.status == 'preliminary').toList();
          final completed = rows
              .where((r) => r.status == 'signed' || r.status == 'amended')
              .toList();
          final total = ready.length + completed.length;

          return Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              // 헤더
              Container(
                padding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                decoration: BoxDecoration(
                  color: AppColors.slate50,
                  border: Border(bottom: BorderSide(color: AppColors.slate200)),
                ),
                child: Row(
                  children: [
                    Icon(Icons.notifications_outlined,
                        size: 20, color: AppColors.slate600),
                    SizedBox(width: 8),
                    Text('알림',
                        style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            color: AppColors.slate900)),
                    SizedBox(width: 8),
                    Text('$total건',
                        style: TextStyle(
                            fontSize: 11,
                            color: AppColors.slate400,
                            fontFeatures: [FontFeature.tabularFigures()])),
                    Spacer(),
                    IconButton(
                      icon: Icon(Icons.close, color: AppColors.slate600),
                      onPressed: () => Navigator.of(context).pop(),
                    ),
                  ],
                ),
              ),
              Expanded(
                child: total == 0
                    ? Center(
                        child: Text('알림이 없습니다.',
                            style: TextStyle(color: AppColors.slate400)),
                      )
                    : ListView(
                        children: [
                          _Section(
                            title: '소견서 생성 완료 · 확정 대기',
                            color: AppColors.blue700,
                            bg: AppColors.blue50,
                            icon: Icons.check_circle_outline,
                            rows: ready,
                            showElapsed: true,
                          ),
                          _Section(
                            title: '소견 완료',
                            color: AppColors.emerald700,
                            bg: AppColors.emerald50,
                            icon: Icons.check_circle_outline,
                            rows: completed,
                            showElapsed: true,
                          ),
                        ],
                      ),
              ),
            ],
          );
        },
      ),
    );
  }
}

/// 미서명 5분 경과 시 빨강 강조 임계값. (현재 데모에서는 비활성)
int _overdueMin = 99999;

int? _elapsedMin(DateTime? d) {
  if (d == null) return null;
  final diff = DateTime.now().difference(d).inMinutes;
  return diff < 0 ? 0 : diff;
}

/// 분 단위 경과를 사람이 읽기 좋은 상대 라벨로 변환.
///   0          → '방금'
///   1..59      → 'N분 전'
///   60..(23h)  → 'N시간 전'
///   그 외       → 'N일 전'
String _relativeLabel(int mins) {
  if (mins <= 0) return '방금';
  if (mins < 60) return '$mins분 전';
  final hours = mins ~/ 60;
  if (hours < 24) return '$hours시간 전';
  final days = hours ~/ 24;
  return '$days일 전';
}

/// aiRiskLevel → KTAS 1~5 매핑. worklist_page._deriveKtas와 동일 규칙.
int _ktasFromRisk(String? risk) {
  switch (risk) {
    case 'resuscitation':
      return 1;
    case 'critical':
      return 2;
    case 'urgent':
      return 3;
    case 'routine':
      return 4;
    case 'minor':
      return 5;
    default:
      return 5;
  }
}

class _Section extends StatelessWidget {
  final String title;
  final Color color;
  final Color bg;
  final IconData icon;
  final List<ReportData> rows;
  final bool showElapsed; // 미서명 섹션만 true — 경과 시간 + 5분 초과 빨강 강조

  _Section({
    required this.title,
    required this.color,
    required this.bg,
    required this.icon,
    required this.rows,
    this.showElapsed = false,
  });

  @override
  Widget build(BuildContext context) {
    if (rows.isEmpty) return SizedBox.shrink();
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Container(
          padding: EdgeInsets.symmetric(horizontal: 16, vertical: 10),
          decoration: BoxDecoration(
            color: bg,
            border: Border(bottom: BorderSide(color: AppColors.slate200)),
          ),
          child: Row(
            children: [
              Icon(icon, size: 16, color: color),
              SizedBox(width: 6),
              Text(title,
                  style: TextStyle(
                      fontSize: 14, fontWeight: FontWeight.bold, color: color)),
              Spacer(),
              Container(
                constraints: BoxConstraints(minWidth: 20),
                padding:
                    EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                decoration: BoxDecoration(
                  color: AppColors.surface,
                  border: Border.all(color: color.withValues(alpha: 0.35)),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text('${rows.length}',
                    textAlign: TextAlign.center,
                    style: TextStyle(
                        fontSize: 11,
                        fontWeight: FontWeight.bold,
                        color: color,
                        fontFeatures: [FontFeature.tabularFigures()])),
              ),
            ],
          ),
        ),
        for (final r in rows)
          _Row(report: r, showElapsed: showElapsed, accent: color),
      ],
    );
  }
}

class _Row extends StatelessWidget {
  final ReportData report;
  final bool showElapsed;
  final Color accent; // 섹션 색 — 경과 강조에 빨강 대신 사용
  _Row(
      {required this.report, required this.showElapsed, required this.accent});

  String _fmt(DateTime? d) {
    if (d == null) return '';
    final mins = _elapsedMin(d) ?? 0;
    return _relativeLabel(mins);
  }

  @override
  Widget build(BuildContext context) {
    final elapsed = showElapsed ? _elapsedMin(report.createdAt) : null;
    final overdue = elapsed != null && elapsed >= _overdueMin;
    return InkWell(
      onTap: () {
        Navigator.of(context).pop();
        context.go('/patient/${report.encounterId}');
      },
      child: Container(
        padding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        decoration: BoxDecoration(
          // 경과 강조 — 섹션 색(파랑/보라/빨강) 연한 톤
          color: overdue ? accent.withValues(alpha: 0.08) : null,
          border: Border(
            bottom: BorderSide(
                color: overdue
                    ? accent.withValues(alpha: 0.30)
                    : AppColors.slate100),
          ),
        ),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Expanded(
                        child: Row(
                          children: [
                            Flexible(
                              child: Text(
                                report.patientName ?? report.subjectId ?? '환자',
                                style: TextStyle(
                                    fontSize: 14,
                                    fontWeight: FontWeight.bold,
                                    color: AppColors.slate900),
                                overflow: TextOverflow.ellipsis,
                              ),
                            ),
                            if (report.subjectId != null) ...[
                              SizedBox(width: 6),
                              Text('#${report.subjectId}',
                                  style: TextStyle(
                                      fontSize: 11,
                                      color: AppColors.slate400,
                                      fontFeatures: [
                                        FontFeature.tabularFigures()
                                      ])),
                            ],
                            SizedBox(width: 6),
                            KtasBadge(
                              level: _ktasFromRisk(report.aiRiskLevel),
                              fontSize: 10,
                              padding: const EdgeInsets.symmetric(
                                  horizontal: 6, vertical: 2),
                            ),
                          ],
                        ),
                      ),
                      if (elapsed != null) ...[
                        SizedBox(width: 6),
                        Container(
                          padding: EdgeInsets.symmetric(
                              horizontal: 8, vertical: 3),
                          decoration: BoxDecoration(
                            color: accent.withValues(alpha: 0.10),
                            border: Border.all(
                                color: accent.withValues(alpha: 0.35)),
                            borderRadius: BorderRadius.circular(4),
                          ),
                          child: Text(
                            _relativeLabel(elapsed),
                            style: TextStyle(
                                fontSize: 11,
                                fontWeight: FontWeight.bold,
                                color: accent,
                                fontFeatures: [
                                  FontFeature.tabularFigures()
                                ]),
                          ),
                        ),
                      ],
                    ],
                  ),
                  if (report.chiefComplaint != null &&
                      report.chiefComplaint!.isNotEmpty) ...[
                    SizedBox(height: 2),
                    Text(
                      report.chiefComplaint!,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(
                          fontSize: 12, color: AppColors.slate600),
                    ),
                  ],
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
