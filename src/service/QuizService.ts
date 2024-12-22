import BaseService from './BaseService';
import QuizRepository from '../repository/QuizRepository';
import { IQuiz } from '../model/Quiz';

class QuizService extends BaseService<IQuiz> {
  private quizRepository: QuizRepository;

  constructor(quizRepository: QuizRepository) {
    super(quizRepository);
    this.quizRepository = quizRepository;
  }
}

export default QuizService;
