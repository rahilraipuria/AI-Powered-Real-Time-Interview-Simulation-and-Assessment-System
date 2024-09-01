import React, { useEffect, useState } from 'react';
import { Container, Form, ListGroup, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './QuestionsPage.css';
import useStore from '../store/useStore.js';
import { getListOfCandidates, getListOfExperts } from '../services/api.js';

function QuestionsPage() {
  const { interviews, fetchCompletedInterviews } = useStore((state) => ({
    interviews: state.interviews,
    fetchCompletedInterviews: state.fetchCompletedInterviews,
  }));
  const [interviewers, setInterviewers] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      await fetchCompletedInterviews();
      console.log("Interviews state:", interviews);
  
      const response1 = await getListOfExperts();
      const response2 = await getListOfCandidates();
      const interviewersList = response1.data.data.listOfExperts;
      const candidatesList = response2.data.data.listOfCandidates;
      console.log("Experts:", interviewersList);
      console.log("Candidates:", candidatesList);
  
      setInterviewers(interviewersList);
      setCandidates(candidatesList);
      
      const newItems = interviews.map((interview) => {
        const expert = interviewersList.find(expert => expert._id === interview.expertId);
        const candidate = candidatesList.find(candidate => candidate._id === interview.candidateId);
        return {
          id: interview._id,
          interviewer: expert?.profile?.name,
          interviewerEmail: expert?.email,
          candidate: candidate?.profile?.name,
          candidateEmail: candidate?.email,
          questions: interview.questions,
          responses: interview.responses,
          expertOverAllScore: interview.expertOverallScore,
          candidateOverAllScore: interview.candidateOverallScore,
        };
      });

      console.log(newItems);
      setItems(newItems);  // Set the state outside of the loop
      console.log(items);
    };
  
    fetchData();
  }, []); 
  
  const handleViewClick = (item) => {
    navigate('/interview-details', { state: { interview: item } });
  };
 
  return (
    <Container className="my-5">
      <h1>Interview Questions</h1>
      <Form.Control
        type="text"
        placeholder="Search for Interviewer or Candidate"
        className="mb-4"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <ListGroup>
        {items.map(item => (
          <ListGroup.Item key={item.id}>
            <div className="d-flex align-items-center">
              <span className="flex-fill">
                <strong>Interviewer:</strong> {item.interviewer}
              </span>
              <span className="flex-fill">
                <strong>Candidate:</strong> {item.candidate}
              </span>
              <div className="button-container">
                <Button variant="primary" onClick={() => handleViewClick(item)}>View</Button>
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default QuestionsPage;
