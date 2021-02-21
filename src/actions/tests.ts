import supertest from 'supertest';
const retry = require('jest-retries');

export const templates: any = {
  default: (options: any) => {
    test(`${options.title ?? options.path}`, async () => {
      const request = supertest(`https://${options.host}`);
      const response = await request
        .get(options.path)
        .set(options.headers || {})
        .send(options.body || {});

      const expectation = options.expect;
      expectation.forEach((e: any) => {
        const keyArr = e.key.split('.');

        let compVal: any = response;
        keyArr.forEach(k => {
          compVal = compVal[k];
        });

        eval(`expect(compVal).${e.verb}(e.value);`)
      });
    });
  },
  rateLimitPerSecond: (options: any) => {
    retry(`${options.title ?? options.path}`, 3, async () => {
      const request = supertest(`https://${options.host}`);

      let responses = [];

      for (let i = 0; i < options.max + 1; i++) {
        responses.push(request.get(options.path).set(options.headers ?? {}));
      }

      responses = (await Promise.all(responses)).filter(
        (x) => x.status === 429
      );

      expect(responses.length).toBeGreaterThan(0);
    });
  },
  rateLimitPerMinute: (options: any) => {
    const totalRuns = (options.max / options.perSecond) * 2;

    retry(`${options.title ?? options.path}`, totalRuns, async () => {
      await new Promise((r) => setTimeout(r, 1000));

      const request = supertest(`https://${options.host}`);

      let responses = [];

      for (let i = 0; i < options.perSecond - 1; i++) {
        responses.push(request.get(options.path).set(options.headers ?? {}));
      }

      responses = (await Promise.all(responses)).filter(
        (x) => x.status === 429
      );

      expect(responses.length).toBeGreaterThan(0);
    });
  }
};
