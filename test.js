var http = require('http');
var fs = require('fs');
var index = fs.readFileSync('index.html');
var timestamp = '';
var exchange_rates = []
var i;

http.createServer(function (req, res) {
	
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.write(index);
	for (i = 0; i < exchange_rates.length; i++) {
		res.write(exchange_rates[i] + '\n');
	}
	res.end();
}).listen(8001);

// Load up required modules:
var fx = require('money'),
oxr = require('open-exchange-rates');

// Set App ID (required):
oxr.set({
	app_id: 'e631d51055c443249de4c001f915da8b'
});

// Get latest exchange rates from API and pass to callback function:
oxr.latest(function(error) {
	if ( error ) {
        // `error` will contain debug info if something went wrong:
        console.log( 'ERROR loading rates from API! Error was:' )
        console.log( error.toString() );

        return false;
    }

    // Rates are now stored in `oxr` object as `oxr.rates`

    // The timestamp (published time) of the rates is in `oxr.timestamp`:
    timestamp = ('timestamp: ' + (new Date(oxr.timestamp)).toUTCString());

    // Each currency is a property in the object/hash, e.g:
    exchange_rates.push(('EUR: ' + oxr.rates.EUR));
    exchange_rates.push(usdtogbp = ('GBP: ' + oxr.rates.GBP));
    exchange_rates.push(usdTohkd = ('INR: ' + oxr.rates.INR));
    exchange_rates.push(usdTohkd = ('AUD: ' + oxr.rates.AUD));
    exchange_rates.push(usdTohkd = ('CAD: ' + oxr.rates.CAD));
    exchange_rates.push(usdTohkd = ('ZAR: ' + oxr.rates.ZAR));
    exchange_rates.push(usdTohkd = ('NZD: ' + oxr.rates.NZD));
    exchange_rates.push(usdTohkd = ('JPY: ' + oxr.rates.JPY));
});