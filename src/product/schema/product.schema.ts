//importamos el esquema desde mongoose
import { Schema } from 'mongoose';

//defninimos el esquema de nuestro modelo de datos
export const ProductSchema = new Schema({
  name: String,
  description: String,
  imageUrl: String,
  price: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
