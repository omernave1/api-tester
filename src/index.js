import { templates } from './actions/tests';

function run() {
  console.log('hello');
}

// function addTestTemplates(key, value) {
//     if (!templates[key]) {
//         templates[key] = value;
//     } else {
//         throw new Error('Temp with this name already exists')
//     }
// }
//
// function getTestTemplates() {
//     return templates;
// }

module.exports = {
  run: run,
  templates
};
