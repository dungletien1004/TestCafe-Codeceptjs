class ViewFilePage {
    constructor(I) {
      this.I = I;
      this.selector = '.custom-center-top-button .content-top-button';
    }
  
    waitForFileName() {
      this.I.waitForFunction(
        (selector) => document.querySelector(selector)?.innerText !== 'File name',
        [this.selector],
        20
      );
    }
  
    async grabFileName() {
      return await this.I.grabTextFrom(this.selector);
    }
  }
  
  module.exports = ViewFilePage;
  