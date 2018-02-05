import RSVP from 'rsvp';
import $ from 'jquery';
import AssetMap from '../services/asset-map';
import Configuration from '../config/environment';

export function initialize(app) {
  app.deferReadiness();

  // TODO: use isProductionLike
  // Eg. staging is production like
  if (!(Configuration.environment === "production")) {
    app.register('service:asset-map', AssetMap);
    app.advanceReadiness();
    return;
  }

  const promise = new RSVP.Promise((resolve, reject) => {
    $.getJSON('assets/assetMap.json', resolve).fail(reject);
  });

  promise.then((map = {}) => {
    AssetMap.reopen({
      assetMapHash: map.assets,
      prepend: map.prepend,
      enabled: true
    });
  }).then(() => {
    app.register('service:asset-map', AssetMap);
    app.advanceReadiness();
  });
}

export default {
  name: 'asset-map',
  initialize: initialize
};
