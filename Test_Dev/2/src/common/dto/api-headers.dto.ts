import { ApiProperty } from '@nestjs/swagger';

export class StandardApiHeadersDto {
  @ApiProperty({
    description: 'Unique message id',
    required: true,
    example: '1234',
  })
  messageId: string;

  @ApiProperty({
    description: 'Send Date/Time from Source System',
    required: true,
    format: 'date-time',
    example: '2011-12-30T23:59:59Z',
  })
  sentDateTime: string;
}
