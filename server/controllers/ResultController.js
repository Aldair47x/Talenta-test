import ResultService from '../services/ResultService';
import Util from '../utils/Utils';

const util = new Util();

class ResultController {
  static async getAll(req, res) {
    try {
      const allResults = await ResultService.getAll();
      if (allResults.length > 0) {
        util.setSuccess(200, 'Results retrieved', allResults);
      } else {
        util.setSuccess(200, 'No result found');
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async add(req, res) {
    if (!req.body.score || !req.body.name ) {
      util.setError(400, 'Please provide complete details');
      return util.send(res);
    }
    const newResult = req.body;
    try {
      const createdBook = await ResultService.add(newResult);
      util.setSuccess(201, 'Result Added!', createdBook);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async update(req, res) {
    const alteredResult = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }
    try {
      const updateResult = await ResultService.update(id, alteredResult);
      if (!updateResult) {
        util.setError(404, `Cannot find Result with the id: ${id}`);
      } else {
        util.setSuccess(200, 'Result updated', updateResult);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getOne(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }

    try {
      const result = await ResultService.getOne(id);

      if (!result) {
        util.setError(404, `Cannot find result with the id ${id}`);
      } else {
        util.setSuccess(200, 'Found result', result);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deleteResult(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value');
      return util.send(res);
    }

    try {
      const resultToDelete = await ResultService.deleteResult(id);

      if (resultToDelete) {
        util.setSuccess(200, 'Result deleted');
      } else {
        util.setError(404, `Result with the id ${id} cannot be found`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

export default ResultController;