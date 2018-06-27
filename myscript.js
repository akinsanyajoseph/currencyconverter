fetch('https://free.currencyconverterapi.com/api/v5/countries')
  .then(function(response) {
    return response.json();
  })
  .then(function(results) {
    for (const result in results) {
      for (const id in results[result]) {
      	var fromSel = document.getElementById("fromCurrency");
		var toSel = document.getElementById('toCurrency');
		var opt1 = document.createElement('option');
		var opt2 = document.createElement("option");
		opt1.value = results[result][id]["currencyId"];
		opt2.value = results[result][id]["currencyId"];
		let currName = results[result][id]["currencyName"] + " " +"("+results[result][id]["currencyId"]+")";
		opt1.innerHTML = currName;
		opt2.innerHTML = currName; // whatever property it has
		// then append it to the select element
		fromSel.appendChild(opt1);
		toSel.appendChild(opt2);
		   //index++;
          //console.log(opt.value);
            //console.log(results[result][id]["currencyId"]);

            
        
      }
    }
  });

//var https = require('https');

function convertCurrency(amount, fromCurrency, toCurrency, cb) {
  var apiKey = 'your-api-key-here';

  fromCurrency = encodeURIComponent(fromCurrency);
  toCurrency = encodeURIComponent(toCurrency);
  var query = fromCurrency + '_' + toCurrency;

  var url = 'https://www.currencyconverterapi.com/api/v5/convert?q='
            + query + '&compact=ultra&apiKey=' + apiKey;

  https.get(url, function(res){
      var body = '';

      res.on('data', function(chunk){
          body += chunk;
      });

      res.on('end', function(){
          try {
            var jsonObj = JSON.parse(body);

            var val = jsonObj[query];
            if (val) {
              var total = val * amount;
              cb(null, Math.round(total * 100) / 100);
            } else {
              var err = new Error("Value not found for " + query);
              console.log(err);
              cb(err);
            }
          } catch(e) {
            console.log("Parse error: ", e);
            cb(e);
          }
      });
  }).on('error', function(e){
        console.log("Got an error: ", e);
        cb(e);
  });
}

//uncomment to test
/*
convertCurrency(10, 'USD', 'PHP', function(err, amount) {
  console.log(amount);
});
*/