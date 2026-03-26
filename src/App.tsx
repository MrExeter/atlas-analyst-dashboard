import { Admin, Layout, CustomRoutes, Menu, MenuItemLink } from "react-admin";
import type { LayoutProps } from "react-admin";

import { Route } from "react-router-dom";
import RunAnalysisPage from "./pages/RunAnalysisPage";
import HistoryPage from "./pages/HistoryPage";
import RunDetailPage from "./pages/RunDetailPage";

import { useEffect, useState } from "react";
import { getToken } from "./auth/token";
import AuthModal from "./components/AuthModal";

import { AppBar } from "./components/AppBar";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import HistoryIcon from "@mui/icons-material/History";

const CustomMenu = () => (
    <Menu>
        <MenuItemLink to="/" primaryText="Run" leftIcon={<PlayArrowIcon />} />
        <MenuItemLink to="/history" primaryText="History" leftIcon={<HistoryIcon />} />
    </Menu>
);

// Custom layout with proper typing
const CustomLayout: React.FC<LayoutProps> = (props) => (
    <Layout {...props} appBar={AppBar} menu={CustomMenu} />
);

const dataProvider = {
    getList: () => Promise.resolve({ data: [], total: 0 }),
    getOne: () => Promise.resolve({ data: {} }),
    getMany: () => Promise.resolve({ data: [] }),
    getManyReference: () => Promise.resolve({ data: [], total: 0 }),
    create: () => Promise.resolve({ data: {} }),
    update: () => Promise.resolve({ data: {} }),
    updateMany: () => Promise.resolve({ data: [] }),
    delete: () => Promise.resolve({ data: {} }),
    deleteMany: () => Promise.resolve({ data: [] }),
};

export default function App() {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        if (getToken()) {
            setAuthenticated(true);
        }
    }, []);

    if (!authenticated) {
        return <AuthModal onAuthenticated={() => setAuthenticated(true)} />;
    }

    return (
        <Admin
            layout={CustomLayout}
            dataProvider={dataProvider as any}
            requireAuth={false}
        >
            <CustomRoutes>
                <Route path="/" element={<RunAnalysisPage />} />
                <Route path="/history" element={<HistoryPage />} />
                <Route path="/history/:run_id" element={<RunDetailPage />} />
            </CustomRoutes>
        </Admin>
    );
}