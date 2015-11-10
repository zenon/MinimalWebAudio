    
function fourier(x, back){
    // I assume that s has the right form.
    var N = x.re.length;
    var pi = 3.1415926;
    var a = 2 * pi / N;
    var X = {};
    X.re = [];
    X.im = [];
    for (k = 0; k < N; k++){
	// X_k = Sum x_n e^(-2 pi i n k / N)
	// X_k = Sum x_n * (cos(2 pi n k / N) - i * sin(2 pi n k / N))
	// X_k = Sum x_n * (cos(a n k) - i * sin(a n k))
	// X_k.re = Sum x_n.re * cos(a n k) +
	// X_k.im = Sum x_n.im * sin(a n k)
	X.re[k] = 0;
	X.im[k] = 0;
        for (n = 0; n < N; n++){
	    if(back){
		X.re[k] = X.re[k] + x.re[n] * Math.cos(a*n*k) - x.im[n] * Math.sin(a*n*k);
		X.im[k] = X.im[k] + x.im[n] * Math.cos(a*n*k) + x.re[n] * Math.sin(a*n*k);
	    } else {
		X.re[k] = X.re[k] + x.re[n] * Math.cos(a*n*k) + x.im[n] * Math.sin(a*n*k);
		X.im[k] = X.im[k] + x.im[n] * Math.cos(a*n*k) - x.re[n] * Math.sin(a*n*k);
	    }
	}
	if(back){
	    X.re[k] = X.re[k]/N;
	    X.im[k] = X.im[k]/N;
	}
    }
    return X;
}


function paintSignal(x, canvas1, canvas2){
    var widthR  = canvas1.width;
    var heightR = canvas1.height;
    var widthI  = canvas2.width;
    var heightI = canvas2.height;
    var length = x.re.length;
    var maximumR = x.re[0];
    var minimumR = x.re[0];
    var maximumI = x.im[0];
    var minimumI = x.im[0];
    for(i = 1; i < length; i++){
	if(x.re[i] > maximumR){maximumR = x.re[i];}
	if(x.re[i] <  minimumR){minimumR = x.re[i];}
	if(x.im[i] > maximumI){maximumI = x.im[i];}
	if(x.im[i] <  minimumI){minimumI = x.im[i];}
    }
    if(minimumR > -1){minimumR = -1;}
    if(maximumR <  1){maximumR =  1;}
    if(minimumI > -1){minimumI = -1;}
    if(maximumI <  1){maximumI =  1;}
    var scaleXR = widthR * 0.98 / length;
    var scaleYR = heightR * 0.9 /(maximumR - minimumR);
    var scaleXI = widthI * 0.98 / length;
    var scaleYI = heightI * 0.9 /(maximumI - minimumI);
    var ctx1 = canvas1.getContext('2d');
    var ctx2 = canvas2.getContext('2d');
    ctx1.clearRect(0, 0, widthR, heightR);
    ctx2.clearRect(0, 0, widthI, heightI);
    for(i = 0; i < length; i++){
	ctx1.fillRect(i*scaleXR, (maximumR - x.re[i])*scaleYR,2,2);
	ctx2.fillRect(i*scaleXI, (maximumI - x.im[i])*scaleYI,2,2);
    }
    ctx1.fillRect(0, maximumR*scaleYR,widthR,1);
    ctx2.fillRect(0, maximumI*scaleYI,widthI,1);
}

function diff(s1, s2){
    var N = s1.re.length;
    var d = {};
    d.re = [];
    d.im = [];
    for(i = 0; i < N; i++){
	d.re[i] = s1.re[i] - s2.re[i];
	d.im[i] = s1.im[i] - s2.im[i];
    }
    return d;
}

// ########################## UI

function signal(signalName, N, M, b, quant){
    var s = {};
    s.re = [];
    s.im = [];

    switch(signalName) {
    case "delta": {
	for(i = 0; i < N; i++){
	    s.re[i] = 0.0;
	    s.im[i] = 0.0;
	}
	if(0 <= b && b < N){
	    s.re[b] = 1.0;
	}else{
	    s.re[0] = 1.0;
	}
	break;
    }
    case "sine": {
	var periods = M;
	if(periods == 0){periods = 1;}
	var a = 2*3.1415926*periods/N;
	for(i = 0; i < N; i++){
	    s.re[i] = Math.sin(a * (i - b));
	    s.im[i] = 0.0;
	}
	break;
    }
    case "cosine": {
	var periods = M;
	if(periods == 0){periods = 1;}
	var a = 2*3.1415926*periods/N;
	for(i = 0; i < N; i++){
	    s.re[i] = Math.cos(a * (i - b));
	    s.im[i] = 0.0;
	}
	break;
    }
    case "sawtooth": {
	var tooth;
	if(M == 0){
	    tooth = N;
	}else{
	    tooth = Math.floor(N / M);
	}
	console.log("Sawtoot, one tooth has length " + tooth);
	for(t = 0; t <= M; t++){
	    for(i = 0; i < tooth; i++){
		if(t*tooth+i < N){
		    s.re[t*tooth+i] = ((i-b)-(tooth/2)) / tooth;
		    s.im[t*tooth+i] = 0.0;
		}
	    }
	}
	break;
    }
    case "ramp": {
	var tooth;
	if(M == 0){
	    tooth = N;
	}else{
	    tooth = Math.floor(N / M);
	}
	console.log("Ramp, one tooth has length " + tooth);
	for(t = 0; t <= M; t++){
	    for(i = 0; i < tooth; i++){
		if(t*tooth+i < N){
		    s.re[t*tooth+i] = ((tooth/2)-(i-b)) / tooth;
		    s.im[t*tooth+i] = 0.0;
		}
	    }
	}
	break;
    }
    case "triangle": {
	var tooth;
	if(M == 0){
	    tooth = N;
	}else{
	    tooth = Math.floor(N / M);
	}
	console.log("triangle, one has length " + tooth);
	for(t = 0; t <= M; t++){
	    for(i = 0; i < tooth / 2; i++){
		if(t*tooth+i < N){
		    s.re[t*tooth+i] = ((i-b)-(tooth/4)) / tooth;
		    s.im[t*tooth+i] = 0.0;
		}
	    }
	    for(i = Math.ceil(tooth / 2); i < tooth; i++){
		if(t*tooth+i < N){
		    s.re[t*tooth+i] = ((3*tooth/4)-(i-b)) / tooth;
		    s.im[t*tooth+i] = 0.0;
		}
	    }
	}
	break;
    }
    case "square": {
	var tooth;
	if(M == 0){
	    tooth = N;
	}else{
	    tooth = Math.floor(N / M);
	}
	console.log("square, one has length " + tooth);
	for(t = 0; t <= M; t++){
	    for(i = 0; i < tooth / 2; i++){
		if(t*tooth+i < N){
		    s.re[t*tooth+i] = 1;
		    s.im[t*tooth+i] = 0.0;
		}
	    }
	    for(i = Math.ceil(tooth / 2); i < tooth; i++){
		if(t*tooth+i < N){
		    s.re[t*tooth+i] = -1;
		    s.im[t*tooth+i] = 0.0;
		}
	    }
	}
	break;
    }
    case "pulse": {
	var tooth;
	var pulse;
	if(M == 0){
	    tooth = N;
	}else{
	    tooth = Math.floor(N / M);
	}
	if(b > 0){
	    pulse = b;
	}else{
	    pulse = 1;
	}
	console.log("pulse, one has length " + pulse + ", one period has length " + tooth);
	for(t = 0; t <= M; t++){
	    for(i = 0; i <=pulse; i++){
		if(t*tooth+i < N){
		    s.re[t*tooth+i] = 1.0;
		    s.im[t*tooth+i] = 0.0;
		}
	    }
	    for(i = pulse+1; i < tooth; i++){
		if(t*tooth+i < N){
		    s.re[t*tooth+i] = -1.0;
		    s.im[t*tooth+i] = 0.0;
		}
	    }
	}
	break;
    }
    case "noise": {
	for(i = 0; i < N; i++){
	    s.re[i] = (Math.random() * 2) - 1;
	    s.im[i] = (Math.random() * 2) - 1;
	}
	break;
    }
    case "noiseR": {
	for(i = 0; i < N; i++){
	    s.re[i] = (Math.random() * 2) - 1;
	    s.im[i] = 0.0;
	}
	break;
    }
    case "noiseI": {
	for(i = 0; i < N; i++){
	    s.re[i] = 0.0;
	    s.im[i] = (Math.random() * 2) - 1;
	}
	break;
    }
    default: console.log("No function with name " + signalName + " implemented.");
    }
    //quantize
    for(i = 0; i < N; i++){
	s.re[i] = Math.round(s.re[i]*quant)/quant;
	s.im[i] = Math.round(s.im[i]*quant)/quant;
    }
    return s;
}

function draw(){
    var form = document.getElementById('signalDescription');
    var canvas1 = document.getElementById('canvas01');
    var canvas2 = document.getElementById('canvas02');
    var canvas3 = document.getElementById('canvas03');
    var canvas4 = document.getElementById('canvas04');
    var canvas5 = document.getElementById('canvas05');
    var canvas6 = document.getElementById('canvas06');
    var canvas7 = document.getElementById('canvas07');
    var canvas8 = document.getElementById('canvas08');

    var form = document.getElementById("signalDescription");
    var signalName = document.querySelector('input[name="signal"]:checked').value;
	//form.elements["signal"].value; // doesn't work with IE
    var N = parseInt(form.elements["N"].value);
    var M = parseInt(form.elements["M"].value);
    var quant = parseInt(form.elements["sampleSize"].value);
    var b = parseInt(form.elements["b"].value);
    console.log("signal: " + signalName + ", with parameters N=" + N + ", M=" + M);
    var s = signal(signalName, N, M, b, quant);
    paintSignal(s, canvas1, canvas2);
    var S = fourier(s);
    paintSignal(S, canvas3, canvas4);
    var s2 = fourier(S);
    paintSignal(s2, canvas5, canvas6);
    paintSignal(diff(s, fourier(S, true)), canvas7, canvas8);
}
