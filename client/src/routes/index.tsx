import { Route, Routes } from "react-router-dom";

import CreateTeam from "./createTeam";
import Home from "./home";
import Login from "./login";
import Register from "./register";

const App = () => (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-team" element={<CreateTeam />} />
    </Routes>
);

export default App;
