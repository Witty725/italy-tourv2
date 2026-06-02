/**
 * Utility to trigger haptic feedback using the HTML5 Vibration API.
 * Safely handles environments where the API is not supported or disabled.
 */
export function triggerHaptic(pattern: 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error' | 'double' | number) {
  if (typeof window !== 'undefined' && typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try {
      if (typeof pattern === 'number') {
        navigator.vibrate(pattern);
        return;
      }

      switch (pattern) {
        case 'light':
          navigator.vibrate(15);
          break;
        case 'medium':
          navigator.vibrate(30);
          break;
        case 'heavy':
          navigator.vibrate(60);
          break;
        case 'success':
          navigator.vibrate([30, 40, 30]);
          break;
        case 'warning':
          navigator.vibrate([60, 50, 60]);
          break;
        case 'error':
          navigator.vibrate([120, 60, 120]);
          break;
        case 'double':
          navigator.vibrate([20, 30, 20]);
          break;
        default:
          navigator.vibrate(30);
      }
    } catch (e) {
      // Fallback silently if vibration is blocked or not supported
      console.debug('Vibration block or not supported:', e);
    }
  }
}
