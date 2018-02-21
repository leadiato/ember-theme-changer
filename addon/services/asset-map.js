import Service from '@ember/service';
import { debug, warn } from '@ember/debug';
import { isNone } from '@ember/utils';


export default Service.extend({
  enabled: false,
  assetMapHash: null,
  prepend: '/',

  resolve(name) {
    const map = this.get('assetMapHash');
    let resolvedName;

    if (this.get('enabled')) {
      if (isNone(map[name])) {
        warn(`No mapped asset found for: ${name}`,
          { id: 'ember-theme-changer.asset-map' });
        return null;
      }
      resolvedName = map[name];
      debug(`Asset resolved name: ${resolvedName} (source: ${name})`);
    } else {
      resolvedName = name;
    }

    return this.get('prepend') + resolvedName;
  }
});
