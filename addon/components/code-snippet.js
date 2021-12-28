import Component from '@glimmer/component';
import { action } from '@ember/object';
import { isPresent } from '@ember/utils';

import hljs from 'highlight.js';

export default class CodeSnippetComponent extends Component {
  get lang () {
    return isPresent (this.args.lang) ? `language-${this.args.lang}` : undefined;
  }

  @action
  didInsert (element) {
    hljs.highlightElement (element);
  }
}
