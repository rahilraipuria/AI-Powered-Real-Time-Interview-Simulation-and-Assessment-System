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

export const evaluateTheInterview= async()=>{
  try{
    const response= await api.post("interviews/evaluateInterview")
    console.log("Evaluate Interview",response.data.data)
    return response.data.data
  }
  catch{
    console.error("Error Evaluating interviews:", error);
    throw error;
  }
}
