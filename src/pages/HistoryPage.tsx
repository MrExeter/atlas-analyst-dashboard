import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    Alert,
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    IconButton,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { getHistoryRuns } from "../api/atlasClient";
import type { HistoryRun } from "../types/atlas";
import VerdictBadge from "../components/VerdictBadge";

export default function HistoryPage() {
    const [runs, setRuns] = useState<HistoryRun[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const load = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getHistoryRuns();
            setRuns(data);
        } catch (err: any) {
            setError(err.message || "Failed to load history");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    const goToRun = (run_id: string) => navigate(`/history/${run_id}`);

    return (
        <Box maxWidth={1200} margin="40px auto" padding={4}>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                <Box>
                    <Typography variant="h4" gutterBottom>
                        Run History
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Previous Atlas research runs
                    </Typography>
                </Box>
                <IconButton onClick={load} disabled={loading} title="Refresh">
                    <RefreshIcon />
                </IconButton>
            </Box>

            {loading && (
                <Box display="flex" justifyContent="center" mt={4}>
                    <CircularProgress />
                </Box>
            )}

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {!loading && !error && (
                <TableContainer component={Paper} elevation={2}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Timestamp</TableCell>
                                <TableCell>Topic</TableCell>
                                <TableCell>Verdict</TableCell>
                                <TableCell align="right">Gov Score</TableCell>
                                <TableCell align="right">Cost (USD)</TableCell>
                                <TableCell align="right">Tokens</TableCell>
                                <TableCell align="right">Latency (ms)</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {runs.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={9} align="center">
                                        <Typography variant="body2" color="text.secondary" py={3}>
                                            No runs found
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                runs.map((run) => (
                                    <TableRow
                                        key={run.run_id}
                                        hover
                                        onClick={() => goToRun(run.run_id)}
                                        sx={{ cursor: "pointer" }}
                                    >
                                        <TableCell>
                                            {new Date(run.timestamp).toLocaleString()}
                                        </TableCell>
                                        <TableCell sx={{ maxWidth: 280, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                            {run.topic}
                                        </TableCell>
                                        <TableCell>
                                            <VerdictBadge verdict={run.governance_verdict} />
                                        </TableCell>
                                        <TableCell align="right">
                                            {run.governance_score?.toFixed(2) ?? "—"}
                                        </TableCell>
                                        <TableCell align="right">
                                            {run.total_cost_usd != null
                                                ? `$${run.total_cost_usd.toFixed(4)}`
                                                : "—"}
                                        </TableCell>
                                        <TableCell align="right">
                                            {run.tokens_used?.toLocaleString() ?? "—"}
                                        </TableCell>
                                        <TableCell align="right">
                                            {run.latency_ms ?? "—"}
                                        </TableCell>
                                        <TableCell>{run.status}</TableCell>
                                        <TableCell>
                                            <Button
                                                size="small"
                                                variant="outlined"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    goToRun(run.run_id);
                                                }}
                                            >
                                                View
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
}