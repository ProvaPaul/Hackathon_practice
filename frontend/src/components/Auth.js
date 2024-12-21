import React, { useState } from 'react';
import axios from 'axios';

function Auth({ isLogin }) {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'student' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isLogin ? '/api/auth/login' : '/api/auth/register';
        try {
            const response = await axios.post(url, formData);
            alert(isLogin ? 'Logged in successfully!' : 'Registered successfully!');
        } catch (error) {
            alert('Error: ' + error.response.data.error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {!isLogin && <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />}
            <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            <input type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            {!isLogin && (
                <select onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                </select>
            )}
            <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
        </form>
    );
}

export default Auth;
