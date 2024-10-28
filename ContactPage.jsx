import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [alert, setAlert] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
          const res = await axios.post('http://localhost:5000/api/contact', formData); // Direct URL
          if (res.status === 200) {
              setAlert({ type: 'success', message: 'Your message has been sent!' });
              setFormData({ name: '', email: '', message: '' });
          }
      } catch (error) {
          console.error('Error sending message:', error.response ? error.response.data : error.message);
          setAlert({ type: 'danger', message: 'There was an error sending your message. Please try again.' });
      }
  };
  
    return (
        <Container className="mt-5">
            <Row className="text-center mb-4">
                <Col>
                    <h1>Contact Us</h1>
                    <p className="lead">We would love to hear from you! Fill out the form below to get in touch.</p>
                </Col>
            </Row>

            {alert && <Alert variant={alert.type}>{alert.message}</Alert>}

            <Row>
                <Col md={6}>
                    <h3>Get in Touch</h3>
                    <p>Email: selvamstores24@gmail.com</p>
                    <p>Phone: +91 98945 74934</p>
                    <p>Address: 201 Pattali Street, Idumban Kovil Itteri Rd, South Anna Nagar, Palani, Tamil Nadu 624601</p>
                </Col>
                <Col md={6}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="email" className="mt-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="message" className="mt-3">
                            <Form.Label>Message</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={3}
                                placeholder="Your message"
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-3">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default ContactPage;
