import RSVP from 'rsvp';
import $ from 'jquery';
import { isNone } from '@ember/utils';
import AssetMap from '../services/asset-map';
import Configuration from '../config/environment';
import { warn } from '@ember/debug';

export function initialize(app) {
  app.deferReadiness();

  const useAssetMap = isNone(Configuration.theme.useAssetMap) ?
    Configuration.environment === 'production' :
    Configuration.theme.useAssetMap;

  if (!useAssetMap) {
    app.register('service:asset-map', AssetMap);
    app.advanceReadiness();
    return;
  }

  const promise = new RSVP.Promise((resolve, reject) => {
    $.getJSON('/assets/assetMap.json', resolve).fail(reject);
  });

  promise
    .then(
      (map = {}) => {
        const prepend = Configuration.theme.assetPrepend || map.prepend;
        AssetMap.reopen({
          assetMapHash: map.assets,
          prepend,
          enabled: true
        });
      },
      (/* reason */) => {
        warn('Error loading assetMap.json. Did you forget to set:\nfingerprint: {\n fingerprintAssetMap=true\n}\nin your ember-cli-build file?',
          { id: 'ember-theme-changer.asset-map' });
      })
    .then(() => {
      app.register('service:asset-map', AssetMap);
      app.advanceReadiness();
    });
}

export default {
  name: 'asset-map',
  initialize
};
