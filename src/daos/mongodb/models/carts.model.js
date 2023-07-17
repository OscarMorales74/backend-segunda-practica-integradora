import mongoose from 'mongoose';

const CartsSchema = new mongoose.Schema({
    products: [
      {
        type: mongoose.Schema.Types.Mixed,
        required:true,
        ref: 'products',
        quantity: {
          type: Number,
          default: 1
        }
      }
    ],
});

CartsSchema.pre('find', function(){
  this.populate('products');
})

export const CartsModel = mongoose.model(
   'carts',
   CartsSchema 
);