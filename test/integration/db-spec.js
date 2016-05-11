describe('check the app', () => {
  it('should have a passing test', () => {
    browser.get('http://localhost:5000');
    element(by.model('spookyText')).sendKeys('hello world');
    element(by.id('spookyText')).getText().then((text) => {
      expect(text).toEqual('hello world');
    });
  });
});
