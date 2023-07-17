import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        index: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        required: true,
        default: 0
    },
    password: {
        type: String,
        required: true,
        index: true
    },
    role: {
        type: String,
        default: 'user'
    },
    isGithub: {
        type: Boolean,
        required: true,
        default: false
    },
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts'
      }]

    //falta isGithub e isGoogle, de la clase de jwt y terceros. abajo tambien falta un parametro
});

UserSchema.pre('find', function(){
    this.populate('cart');
});

const userColl = 'users'
export const UserModel = mongoose.model(userColl, UserSchema);

