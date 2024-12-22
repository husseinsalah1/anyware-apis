import { announcementModel, IAnnouncement } from '../model/Announcement';
import BaseRepository from './BaseRepository';

class AnnouncementRepository extends BaseRepository<IAnnouncement> {
  constructor() {
    super(announcementModel);
  }
}

export default AnnouncementRepository;
