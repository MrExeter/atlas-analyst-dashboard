import { Admin, Layout, CustomRoutes } from "react-admin";
import { Route } from "react-router-dom";
import RunAnalysisPage from "./pages/RunAnalysisPage";

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
    return (
        <Admin
            layout={Layout}
            dataProvider={dataProvider}
            dashboard={RunAnalysisPage}
            requireAuth={false}
        >
            <CustomRoutes>
                <Route path="/" element={<RunAnalysisPage />} />
            </CustomRoutes>
        </Admin>
    );
}
