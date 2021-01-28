import { templates } from "./actions/tests";

export class Tester {
  getTemplateTests() {
    return templates;
  }

  addTemplateTests(key: string, value: any) {
    templates[key] = value;
  }
}
