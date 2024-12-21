import BaseRepository from "./BaseRepository";
import { IUser, userModel } from "../model/User";

class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(userModel);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return this.findOne({ email });
  }
}

export default UserRepository;
