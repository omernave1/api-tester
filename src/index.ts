import { templates } from './actions/tests';

export function addTemplateTests(tests: { [key: string]: any }) {
  Object.keys(tests).forEach((key) => {
    templates[key] = tests[key];
  });
}

export function runTests(yamlFile: any) {
  describe(yamlFile.title, () => {
    yamlFile.tests.forEach((options: any) => {
      const testType = options.type ?? 'default';
      templates[testType](options);
    });
  });
}

export default {
  addTemplateTests,
  runTests
};
