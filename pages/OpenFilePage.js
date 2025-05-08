class OpenFilePage {
    constructor(I) {
      this.I = I;
      this.selectors = {
        loading: '.background-loading',
        searchInput: '#search',
        item: (index) => locate('mat-list-item').at(index + 1), // CodeceptJS index bắt đầu từ 1
        viewButton: locate('.selected-file-lists').find('mat-card-footer button').withText('View'),
        selectedFile: (name) => locate('.selected-file-lists .filename').withText(name)
      };
    }
  
    async search(fileName) {
      this.I.fillField(this.selectors.searchInput, fileName);
    }
  
    /**
     * Click vào item theo index (0-based index như JS thông thường)
     * @param {number} index
     */
    clickItem(index = 0) {
      this.I.click(this.selectors.item(index));
    }
  
    verifySelected(fileName) {
      this.I.seeElement(this.selectors.selectedFile(fileName));
    }
  
    clickView() {
      this.I.click(this.selectors.viewButton);
    }
  
    waitForViewerURL(expectedPart = '/main?AUTHCODE') {
      this.I.waitInUrl(expectedPart, 10);
    }
  }
  
  module.exports = OpenFilePage;
  