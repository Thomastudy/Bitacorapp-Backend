import mongoose from "mongoose";

const boatSchema = new mongoose.Schema({
  boatName: {
    type: String,
    maxlength: 35,
    trim: true,
    required: true,
  },
  owners: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  authorizedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  boatType: {
    type: String,
    enum: [
      "Sailboat",
      "Motorboat",
      "Catamaran",
      "Fishing Boat",
      "Ferry",
      "Cargo Ship",
      "Cruise Ship",
    ],
    required: true,
  },
  brand: {
    type: String,
    maxlength: 35,
    trim: true,
  },
  model: {
    type: String,
    maxlength: 55,
  },
  length: {
    type: Number,
    max: [1600, "Tamaño maximo excedido"],
  },
  flag: {
    type: String,
    maxlength: 20,
  },
  photo: {
    type: String,
    maxlength: 65,
  },
  fact: {
    type: String,
    maxlength: 220,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

const BoatModel = mongoose.model("boats", boatSchema);

export default BoatModel;
