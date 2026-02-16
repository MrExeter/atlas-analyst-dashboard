import {
    Box,
    Typography,
    Paper,
    Divider,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import { AtlasResponse } from "../types/atlas";
import VerdictBadge from "./VerdictBadge";
import DownloadJsonButton from "./DownloadJsonButton";

import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


interface ResultsPanelProps {
    response: AtlasResponse;
}

export default function ResultsPanel({ response }: ResultsPanelProps) {
    const {
        executive_summary,
        eval_scores,
        verdict,
        latency,
    } = response;

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

            {/* Executive Summary */}
            <Typography variant="subtitle1" gutterBottom>
                Executive Summary
            </Typography>
            <Typography variant="body1" paragraph>
                {executive_summary}
            </Typography>

            {hasScores && (
                <>
                    <Divider sx={{ my: 2 }} />

                    <Typography variant="subtitle1" gutterBottom>
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
