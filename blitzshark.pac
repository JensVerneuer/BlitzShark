function FindProxyForURL(url, host) {
	const DIRECT = 'DIRECT';
	
	const GROOVESHARK = '*.grooveshark.com';
	const PLAIN_GS = 'grooveshark.com';
	const GS_CDN = '*.gs-cdn.net';
	var proxy = DIRECT;
	
	var isGrooveShark = shExpMatch(host, GROOVESHARK) || (host === PLAIN_GS) || shExpMatch(host, GS_CDN);
	
	if(isGrooveShark) {
		const HTTP_PROXIES = new Array(
			// France
			'178.33.173.34:3128',
			'37.59.62.186:3128',
			'188.165.204.152:3128',
			'91.121.58.235:3128',
			'178.33.38.178:3128'
		);
		
		const HTTPS_PROXIES = new Array(
			// France
			'178.33.38.178:3128',
			'178.33.173.34:3128',
			'37.59.62.186:3128',
			'188.165.204.152:3128',
			'91.121.58.235:3128'
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