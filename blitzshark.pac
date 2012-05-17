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
			// UK
//			'46.38.191.109:8080',
			'46.23.70.176:3128',
			'78.129.251.87:3128',
			'89.32.145.117:3128',
			// France
			'91.121.106.176:443',
			'94.23.7.67:3128'
		);
		
		const HTTPS_PROXIES = new Array(
			// UK
			'81.138.170.27:443',
			'194.105.160.59:443',
			'217.205.178.130:443',
			'80.168.203.18:443',
			'46.38.191.109:8080',
			'46.23.70.176:3128',
			'78.129.251.87:3128',
			'89.32.145.117:3128',
			'109.123.126.253:8080',
			'83.104.209.81:443',
			'146.255.9.124:3128',
			'85.189.149.91:443',
			'91.85.155.165:443',
			'62.49.68.206:443'
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
