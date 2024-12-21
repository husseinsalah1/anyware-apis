import UserRepository from "../repository/UserRepository";
import BaseService from "./BaseService";
import bcrypt from "bcrypt";
import { IUser } from "../model/User";

class UserService extends BaseService<IUser> {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    super(userRepository);
    this.userRepository = userRepository;
  }

  // ===================== Helper Methods ===================== //
  async findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }
  async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  }

  // ===================== Main Methods ===================== //
  async login(email: string, password: string) {
    const user = await this.findByEmail(email);
    if (!user) {
      return {
        success: false,
        code: 404,
        message: "User not found",
      };
    }
    const isMatch = await this.comparePassword(password, user.password);
    if (!isMatch) {
      return {
        success: false,
        code: 400,
        message: "Invalid password",
      };
    }
    const token = await user.generateAuthToken();
    return {
      success: true,
      code: 200,
      result: user,
      token,
    };
  }

  async register(user: IUser) {
    const existingUser = await this.findByEmail(user.email);
    if (existingUser) {
      return {
        success: false,
        code: 400,
        message: "Email already exists",
      };
    }
    const newUser = await this.userRepository.create(user);
    return {
      success: true,
      code: 201,
      result: newUser,
    };
  }
}

export default UserService;
