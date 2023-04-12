import { Card } from '../../card/entities/card.entity';
import { User } from '../../user/entities/user.entity';

export class Desktop {
  id?: number;
  name: string;
  user_id: number;
  created_at: Date;
  link_access: string;
  card: Array<Card>;
  users: Array<User>;
}
