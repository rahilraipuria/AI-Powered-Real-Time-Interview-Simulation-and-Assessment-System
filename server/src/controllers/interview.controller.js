import { Interview } from "../models/interview.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ACorrectness, Qrelevancy } from "../utils/relevancy.js";
//new interview
const scheduleInterview= asyncHandler(async(req,res)=>{
    const {candidateUsername,expertUsername,role,dateAndTime}=req.body;
    if(!candidateUsername || !expertUsername || !dateAndTime || !role){
        throw new ApiError(400,"All fields are required")
    }
    const candidate= await User.findOne({username:candidateUsername})
    

    const expert= await User.findOne({username:expertUsername})

    if(!candidate|| !expert){
        throw new ApiError(404,"Not Found")
    }

    const candidateId=candidate._id
    const expertId=expert._id
    const newInterview=await Interview.create(
        {
            candidateId:candidateId,
            expertId:expertId,
            date:new Date(dateAndTime),
            role:role,
            questions:[],
            responses:[],
            expertScores:[],
            overallScore:0,
            feedback:"",
        }
    )

    if(!newInterview){
        throw new ApiError(500,"Something went wrong")
    }
    return res
    .status(200)
    .json(new ApiResponse(201,{newInterview},"New Interview Scheduled Successfully"))
})

const getScheduledInterviews= asyncHandler(async(_,res)=>{
    const scheduledInterviews=await Interview.find({
        status:"Scheduled"
    })
    if(!scheduledInterviews){
        throw new ApiError(500,"Something went wrong")
    }
    return res
    .status(200)
    .json(new ApiResponse(200,{scheduledInterviews},"List of scheduled interviews fetched successfully"))
})

const getCompletedInterviews= asyncHandler(async(_,res)=>{
    const completedInterviews=await Interview.find({
        status:"Completed"
    })
    if(!completedInterviews){
        throw new ApiError(500,"Something went wrong")
    }
    return res
    .status(200)
    .json(new ApiResponse(200,{completedInterviews},"List of scheduled interviews fetched successfully"))
})

const getPendingInterviews= asyncHandler(async(_,res)=>{
    const pendingInterviews=await Interview.find({
        status:"Pending Evaluation"
    })
    if(!pendingInterviews){
        throw new ApiError(500,"Something went wrong")
    }
    return res
    .status(200)
    .json(new ApiResponse(200,{pendingInterviews},"List of scheduled interviews fetched successfully"))
})

const interviewComplete= asyncHandler(async(req,res)=>{
    const {interviewId,questions,responses}=req.body
    if(!interviewId || !Array.isArray(questions) || !Array.isArray(responses)){
        throw new ApiError(400,"Questions and Answers are required")
    }
    const updatedInterview = await Interview.findByIdAndUpdate(
        interviewId,
        {
          $push: {
            questions: { $each: questions },
            responses: { $each: responses },
          },
          $set: {
            status:"Pending Evaluation"
          }
        },
        { new: true, useFindAndModify: false }
      );
  
      if (!updatedInterview) {
        return res.status(404).json({ error: 'Interview not found' });
      }

    return res
    .status(200)
    .json(new ApiResponse(200,{updatedInterview},"Question Answers uploaded successfully"))
})

const evaluateInterview = asyncHandler(async (req, res) => {
    const { interviewId } = req.body;
    const interview = await Interview.findById(interviewId);
    const questions = interview.questions;
    const responses = interview.responses;
    //interview.role="Web Developer"
    try {
        // Evaluate relevancy scores for questions
        const relevancyPromises = questions.map(async (question) => {
            question.relevancyScore = await Qrelevancy(question.questionText, interview.role);
        });

        await Promise.all(relevancyPromises);

        // Evaluate response scores for responses
        const correctnessPromises = questions.map(async (question, index) => {
            const correspondingResponse = responses[index];
            correspondingResponse.responseScore = await ACorrectness(question.questionText, correspondingResponse.responseText);
        });

        await Promise.all(correctnessPromises);   
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiResponse(500, {}, "Error evaluating interview"));
    }

    interview.questions = questions;
    interview.responses = responses;

    interview.status="Completed"

    await interview.save();

    return res.status(200).json(new ApiResponse(200, { interview }, "Interview Evaluated Successfully"));
});

export {scheduleInterview,getScheduledInterviews,getCompletedInterviews,getPendingInterviews,interviewComplete,evaluateInterview};