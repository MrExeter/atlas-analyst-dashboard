import type { AtlasResponse, HistoryRun, RunDetail } from "../types/atlas";
import { getToken, clearToken } from "../auth/token";

const API_URL = import.meta.env.VITE_ATLAS_API_URL;

export async function runAnalysis(topic: string): Promise<AtlasResponse> {
    if (!API_URL) {
        throw new Error("VITE_ATLAS_API_URL not defined");
    }

    const token = getToken();

    if (!token) {
        throw new Error("No invite token present");
    }

    const response = await fetch(`${API_URL}/research/run`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ topic }),
    });

    if (!response.ok) {
        if (response.status === 401) {
            clearToken();
            throw new Error("Unauthorized");
        }
        if (response.status === 429) {
            throw new Error("Rate limit exceeded");
        }
        if (response.status >= 500) {
            throw new Error("Server error");
        }
        throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();

    // normalize: backend may nest the report under `result`
    const payload = data?.result ?? data;
    if (data?.metrics) payload.metrics = data.metrics;
    if (data?.governance) payload.governance = data.governance;
    return payload as AtlasResponse;
}

function authHeaders(): HeadersInit {
    const token = getToken();
    if (!token) throw new Error("No invite token present");
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
}

function handleError(response: Response): void {
    if (response.status === 401) {
        clearToken();
        throw new Error("Unauthorized");
    }
    if (response.status === 429) throw new Error("Rate limit exceeded");
    if (response.status >= 500) throw new Error("Server error");
    if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
}

export async function getHistoryRuns(limit = 20): Promise<HistoryRun[]> {
    if (!API_URL) throw new Error("VITE_ATLAS_API_URL not defined");

    const response = await fetch(`${API_URL}/history/runs?limit=${limit}`, {
        headers: authHeaders(),
    });

    handleError(response);

    const data = await response.json();
    if (Array.isArray(data)) return data as HistoryRun[];
    if (Array.isArray(data?.runs)) return data.runs as HistoryRun[];
    if (Array.isArray(data?.data)) return data.data as HistoryRun[];
    return [];
}

export async function getRunDetail(run_id: string): Promise<RunDetail> {
    if (!API_URL) throw new Error("VITE_ATLAS_API_URL not defined");

    const response = await fetch(`${API_URL}/history/runs/${run_id}`, {
        headers: authHeaders(),
    });

    handleError(response);

    const data = await response.json();
    return data as RunDetail;
}