(function($){
	$.fn.contactify = function() {
		// looks silly if there's no scrolling
		
	    var winht = (window.innerHeight) ? window.innerHeight : $(window).height();
	    if (winht > $("body").height()) {
	        return;
	    }

	    var detectFixedPos = function() {
	    	return false;
	    }
	    
	    var list = $(this);
	    
	    var event = ('orientationchange' in window) ? 'orientationchange' : 'resize';
	    
	    window.addEventListener(event, refreshControl, false);
	    
	    var refreshControl = function() {
		    var items = list.children('li').get(),
		    	lastchar = '',
		    	navclicked = false;
		    
		    console.log("refresh called");
		    	
		    // sort li's alphabetically (credit: http://www.onemoretake.com/2009/02/25/sorting-elements-with-jquery/)
		    items.sort(function(a,b) { 
				var c = $(a).text().toUpperCase(),
					d = $(b).text().toUpperCase();
				return (c > d ? 1 : c < d ? -1 : 0);
			});
			list.empty();
			$.each(items, function(i,o) { 
				if($(o).text().toUpperCase()[0] != lastchar) {
					lastchar = $(o).text().toUpperCase()[0];
					list.append("<li class='alpha-label' id='alpha-label" +lastchar+ "'>" + lastchar + "</li>");
				}
				// set the item's css properties
				$(o).addClass(".alpha-list");
				list.append(o);
			});
			
			// create contact-style nav
			list.parent().append("<div class='alpha-nav'><ul class='alpha-nav-list'></ul></div>");
			
			var nav = $(".alpha-nav-list"),
				container = $('.alpha-nav');
			nav.html("");
			nav.append("<li id='alpha-nav-top' class='alpha-nav-entry'>^</li>");
			// populate the nav list
		    $(".alpha-label").each(
		        function () {
		            nav.append("<li><div class='alpha-nav-entry'>" + $(this).html() + "</div></li>");
		        }
		    );
		    
		    // position the nav list
		    var setTop = function () {
		        var height = (window.innerHeight) ? window.innerHeight : $(window).height();
		        container.css("top", (((height - container.height()) / 2) + window.pageYOffset) + "px");
		    };
		    
		    container.css("left", $(window).width() - container.width());
		    setTop();
	
		    if(!detectFixedPos()) {
		    // position on native scroll
			    $(window).scroll(function () {
			        if (!navclicked) {
			            setTop();
			        }
			    });
		    }
	
		    var event = ('ontouchstart' in window) ? 'touchstart' : 'click';
	
		    // scroll to top
		    $('#alpha-nav-top').unbind();
		    $('#alpha-nav-top').bind(event,
		        function () {
		            navclicked = true;
		            $('html, body').animate({ scrollTop: 0 }, 500);
		            window.setTimeout(function () { setTop(); navclicked = false; }, 750);
		        }
		    );
	
		    // scroll to heading
		    $(".alpha-nav-entry").unbind();
		    $(".alpha-nav-entry").bind(event,
		        function () {
		    		var ele = "alpha-label" + $(this).text();
		    		var offset = $("#alpha-label" + $(this).text()).offset().top;
		            navclicked = true;
		            $('html, body').animate({
		                scrollTop: offset
		            }, 500);
		            
		            window.setTimeout(function () { setTop(); navclicked = false; }, 500);
		        }
		    );
	
		    // looks silly if it's taller than the window
		    if (container.height() > winht) {
		        container.css("visibility", "hidden");
		    } else {
		        container.css("visibility", "visible");
		    }
	    }
	    
	    refreshControl($(this));
	};
})(jQuery);

