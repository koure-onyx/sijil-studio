export interface HealthResponse {
  status: 'ok' | 'degraded';
  mongo: 'connected' | 'disconnected';
  redis: 'connected' | 'disconnected';
  uptime_seconds: number;
}

export interface PlatformStats {
  documents_count: number;
  topics_count: number;
  subjects_count: number;
  grades_count: number;
  total_verses_mapped?: number;
}

export interface APIErrorResponse {
  success: false;
  error: string;
  errors?: string[];
}
