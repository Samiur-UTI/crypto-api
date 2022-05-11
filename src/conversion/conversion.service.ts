import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import axios from 'axios';
import { Rate } from 'src/entities/misc.entity';
@Injectable()
export class ConversionService {
  constructor(private readonly httpService: HttpService) {}
  async getConversionRate(from: string, to: string): Promise<Rate> {
    const response = await axios
      .get(process.env.CRYPTO_COMPARE_URL + `fsym=${from}&tsyms=${to}`)
      .then((res) => res.data);

    return response;
  }
}
