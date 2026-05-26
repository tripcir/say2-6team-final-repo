import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'client.dart';

class ReportData {
  final int id;
  final String encounterId;
  final String? subjectId;
  final String? patientName;
  final String? chiefComplaint;
  final String status; // preliminary / reviewed / signed / amended
  final String? aiDiagnosis;
  final String? physicianEdits;
  final String? signedBy;
  final String? aiRiskLevel;
  final DateTime? createdAt;
  final DateTime? signedAt;
  /// RAG 유사 사례 — generate 응답의 similar_cases (소견 근거 자료에 표시).
  /// 기존 소견서 조회(by-encounter)에는 없을 수 있어 기본 빈 리스트.
  final List<Map<String, dynamic>> similarCases;

  const ReportData({
    required this.id,
    required this.encounterId,
    required this.status,
    this.subjectId,
    this.patientName,
    this.chiefComplaint,
    this.aiDiagnosis,
    this.physicianEdits,
    this.signedBy,
    this.aiRiskLevel,
    this.createdAt,
    this.signedAt,
    this.similarCases = const [],
  });

  factory ReportData.fromJson(Map<String, dynamic> j) => ReportData(
        id: (j['id'] as num).toInt(),
        encounterId: j['encounter_id'] as String,
        subjectId: j['subject_id'] as String?,
        patientName: j['patient_name'] as String?,
        chiefComplaint: j['chief_complaint'] as String?,
        status: j['status'] as String,
        aiDiagnosis: j['ai_diagnosis'] as String?,
        physicianEdits: j['physician_edits'] as String?,
        signedBy: j['signed_by'] as String?,
        aiRiskLevel: j['ai_risk_level'] as String?,
        createdAt: DateTime.tryParse(j['created_at'] as String? ?? ''),
        signedAt: DateTime.tryParse(j['signed_at'] as String? ?? ''),
        similarCases: ((j['similar_cases'] as List?) ?? const [])
            .map((e) => Map<String, dynamic>.from(e as Map))
            .toList(),
      );
}

/// /reports/list — 알림 패널이 사용. 데모용 mock 데이터로 5건만 노출.
/// 상대 시간 라벨이 살아나도록 30초마다 같은 셋을 다시 emit 한다.
final reportsListProvider =
    StreamProvider.autoDispose<List<ReportData>>((ref) async* {
  yield _demoMockReports();
  while (true) {
    await Future<void>.delayed(const Duration(seconds: 30));
    yield _demoMockReports();
  }
});

/// 알림 패널용 mock 소견서 5건.
///   소견서 생성 완료 · 확정 대기 (preliminary): 양정인 · 홍경태
///   ✓ 소견 완료 (signed): 원정아 · 이정인 · 박서연
List<ReportData> _demoMockReports() {
  final now = DateTime.now();
  ReportData make({
    required int id,
    required String encId,
    required String subjectId,
    required String name,
    required String complaint,
    required String status,
    required int minsAgo,
    String? risk,
  }) =>
      ReportData(
        id: id,
        encounterId: 'demo-$encId',
        subjectId: subjectId,
        patientName: name,
        chiefComplaint: complaint,
        status: status,
        aiRiskLevel: risk,
        createdAt: now.subtract(Duration(minutes: minsAgo)),
        signedAt: status == 'signed' ? now.subtract(Duration(minutes: minsAgo)) : null,
      );

  return [
    // ───── 소견서 생성 완료 · 확정 대기 (preliminary) — 파랑 ─────
    make(
      id: 1001,
      encId: '002',
      subjectId: '18230098',
      name: '홍경태',
      complaint: '의식 저하 + 심정지 의심 · CPR 시행 중',
      status: 'preliminary',
      minsAgo: 0, // 방금
      risk: 'resuscitation',  // KTAS 1 (소생)
    ),
    make(
      id: 1002,
      encId: '004',
      subjectId: '16921478',
      name: '양정인',
      complaint: '발열 38.6°C · 인후통 · 기침',
      status: 'preliminary',
      minsAgo: 10, // 10분 전
      risk: 'routine',         // KTAS 4 (준응급)
    ),
    // ───── ✓ 소견 완료 (signed) — 초록 ─────
    make(
      id: 2001,
      encId: '001',
      subjectId: '15638143',
      name: '원정아',
      complaint: '좌측 가슴 압박감 30분 지속 · 호흡곤란 호소',
      status: 'signed',
      minsAgo: 30, // 30분 전
      risk: 'critical',        // KTAS 2 (긴급)
    ),
    make(
      id: 2002,
      encId: '003',
      subjectId: '17455201',
      name: '이정인',
      complaint: '우측 복부 통증 + 발열 · 구토 3회',
      status: 'signed',
      minsAgo: 60, // 1시간 전
      risk: 'urgent',          // KTAS 3 (응급)
    ),
    make(
      id: 2003,
      encId: '005',
      subjectId: '19012356',
      name: '박서연',
      complaint: '좌측 편마비 + 어눌한 발음 (Stroke 의심)',
      status: 'signed',
      minsAgo: 120, // 2시간 전
      risk: 'critical',        // KTAS 2 (긴급)
    ),
  ];
}

/// 소견서 로딩 — 없으면 generate.
final reportProvider = FutureProvider.autoDispose
    .family<ReportData, String>((ref, encounterId) async {
  final dio = ref.watch(dioProvider);

  // 1) 기존 소견서 조회
  final getRes = await dio.get('/reports/by-encounter/$encounterId');
  if (getRes.data != null) {
    return ReportData.fromJson(getRes.data as Map<String, dynamic>);
  }

  // 2) 없으면 generate
  final genRes = await dio.post('/reports/$encounterId/generate');
  final data = genRes.data as Map<String, dynamic>;
  // generate는 ReportData와 약간 다른 shape: {report_id, status, narrative, ...}
  // 알림 패널이 새 preliminary를 즉시 잡도록 invalidate 후 재폴링 트리거.
  ref.invalidate(reportsListProvider);
  return ReportData(
    id: (data['report_id'] as num).toInt(),
    encounterId: encounterId,
    status: (data['status'] as String?) ?? 'preliminary',
    aiDiagnosis: data['narrative'] as String?,
    similarCases: ((data['similar_cases'] as List?) ?? const [])
        .map((e) => Map<String, dynamic>.from(e as Map))
        .toList(),
  );
});

Future<void> reviewReport(WidgetRef ref, int reportId,
    {String? physicianEdits, required String encounterId}) async {
  final dio = ref.read(dioProvider);
  await dio.patch('/reports/$reportId/review',
      data: {'physician_edits': physicianEdits});
  ref.invalidate(reportProvider(encounterId));
}

Future<void> signReport(WidgetRef ref, int reportId,
    {required String signedBy,
    String? physicianEdits,
    required String encounterId}) async {
  final dio = ref.read(dioProvider);
  await dio.post('/reports/$reportId/sign', data: {
    'signed_by': signedBy,
    'physician_edits': physicianEdits,
  });
  ref.invalidate(reportProvider(encounterId));
}
