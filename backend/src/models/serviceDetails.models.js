import mongoose from "mongoose";

const ServiceDetailsSchema = new mongoose.Schema(
  {
   
    title: {
      type: String,
      required: true,
      trim: true,
    },

    shortDescription: {
      type: String,
      required: true,
    },


    checklist: {
      type: [String],
      required: true,
      validate: v => v.length > 0,
    },

    priceRange: {
      type: String, 
      required: true,
    },

    duration: {
      type: String, 
      required: true,
    },

    
    longDescription: {
      type: String,
      required: true,
    },

    highlights: {
      type: [String], 
      default: [],
    },

    images: {
      type: [String],
      default: [],
    },

    category: {
      type: String,
      enum: ["Medical", "Cosmetology"],
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ServiceDetails", ServiceDetailsSchema);
