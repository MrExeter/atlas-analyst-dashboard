import { Divider, List, ListItem, ListItemText, Typography } from "@mui/material";

const PROVIDER_NAMES: Record<string, string> = {
    google_news_rss: "Google News",
    hackernews: "Hacker News",
    newsdata: "NewsData",
    tavily: "Tavily",
};

function friendlyName(provider: string): string {
    return PROVIDER_NAMES[provider] ?? provider;
}

interface SourcesSectionProps {
    providers?: string[];
}

export default function SourcesSection({ providers }: SourcesSectionProps) {
    if (!providers || providers.length === 0) return null;

    return (
        <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                Sources
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
                {providers.length} provider{providers.length !== 1 ? "s" : ""} used
            </Typography>
            <List dense>
                {providers.map((p) => (
                    <ListItem key={p} disablePadding>
                        <ListItemText primary={friendlyName(p)} />
                    </ListItem>
                ))}
            </List>
        </>
    );
}
