import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class IndexController extends Controller {
  @action
  copied () {
    alert ('Copied to clipboard!');
  }
}
