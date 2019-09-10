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
	var canvas = document.getElementById("circle");
	var d = document.getElementById("d").value;
	var n = document.getElementById("n").value;
	btn = document.getElementById("btn");
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
	} else { // needs method to *dynamically* find angles for nodes:
             // (n = # of nodes to draw)
             // 360/n = x
             // place nodes every x degrees
		/* original nodes, keeping incase I fuck up:
        var theta = [0,
		3 * (Math.PI / 36),
		15 * (Math.PI / 36),
		21 * (Math.PI / 36),
		33 * (Math.PI / 36),
		39 * (Math.PI / 36),
		51 * (Math.PI / 36),
		57 * (Math.PI / 36),
		69 * (Math.PI / 36),
		Math.PI / 6,
		Math.PI / 4,
		Math.PI / 3,
		Math.PI / 2,
		2 * (Math.PI / 3),
		3 * (Math.PI / 4),
		5 * (Math.PI / 6),
		Math.PI,
		7 * (Math.PI / 6),
		5 * (Math.PI / 4),
		4 * (Math.PI / 3),
		3 * (Math.PI / 2),
		5 * (Math.PI / 3),
		7 * (Math.PI / 4),
		11 * (Math.PI / 6)]; */
		btn.innerHTML = "CLEAR";
		btn.onclick = clr;
		var cnv = canvas.getContext("2d"); 
		var x = canvas.width / 2;
		var y = canvas.height / 2;
		var r = d / 2;
		cnv.beginPath();
		cnv.arc(x, y, r, 0, 2 * Math.PI, false); // draws the outer circle
		cnv.lineWidth = 3;
		cnv.strokeStyle = "#FFFFFF";
		cnv.stroke();

		//nodes
		var circleArray = [];
        var theta = [];
		var main = document.getElementById("main");
		for (var i = 0; i < n; i++) {
            var x = 360/n;
            theta[i] = i*(x*(Math.PI / 36)); // sort of works, doesn't seem to play well with multiples of 5
            var div = document.createElement("div");
			div.className = "circle";
			circleArray.push(div);
			circleArray[i].posx = Math.round(r * (Math.cos(theta[i]))) + "px";
			circleArray[i].posy = Math.round(r * (Math.sin(theta[i]))) + "px";
			circleArray[i].style.position = "absolute";
			circleArray[i].style.backgroundColor = "#FFFFFF";
			circleArray[i].style.top = ((canvas.height / 2.1) - parseInt(circleArray[i].posy.slice(0, -2))) + "px";
			circleArray[i].style.left = ((canvas.height / 2.1) + parseInt(circleArray[i].posx.slice(0, -2))) + "px";
			main.appendChild(circleArray[i]);
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