import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IWatchlistItem extends Document {
  userId: Types.ObjectId;
  symbol: string;
  name: string;
  region?: string;
  currency?: string;
  matchScore?: number;
  createdAt: Date;
  updatedAt: Date;
}

const WatchlistItemSchema = new Schema<IWatchlistItem>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    symbol: { type: String, required: true },
    name: { type: String, required: true },
    region: { type: String },
    currency: { type: String },
    matchScore: { type: Number },
  },
  { timestamps: true }
);

WatchlistItemSchema.index({ userId: 1, symbol: 1 }, { unique: true });

export const WatchlistItem: Model<IWatchlistItem> =
  mongoose.models.WatchlistItem ||
  mongoose.model<IWatchlistItem>("WatchlistItem", WatchlistItemSchema);
