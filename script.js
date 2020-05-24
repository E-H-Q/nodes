function onload() {
	document.getElementById("default").checked = true;
	reset();
}

var txt = false; // determines whether to use the text-box input, or the slider input

function isNum(evt) {
	evt = (evt) ? evt : window.event;
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode > 31 && (charCode < 48 || charCode > 57)) {
		setTimeout(function() { document.getElementById("error").innerHTML = " "; }, 2500);
		document.getElementById("error").innerHTML = "Only numbers are allowed";
		return false;
	}
	else if (charCode == 13) {
		txt = true;
		draw();
	} else {
		return true;
	}
}

dragElement(document.getElementById("container"));

function dragElement(elmnt) {
	var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	elmnt.onmousedown = dragMouseDown;

	function dragMouseDown(e) {
		e = e || window.event;
		e.preventDefault();
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		document.onmousemove = elementDrag;
	}

	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		var main = document.getElementById("main");
		main.style.top = (main.offsetTop - pos2) + "px";
		main.style.left = (main.offsetLeft - pos1) + "px";
	}

	function closeDragElement() {
		document.onmouseup = null;
		document.onmousemove = null;
	}
}

function draw() {
	var canvas = document.getElementById("circle");
	if (txt == false) { // reads from sliders
		var d = document.getElementById("d").value;
		var n = document.getElementById("n").value;
		var s = document.getElementById("s").value;
		document.getElementById("d_result").value = d;
		document.getElementById("n_result").value = n;
		document.getElementById("s_result").value = s;
	} else { // reads from text-input
		var d = document.getElementById("d_result").value;
		var n = document.getElementById("n_result").value;
		var s = document.getElementById("s_result").value;
		document.getElementById("d").value = d;
		document.getElementById("n").value = n;
		document.getElementById("s").value = s;
		
	}
	btn = document.getElementById("btn");
	var opts = document.getElementsByName("type");
	var lines = false;
	var disp = true;
	clr();

	for (var i = 0, length = opts.length; i < length; i++) {
		if (opts[i].checked) {
			if (opts[i].value == "circle") {
				lines = false;
			}
			else if (opts[i].value == "lines") {
				lines = true;
			}
			else if (opts[i].value == "disp") {
				disp = false;
			}
		}
	}
	if (d == "") {
		setTimeout(function() { document.getElementById("error").innerHTML = " "; }, 2500);
		document.getElementById("error").innerHTML = "No diameter given";
	}
	else if (d > 500) {
		setTimeout(function() { document.getElementById("error").innerHTML = " "; }, 2500);
		document.getElementById("error").innerHTML = "Max diameter is 500";
    }
    else if (n > 24) {
        setTimeout(function() { document.getElementById("error").innerHTML = " "; }, 2500);
        document.getElementById("error").innerHTML = "Max # of nodes is 24";
	} else { // method to *dynamically* find angles for nodes:
             // (n = # of nodes to draw)
             // 360/n = x
             // place nodes every x degrees
		var cnv = canvas.getContext("2d"); 
		var x = canvas.width / 2;
		var y = canvas.height / 2;
		var r = d / 2;
		cnv.beginPath();
		cnv.lineWidth = 3;
		cnv.strokeStyle = "#FFFFFF";
		if (lines == false) {
			cnv.arc(x, y, r, 0, 2 * Math.PI, false); // draws the outer circle
			if (disp == true) {
				cnv.stroke();
			}
		}

		//nodes
		var size = s; // changes size of nodes
		var pos = 0;
		var circleArray = [];
        var theta = [];
		var main = document.getElementById("main");
		for (var i = 0; i < n; i++) {
            var x = 360/n;
			if (n % 5 == 0) {
				theta[i] = i*(x*(115));
			} else {
				theta[i] = i*(x*(Math.PI / 36));
			}
            var div = document.createElement("div");
			div.className = "circle";
			circleArray.push(div);
			circleArray[i].posx = Math.round(r * (Math.cos(theta[i]))) + "px";
			circleArray[i].posy = Math.round(r * (Math.sin(theta[i]))) + "px";
			circleArray[i].style.position = "absolute";
			circleArray[i].style.width = size + "px";
			circleArray[i].style.height = size + "px";
			circleArray[i].style.backgroundColor = "#FFFFFF";
			if (size > 20) {
				diff = size - 20;
				pos = 2.1 + 0.05 * (diff/10);
			} else {
				pos = 2.1;
			}
			circleArray[i].style.top = ((canvas.height / pos) - parseInt(circleArray[i].posy.slice(0, -2))) + "px";
			circleArray[i].style.left = ((canvas.height / pos) + parseInt(circleArray[i].posx.slice(0, -2))) + "px";
			
			// gets the coords of each node
			console.log("X: " + Math.round(((canvas.height / pos) - parseInt(circleArray[i].posx.slice(0, -2)))) + "\n"
				+ "Y: " + Math.round(((canvas.height / pos) - parseInt(circleArray[i].posy.slice(0, -2)))));
			
			main.appendChild(circleArray[i]);
			if (lines == true) {
				cnv.moveTo(250, y);
				cnv.lineTo((canvas.height / 2) + parseInt(circleArray[i].posx.slice(0, -2)), (canvas.height / 2) - parseInt(circleArray[i].posy.slice(0, -2)));
				cnv.stroke();
			}
		}
	}
}

function clr() {
	txt = false;
	var canvas = document.getElementById("circle");
	var elements = document.getElementsByClassName("circle");
	while(elements.length > 0) {
		elements[0].parentNode.removeChild(elements[0]);
	}
	canvas.width = canvas.width;
	btn.onclick = reset;
}

function reset() {
	txt = false;
	d.value = "350";
	n.value = "12";
	s.value = "20";
	main.style.top = (0) + "px";
	main.style.left = (0) + "px";
	draw();
}
