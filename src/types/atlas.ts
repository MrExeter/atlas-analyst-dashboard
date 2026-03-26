export type Verdict = "PASS" | "WARN" | "FAIL";

export interface AtlasResponse {
    executive_summary: string;
    market_overview?: string;
    competitors?: string;
    opportunities?: string;
    risks?: string;
    eval_scores?: Record<string, number>;
    verdict?: "PASS" | "WARN" | "FAIL";
    latency?: number;
    metrics?: UsageMetrics;
    governance?: Record<string, unknown>;
}

export interface HistoryRun {
    run_id: string;
    timestamp: string;
    topic: string;
    status: string;
    governance_score: number;
    governance_verdict: Verdict;
    total_cost_usd: number;
    tokens_used: number;
    latency_ms: number;
    governance?: Record<string, unknown>;
    metrics?: Record<string, unknown>;
}

export interface GovernanceMetrics {
    overall_score?: number;
    policy_verdict?: string;
    evidence_coverage?: number;
    hallucination_rate?: number;
    sources_used?: number;
    claims_evaluated?: number;
}

export interface UsageMetrics {
    tokens_used?: number;
    llm_cost_usd?: number;
    api_cost_usd?: number;
    total_cost_usd?: number;
    latency_ms?: number;
    providers_used?: string[];
    models_used?: string[];
}

export interface RunDetail {
    run_id: string;
    timestamp?: string;
    topic?: string;
    status?: string;
    governance_verdict?: Verdict | null;
    governance_score?: number | null;
    governance?: Record<string, unknown>;
    metrics?: UsageMetrics;
    governance_metrics?: GovernanceMetrics;
    total_cost_usd?: number | null;
    // full report payload stored by backend
    result?: {
        executive_summary?: string;
        market_overview?: string;
        competitors?: string;
        opportunities?: string;
        risks?: string;
        verdict?: Verdict;
        latency?: number;
        eval_scores?: Record<string, number>;
        [key: string]: unknown;
    };
}
