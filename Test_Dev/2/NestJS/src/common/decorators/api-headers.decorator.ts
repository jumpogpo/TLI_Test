import { applyDecorators } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';

export function ApiStandardHeaders() {
  return applyDecorators(
    ApiHeader({
      name: 'messageId',
      description: 'Unique message id',
      required: true,
      schema: {
        type: 'string',
        example: '1234',
      },
    }),
    ApiHeader({
      name: 'sentDateTime',
      description: 'Send Date/Time from Source System',
      required: true,
      schema: {
        type: 'string',
        format: 'date-time',
        example: '2011-12-30T23:59:59Z',
      },
    }),
  );
}
