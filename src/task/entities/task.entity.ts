import { User } from 'src/user/entities/user.entity';

export class Task {
  id?: number;
  title: string;
  created_at: Date;
  delivery_date?: Date;
  done?: boolean;
  membersTask?: User[];
}
