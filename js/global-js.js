<script>
/*LATEST GLOBAL*/
$(document).ready(function(){

/*For dynamic tag management to function properly, insert the following code just before the closing </body> tag of every page of your site.*/
    var x = document.createElement("SCRIPT");
    var DTMfunctionCall = document.createTextNode("_satellite.pageBottom();");
    x.appendChild(DTMfunctionCall);
    document.body.appendChild(x);

    /*Adds Toll free number to layout*/
    $('<p class="tollFree">TOLL FREE RESERVATIONS (800)365-5996 <br/>and GROUPS (800) 365-5996</p>').insertAfter($('.availability-checker'));

   /*Adds wrapper around confirmation information on confirmation page*/
   $(".custom-reservation-rate-details, .custom-confirmation-details").wrapAll("<div class='custom-reservation-wrapper'/>");
   
   /*Toggles the Enter Your Special Request area*/
   $("#special_requests h1").click(function() {
      $("#special_requests .group").toggle();
      $(this).toggleClass('special_request-expand');
   });
  /*Makes Grand Total dollar amount bold*/
  $('#ui-resv-grandtotalamount').closest('p').css('font-weight','bold');
});
$(window).load(function(){
/*Adds class to sign in when signed out*/
if(!$('.welcome-message').length){
   $('.user-info').addClass('register-txt');
}
/*
$.getScript('https://togetherjs.com/togetherjs-min.js');
$('footer').append('<button onclick="TogetherJS(this); return false;">Let\'s Do This!</button>');
*/

    $('#step-navigation').find('.group').addClass('custom-breadcrumb');

    //Holds 'Wecome $firstName $lastName!' - we move it so it's before the sign out button nicely
    $('.welcome-message').prependTo('#head-nav .user-info');

    //For footer to be on bottom based on height of header+body
   /* var headerHeight = $('.custom-header').height();
    var bodyHeight = $('.custom-body').height();
    var footerHeight = $('.custom-footer').height();
    var footerOffset = headerHeight+bodyHeight+footerHeight-10;
    $('.custom-footer').css({'position':'absolute','top':footerOffset+'px'}); */

    //To keep quick-search class consistent throughout pages as the search results pages drop the quick search class from their system cog..
    $('.custom-quick-search .modify-search-bar').addClass('quick-search');
    $('.custom-quick-search .modify-search-bar .more-btn').insertAfter('.custom-quick-search .modify-search-bar #ac-submit');

    //Make DatePicker White
    $('img.ui-datepicker-trigger').closest('div').addClass('ui-datepicker-trigger-custom-parent');


    //For My account dashboard areas using the my-account-footer cog, mcp value is not label and hardcoded as "Return to My Account Main Page" with unneeded Main Page so we fix here..
    $('.custom-account-footer .button[data-tag="wh-view-dashboard-click"]').text('Return to My Account');

    //User Login Page: MCP my-account-signin System Cog has html elements in reverse order, fixed in less by using display: inline-block;
    //on both elements and removing float: right from password-tip. Need to insert tip after password field and not use their float.
    $('.my-account-signin #password-tip').insertAfter('.my-account-signin #reg-password');

    //Detect mobile/table. Mobile hide modals and photo gallery link. Only show on tablet (and desktop)
    $.browser.device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase())); //all devices

    if($.browser.device) { // if phone
        $('ul#header-links li#PTUR').hide(); //hide photo gallery
        $('.custom-room-list-results .quickview').remove(); //disable opening of non responsive jquery-lightbox for more room images
    }

    //2nd Step in booking process, MCP has fixed location for these and they are not grouped. We group them and move them under each room.
    $('.ui-rates-start-panel').each(function(){
        var $this = $(this);
        var $roomToggleDivs = $this.find('.view_rooms_div, .hide_rooms_div');
        $roomToggleDivs.insertAfter($this).wrapAll('<div class="show-hide-rooms" />');
    });
    // Checks if you're on the second page of the booking path and hides the booking area
	//if($('.page-hed:contains("SELECT ROOMS/RATES")')){$('.custom-body-left').hide();};
    //Float form elements to right side to match comps (create user page)
    $('#personal-info-fields').appendTo('section#create-account-login');
    $('#contact-info-fields').nextUntil('.account-form-sumbit').andSelf().wrapAll('<div class="custom-my-account-form-pull-left pull-left" />');
    $('.account-form-sumbit').appendTo('.custom-my-account-form-pull-left');

    /*Confirmation Page/ModifynCancel Page Add Custom Confirmation Section top left to match comps START*/
    if($('.confirmation, .account-view-reservation').length){
        var $customConfirmationDetailsSection = $('.custom-confirmation-details');
        var $confirmationNumber = $('#conf-no').find('span:first').html();
        var $confirmationActionLinks = $('.step-navigation').find('a[href*="confirmNumber"], a#save_confirmation_as_pdf');

        $customConfirmationDetailsSection.find('header h1').html('Your reservation number is ' + $confirmationNumber);
        $confirmationActionLinks.appendTo($customConfirmationDetailsSection);
        $customConfirmationDetailsSection.find('a').addClass('button');
        if($('.confirmation').length){
            $('<a href="/bp/retrieve_reservation.jsp" class="button">Modify/Cancel Reservation</a>').appendTo($customConfirmationDetailsSection);
        }
        $('#openmap').addClass('button');
    }
    /*Confirmation Page Add Custom Confirmation Section top left to match comps END*/
});

$(document).ready(function(){
    //MCP HTML structure is bad. We must wrap the whole description and account for any elements being added, since we don't have a good wrapper, we create this to group them all together and style it in less. Best solution would be to assemble HTML in the right place on the backend for search rooms results
    $('.custom-room-list-results .room-descr').each(function(){
        $(this).children().wrapAll('<div class="custom-room-desc" />');
    });

    //MCP onclick function for this is broken.. Should match view detail onclick
    $('.package-info').find('.dynamic_item_thumb').removeAttr('onclick').css({'cursor':'default'});

    //Create Account Page - Hide email type that MCP shows with no good identifier to hook..
    $('#email .form_row label[for=reg-email_type]').closest('.form_row').hide();

    //Account/contact information update user email
    $('.form_row label[for=reg-email_type]').closest('.form_row').hide();

    //Hide Email Address Select Dropdown under Guest Info > Contact Details
    $('#reg-email_type').next('.ui-combobox').hide();

    //Change nonLabel MCP h2 text from Specials to Special Requests on My Account>My Preferences
    $('.check-list > h2').text('Special Requests');    
    
    //Setup Custom Accordion for my account preferences page as it is too long with checkboxes..
    $('.check-list').addClass('custom-accordion');
    $('.check-list>ul').addClass('custom-pane');
    $(".custom-accordion>h2").live('click',function () {
        /*$(this).next(".custom-pane").slideToggle("fast").siblings(".custom-pane:visible").slideUp("fast");*/
        $(this).next(".custom-pane").slideToggle("fast").siblings(".custom-pane:visible").hide();
        $(this).toggleClass("current");
        $(this).siblings("h2").removeClass("current");
    });
    /* Accordion must follow this format to work: http://jsfiddle.net/WMUJ3/338/
       <div class="custom-accordion">
         <h2>Heading 1</h2>
          <div class="custom-pane">
           <p>Content 1</p>
          </div>
         <h2>Heading 2</h2>
          <div class="custom-pane">
           <p>Content 2</p>
          </div>
         <h2>Heading 3</h2>
          <div class="custom-pane">
           <ul>
            <li>List item one</li>
            <li>List item two</li>
            <li>List item three</li>
           </ul>
          </div>
        </div>
    */

    //Cancel Reservation Page - Hide specific element blocks as they are not complete
    if($('section#cancellation-policy:visible').length){
        $('.custom-confirmation-details, .custom-reservation-rate-details').hide();
    }

    //Inventory Alert 'Hurry! Only 5 rooms left' parent div is in the wrong place in MCP.. Put it in right place so things are aligned correctly with the room title/expanding room description
    if($('.search-results-rooms').length){
        $('ul.rates-packages li').each(function(){
            $this = $(this);
            var $inventoryAlertDiv = $this.find('.inventory-alert').closest('div');
            var $avgRoomRate = $this.find('.average_room_rate');
            $avgRoomRate.before($inventoryAlertDiv);
        });
    }

    //Can't change MCP default calendar...
    $('.ui-datepicker-trigger').attr('src','//images.webhotel.microsdc.us/dollywood/get/w/18/h/17/calendar_icon-blue.jpg');

    //Constantin to fix
    $('.custom-quick-search .more-btn.toggle-link').on('click', function(e) {
        e.preventDefault();
    });

    //Set Up Global Image Link For All Images
    /*$('img.imgBaseUrl').attr('rel',function(){
      var imgBaseUrl = "http://imageserver.microswebhotel.com";
      $(this).attr("src",(imgBaseUrl + $(this).attr('rel')));
    });*/
});

</script><script>
	$(document).ready(function(){
		$('.tag-manager script').remove();
        /*Moves Policies to the bottom of custom body right when lower than 768 and when wider than 769 it move it back to original position in HTML*/
        if($(window).width() < 769 && $('.reservation-policies').length){
                $('.custom-body-right').append('<div id="custom-mobile-policies"></div>');              
                $('#custom-mobile-policies').append($('.reservation-policies'));
        }
        $(window).on('resize', function(event){
            var windowSize = $(window).width(); // Could've done $(this).width()
            if(windowSize < 769 && $('.reservation-policies').length){
                $('.custom-body-right').append('<div id="custom-mobile-policies"></div>');              
                $('#custom-mobile-policies').append($('.reservation-policies'));
            }else if (windowSize > 769 && $('.reservation-policies').length){
                $('.your-reservation dl').last().append($('.reservation-policies'));
            }
        });
    });
</script>
