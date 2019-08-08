(function (cdnPath, assets) {
  function loadEl(el, callback) {
    el.onload = function() {
      callback();
      el.onload = null;
    }
  }
  function injectCss(el, list, callback) {
    var fragment = document.createDocumentFragment();
    function handler(i) {
      if (i === list.length - 1 && callback) {
        callback();
      }
    }
    for (var i = 0, l = list.length; i < l; i++) {
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = cdnPath + list[i];
      fragment.appendChild(link);
      loadEl(link, (function (ind) {
        return function() {
          handler(ind);
        }
      })(i))
    }
    el.appendChild(fragment);
  }
  function injectScript(el, list) {
    var tasks = [];
    for (var i = 0, l = list.length; i < l; i++) {
      var script = document.createElement('script');
      script.src = cdnPath + list[i];
      tasks.push(function() {
        el.appendChild(script);
        var task = tasks.shift();
        task && loadEl(script, task);
      })
    }
    var task = tasks.shift();
    task && task();
  }
  var head = document.querySelector('head');
  injectCss(head, assets.header.css, function() {
    document.querySelector('body').style.display = 'block';
  });
  injectScript(head, assets.header.js);
  window.addEventListener('load', function() {
    injectScript(document.querySelector('body'), assets.footer.js);
  })
})(
  window.CDN_PATH,
  {
    header: {
      js: ['static/js/pdfjs-dist/build/pdf.js', 'static/js/pdfjs-dist/web/pdf_viewer.js'],
      css: ['static/css/pdf_viewer.css', 'static/css/viewer.css'],
    },
    footer: {
      js: ['static/js/viewer.js', 'static/js/index.js'],
      css: []
    }
  }
)