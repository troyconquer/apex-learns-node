'use strict';

var async = require('async');


//This is supposed to represent fetching data from a database
// then doing some processing with async.waterfall. setTimeout 
// is the specific abstract to db calls.
function getCampaignsByAccountId( accountId, cb ) {
	async.waterfall( [
		function getCampaigns( callback ) {
			//pretend this is a http request to mongodb
			accountId = '009';

			var campaigndata = {
				campaigns : [
					{
						accountId : '009',
						type : 'Campaign',
						id : 'CCCC1',
						desc : 'fake campaign record'
					},
					{
						accountId : '009',
						type : 'Campaign',
						id : 'CCCC2',
						desc : 'fake campaign record'
					}
				]
			};

			setTimeout( function(){
				//node callback pattern uses the 1st param of a callback for errors
				//assume no errors in this example. the timeout simulates read times
				//from a callout.
				console.log( 'got campaigns' );
				callback( null, campaigndata);
			}, 1000);
		},

		//++++KEY OBSERVATION++++//
		//I found this a little confusing when first attempting waterfall.
		// But that is because I don't totally grasp the callback pattern
		// at this point (2/4/14). The previous calls the callback with the 1st
		// param being 'null', but that null does not get passed to the next
		// task in the list. Why?..
		function getAccountById( campData, callback ) {
			console.log( 'waterfalled campaign data: %j', campData);

			accountId = '009';

			//pretend this is a http request data from mongodb
			var accountData = {
				Id : '009',
				type : 'Account',
				name : 'Heroku Partner Channel',
				desc : 'Our entity for dealing with heroku as a business.'
			};

			
			//substitute dbconn.account.findOne(..) here
			setTimeout( function(cData){
				console.log( 'timeout campaign data: %j', cData);
				//node callback pattern uses the 1st param of a callback for errors
				//assume no errors in this example. the timeout simulates read times
				//from a callout.
				console.log( 'got account data' );
				callback( null, accountData);
			}(campData), 1000);
		}
	],
	
	function finish(err, results){
		console.log( 'got finished' );
		if ( err ) {
			console.log( err );
			cb( err );
		} else {
			console.log( results );
			cb( null, results );
		}
	});
}

getCampaignsByAccountId('009', function(){ console.log('fuck it we done');} );