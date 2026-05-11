import { HealthService } from './health.service';

describe('HealthService', () => {
  it('reports the API as healthy', () => {
    const service = new HealthService();

    expect(service.check()).toEqual({
      status: 'ok',
      service: 'opencred-api',
    });
  });
});
