import { LegelXgenMobileAppPage } from './app.po';

describe('legel-xgen-mobile-app App', () => {
  let page: LegelXgenMobileAppPage;

  beforeEach(() => {
    page = new LegelXgenMobileAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
