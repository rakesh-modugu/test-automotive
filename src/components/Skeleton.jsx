import React from 'react';

// ── Base shimmer block ───────────────────────────────────────────────────────
export const Skeleton = ({ className = '' }) => (
    <div className={`animate-pulse bg-slate-200 dark:bg-slate-800 rounded-lg ${className}`} />
);

// ── KPI Card skeleton (matches the 4 metric cards) ───────────────────────────
export const KpiCardSkeleton = () => (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex justify-between items-start">
            <Skeleton className="w-9 h-9 rounded-lg" />
            <Skeleton className="w-16 h-5 rounded-full" />
        </div>
        <div className="space-y-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-7 w-20" />
            <Skeleton className="h-2.5 w-32" />
        </div>
    </div>
);

// ── Chart container skeleton ─────────────────────────────────────────────────
export const ChartSkeleton = ({ className = '' }) => (
    <div className={`bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm ${className}`}>
        <div className="space-y-2 mb-5">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-3 w-52" />
        </div>
        <Skeleton className="w-full h-[220px] rounded-xl" />
    </div>
);

// ── Table row skeleton (use count to render N rows) ──────────────────────────
export const TableRowSkeleton = ({ cols = 5 }) => (
    <tr>
        {Array.from({ length: cols }).map((_, i) => (
            <td key={i} className="py-4 px-4 sm:px-5">
                <Skeleton className={`h-3.5 ${i === 0 ? 'w-32' : i === cols - 1 ? 'w-12 ml-auto' : 'w-24'}`} />
            </td>
        ))}
    </tr>
);

// ── Feed item skeleton ───────────────────────────────────────────────────────
export const FeedItemSkeleton = () => (
    <div className="flex items-start gap-3 py-3 px-1">
        <Skeleton className="w-8 h-8 rounded-lg shrink-0" />
        <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-4/5" />
            <Skeleton className="h-2.5 w-3/5" />
        </div>
        <Skeleton className="h-2.5 w-10 shrink-0" />
    </div>
);

export default Skeleton;
