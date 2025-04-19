import Constants from 'expo-constants';
import { Platform } from 'react-native';

type BuildVariant = 'development' | 'beta' | 'production' | 'unknown' | 'preview';

export function getBuildVariant(): BuildVariant {
  // Sprawdź zmienną środowiskową APP_VARIANT
  const variant = Constants.expoConfig?.extra?.APP_VARIANT;
  if (variant === 'beta' || variant === 'production' || variant === 'preview') {
    return variant;
  }
  
  // Sprawdź czy to development client
  if (Constants.expoConfig?.extra?.isDevelopmentClient) {
    return 'development';
  }
  
  return 'unknown';
}

export function getAppVersion(): string {
  return Constants.expoConfig?.version || '0.0.0';
}

export function getAppBuildNumber(): string {
  if (Platform.OS === 'android') {
    return Constants.expoConfig?.android?.versionCode?.toString() || '0';
  }
  return '0';
}

export function isProductionBuild(): boolean {
  return getBuildVariant() === 'production';
}

export function isBetaBuild(): boolean {
  return getBuildVariant() === 'beta';
}