import { httpClient } from '@/lib/http';
import { HealthResponse, PlatformStats } from '@/types/api';

// Fetch directly inside modern React Server Components natively
async function getPlatformData() {
  try {
    // Parallel async requests via live decoupled backend microservices
    const [health, stats] = await Promise.all([
      httpClient<HealthResponse>('/health'),
      httpClient<PlatformStats>('/utility/platform-stats'),
    ]);

    return { health, stats, error: null };
  } catch (err: any) {
    return {
      health: null,
      stats: null,
      error: err.message || 'Unable to establish a link to backend components.',
    };
  }
}

export default async function HomePage() {
  const { health, stats, error } = await getPlatformData();

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-900 dark:bg-red-950/20 dark:border-red-900/30 dark:text-red-400">
        <h2 className="text-lg font-semibold tracking-tight">System Connectivity Disruption</h2>
        <p className="mt-2 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Infrastructure Node Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-card p-4 shadow-xs">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Operational Node Control</h1>
          <p className="text-xs text-muted-foreground">Verification status mapping live backend nodes</p>
        </div>
        <div className="flex gap-3">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
            health?.status === 'ok' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
          }`}>
            Cluster: {health?.status.toUpperCase()}
          </span>
          <span className="text-xs bg-muted px-3 py-1 rounded-full font-medium flex items-center">
            Mongo: {health?.mongo}
          </span>
          <span className="text-xs bg-muted px-3 py-1 rounded-full font-medium flex items-center">
            Redis: {health?.redis}
          </span>
        </div>
      </div>

      {/* Core Analytic Micro-Matrices */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-xs">
          <p className="text-sm font-medium text-muted-foreground">Indexed Documents</p>
          <p className="text-3xl font-bold tracking-tight mt-1">{stats?.documents_count}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 shadow-xs">
          <p className="text-sm font-medium text-muted-foreground">Extracted Topics</p>
          <p className="text-3xl font-bold tracking-tight mt-1">{stats?.topics_count}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 shadow-xs">
          <p className="text-sm font-medium text-muted-foreground">Active Subjects</p>
          <p className="text-3xl font-bold tracking-tight mt-1">{stats?.subjects_count}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 shadow-xs">
          <p className="text-sm font-medium text-muted-foreground">Class Grades</p>
          <p className="text-3xl font-bold tracking-tight mt-1">{stats?.grades_count}</p>
        </div>
      </div>
    </div>
  );
}
