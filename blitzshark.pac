function FindProxyForURL(url, host) {
	const GROOVESHARK = 'grooveshark.com';
	var proxy = 'DIRECT';
	
	// we're only catching grooveshark.com and www.grooveshark.com explicitly,
	// so everything else (especially the music) goes unproxy'd
	if((host === GROOVESHARK) || (host === 'www.' + GROOVESHARK)) { // shExpMatch(host, '*.' + GROOVESHARK) // we'll use this if the wall gets thicker
		const HTTP_PROXIES = new Array(
			// UK
			'81.23.55.150:3128',
			'194.154.22.40:8085',
			'194.154.22.55:8085',
			'194.154.22.39:8085',
			'194.154.22.56:8085',
			'31.3.249.23:80',
			'109.75.171.73:8080',
			'212.219.0.20:3128',
			'212.219.0.20:8080',
			'217.23.231.71:80',
			// France
			'213.246.52.37:3129',
			'94.23.14.145:3128',
			'91.121.16.86:3128',
			// Switzerland
			'109.164.217.29:80',
			'46.19.136.221:8080',
			'46.19.136.200:8080',
			'46.19.143.93:8080'
		);
		
		const HTTPS_PROXIES = new Array(
			// UK
			'80.168.203.18:443',
			'194.154.22.40:8085',
			'194.154.22.56:8085',
			'194.154.22.39:8085',
			'194.154.22.55:8085',
			'31.3.249.23:80',
			'62.49.68.206:443',
			'80.176.169.2:443',
			'80.87.143.45:80',
			'109.75.171.73:8080',
			'91.85.155.165:443',
			'212.219.0.20:3128',
			'212.219.0.20:8080',
			'83.104.209.81:443',
			'217.23.231.71:80',
			'217.46.179.9:443',
			'80.176.151.37:443',
			'81.23.55.150:3128',
			'217.205.178.130:443',
			// France
			'81.255.151.210:443',
			'213.246.52.37:3129',
			'81.80.78.186:443',
			'94.23.14.145:3128',
			'92.243.0.223:3128',
			'194.51.100.37:443',
			// Switzerland
			'46.19.136.200:8080',
			'46.19.143.93:8080',
			'109.164.217.29:80',
			'46.19.136.221:8080',
			'31.7.58.198:8080',
			'81.23.65.52:443',
			// Austria
			'85.125.107.18:443',
			'81.189.114.251:443'
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
	
	//DEBUG alert('Proxy for ' + host + ' via ' + protocol + ' is ' + proxy); // protocol will be undefined if we're not going to GS. That's fine.
	return proxy;
}