"use strict";



define('mobile-ui/app', ['exports', 'mobile-ui/resolver', 'ember-load-initializers', 'mobile-ui/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
define('mobile-ui/components/cdv-nav-bar', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    tagName: 'header'
  });
});
define('mobile-ui/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _welcomePage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
define('mobile-ui/helpers/app-version', ['exports', 'mobile-ui/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  var version = _environment.default.APP.version;
  function appVersion(_) {
    var hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (hash.hideSha) {
      return version.match(_regexp.versionRegExp)[0];
    }

    if (hash.hideVersion) {
      return version.match(_regexp.shaRegExp)[0];
    }

    return version;
  }

  exports.default = Ember.Helper.helper(appVersion);
});
define('mobile-ui/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
define('mobile-ui/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
define('mobile-ui/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'mobile-ui/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _config$APP = _environment.default.APP,
      name = _config$APP.name,
      version = _config$APP.version;
  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
define('mobile-ui/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('mobile-ui/initializers/data-adapter', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('mobile-ui/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
define('mobile-ui/initializers/export-application-global', ['exports', 'mobile-ui/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('mobile-ui/initializers/in-app-livereload', ['exports', 'mobile-ui/config/environment', 'ember-cli-cordova/initializers/in-app-livereload'], function (exports, _environment, _inAppLivereload) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = undefined;
  /* globals cordova */

  var inAppReload = _inAppLivereload.default.initialize;

  var initialize = exports.initialize = function initialize(app) {
    if (typeof cordova === 'undefined' || _environment.default.environment !== 'development' || _environment.default.cordova && (!_environment.default.cordova.liveReload || !_environment.default.cordova.liveReload.enabled)) {
      return;
    }

    return inAppReload(app, _environment.default);
  };

  exports.default = {
    name: 'cordova:in-app-livereload',
    initialize: initialize
  };
});
define('mobile-ui/initializers/injectStore', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('mobile-ui/initializers/store', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('mobile-ui/initializers/transforms', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("mobile-ui/instance-initializers/ember-data", ["exports", "ember-data/instance-initializers/initialize-store-service"], function (exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: "ember-data",
    initialize: _initializeStoreService.default
  };
});
define('mobile-ui/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define('mobile-ui/router', ['exports', 'mobile-ui/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {});

  exports.default = Router;
});
define('mobile-ui/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
define('mobile-ui/services/cordova', ['exports', 'ember-cli-cordova/services/cordova'], function (exports, _cordova) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _cordova.default.extend({});
});
define("mobile-ui/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "yXpA4Dro", "block": "{\"symbols\":[],\"statements\":[[0,\"Our App flu\\n\"],[0,\"\\n\"],[1,[18,\"outlet\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "mobile-ui/templates/application.hbs" } });
});
define("mobile-ui/templates/cdv-generic-nav-bar", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "A2JPDdnz", "block": "{\"symbols\":[],\"statements\":[[4,\"if\",[[19,0,[\"nav\",\"leftButton\",\"text\"]]],null,{\"statements\":[[0,\"  \"],[6,\"button\"],[3,\"action\",[[19,0,[]],\"leftButton\"]],[7],[0,\"\\n\"],[4,\"if\",[[19,0,[\"nav\",\"leftButton\",\"icon\"]]],null,{\"statements\":[[0,\"      \"],[6,\"i\"],[10,\"class\",[26,[\"icon \",[20,[\"nav\",\"leftButton\",\"icon\"]]]]],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"],[1,[20,[\"nav\",\"leftButton\",\"text\"]],false],[0,\"\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[19,0,[\"nav\",\"title\",\"text\"]]],null,{\"statements\":[[0,\"  \"],[6,\"h1\"],[7],[0,\"\\n    \"],[1,[20,[\"nav\",\"title\",\"text\"]],false],[0,\"\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[19,0,[\"nav\",\"rightButton\",\"text\"]]],null,{\"statements\":[[0,\"  \"],[6,\"button\"],[3,\"action\",[[19,0,[]],\"rightButton\"]],[7],[0,\"\\n\"],[4,\"if\",[[19,0,[\"nav\",\"rightButton\",\"icon\"]]],null,{\"statements\":[[0,\"      \"],[6,\"i\"],[10,\"class\",[26,[\"icon \",[20,[\"nav\",\"rightButton\",\"icon\"]]]]],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"],[1,[20,[\"nav\",\"rightButton\",\"text\"]],false],[0,\"\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "mobile-ui/templates/cdv-generic-nav-bar.hbs" } });
});
define("mobile-ui/templates/components/cdv-nav-bar", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "nvwgBomB", "block": "{\"symbols\":[\"&default\"],\"statements\":[[11,1],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "mobile-ui/templates/components/cdv-nav-bar.hbs" } });
});


define('mobile-ui/config/environment', ['ember'], function(Ember) {
  var prefix = 'mobile-ui';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("mobile-ui/app")["default"].create({"LOG_ACTIVE_GENERATION":true,"LOG_VIEW_LOOKUPS":true,"name":"mobile-ui","version":"0.0.0+a7f30ef3"});
}
//# sourceMappingURL=mobile-ui.map
