import {
    Box,
    Typography,
    Paper,
    Divider,
    List,
    ListItem,
    ListItemText,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import type { AtlasResponse, Verdict } from "../types/atlas";
import VerdictBadge from "./VerdictBadge";
import DownloadJsonButton from "./DownloadJsonButton";
import SourcesSection from "./SourcesSection";
import EvidenceClusterSection from "./EvidenceClusterSection";

interface ResultsPanelProps {
    response: AtlasResponse;
}

function renderField(value: unknown): React.ReactNode {
    if (value == null) return null;
    if (typeof value === "string") return value;
    if (Array.isArray(value)) {
        return value.map((item, i) => (
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
    if (typeof value === "object") {
        const obj = value as Record<string, unknown>;
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
                {JSON.stringify(value, null, 2)}
            </Typography>
        );
    }
    return String(value);
}

function Section({ title, value }: { title: string; value?: unknown }) {
    if (value == null || value === "") return null;
    return (
        <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                {title}
            </Typography>
            {renderField(value)}
        </>
    );
}

export default function ResultsPanel({ response }: ResultsPanelProps) {
    const { executive_summary, market_overview, competitors, opportunities, risks, eval_scores, verdict, latency, metrics, governance } = response;
    const gov = governance as Record<string, any> | undefined;

    const formatLabel = (key: string) =>
        key.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());

    const hasScores = eval_scores && Object.keys(eval_scores).length > 0;

    return (
        <Paper elevation={2} sx={{ padding: 3 }}>
            {/* Header */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">Analysis Result</Typography>
                {verdict && <VerdictBadge verdict={verdict} />}
            </Box>

            {latency !== undefined && (
                <Typography variant="body2" color="text.secondary">
                    Latency: <strong>{latency} ms</strong>
                </Typography>
            )}

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                Executive Summary
            </Typography>
            <Typography variant="body1" paragraph>
                {executive_summary}
            </Typography>

            <Section title="Market Overview" value={market_overview} />
            <Section title="Competitors" value={competitors} />
            <Section title="Opportunities" value={opportunities} />
            <Section title="Risks" value={risks} />

            {hasScores && (
                <>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                        Evaluation Summary
                    </Typography>
                    <List dense sx={{ mt: 1 }}>
                        {Object.entries(eval_scores ?? {}).map(([key, value]) => (
                            <ListItem key={key} disablePadding>
                                <ListItemText
                                    primary={formatLabel(key)}
                                    secondary={Number(value).toFixed(2)}
                                />
                            </ListItem>
                        ))}
                    </List>
                </>
            )}

            {gov && (
                <>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                        Governance Evaluation
                    </Typography>
                    {gov.policy_verdict && (
                        <Box display="flex" alignItems="center" gap={1} mb={1}>
                            <Typography variant="body2">Verdict:</Typography>
                            <VerdictBadge verdict={gov.policy_verdict as Verdict} />
                        </Box>
                    )}
                    <List dense>
                        {gov.overall_score != null && (
                            <ListItem disablePadding>
                                <ListItemText primary="Score" secondary={Number(gov.overall_score).toFixed(2)} />
                            </ListItem>
                        )}
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
            )}

            <SourcesSection providers={metrics?.providers_used} />
            <EvidenceClusterSection evidence_clusters={response.evidence_clusters} evidence={response.evidence} />

            {metrics && (
                <>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                        Usage Metrics
                    </Typography>
                    <List dense>
                        {metrics.tokens_used != null && (
                            <ListItem disablePadding>
                                <ListItemText primary="Tokens Used" secondary={metrics.tokens_used.toLocaleString()} />
                            </ListItem>
                        )}
                        {metrics.llm_cost_usd != null && (
                            <ListItem disablePadding>
                                <ListItemText primary="LLM Cost" secondary={`$${metrics.llm_cost_usd.toFixed(4)}`} />
                            </ListItem>
                        )}
                        {metrics.api_cost_usd != null && (
                            <ListItem disablePadding>
                                <ListItemText primary="API Cost" secondary={`$${metrics.api_cost_usd.toFixed(4)}`} />
                            </ListItem>
                        )}
                        {metrics.total_cost_usd != null && (
                            <ListItem disablePadding>
                                <ListItemText primary="Total Cost" secondary={`$${metrics.total_cost_usd.toFixed(4)}`} />
                            </ListItem>
                        )}
                        {metrics.latency_ms != null && (
                            <ListItem disablePadding>
                                <ListItemText primary="Latency" secondary={`${metrics.latency_ms} ms`} />
                            </ListItem>
                        )}
                        {metrics.providers_used != null && (
                            <ListItem disablePadding>
                                <ListItemText primary="Providers Used" secondary={metrics.providers_used.join(", ")} />
                            </ListItem>
                        )}
                        {metrics.models_used != null && (
                            <ListItem disablePadding>
                                <ListItemText primary="Models Used" secondary={metrics.models_used.join(", ")} />
                            </ListItem>
                        )}
                    </List>
                </>
            )}

            <Accordion
                defaultExpanded={false}
                sx={{ mt: 2, backgroundColor: "background.default" }}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle2">
                        Technical Output (JSON)
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box
                        component="pre"
                        sx={{
                            margin: 0,
                            padding: 2,
                            overflowX: "auto",
                            fontSize: "0.8rem",
                            backgroundColor: "rgba(255,255,255,0.03)",
                            borderRadius: 1,
                        }}
                    >
                        {JSON.stringify(response, null, 2)}
                    </Box>
                </AccordionDetails>
            </Accordion>

            <Box mt={3}>
                <DownloadJsonButton data={response} />
            </Box>
        </Paper>
    );
}
