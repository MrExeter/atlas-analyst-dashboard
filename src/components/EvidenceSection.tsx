import { Box, Divider, Link, Typography } from "@mui/material";
import type { EvidenceItem } from "../types/atlas";

interface EvidenceSectionProps {
    evidence?: EvidenceItem[];
}

export default function EvidenceSection({ evidence }: EvidenceSectionProps) {
    if (!evidence || !Array.isArray(evidence) || evidence.length === 0) return null;

    return (
        <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                Evidence ({evidence.length})
            </Typography>
            <Box display="flex" flexDirection="column" gap={1.25}>
                {evidence.map((item, i) => (
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
        </>
    );
}
