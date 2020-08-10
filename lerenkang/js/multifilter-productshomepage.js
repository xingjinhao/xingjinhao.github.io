//VARIABLES
var lang = $('html').attr('lang'),
    deleteallfilters = 'Delete all filters',
    jsonurl = '/module/products-a-z/'+lang+'/productsSearch.aspx',
    jsonCountUrl = '/module/products-a-z/'+lang+'/ProductsCount.aspx',
    defaultParameter = "?activity=&application=&search=",
	mfBLabel = 'Apply',
	overviewUrl = '/en/products-from-a-to-z.aspx',
	azButtonLabelAll = 'All',
	azButtonLabelProducts = 'Products',
	azButtonLabelProduct = 'Product',
	allProducts = 0,
	rootURL = window.location.protocol + "//" + window.location.hostname,
    selectAppIDs = '',
	selectActiIDs = '',
	selectKatApp = 'Application',
	selectKattAct = 'Field of Activity',
    searchValue = '',
    //setup for click timings
    typingTimer,                //timer identifier
    doneTypingInterval = 1000;  //time in ms, 1 second for example
    
if(lang == "de"){
    deleteallfilters = 'Alle Filter löschen';
	mfBLabel = 'Übernehmen';
	overviewUrl = '/de/produkte-von-a-bis-z.aspx',
	azButtonLabelAll = 'Alle',
	azButtonLabelProducts = 'Produkte',
	azButtonLabelProduct = 'Produkt',
	selectKatApp = 'Anwendungsbereich',
	selectKattAct = 'Tätigkeitsfeld';
}

//SVG LOADER
var svgLoader = '<div class="svg-loader">';
	svgLoader += '<svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">';
	svgLoader += '<path fill="#fff" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z" transform="rotate(360 24.7857 24.7857)">';
	svgLoader += '<animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"></animateTransform>';
	svgLoader += '</path>';
	svgLoader += '</svg>';
	svgLoader += '</div>';    

function appendLoader(_class) {
    if($(_class).find('.svg-loader').length <= 0) {
        $(_class).addClass('svg-loading');
        $(_class).append(svgLoader);
    }
}

function removeLoader(_class) {
    var loader = $(_class).find('.svg-loader');
    if(loader.length > 0) {
        $(_class).removeClass('svg-loading');
        loader.remove();
    }
}

//KEYCODE FILTER
function validKeyCode(_keycode){
    var keycode = _keycode,
        validcode = false;
    
    
    if(keycode > 47 && keycode < 58 || keycode === 226 || keycode === 46 || keycode === 32 || keycode === 8 || keycode === 27 || keycode > 64 && keycode < 91 || keycode > 95 && keycode < 112 || keycode > 185 && keycode < 193 || keycode > 218 && keycode < 223)
    {
        validcode = true;    
    }
    
    //keycode > 47 && keycode < 58   number keys
    //keycode === 32                 spacebar
    //keycode === 8                  backspace
    //keycode === 27                 esc
    //keycode === 46                 entf
    //keycode > 64 && keycode < 91   letter keys
    //keycode > 95 && keycode < 112  numpad keys
    //keycode > 185 && keycode < 193 ;=,-./` (in order)
    //keycode > 218 && keycode < 223 [\]' (in order)
    //keycode 226                    < >

    return validcode;
}

//ACTIVATE MF PLUGIN FOR SELECT BOXES
$('.product-search__mf').mf({
	mfDefaultContainerPosition: 'Bottom',
	mfListHeight: 100,
	mfPerfectScrollBar: 1,
	mfDeleteAll: 1,
    mfDeleteAllLabel: deleteallfilters,
    mfButtonLabel: mfBLabel,
    mfButtonClass: 'button'
});

//Function to set letter html with json url
function setLetters(url, curl, parameter) {
    var letter = '',
        productListArrayListItems = {"A": "<li><a href='" + overviewUrl + "#A' class='letter--disabled'>A</a></li>", "B": "<li><a href='" + overviewUrl + "#B' class='letter--disabled'>B</a></li>", "C": "<li><a href='" + overviewUrl + "#C' class='letter--disabled'>C</a></li>", "D": "<li><a href='" + overviewUrl + "#D' class='letter--disabled'>D</a></li>", "E": "<li><a href='" + overviewUrl + "#E' class='letter--disabled'>E</a></li>", "F": "<li><a href='" + overviewUrl + "#F' class='letter--disabled'>F</a></li>", "G": "<li><a href='" + overviewUrl + "#G' class='letter--disabled'>G</a></li>", "H": "<li><a href='" + overviewUrl + "#H' class='letter--disabled'>H</a></li>", "I": "<li><a href='" + overviewUrl + "#I' class='letter--disabled'>I</a></li>", "J": "<li><a href='" + overviewUrl + "#J' class='letter--disabled'>J</a></li>", "K": "<li><a href='" + overviewUrl + "#K' class='letter--disabled'>K</a></li>", "L": "<li><a href='" + overviewUrl + "#L' class='letter--disabled'>L</a></li>", "M": "<li><a href='" + overviewUrl + "#M' class='letter--disabled'>M</a></li>", "N": "<li><a href='" + overviewUrl + "#N' class='letter--disabled'>N</a></li>", "O": "<li><a href='" + overviewUrl + "#O' class='letter--disabled'>O</a></li>", "P": "<li><a href='" + overviewUrl + "#P' class='letter--disabled'>P</a></li>", "Q": "<li><a href='" + overviewUrl + "#Q' class='letter--disabled'>Q</a></li>", "R": "<li><a href='" + overviewUrl + "#R' class='letter--disabled'>R</a></li>", "S": "<li><a href='" + overviewUrl + "#S' class='letter--disabled'>S</a></li>", "T": "<li><a href='" + overviewUrl + "#T' class='letter--disabled'>T</a></li>", "U": "<li><a href='" + overviewUrl + "#U' class='letter--disabled'>U</a></li>", "V": "<li><a href='" + overviewUrl + "#V' class='letter--disabled'>V</a></li>", "W": "<li><a href='" + overviewUrl + "#W' class='letter--disabled'>W</a></li>", "X": "<li><a href='" + overviewUrl + "#X' class='letter--disabled'>X</a></li>", "Y": "<li><a href='" + overviewUrl + "#Y' class='letter--disabled'>Y</a></li>", "Z": "<li><a href='" + overviewUrl + "#Z' class='letter--disabled'>Z</a></li>"}
        
	$.getJSON(url + parameter, function( data ) {
	    
        if(jQuery.isEmptyObject(data)){
            $('.product-navigation-range-list').empty().append(productListArrayListItems);
        }

        //FILL ARRAY WITH AKTIVE KEY HTML
        $.each( data, function( key, val ) {
            productListArrayListItems[key] = '<li><a href="' + overviewUrl + '#' + key + '">' + key + '</a></li>';
        });
        
        //FILL LETTER VALUE WITH ARRAY HTML
        $.each(productListArrayListItems, function(key, val){
            letter += val;
        });
        
        //RENDER LETTERS TO PRODUCT UL
        $('.product-navigation-range-list').empty().append(letter);
        
    });
    
    //CHANGE PRODUCT BUTTON
    generateProductButton(curl, parameter, '');
}
setLetters(jsonurl, jsonCountUrl, defaultParameter);

//PRODUCT SEARCH FIELD BINDING
//on keyup, start the countdown
$('body').on('keyup', '#psearchfieldhomepage', function (e) {
    var validKey = validKeyCode(e.keyCode);
    if(validKey){
      clearTimeout(typingTimer);
      typingTimer = setTimeout(doneTyping, doneTypingInterval);
    }
});

//on keydown, clear the countdown 
$('body').on('keydown', '#psearchfieldhomepage', function (e) {
    var keycode = e.keyCode,
        validKey = false;
  if(keycode === 13) {
      e.preventDefault();
      window.location.href = rootURL + $('.product-search__button').attr('data-url').split('?')[0] + '?activity=' + selectActiIDs + '&application=' + selectAppIDs + '&search=' + $(this).val();
  } else {
    validKey = validKeyCode(keycode);
    if(validKey){
        appendLoader('.product-search__button');
        clearTimeout(typingTimer);
    }
  }
});

//user is "finished typing," do something
function doneTyping() {
    var currentVal =  $('#psearchfieldhomepage').val(),
        parameter = '?activity=' + selectActiIDs + '&application=' + selectAppIDs + '&search=' + currentVal,
        url = jsonurl,
        curl = jsonCountUrl;
        searchValue = currentVal;
    //setLetters(url, curl, parameter);
    //CHANGE PRODUCT BUTTON
    generateProductButton(jsonCountUrl, parameter, currentVal);
}

//SELF MF FUNCTION TO TRIGGER WHILE SELECTED
$('body').on('click', '.product-search__mf .mf-select input', function(){
    appendLoader('.product-search__button');
    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneSelecting, doneTypingInterval);
});

//user is "finished selecting" do something
function doneSelecting() {
	selectAppIDs = '';
	selectActiIDs = '';
	var appli = $('.product-search__mf').find('input[data-kategorie="' + selectKatApp + '"]:checked'),
		foa = $('.product-search__mf').find('input[data-kategorie="' + selectKattAct + '"]:checked');
	
	$.each(appli, function(i){
		if(i === 0){
		    selectAppIDs += $(appli[i]).attr('value');
		} else {
		    selectAppIDs += "," + $(appli[i]).attr('value');    
		}
	});
	
	$.each(foa, function(i){
	    if(i === 0){
		    selectActiIDs += $(foa[i]).attr('value');
	    } else {
	        selectActiIDs += "," + $(foa[i]).attr('value');
	    }
	});
	
	//setLetters(jsonurl, jsonCountUrl, "?activity=" + selectActiIDs + "&application=" + selectAppIDs + "&search=" + searchValue);
	//CHANGE PRODUCT BUTTON
    generateProductButton(jsonCountUrl, "?activity=" + selectActiIDs + "&application=" + selectAppIDs + "&search=" + searchValue, searchValue);
}

//PRODUCT BUTTON CONFIGURE
function generateProductButton(url, parameter, searchValue) {
    $.getJSON(jsonCountUrl + defaultParameter, function( data ) {
        //SET MAX PRODUCTS VARIABLE
        allProducts = data.count;
        
        //SET BUTTON VARIABLES
        $.getJSON(url + parameter, function( d ) {
            var newButtonLabel = '',
                currentButton = '',
                _searchValue = searchValue;
                
            //REMOVE LOADER
            removeLoader('.product-search__button');           
                
            if(allProducts !== d.count) {
                //if(d.count !== 0 && d.count !== 1){
                //    newButtonLabel = azButtonLabelAll + ' ';
                //}
                newButtonLabel += d.count;
                if(d.count !== 1){
                    newButtonLabel += ' ' + azButtonLabelProducts;
                } else {
                    newButtonLabel += ' ' + azButtonLabelProduct;
                }
                currentButton = $('body').find('.product-search__button');
                if(currentButton !== undefined && currentButton !== '') {
                    currentButton.text(newButtonLabel);
                    currentButton.attr('data-url', overviewUrl + parameter);
                }
            } else {
                newButtonLabel = azButtonLabelAll + ' ' + azButtonLabelProducts,
                currentButton = $('body').find('.product-search__button');
                if(currentButton !== undefined && currentButton !== '') {
                    currentButton.text(newButtonLabel);
                    currentButton.attr('data-url', overviewUrl);
                }
            }
            
            //SET TRACKING LABEL
            currentButton.attr('data-ga-product-label', _searchValue)
            
        });
    });
}

//PRODUCT BUTTON BINDING
$('body').on('click', '.product-search__button', function(e){
    e.preventDefault();
    var loadUrl = $(this).attr('data-url'),
        term = $(this).attr('data-ga-product-label');
    if(loadUrl !== undefined && loadUrl !== ''){
        window.location.href = rootURL + loadUrl;
        trackEvent('Homepage (local)', 'Search Products', 'Search-'+term);
    }
});