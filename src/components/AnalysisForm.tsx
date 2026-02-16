import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

interface AnalysisFormProps {
    onRun: (topic: string) => void;
    loading: boolean;
}

export default function AnalysisForm({ onRun, loading }: AnalysisFormProps) {
    const [topic, setTopic] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!topic.trim()) return;

        onRun(topic.trim());
    };

    return (
        <Box component="form" onSubmit={handleSubmit} display="flex" gap={2}>
            <TextField
                fullWidth
                label="Topic"
                placeholder="e.g. AI developer tools"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                disabled={loading}
            />

            <Button
                variant="contained"
                type="submit"
                disabled={loading || !topic.trim()}
            >
                {loading ? "Running..." : "Run"}
            </Button>
        </Box>
    );
}
