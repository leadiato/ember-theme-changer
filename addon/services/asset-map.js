import Ember from 'ember';

export default Ember.Service.extend({
  enabled: false,
  assetMapHash: null,
  prepend: '/',

  resolve(name) {
    let map = this.get('assetMapHash');

    return this.get('prepend') + (this.get('enabled') ? map[name] : name);
  }
});
