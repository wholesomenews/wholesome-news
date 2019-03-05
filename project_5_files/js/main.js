/* =================================
------------------------------------
	LERAMIZ - Landing Page Template
	Version: 1.0
 ------------------------------------ 
 ====================================*/


'use strict';


var window_w = $(window).innerWidth();


// THIS IS JUST FOR TESTNG ONCE WE FIX OTHER PART RID OF THIS
var url = 'https://newsapi.org/v2/everything?' +
	          'q=luke-perry&' +
	          'from=2019-03-04&' +
	          'sources=cnn&' +
	          'language=en&' +
	          'sortBy=popularity&' +
	          'apiKey=6bc096378cd9475f8d1fdb0888665ca1';

var req = new Request(url);
console.log(url);

// Replace ./data.json with your JSON feed
fetch(req).then(response => {
  return response.json();
}).then(data => {
  // Work with JSON data here
  var currArt = data.articles[4];
  console.log(currArt);
  setResults(1, currArt);
}).catch(err => {
  // Do something for an error here
});

// DELETE UP UNTIL HERE ONCE WORKING

$(window).on('load', function() {
	/*------------------
		Preloder
	--------------------*/
	$(".loader").fadeOut(); 
    $("#preloder").delay(400).fadeOut("slow");
    userPanel();
    prefs();
    loadSlider();
});

function setResults(num, response) {
	console.log("im here");
	document.getElementById("title" + num).innerHTML = response.title;

	document.getElementById("author" + num).innerHTML = response.author.split(",")[0];

	document.getElementById("date" + num).innerHTML = response.publishedAt.split("T")[0];
	
	document.getElementById("link" + num).href = response.url;

	document.getElementById("source" + num).innerHTML = response.source.name;

	document.getElementById("pic" + num).dataSetbg = response.urlToImage;

	console.log(response.urlToImage);
}



function searchEngine() {
	var searchField = document.getElementById("searchText").value;
	searchField = searchField.split(' ').join('-');
	console.log(searchField);
	var dispSources = ['cnn', 'fox-news', 'the-wall-street-journal'];
	var myNum;
	var url;
	var req;

	for (myNum = 0; myNum < dispSources.length; myNum++) {
		url = 'https://newsapi.org/v2/everything?' +
	          'q='+ searchField + '&' +
	          'from=2019-03-04&' +
	          'sources=' + dispSources[myNum] + '&' +
	          'language=en&' +
	          'sortBy=popularity&' +
	          'apiKey=6bc096378cd9475f8d1fdb0888665ca1';

		req = new Request(url);
		console.log(url);

		// Replace ./data.json with your JSON feed
		fetch(req).then(response => {
		  return response.json();
		}).then(data => {
		  // Work with JSON data here
		  var currArt = data.articles[0];
		  console.log("RES");
		  console.log(currArt);
		  setResults(myNum + 1, currArt);
		}).catch(err => {
		  console.log("ERROR");
		});

	};

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
    }
}

function redir() {
    window.location = 'searchResults.html' + window.location.search;
}

function slider() {
    var urlParams = new URLSearchParams(location.search);
    urlParams.set('slider', $("#slider").value);
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

function preferences(name) {
    var urlParams = new URLSearchParams(location.search);
    if (urlParams.has(name)) {
        urlParams.set(name, parseInt(urlParams.get(name)) * -1);
    } else {
        urlParams.set(name, 1);
    }
    location.href = "./preferences.html?" + urlParams.toString();
}

/*document.getElementById('abc').onclick = function () {
    var urlParams = new URLSearchParams(location.search);
    if (urlParams.has(name)) {
        urlParams.set(name, parseInt(URLSearchParams.getItem(name)) * -1);
    } else {
        urlParams.set(name, 1);
    }
    location.href = "./index.html" + location.search
}*/

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
    /*loginJSON = sessionStorage.getItem("newsifyLoginData");
    newsifyLoginDataObj = JSON.parse(loginJSON);
    if (newsifyLoginDataObj.username == userName) {
        if (newsifyLoginDataObj.password == passWord) {
            newsifyLoginDataObj.isLoggedIn = "true";
            loginJSON = JSON.stringify(newsifyLoginDataObj);
            sessionStorage.setItem("newsifyLoginData", loginJSON);
        } else {
            //your password was incorrect, right now doesn't matter
            newsifyLoginDataObj = { isLoggedIn: "true", username: userName, password: passWord };
            loginJSON = JSON.stringify(newsifyLoginDataObj);
            sessionStorage.setItem("newsifyLoginData", loginJSON);
        }
    } else {
        //your username was incorrect, right now doesn't matter
        newsifyLoginDataObj = { isLoggedIn: "true", username: userName, password: passWord };
        loginJSON = JSON.stringify(newsifyLoginDataObj);
        sessionStorage.setItem("newsifyLoginData", loginJSON);
    }*/
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

