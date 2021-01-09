import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `<h1>The new boston auctioning app!</h1>`;
  }
}
