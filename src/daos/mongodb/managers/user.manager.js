import MongoDao from '../mongo.dao.js';
import { UserModel } from '../models/user.model.js';
import { CartsModel } from '../models/carts.model.js';
import { createHash, isValidPassword } from '../../../utils.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT

//creamos la clase UserManager que recibe los metodos de MongoDao
export default class UserManager extends MongoDao{
  constructor(){
    super(UserModel)
  }

  //creamos el metodo privado generateToken
  #generateToken(user){
    const payload = {
      userId: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email:user.email,
        age: user.age
    }
    const token = jwt.sign(payload, SECRET_KEY_JWT, {
      expiresIn: '10m'
    });
      return token;
  }

  async getByEmail(email){
    try {
      const existUser = await this.model.findOne({email});
      if(existUser){
        return existUser//.populate('carts')
      } else return false
    } catch (error) {
      console.log(error);
    }
  }

  async register(user){
    try {
      const { email, password } = user;
      const existUser = await this.getByEmail(email);
      if (!existUser) {
        const newUser = await this.create({...user, password: createHash( password)});
        
        //creamos nuevo carrito
        const newCart = new CartsModel();
        await newCart.save();
        
        //asignamos carrito al usuario
        newUser.cart= newCart._id;
        await newUser.save();

        const token = this.#generateToken(newUser);
        return token;
      } else return false;
    } catch (error) {
      console.log(error);      
    }
  }

  async login(user){
    try {
      const { email, password } = user;
      const existUser = await this.getByEmail(email);//.populate('carts._id');
      if (existUser) {
        const passValid = isValidPassword(existUser, password);
        if(!passValid) return false
        else {
          const token = this.#generateToken(existUser);
          return token;
        }
      } return false;     
    } catch (error) {
      console.log(error);
    }
  }
}