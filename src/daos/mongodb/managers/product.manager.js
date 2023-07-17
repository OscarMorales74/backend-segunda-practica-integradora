import MongoDao from '../mongo.dao.js';
import { ProdModel } from '../models/products.model.js';

export default class ProductManager extends MongoDao{
    constructor(){
        super(ProdModel)
    }
}