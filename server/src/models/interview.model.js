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

export const Interview = mongoose.model("Interview", interviewSchema);
