/* Bayer worldwide v5.0 */
var formload = new CustomEvent('formloaded', {
    detail: true
});

window.addEventListener('formloaded', function(e) {
    $('.bcn-select').selectric();
});
//window.dispatchEvent(formload);
function bayerCorporateNavigation() {
    var tmp_lang = $('html').attr('lang');
    var bcn_lang = typeof(tmp_lang) != 'undefined' && tmp_lang != '' && tmp_lang == 'de' ? tmp_lang : 'en';
    var bcn_locationCountries = [],
        bcn_lastActivePanel = '';
    var bcn_url = {
        de: {
            org: 'https://shared.bayer.com/json/contacts_de.json',
            wsearch: 'https://shared.bayer.com/module/websitesearchform/rest/lang_de/',
            wresult: 'https://shared.bayer.com/module/websitesearchresult/rest/lang_de/',
            images: 'https://shared.bayer.com/img/corporate/',
            phone: 'Telefon: '
        },
        en: {
            org: 'https://shared.bayer.com/json/contacts_en.json',
            wsearch: 'https://shared.bayer.com/module/websitesearchform/rest/lang_en/',
            wresult: 'https://shared.bayer.com/module/websitesearchresult/rest/lang_en/',
            images: 'https://shared.bayer.com/img/corporate/',
            phone: 'Phone: '
        }
    }
    var bcn_htmlContent = {
        de: {
            worldwide: '<nav id="bcn-nav" class="loadedhtml">' +
                '<ul class="bcn-nobulls">' +
                '<li class="global-link"><a href="http://www.bayer.de" target="_blank">Bayer Global</a></li>' +
                '<li role="tablist"><a class="showpanel sp01" href="#" aria-expanded="false" aria-haspopup="true" role="tab">Tätigkeitsfelder</a></li>' +
                '<li role="tablist"><a class="showpanel sp02" href="#" aria-expanded="false" aria-haspopup="true" role="tab">Standorte</a></li>'
                //+'<li role="tablist"><a class="showpanel sp03" href="#" aria-expanded="false" aria-haspopup="true" role="tab">Websites</a></li>'
                +
                '</ul></nav>',
            panel1: '<div class="bcn-grid bcn-flex">'
                //+'<div class="bcn-col-b1">'
                //+'<div class="bcn-flex">'
                +
                '<div>' +
                '<h2 class="bcn-head">Pharmaceuticals</h2>' +
                '<div class="bcn-img">' +
                '<a href="https://pharma.bayer.com/de/" target="_blank">' +
                '<img src="' + bcn_url[bcn_lang].images + 'ph.png" width="180" height="80" data-original="' + bcn_url[bcn_lang].images + 'pharmaceuticals.jpg" alt="" class="lazy" />' +
                '</a>' +
                '</div>' +
                '<p>Pharmaceuticals konzentriert sich auf verschreibungspflichtige Produkte auf den Gebieten Kardiologie, Frauengesundheit, Onkologie, Hämatologie & Ophthalmologie.</p>' +
                '<p class="bcn-overview-container"><a class="bcn-overview" href="https://pharma.bayer.com/de/" target="_blank">Globale Website</a></p>' +
                '</div>' +
                '<div>' +
                '<h2 class="bcn-head">Consumer Health</h2>' +
                '<div class="bcn-img"><a href="https://www.bayer.de/de/consumer-health-division.aspx/" target="_blank"><img src="' + bcn_url[bcn_lang].images + 'ph.png" width="180" height="80" data-original="' + bcn_url[bcn_lang].images + 'consumer-health.jpg" alt="" class="lazy" /></a>' +
                '</div>' +
                '<p>Consumer Health vertreibt einige der weltweit bekanntesten rezeptfreien Arzneimittel, Nahrungsergänzungs-Präparate sowie weitere Selbstmedikations-Produkte.</p>' +
                '<p class="bcn-overview-container"><a class="bcn-overview" href="https://www.bayer.de/de/consumer-health-division.aspx/" target="_blank">Globale Website</a></p>' +
                '</div>' +
                '<div>' +
                '<h2 class="bcn-head">Crop Science</h2>' +
                '<div class="bcn-img">' +
                '<a href="https://www.cropscience.bayer.com/de" target="_blank"><img src="' + bcn_url[bcn_lang].images + 'ph.png" width="180" height="80" data-original="' + bcn_url[bcn_lang].images + 'crop-science.jpg" alt="" class="lazy" /></a>' +
                '</div>' +
                '<p>Crop Science ist auf den Gebieten Saatgut, Pflanzenschutz und Schädlingsbekämpfung außerhalb der Landwirtschaft tätig.</p>' +
                '<p class="bcn-overview-container"><a class="bcn-overview" href="https://www.cropscience.bayer.com/de" target="_blank">Globale Website</a></p>' +
                '</div>' +
                '<div>' +
                '<h2 class="bcn-head">Animal Health</h2>' +
                '<div class="bcn-img">' +
                '<a href="http://tiergesundheit.bayer.de" target="_blank"><img src="' + bcn_url[bcn_lang].images + 'ph.png" width="180" height="80" data-original="' + bcn_url[bcn_lang].images + 'animal-health.jpg" alt="" class="lazy" /></a>' +
                '</div>' +
                '<p>Animal Health engagiert sich mit innovativen Therapien & Lösungen für die Gesundheit von Tieren und unterstützt so Tierärzte, Landwirte & Tierhalter.</p>' +
                '<p class="bcn-overview-container"><a class="bcn-overview" href="http://tiergesundheit.bayer.de" target="_blank">Globale Website</a></p>' +
                '</div>'
                //+'</div>'
                //+'</div>'
                //+'<div class="bcn-col-b2">'
                +
                '<div>' +
                '<div class="bcn-margiblock">'
                //+'<h4>Organisation</h4>'
                +
                '<ul class="bcn-lnk">' +
                '<li><a href="https://www.bayer.de/de/profil-und-organisation.aspx">Profil und Organisation</a></li>' +
                '<li><a href="https://www.bayer.de/bayer-organisationsstruktur" target="_blank">Organigramm (PDF, 174 KB)</a></li>' +
                '<li><a href="https://www.bayer.de/de/business-services.aspx" target="_blank">Business Services</a></li>' +
                '</ul>' +
                '</div>' +
                '</div>' +
                '</div>',
            panel2: '<div class="bcn-grid bcn-flex">' +
                '<div class="bcn-col-l1 bcn-dd-mobile">' +
                '<h2 class="bcn-head">Wählen Sie ein Land</h2>'
                //+'<div class="bcn-media">'
                +
                '<div class="bcn-scrollbox bcn-scroll-pane" >' +
                '</div>'
                //+'</div>'
                +
                '</div>' +
                '<div class="bcn-col-l2 bcn-world"><h2 class="bcn-countryhead"></h2><div class="bcn-scrollbox2 bcn-scroll-pane" ></div></div>' +
                '<div class="bcn-col-l3">' +
                '<div class="bcn-margiblock">' +
                '<h4>Globale Links</h4>' +
                '<ul class="bcn-lnk">' +
                '<li><a href="https://www.bayer.de" target="_blank">Bayer Global</a></li>' +
                '<li><a href="http://www.news.bayer.de" target="_blank">Nachrichten</a></li>' +
                '<li><a href="http://www.investor.bayer.de" target="_blank">Investoren</a></li>' +
                '<li><a href="https://www.career.bayer.com/de/" target="_blank">Karriere</a></li>' +
                '<li><a href="https://www.bayer.de/de/produkte.aspx" target="_blank">Produkte</a></li>' +
                '<li><a href="https://www.bayer.de/de/nachhaltigkeit.aspx" target="_blank">Nachhaltigkeit</a></li>' +
                '</ul>' +
                '<a class="bcn-big-button" href="https://www.bayer.de/de/kontakt.aspx" targrt="_blank">Kontakt</a>'
                //+'<h4>Folgen Sie uns</h4>'
                //+'<ul class="bcn-nobulls socialmedia"><li><a href="http://www.facebook.com/Bayer" data-rel="tooltip" target="_blank" class="ir fb" data-original-title="Folgen Sie uns auf Facebook">facebook</a></li><li><a href="http://twitter.com/bayer" data-rel="tooltip" target="_blank" class="ir tw" data-original-title="Folgen Sie uns auf Twitter">twitter</a></li><li><a href="http://www.youtube.com/user/BayerTV" data-rel="tooltip" target="_blank" class="ir yt" data-original-title="Folgen Sie uns auf Youtube">youtube</a></li><li><a href="http://www.linkedin.com/company/bayer" data-rel="tooltip" target="_blank" class="ir li" data-original-title="Folgen Sie uns auf LinkedIn">LinkedIn</a></li><li><a href="http://instagram.com/bayerofficial" data-rel="tooltip" target="_blank" class="ir ig" data-placement="left" data-original-title="Folgen Sie uns auf Instagram">Instagram</a></li><li><a href="/de/rss.aspx" title="RSS Feed" data-rel="tooltip" target="_blank" class="ir rss" data-placement="left">RSS</a></li></ul>'
                +
                '</div>' +
                '</div>' +
                '</div>',
            panel3: '<h2 class="bcn-head">Suchen Sie nach Bayer Websites weltweit</h2>' +
                '<div class="bcn-grid bcn-flex"><div class="bcn-col-w1">' +
                '<label>Region</label><select class="bcn-select select--size-s bcn-select-region" data-name="region" />' +
                '<label>Location</label><select class="bcn-select select--size-s bcn-select-country" data-name="country"/>' +
                '</div>' +
                '<div class="bcn-col-w1">' +
                '<label>Organization</label><select class="bcn-select select--size-s bcn-select-organization" data-name="organization" />' +
                '<label>Product websites</label><select class="bcn-select select--size-s bcn-select-product" data-name="product" />' +
                '</div>' +
                '<div class="bcn-col-w1">' +
                '<label>Topic & field of activity</label><select class="bcn-select select--size-s bcn-select-topic" data-name="topic" />' +
                '<label>Suche</label><div class="input-group input-group--search"><input class="bcn-nocomplete input-group-field bnc-input-group" type="search" placeholder="Ihr Suchbegriff" autocomplete="off"><div class="input-group-button"><button class="button button--search bnc-button--search" href="#"><span>Suchen</span> </button></div></div>' +
                '</div>' +
                '<div class="bcn-col-w3">' +
                '<div class="p">Hinweis: Alle Kategorien sind miteinander verknüpft, damit Sie mindestens ein Ergebnis für Ihre Suchanfrage erhalten. Eine Ausnahme bildet die Freitextsuche.</div>' +
                '</div>' +
                '</div>' +
                '<h2 class="bcn-head bcn-head--search">Suchergebnis: <span class="bcn-green bcn-result-count"></span><span class="bcn-green"> Website(s) gefunden</span><span class="loading counter"> </span><span class="loading resultcounter"> </span></h2>' +
                '<div class="bcn-scroll-pane" ></div>',
            panel: '<div class="bcn-panel"><a class="closepaneltop" href="#">schließen</a></div>'
        },
        en: {
            worldwide: '<nav id="bcn-nav" class="loadedhtml">' +
                '<ul class="bcn-nobulls">' +
                '<li class="global-link"><a href="http://www.bayer.com" target="_blank">Bayer Global</a></li>' +
                '<li role="tablist"><a class="showpanel sp01" aria-expanded="false" aria-haspopup="true" href="#" role="tab">Our Businesses</a></li>' +
                '<li role="tablist"><a class="showpanel sp02" aria-expanded="false" aria-haspopup="true" href="#" role="tab">Locations</a></li>'
                //+'<li role="tablist"><a class="showpanel sp03" aria-expanded="false" aria-haspopup="true" href="#" role="tab">Websites</a></li>'
                +
                '</ul>' +
                '</nav>',
            panel1: '<div class="bcn-grid bcn-flex">'
                //+'<div class="bcn-col-b1">'
                //+'<div class="bcn-flex">'
                +
                '<div>' +
                '<h2 class="bcn-head">Pharmaceuticals</h2>' +
                '<div class="bcn-img">' +
                '<a href="https://pharma.bayer.com/" target="_blank"><img src="' + bcn_url[bcn_lang].images + 'ph.png" width="180" height="80" data-original="' + bcn_url[bcn_lang].images + 'pharmaceuticals.jpg" alt="" class="lazy" /></a>' +
                '</div>' +
                '<p>Pharmaceuticals focuses on prescription drugs for the therapeutic areas of cardiology, oncology, gynecology, hematology & ophthalmology.</p>' +
                '<p class="bcn-overview-container"><a class="bcn-overview" href="https://pharma.bayer.com/" target="_blank" target="_blank">Global Site</a></p>' +
                '</div>' +
                '<div>' +
                '<h2 class="bcn-head">Consumer Health</h2>' +
                '<div class="bcn-img">' +
                '<a href="http://consumerhealth.bayer.com/"><img src="' + bcn_url[bcn_lang].images + 'ph.png" width="180" height="80" data-original="' + bcn_url[bcn_lang].images + 'consumer-health.jpg" alt="" class="lazy" /></a>' +
                '</div>' +
                '<p>Consumer Health brings consumers some of the world’s best-known and most trusted over-the-counter (OTC) medications, nutritional supplements and other self-care products.</p>' +
                '<p class="bcn-overview-container"><a class="bcn-overview" href="http://consumerhealth.bayer.com/" target="_blank">Global Site</a></p>' +
                '</div>' +
                '<div>' +
                '<h2 class="bcn-head">Crop Science</h2>' +
                '<div class="bcn-img">' +
                '<a href="https://www.cropscience.bayer.com/" target="_blank"><img src="' + bcn_url[bcn_lang].images + 'ph.png" width="180" height="80" data-original="' + bcn_url[bcn_lang].images + 'crop-science.jpg" alt="" class="lazy" /></a>' +
                '</div>' +
                '<p>Crop Science has businesses in seeds, crop protection and non-agricultural pest control.</p>' +
                '<p class="bcn-overview-container"><a class="bcn-overview" href="https://www.cropscience.bayer.com/" target="_blank">Global Site</a></p>' +
                '</div>' +
                '<div>' +
                '<h2 class="bcn-head">Animal Health</h2>' +
                '<div class="bcn-img"><a href="http://animalhealth.bayer.com" target="_blank"><img src="' + bcn_url[bcn_lang].images + 'ph.png" width="180" height="80" data-original="' + bcn_url[bcn_lang].images + 'animal-health.jpg" alt="" class="lazy" /></a>' +
                '</div>' +
                '<p>Animal Health is passionate about the health of animals. We support vets, farmers and pet-owners that care for them with innovative therapies and solutions.</p>' +
                '<p class="bcn-overview-container"><a class="bcn-overview" href="http://animalhealth.bayer.com" target="_blank">Global Site</a></p>' +
                '</div>'
                //+'</div>'
                //+'</div>'
                //+'<div class="bcn-col-b2">'
                +
                '<div>' +
                '<div class="bcn-margiblock">'
                //+'<h4>Organization</h4>'
                +
                '<ul class="bcn-lnk">' +
                '<li><a href="https://www.bayer.com/en/profile-and-organization.aspx">Profile and Organization</a></li>' +
                '<li><a href="https://www.bayer.com/bayer-organizational-structure" target="_blank">Organization chart (PDF, 174 KB)</a></li>' +
                '<li><a href="https://www.bayer.com/en/business-services.aspx" target="_blank">Business Services</a></li>' +
                '</ul>' +
                '</div>' +
                '</div>' +
                '</div>',
            panel2: '<div class="bcn-grid bcn-flex">' +
                '<div class="bcn-col-l1 bcn-dd-mobile">' +
                '<h2 class="bcn-head">Select Location</h2>'
                //+'<div class="bcn-media">'
                +
                '<div class="bcn-scrollbox bcn-scroll-pane" ></div>'
                //+'</div>'
                +
                '</div>' +
                '<div class="bcn-col-l2 bcn-world"><h2 class="bcn-countryhead"></h2><div class="bcn-scrollbox2 bcn-scroll-pane" ></div></div>' +
                '<div class="bcn-col-l3">' +
                '<div class="bcn-margiblock">' +
                '<h4>Global Links</h4>' +
                '<ul class="bcn-lnk">' +
                '<li><a href="https://www.bayer.com" target="_blank">Bayer Global</a></li>' +
                '<li><a href="http://www.news.bayer.com" target="_blank">News</a></li>' +
                '<li><a href="http://www.investor.bayer.com" target="_blank">Investors</a></li>' +
                '<li><a href="https://www.career.bayer.com" target="_blank">Career</a></li>' +
                '<li><a href="https://www.bayer.com/en/products.aspx" target="_blank">Products</a></li>' +
                '<li><a href="https://www.bayer.com/en/sustainability.aspx" target="_blank">Sustainability</a></li>' +
                '</ul>' +
                '<a class="bcn-big-button" href="https://www.bayer.com/en/contact.aspx" targrt="_blank">Contact us</a>'
                //+'<h4>Follow us</h4>'
                //+'<ul class="bcn-nobulls socialmedia"><li><a href="http://www.facebook.com/Bayer" data-rel="tooltip" target="_blank" class="ir fb" data-original-title="Follow Us on Facebook">Facebook</a></li><li><a href="http://twitter.com/bayer" title="Follow Us on Twitter" data-rel="tooltip" target="_blank" class="ir tw">Twitter</a></li><li><a href="http://www.youtube.com/user/BayerTVinternational" title="Follow Us on YouTube" data-rel="tooltip" target="_blank" class="ir yt">YouTube</a></li><li><a href="http://www.linkedin.com/company/bayer" title="Follow Us on LinkedIn" data-rel="tooltip" target="_blank" class="ir li">LinkedIn</a></li><li><a href="http://instagram.com/bayerofficial" title="Follow Us on Instagram" data-rel="tooltip" target="_blank" class="ir ig" data-placement="left">Instagram</a></li><li><a href="/en/rss.aspx" title="RSS Feed" data-rel="tooltip" target="_blank" class="ir rss" data-placement="left">RSS</a></li></ul>'
                +
                '</div>' +
                '</div>' +
                '</div>',
            panel3: '<h2 class="bcn-head">Search for Bayer Websites worldwide</h2>' +
                '<div class="bcn-grid bcn-flex"><div class="bcn-col-w1">' +
                '<label>Region</label><select class="bcn-select select--size-s bcn-select-region" data-name="region" />' +
                '<label>Location</label><select class="bcn-select select--size-s bcn-select-country" data-name="country"/>' +
                '</div>' +
                '<div class="bcn-col-w1">' +
                '<label>Organization</label><select class="bcn-select select--size-s bcn-select-organization" data-name="organization"/>' +
                '<label>Product websites</label><select class="bcn-select select--size-s bcn-select-product" data-name="product" />' +
                '</div>' +
                '<div class="bcn-col-w1">' +
                '<label>Topic & field of activity</label><select class="bcn-select select--size-s bcn-select-topic" data-name="topic" />'
                //+'<label>Search</label><input />'
                //+'<button class="bcn-btn bcn-hollow">Search</button>'
                +
                '<label>Search</label><div class="input-group input-group--search"><input class="bcn-nocomplete input-group-field bnc-input-group" type="search" placeholder="Enter your search term" autocomplete="off"><div class="input-group-button"><button class="button button--search bnc-button--search" href="#"><span>search</span> </button></div></div>' +
                '</div>' +
                '<div class="bcn-col-w3">' +
                '<div class="p">Note: all the categories are linked so you will get at least one hit for any query. This does not apply to the free-text search function.</div>' +
                '</div>' +
                '</div>' +
                '<h2 class="bcn-head bcn-head--search">Search result: <span class="bcn-green bcn-result-count"></span><span class="bcn-green"> website(s) found</span><span class="loading counter"> </span><span class="loading resultcounter"> </span></h2>' +
                '<div class="bcn-scroll-pane" ></div>',
            panel: '<div class="bcn-panel"><a class="closepaneltop" href="#">close</a></div>'
        }
    }
    var bcn_websitesInfo = {
        region: {
            selectedval: -1,
            name: 'Region',
            selectboxlabel: {
                de: 'Region: Alle',
                en: 'Region: All'
            },
            classname: '.bcn-select-region'
        },
        country: {
            selectedval: -1,
            name: 'Country',
            selectboxlabel: {
                de: 'Land: Alle',
                en: 'Locations: All'
            },
            classname: '.bcn-select-country'
        },
        organization: {
            selectedval: -1,
            name: 'Organization',
            selectboxlabel: {
                de: 'Organisation: Alle',
                en: 'Organization: All'
            },
            classname: '.bcn-select-organization'
        },
        product: {
            selectedval: -1,
            name: 'Product',
            selectboxlabel: {
                de: 'Produkt: Alle',
                en: 'Product: All'
            },
            classname: '.bcn-select-product'
        },
        topic: {
            selectedval: -1,
            name: 'Topic',
            selectboxlabel: {
                de: 'Thema: Alle',
                en: 'Topic: All'
            },
            classname: '.bcn-select-topic'
        }
    }

    $('#bcn-container').append(bcn_htmlContent[bcn_lang].worldwide);
    $('nav.meta').appendTo('#bcn-nav');
    //$('nav.meta').replaceWith(function () {
    //    return $('<div class="meta"></div>').append($(this).contents());
    //});

    $(document).on('keydown', '.showpanel', function(e) {
        //$('.showpanel').keydown(function(e){
        //    console.log(e.keyCode);
        /*if(e.keyCode == 37) { //left arrow
			e.preventDefault();
      navigate_prevlevel(this);
		} else if(e.keyCode == 39) { //right arrow
			e.preventDefault();
			navigate_nextlevel(this);
		} else if(e.keyCode == 38) { //up arrow
			e.preventDefault();
      navigate_prev(this);
		} else if(e.keyCode == 40) { //down arrow
			e.preventDefault();
			navigate_next(this);
		} else if(e.keyCode == 35) { //end
			e.preventDefault();
			navigate_last(this);
		} else if(e.keyCode == 36) { //home
			e.preventDefault();
			navigate_first(this);
		} else*/
        if (e.keyCode == 13 || e.keyCode == 32) { //enter and space
            console.log('key');
            e.preventDefault();
            $(this).click();
            //$('.bcn-panel').find('a').first().focus();
        } else if (e.keyCode == 27) { //esc
            e.preventDefault();
            $('a.closepaneltop').click();
        }
    });
    $('body').on('keydown', '.bcn-panel', function(e) {
        if (e.keyCode == 27) { //esc
            e.preventDefault();
            $('a.closepaneltop').click();
        }
    });
    /*$('body').on('blur', '.bcn-panel a:last-of-type', function(e) {
    console.log('blur' + this);
      $('a.closepaneltop').click();
	});*/
    $('body').on('keydown', '.bcn-panel', function(e) {
        //console.log('blur');
        //$('a.closepaneltop').click();
        //console.log($('.bcn-panel a:last-of-type').text());
        //console.log($(this).find('a').last().text());
        if (e.keyCode == 9) { //tab
            //console.log($(':focus') +'_'+ $(this).find('a').last());
            //if($(':focus').text() === $(this).find('a').last().text()){
            if ($(':focus').is($(this).find('a').last())) {
                $('a.closepaneltop').click();
            }
            //e.preventDefault();
        }
    });

    /*	$('body').on('change', 'select[class^="bcn-select"]', function() {
    		var value = $(this).find('option:selected').val();
    		var name = $(this).attr('data-name');
    		bcn_websitesInfo[name].selectedval = value;
        
    		$('.bnc-button--search').click();
    	});

    	$('body').on('click', '.bnc-button--search', function(e) {
    		e.preventDefault();
    		LoadWebsiteSearchForm();
    		LoadWebsiteSearchResult();
    	});

    	$('body').on('keypress', 'input.bcn-nocomplete', function(e) {
    		if (e.which == 13) {
    			e.preventDefault();
    			$('.bnc-button--search').click();
    		}
    	});*/


    /*Show Global Navigation - Start*/
    //$('.sp01').click(function(e) {
    $('body').on('click', '.sp01', function(e) {
        //console.log("sp01");
        //$('body').on('click', '.sp01', function(e) {
        //$('.showpanel').on('click', function(e) {
        e.preventDefault();

        bcnOpenStart(this)
        if ($('.p01').length < 1) {
            $('.bcn-panel').append('<div class="p01" style="display:block;">' + bcn_htmlContent[bcn_lang].panel1 + '</div>');
            $('.bcn-panel img.lazy').each(function(i) {
                $(this).attr('src', $(this).data('original'));
            });
        }
        var clicked = $(this).attr('class').split(' ')[1];
        $('.p01').attr('tabIndex', 0).focus();
        bcnOpenEnd(clicked)
    });
    $('body').on('click', '.sp02', function(e) {
        e.preventDefault();

        bcnOpenStart(this)
        if ($('.p02').length < 1) {
            $('.bcn-panel').append('<div class="p02" style="display:block;">' + bcn_htmlContent[bcn_lang].panel2 + '</div>');
            LoadJSONDataLocations();
        }
        var clicked = $(this).attr('class').split(' ')[1];
        $('.p02').attr('tabIndex', 0).focus();
        bcnOpenEnd(clicked)
    });
    /*	$('body').on('click', '.sp03', function(e) {
    	//$('.showpanel').on('click', function(e) {
    		e.preventDefault();
        
        bcnOpenStart(this)
    				if ($('.p03').length<1) {
    					$('.bcn-panel').append('<div class="p03" style="display:block;">'+bcn_htmlContent[bcn_lang].panel3+'</div>');
    					LoadWebsiteSearchForm();
    				}
    		var clicked = $(this).attr('class').split(' ')[1];
        $('.p03').attr('tabIndex',0).focus();
        bcnOpenEnd(clicked)
    	});*/

    function bcnOpenStart(elem) {
        /*add dom node if not exist*/
        if ($('.bcn-panel').length < 1) {
            //$('.bcn-panel').append(bcn_htmlContent[bcn_lang].panel);
            $('.page').prepend(bcn_htmlContent[bcn_lang].panel);
        }

        $('#bcn-nav ul li').removeClass('state-active');
        $(elem).attr("aria-expanded", "true").parent('li').addClass('state-active');


        /*show panel*/
        if ($('div.bcn-panel').is(':hidden')) {
            $('div.bcn-panel').css({
                height: 0,
                display: "block"
            });
        }
    }

    function bcnOpenEnd(clicked) {
        $('.bcn-panel > div').hide();
        $('.bcn-panel > div').removeClass('is-active');
        $('.bcn-panel > div.' + clicked.substr(1)).show();

        setTimeout(function() {
            $('.bcn-panel > div.' + clicked.substr(1)).addClass('is-active')
        }, 200);

        /*handle panel*/
        if ($('div.bcn-panel').height() > 0 && clicked === bcn_lastActivePanel) {
            $('a.closepaneltop').click();
            $('.bcn-panel > div.' + clicked.substr(1)).removeClass('is-active');
        } else {
            autoHeightAnimate($('div.bcn-panel'), 500);
            $('body').addClass('active-corporate');
            //setTimeout(function(){ $('body').addClass('active-corporate') }, 500);
            bcn_lastActivePanel = clicked;
        }
        $('#bcn-underlay').show();
        /*close panel*/
        $('a.closepaneltop').on('click', function(e) {
            e.preventDefault();
            $('#bcn-nav .state-active').find(".showpanel").focus();
            $('.showpanel').attr("aria-expanded", "false").parent('li').removeClass('state-active');
            bcn_lastActivePanel = '';
            if ($(window).width() > 1023) {
                $('div.bcn-panel').stop().slideUp('slow');
                setTimeout(function() {
                    $('body').removeClass('active-corporate')
                }, 500);
            } else {
                $('div.bcn-panel').stop().hide();
                $('body').removeClass('active-corporate');
            }
            $('#bcn-underlay').hide();

            $('a.closepaneltop, .bcn-dd-mobile h2').off('click');
        });

        $('#bcn-underlay').on('click', function(e) {
            //$('body').on('click', function(e) {

            $('a.closepaneltop').trigger('click');
        });

        //setTimeout(function(){ $('.bcn-select').selectric() }, 200);

        /* $('html').click(function() {
    $("a.closepanel").trigger("click");
    if($("div.panel").is(':visible')){
      $('.panel, #worldwide, html').off('click');
    }
 });*/

        /*$('.bcn-dd-mobile h2').click(function(event){
        	$('.bcn-dd-mobile .bcn-media').slideToggle();
        	$(this).toggleClass('active');
        });*/
    }

    /* PANEL 3 - Websites: Options-Listen für Suchmaske initial aufbauen oder updaten!  */
    function BuildOptionsList(subset, val) {
        var quantity = subset.length,
            htmlOutput = '',
            i = 0,
            selectedvalue = bcn_websitesInfo[val].selectedval,
            classname = bcn_websitesInfo[val].classname;

        for (var i = 0; i < quantity; i++) {
            if (selectedvalue > 0 && selectedvalue === subset[i].id) {
                htmlOutput += '<option value="' + subset[i].id + '" selected>' + subset[i].name + '</option>';
            } else {
                htmlOutput += '<option value="' + subset[i].id + '">' + subset[i].name + '</option>';
            }
        }
        $(classname).empty().append('<option value="">' + bcn_websitesInfo[val].selectboxlabel[bcn_lang] + ' (' + quantity + ')</option>').append(htmlOutput);
    }

    /* PANEL 3 - Websites: Suchmaske initial aufbauen oder updaten!  */
    /*function LoadWebsiteSearchForm() {
		$.ajax({
		//$.jsonp({
			url: bcn_url[bcn_lang].wsearch + GetWebsiteQuery() + 'callback_cbf.aspx',
			type:'GET',
			dataType:'jsonp',
			jsonp:false,
			jsonpCallback: 'cbf',
			timeout: 3000,
			//callback:'cbf',
			success: function( result ) {
        //console.log(result.count);
				$('.bcn-result-count').empty().append(result.count);
				for (val in bcn_websitesInfo) {
					BuildOptionsList(result[val], val);
				}
window.dispatchEvent(formload);

			}
		});
	}*/

    /* PANEL 3 - Websites: Suchergebisse abrufen und in Scrollpane schreiben!  */
    /*	function LoadWebsiteSearchResult(){
    		$.ajax({
    		//$.jsonp({
    			url: bcn_url[bcn_lang].wresult + GetWebsiteQuery() + 'callback_cbs.aspx',
    			type:'GET',
    			dataType:'jsonp',
    			jsonp:false,
    			jsonpCallback: 'cbs',
    			timeout: 3000,
    			//callback:'cbs',
    			success: function( result ) {
    				var html='';
    				$.each(result.results, function(key, val) {
    					html += '<div class="bcn-article"><div class="bcn-lnk"><span class="bcn-unit bcn-size1of4">';
    					html += '<a href="'+val.url+'" target="_blank"><strong>'+val.name+'</strong></a></span>';
    					html += '<span class="bcn-unit bcn-size1of4">'+val.organization+'</span>';
    					html += '<span class="bcn-unit bcn-size1of2 bcn-lastUnit">';
    					html += '<span>'+val.languages.join(", ")+'</span></span></div>';
    					html += '<div class="bcn-article-description">'+val.description+'</div></div>';
    				});
    				$('.p03 .bcn-scroll-pane').empty().append(html);
    			}
    		});
    	}*/

    /* PANEL 3 - Websites Hilfsfunktion: Query zusammenbauen */
    /*	function GetWebsiteQuery() {
    		var query = '';
    		for (val in bcn_websitesInfo) {
    			if (bcn_websitesInfo[val].selectedval > 0) {
    				query += 'int' + bcn_websitesInfo[val].name + '_' + bcn_websitesInfo[val].selectedval + '/';
    			}
    		}

    		var searchvalue = $('input.bcn-nocomplete').val();
    		if (searchvalue != '') {
    			query += 'stringSearch_'+searchvalue+'/';
    		}

    		return query;
    	}*/

    /* PANEL 2 - Locations: Location Details auf erster Ebene holen!  */
    function LoadLocationsDetail(element) {
        var item = $(element);
        var itemId = item.attr('data-id'),
            itemSubId = item.attr('data-subid');

        var html = '',
            current, currentdetails = '';
        html += '<div>';
        if (itemSubId) {
            current = bcn_locationCountries[itemId].subs[itemSubId];
            currentdetails = current.subdetails;
            //html += '<h2>' + bcn_locationCountries[itemId].country + ' - ' + current.title + '</h2>';
            $('.bcn-countryhead').text(bcn_locationCountries[itemId].country + ' - ' + current.title);
        } else {
            current = bcn_locationCountries[itemId];
            currentdetails = current.details;
            //html += '<h2>' + bcn_locationCountries[itemId].country + '</h2>';
            $('.bcn-countryhead').text(bcn_locationCountries[itemId].country);
        }
        //html += '<hr>';
        html += '</div>';
        html += '<div class="bcn-grid">';

        for (var i = 0; i < currentdetails.length; i++) {
            var detail = currentdetails[i];
            html += '<div class="bcn-col-1-2">';
            if (detail.company != null && detail.company != '') {
                html += '<h3>' + detail.company + '</h3>';
            }
            html += '<p>';
            if (detail.address1 != '') {
                html += '<span>' + detail.address1 + '<br /></span>';
            }
            if (detail.address2 != '') {
                html += '<span>' + detail.address2 + '<br /></span>';
            }
            if (detail.address3 != '') {
                html += '<span>' + detail.address3 + '<br /></span>';
            }
            if (detail.address4 != '') {
                html += '<span>' + detail.address4 + '<br /></span>';
            }
            if (detail.country != '') {
                html += '<span>' + detail.country + '<br /></span>';
            }
            if (detail.phone != '') {
                html += bcn_url[bcn_lang].phone + '<span>' + detail.phone + '<br /></span>';
            }
            if (detail.fax != '') {
                html += 'Fax: <span>' + detail.fax + '<br /></span>';
            }
            if (detail.link != '') {
                html += '<a href="' + detail.link + '" class="bcn-location-link" target="_blank">' + detail.link + '</a>';
            }
            html += '</p>';
            html += '</div>';
        }
        html += '</div>';

        $('.bcn-scrollbox2.bcn-scroll-pane').empty().append(html);
    }

    /* PANEL 2 - Locations: Location Liste aufbauen */
    function LoadJSONDataLocations() {
        $.ajax({
            url: bcn_url[bcn_lang].org,
            type: 'GET',
            dataType: 'jsonp',
            jsonp: false,
            jsonpCallback: 'cb',
            success: function(result) {
                bcn_locationCountries = result.countrys;
                var listitems = '<ul class="bcn-nobulls bcn-lnk">';
                for (var i = 0; i < bcn_locationCountries.length; i++) {
                    listitems += '<li><a href="#" class="bcn-location" data-id="' + i + '">' + bcn_locationCountries[i].country + '</a>';
                    if (bcn_locationCountries[i].subs != null) {
                        listitems += '<ul>';
                        for (var j = 0; j < bcn_locationCountries[i].subs.length; j++) {
                            listitems += '<li><a href="#" class="bcn-location bcn-location-subs" data-id="' + i + '" data-subid="' + j + '" >' + bcn_locationCountries[i].subs[j].title + '</a>';
                        }
                        listitems += '</ul>';
                    }
                    listitems += '</li>';
                }
                $('.p02 .bcn-scrollbox.bcn-scroll-pane').append(listitems);
                $('.bcn-location[data-id=0]').trigger('click');
            }
        });
    }



    $('body').on('click', 'a.bcn-location', function(e) {
        e.preventDefault();
        //console.log('d');
        $('.bcn-location').removeClass('selected');
        $(this).addClass('selected');
        LoadLocationsDetail(this);
    });

    /* Function to animate height: auto */
    function autoHeightAnimate(element, time) {
        var curHeight = element.height(), // Get Default Height
            autoHeight = element.css('height', 'auto').height(); // Get Auto Height
        element.height(curHeight); // Reset to Default Height
        element.stop().animate({
            height: autoHeight
        }, parseInt(time)); // Animate to Auto Height
    }
}

function openCorporateNavigation(panel) {
    $(".sp0" + panel).click();
    window.scrollTo(0, 0);
}

$(function() {
    /*if (Modernizr.mq('(max-width:1023px)')) {
    	$('body').addClass('lt-1024');
    } else {
    	$('body').removeClass('lt-1024');
    }*/

    $('<div />', {
        id: 'bcn-underlay'
    }).prependTo('body');
    //$('head').append('<link rel="stylesheet" type="text/css" href="shared/worldwide/edge/corporate-navigation.css"/>');
    $('head').append('<link rel="stylesheet" type="text/css" href="https://shared.bayer.com/worldwide/edge/corporate-navigation.css"/>');
    /*TEMP: uncommend for production
        $.ajax({
            url:"shared/worldwide/50/corporate-navigation.css",
            dataType:"text",
            success:function(data){
                $("head").append("<style>" + data + "</style>");
                
                $('.bcn-panel').removeAttr("style");
            }
        });
    */
    /*$('.bcn-panel').on('click', "a[href^='#showpanel']", function(e){
		e.preventDefault();
    console.log('s');
		var classString = $(this).attr('href');
		var panelClass = '.sp0'+classString.substring(10, 12);
		$('.menu_close').trigger('click');
		$(panelClass).trigger('click');
		window.scrollTo(0, 0);
	});*/




    bayerCorporateNavigation();


});