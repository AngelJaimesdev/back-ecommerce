import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getToken(): Promise<any> {
      const url = `${this.configService.get<string>('URL_BACKEND')}/auth-bop/get-token`;


    const body = {
      credential: {
        client: this.configService.get<string>('Client'),
        secret: this.configService.get<string>('Secret'),
      },
      data: {
        orderId: 'ORD-20250529-001',
        totalAmount: 150000,
        items: [
          {
            sku: 'SKU-001',
            name: 'Zapatos',
            price: 75000,
            quantity: 2,
          },
          {
            sku: 'SKU-002',
            name: 'carro',
            price: 25000,
            quantity: 1,
          },
        ],
        callbackUrl: 'https://x.com/home',
        redirectionUrl: 'https://www.youtube.com/',
      },
    };

    console.log('Enviando credenciales:', body.credential);
    console.log('URL:', url);
    
    

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error al obtener el token:', errorData);
        throw new Error(`HTTP error ${response.status}: ${errorData.message || 'Unknown error'}`);
      }

      const data = await response.json();
      console.log('Token:', data);
      return data;
    } catch (err) {
      console.error('Error en la petición fetch:', err);
      throw err;
    }
  }

  // async getToken() {
  //   const url = `${this.configService.get<string>('URL_BACKEND')}/auth-bop/get-token`;

    
  //   const body = {
  //     credential: {
  //       client: this.configService.get<string>('Client'),
  //       secret: this.configService.get<string>('Secret'),
  //     },
  //     data: {
  //       orderId: 'ORD-20250529-001',
  //       totalAmount: 150000,
  //       items: [
  //         {
  //           sku: 'SKU-001',
  //           name: 'Zapatos',
  //           price: 75000,
  //           quantity: 2,
  //         },
  //         {
  //           sku: 'SKU-002',
  //           name: 'carro',
  //           price: 25000,
  //           quantity: 1,
  //         },
  //       ],
  //       callbackUrl: 'rrrrr',
  //       redirectionUrl: 'tttttt',
  //     },
  //   };

  //   console.log('Enviando credenciales:', body);
  //   console.log('URL:', url);

  //   try {
  //     const response = await firstValueFrom(
  //       this.httpService.post(url, body, {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Accept': 'application/json',
  //         },
  //         timeout: 8000,
  //       }),
  //     );

  //     console.log('Token recibido:', response.data);
  //     return response.data;
  //   } catch (error) {
  //     const status = error.response?.status;
  //     const data = error.response?.data;

  //     console.error('Error al obtener token:', {
  //       status,
  //       data,
  //       message: error.message,
  //     });

  //     throw new Error(
  //       `Fallo al obtener token: ${status || ''} ${
  //         data?.message || error.message
  //       }`,
  //     );
  //   }
  // }
}