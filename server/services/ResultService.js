import database from '../src/models';

class ResultService {
  static async getAll() {
    try {
      return await database.Result.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async add(result) {
    try {
      return await database.Result.create(result);
    } catch (error) {
      throw error;
    }
  }

  static async update(id, updateResult) {
    try {
      const resultToUpdate = await database.Result.findOne({
        where: { id: Number(id) }
      });

      if (resultToUpdate) {
        await database.Result.update(updateResult, { where: { id: Number(id) } });

        return updateResult;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getOne(id) {
    try {
      const result = await database.Result.findOne({
        where: { id: Number(id) }
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  static async deleteResult(id) {
    try {
      const resultToDelete = await database.Result.findOne({ where: { id: Number(id) } });

      if (resultToDelete) {
        const deletedResult = await database.Result.destroy({
          where: { id: Number(id) }
        });
        return deletedResult;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default ResultService;