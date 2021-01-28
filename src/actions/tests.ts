import supertest from 'supertest';

export const templates = {
  default: (options) => {
    test(`${options.title ?? options.path}`, async () => {
      const request = supertest(`https://${options.host}`);
      const response = await request.get(options.path).set(options.headers);

      const expectation = options.expect;
      Object.keys(expectation).forEach(key => {
        const keyArr = key.split('.');

        let compVal = response;
        keyArr.forEach(k => {
          compVal = compVal[k];
        });

        expect(compVal).toEqual(expectation[key]);
      })
    });
  }
};
