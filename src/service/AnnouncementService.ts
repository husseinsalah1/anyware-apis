import BaseService from './BaseService';
import AnnouncementRepository from '../repository/AnnouncementRepository';
import { IAnnouncement } from '../model/Announcement';

class AnnouncementService extends BaseService<IAnnouncement> {
  private announcementService: AnnouncementRepository;

  constructor(announcementService: AnnouncementRepository) {
    super(announcementService);
    this.announcementService = announcementService;
  }
}

export default AnnouncementService;
