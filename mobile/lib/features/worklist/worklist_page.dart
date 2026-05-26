import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/api/encounters_api.dart';
import '../../core/api/reports_api.dart';
import '../../core/models/encounter.dart';
import '../../features/notifications/notifications_panel.dart';
import '../../shared/theme/app_theme.dart';
import '../../shared/widgets/emon_top_bar.dart';
import '../../shared/widgets/ktas_badge.dart';

/// frontend/src/pages/v2/WorklistPage.tsx의 환자 행 디자인을 모바일 카드로 적응.
/// 헤더: 흰 배경 + slate-200 border-bottom. 카드: 흰 배경 + slate-300 border.
/// 행 클릭 → /patient/:id (AI 분석)
class WorklistPage extends ConsumerWidget {
  WorklistPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final async = ref.watch(encountersListProvider('active'));

    return Scaffold(
      backgroundColor: AppColors.slate50,
      appBar: EmonTopBar(current: 'worklist'),
      body: async.when(
        loading: () => Center(child: CircularProgressIndicator()),
        error: (e, _) => _ErrorView(
          message: '$e',
          onRetry: () => ref.invalidate(encountersListProvider),
        ),
        data: (list) {
          if (list.isEmpty) {
            return Center(
              child: Padding(
                padding: EdgeInsets.all(40),
                child: Text('조건에 맞는 환자가 없습니다.',
                    style: TextStyle(color: AppColors.slate400)),
              ),
            );
          }
          return RefreshIndicator(
            onRefresh: () async => ref.invalidate(encountersListProvider),
            child: ListView.separated(
              padding: EdgeInsets.all(12),
              itemCount: list.length,
              separatorBuilder: (_, _) => SizedBox(height: 8),
              itemBuilder: (context, i) {
                final e = list[i];
                return _PatientCard(
                  encounter: e,
                  index: i + 1,
                  onTap: () => context.go('/patient/${e.encounterId}'),
                );
              },
            ),
          );
        },
      ),
    );
  }
}

/// AppBar 우측에 표시되는 알림 종 — reports/list 폴링 결과로 미서명·Critical·검사완료
/// 합산 카운트를 뱃지로 표시. 탭하면 [NotificationsPanel]을 모달 바텀시트로 띄움.
class _NotificationBell extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final async = ref.watch(reportsListProvider);
    // 패널과 동일한 시간 기반 분류:
    //   · 검사 완료·작성 가능: 0~5분 (preliminary)
    //   · 미서명 소견서: 5분 경과 (preliminary or reviewed)
    //   · Critical: 미서명 상태 + ai_risk_level=critical
    // 알림 종 카운트 — 알림 패널과 동일하게 preliminary + signed 전체 건수
    final count = async.maybeWhen(
      data: (rows) => rows
          .where((r) =>
              r.status == 'preliminary' ||
              r.status == 'signed' ||
              r.status == 'amended')
          .length,
      orElse: () => 0,
    );
    return Stack(
      clipBehavior: Clip.none,
      children: [
        IconButton(
          icon: Icon(Icons.notifications_outlined,
              color: AppColors.slate600),
          onPressed: () => NotificationsPanel.show(context),
        ),
        if (count > 0)
          Positioned(
            top: 6,
            right: 6,
            child: Container(
              constraints: BoxConstraints(minWidth: 16, minHeight: 16),
              padding: EdgeInsets.symmetric(horizontal: 4),
              decoration: BoxDecoration(
                color: AppColors.critical,
                borderRadius: BorderRadius.circular(8),
              ),
              child: Text(
                '$count',
                textAlign: TextAlign.center,
                style: TextStyle(
                    color: Colors.white,
                    fontSize: 10,
                    fontWeight: FontWeight.bold),
              ),
            ),
          ),
      ],
    );
  }
}

class _PatientCard extends StatelessWidget {
  final Encounter encounter;
  final int index;
  final VoidCallback onTap;
  _PatientCard(
      {required this.encounter,
      required this.index,
      required this.onTap});

  // backend에 KTAS 없어서 ai_risk_level로 매핑 (임시):
  // resuscitation → 1 (소생), critical → 2 (긴급), urgent → 3 (응급),
  // routine → 4 (준응급), minor/null → 5 (비응급)
  int _deriveKtas() {
    switch (encounter.aiRiskLevel) {
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

  @override
  Widget build(BuildContext context) {
    final ktas = _deriveKtas();
    final regNo = encounter.subjectId ??
        encounter.encounterId.substring(0, 8); // MIMIC subject_id 우선

    return Material(
      color: AppColors.surface,
      shape: RoundedRectangleBorder(
        side: BorderSide(color: AppColors.slate300),
        borderRadius: BorderRadius.circular(4),
      ),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(4),
        child: Padding(
          padding: EdgeInsets.all(12),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Row 1: No. + 등록번호 + KTAS
              Row(
                children: [
                  Text(
                    '$index',
                    style: TextStyle(
                        fontSize: 11,
                        color: AppColors.slate400,
                        fontFeatures: [FontFeature.tabularFigures()]),
                  ),
                  SizedBox(width: 12),
                  Text(
                    regNo,
                    style: TextStyle(
                      fontSize: 12,
                      color: AppColors.brand700,
                      decoration: TextDecoration.underline,
                      fontFeatures: [FontFeature.tabularFigures()],
                    ),
                  ),
                  Spacer(),
                  KtasBadge(level: ktas),
                ],
              ),
              SizedBox(height: 8),
              // Row 2: 환자명 + 나이/성별
              Row(
                crossAxisAlignment: CrossAxisAlignment.baseline,
                textBaseline: TextBaseline.alphabetic,
                children: [
                  Text(
                    encounter.patientName,
                    style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                        color: AppColors.slate900),
                  ),
                  SizedBox(width: 8),
                  if (encounter.patientAge != null)
                    Text(
                      '${encounter.patientAge}세 / ${_genderKo(encounter.patientGender)}',
                      style: TextStyle(
                          fontSize: 12, color: AppColors.slate500),
                    ),
                ],
              ),
              SizedBox(height: 6),
              // Row 3: 주증상
              Text(
                encounter.chiefComplaint ?? '주증상 미입력',
                style: TextStyle(
                    fontSize: 12, color: AppColors.slate600, height: 1.4),
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
              ),
              SizedBox(height: 10),
              // Row 4: 등록시각 + 검사 상태 배지
              Row(
                children: [
                  Icon(Icons.access_time,
                      size: 11, color: AppColors.slate400),
                  SizedBox(width: 4),
                  Text(
                    _fmtTime(encounter.startedAt),
                    style: TextStyle(
                        fontSize: 11,
                        color: AppColors.slate500,
                        fontFeatures: [FontFeature.tabularFigures()]),
                  ),
                  Spacer(),
                  _ExamStatusBadge(reportStatus: encounter.reportStatus),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  String _genderKo(String? g) =>
      g == 'male' ? '남' : g == 'female' ? '여' : '?';

  String _fmtTime(DateTime t) {
    final local = t.toLocal();
    final hh = local.hour.toString().padLeft(2, '0');
    final mm = local.minute.toString().padLeft(2, '0');
    return '${local.month}/${local.day} $hh:$mm';
  }
}

/// 웹 ExamStatusBadge와 동일 동작 — 4단계 (signed/done/inProgress/waiting)
/// 모바일에선 단순화: reportStatus 기반.
class _ExamStatusBadge extends StatelessWidget {
  final String? reportStatus;
  _ExamStatusBadge({required this.reportStatus});

  @override
  Widget build(BuildContext context) {
    final (label, bg, border, fg) = switch (reportStatus) {
      'signed' || 'amended' => (
        '✓ 소견 완료',
        AppColors.emerald100,
        AppColors.emerald400,
        AppColors.emerald700,
      ),
      'preliminary' => (
        '소견 생성 완료 · 확정 대기',
        AppColors.blue50,
        AppColors.blue300,
        AppColors.blue700,
      ),
      // 검토 중(reviewed) · 분석 중(default) 등 그 외 모든 상태는 '검사 완료'로 표시
      _ => (
        '검사 완료',
        AppColors.amber100,
        AppColors.amber400,
        AppColors.amber700,
      ),
    };
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 8, vertical: 3),
      decoration: BoxDecoration(
        color: bg,
        border: Border.all(color: border),
        borderRadius: BorderRadius.circular(2),
      ),
      child: Text(
        label,
        style: TextStyle(
            color: fg, fontSize: 11, fontWeight: FontWeight.bold),
      ),
    );
  }
}

class _ErrorView extends StatelessWidget {
  final String message;
  final VoidCallback onRetry;
  _ErrorView({required this.message, required this.onRetry});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: EdgeInsets.all(24),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.cloud_off,
                size: 48, color: AppColors.slate300),
            SizedBox(height: 12),
            Text('백엔드 연결 실패',
                style: TextStyle(
                    fontWeight: FontWeight.bold,
                    color: AppColors.slate700)),
            SizedBox(height: 4),
            Text(message,
                style: TextStyle(
                    fontSize: 11, color: AppColors.slate500),
                textAlign: TextAlign.center),
            SizedBox(height: 16),
            OutlinedButton(onPressed: onRetry, child: Text('재시도')),
          ],
        ),
      ),
    );
  }
}
