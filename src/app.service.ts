import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Api em fase de criação, pode ter bugs... SORRY! hehe! beba café ☕ #CAOS';
  }
}
