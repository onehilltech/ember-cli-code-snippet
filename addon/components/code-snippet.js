import Component from '@glimmer/component';
import { action, getWithDefault } from '@ember/object';
import { isPresent } from '@ember/utils';
import { tracked } from "@glimmer/tracking";
import { htmlSafe } from '@ember/template';

import hljs from 'highlight.js';
import Clipboard from 'clipboard';

function noop () { }

export default class CodeSnippetComponent extends Component {
  get languageClassName () {
    return isPresent (this.args.lang) ? `language-${this.args.lang}` : undefined;
  }

  @tracked
  copied;

  @action
  didInsertCode (element) {
    this.copied = false;

    const code = element.textContent;
    const language = this.lang;

    // Highlight the code.
    this.highlight = hljs.highlight (code, { language });
    element.innerHTML = this.highlight.value;
  }

  @action
  didInsertCopyButton (element) {
    const snippet = this;

    this._clipboard = new Clipboard (element, {
      text () {
        return snippet.highlight.code;
      }
    });

    this._clipboard.on ('success', () => {
      snippet.copied = true;

      setTimeout (() => {
        snippet.copied = false;
      }, 5000);

      this.success (snippet);
    });

    this._clipboard.on ('error', () => {
      this.error (snippet);
    });
  }

  get success () {
    return this.args.success || noop;
  }

  get error () {
    return this.args.error || noop;
  }

  willDestroy () {
    super.willDestroy ();

    if (isPresent (this._clipboard)) {
      this._clipboard.destroy ();
    }
  }

  get languageName () {
    return hljs.getLanguage (this.lang).name;
  }

  get lang () {
    return this.args.lang || (isPresent (this.highlight) ? this.highlight.language : undefined);
  }

  get showLanguageName () {
    return getWithDefault (this.args, 'showLanguageName', true);
  }

  get enableCopyButton () {
    return getWithDefault (this.args, 'enableCopyButton', true);
  }

  get copyButtonLabel () {
    return this.copied ? 'Copied!' : (this.args.copyButtonLabel || 'Copy');
  }
}
