import Ember from 'ember';
// import AssetMap from './asset-map';

const {
  Service,
  Evented,
  warn,
  isEmpty,
  isArray,
  getOwner,
  computed,
  inject: { service }
} = Ember;

const LINK_TAG_ID = 'ember-theme-changer-stylesheet';

export default Service.extend(Evented, {
  assetMap: service(),
  cookies: service(),
  _themeName: null,
  defaultTheme: null,
  cookieName: 'ember-theme-changer__current-theme',
  eventName: 'ember-theme-changer__theme-changed',
  themes: [],

  // @private
  init() {
    this._super(...arguments);
    const owner = getOwner(this);
    const ENV = owner.factoryFor('config:environment').class;

    let defaultTheme = null;
    if (!ENV.theme) {
      warn('Ember-theme-changer did not find a theme configuration.\neg: themes: { themes: [\'theme1\', \'theme2\',...] }.', false,
        { id: 'ember-theme-changer.theme' });
    } else {
      if (ENV.theme.themes == null) {
        warn('Ember-theme-changer did not find themes in your environment file.\neg: themes: { themes: [\'theme1\', \'theme2\',...] }.',
          false,
          { id: 'ember-theme-changer.themes' });
      } else if (isEmpty(ENV.theme.themes)) {
        warn('Ember-theme-changer requires themes to be defined. Please add an array of supported themes in your Environment file.\neg: themes: { themes: [\'theme1\', \'theme2\',...] }.', false,
          { id: 'ember-theme-changer.themes.empty' });
      } else if (!isArray(ENV.theme.themes)) {
        warn('Ember-theme-changer requires the themes configuration to be an array. Please add an array of supported themes in your Environment file.\neg: themes: { themes: [\'theme1\', \'theme2\',...] }.',
          false,
          { id: 'ember-theme-changer.themes.array' });
      } else {
        this.set('themes', ENV.theme.themes);
        defaultTheme = (ENV.theme || {}).defaultTheme;
        if (defaultTheme == null) {
          defaultTheme = ENV.theme.themes.get('firstObject');
          warn(`ember-theme-changer did not find a default theme; falling back to "${defaultTheme}".`,
            false, {
              id: 'ember-theme.changer.default-theme'
            });
        } else {
          if (!ENV.theme.themes.includes(defaultTheme)) {
            const firstTheme = ENV.theme.themes.get('firstObject');
            warn(`ember-theme-changer, default theme '${defaultTheme}' is not listed as part of the themes list: '${ENV.theme.themes}'. Defaulting to '${firstTheme}'.`,
              false, {
                id: 'ember-theme.changer.invalid-default-theme'
              });
            defaultTheme = firstTheme;
          }
        }
        this.set('defaultTheme', defaultTheme);

        // let { cookieName, eventName } = this.getProperties('cookieName', 'eventName');
        if (!isEmpty(ENV.theme.cookieName)) {
          this.set('cookieName', ENV.theme.cookieName);
        }
        if (!isEmpty(ENV.theme.eventName)) {
          this.set('eventName', ENV.theme.eventName);
        }

      }
    }
  },

  // @private
  _generateStyleTag() {

    const headTag = document.head;
    const linkTag = document.createElement('link');
    linkTag.id = LINK_TAG_ID;
    linkTag.rel = 'stylesheet';

    const { cookies, cookieName, defaultTheme } = this.getProperties('cookies', 'cookieName', 'defaultTheme');

    const themeValue = cookies.read(cookieName) || defaultTheme;

    if (!isEmpty(themeValue)) {
      linkTag.href = this.get('assetMap').resolve(`assets/${themeValue}.css`);
      this.trigger('theme-changed', themeValue);
    }

    headTag.appendChild(linkTag);
  },

  // @public
  onThemeChanged(callback) {
    const eventName = this.get('eventName');
    this.on(eventName, callback);
  },

  // @public
  offThemeChanged() {
    const eventName = this.get('eventName');
    this.off(eventName);
  },

  // @public
  toggleTheme() {
    const { themes, theme } = this.getProperties('themes', 'theme');
    const currentIndex = themes.indexOf(theme);
    let newTheme = null;
    if (currentIndex === themes.length - 1) {
      newTheme = themes.get(0);
    } else {
      newTheme = themes.get(currentIndex + 1);
    }

    this.set('theme', newTheme);
  },

  // @public
  theme: computed({
    get() {
      const { cookies, cookieName } = this.getProperties('cookies', 'cookieName');
      let themeValue = cookies.read(cookieName);
      if (isEmpty(themeValue)) {
        themeValue = this.get('defaultTheme');

        if (!isEmpty(themeValue)) {
          // no theme saved. Using and saving default theme:
          cookies.write(cookieName, themeValue, { path: '/', expires: 'Fri, 31 Dec 9999 23:59:59 GMT' });
          const eventName = this.get('eventName');
          this.trigger(eventName, themeValue);
        }
      }
      return themeValue;
    },
    set(key, value) {
      const { cookies, cookieName, eventName } = this.getProperties('cookies', 'cookieName', 'eventName');

      // 1- Update the theme value in the cookie
      cookies.write(cookieName, value, { path: '/', expires: 'Fri, 31 Dec 9999 23:59:59 GMT' });
      // 2- Uploading the new style
      document.getElementById(LINK_TAG_ID).setAttribute('href', this.get('assetMap').resolve(`assets/${value}.css`));
      // 3- Triggering theme-change notification
      this.trigger(eventName, value);

      return value;
    }
  })
});
