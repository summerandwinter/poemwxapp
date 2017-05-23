const AV = require('../utils/av-weapp-min');

class Classic extends AV.Object {


  get content() {
    return this.get('content');
  }
  set content(value) {
    this.set('content', value);
  }

  get type() {
    return this.get('type');
  }
  set type(value) {
    this.set('type', type);
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

  get likes() {
    return this.get('likes');
  }
  set likes(value) {
    this.set('likes', value);
  }

  get liked() {
    return this.get('liked');
  }
  set liked(value) {
    this.set('liked', value);
  }

  get poemId() {
    return this.get('poemId');
  }
  set poemId(value) {
    this.set('poemId', value);
  }
  

}

AV.Object.register(Classic, 'Classics');
module.exports = Classic;