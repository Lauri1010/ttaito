var http = require('http');
var https = require('https');
const fs = require('fs');
var tls = require('tls');
// HTTPS port 443, http port 80. To be changed in production
var port = 1337;
// var porthttps = (process.env.PORT || process.env.VCAP_APP_PORT || 1337);
var ipService = require('ip');
const requestIp = require('request-ip');
var url = require('url');
var uniqid = require('uniqid');
var debug=false;
var cookieService= require("cookies");
// var skey = fs.readFileSync('lkey.pem');
// var scert = fs.readFileSync('lcert.pem');
const util = require('util');
const assert = require('assert');
// const mUrl = "mongodb://client1:091djAjdshulo@localhost:27017/ttanalytics";
const mUrl = 'mongodb://localhost:27017/ttanalytics';
let MongoClient = require('mongodb').MongoClient;  
let db1;

//Connection URL

//Create the db connection
MongoClient.connect(mUrl, {  
	  poolSize: 30
	},function(err, db) {
	    if(err){console.log(err);
		}else{
			db1=db;
		}
	}
);


function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}



var server = http.createServer(function(req, res) {

			  var url_parts = url.parse(req.url, true);
			  var pathName=url_parts.pathname;
			  try{
				   if(debug){
					   console.log(pathName);
				   }
				   var query=url_parts.query;
				   var s=query.s;
				   var ttid=null;
				   
				   if(query.t){
						ttid=query.t;
				   }
				   
				   if(debug){
					console.log('tid: '+ttid);
					console.log(s);
				   }
				   /*
				   if (req.url === '/favicon.ico') {
						res.writeHead(200, {'Content-Type': 'image/x-icon'} );
						res.end();
						console.log('favicon requested');
						return;
				   }*/

					if(req.method==='GET') {
						  if(pathName==="/tt/"){
								if(s==='c' || s==='c2'){
									if(debug){
										console.log('c requested');
									}
									if(typeof pCall==='function'){
										var hitd=pCall(ttid,url_parts,query,pathName,req,res);
										
										if(typeof hitd.website_identity_token!=='undefined'
										&& typeof hitd.client_ip!=='undefined'
										&& typeof hitd.unique_id_client!=='undefined'
										&& typeof db1!=='undefined'){
												// https://docs.mongodb.com/manual/reference/operator/update/push/
												/*
												db.collection("instance").findOne({"session_data.session_id_client": instanceJson.session_data.session_id_client}, function(err, result) {
													if (err) throw err;
													if(result){
														   db.collection("instance").updateOne(
															   { "session_data.session_id_client": instanceJson.session_data.session_id_client },
															   {
																 "$push": {"hit_data": instanceJson.hit_data }
															   }
															)
															if(debug){
																console.log("1 document updated");
															}
													}else{
														db.collection("instance").insertOne(instanceJson, function(err, res) {
															if (err) throw err;
															if(debug){
																console.log("1 document inserted");
															}
														});
													}
												});*/
												
												  db1.collection("instance").findAndModify(
												  {
													  website_identity_token:hitd.website_identity_token,
												      client_ip:hitd.client_ip,
													  unique_id_client:hitd.unique_id_client,
													  unique_email_id:hitd.unique_email_id,
													  unique_phone_id:hitd.unique_phone_id,
													  unique_loyalty_id:hitd.unique_loyalty_id,
													  unique_profile_id:hitd.unique_profile_id
												  }, // query
												  [],  // sort order
												  {$push: {hit_data: hitd.hit_data[0]}}, // replacement, replaces only the field "hi"
												  {
													  upsert: true,
													  w:0
												  }, 
												  function(err, object) {
													  if (err){
														  console.warn(err.message);  // returns error if no matching object found
													  }else{
															// console.log('update result:  ' + object);
													  }
												});
												
										}
										
									}
									res.setHeader('Content-Type', 'image/gif');
									res.statusCode = 200;
									res.end();
									
								}else{
									res.statusCode = 200;
									res.setHeader('Content-Type', 'text/plain');
									res.end('Unparamitarized');
								}
						  }else{
							  res.statusCode = 200;
							  res.setHeader('Content-Type', 'text/plain');
							  res.end('Unparamitarized');
						  }
							
				  }
				
			  }catch(error){
				  console.log(error);
			  }
});


function pCall(ttid,url_parts,query,pathName,req,res){
	try{
	  if(ttid){
		  	  var path=url_parts.pathname;
			  var a;
			  var a1;
			  var a2;
			  var a3;
			  var amC=121;
			  var a1mC=121;
			  var a2mC=121;
			  var a3mC=121;
			  var tt_vid;
			  var tt_uvid;
			  var tt_time_c;
			  var pageName;
			  var pagePath="undefined";
			  var pageTitle="undefined";
			  var pageId;
			  var c_uvid;
			  var c_vid;
			  var timezone='na';
			  var screenWidth='na';
			  var screenHeight='na';
			  var colorDepth='na';
			  var navigatorLang='na';
			  
			  var header=JSON.stringify(req.headers);
			  if(debug){
				  console.log(header);
			  }

              if(typeof query.hn !== 'undefined'){
				var hst = query.hn;
				// var cleanHost=hst.substring(0, hst.indexOf(':'));
				var cleanHost=hst.replace(/\:/g,'.')
			  }
			  
			  if(debug){
				  console.log(hst);
			  }

			  var referer="not defined";
			  if(typeof req.headers.referer !== 'undefined'){
				  referer=req.headers.referer;
			  }
			  var aRef='no r parameter';
			  if(typeof query.r !== 'undefined'){
				  	aRef = query.r; 
		      }
			  
			  var cookies = new cookieService( req, res ), unsigned, signed, tampered;
			  
			  if(debug){
				  console.log('vid: '+cookies.get('tt_vid'));
			  }

			  if(typeof query.co === 'undefined'){
				  
				  /*
				  if(cookies.get('tt_vid')){
					  tt_vid=cookies.get('tt_vid');
				  }else{
					  
					  var date = new Date();
				      date.setTime(date.getTime()+(1800*1000));
				      tt_vid=uniqid();
					  
					  if(cleanHost){
						  cookies.set('tt_vid', tt_vid, {expires: date, domain: cleanHost});
					  }else{
						  cookies.set('tt_vid', tt_vid, {expires: date});
					  }
				  }
				  
				  if(cookies.get('tt_uvid')){
					  tt_uvid=cookies.get('tt_uvid');
				  }else{
					  var date = new Date();
				      date.setTime(date.getTime()+(63072000*1000));
				      tt_uvid=uniqid();
				      if(cleanHost){
				    	  cookies.set('tt_uvid', tt_uvid, {expires: date, domain: cleanHost});
				      }else{
				    	  cookies.set('tt_uvid', tt_uvid, {expires: date});
				      }
				  }
				  
				  if(cookies.get('tt_time_c')!==null){
					  tt_time_c=cookies.get('tt_time_c');
				  } 
				  */
				  			  
				  if(typeof query.i !=='undefined'){
					  c_uvid=query.i;
				  }
				  
				  if(typeof query.v !=='undefined'){
					  c_vid=query.v;
				  }

			  }

			  // TODO: Block if too many requests
			  var ip=requestIp.getClientIp(req); 

			  if(debug){
				  console.log('Ip before '+ip);
			  }
			  
			  var ip=requestIp.getClientIp(req); 

			  if(!ip || typeof ip==='undefined'){
				  ip=0;
			  }else if(ipService.isV4Format(ip) && ip){
				  ip=ipService.mask(ip,'255.255.255.0');
				  
			  }
			  if(req.headers.hasOwnProperty("x-real-ip")){
					  req.headers["x-real-ip"]=ipService.mask(req.headers["x-real-ip"],'255.255.255.0');
			  }
			  
			  if(debug && typeof ip !== 'undefined'){
				  console.log('Ip '+ip);
			  }
			  
			  if(query.p0){
				  pageTitle=query.p0;
			  }
			  
			  if(query.p1){
				  pageName=query.p1;
			  }
			  
			  if(query.z){
				  timezone=query.z;
			  }
			  
			  if(query.s1){
				  screenWidth=query.s1;
			  }
			  
			  if(query.s2){
				  screenHeight=query.s2;
			  }
			  
			  if(query.cd){
				  colorDepth=query.cd;
			  }
			  
			  if(query.il){
				  navigatorLang=query.il;
			  }

/*			  if(query.p2){
				  pageName=url_parts.p2;
			  }*/
			  
			  if(debug){
				  console.log(pageName);
				  console.log('U vid: '+tt_uvid);
			  }
			  
			if(typeof ttid !== 'undefined' 
			&& typeof pageName !== 'undefined'  
			&& typeof c_vid !== 'undefined' 
			&& typeof ip !== 'undefined'){
				var timestamp=Math.floor(new Date() / 1000);
				    var userAgent='';
					var acceptLang='';
				    if(typeof req.headers['user-agent']!=='undefined'){
					   	userAgent=req.headers['user-agent'];
					}
					if(typeof req.headers['accept-language']!=='undefined'){
						acceptLang=req.headers['accept-language'];
					}
				
					var hitd={		
			  				    website_identity_token: ttid,
								client_ip: ip,
								unique_id_client: c_uvid,
								unique_email_id:"",
								unique_phone_id:"",
								unique_loyalty_id:"",
								unique_profile_id:"",
			  				    hit_data: [
									{
										session_id_client:c_vid,
										page_name: pageName,
										page_title:pageTitle,
										client_hn: cleanHost,
										hit_timestamp: timestamp,
										referer_h: referer,
										referer_r: aRef,
										user_agent:userAgent,
										accept_lang:acceptLang,
										timezone:timezone,
										screen_width:screenWidth,
										screen_height:screenHeight,
										color_depth:colorDepth,
										navigator_lang:navigatorLang,
										event_category: "",
										event_element_text: "",
										event_target_url: "",
										event_selector_data_raw: "",
										event_htlm_parent1_id:"",
										event_htlm_parent2_id:"",
										event_htlm_parent1_class:"",
										event_htlm_parent2_class:""
									}
			  				    ]
			  		};
	
					  if(query.a){
						  a=query.a;
						  hitd.hit_data[0].event_category=a;
						  if(debug){
							  console.log(a);
						  }
						  if(query.a1){
							  a1=query.a1;
							  hitd.hit_data[0].event_element_text=a1;
							  
							  if(debug){
								  console.log(a1);
							  }
								  if(query.a2){
									  a2=query.a2; 
									  hitd.hit_data[0].event_target_url=a2;
										  if(debug){
											  console.log(a2);
										  }
				 
										  if(query.a3){
											 a3=query.a3; 
											 hitd.hit_data[0].event_selector_data_raw=a3;
											 
											 if(debug){
												 console.log(a3);
											 }
										  }
								  }
						  }
						  
						  if(query.d1){
							  hitd.hit_data[0].event_htlm_parent1_id=query.d1;
						  }
						  
						  if(query.d2){
							  hitd.hit_data[0].event_htlm_parent2_id=query.d2;
						  }
						  
						  if(query.d3){
							  hitd.hit_data[0].event_htlm_parent1_class=query.d3;
						  }
						  
						  if(query.d4){
							  hitd.hit_data[0].event_htlm_parent2_class=query.d4;
						  }
						  
					  }
	
					  return hitd;	

	          }
			
	    }
	}catch(error){
		  console.log(error);
	}
}
server.listen(port);
server.timeout = 1500;


