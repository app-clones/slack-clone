import { Route, Routes, Navigate } from "react-router-dom";

import { isAuthenticated } from "../utils/auth";

import CreateTeam from "./CreateTeam";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import ViewTeam from "./ViewTeam";

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
        <Route path="/view-team" element={<ViewTeam />} />
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
