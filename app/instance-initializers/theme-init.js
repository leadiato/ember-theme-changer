export function initialize(applicationInstance) {
  let themes = applicationInstance.lookup('service:theme-changer');
  themes._generateStyleTag();
}

export default {
  name: 'ember-theme-changer-init',
  initialize: initialize
};