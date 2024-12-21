import mongoose, { Document, Schema, model } from "mongoose";

export interface IAnnouncement extends Document {
  title: string;
  description: string;
  createdBy: Schema.Types.ObjectId;
}

const announcementSchema = new Schema<IAnnouncement>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
});

export const announcementModel = model<IAnnouncement>(
  "announcements",
  announcementSchema
);
