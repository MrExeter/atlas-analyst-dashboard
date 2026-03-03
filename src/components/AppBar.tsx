import { AppBar as RaAppBar, TitlePortal } from "react-admin";
import type { AppBarProps } from "react-admin";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import logo from "../assets/cc-logo.png";

export const AppBar: React.FC<AppBarProps> = (props) => {
    return (
        <RaAppBar {...props}>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                }}
            >
                <img
                    src={logo}
                    alt="Atlas"
                    style={{ height: 36, width: 36 }}
                />

                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Atlas
                </Typography>
            </Box>

            <TitlePortal />
        </RaAppBar>
    );
};