import { Card } from './card.entity';
import { User } from './user.entity';

export class Desktop {
  id?: number;
  name: string;
  user_id: number;
  created_at: Date;
  link_access: string;
  card: Array<Card>;
  users: Array<User>;
}
