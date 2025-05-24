import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CriteriaPage from "./pages/criteriaPage";
import SuppliersPage from "./pages/suppliersPage";
import UsersPage from "./pages/usersPage";
import CriteriaValuesPage from "./pages/criteriaValuesPage";
import ResultsPage from "./pages/resultsPage";
import SupplierCriteriaValuesPage from "./pages/supplierCriteriaValuesPage";
// import WeightsPage from "./pages/weightsPage";
import Dashboard from "./pages/dashboard";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import HomePage from "./pages/homePage";
import ResultsList from "./app/Results/ResultsList";


export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage/>} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/kriteria" element={<CriteriaPage />} />
                <Route path="/alternatif" element={<SuppliersPage />} />
                <Route path="/pengguna" element={<UsersPage />} />
                <Route path="/penilaian-kriteria" element={<CriteriaValuesPage />} />
                <Route path="/hasil-perhitungan" element={<ResultsPage />} />
                <Route path="/penilaian-alternatif" element={<SupplierCriteriaValuesPage />}/>
            </Routes>
        </Router>
    );
}
