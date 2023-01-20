import { Injectable } from '@nestjs/common';
import { TaskStatus, UserRole } from '@taskforce/shared-types';
import axios from 'axios';
import { PERFORMER_URL, TASK_URL, USER_URL } from './app-constant';

@Injectable()
export class AppService {
  async findUser(id: string, req){
    const api = axios.create({
          headers: {'Authorization': `${req.rawHeaders[3]}`}
        });

    const {data: existUser} = await api.get(`${USER_URL}/${id}`);

    if (existUser.role === UserRole.Performer) {
      const userResponds = await Promise.all([
        axios.get(`${PERFORMER_URL}?userId=${id}&statusWork=failed`),
        axios.get(`${PERFORMER_URL}?userId=${id}&statusWork=completed`)
      ]);

      const userRespondsFailed = userResponds[0].data.length;
      const userRespondsCompleted = userResponds[1].data.length;

      return {
        ...existUser,
        successedTasks: userRespondsCompleted,
        failedTasks: userRespondsFailed
      }
    }

    const {data: tasks} = await api.get(`${TASK_URL}/mytask`);

    return {
      ...existUser,
      tasks: tasks?.length,
      newTasks: tasks?.filter(task => task.status === TaskStatus.New).length
    };
  }
}
