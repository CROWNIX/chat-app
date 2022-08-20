import {BrowserRouter, Routes, Route} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import SetAvatar from "./pages/SetAvatar";
import Error from "./pages/Error";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Chat />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/setAvatar" element={<SetAvatar />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </BrowserRouter>
    );
}
