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
}
