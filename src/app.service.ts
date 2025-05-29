import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';


@Injectable()
export class AppService {
  constructor(private configService: ConfigService,
    private httpService: HttpService
  ) { }
  getHello(): string {
    return 'Hello World!';
  }

  async getToken() {
    const url = `${this.configService.get<string>('URL_BACKEND')}/auth-lead/get-token`;

    const body = {
      credential: {
        client: this.configService.get<string>('Client'),
        secret: this.configService.get<string>('Secret'),
      }
    };

    console.log('Enviando credenciales:', body.credential);

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, body, {
          headers: {
            'Content-Type': 'application/json',
          },
          // timeout: 5000,
        })
      );

      console.log('Token recibido:', response.data);
      return response.data;
    } catch (error) {
      const status = error.response?.status;
      const data = error.response?.data;

      console.error('🔴 Error al obtener token:', {
        status,
        data,
        message: error.message,
      });

      throw new Error(`Fallo al obtener token: ${status || ''} ${data?.message || error.message}`);
    }
  }


}
