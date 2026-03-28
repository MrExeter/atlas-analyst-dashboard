import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Divider,
    Link,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import type { EvidenceCluster, EvidenceItem } from "../types/atlas";
import EvidenceSection from "./EvidenceSection";

interface EvidenceClusterSectionProps {
    evidence_clusters?: EvidenceCluster[];
    evidence?: EvidenceItem[];
}

function SourceList({ sources }: { sources: EvidenceItem[] }) {
    return (
        <Box display="flex" flexDirection="column" gap={1.25}>
            {sources.map((item, i) => (
                <Box key={i}>
                    <Link
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="body2"
                        sx={{
                            display: "block",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            maxWidth: "100%",
                            fontWeight: 500,
                            textDecoration: "none",
                            "&:hover": { textDecoration: "underline" },
                        }}
                    >
                        {item.title}
                    </Link>
                    <Typography
                        variant="caption"
                        sx={{ opacity: 0.65, fontSize: "0.8rem", display: "block", mt: 0.25 }}
                    >
                        {item.domain}
                    </Typography>
                </Box>
            ))}
        </Box>
    );
}

export default function EvidenceClusterSection({
    evidence_clusters,
    evidence,
}: EvidenceClusterSectionProps) {
    // prefer clusters if available
    if (evidence_clusters && evidence_clusters.length > 0) {
        const totalSources = evidence_clusters.reduce(
            (sum, c) => sum + c.sources.length,
            0
        );

        // collect clustered source URLs to find ungrouped ones
        const clusteredUrls = new Set(
            evidence_clusters.flatMap((c) => c.sources.map((s) => s.url))
        );
        const ungrouped = evidence?.filter((e) => !clusteredUrls.has(e.url)) ?? [];

        return (
            <>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                    Evidence ({totalSources} sources)
                </Typography>

                {evidence_clusters.map((cluster) => (
                    <Accordion
                        key={cluster.cluster_id}
                        defaultExpanded={false}
                        disableGutters
                        elevation={0}
                        sx={{ "&:before": { display: "none" }, mb: 0.5 }}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0 }}>
                            <Typography variant="body2" fontWeight={600}>
                                {cluster.label}
                                <Typography component="span" variant="caption" color="text.secondary" ml={1}>
                                    ({cluster.sources.length})
                                </Typography>
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ px: 1, pt: 0 }}>
                            <SourceList sources={cluster.sources} />
                        </AccordionDetails>
                    </Accordion>
                ))}

                {ungrouped.length > 0 && (
                    <Box mt={1}>
                        <Typography variant="body2" fontWeight={600} mb={1}>
                            Other Sources
                        </Typography>
                        <SourceList sources={ungrouped} />
                    </Box>
                )}
            </>
        );
    }

    // fallback to flat list
    return <EvidenceSection evidence={evidence} />;
}
