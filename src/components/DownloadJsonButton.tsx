import { Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

interface DownloadJsonButtonProps {
    data: unknown;
}

export default function DownloadJsonButton({ data }: DownloadJsonButtonProps) {
    const handleDownload = () => {
        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const timestamp = new Date()
            .toISOString()
            .replace(/[:.]/g, "-");

        const link = document.createElement("a");
        link.href = url;
        link.download = `atlas_report_${timestamp}.json`;
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={handleDownload}
        >
            Download JSON
        </Button>
    );
}
