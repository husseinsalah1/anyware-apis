import mongoose, { Document, Schema, model } from "mongoose";

export interface IQuiz extends Document {
  title: string;
  description: string;
  subject: string;
  semester: string;
  totalMarks: number;
  createdBy: Schema.Types.ObjectId;
  questions: {
    question: string;
    options: string[];
    correctAnswer: string;
  }[];
}

const quizSchema = new Schema<IQuiz>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  subject: { type: String, required: true },
  semester: { type: String, required: true },
  totalMarks: { type: Number, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
  questions: [
    {
      question: { type: String, required: true },
      options: { type: [String], required: true },
      correctAnswer: { type: String, required: true },
    },
  ],
});

export const quizModel = model<IQuiz>("quizzes", quizSchema);
