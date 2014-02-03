'use strict';

var async = require('async');



function getCampaignsByAccountId( accoundId, cb ) {
	
	async.series( [
		function getCampaigns( accountId, callback ) {
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
				callback( null, campaigndata);
			}, 1000);
		},

		function getAccountById( accountId, callback ) {
			//pretend this is a http request to mongodb
			accountId = '009';

			var accountData = {
				Id : '009',
				type : 'Account',
				name : 'Heroku Partner Channel',
				desc : 'Our entity for dealing with heroku as a business.'
			};

			//substitute dbconn.account.findOne(..) here
			setTimeout( function(){
				//node callback pattern uses the 1st param of a callback for errors
				//assume no errors in this example. the timeout simulates read times
				//from a callout.
				callback( null, accountData);
			}, 1000);
		}
	],
	
	function callback(err, results){
		if ( err ) {
			console.log( err );
		} else {
			console.log( results );
		}

	});
}

getCampaignsByAccountId('009', function(){ console.log('fuck it we done');} );