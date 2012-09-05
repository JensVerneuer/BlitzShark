function FindProxyForURL(url, host) {
	const GROOVESHARK = '*.grooveshark.com';
	const PLAIN_GS = 'grooveshark.com';
	const GS_CDN = '*.gs-cdn.net';
	var proxy = 'DIRECT';
	
	// we're only catching grooveshark.com and www.grooveshark.com explicitly,
	// so everything else (especially the music) goes unproxy'd
	if(shExpMatch(host, GROOVESHARK) || (host === PLAIN_GS) || shExpMatch(host, GS_CDN)) {
		// alert('Proxy for host ' + host);
		const HTTP_PROXIES = new Array(
			// France
			'213.251.186.110:3128',
			'91.121.137.103:3128',
			'37.59.122.182:3128',
			'178.170.101.200:3128',
			'91.121.6.36:3128',
			'94.23.114.125:8080'
		);
		
		const HTTPS_PROXIES = new Array(
			// France
			'94.23.229.161:8080',
			'37.59.122.182:3128',
			'94.23.38.16:3128',
			'178.170.101.200:3128',
			'91.121.6.36:3128',
			'194.51.100.37:443',
			'94.23.114.125:8080',
			'84.14.176.145:3128',
			'176.31.107.35:3128'
		);
		
		var protocol = url.split(':', 1);
		var proxyArray = null;
		
		if(protocol.length < 1) { // no protocol/schema in URL. This would be weird, but we're not taking chances
			return proxy; // still 'DIRECT' at this point, leaving this non-hardcoded in case the default changes at some point
		}
		
		protocol = protocol[0]; // the magic of weakly-typed languages
		
		switch(protocol) {
			case 'http':
				proxyArray = HTTP_PROXIES;
				break;
			case 'https':
				proxyArray = HTTPS_PROXIES;
				break;
			default:
				//DEBUG alert('Proxy for ' + host + ' via ' + protocol + ' is ' + proxy);
				return proxy; // still 'DIRECT' at this point, leaving this non-hardcoded in case the default changes at some point
		}
	
		proxy = 'PROXY ' + proxyArray.join('; PROXY ');
	}
	
	// DEBUG alert('Proxy for ' + host + ' via ' + protocol + ' is ' + proxy); // protocol will be undefined if we're not going to GS. That's fine.
	return proxy;
}
