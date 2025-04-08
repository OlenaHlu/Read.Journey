import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
// import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

const RegisterPage = lazy(() => import("./pages/RegisterPage/RegisterPage"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const MainPage = lazy(() => import("./pages/MainPage/MainPage"));
const RecommendedPage = lazy(
  () => import("./pages//RecommendedPage/RecommendedPage")
);
const MyLibraryPage = lazy(() => import("./pages/MyLibraryPage/MyLibraryPage"));
const ReadingPage = lazy(() => import("./pages/ReadingPage/ReadingPage"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/recommended" element={<RecommendedPage />} />
        <Route path="/library" element={<MyLibraryPage />} />
        <Route path="/reading" element={<ReadingPage />} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Suspense>
  );
}

export default App;
