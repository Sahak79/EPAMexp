(function($, window){
    return{

    };
}(jQuery, window));

var calculator = (function(){
   var checkIsNan = function(){

   };


    return {
        add: function(){
            checkIsNan()
        }
   };
}());

$(document).ready(function(){
    var Calculator = {
        runningTotal : '',
        currentVal : '',
        setCurrentVal: false,
        executeAction: '',
        display: '',
        adjustTotals: function(val) {
            if (!this.setCurrentVal) {
                //If this is the first number user has entered then it becomes runningTotal
                //Otherwise it becomes currentVal which will then be used to update runningTotal based on the action picked
                this.runningTotal += val;
            } else {
                //val is a string so we can append to currentVal for multiple digits
                this.currentVal += val;
            }
        },
        add: function() {
            this.runningTotal = this.checkNaN(parseFloat(this.runningTotal) + parseFloat(this.currentVal));
        },
        subtract: function() {
            this.runningTotal = this.checkNaN(parseFloat(this.runningTotal) - parseFloat(this.currentVal));
        },
        multiply: function() {
            this.runningTotal = this.checkNaN(parseFloat(this.runningTotal) * parseFloat(this.currentVal));
        },
        divide: function() {
            this.runningTotal = this.checkNaN(parseFloat(this.runningTotal) / parseFloat(this.currentVal));
        },
        clear: function() {
            this.runningTotal = '';
            this.currentVal = '';
            this.executeAction = '';
            this.setCurrentVal = false;
            this.display = '';
        },
        resetCurrentVal: function () {
            this.currentVal = '';
        },
        checkNaN: function(exp){
            var exception = $('#exception');
            exception.text(''); // after first error we need clear error container
            try {
                if(isNaN(exp)){// if we have NaN output throw exception
                    throw "Please enter valid expression, click on 'Clr' and try again.";
                }
            }
            catch(err) {
                exception.text(err);
            }
            return exp; // if we don't need to add NaN result in display then we can move this to }else{ section of if() statment
        },
        calculate: function() {
            this.executeAction = '';
            this.currentVal = '';
            return this.runningTotal;
        },
        getAction: function(val) {
            var method = '';
            switch (val) {
                case '+':
                    method = Calculator.add;
                    break;
                case '-':
                    method = Calculator.subtract;
                    break;
                case 'x':
                    method = Calculator.multiply;
                    break;
                case '/':
                    method = Calculator.divide;
                    break;
            }

            return method;
        },
        setDisplay: function() {
            return this.display = this.currentVal == '' ? this.runningTotal : this.currentVal;
        }
    };

    var onButtonPress = function () {
        var that = $(this);
        var action = that.hasClass('action');
        var instant = that.hasClass('instant');
        var val = that.text();
        if (!action) {
            //No action means the button pressed is a number not an "action"
            Calculator.adjustTotals(val);
        } else if(!instant) {
            //A action button was pressed. Store the action so it can be executed
            if (Calculator.executeAction != ''){
                Calculator.executeAction();
            }

            // when action called after any number multiple times do nothing
            if (!Calculator.setCurrentVal && Calculator.runningTotal == "") {
                return;
            }

            Calculator.executeAction = Calculator.getAction(val);
            Calculator.setCurrentVal = true;
            Calculator.resetCurrentVal();
        } else {
            //Either = or Clr is clicked. this needs immediate action
            if (Calculator.executeAction != '') {
                Calculator.executeAction();
            }

            switch (val) {
                case 'cl':
                    method = Calculator.clear();
                    break;
                case '=':
                    method = Calculator.calculate();
                    break;
            }
        }

        Calculator.setDisplay();
    };

    // check if function called with 'val' parameter then act for ajax calculator
    var refreshVal = function(val) {
        var displayInput = $('.calculator input[type=text]');
        if(!val){ // refreshVal() case
            displayInput.val(Calculator.display);
        }else{ // refreshVal(1) case
            displayInput.val(displayInput.val()+val);
        }
    };

    // for simple calculator
    $('div.key').click(function() {
        //We want this to call onButtonPress function
        if($('.calculator').hasClass('ajax')){
            ajaxCalculator.call(this);
        }else{
            onButtonPress.call(this);
            refreshVal();
        }

    });

    // call '=' action when enter key pressed
    $(document).on("keypress", function (e) {
        if (e.keyCode == 13) {
            $('.equals>div').click();
        }
    });

    // put together expression and check when '=' clicked call calculatorAjaxRequest()
    var ajaxReceived = false;
    var ajaxCalculator = function() {
        var el = $(this);
        if (el.text() == '=') {
            var displayInput = $('.calculator input[type=text]');
            var xhr;
            if (window.XMLHttpRequest) {
                // Not a Microsoft browser
                xhr = new XMLHttpRequest();
            } else if  (window.ActiveXObject) {
                // Microsoft browser
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xhr.onreadystatechange = function(){
                var result = xhr.responseText;
                var resultJSON = JSON.parse(result);
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        if(resultJSON.message != 'success'){ // error while processing JSON at server side
                            $('#exception').text(resultJSON.message);
                        }else{ // otherwise show result
                            $('#exception').text('');
                            displayInput.val(resultJSON.evalResult);
                        }
                        ajaxReceived = true;
                    } else { // error related with request sending
                        $('#exception').text(
                            resultJSON.status+"-"
                            +resultJSON.message+"-"
                            +resultJSON.path);
                    }
                }
            };
            xhr.open("POST", "http://localhost:8080/calc");
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify({expression: displayInput.val()}));
        } else if (el.text() == 'cl') {
            $('.calculator input[type=text]').val('');
        } else {
            if(ajaxReceived){
                $('.calculator input[type=text]').val('');
                ajaxReceived = false;
            }
            refreshVal(el.text());
        }
    };

});
