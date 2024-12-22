import BaseController from "./BaseController";
import QuizService from "../service/QuizService";
import QuizRepository from "../repository/QuizRepository";
import { IQuiz } from "../model/Quiz";

class QuizController extends BaseController<IQuiz> {
  constructor(service: QuizService) {
    super(service);
    this.createQuiz = this.createQuiz.bind(this);
  }
  async createQuiz(req: any, res: any) {
    const data = {
      ...req.body,
      createdBy: req.tokenData?._id,
    };
    const quiz = await this.service.create(data);
    res.status(201).json(quiz);
  }
}

export default new QuizController(new QuizService(new QuizRepository()));
