function FindProxyForURL(url, host) {
	const DIRECT = 'DIRECT';
	
	const PLAIN_GS = 'grooveshark.com';
	const PLAIN_CDN = 'gs-cdn.net';
	var proxy = DIRECT;
	
	// no proxying for local net
	if(isPlainHostName(host)) {
		return DIRECT;
	}
	
	var isGrooveShark = dnsDomainIs(host, PLAIN_GS) || dnsDomainIs(host, PLAIN_CDN);
	
	if(!isGrooveShark) {
		/*// For debugging purposes
		if(url.endsWith('Proxychecker.html')) {
			proxy = '85.125.107.18:443';
			alert('Testing proxy ' + proxy);
			return 'PROXY ' + proxy;
		}*/
		
		return DIRECT;
	} else {
		//alert('Grooveshark url is "' + url + '"');
		
		var shouldBeProxied = url.endsWith('index.php') || url.endsWith('/');
		
		if(!shouldBeProxied) {
			return DIRECT;
		}
		
		const HTTP_PROXIES = new Array(
			// France
			'176.31.243.54:3128',
			// Austria
			'213.164.18.147:3128'
		);
		
		const HTTPS_PROXIES = new Array(
			// Austria
			'85.125.107.18:443',
			// Spain
			'83.231.34.133:80',
			'83.231.34.132:3128',
			'213.0.88.86:8080',
			'217.16.255.81:3128',
			'62.37.237.93:8080',
			'62.37.237.89:8080',
			'62.37.237.97:8080',
			'62.37.237.90:8080',
			'62.37.237.72:8080',
			'62.37.237.68:8080',
			'62.37.237.87:8080',
			'62.37.237.67:8080',
			'62.37.237.66:8080',
			'62.37.237.64:8080',
			'62.37.237.61:8080',
			'62.37.237.63:8080',
			'62.37.237.32:8080',
			'62.37.237.25:80',
			'62.37.237.33:8080',
			'62.37.237.31:8080',
			'62.37.237.18:8080',
			'62.37.237.101:8080',
			'83.231.34.193:3128',
			'83.231.34.133:3128',
			'217.13.118.93:80',
			'212.92.46.60:80'
		);
		
		var isHttps = url.startsWith('https');
		var proxyArray = randomSort(isHttps ? HTTPS_PROXIES : HTTP_PROXIES);
		
		proxy = 'PROXY ' + proxyArray.join('; PROXY ');
		
		//alert('Proxy for ' + host + ' is ' + proxy + '; url was ' + url); // we're only ever debugging GS proxies anymore anyway
	}
	
	return proxy;
}

// Shamelessly copied from https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// sorts the given array randomly
// returns a new array
// depending on whether pArray is passed as a reference, the original array might also be rearranged after this.
function randomSort(pArray) {
	var retVal = pArray;
	var uBound = retVal.length - 1;
	var idx = NaN;
	
	for(var i = 0; i < retVal.length; ++i) {
		idx = getRandomInt(0, uBound);
		retVal.push(retVal.splice(idx, 1));
	}
	
	return retVal;
}
