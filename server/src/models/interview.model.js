import mongoose, { Schema } from "mongoose";

const interviewSchema = new Schema(
  {
    candidateId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    expertId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    role:{
      type:"String",
      required:true
    },

    questions: [
      {
        questionText: {
          type: String,
          required: true,
        }, 
        relevancyScore: {
          type: Number,
          default: null,
        },
      },
    ],

    responses: [
      {
        responseText: {
          type: String,
          required: true,
        },
        responseScore: {
          type: Number,
          default: null,
        },
      },
    ],

    expertOverallScore: {
        type: Number,
        default: null,
    },

    candidateOverallScore: {
      type: Number,
      default: null,
    },

    feedback: String,
    
    status: {
      type: String,
      enum: ["Scheduled", "Completed", "Pending Evaluation"],
      default: "Scheduled",
    },
  },
  {
    timestamps: true,
  }
);


interviewSchema.pre('save', function(next) {
  if (this.questions && this.responses) {
    // Calculate total relevancy score from questions
    this.expertOverallScore = this.questions.reduce((total, question) => {
      return total + (question.relevancyScore || 0);
    }, 0);

    // Calculate total response score
    this.candidateOverallScore = this.responses.reduce((total, response) => {
      return total + (response.responseScore || 0);
    }, 0);
  }

  next();
});


export const Interview = mongoose.model("Interview", interviewSchema);
