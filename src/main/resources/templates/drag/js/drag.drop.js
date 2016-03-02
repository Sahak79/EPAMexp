var DragModule = (function() {

    var elements = document.getElementsByClassName('target');
    var currentElement;
    var deltaPX;
    var deltaPY;
    var initialZIndexItem = 0;

    function init(){
        for (var i = 0; i < elements.length; i++) {
            elements[i].addEventListener("mousedown", eleMouseDown, false);
        }
        document.querySelector('body').onkeydown = function (e) {
            if ( !e.metaKey ) {
                e.preventDefault();
            }
            if(e.keyCode == 9){
                resetZIndex();
                elements[initialZIndexItem].style.zIndex = elements.length;
                incrementInitialZIndexItemIndex();

            }
        };
    }

    function incrementInitialZIndexItemIndex() {
        initialZIndexItem < elements.length - 1 ? initialZIndexItem++ : initialZIndexItem = 0;
    }

    function resetZIndex() {
        for (var i = 0; i < elements.length; i++) {
            document.getElementsByClassName('target')[i].style.zIndex = i;
        }
    }

    function setDelta(el) {
        deltaPX = currentElement.offsetLeft - el.x;
        deltaPY = currentElement.offsetTop - el.y;
    }

    function eleMouseDown(el) {
        currentElement = el.target;
        setDelta(el);
        resetZIndex();
        currentElement.style.zIndex = elements.length;
        document.addEventListener("mousemove", eleMouseMove, false);
    }

    function eleMouseMove(ev) {
        var pX = ev.pageX;
        var pY = ev.pageY;
        currentElement.style.left = pX + deltaPX + "px";
        currentElement.style.top = pY + deltaPY + "px";
        document.addEventListener("mouseup", eleMouseUp, false);
    }

    function eleMouseUp() {
        document.removeEventListener("mousemove", eleMouseMove, false);
        document.removeEventListener("mouseup", eleMouseUp, false);
    }

    return{
        init : init
    }
})();

DragModule.init();
