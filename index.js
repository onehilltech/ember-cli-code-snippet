'use strict';

module.exports = {
  name: require('./package').name,

  contentFor (type, config) {
    this._super (...arguments);

    if (type === 'head-footer') {
      const codeSnippetConfig = config['ember-cli-code-snippet'] || {};
      const { style = 'default' } = codeSnippetConfig;
    }
  }
};
