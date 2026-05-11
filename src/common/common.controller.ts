import { Controller, Get } from "@nestjs/common";

/**
 * CommonController is intentionally thin.
 * It exists as a structural placeholder for any platform-wide utility endpoints
 * that do not belong to a specific domain module.
 *
 * TODO (contributor): Consider whether any shared endpoints are needed here, or
 *   remove this controller if all utility concerns live in other modules.
 */
@Controller()
export class CommonController {
  /** Minimal root endpoint — most traffic routes to /api/health instead. */
  @Get()
  root(): { name: string; docs: string } {
    return {
      name: "opencred-api",
      // TODO (contributor): Replace with real docs URL once Swagger is configured.
      docs: "/api/health",
    };
  }
}
