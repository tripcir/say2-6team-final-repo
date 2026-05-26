import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

/// 다크모드 on/off — flutter_secure_storage에 영속 (Riverpod 3 Notifier).
/// 위젯은 `ref.watch(darkModeProvider)`로 bool을 읽고, 토글은
/// `ref.read(darkModeProvider.notifier).toggle()`.
class ThemeController extends Notifier<bool> {
  static const _key = 'emon_dark_mode';
  final _storage = const FlutterSecureStorage();

  @override
  bool build() {
    _load();
    return false; // 저장값 로드 전 기본 라이트
  }

  Future<void> _load() async {
    try {
      final v = await _storage.read(key: _key);
      if (v == '1') state = true;
    } catch (_) {/* 저장소 접근 실패 시 라이트 유지 */}
  }

  Future<void> toggle() async {
    state = !state;
    try {
      await _storage.write(key: _key, value: state ? '1' : '0');
    } catch (_) {/* 저장 실패 무시 */}
  }
}

final darkModeProvider =
    NotifierProvider<ThemeController, bool>(ThemeController.new);
