import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './components/Auth';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Auth isLogin={true} />} />
                <Route path="/register" element={<Auth isLogin={false} />} />
            </Routes>
        </Router>
    );
}

export default App;
