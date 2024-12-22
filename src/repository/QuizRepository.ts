import { IQuiz, quizModel } from '../model/Quiz';
import BaseRepository from './BaseRepository';

class QuizRepository extends BaseRepository<IQuiz> {
  constructor() {
    super(quizModel);
  }
}

export default QuizRepository;
