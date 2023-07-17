export default class MongoDao {
  constructor(model){
    this.model = model;
  }

  //MongoDao seria la super clase. La clase hija estara el manager
  //antes, con paginate, linea siguiente era: async getAll(page = 1, limit = 10) {
  async getAll() {
    try {
      // const response = await this.model.paginate({}, {page, limit });
      const response = await this.model.find({});
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const response = await this.model.findById(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async create(obj) {
    try {
      const response = await this.model.create(obj);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  
  async update(id, obj) {
    try {
      await this.model.updateOne({_id: id}, obj);
      return obj;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id) {
    try {
      const response = await this.model.findByIdAndDelete(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}