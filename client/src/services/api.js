import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1/",
});

//users
export const registerNewUser = ({
  fullName,
  username,
  email,
  password,
  role,
}) =>
  api.post("/users/register", {
    fullName,
    username,
    email,
    password,
    role,
  });

  export const newMeeting= ({candidateName,expertName,role,dateAndTime})=>api.post("/interviews/newInterview",
    {candidateUsername:candidateName,expertUsername:expertName,role,dateAndTime})
export const getListOfExperts=()=>api.get("users/getListOfExperts")
export const getListOfCandidates=()=>api.get("users/getListOfCandidates")

//interview
export const getScheduledInterviews=async()=>{
  const response= await api.get("interviews/getScheduledInterviews")
  return response.data.data
}

export const getPendingInterviews=async()=>{
  const response= await api.get("interviews/getPendingInterviews")
  return response.data.data
}

export const getCompletedInterviews = async () => {
  try {
    const response = await api.get("interviews/getCompletedInterviews");
    //console.log("Completed Interviews Response:", response.data); 
    return response.data.data;
  } catch (error) {
    console.error("Error fetching completed interviews:", error);
    throw error;
  }
};
export const evaluateTheInterview = async (interviewId) => {
  //
  let data = JSON.stringify({
    "interviewId":interviewId
  });
  
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:8000/api/v1/interviews/evaluateInterview',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });
}


