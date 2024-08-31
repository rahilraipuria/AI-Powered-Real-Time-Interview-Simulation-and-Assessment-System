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
      const interviewersList=response1.data.data.listOfExperts
      const candidatesList=response2.data.data.listOfCandidates
      console.log("Experts:", interviewersList);
      console.log("Candidates:", candidatesList);
  
      setInterviewers(interviewersList);
      setCandidates(candidatesList);
      
      const newItems= interviews.map((interview)=>{
        const expert = interviewersList.find(expert => expert._id === interview.expertId);
        const candidate = candidatesList.find(candidate => candidate._id === interview.candidateId);
        return{
          interview,
          expert,
          candidate
        }
      })
      console.log(newItems)
      
      newItems.forEach(item => {
        const render={
          id:item.interview._id,
          interviewer: item.expert.profile.name,
          interviewerEmail: item.expert.email,
          candidate: item.candidate.profile.name,
          candidateEmail: item.candidate.email,
          questions:item.interview.questions,
          responses:item.interview.responses,
          expertOverAllScore:item.interview.expertOverallScore,
          candidateOverAllScore:item.interview.candidateOverallScore
          ,
        }
        setItems([...items,render])
      });
      console.log(items)


    };
  
    fetchData();
  }, []); 
    

  /*const filteredItems = items.filter(
    item =>
      item.interviewer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.candidate.toLowerCase().includes(searchTerm.toLowerCase())
  );*/

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
