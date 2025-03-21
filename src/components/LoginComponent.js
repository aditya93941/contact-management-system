import React, { Component } from 'react';

class LoginComponent extends Component {
    state = { email: '', password: '', message: '', loading: false };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        this.setState({ loading: true, message: '' });
        try {
            const response = await fetch('https://contact-management-system-backend-1.onrender.com/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: this.state.email, password: this.state.password }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Login failed');
            localStorage.setItem('token', data.token);
            this.setState({ message: 'Logged in successfully!', loading: false });
            window.location.href = '/contacts';
        } catch (error) {
            this.setState({ message: 'Invalid credentials, please try again.', loading: false });
        }
    };

    render() {
        const { loading, message } = this.state;
        return (
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={this.handleSubmit} className="login-form">
                    <input type="email" name="email" placeholder="Email" onChange={this.handleChange} required />
                    <input type="password" name="password" placeholder="Password" onChange={this.handleChange} required />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <p className="success-message">{message}</p>
            </div>
        );
    }
}

export default LoginComponent;
