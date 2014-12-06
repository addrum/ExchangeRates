var http = require('http');
var fs = require('fs');
var index;
var timestamp = '';
var exchange_rates = [];
var i;

fs.readFile('./index.html', function (err, data) {
    if (err) {
        throw err;
    }
    index = data;
});

http.createServer(function (req, res) {
	
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(index);
	for (i = 0; i < exchange_rates.length; i++) {
        res.write('<tr>');
		res.write('<td>' + exchange_rates[i].code + '</td>' + '<td>' + exchange_rates[i].rate + '</td>');
        res.write('</tr>');
	}    
    res.write('</table>');
	res.end();
}).listen(8002);

// Load up required modules:
var fx = oxr = require('open-exchange-rates');

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
    exchange_rates.push({code: 'EUR: ', rate: oxr.rates.EUR});
    exchange_rates.push({code: 'GBP: ', rate: oxr.rates.GBP});
    exchange_rates.push({code: 'INR: ', rate: oxr.rates.INR});
    exchange_rates.push({code: 'AUD: ', rate: oxr.rates.AUD});
    exchange_rates.push({code: 'CAD: ', rate: oxr.rates.CAD});
    exchange_rates.push({code: 'ZAR: ', rate: oxr.rates.ZAR});
    exchange_rates.push({code: 'NZD: ', rate: oxr.rates.NZD});
    exchange_rates.push({code: 'JPY: ', rate: oxr.rates.JPY});
});