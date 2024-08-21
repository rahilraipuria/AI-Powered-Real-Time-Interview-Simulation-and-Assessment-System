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

    questions: [
      {
        questionId: {
          type: Schema.Types.ObjectId,
          ref: "Question",
          required: true,
        },
        questionText: {
          type: String,
          required: true,
        }, // Snapshot of the question text
        relevancyScore: {
          type: Number,
          default: null,
        },
        askedBy: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
      },
    ],
    responses: [
      {
        questionId: {
          type: Schema.Types.ObjectId,
          ref: "Question",
          required: true,
        },
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
    expertScores: [
      {
        expertId: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        relevancyScore: {
          type: Number,
          default: null,
        },
        feedbackQuality: {
          type: Number,
          default: null,
        },
        overallScore: {
          type: Number,
          default: null,
        },
        remarks: String,
      },
    ],
    overallScore: {
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
