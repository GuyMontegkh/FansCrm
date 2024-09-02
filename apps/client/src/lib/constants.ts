export const BASE_URL = 'http://localhost:3001/api/v1/';

export const STORAGE_KEYS = {
  USER: 'user',
} as const;

export const REFRESH_INTERVAL_MS = 8000;

type TResolution = 'MOBILE' | 'LOW_HEIGHT';

export const RESOLUTIONS: Record<TResolution, string> = {
  MOBILE: '(max-width: 992px)',
  LOW_HEIGHT: '(max-height: 607px)',
};
