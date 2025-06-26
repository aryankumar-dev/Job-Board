import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import { Navbar, Nav, Container } from 'react-bootstrap';

function ResponsiveNavbar() {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
        document.body.className = savedTheme;
    }, []);

  function toggleTheme() {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.className = newTheme;

    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (newTheme === 'dark') {
            navbar.style.borderBottom = '1px solid white';
        } else {
            navbar.style.borderBottom = '1px solid black';
        }
    }
}


    const textColor = theme === 'dark' ? 'white' : 'black';

    return (
        <Navbar bg={theme} expand="md" className="navbar px-3">
            <Container fluid>
                <Navbar.Brand href="#" style={{ color: textColor }}>
                    HireMe
                </Navbar.Brand>
                <Navbar.Toggle style={{ color: textColor }} aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="/saved" style={{ color: textColor }}>
                            Saved Jobs
                        </Nav.Link>
                        <Nav.Link onClick={toggleTheme} style={{ color: textColor }}>
                            {theme === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode'}
                        </Nav.Link>
                        <Nav.Link href="#account">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                                alt="Account"
                                width="30"
                                height="30"
                                style={{ borderRadius: '50%' }}
                            />
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default ResponsiveNavbar;
