import UserServices from "../service/UserService";
import BaseController from "./BaseController";
import UserRepository from "../repository/UserRepository";
import { IUser } from "../model/User";

class UserController extends BaseController<IUser> {
  constructor(service: UserServices) {
    super(service);
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  async login(req: any, res: any) {
    const { email, password } = req.body;
    const result = await (this.service as UserServices).login(email, password);
    res.status(result.code).json(result);
  }

  async register(req: any, res: any) {
    const user: IUser = req.body;
    const result = await (this.service as UserServices).register(user);
    res.status(result.code).json(result);
  }
}

export default new UserController(new UserServices(new UserRepository()));
