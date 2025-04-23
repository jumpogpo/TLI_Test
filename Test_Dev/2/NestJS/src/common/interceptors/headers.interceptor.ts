import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Request, Response } from 'express';
import { throwError } from 'rxjs';

@Injectable()
export class HeadersInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    const messageid = request.headers['messageid'] as string;
    const sentdatetime = request.headers['sentdatetime'] as string;

    if (messageid) {
      response.setHeader('messageId', messageid);
    }

    if (sentdatetime) {
      response.setHeader('sentDateTime', sentdatetime);
    }

    response.setHeader('responseDateTime', new Date().toISOString());
    return next.handle().pipe(
      catchError((err: Error) => {
        return throwError(() => err);
      }),
    );
  }
}
