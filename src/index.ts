import { templates } from "./actions/tests";

function getTemplateTests() {
  return templates;
}

function addTemplateTests(key: string, value: any) {
  templates[key] = value;
}

export default {
  getTemplateTests,
  addTemplateTests
};
