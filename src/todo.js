CUORE.Dom.ready(function() {
    // cache for labelService
    var currentLocale = (navigator.language || navigator.browserLanguage);
    document.labels = {};
    document.labels[currentLocale] = {
    };
    CUORE.Bus.enableDebug();
    document.page = new TODO.Page("http://www.anydomain.com");
    document.page.draw();
});

