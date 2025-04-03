import mongoose from "mongoose";

const voyageSchema = new mongoose.Schema(
  {
    boatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "boats", // Referencia directa al modelo de barcos
      required: true,
    },
    skipper: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // Referencia directa al modelo de usuarios
      required: true,
    },
    mode: {
      type: String,
      required: true,
      enum: [
        "commercial",
        "recreational",
        "regata",
        "research",
        "training",
        "other",
      ],
    },
    crewMembers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    guestCrew: [
      {
        type: String,
        trim: true,
        maxlength: 65,
      },
    ],
    departure: {
      type: Date,
      required: true,
      validate: {
        validator: function (v) {
          const minDate = new Date("2020-01-01T00:00:00Z");
          return v instanceof Date && v >= minDate;
        },
        message: "Departure must be a valid date",
      },
    },
    arrival: {
      type: Date,
      required: true,
      validate: {
        validator: function (v) {
          // Si estamos en una actualización, this.getUpdate() estará definido
          let departure;
          if (this.getUpdate) {
            // En update, el objeto de actualización puede tener la propiedad "departure"
            departure = this.getUpdate().departure;
          } else {
            // En creación, se usa el valor del documento
            departure = this.departure;
          }
          // Ambos deben ser fechas y arrival debe ser mayor que departure
          return (
            v instanceof Date && departure instanceof Date && v > departure
          );
        },
        message: "Arrival date must be after departure date",
      },
    },
    miles: {
      type: Number,
      required: true,
      min: 0,
      max: 50000, // límite máximo de millas
    },
    fact: {
      type: String,
      maxlength: 500,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true, // Añade createdAt y updatedAt automáticamente
  }
);

// Índice compuesto para mejorar rendimiento de búsquedas
voyageSchema.index({ boat: 1, departure: -1 });

const VoyageModel = mongoose.model("voyages", voyageSchema);

export default VoyageModel;
