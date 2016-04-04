/**
 * Created by ameyapandilwar on 4/3/16.
 */

WebFontConfig = {
    google: { families: [ 'Crushed::latin' ] }
};
(function() {
    var wf = document.createElement('script');
    wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
})();