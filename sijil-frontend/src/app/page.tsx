'use client';

import { usePlatformStats } from '@/hooks/use-platform-stats';
import { StatCard } from '@/components/shared/stat-card';
import { Icons } from '@/components/icons/lucide-icons';
import { Badge } from '@/components/ui/badge';

export default function HomePage() {
  const { data: stats, isLoading, isError, error } = usePlatformStats();

  if (isLoading) {
    return (
      <div className="w-full space-y-6 animate-pulse">
        <div className="h-20 w-full rounded-xl bg-muted/60" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 rounded-xl bg-muted/60" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6 text-destructive">
        <h2 className="text-lg font-bold tracking-tight">System Connectivity Disruption</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {error?.message || 'Unable to establish a link to backend components.'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Operational Status Panel */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-card p-4 shadow-xs">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Operational Node Control</h1>
          <p className="text-xs text-muted-foreground">Verification status mapping live backend nodes</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="success">Cluster: ONLINE</Badge>
        </div>
      </div>

      {/* Core Analytic Micro-Matrices */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Indexed Documents"
          value={stats?.documents_count}
          icon={Icons.Documents}
          description="Total records ingested"
        />
        <StatCard
          title="Extracted Topics"
          value={stats?.topics_count}
          icon={Icons.Topics}
          description="Mapped thematic elements"
        />
        <StatCard
          title="Active Subjects"
          value={stats?.subjects_count}
          icon={Icons.Subjects}
          description="Curriculum domain nodes"
        />
        <StatCard
          title="Class Grades"
          value={stats?.grades_count}
          icon={Icons.Grades}
          description="Target education tiers"
        />
      </div>
    </div>
  );
}
