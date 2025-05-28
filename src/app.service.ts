import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  generateToken() {
    const credential = {
      client: '7w7OVivkvY0nBFZ2-u0g',
      secret: '4FTEE5GkLnsAiNehAm-z',
    };
  }
}
