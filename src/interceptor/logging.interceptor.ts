import {
  Injectable,
  NestInterceptor,
  Logger,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { Observable, tap } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Graphql
    if (context.getType<GqlContextType>() === 'graphql') {
      const gqlContext = GqlExecutionContext.create(context);
      const info = gqlContext.getInfo();
      const ctx = gqlContext.getContext().req;
      const parentType = info.parentType.name;
      const fieldName = info.fieldName;
      const requestId = uuidv4();
      const message = `GraphQL - ${parentType} - ${fieldName}`;
      ctx.res.set('requestId', requestId);
      this.logger.log(`[${requestId}] Incoming - ${message}`);

      return next.handle().pipe(
        tap({
          next: (val: unknown): void => this.logNext(val, context),
        }),
      );
    }
    return next.handle();
  }

  private logNext(_: unknown, context: ExecutionContext): void {
    if (context.getType<GqlContextType>() === 'graphql') {
      const gqlContext = GqlExecutionContext.create(context);
      const info = gqlContext.getInfo();
      const parentType = info.parentType.name;
      const fieldName = info.fieldName;
      const ctx = gqlContext.getContext().req;
      const message = `GraphQL - ${parentType} - ${fieldName}`;
      const requestId = ctx.res.getHeader('requestId');
      this.logger.log(`[${requestId}] Outgoing - ${message}`);
    }
  }
}
