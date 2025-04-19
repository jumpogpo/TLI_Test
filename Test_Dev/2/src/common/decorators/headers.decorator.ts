import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ClassConstructor } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { Request } from 'express';

export const RequestHeader = createParamDecorator(
  async (value: ClassConstructor<unknown>, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const headers = request.headers;
    const dto = plainToClass(value, headers, { excludeExtraneousValues: true });
    await validateOrReject(dto as object);
    return dto;
  },
);
