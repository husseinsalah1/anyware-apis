import { Document, FilterQuery, UpdateQuery } from "mongoose";
import BaseRepository, { FindAllOptions } from "../repository/BaseRepository";
import bcrypt from "bcrypt";

class BaseService<T extends Document> {
  private repository: BaseRepository<T>;

  constructor(repository: BaseRepository<T>) {
    this.repository = repository;
  }

  async create(data: any): Promise<T> {
    return this.repository.create(data);
  }

  async findAll(
    findObject: FilterQuery<T> = {},
    options: FindAllOptions = {},
    populateObject: { path: string; select: string } = { path: "", select: "" }
  ) {
    const resultArray = await this.repository.findAll(
      findObject,
      options,
      populateObject
    );
    const count = await this.repository.count(findObject);
    console.log(count);
    return {
      success: true,
      code: 200,
      count: count,
      result: resultArray,
    };
  }

  async findOne(findObject: FilterQuery<T>) {
    const data = await this.repository.findOne(findObject);
    if (!data) {
      return null;
    }
    return {
      success: true,
      code: 200,
      result: data,
    };
  }

  async update(
    _id: string,
    updatedData: UpdateQuery<T>,
    populateObject: { path: string; select: string } = { path: "", select: "" }
  ) {
    return this.repository.update({ _id }, updatedData, populateObject);
  }

  async delete(_id: string) {
    const data = await this.repository.delete({ _id });
    if (!data) {
      return null;
    }
    return {
      success: true,
      code: 200,
      result: "Deleted successfully",
    };
  }
  async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  }

  async count(findObject: FilterQuery<T>) {
    return this.repository.count(findObject);
  }
}

export default BaseService;
