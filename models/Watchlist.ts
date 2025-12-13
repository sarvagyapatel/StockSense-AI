import mongoose, { Schema, Document } from "mongoose";

export interface IWatchlist extends Document {
  userId: string;
  symbol: string;
  name: string;
}

const WatchlistSchema = new Schema<IWatchlist>(
  {
    userId: { type: String, required: true, index: true },
    symbol: { type: String, required: true },
    name:   { type: String, required: true },
  },
  { timestamps: true }
);

WatchlistSchema.index({ userId: 1, symbol: 1 }, { unique: true });

export const Watchlist =
  mongoose.models.Watchlist ||
  mongoose.model<IWatchlist>("Watchlist", WatchlistSchema);
