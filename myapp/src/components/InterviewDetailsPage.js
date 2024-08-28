import React from 'react';
import { Container, Table, Card, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import './InterviewDetailsPage.css';

function InterviewDetailsPage() {
  const location = useLocation();
  const { interview } = location.state || {};

  // Sample data for the interview
  const questions = [
    { question: 'What is Java?', marks: 10, answer: 'Java is a programming language.', answerMarks: 8 },
    { question: 'Explain OOP concepts.', marks: 15, answer: 'Encapsulation, Inheritance, Polymorphism, Abstraction.', answerMarks: 14 },
    { question: 'What is a class?', marks: 5, answer: 'A class is a blueprint for creating objects.', answerMarks: 4 },
    { question: 'What is inheritance?', marks: 10, answer: 'Inheritance is a mechanism to acquire properties from another class.', answerMarks: 9 },
    { question: 'Explain polymorphism.', marks: 10, answer: 'Polymorphism means the ability to take multiple forms.', answerMarks: 8 }
  ];

  // Calculate totals
  const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);
  const totalAnswerMarks = questions.reduce((sum, q) => sum + q.answerMarks, 0);

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Interview Details</h2>
      <Row className="mb-4">
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <h4>Interviewer</h4>
              <p><strong>Name:</strong> {interview?.interviewer}</p>
              <p><strong>Email:</strong> {interview?.interviewerEmail}</p>
              <p><strong>ID:</strong> {interview?.interviewerId}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <h4>Candidate</h4>
              <p><strong>Name:</strong> {interview?.candidate}</p>
              <p><strong>Email:</strong> {interview?.candidateEmail}</p>
              <p><strong>ID:</strong> {interview?.candidateId}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Table striped bordered hover responsive className="text-center">
        <thead>
          <tr>
            <th>Question</th>
            <th>Marks</th>
            <th>Candidate Answer</th>
            <th>Answer Marks</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q, index) => (
            <tr key={index}>
              <td>{q.question}</td>
              <td>{q.marks}</td>
              <td>{q.answer}</td>
              <td>{q.answerMarks}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="1"><strong>Grand Total</strong></td>
            <td>{totalMarks}</td>
            <td></td>
            <td>{totalAnswerMarks}</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

export default InterviewDetailsPage;
