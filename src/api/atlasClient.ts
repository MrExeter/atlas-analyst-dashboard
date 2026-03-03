import type { AtlasResponse } from "../types/atlas";
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

    return data as AtlasResponse;
}