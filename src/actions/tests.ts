import supertest from 'supertest';

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
  }
};
