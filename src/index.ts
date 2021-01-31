import { templates } from "./actions/tests";
import * as fs from "fs";
import * as yaml from "js-yaml";

export function addTemplateTests(tests: { [key: string] : any; }) {
  Object.keys(tests).forEach( key => {
    templates[key] = tests[key];
  })
}

export function runTests(testFiles: string[]) {
  testFiles.forEach(file => {
    const absolutePath = require('path').resolve(__dirname, file);
    const yamlFile: any = yaml.load(fs.readFileSync(absolutePath, 'utf8'));

    describe(yamlFile.title, () => {
      yamlFile.tests.forEach((options: any) => {
        const testType = options.type ?? 'default';
        templates[testType](options);
      });
    });
  });

}

export default {
  addTemplateTests,
  runTests
};
