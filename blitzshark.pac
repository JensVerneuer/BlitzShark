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
			'91.121.203.56:3128',
			'37.59.236.42:3128',
			'195.25.110.87:80',
			'87.98.136.60:80'
		);
		
		const HTTPS_PROXIES = new Array(
			// France
			'91.121.203.56:3128',
			'84.14.176.145:3128',
			'37.59.236.42:3128',
			'195.25.110.87:80',
			'194.51.100.37:443',
			'94.23.193.165:8080'
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
