/* =================================
------------------------------------
	LERAMIZ - Landing Page Template
	Version: 1.0
 ------------------------------------ 
 ====================================*/


'use strict';


var window_w = $(window).innerWidth();

$(window).on('load', function() {
	/*------------------
		Preloder
	--------------------*/
	$(".loader").fadeOut(); 
    $("#preloder").delay(400).fadeOut("slow");
    userPanel();
    var address = window.location.toString();
    if (address.includes('preferences.html')) {
        prefs();
        loadSlider();
    }
    if (address.includes('searchResults.html')) {
        var urlParams = new URLSearchParams(location.search);
        var searchText = urlParams.get("searchText");
        searchEngine(searchText);
    }
  
    if (address.includes('headerResults.html')) {
        var urlParams = new URLSearchParams(location.search);
        var categoryChosen = urlParams.get("category");
        categoryEngine(categoryChosen);
	}
	if(!window.location.hash) {
        window.location = window.location + '#loaded';
        window.location.reload();
    }
});

function setCategory(category) {
    var urlParams = new URLSearchParams(location.search);
    urlParams.set('category', category);
    window.location = 'headerResults.html?' + urlParams.toString();
}

function setResults(num, response) {

	document.getElementById("title" + num).innerHTML = response.title;

	document.getElementById("date" + num).innerHTML = '<i class="fa fa-clock-o"></i>' + response.publishedAt.split("T")[0];
	
	document.getElementById("link" + num).href = response.url;

	document.getElementById("source" + num).innerHTML = '<i class="fa fa-user"></i>' + response.source.name;

    document.getElementById("pic" + num).src = response.urlToImage;

    document.getElementById("description" + num).innerHTML = response.description;

}

function setSearchText() {
    var newText = document.getElementById('searchText').value.split(' ').join('-');
    var urlParams = new URLSearchParams(location.search);
    urlParams.set('searchText', newText);
    window.location = 'searchResults.html?' + urlParams.toString();
}

function searchEngine(searchField) {
	var dispSources = ['abc-news', 'cnn', 'fox-news', 'the-wall-street-journal', 'bbc-news', 'bloomberg', 'business-insider', 'cbs-news', 'nfl-news', 'newsweek', 'time', 'new-york-magazine'];
	var url;
	var req;
    var myInt = 1;
    var myCount = 0;
    var index;
    
    var boxes = ['abc', 'cnn', 'fox', 'nyt', 'wsj'];
    var sourceBox = ['abc-news', 'cnn', 'fox-news', 'new-york-magazine', 'the-wall-street-journal'];
    var urlParams = new URLSearchParams(location.search);
    for (var i = 0; i < 5; i++){ 
    	if (urlParams.has(boxes[i]) && (parseInt(urlParams.get(boxes[i])) != -1)){
    		index = dispSources.indexOf(sourceBox[i]);
    		if (index > -1) {
    			dispSources.splice(index, 1);
    		}
    		dispSources.unshift(sourceBox[i]);

    	}
    	
    }
	
	var url;
	var req;
	var myInd;
	while (myInt < 4 & myCount < dispSources.length) {
		myInd = myCount;
		if (myInt > 0){
			myInd = dispSources.length - myCount;
		}
		url = 'https://newsapi.org/v2/everything?' +
	          'q='+ searchField + '&' +
	          'from=2019-03-04&' +
	          'sources=' + dispSources[myCount] + '&' +
	          'language=en&' +
	          'sortBy=popularity&' +
	          'apiKey=d8f3160a3d1249988e9a7bde5dcc83e3';

		req = new Request(url);
		myCount += 1;
		fetch(req).then(response => {
		  return response.json();
		}).then(data => {
		  // Work with JSON data here
          if (data.totalResults != 0 & myInt < 4){

          	var currArt = data.articles[0];
	        setResults(myInt, currArt);
          	myInt += 1;
          }

		})//.catch(err => {
		  //console.log("ERROR");
    //})

	};

}

function categoryEngine(categoryField) {
	var dispSources = ['abc-news', 'cnn', 'fox-news', 'the-wall-street-journal', 'new-york-magazine', 'bbc-news', 'bloomberg', 'business-insider', 'cbs-news', 'nfl-news', 'newsweek', 'time'];
	var url;
	var req;
    var myInt = 1;
    var myCount = 0;
    var index;
    
    var boxes = ['abc', 'cnn', 'fox', 'nyt', 'wsj'];
    var sourceBox = ['abc-news', 'cnn', 'fox-news', 'new-york-magazine', 'the-wall-street-journal'];
    var urlParams = new URLSearchParams(location.search);
    for (var i = 0; i < 5; i++){ 
    	if (urlParams.has(boxes[i]) && (parseInt(urlParams.get(boxes[i])) != -1)){
    		index = dispSources.indexOf(sourceBox[i]);
    		if (index > -1) {
    			dispSources.splice(index, 1);
    		}
    		dispSources.unshift(sourceBox[i]);

    	}
    	
    }
	console.log(dispSources);
	console.log("^^^ PREFERENCES");
	var url;
	var req;
	var myInd;
	while (myInt < 4 & myCount < dispSources.length) {
		myInd = myCount;
		if (myInt > 0){
			myInd = dispSources.length - myCount;
		}

		url = 'https://newsapi.org/v2/everything?' +
	          'q='+ categoryField + '&' +
	          'from=2019-03-04&' +
	          'sources=' + dispSources[myCount] + '&' +
	          'language=en&' +
	          'sortBy=popularity&' +
	          'apiKey=d8f3160a3d1249988e9a7bde5dcc83e3';

	    console.log(dispSources[myCount]);
	    console.log("actual source pulling^^^");

		req = new Request(url);
		myCount += 1;
		fetch(req).then(response => {
		  return response.json();
		}).then(data => {
		  // Work with JSON data here
          if (data.totalResults != 0 & myInt < 4){
          	console.log(myInt);
          	console.log(myCount);
          	console.log("MY INT + MYCOUNT");
          	var currArt = data.articles[0];
	        setResults(myInt + "c", currArt);
          	myInt += 1;
          }

		})//.catch(err => {
		  //console.log("ERROR");
    //})

	};
	if (categoryField == "u.s."){
		categoryField = "U.S. News";
	}
	else if(categoryField == "world"){
		categoryField = "World News";
	}

	document.getElementById("categoryName").innerHTML = '<i class="fa fa-angle-right"></i>' + categoryField;
	document.getElementById("categoryTitle").innerHTML = categoryField;

}

function setPasswordConfirmValidity() {
	    const password1 = document.getElementById('password1');
	    const password2 = document.getElementById('password2');

	    if (password1.value === password2.value) {
	         password2.setCustomValidity('');
	    } else {
	     password2.setCustomValidity('Passwords must match');
	    }
	}
	

function userPanel() {
    var newsifyLoginDataObj
    var loginJSON
    if (sessionStorage.getItem("newsifyLoginData") === null) {
        newsifyLoginDataObj = { isLoggedIn: "false", username: "", password: "" };
        loginJSON = JSON.stringify(newsifyLoginDataObj);
        sessionStorage.setItem("newsifyLoginData", loginJSON);
    }
    loginJSON = sessionStorage.getItem("newsifyLoginData");
    newsifyLoginDataObj = JSON.parse(loginJSON);

    var urlParams = new URLSearchParams(location.search);
    if (urlParams.has('userName') || urlParams.has('passWord')) {
        newsifyLoginDataObj.isLoggedIn = "true";
    };

    if (newsifyLoginDataObj.isLoggedIn == "false") {
        $("#user-panel-logged-in").hide();
        $("#user-panel-logged-out").show();
    } else {
        $("#user-panel-logged-in").show();
        $("#user-panel-logged-out").hide();
		var urll = urlParams.toString();
		var start;
		var end;
		if (urlParams.has('userName')){
			start = urll.indexOf('userName=') + 9;
			end = urll.indexOf('%40');
		}else{
			start = urll.indexOf('name=') + 5;
			end = urll.indexOf('&mail=');
		}
		document.getElementById('welcomemessage').innerHTML = "Welcome " + urll.substring(start, end);
    }
}

function redir() {
    window.location = 'searchResults.html' + window.location.search;
}

function changeSlider() {
    var boxes = ['abc', 'cnn', 'fox', 'nyt', 'wsj'];
    var values = [57, 63, 77, 16, 11];
    var total = 0;
    var count = 0;
    var average = 50;
    for (var i = 0; i < 5; i++) {
        if (document.getElementById(boxes[i]).checked == true) {
            total += values[i];
            count += 1;
            average = total / count;
        }
    }
    document.getElementById('slider').value = average;
}

function loadSlider() {
    var urlParams = new URLSearchParams(location.search);
    var boxes = ['abc', 'cnn', 'fox', 'nyt', 'wsj'];
    var values = [57, 63, 77, 16, 11];
    var total = 0;
    var count = 0;
    var average = 50;
    for (var i = 0; i < 5; i++) {
        if (urlParams.has(boxes[i]) && (parseInt(urlParams.get(boxes[i])) != -1)) {
            total += values[i];
            count += 1;
            average = total / count;
        }
    }
    document.getElementById('slider').value = average;
}

function prefs() {
    var urlParams = new URLSearchParams(location.search);
    var boxes = ['abc', 'cnn', 'fox', 'nyt', 'wsj', 'env', 'polit', 'tech', 'world', 'us'];
    for (var i = 0; i < 10; i++) {
        if (urlParams.has(boxes[i]) && (parseInt(urlParams.get(boxes[i])) != -1)) {
            document.getElementById(boxes[i]).checked = true;
        }
    }
}

function setPrefs(category) {
    var urlParams = new URLSearchParams(location.search);
    var boxes = ['abc', 'cnn', 'fox', 'nyt', 'wsj', 'env', 'polit', 'tech', 'world', 'us'];
    for (var i = 0; i < 10; i++) {
        if (document.getElementById(boxes[i]).checked == true) {
            urlParams.set(boxes[i], 1);
        } else urlParams.set(boxes[i], -1);
    }
    if (category != 'home') {
        urlParams.set('category', category);
        window.location = 'headerResults.html?' + urlParams.toString();
    } else {
        window.location = 'index.html?' + urlParams.toString();
    }
}

function logIn() {
    var userName = $("#usernameInput").value;
    var passWord = $("#passwordInput").value;
    window.location.href = "../index.html";
    var newsifyLoginDataObj
    var loginJSON
    if (sessionStorage.getItem("newsifyLoginData") === null) {
        newsifyLoginDataObj = { isLoggedIn: "true", username: userName, password: passWord };
        loginJSON = JSON.stringify(newsifyLoginDataObj);
        sessionStorage.setItem("newsifyLoginData", loginJSON);
        // make user register, right now does it automatically
    }
    loginJSON = sessionStorage.getItem("newsifyLoginData");
    newsifyLoginDataObj = JSON.parse(loginJSON);

    newsifyLoginDataObj.isLoggedIn = "true";
    loginJSON = JSON.stringify(newsifyLoginDataObj);
    sessionStorage.setItem("newsifyLoginData", loginJSON);
}

(function($) {

	/*------------------
		Navigation
	--------------------*/
	$('.nav-switch').on('click', function(event) {
		$('.main-menu').slideToggle(400);
		event.preventDefault();
	});


	/*------------------
		Background set
	--------------------*/
	$('.set-bg').each(function() {
		var bg = $(this).data('setbg');
		$(this).css('background-image', 'url(' + bg + ')');
	});



	$('.gallery').find('.gallery-item').each(function() {
		var pi_height1 = $(this).outerWidth(true),
		pi_height2 = pi_height1/2;
		
		if($(this).hasClass('grid-long') && window_w > 991){
			$(this).css('height', pi_height2);
		}else{
			$(this).css('height', Math.abs(pi_height1));
		}
	});



	$('.gallery').masonry({
		itemSelector: '.gallery-item',
	  	columnWidth: '.grid-sizer',
		gutter: 20
	});


	/*------------------
		Review Slider
	--------------------*/
	$('.review-slider').owlCarousel({
        loop: true,
        margin: 0,
        nav: false,
        items: 1,
        dots: true,
        autoplay: true,
    });



    $('.clients-slider').owlCarousel({
		loop:true,
		autoplay:true,
		margin:30,
		nav:false,
		dots: true,
		responsive:{
			0:{
				items:2,
				margin:10
			},
			600:{
				items:3
			},
			800:{
				items:3
			},
			1000:{
				items:5
			}
		}
	});


	/*------------------
		Review Slider
	--------------------*/
	var sync1 = $("#sl-slider");
	var sync2 = $("#sl-slider-thumb");
	var slidesPerPage = 4; //globaly define number of elements per page
	var syncedSecondary = true;

	sync1.owlCarousel({
		items : 1,
		slideSpeed : 2000,
		nav: false,
		autoplay: true,
		dots: true,
		loop: true,
		responsiveRefreshRate : 200,
	}).on('changed.owl.carousel', syncPosition);

	sync2.on('initialized.owl.carousel', function () {
		sync2.find(".owl-item").eq(0).addClass("current");
	}).owlCarousel({
		items : slidesPerPage,
		dots: true,
		nav: true,
		margin: 10,
		smartSpeed: 200,
		slideSpeed : 500,
		navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
		slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
		responsiveRefreshRate : 100
	}).on('changed.owl.carousel', syncPosition2);

	function syncPosition(el) {
		//if you set loop to false, you have to restore this next line
		//var current = el.item.index;
		//if you disable loop you have to comment this block
		var count = el.item.count-1;
		var current = Math.round(el.item.index - (el.item.count/2) - .5);

		if(current < 0) {
			current = count;
		}
		if(current > count) {
			current = 0;
		}

		//end block
		sync2.find(".owl-item").removeClass("current").eq(current).addClass("current");
		var onscreen = sync2.find('.owl-item.active').length - 1;
		var start = sync2.find('.owl-item.active').first().index();
		var end = sync2.find('.owl-item.active').last().index();

		if (current > end) {
			sync2.data('owl.carousel').to(current, 100, true);
		}
		if (current < start) {
			sync2.data('owl.carousel').to(current - onscreen, 100, true);
		}
	}

	function syncPosition2(el) {
		if(syncedSecondary) {
			var number = el.item.index;
			sync1.data('owl.carousel').to(number, 100, true);
		}
	}

	sync2.on("click", ".owl-item", function(e){
		e.preventDefault();
		var number = $(this).index();
		sync1.data('owl.carousel').to(number, 300, true);
	});




	/*------------------
		Accordions
	--------------------*/
	$('.panel-link').on('click', function (e) {
		$('.panel-link').removeClass('active');
		var $this = $(this);
		if (!$this.hasClass('active')) {
			$this.addClass('active');
		}
		e.preventDefault();
	});



	$('.video-link').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
    });


})(jQuery);

