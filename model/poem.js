const AV = require('../utils/av-weapp-min');

class Poem extends AV.Object {
  get id() {
    return this.get('id');
  }
  set id(value) {
    this.set('id', value);
  }

  get pid() {
    return this.get('pid');
  }
  set pid(value) {
    this.set('pid', value);
  }

  get title() {
    return this.get('title');
  }
  set title(value) {
    this.set('title', value);
  }
  get author() {
    return this.get('author');
  }
  set author(value) {
    this.set('author', value);
  }

  get dynasty() {
    return this.get('dynastyid');
  }
  set dynasty(value) {
    this.set('dynasty', value);
  }

  get category() {
    return this.get('category');
  }
  set category(value) {
    this.set('category', value);
  }

  get stage() {
    return this.get('stage');
  }
  set stage(value) {
    this.set('stage', value);
  }

  get textbook() {
    return this.get('textbook');
  }
  set textbook(value) {
    this.set('textbook', value);
  }

  get series() {
    return this.get('series');
  }
  set series(value) {
    this.set('series', value);
  }

  get reference() {
    return this.get('reference');
  }
  set reference(value) {
    this.set('reference', value);
  }

  get digest() {
    return this.get('digest');
  }
  set digest(value) {
    this.set('digest', value);
  }

  get content() {
    return this.get('content');
  }
  set content(value) {
    this.set('content', value);
  }

  get voice() {
    return this.get('voice');
  }
  set voice(value) {
    this.set('voice', value);
  }
}

AV.Object.register(Poem, 'Poem');
module.exports = Poem;