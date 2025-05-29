import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private configService: ConfigService, private httpService: HttpService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('generate-token')
  generateToken() {
    return this.appService.getToken();
  }

  @Get('proxy-token')
  async proxyToken() {
    const url = `${this.configService.get<string>('URL_BACKEND')}/auth-lead/get-token`;

    const body = {
      credential: {
        client: this.configService.get<string>('Client'),
        secret: this.configService.get<string>('Secret'),
      },
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, body)
      );
      return response.data;
    } catch (error) {
      console.error('Error en proxy-token:', error.response?.data || error.message);
      throw error;
    }
  }

}
