'use strict';

var async = require('async');


//This is supposed to represent fetching data from a database
// then doing some processing. setTimeout is the specific
// abstract to db calls.
function getCampaignsByAccountId( accountId, cb ) {
	
	async.series( [
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

		function getAccountById( callback ) {
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
				console.log( 'got account data' );
				callback( null, accountData);
			}, 1000);
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