import { Route, Routes } from "react-router-dom";

import Home from "./home";
import Login from "./login";
import Register from "./register";

const App = () => (
    <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
    </Routes>
);

export default App;
