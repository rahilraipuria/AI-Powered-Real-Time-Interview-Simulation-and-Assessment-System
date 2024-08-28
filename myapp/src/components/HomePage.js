import React from 'react'
import { Container, Button, Navbar, Nav, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
function HomePage({ handleLoginShow, handleSignupShow }) {

    const [activeLink, setActiveLink] = useState('home');
    return (
      <>
        {/* Navbar */}
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
          <Container>
            <Navbar.Brand href="#home">Recruto</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto custom-navbar">
                <Nav.Link
                  href="#home"
                  className={activeLink === 'home' ? 'active-link' : ''}
                  onClick={() => setActiveLink('home')}
                >
                  Home
                </Nav.Link>
                <Nav.Link
                  href="#interview"
                  className={activeLink === 'interview' ? 'active-link' : ''}
                  onClick={() => setActiveLink('interview')}
                >
                  Interview
                </Nav.Link>
                <Nav.Link
                  href="#performance"
                  className={activeLink === 'performance' ? 'active-link' : ''}
                  onClick={() => setActiveLink('performance')}
                >
                  Performance
                </Nav.Link>
                <Nav.Link
                  href="#scoring"
                  className={activeLink === 'scoring' ? 'active-link' : ''}
                  onClick={() => setActiveLink('scoring')}
                >
                  Scoring
                </Nav.Link>
                <Nav.Link
                  href="#aboutus"
                  className={activeLink === 'aboutus' ? 'active-link' : ''}
                  onClick={() => setActiveLink('aboutus')}
                >
                  About Us
                </Nav.Link>
                <Nav.Link
                  href="#contactus"
                  className={activeLink === 'contactus' ? 'active-link' : ''}
                  onClick={() => setActiveLink('contactus')}
                >
                  Contact Us
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
  
        {/* Hero Section */}
        <section id="home" className="hero-section text-white text-center">
          <Container>
            <h1 className="display-4">Real-Time Hiring with AI-Powered Interviews</h1>
            <p className="lead">Our platform delivers an advanced hiring experience using AI to conduct interviews in real-time, ensuring a fair and impartial evaluation process free from human biases.</p>
            <Button variant="primary" size="lg" className="mx-2" onClick={handleSignupShow}>Sign Up</Button>
            <Button variant="outline-light" size="lg" className="mx-2" onClick={handleLoginShow}>Login</Button>
          </Container>
        </section>
  
        {/* Interview Section */}
        <section id="interview" className="bg-light py-5">
          <Container>
            <h2 className="text-center mb-4">AI Interviews Redefining Possibilities in 2024</h2>
            <p>Experience seamless interviews conducted by AI, ensuring a fair process for all candidates. We conduct interviews where every interaction is carefully monitored by AI, ensuring a thorough and unbiased evaluation process, and while coding on notepad, the candidate shares the screen with the interviewer. Our platform offers a simulated boardroom environment, replicating real-world interview settings to provide candidates with a realistic and professional experience. Leverage our advanced AI to dynamically select questions in real-time, ensuring that each interview is tailored and relevant to the candidate's skill set.</p>
          </Container>
        </section>
  
        {/* Performance Section */}
        <section id="performance" className="my-5">
          <Container>
            <h2 className="text-center mb-4">Performance</h2>
            <p>Monitor candidate performance with our comprehensive tools and analytics designed to ensure optimal hiring outcomes. Stay ahead with up-to-the-minute tracking of your system’s performance. Our platform offers real-time visibility into key metrics, ensuring you can quickly identify and address any issues as they arise. Gain deeper insights with comprehensive analytics and detailed reports. Our robust reporting tools provide in-depth analysis of your data, helping you make informed decisions and uncover trends. Leverage the power of artificial intelligence to transform your data into actionable insights. Our AI algorithms analyze complex datasets to reveal patterns and predictions that drive smarter decision-making.</p>
          </Container>
        </section>
  
        {/* Scoring Section */}
        <section id="scoring" className="my-5">
          <Container>
            <h2 className="text-center mb-4">Scoring</h2>
            <p>Our AI-driven scoring system evaluates candidates objectively based on predefined criteria. Ensure fairness and consistency in your assessments with our objective and unbiased scoring system. Our platform eliminates subjectivity and personal bias, providing standardized evaluations that are both accurate and transparent. Enhance learning and performance with instant feedback. Our real-time feedback mechanism allows users to receive immediate responses to their actions or submissions. Dive deep into performance metrics with our comprehensive analytics tools. Our platform offers a wide range of analytical features that provide detailed insights into performance trends, behavioral patterns, and achievement metrics.</p>
          </Container>
        </section>
  
        {/* About Us Section */}
        <section id="aboutus" className="bg-light py-5">
          <Container>
            <h2 className="text-center mb-4">About Us</h2>
            <p className="text-center">At Recruto, our mission is to revolutionize the recruitment process with cutting-edge AI technology. We are committed to providing a fair and efficient hiring experience that prioritizes innovation and advanced analytics. Our platform leverages the latest advancements in artificial intelligence to eliminate biases and enhance the accuracy of candidate assessments. By integrating objective scoring and real-time feedback, we ensure that every candidate is evaluated on their true potential, leading to more informed hiring decisions. At Recruto, we believe that a transparent and unbiased recruitment process not only improves hiring outcomes but also contributes to a more inclusive and equitable workplace. Our team of experts is dedicated to refining our technology and expanding its capabilities to meet the evolving needs of businesses and job seekers alike. Join us in shaping the future of recruitment, where technology and fairness come together to create opportunities for all.</p>
          </Container>
        </section>
        <section id="contactus" className="bg-light py-5">
       <Container>
      <h2 className="text-center mb-4">Contact Us</h2>
      <p className="text-center">We'd love to hear from you! If you have any questions about our services or want to learn more about how Recruto can streamline your recruitment process, please don’t hesitate to reach out. Our team is here to provide the information and support you need.</p>
   </Container>
   </section>
        
        <section className='followus'>
          <Container>
          <Row className="justify-content-center mt-5">
        <Col md={4} className="text-center">
          <h5 className="mb-3">Follow Us</h5>
          <ul className="list-inline">
            <li className="list-inline-item mx-2">
              <a href="#" className="text-dark">
                <i className="bi bi-linkedin" style={{ fontSize: '24px' }}></i>
              </a>
            </li>
            <li className="list-inline-item mx-2">
              <a href="#" className="text-dark">
                <i className="bi bi-instagram" style={{ fontSize: '24px' }}></i>
              </a>
            </li>
            <li className="list-inline-item mx-2">
              <a href="#" className="text-dark">
                <i className="bi bi-twitter" style={{ fontSize: '24px' }}></i>
              </a>
            </li>
          </ul>
        </Col>
      </Row>
          </Container>
        </section>
        
  <footer className="footer">
    <Container>
      <Row>
        <Col md={4}>
          <h5 className="footer-title">Products and Services</h5>
          <ul className="list-unstyled">
            <li>Unbiased Interview</li>
            <li>Performance Analysis</li>
            <li>Real-World Questions</li>
          </ul>
        </Col>
        <Col md={4}>
          <h5 className="footer-title mt-md-0 mt-4">Company</h5>
          <ul className="list-unstyled">
            <li>Blog</li>
            <li>Our Team</li>
            <li>Plagiarism Detection</li>
          </ul>
        </Col>
        <Col md={4}>
          <h5 className="footer-title mt-md-0 mt-4">Support</h5>
          <ul className="list-unstyled">
            <li>Community Support</li>
            <li>Question Bank</li>
            <li>Score Computation by AI</li>
          </ul>
        </Col>
      </Row>
    </Container>
  </footer>
  
  
        {/* Footer */}
        <footer className="bg-dark text-white text-center py-3">
          <Container>
            <p>&copy; 2024 Recruto. All Rights Reserved.</p>
          </Container>
        </footer>
  
      </>
    );
  }
  
  export default HomePage;