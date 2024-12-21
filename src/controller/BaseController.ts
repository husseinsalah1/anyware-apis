import { Document } from "mongoose";
import BaseService from "../service/BaseService";

abstract class BaseController<T extends Document> {
  protected service: BaseService<T>;

  constructor(service: BaseService<T>) {
    this.service = service;
  }
}

export default BaseController;
