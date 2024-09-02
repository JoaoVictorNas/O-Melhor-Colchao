import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Header from './components/Header/Header';
import TitleSection from './components/TitleSection/TitleSection';
import CriteriaSection from './components/CriteriaSection/CriteriaSection';
import AdminPage from './Pages/AdminPage/AdminPage';
import LoginPage from './components/LoginPage/LoginPage';
import ProtectedRoute from "./components/ProtectedRoute";
import Slider from "./components/Slider/Slider";
import Compare from './components/Compare/Compare';
import Orgaos from './components/Orgaos/Orgaos';
import Desconto from './components/Desconto/Desconto';
import BlogCarrossel from './components/BlogCarrossel/BlogCarrossel';
import Faq from './components/faq/faq';
import Footer from './components/Footer/Footer';
import Materia from "./Pages/Materia/Materia";
import Blog from './Pages/Blog/Blog';
import Review from "./Pages/Review/Review";

const App = () => {
    const location = useLocation();
    const excludedPaths = ["/admin", "/login", "/materia", "/blog", "/review"];

    const shouldRenderCommonComponents = !excludedPaths.some(path => location.pathname.startsWith(path));

    return (
        <div>
            {shouldRenderCommonComponents && (
                <>
                    <Header />
                    <TitleSection />
                    <CriteriaSection />
                    <Slider />
                    <Orgaos />
                    <Compare />
                    <Desconto />
                    <BlogCarrossel />
                    <Faq />
                    <Footer />
                </>
            )}

            <Routes>
                <Route path="/admin" element={
                    <ProtectedRoute>
                        <AdminPage />
                    </ProtectedRoute>
                } />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/materia/:slug" element={<Materia />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/review/:url" element={<Review />} />
            </Routes>
        </div>
    );
}

const AppWrapper = () => (
    <Router>
        <App />
    </Router>
);

export default AppWrapper;