import React, { Component } from 'react';

class RegisterComponent extends Component {
  state = {
    email: '',
    password: '',
    name: '',
    message: '',
  };
  handleRegister = async (e) => {
    e.preventDefault();
    const { email, password, name } = this.state;

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await response.json();
      this.setState({ message: data.message });
    } catch (error) {
      console.error(error);
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="register-container">
        <form onSubmit={this.handleRegister}>
          <h2>Register</h2>
          <input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleChange} />
          <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
          <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
          <button type="submit">Register</button>
          {this.state.message && <p>{this.state.message}</p>}
        </form>
      </div>
    );
  }
}

export default RegisterComponent;
