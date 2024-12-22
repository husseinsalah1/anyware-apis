import BaseController from './BaseController';
import AnnouncementService from '../service/AnnouncementService';
import AnnouncementRepository from '../repository/AnnouncementRepository';
import { IAnnouncement } from '../model/Announcement';

class AnnouncementController extends BaseController<IAnnouncement> {
  constructor(service: AnnouncementService) {
    super(service);
    this.createAnnouncement = this.createAnnouncement.bind(this);
  }
  async createAnnouncement(req: any, res: any) {
    const data = {
      ...req.body,
      createdBy: req.tokenData?._id,
    };
    const quiz = await this.service.create(data);
    res.status(201).json(quiz);
  }
}

export default new AnnouncementController(new AnnouncementService(new AnnouncementRepository()));
