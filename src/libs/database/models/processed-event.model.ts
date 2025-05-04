import { Schema, models, model, Document } from "mongoose";

interface ProcessedEventDocument extends Document {
  eventId: string;
  createdAt: Date;
}

const ProcessedEventSchema = new Schema<ProcessedEventDocument>({
  eventId: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const ProcessedEvent = models?.ProcessedEvent || model<ProcessedEventDocument>("ProcessedEvent", ProcessedEventSchema);

export default ProcessedEvent;