function onload() {
	document.getElementById("default").checked = true;
	draw();
}

function isNum(evt) {
	evt = (evt) ? evt : window.event;
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode > 31 && (charCode < 48 || charCode > 57)) {
		setTimeout(function() { document.getElementById("error").innerHTML = " "; }, 2500);
		document.getElementById("error").innerHTML = "Only numbers are allowed";
		return false;
	} else {
		return true;
	}
}

function draw() {
	clr();
	var canvas = document.getElementById("circle");
	var d = document.getElementById("d").value;
	var n = document.getElementById("n").value;
	btn = document.getElementById("btn");
	var opts = document.getElementsByName("type");
	var lines = false;
	var disp = true;

	document.getElementById("d_result").value = d;
	document.getElementById("n_result").value = n;

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
		btn.innerHTML = "CLEAR";
		btn.onclick = clr;
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
		var size = 20;
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
			circleArray[i].style.top = ((canvas.height / 2.1) - parseInt(circleArray[i].posy.slice(0, -2))) + "px";
			circleArray[i].style.left = ((canvas.height / 2.1) + parseInt(circleArray[i].posx.slice(0, -2))) + "px";
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
	var canvas = document.getElementById("circle");
	var elements = document.getElementsByClassName("circle");
	while(elements.length > 0) {
		elements[0].parentNode.removeChild(elements[0]);
	}
	canvas.width = canvas.width;
	btn.innerHTML = "DRAW";
	btn.onclick = draw;
}

function reset() {
	d.value = "350";
	n.value = "12";
	draw();
}
