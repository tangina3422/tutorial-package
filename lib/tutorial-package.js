'use babel';

import TutorialPackageView from './tutorial-package-view';
import { CompositeDisposable } from 'atom';

export default {

  tutorialPackageView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.tutorialPackageView = new TutorialPackageView(state.tutorialPackageViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.tutorialPackageView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'tutorial-package:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.tutorialPackageView.destroy();
  },

  serialize() {
    return {
      tutorialPackageViewState: this.tutorialPackageView.serialize()
    };
  },

  toggle() {
    console.log('TutorialPackage was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
