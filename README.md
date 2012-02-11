# B L I T Z S H A R K #
BlitzShark is a repository of tools and knowledge to assist Germans and people
going through German Internet connections in accessing Grooveshark despite GS's
attempts to ban them.

## Background ##
[GrooveShark Unlocker](https://addons.mozilla.org/de/firefox/addon/grooveshark-unlocker/) is a step in the right direction and was the preferred choice of dealing with the issue,
until it stopped working. overlord1337 has done some fine work creating it, but
GS Unlocker seems to be mostly a "quick fix" solution: Its way of introducing the
proxies into the system is blunt and inflexible, its proxy-list is short and updates
to the list require an update of the extension as a whole.

While this is fine as a short term fix, it seems like The Great Grooveshark Barrier
is here to stay, so we should start preparing a long term fix.

## PAC File ##
PAC stands for Proxy Auto-Config and is an ancient Netscape standard to conditionally
select proxy settings depending on the target of the request - in other words,
exactly what barred Grooveshark users need.

The PAC file in this repository will tell the browser/system to use one of a list
of proxies to go to grooveshark.com or wwww.grooveshark.com, and no proxy for any
other site.

The PAC file _should_ work with all browsers, but it was developed and only tested
on Firefox.

### Differences to Grooveshark Unlocker ###
- _The PAC file is "dumb"_. It only knows "proxy for Grooveshark" and "no proxy".
  You __cannot__ use the PAC file in an environment where you need a proxy to
  connect to the Internet.
- _The PAC file offers the browser/system all proxies at once_.
  This is unlike GS Unlocker, where you have to refresh again and again to change
  the proxy Firefox uses.
- _The PAC file operates permanently_. GS Unlocker changes the proxy settings
  whenever you send a request to grooveshark.com. The PAC file is set once and
  does its job, without further changes to the settings.

### Usage ###
PAC file usage can be boiled down to two steps:
1. Download the PAC file or copy the URL: https://raw.github.com/EvilRenegade/BlitzShark/master/blitzshark.pac
2. Set your browser to use the PAC file from your preferred location, either where
   you downloaded it to, or the URL you copied.

Firefox: Tools or Edit -> Options -> Advanced -> Network -> Connection/Settings -> Automatic proxy configuration URL (https://www.youtube.com/watch?v=nKB4FoPw15k)
Internet Explorer: [Microsoft Support about setting a proxy for IE](http://support.microsoft.com/kb/135982) -> Then see _LAN Settings_ below.
Chrome: [Chrome-help about proxy settings](https://support.google.com/chrome/bin/answer.py?hl=en&answer=96815) -> Then see _LAN Settings_ below.
Opera: [Opera-help about proxy settings](http://www.opera.com/support/kb/view/332/) (Section _Automatic proxy configuration_)
Safari: [Safari-help about proxy settings](http://docs.info.apple.com/article.html?path=Safari/5.0/en/9299.html)

#### LAN Settings ####
In the LAN Settings dialog, instead of configuring a proxy server in the lower portion,
check the "Use automatic configuration script" checkbox in the upper segment and
paste the location of the PAC file into the "Address" text field. Then click OK, obviously.

### Benutzung ###
Es sind im Endeffekt nur zwei Schritte noetig, um die PAC-Datei einzubinden:
1. Laden Sie die PAC-Datei herunter oder kopieren Sie die URL: https://raw.github.com/EvilRenegade/BlitzShark/master/blitzshark.pac
2. Stellen Sie Ihren Browser so ein, dass er die PAC-Datei benutzt; entweder von
   dem Ort, an den Sie sie heruntergeladen haben, oder von der kopierten URL.

Firefox: Extras oder Bearbeiten -> Einstellungen -> Erweitert -> Netzwerk -> Verbindung/Einstellungen -> Automatische Proxy-Konfigurations-URL
Internet Explorer: [Microsoft Support ueber Proxyeinstellungen fuer IE](http://support.microsoft.com/kb/135982/de-de) -> Danach siehe _LAN-Einstellungen_ weiter unten.
Chrome: [Chrome-Hilfe zu Proxyeinstellungen](https://support.google.com/chrome/bin/answer.py?hl=de&answer=96815) -> Danach siehe _LAN-Einstellungen_ weiter unten.
Opera: Noch nicht bekannt.
Safari: Noch nicht bekannt.

#### LAN-Einstellungen ####
Anstatt im LAN-Einstellungen-Fenster im unteren Bereich einen Proxyserver zu konfigurieren, 
setzen Sie das Haekchen bei "Automatisches Konfigurationsskript verwenden" und fuegen
Sie den Pfad zur PAC-Datei in das mit "Adresse" beschriftete Textfeld ein. Danach klicken Sie auf "OK".

### See also ###
- [Wikipedia on PAC files](https://en.wikipedia.org/wiki/Proxy_auto-config)
- [GrooveShark Unlocker](https://addons.mozilla.org/de/firefox/addon/grooveshark-unlocker/)
- [University of Connecticut information on how to use their PAC file with a variety of browsers](http://www.helpdesk.uconn.edu/trouble/proxy/autoprox.html)
- [University of Melbourne information on how to use their PAC file with multiple browsers across multiple OSs](http://www.its.unimelb.edu.au/support/networks/proxy)

## Extension ##
Sometime in the future, there should be an extension which automatically adjusts
the PAC file with existing proxy settings on the end user's computer, as well as
recognizes the Grooveshark blocking page and automatically refreshes if it is
encountered.