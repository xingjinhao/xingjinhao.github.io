
function trackEvent(t,a,e,o,n){"undefined"!=typeof dataLayer&&(void 0!==a&&""!==a||(a="none"),void 0!==e&&""!==e||(e="Click"),void 0!==n&&""!==n||(n="gaGenericEvent"),void 0!==o&&""!==o||(o=""),dataLayer.push({event:n,eventCategory:t,eventAction:e,eventLabel:a,eventValue:o}))}function getFullPath(t){return/^(f|ht)tps?:\/\//i.test(t)||(t=window.location.protocol+"//"+window.location.hostname+t),t}function trackWtEvent(t,a,e,o){"undefined"!=typeof Webtrends&&(void 0!==a&&""!==a||(a="none"),void 0!==e&&""!==e||(e=0),void 0!==o&&""!==o||(o=0),"none"===a&&Webtrends.multiTrack({argsa:["DCS.dcsuri",t,"WT.dl",e]}))}window.addEventListener("jqueryloaded",function(t){$(document).on("click","[data-ga-label] a, a[data-ga-label]",function(t){var a,e,o;a=void 0!==$(this).closest("[data-ga-category]").attr("data-ga-category")?$(this).closest("[data-ga-category]").attr("data-ga-category")+" (local)":$("body").hasClass("homepage")?"Homepage (local)":$("body").hasClass("subhome")?"Subhomepage (local)":"Page (local)",e=$(this).closest("[data-ga-label]").attr("data-ga-label"),o=getFullPath($(this).attr("href")),"true"===$(this).closest("[data-ga-usetext]").attr("data-ga-usetext")&&(o=$(this).text()),trackEvent(a,e,"Click-"+o)})});
window.addEventListener('jqueryloaded', function (e) {
    $(document).ready(function() {
        enquire.register("screen and (max-width:47.938em)", {
            // OPTIONAL
            // If supplied, triggered when a media query matches.
            match : function() {
                initGridSlider('.js-s-slider', '.f-grid__cell');
            },
        
            // OPTIONAL
            // If supplied, triggered when the media query transitions
            // *from a matched state to an unmatched state*.
            unmatch : function() {
                initGridSlider('.js-s-slider', '.f-grid__cell', 'unslick');
            }
        });
    });
});

/**
 * 
 * SLIDER
 * 
 **/
function initGridSlider(root, child, prop) {
  /* is the slider available ? */
  const _SLIDER = $('body').find(root),
        _AUTOPLAY_SPEED = 6000;

  if (_SLIDER.length > 0) {
    //Slider unslick
    if(prop === 'unslick') {
        $(_SLIDER).slick('unslick');
    } else {
        for(var i = 0; i < _SLIDER.length; i++) {
            if($(_SLIDER[i]).find('.slick-track').length > 0) {
                $(_SLIDER[i]).find('.slick-track').remove();
            }
            const _ITEMS = $(_SLIDER[i]).find(child);
            var randomNumber_ = 0,
                arrows_ = false,
                tabsHTML_ = '',
                asNavFor_ = '';
            
            //Arrows extension
            //if ($(_SLIDER[i]).hasClass('js-slider--with-arrows')) {
                arrows_ = true;
            //}
    
            //Initialize slider
            $(_SLIDER[i]).slick({
                infinite: true,
                lazyLoad: 'ondemand',
                speed: 300,
                swipe: true,
                useCSS: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: arrows_,
                dots: true,
                autoplay: true,
                adaptiveHeight: false,
                autoplaySpeed: _AUTOPLAY_SPEED
            });
    
            /*Randomize extension*/
            //if ($(_SLIDER[i]).hasClass('js-dynamic-slider--randomize')) {
              //randomNumber_ = Math.floor(Math.random() * Math.floor(_ITEMS.length));
              //$(_SLIDER[i]).slick('slickGoTo', randomNumber_, true);
            //}
        }
    }
  }
}
function setBase64Str(e){base64Str=e,base64Count=0}function readBase64(){if(!base64Str)return END_OF_INPUT;if(base64Count>=base64Str.length)return END_OF_INPUT;var e=255&base64Str.charCodeAt(base64Count);return base64Count++,e}function encodeBase64(e){setBase64Str(e);for(var r="",a=new Array(3),s=0,n=!1;!n&&(a[0]=readBase64())!=END_OF_INPUT;)a[1]=readBase64(),a[2]=readBase64(),r+=base64Chars[a[0]>>2],a[1]!=END_OF_INPUT?(r+=base64Chars[a[0]<<4&48|a[1]>>4],a[2]!=END_OF_INPUT?(r+=base64Chars[a[1]<<2&60|a[2]>>6],r+=base64Chars[63&a[2]]):(r+=base64Chars[a[1]<<2&60],r+="=",n=!0)):(r+=base64Chars[a[0]<<4&48],r+="=",r+="=",n=!0),s+=4,s>=76&&(r+="\n",s=0);return r}function readReverseBase64(){if(!base64Str)return END_OF_INPUT;for(;;){if(base64Count>=base64Str.length)return END_OF_INPUT;var e=base64Str.charAt(base64Count);if(base64Count++,reverseBase64Chars[e])return reverseBase64Chars[e];if("A"==e)return 0}return END_OF_INPUT}function ntos(e){return e=e.toString(16),1==e.length&&(e="0"+e),e="%"+e,unescape(e)}function decodeBase64(e){setBase64Str(e);for(var r="",a=new Array(4),s=!1;!s&&(a[0]=readReverseBase64())!=END_OF_INPUT&&(a[1]=readReverseBase64())!=END_OF_INPUT;)a[2]=readReverseBase64(),a[3]=readReverseBase64(),r+=ntos(a[0]<<2&255|a[1]>>4),a[2]!=END_OF_INPUT?(r+=ntos(a[1]<<4&255|a[2]>>2),a[3]!=END_OF_INPUT?r+=ntos(a[2]<<6&255|a[3]):s=!0):s=!0;return r}function get_enc_string(){try{location.href="mailto:"+decodeBase64(arguments[0]).replace('&amp;','&');}catch(e){}}function winOpen(e,r,a){r=window.open(e,r,a),null==r||r.closed?window.open(e,r,a):r.location.href=e,r.closed||r.focus()}for(var END_OF_INPUT=-1,base64Chars=new Array("A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9","+","/"),reverseBase64Chars=new Array,i=0;i<base64Chars.length;i++)reverseBase64Chars[base64Chars[i]]=i;var base64Str,base64Count;
