import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Form from "./Form"
import Schedule from "./Schedule";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Form />} />
                <Route path="/Schedule" element={<Schedule />} />
            </Routes>
        </Router>
    );
}