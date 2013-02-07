function FindProxyForURL(url, host) {
	const DIRECT = 'DIRECT';
	
	const GROOVESHARK = '*.grooveshark.com';
	const PLAIN_GS = 'grooveshark.com';
	const GS_CDN = '*.gs-cdn.net';
	var proxy = DIRECT;
	
	var isGrooveShark = shExpMatch(host, GROOVESHARK) || (host === PLAIN_GS) || shExpMatch(host, GS_CDN);
	
	if(isGrooveShark) {
		const HTTP_PROXIES = new Array(
			// Spain
			'37.72.0.152:8080',
			// Turkey
			'212.175.88.3:8080',
			'176.117.96.25:8080',
			'77.92.131.66:80',
			'195.175.76.246:8080'
		);
		
		const HTTPS_PROXIES = new Array(
			// Spain
			'213.96.129.179:443',
			'62.37.237.97:8080',
			'83.231.34.133:80',
			'83.231.34.132:3128',
			'83.231.34.193:3128',
			'83.231.34.133:3128',
			'195.57.69.154:80',
			'62.37.237.90:8080',
			'62.37.237.87:8080',
			'62.37.237.93:8080',
			'62.37.237.89:8080',
			'62.37.237.72:8080',
			'62.37.237.67:8080',
			'62.37.237.68:8080',
			'62.37.237.66:8080',
			'62.37.237.64:8080',
			'62.37.237.63:8080',
			'62.37.237.32:8080',
			'62.37.237.61:8080',
			'62.37.237.33:8080',
			'62.37.237.31:8080',
			'62.37.237.25:80',
			'62.37.237.18:8080',
			'62.37.237.101:8080'
		);
		
		var protocol = url.split(':', 1);
		var proxyArray = null;
		
		if(protocol.length < 1) { // no protocol/schema in URL. This would be weird, but we're not taking chances
			return proxy; // still 'DIRECT' at this point, leaving this non-hardcoded in case the default changes at some point
		}
		
		protocol = protocol[0]; // the magic of weakly-typed languages
		
		switch(protocol) {
			case 'http':
				proxyArray = randomSort(HTTP_PROXIES);
				break;
			case 'https':
				proxyArray = randomSort(HTTPS_PROXIES);
				break;
			default:
				return proxy; // still 'DIRECT' at this point, leaving this non-hardcoded in case the default changes at some point
		}
	
		proxy = 'PROXY ' + proxyArray.join('; PROXY ');
	}
	
	alert('Proxy for ' + host + ' via ' + protocol + ' is ' + proxy); // protocol will be undefined if we're not going to GS. That's fine.
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