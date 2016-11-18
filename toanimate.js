var toAnimate = (function() {
    'use strict';

    // vars
    var animateClasses, jsWindow, jsDocument,
        string, arrValue, thisType, thisOffset;

    var initiate = function() {

        // values
        animateClasses = $('[data-animate]');
        jsWindow = $(window);
        jsDocument = $(document);
        
        // run functions
        _instantiateClasses(animateClasses);
        jsWindow.scroll(_checkScroll);
    };


    // add and iniatialization
    var _instantiateClasses = function(elements) {
        elements.each(function(key, element){

            $(element).addClass('animated');

            thisType = _getAnimationType(element);
            thisOffset = _getAnimationOffsetInPixel(element);

            var objectPosition = _calculatePosition(element);
            
            $(element).text(objectPosition);

            if(objectPosition == thisOffset)
                $(element).addClass(thisType);

        });
    };

    var _calculatePosition = function(element) {
        return $(element).offset().top - jsDocument.scrollTop();
    };

    var _getAnimationType = function(element) {
        string = $(element).attr("data-animate");
        arrValue = string.split(';');
        return _removeSpace(arrValue[0]);
    };

    var _getAnimationOffsetInPixel = function(element) {
        string = $(element).attr("data-animate");
        arrValue = string.split(';');
        
        if(_isPercent(arrValue[1]) === true) {
            arrValue[1] = _removePercentSymbol(arrValue[1]);
            return (jsWindow.height() /100) * arrValue[1];
        }
        else {
            return arrValue[1];
        }
        
    };

    var _isPercent = function(str) {
        if (str.indexOf('%') == -1)
            return false;
        else
            return true;
    };

    var _removeSpace = function(str) {
        return str.replace(' ', '');
    };

    var _removePercentSymbol = function(str) {
        return str.replace('%', '');
    };

    var _checkScroll = function() {
        animateClasses.each(function(key, element){
            
            thisType = _getAnimationType(element);
            thisOffset = _getAnimationOffsetInPixel(element);

            var objectPosition = _calculatePosition(element);
            
            if(objectPosition == thisOffset)
                $(element).addClass(thisType);

        });
    };

    return {
        init:initiate
    };

})();

toAnimate.init();