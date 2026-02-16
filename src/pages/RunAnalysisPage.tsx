import { useEffect, useState } from "react";
import { Box, Typography, Alert, CircularProgress } from "@mui/material";
import { runAnalysis } from "../api/atlasClient";
import { AtlasResponse } from "../types/atlas";
import AnalysisForm from "../components/AnalysisForm";
import ResultsPanel from "../components/ResultsPanel";

export default function RunAnalysisPage() {
    const [response, setResponse] = useState<AtlasResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [apiHealthy, setApiHealthy] = useState<boolean | null>(null);

    // useEffect(() => {
    //     fetch(`${import.meta.env.VITE_ATLAS_API_URL}/health`)
    //         .then((r) => setApiHealthy(r.ok))
    //         .catch(() => setApiHealthy(false));
    // }, []);

    useEffect(() => {
        const checkHealth = () => {
            fetch(`${import.meta.env.VITE_ATLAS_API_URL}/health`)
                .then(r => setApiHealthy(r.ok))
                .catch(() => setApiHealthy(false));
        };

        checkHealth();
        const interval = setInterval(checkHealth, 10000);

        return () => clearInterval(interval);
    }, []);


    const handleRun = async (topic: string) => {
        setLoading(true);
        setError(null);
        setResponse(null);


        try {
            const result = await runAnalysis(topic);

            console.log("API response:", result); // DEBUG

            setResponse(result);
        } catch (err: any) {
            setError(err.message || "Unexpected error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            maxWidth={1000}
            margin="40px auto"
            padding={4}
            sx={{
                backgroundColor: "background.paper",
                borderRadius: 2,
                boxShadow: 2,
            }}
        >

        <Typography variant="h4" gutterBottom>
                Atlas Analyst Dashboard
            </Typography>

            <Typography variant="body2" color="text.secondary" mb={2}>
                Agentic market research powered by Atlas
            </Typography>


            <Typography
                variant="body2"
                sx={{
                    color:
                        apiHealthy === null
                            ? "text.secondary"
                            : apiHealthy
                                ? "success.main"
                                : "error.main",
                    mb: 2,
                }}
            >
                ● {apiHealthy === null
                ? "Checking API status..."
                : apiHealthy
                    ? "Atlas API Online"
                    : "Atlas API Offline"}
            </Typography>



            <Box mb={3}>
                <AnalysisForm onRun={handleRun} loading={loading} />
            </Box>


            {loading && (
                <Box mt={3}>
                    <CircularProgress />
                </Box>
            )}

            {error && (
                <Box mt={3}>
                    <Alert severity="error">{error}</Alert>
                </Box>
            )}

            {response && (
                <Box mt={4}>
                    <ResultsPanel response={response} />
                </Box>
            )}
        </Box>
    );
}

