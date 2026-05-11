import { Injectable } from "@nestjs/common";

/**
 * CommonService provides utility helpers shared across feature modules.
 *
 * TODO (contributor): Add a paginate() helper that wraps TypeORM findAndCount
 *   results in a consistent { data, total, page, limit } shape.
 * TODO (contributor): Add a sanitize() helper using class-transformer to strip
 *   sensitive fields from response objects.
 * TODO (contributor): Add a buildCid() helper once the IPFS content-addressing
 *   scheme is finalised.
 */
@Injectable()
export class CommonService {}
