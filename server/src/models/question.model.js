import mongoose, { Schema } from "mongoose";

const questionSchema = new Schema({
  text: { type: String, required: true },
  category: { type: String, required: true },
  subCategory: String,
  difficultyLevel: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  expectedAnswer: String,
  keywords: { type: [String], default: [] },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
},
{
    timestamps:true
});


export const Question = mongoose.model('Question', questionSchema);

