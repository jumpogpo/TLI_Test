import { Expose, Transform } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class HeadersDto {
  @IsDefined()
  @IsString()
  @MinLength(1, { message: 'messageId must not be empty' })
  @MaxLength(50, { message: 'messageId must not exceed 50 characters' })
  @Expose({ name: 'messageid' })
  messageid: string;

  @IsDefined()
  @IsDate({ message: 'sentdatetime must be a valid Date object' })
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @Expose({ name: 'sentdatetime' })
  sentdatetime: Date;
}
