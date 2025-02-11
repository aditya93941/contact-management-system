import React, { Component } from 'react';
import '../App.css';
class ContactComponent extends Component {
  state = {
    contacts: [],
    name: '',
    email: '',
    phone: '',
    address: '',
    timezone: '',
    message: '',
    error: ''
  };

  async componentDidMount() {
    await this.fetchContacts();
  }

  fetchContacts = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      this.setState({ error: 'No token found. Please log in.' });
      return;
    }

    try {
      const response = await fetch('https://contact-management-system-backend-1h7p.onrender.com/api/contacts', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch contacts');
      }

      const data = await response.json();
      this.setState({ contacts: data, error: '' });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  handleAddContact = async (e) => {
    e.preventDefault();
    const { name, email, phone, address, timezone } = this.state;

    try {
      const response = await fetch('https://contact-management-system-backend-1h7p.onrender.com/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ name, email, phone, address, timezone })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add contact');
      }

      const data = await response.json();
      this.setState({ message: data.message });
      await this.fetchContacts();
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  handleChange = (e) =>{
    this.setState({ [e.target.name]: e.target.value });
  };



  render() {
    const { contacts, name, email, phone, address, timezone, message, error } = this.state;

    return (
      <div className="contacts-container">
        <form onSubmit={this.handleAddContact}>
          <h2>Add New Contact</h2>
          <input type="text" name="name" placeholder="Name" value={name}
            onChange={this.handleChange}
          />
          <input type="email" name="email" placeholder="Email" value={email}
            onChange={this.handleChange}
          />
          <input type="text" name="phone" placeholder="Phone" value={phone}
            onChange={this.handleChange}
          />
          <input type="text" name="address" placeholder="Address" value={address}
            onChange={this.handleChange}
          />
          <input type="text" name="timezone" placeholder="Timezone" value={timezone}
            onChange={this.handleChange}
          />
          <button type="submit">Add Contact</button>
        </form>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}


        <h2>Contacts List</h2>
        <ul>
          {contacts.map(contact => (
            <li key={contact.id}>
              <h3>{contact.name}</h3>
              <p>Email: {contact.email}</p>
              <p>Phone: {contact.phone}</p>
              <p>Address: {contact.address}</p>
              <p>Timezone: {contact.timezone}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ContactComponent;
