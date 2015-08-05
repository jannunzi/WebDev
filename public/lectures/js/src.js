(function(){
	var a = 2;
	var b = 4;
	var c = Math.pow(a, b);
	var fact = 1;
	for(var i=1; i<=5; i++)
	{
		fact = fact * i;
	}
	
	var arr = [12,89,54,23,45,78,90,76,54,43];
	var min = arr[0];
	var max = arr[0];
	for(var j=0; j<arr.length; j++)
	{
		if(arr[i] > max)
			max = arr[i];
		if(arr[i] < min)
			min = arr[i];
	}
	//alert("Min: " + min);
	//alert("Max: " + max);
	var min2 = minFunc(arr);
	alert("Min2: " + min2);
	
	function minFunc(arr)
	{
		var min = arr[0];
		console.log(min);
		for(var j=0; j<arr.length; j++)
		{
			if(arr[j] < min)
				min = arr[j];
		}
		return min;
	}
})();
