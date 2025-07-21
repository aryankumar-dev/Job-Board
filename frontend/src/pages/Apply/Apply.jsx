import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './Apply.css';

function Apply({ show, onClose }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    linkedin: '',
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Application submitted successfully!");
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered className="custom-modal">
      <Modal.Header closeButton className="modal-header-custom">
        <Modal.Title className="modal-title-custom">Apply for Job</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-custom">
        <Form onSubmit={handleSubmit} className="apply-form">
          <Form.Group className="mb-3" controlId="formFullName">
            <Form.Control
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="input-field"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Control
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input-field"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formLinkedIn">
            <Form.Control
              type="url"
              name="linkedin"
              placeholder="LinkedIn Profile URL"
              value={formData.linkedin}
              onChange={handleChange}
              required
              className="input-field"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formResume">
            <Form.Control
              type="file"
              name="resume"
              onChange={handleChange}
              required
              className="input-field"
            />
          </Form.Group>

          <Modal.Footer className="modal-footer-custom">
            <Button variant="secondary" onClick={onClose} className="cancel-btn">
              Cancel
            </Button>
            <Button variant="primary" type="submit" className="submit-btn">
              Submit Application
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default Apply;
