import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';


@Injectable()
export class AppService {
   constructor(private configService: ConfigService,
    private httpService: HttpService
   ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async getToken() {
    const url = `${this.configService.get<string>('URL_BACKEND')}/auth-lead/get-token`;

    const body = {
      credential: {
        client: this.configService.get<string>('CLIENT'),
        secret: this.configService.get<string>('SECRET'),
      }
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, body)
      );
      console.log('log res',response.data);
      
      return response.data;
    } catch (error) {
      console.error('Error al obtener token:', error.response?.data || error.message);
      throw error;
    }
  }
}
