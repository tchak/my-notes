import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class extends Component {
  @service store;

  @action removeNote(id) {
    this.store.removeNote(id);
  }
}
