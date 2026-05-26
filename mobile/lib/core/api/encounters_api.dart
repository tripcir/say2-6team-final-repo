import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../models/encounter.dart';
import 'client.dart';

/// 환자 목록 — backend GET /encounters/list 호출.
/// 데모용 mock 환자(KTAS 1~5 · 다양한 reportStatus)를 항상 앞에 prepend한다.
/// 백엔드 실패 시에도 mock-only로 빈 화면을 피하게 한다.
final encountersListProvider = FutureProvider.autoDispose
    .family<List<Encounter>, String>((ref, status) async {
  final mocks = status == 'active' ? _demoMockEncounters() : <Encounter>[];

  try {
    final dio = ref.watch(dioProvider);
    final Response<dynamic> res = await dio
        .get('/encounters/list', queryParameters: {'status': status, 'limit': 50})
        .timeout(const Duration(seconds: 4));
    final list = (res.data as List).cast<Map<String, dynamic>>();
    final real = list.map(Encounter.fromJson).toList();
    return [...mocks, ...real];
  } catch (_) {
    // 백엔드 도달 불가 — 데모용 mock만 보여줌
    return mocks;
  }
});

/// 데모용 mock 환자 12명 — KTAS 1~5 전수 · reportStatus 4 종류 골고루.
/// 팀원 이름(원정아·홍경태·이정인·양정인)을 앞쪽에 배치해 시연 시 가시성 확보.
List<Encounter> _demoMockEncounters() {
  final now = DateTime.now();
  Encounter make({
    required String id,
    required String subjectId,
    required String name,
    required int age,
    required String sex,
    required String complaint,
    required int minsAgo,
    String? report,
    String? risk,
  }) =>
      Encounter(
        encounterId: 'demo-$id',
        patientId: 'demo-p-$id',
        subjectId: subjectId,
        patientName: name,
        patientAge: age,
        patientGender: sex,
        chiefComplaint: complaint,
        startedAt: now.subtract(Duration(minutes: minsAgo)),
        status: 'active',
        reportStatus: report,
        aiRiskLevel: risk,
      );

  return [
    // ───── 팀원 4명 — 가장 위에 ─────
    make(
      id: '001',
      subjectId: '15638143',
      name: '원정아',
      age: 35,
      sex: 'female',
      complaint: '좌측 가슴 압박감 30분 지속 · 호흡곤란 호소',
      minsAgo: 8,
      report: 'preliminary',   // 소견 생성 완료 · 확정 대기
      risk: 'critical',        // KTAS 2 (긴급)
    ),
    make(
      id: '002',
      subjectId: '18230098',
      name: '홍경태',
      age: 58,
      sex: 'male',
      complaint: '의식 저하 + 심정지 의심 · CPR 시행 중',
      minsAgo: 145,
      report: 'signed',        // 소견 완료
      risk: 'resuscitation',   // KTAS 1 (소생)
    ),
    make(
      id: '003',
      subjectId: '17455201',
      name: '이정인',
      age: 42,
      sex: 'male',
      complaint: '우측 복부 통증 + 발열 · 구토 3회',
      minsAgo: 22,
      report: null,            // 검사 완료
      risk: 'urgent',          // KTAS 3 (응급)
    ),
    make(
      id: '004',
      subjectId: '16921478',
      name: '양정인',
      age: 29,
      sex: 'female',
      complaint: '발열 38.6°C · 인후통 · 기침',
      minsAgo: 35,
      report: 'signed',        // ✓ 소견 완료
      risk: 'routine',         // KTAS 4 (준응급)
    ),
    // ───── 일반 환자 8명 — KTAS 1·5 포함 다양 ─────
    make(
      id: '005',
      subjectId: '19012356',
      name: '박서연',
      age: 67,
      sex: 'female',
      complaint: '좌측 편마비 + 어눌한 발음 (Stroke 의심)',
      minsAgo: 18,
      report: 'preliminary',   // 소견 생성 완료 · 확정 대기
      risk: 'critical',        // KTAS 2
    ),
    make(
      id: '006',
      subjectId: '13478952',
      name: '김지호',
      age: 8,
      sex: 'male',
      complaint: '손목 찰과상 · 가벼운 출혈',
      minsAgo: 95,
      report: 'signed',
      risk: 'minor',           // KTAS 5
    ),
    make(
      id: '007',
      subjectId: '18772103',
      name: '최은우',
      age: 71,
      sex: 'male',
      complaint: '교통사고 다발성 외상 · 흉부 타박 + 의식 혼란',
      minsAgo: 4,
      report: null,
      risk: 'resuscitation',   // KTAS 1
    ),
    make(
      id: '008',
      subjectId: '14503678',
      name: '정민채',
      age: 45,
      sex: 'female',
      complaint: '우상복부 통증 + 황달 · 담석 의심',
      minsAgo: 210,
      report: 'signed',
      risk: 'urgent',          // KTAS 3
    ),
    make(
      id: '009',
      subjectId: '16108834',
      name: '강도현',
      age: 22,
      sex: 'male',
      complaint: '두통 + 어지러움 · 24시간 지속',
      minsAgo: 65,
      report: null,
      risk: 'routine',         // KTAS 4
    ),
    make(
      id: '010',
      subjectId: '19384721',
      name: '백지연',
      age: 78,
      sex: 'female',
      complaint: '만성 기침 악화 + 가래 색 변화',
      minsAgo: 130,
      report: 'preliminary',
      risk: 'minor',           // KTAS 5
    ),
    make(
      id: '011',
      subjectId: '17256490',
      name: '서지훈',
      age: 53,
      sex: 'male',
      complaint: '호흡곤란 · SpO₂ 88% · 청색증 관찰',
      minsAgo: 12,
      report: 'signed',
      risk: 'critical',        // KTAS 2
    ),
    make(
      id: '012',
      subjectId: '15847362',
      name: '윤하은',
      age: 19,
      sex: 'female',
      complaint: '우하복부 통증 + 발열 · 충수염 의심',
      minsAgo: 50,
      report: null,
      risk: 'urgent',          // KTAS 3
    ),
  ];
}
