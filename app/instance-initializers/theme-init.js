export function initialize(applicationInstance) {
  const themes = applicationInstance.lookup('service:theme-changer');
  themes._generateStyleTag();
}

export default {
  name: 'ember-theme-changer-init',
  initialize
};
