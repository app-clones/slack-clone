import { Route, Routes, Navigate } from "react-router-dom";

import { isAuthenticated } from "../utils/auth";

import CreateTeam from "./createTeam";
import Home from "./home";
import Login from "./login";
import Register from "./register";

const PrivateRoute = ({ children }: { children: any }) => {
    return isAuthenticated() ? (
        children
    ) : (
        <Navigate to={{ pathname: "/login" }} />
    );
};
const App = () => (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
            path="/create-team"
            element={
                <PrivateRoute>
                    <CreateTeam />
                </PrivateRoute>
            }
        />
    </Routes>
);

export default App;
