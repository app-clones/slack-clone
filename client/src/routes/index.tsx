import { Route, Routes } from "react-router-dom";

import Home from "./home";
import Register from "./register";

const App = () => (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
    </Routes>
);

export default App;
