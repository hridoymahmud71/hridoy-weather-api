// src/services/pagination.service.ts
import { Model, Document, FilterQuery, QueryOptions } from 'mongoose';

export class PaginationService {
  async paginateResults<T extends Document>(
    model: Model<T>,
    pageNumber: number,
    pageSize: number,
    filters?: FilterQuery<T>,
    options?: QueryOptions,
  ): Promise<T[]> {
    const offset = (pageNumber - 1) * pageSize;

    let query = model.find(filters || {});
    if (options) {
      query = query.setOptions(options);
    }
    const results = await query.skip(offset).limit(pageSize).exec();

    return results;
  }
}
