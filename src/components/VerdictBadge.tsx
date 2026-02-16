import { Chip } from "@mui/material";
import { Verdict } from "../types/atlas";

interface VerdictBadgeProps {
    verdict?: Verdict;
}

export default function VerdictBadge({ verdict }: VerdictBadgeProps) {
    if (!verdict) return null;

    const label = verdict.toUpperCase();

    const styles = (() => {
        switch (label) {
            case "PASS":
                return { bgcolor: "success.main", color: "success.contrastText" };
            case "WARN":
                return { bgcolor: "warning.main", color: "warning.contrastText" };
            case "FAIL":
                return { bgcolor: "error.main", color: "error.contrastText" };
            default:
                return { bgcolor: "grey.700", color: "common.white" };
        }
    })();

    return (
        <Chip
            label={label}
            variant="filled"
            sx={{
                fontWeight: 800,
                letterSpacing: 0.5,
                ...styles,
            }}
        />
    );
}
