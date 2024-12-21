import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Auth({ isLogin }) {
<<<<<<< HEAD
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student'); // Default to lowercase role
    const [name, setName] = useState('');
    const navigate = useNavigate();
=======
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student"); // Default to Student role
  const [name, setName] = useState("");
  const navigate = useNavigate();
>>>>>>> zunayed

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Login request
        const response = await axios.post(
          "http://localhost:3001/api/auth/login",
          {
            email,
            password,
          }
        );
        alert("Login successful!");
        console.log(response.data);

<<<<<<< HEAD
                // Store token in localStorage or state (optional)
                localStorage.setItem('token', response.data.token);

                // Redirect to dashboard or another page
                navigate('/dashboard'); // Redirect to the dashboard after successful login
            } else {
                // Register request
                const response = await axios.post('http://localhost:3000/api/auth/register', {
                    name,
                    email,
                    password,
                    role: role.toLowerCase(), // Convert to lowercase before sending
                });
                alert('Registration successful!');
                console.log(response.data);

                // Redirect to the login page after successful registration
                navigate('/login');
            }
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
            alert(error.response?.data?.error || 'An error occurred. Please try again.');
        }
    };

    return (
        <div>
            <h2>{isLogin ? 'Login' : 'Register'}</h2>
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <>
                        <label>
                            Name:
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </label>
                        <br />
                        <label>
                            Role:
                            <select value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value="student">Student</option>
                                <option value="teacher">Teacher</option>
                            </select>
                        </label>
                        <br />
                    </>
                )}
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <br />
                <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
            </form>
        </div>
    );
=======
        // Redirect to dashboard or another page
        navigate("/dashboard"); // Redirect to the dashboard after successful login
      } else {
        // Register request
        const response = await axios.post(
          "http://localhost:3001/api/auth/register",
          {
            name,
            email,
            password,
            role,
          }
        );
        alert("Registration successful!");
        console.log(response.data);

        // Redirect to the login page after successful registration
        navigate("/login");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              Role:
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
              </select>
            </label>
            <br />
          </>
        )}
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>
    </div>
  );
>>>>>>> zunayed
}

export default Auth;
