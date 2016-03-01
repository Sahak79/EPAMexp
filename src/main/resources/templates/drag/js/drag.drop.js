var DragModule = (function() {

    var elements = document.getElementsByClassName('target');
    var currentElement;

    function init(){
        for (var i = 0; i < elements.length; i++) {
            document.getElementsByClassName('target')[i].addEventListener("mousedown", eleMouseDown, false);
        }
    }

    function resetZIndex() {
        for (var i = 0; i < elements.length; i++) {
            document.getElementsByClassName('target')[i].style.zIndex = i;
        }
    }

    function eleMouseDown(el) {
        currentElement = el.target;
        resetZIndex();
        currentElement.style.zIndex = elements.length;
        document.addEventListener("mousemove", eleMouseMove, false);
    }

    function eleMouseMove(ev) {
        var pX = ev.pageX;
        var pY = ev.pageY;
        currentElement.style.left = pX + "px";
        currentElement.style.top = pY + "px";
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
