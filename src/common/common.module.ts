import { Module } from "@nestjs/common";
import { CommonController } from "./common.controller";
import { CommonService } from "./common.service";

/**
 * CommonModule provides shared utilities, cross-cutting concerns, and
 * infrastructure primitives used by all feature modules.
 *
 * Subdirectory guide for contributors
 * ------------------------------------
 * decorators/   — Custom NestJS parameter and class decorators
 *                 (e.g. @CurrentUser(), @Roles())
 * filters/      — Global and module-scoped exception filters
 *                 (e.g. HttpExceptionFilter, AllExceptionsFilter)
 * guards/       — Reusable guards (e.g. JwtAuthGuard, RolesGuard)
 * interceptors/ — Request/response interceptors
 *                 (e.g. TransformInterceptor, LoggingInterceptor)
 * pipes/        — Shared validation and transformation pipes
 *                 (e.g. ParseUlidPipe, TrimStringsPipe)
 *
 * TODO (contributor): Move JwtAuthGuard here once AuthModule implements it and
 *   export it so all feature modules can protect their routes uniformly.
 * TODO (contributor): Add a global HttpExceptionFilter in filters/ and
 *   register it in main.ts via app.useGlobalFilters().
 * TODO (contributor): Add a TransformInterceptor in interceptors/ to wrap all
 *   responses in a consistent { data, meta } envelope.
 */
@Module({
  controllers: [CommonController],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
