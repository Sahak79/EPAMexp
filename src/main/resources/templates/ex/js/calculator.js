var CalculatorModule = (function($) {

    var modalContainer; //TODO this variable may be explicit selector string

    function init() {
        modalContainer = $('.modal-container');
        $(window).on('click', function(e) {
            if ($(modalContainer.selector).hasClass('open')) {
                console.log(e.target);
                if ($(e.target).hasClass('modal-container')) {
                    $(modalContainer.selector).slideUp(200);
                    $(modalContainer.selector).removeClass('open');
                }
            }
        });
    }

    function openCalculatorModal() {
        $(modalContainer.selector).slideDown(200);
        $(modalContainer.selector).addClass('open');
    }

    return {
        init : init,
        openCalculatorModal : openCalculatorModal
    };

})(jQuery);

CalculatorModule.init();




