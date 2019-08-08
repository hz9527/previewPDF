var DEFAULT_URL = './test/compressed.tracemonkey-pldi-09.pdf';
// We need to delay opening until all HTML is loaded.
PDFViewerApplication.animationStartedPromise.then(function () {
  PDFViewerApplication.open({
    url: DEFAULT_URL,
  });
});