import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    Alert,
    CircularProgress,
    Paper,
    Divider,
    List,
    ListItem,
    ListItemText,
    Button,
} from "@mui/material";
import type React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getRunDetail } from "../api/atlasClient";
import type { RunDetail, Verdict } from "../types/atlas";
import VerdictBadge from "../components/VerdictBadge";
import SourcesSection from "../components/SourcesSection";
import EvidenceClusterSection from "../components/EvidenceClusterSection";

function renderContent(content: unknown): React.ReactNode {
    if (content == null) return null;
    if (typeof content === "string") return content;
    if (Array.isArray(content)) {
        return content.map((item, i) => (
            <Box key={i} mb={1}>
                {typeof item === "string" ? (
                    <Typography variant="body1">{item}</Typography>
                ) : (
                    <>
                        {item.name && <Typography variant="body2" fontWeight={600}>{item.name}</Typography>}
                        {item.summary && <Typography variant="body2">{item.summary}</Typography>}
                        {!item.name && !item.summary && (
                            <Typography variant="body2" component="pre" sx={{ fontSize: "0.8rem" }}>
                                {JSON.stringify(item, null, 2)}
                            </Typography>
                        )}
                    </>
                )}
            </Box>
        ));
    }
    if (typeof content === "object") {
        const obj = content as Record<string, unknown>;
        if (obj.name || obj.summary) {
            return (
                <>
                    {obj.name && <Typography variant="body2" fontWeight={600}>{String(obj.name)}</Typography>}
                    {obj.summary && <Typography variant="body2">{String(obj.summary)}</Typography>}
                </>
            );
        }
        return (
            <Typography variant="body2" component="pre" sx={{ fontSize: "0.8rem" }}>
                {JSON.stringify(content, null, 2)}
            </Typography>
        );
    }
    return String(content);
}

function Section({ title, content }: { title: string; content?: unknown }) {
    if (content == null || content === "") return null;
    return (
        <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                {title}
            </Typography>
            {renderContent(content)}
        </>
    );
}

export default function RunDetailPage() {
    const { run_id } = useParams<{ run_id: string }>();
    const navigate = useNavigate();
    const [detail, setDetail] = useState<RunDetail | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!run_id) return;
        setLoading(true);
        setError(null);
        getRunDetail(run_id)
            .then(setDetail)
            .catch((err: any) => setError(err.message || "Failed to load run"))
            .finally(() => setLoading(false));
    }, [run_id]);

    return (
        <Box maxWidth={1000} margin="40px auto" padding={4}>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate("/history")}
                sx={{ mb: 3 }}
            >
                Back to History
            </Button>

            {loading && (
                <Box display="flex" justifyContent="center" mt={4}>
                    <CircularProgress />
                </Box>
            )}

            {error && <Alert severity="error">{error}</Alert>}

            {detail && (
                <Paper elevation={2} sx={{ padding: 3 }}>
                    {/* Header */}
                    <Typography variant="h5" mb={1}>Run Report</Typography>

                    {run_id && (
                        <Typography variant="body2" color="text.secondary" mb={0.5}>
                            Run ID: <strong>{run_id.slice(0, 8)}…{run_id.slice(-4)}</strong>
                        </Typography>
                    )}

                    {detail.metrics?.latency_ms != null && (
                        <Typography variant="body2" color="text.secondary" mb={1}>
                            Latency: <strong>{detail.metrics.latency_ms} ms</strong>
                        </Typography>
                    )}

                    {(() => {
                        const gov = detail.governance as Record<string, any> | undefined;
                        const verdict = gov?.policy_verdict;
                        const score = gov?.overall_score;
                        if (!verdict && score == null) return null;
                        return (
                            <Box display="flex" alignItems="center" gap={2} mt={1}>
                                {verdict && <VerdictBadge verdict={verdict as Verdict} />}
                                {score != null && (
                                    <Typography variant="body2" color="text.secondary">
                                        Score: <strong>{Number(score).toFixed(2)}</strong>
                                    </Typography>
                                )}
                            </Box>
                        );
                    })()}

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                        Executive Summary
                    </Typography>
                    <Typography variant="body1" paragraph>
                        {detail.result?.executive_summary}
                    </Typography>

                    <Section title="Market Overview" content={detail.result?.market_overview} />
                    <Section title="Competitors" content={detail.result?.competitors} />
                    <Section title="Opportunities" content={detail.result?.opportunities} />
                    <Section title="Risks" content={detail.result?.risks} />

                    {/* Governance Evaluation */}
                    {detail.governance && (() => {
                        const gov = detail.governance as Record<string, any>;
                        return (
                            <>
                                <Divider sx={{ my: 2 }} />
                                <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                                    Governance Evaluation
                                </Typography>
                                <List dense>
                                    {gov.evidence_coverage != null && (
                                        <ListItem disablePadding>
                                            <ListItemText primary="Evidence Coverage" secondary={Number(gov.evidence_coverage).toFixed(2)} />
                                        </ListItem>
                                    )}
                                    {gov.hallucination_rate != null && (
                                        <ListItem disablePadding>
                                            <ListItemText primary="Hallucination Rate" secondary={Number(gov.hallucination_rate).toFixed(2)} />
                                        </ListItem>
                                    )}
                                    {gov.retrieval_relevance != null && (
                                        <ListItem disablePadding>
                                            <ListItemText primary="Retrieval Relevance" secondary={Number(gov.retrieval_relevance).toFixed(2)} />
                                        </ListItem>
                                    )}
                                    {gov.sources_used != null && (
                                        <ListItem disablePadding>
                                            <ListItemText primary="Sources Used" secondary={gov.sources_used} />
                                        </ListItem>
                                    )}
                                    {gov.claims_evaluated != null && (
                                        <ListItem disablePadding>
                                            <ListItemText primary="Claims Evaluated" secondary={gov.claims_evaluated} />
                                        </ListItem>
                                    )}
                                </List>
                            </>
                        );
                    })()}

                    <SourcesSection providers={detail.metrics?.providers_used} />
                    <EvidenceClusterSection evidence_clusters={detail.evidence_clusters} evidence={detail.evidence} />

                    {/* Usage Metrics */}
                    {detail.metrics && (
                        <>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                                Usage Metrics
                            </Typography>
                            <List dense>
                                {detail.metrics.tokens_used != null && (
                                    <ListItem disablePadding>
                                        <ListItemText primary="Tokens Used" secondary={detail.metrics.tokens_used.toLocaleString()} />
                                    </ListItem>
                                )}
                                {detail.metrics.llm_cost_usd != null && (
                                    <ListItem disablePadding>
                                        <ListItemText primary="LLM Cost" secondary={`$${detail.metrics.llm_cost_usd.toFixed(4)}`} />
                                    </ListItem>
                                )}
                                {detail.metrics.api_cost_usd != null && (
                                    <ListItem disablePadding>
                                        <ListItemText primary="API Cost" secondary={`$${detail.metrics.api_cost_usd.toFixed(4)}`} />
                                    </ListItem>
                                )}
                                {detail.metrics.total_cost_usd != null && (
                                    <ListItem disablePadding>
                                        <ListItemText primary="Total Cost" secondary={`$${detail.metrics.total_cost_usd.toFixed(4)}`} />
                                    </ListItem>
                                )}
                                {detail.metrics.latency_ms != null && (
                                    <ListItem disablePadding>
                                        <ListItemText primary="Latency" secondary={`${detail.metrics.latency_ms} ms`} />
                                    </ListItem>
                                )}
                                {detail.metrics.providers_used != null && (
                                    <ListItem disablePadding>
                                        <ListItemText primary="Providers Used" secondary={detail.metrics.providers_used.join(", ")} />
                                    </ListItem>
                                )}
                                {detail.metrics.models_used != null && (
                                    <ListItem disablePadding>
                                        <ListItemText primary="Models Used" secondary={detail.metrics.models_used.join(", ")} />
                                    </ListItem>
                                )}
                            </List>
                        </>
                    )}
                </Paper>
            )}
        </Box>
    );
}