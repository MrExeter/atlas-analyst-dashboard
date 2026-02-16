import { AtlasResponse } from "../types/atlas";

const API_URL = import.meta.env.VITE_ATLAS_API_URL;
const API_KEY = import.meta.env.VITE_ATLAS_API_KEY;

export async function runAnalysis(topic: string): Promise<AtlasResponse> {
    if (!API_URL) {
        throw new Error("VITE_ATLAS_API_URL not defined");
    }

    if (!API_KEY) {
        throw new Error("VITE_ATLAS_API_KEY not defined");
    }

    const response = await fetch(`${API_URL}/research/run`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-API-Key": API_KEY,
        },
        body: JSON.stringify({ topic }),
    });

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error("Unauthorized (invalid API key)");
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

