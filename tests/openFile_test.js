const fileNames = require('../test-data/fileNames.json');
const OpenFilePage = require('../pages/OpenFilePage');
const ViewFilePage = require('../pages/ViewFilePage');

Feature('Open File Viewer');

fileNames.forEach(({ fileName, expect }) => {
  Scenario(`${expect ? 'Should open' : 'Should not find'}: ${fileName}`, async ({ I }) => {
    const openFilePage = new OpenFilePage(I);
    const viewFilePage = new ViewFilePage(I);

    I.amOnPage('http://r2.3dviewer.anybim.vn/autoTest');
    // ✅ Log để kiểm tra bạn có vào được trang không
    // await I.logCurrentUrl();

    I.waitForInvisible('.background-loading', 10);

    await openFilePage.search(fileName);
    I.wait(2);

    if (!expect) {
      I.dontSeeElement('mat-list-item');
      return;
    }

    I.seeElement('mat-list-item');
    openFilePage.clickItem(0);
    openFilePage.verifySelected(fileName);
    openFilePage.clickView();
    openFilePage.waitForViewerURL();
    await I.logCurrentUrl();

    viewFilePage.waitForFileName();
    const fileNameInView = await viewFilePage.grabFileName();
    await I.assertContainsIgnoreCase(fileNameInView, fileName);
  });
});
