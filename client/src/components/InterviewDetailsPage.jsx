import React from "react";
import { Container, Table, Card, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "./InterviewDetailsPage.css";
import useStore from "../store/useStore";

function InterviewDetailsPage() {
  //const {interviews}=useStore()
  const location = useLocation();
  const { interview } = location.state || {};

  // Sample data for the interview
  const questions = interview.questions;
  const responses= interview.responses
  // Calculate totals
  console.log(interview);
  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Interview Details</h2>
      <Row className="mb-4">
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <h4>Interviewer</h4>
              <p>
                <strong>Name:</strong> {interview?.interviewer}
              </p>
              <p>
                <strong>Email:</strong> {interview?.interviewerEmail}
              </p>
              <p>
                <strong>ID:</strong> {interview?.expertId}
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <h4>Candidate</h4>
              <p>
                <strong>Name:</strong> {interview?.candidate}
              </p>
              <p>
                <strong>Email:</strong> {interview?.candidateEmail}
              </p>
              <p>
                <strong>ID:</strong> {interview?.candidateId}
              </p>
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
              <td>{q.questionText}</td>
              <td>{q.relevancyScore}</td>
              <td>{responses[index]?.responseText}</td>
              <td>{responses[index]?.responseScore}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="1">
              <strong>Grand Total</strong>
            </td>
            <td>{interview.expertOverAllScore}</td>
            <td></td>
            <td>{interview.candidateOverAllScore}</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

export default InterviewDetailsPage;
