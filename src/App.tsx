import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import LumiAIButton from "./components/layout/LumiAIButton";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import ProfilePage from "./components/profile/ProfilePage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { AuthProvider } from "./components/auth/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<p>Loading...</p>}>
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
          <LumiAIButton />
        </>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
