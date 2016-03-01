var ele1 = document.getElementById('target1');
var ele2 = document.getElementById('target2');
var ele3 = document.getElementById('target3');

//ele.onmousedown = eleMouseDown;
ele1.addEventListener ("mousedown" , eleMouseDown , false);
ele2.addEventListener ("mousedown" , eleMouseDown , false);
ele3.addEventListener ("mousedown" , eleMouseDown , false);

function eleMouseDown () {
    stateMouseDown = true;
    document.addEventListener ("mousemove" , eleMouseMove , false);
}

function eleMouseMove (ev) {
    console.log(ev.target.id);
    var element = document.getElementById(ev.target.id);
    var pX = ev.pageX;
    var pY = ev.pageY;
    element.style.left = pX + "px";
    element.style.top = pY + "px";
    document.addEventListener ("mouseup" , eleMouseUp , false);
}

function eleMouseUp () {
    document.removeEventListener ("mousemove" , eleMouseMove , false);
    document.removeEventListener ("mouseup" , eleMouseUp , false);
}