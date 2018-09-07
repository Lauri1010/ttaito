(function(window,document){
		/****
			Copyright: Lauri Turunen

		****/

		if (!Element.prototype.matches)
		Element.prototype.matches = Element.prototype.msMatchesSelector || 
                                Element.prototype.webkitMatchesSelector;

		if (!Element.prototype.closest)
		Element.prototype.closest = function(s) {
			var el = this;
			if (!document.documentElement.contains(el)) return null;
			do {
				if (el.matches(s)) return el;
				el = el.parentElement || el.parentNode;
			} while (el !== null && el.nodeType === 1); 
			return null;
		};
		
		var tr=function(){
			this.tq = function(n,v){
		          return (v.length > n) ? v.substr(0, n-1) : v;
		    };
			this.date=(new Date());
			this.cm=false;
			this.started=false;
			this.au1=true;
			this.aMaxLengthC=80;
			this.eTextMaxLength=105;
			this.lMaxLenghtC=80;
			this.pnMaxLength=110;
			this.ptMaxLenght=110;
			this.referrerMaxLength=110;
			this.pn='';
			this.pnv=window.location.pathname;
			this.pnvF=this.pnv.replace('/',':');
			this.pathNameE=encodeURIComponent(window.location.pathname);
			this.pt1=this.tq(this.ptMaxLenght,encodeURIComponent(document.title).replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/gi,'').toLowerCase());
			this.ePath = this.pnv.split("/").pop();
			this.ePathE = encodeURIComponent(this.ePath);
			this.referrer = document.referrer;
			this.referrerE=encodeURIComponent(this.referrer);
			this.domain = window.location.hostname;
			this.pDomain= this.domain.replace('www.','.');
			this.rDomain = this.domain.replace('www.','');
			this.safeDomain = this.pDomain.replace(/\./g,':'); 
			this.hn=window.location.hostname;
			this.ttid=00000;
			this.optOut=false;
			this.coptOut=false;
			this.uvid;
			this.vid;
			this.fullMode=true;
			// this.protocol=(location.protocol == "https:" ? "https://" : "http://");
			this.protocol="https://";
	        this.eType='mousedown';
	        if ('ontouchstart' in document.documentElement === true){
	          this.eType='touchstart';
	        }
			this.eSelector='a[href],input[type="submit"],button[type="submit"]';

	        // if(this.hn=='localhost'){
	        	this.serverDomain='localhost';
		        this.serverPort=':8888';
	        // }else{
		       // this.serverDomain='kokeilu2.com';
		       //this.serverPort='';
	        // }
			this.md=2;
			this.bust=true;
			this.autotagging=true;			
			
			this.pnF=function() {
				var pathName=window.location.pathname;
				if(pathName){
					if(pathName!=="/"){
						if(pathName.charAt(0)==='/'){
							var end=pathName.length;
							pathName=pathName.substring(1, end);
						}
						// return pathName.replace('/(?!^)\//g', ':').toLowerCase();
					}
					return encodeURIComponent(this.tq(this.pnMaxLength,pathName.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/gi,':').toLowerCase()));
				}
			};
			
			this.removeSpecialCharacters=function(element){
				if(typeof element!=='undefined'){
					return element.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/gi,'').toLowerCase();
				}else{
					return 'na';
				}
			};
			
			this.b={
				    t:String(typeof this.date.getTimezoneOffset==='function'?(this.date.getTimezoneOffset()/60):'na').replace('-','m').replace('+','p'),
				    a:function(){return(typeof window.navigator.appName!=='undefined'?window.navigator.appName:'na');},
				    b:function(){return(typeof window.navigator.product!=='undefined'?window.navigator.product:'na');},
				    c:function(){return (typeof window.navigator.appVersion!=='undefined'?window.navigator.appVersion:'na');},
				    d:function(){return (typeof window.navigator.userAgent!=='undefined'?window.navigator.userAgent:'na');},
				    e:function(){return (typeof window.navigator.language!=='undefined'?window.navigator.language:'na');},
				    f:function(){return (typeof window.navigator.platform!=='undefined'?window.navigator.platform:'na');},
				    g:function(){return (typeof window.navigator.javaEnabled()!=='undefined'?window.navigator.javaEnabled():'na');},
				    h:function(){return (typeof window.navigator.cookieEnabled!=='undefined'?window.navigator.cookieEnabled:'na');},
				    i:function(){return (typeof document.cookie!=='undefined'?document.cookie:'na');},
				    j:function(){return (typeof window.screen.width!=='undefined'?window.screen.width:'na');},
				    k:function(){return (typeof window.screen.height!=='undefined'?window.screen.height:'na');},
				    l:function(){return (typeof document.width!=='undefined'?document.width:'na');},
				    m:function(){return (typeof document.height!=='undefined'?document.height:'na');},
				    n:function(){return (typeof window.innerWidth!=='undefined'?window.innerWidth:'na');},
				    o:function(){return (typeof window.innerHeight!=='undefined'?window.innerHeight:'na');},
				    p:function(){return (typeof window.screen.availHeight!=='undefined'?window.screen.availHeight:'na');},
				    q:function(){return (typeof window.screen.colorDepth!=='undefined'?window.screen.colorDepth:'na');},
				    r:function(){return (typeof window.screen.pixelDepth!=='undefined'?window.screen.pixelDepth:'na');},
		   };
			
		    this.ret=function(e){
				if(e){
				 if(e.textContent){
            	    	 return encodeURIComponent(this.tq(this.eTextMaxLength,e.textContent.replace(/\s\s+/g, ' ').toLowerCase()));
            	      }else{
						 if(e.value){
							return encodeURIComponent(this.tq(this.eTextMaxLength,e.value)); 
						 }else{
							return 'undefined';
						 }
                      };    
				}else{
				   return '';	
				}
		    };
		    
			this.gp=function(e,d){
				if(d>0){
						if(e.parentElement.parentElement){
							return e.parentElement.parentElement;
						}
					}else if(e.parentElement){
							return e.parentElement;
					}else{
				    return;	
				}
			}
			
		    this.gpei=function(e,d){
	    		if(e){
					e=this.gp(e,d);
					if(typeof e!=='undefined'){
						if(e.id){	
							return encodeURIComponent(this.tq(this.aMaxLengthC,e.id));
						}else{
							return '';
						}
					}else{
						return '';
					}
				}else{
				   return '';	
				}
		    };
		    
		    this.gpec=function(e,d){
				if(e){
					e=this.gp(e,d);
					if(typeof e!=='undefined'){
						if(e.className){	
							return encodeURIComponent(this.tq(this.aMaxLengthC,e.className));
						}else{
							return '';
						}
					}else{
						return '';
					}
				}else{
				   return '';	
				}
		    };

			this.$r = function(o){
			    // Make sure we have a base object for o
			    o = o || {};
			    // Setup defaults for options
			    o.url = o.url || null;
			    o.vars = o.vars || {};
			    o.error = o.error || function(){};
			    o.success = o.success || function(){};
			
			    // Split up vars object into an array
			    var varsArray = [];
			    for(var key in o.vars){varsArray.push(key+'='+o.vars[key]);}
			    // Build query string
			    // var qString = encodeURIComponent(varsArray.join('&'));
			    var qString = varsArray.join('&');
			    
			    // Create a beacon if a url is provided
			    if(o.url && (o.m===1 || o.m===2)){
			    	if(o.m==1){
				        var r = new Image();
			    	}else if(o.m===2){
			    		var r = document.createElement('script');
			    		r.type = 'text/javascript';
			    		r.async = o.async;
			    	}
			    
			        if(r.onerror)
			        {r.onerror = o.error;}
			        if(r.onload)
			        {r.onload  = o.success;}	
			        if(this.cm){
			        	console.log(this.coptOut);
			        }
			        if(this.coptOut){
			        	r.src = this.protocol+o.url + '/tt/?co=1&' + qString;
			        }else{
				        r.src = this.protocol+o.url + '/tt/?' + qString;
			        }
			        if(o.m===2){
			        	document.getElementsByTagName('head')[0].appendChild(r);
			        }	
			    }
			}};
		
		// true, 1,1,true
		tr.prototype.i=function(ttid,cm,fd,pn,action,bust,au1,at1,ac1){
			    try{
					var self=this;
					if(!self.started){
						self.cm=cm;	
						self.aOptOut=!at1;
						self.coptOut=!ac1;
						self.au1=au1;
						if(self.cm){console.log(self.aOptOut);};
						if(self.cm){console.log(self.coptOut);};
						
						if(!pn){
							self.pn=self.pnF();
						}else if(typeof pn==='string'){
							self.pn=pn;
						}
						
						if(typeof ttid == 'string'){
							self.ttid=ttid
							if(self.cm){
								console.log(self.ttid);
							}
						};
						
						if(self.ttid && typeof self.ttid === 'string'
						&& (bust === true || bust === false) 
						&& !self.aOptOut){
							self.bust=bust;
								if(!(self.rc("ttc1_uvid"))){
									self.uvid=self.idg();
									self.cc("ttc1_uvid",self.uvid,63072000,self.pDomain);
								}else{
									self.uvid=self.rc("ttc1_uvid");
								}
								if(!(self.rc("ttc1_vid"))){
									self.vid=self.idg();
								}else{
									self.vid=self.rc("ttc1_vid");								
								}
								self.cc("ttc1_vid",self.vid,1800,self.pDomain);
								if(fd){
									self.t('hit',action);
									if(self.autotagging){
										if(self.cm){console.log('Autotagging enabled');};
										self.ut();
									}
								}
		
						}else{
							// if(self.cm){console.log("Malformed parameter settings. ");}
						}
						self.started=true;
					}
			    }catch(error){
			    	if(self.cm){
			    		// console.log(error);
			    	}
			    }
		}
	
		tr.prototype.t=function(c,action){
			try{
				var self=this;
				if(self.ttid && typeof self.ttid === 'string' && !self.aOptOut && self.pn.length <= self.pnMaxLength && self.referrerE.length <= self.referrerMaxLength){
							if(c=='hit'){
								
								var st='c2';
								
								var p={
									t:self.ttid
								};
								
								// if(self.cm){console.log(action);};
								
								if(action){
									if(action.category && typeof action.category === 'string'){
											p.a=action.category;
											if(typeof action.text==='string' && action.text){
												p.a1=action.text;
											}
											if(action.path && typeof action.path === 'string'){
												p.a2=action.path;
											}
											
											if(action.sdata && typeof action.sdata === 'string'){
												p.a3=action.sdata;
											}
											
											if(action.pid1 && typeof action.pid1 === 'string'){
												p.d1=action.pid1;
											}
											
											if(action.pid2 && typeof action.pid2 === 'string'){
												p.d2=action.pid2;
											}
											
											if(action.pcl1 && typeof action.pcl1 === 'string'){
												p.d3=action.pcl1;
											}
											
											if(action.pcl2 && typeof action.pcl2 === 'string'){
												p.d4=action.pcl2;
											}
											
											st='c2';
											self.md=2;
										}								
								}
								
							    
								
								p.s=st;
							
								if(self.bust){
									p.b=(new Date()).getTime();
								}
								
								if(typeof self.referrerE === 'string' && self.referrerE){
									p.r=self.referrerE;
								}
								
								if(typeof self.uvid !== 'undefined' && self.uvid){
									p.i=self.uvid;
								}
								
								if(typeof self.vid !== 'undefined' && self.vid){
									p.v=self.vid;
								}
		
								if(typeof self.pt1 === 'string' && self.pt1){
									p.p0=self.pt1;
								} 
								if(typeof self.pn === 'string' && self.pn){
									p.p1=self.pn;
								}
								
								if(self.fullMode){
									p.z=self.b.t;
									p.s1=self.b.j();
									p.s2=self.b.k();
									p.cd=self.b.q();
									p.l1=self.b.e();
								}
								
								/*
								if(typeof self.ePathE === 'string' && self.ePathE){
									p.p2=self.ePathE;
								}*/

								p.hn=encodeURIComponent(self.safeDomain);
								
								self.$r({
							       url : self.serverDomain+self.serverPort,
							       async : true,
							       m:self.md,
							       vars : p,
							       error : function(){
							    	   // if(self.cm){console.log("error in request");}
							       },
							       success : function(c){
							    	  // if(self.cm){console.log('request successfull')};
							       }
								});
								
							}
				}else{
					// if(self.cm){console.log("ttid needs to be set");};
				}
			
			}catch(e){
				// if(self.cm){console.log(e);};
			}
			
		}
		
		tr.prototype.ut=function(){
			var self=this;
			try{
				
				var ec=function(event){
						var tag = event.target;
						if(tag){
						var tagName=tag.tagName.toLowerCase();
						var id1=self.gpei(tag,0);
						var id2=self.gpei(tag,1);
						var cl1=self.gpec(tag,0);
						var cl2=self.gpec(tag,1);
						var elementText=self.ret(tag);
					
						if(id1.length<=self.aMaxLengthC && 
									 id2.length<=self.aMaxLengthC && 
									 cl1.length<=self.aMaxLengthC && 
									 cl2.length<=self.aMaxLengthC && 
									 elementText.length <= self.eTextMaxLength &&
									 self.ttid && typeof self.ttid === 'string' && (self.bust==true || self.bust==false) && typeof self.pn === 'string'){
										if (tagName == 'a') {
											
												// if(self.cm){console.log('Autotracking init');};
								
												var pathName='undefined';
						
												if(typeof tag.href !== 'undefined'){
														pathName=self.tq(self.pnMaxLength,encodeURIComponent(tag.href.replace("http://","").replace("https://","").replace(self.hn,"")));
												}
													// var selectorData=self.gsd(tag);
													/*
													if(self.cm){ 
														console.log('id2 length '+id2.length);
														console.log('id2 length '+id2.length);
														console.log('cl1 length  '+cl1.length);
														console.log('cl2 length  '+cl2.length);
													}

													
														if(self.cm){ 
															console.log('Href '+href);
															console.log('Pathname '+pathName);
															console.log('Element text or data attribute: '+elementText);
															console.log('Parent 1 id '+id1);
															console.log('Parent 2 id '+id2);
															console.log('Parent 1 class '+cl1);
															console.log('Parent 2 class '+cl2);
														}*/
														self.t('hit',{'category':'click','text':elementText,'path':pathName,'pid1': id1,'pid2': id2,'pcl1': cl1,'pcl2': cl2});	
												
										}else if(tagName == 'input' || tagName == 'button'){
											 self.t('hit',{'category':tagName+' submit','text':elementText,'pid1': id1,'pid2': id2,'pcl1': cl1,'pcl2': cl2});
										}
						  
						 }
						}
				}

				var qsf=function(e){
					if(typeof document.body.querySelectorAll=="function"){
							if(Array.prototype.indexOf.call(document.body.querySelectorAll(self.eSelector), e.target) !== -1){
								ec(e);
							}
						}else if(typeof document.querySelectorAll=="function"){
							if(Array.prototype.indexOf.call(document.querySelectorAll(self.eSelector), e.target) !== -1){
								ec(e);
							}
					}
				};

				document.addEventListener("DOMContentLoaded", function(event) {
					document.body.addEventListener(self.eType, qsf);
					document.removeEventListener(self.eType,qsf);
				});
				document.addEventListener(self.eType,qsf);

			 }catch(error){
       		  /*if(self.cm){
       			  console.log(error);
       		  }*/
       	    }				

		}

		tr.prototype.get=function(name){
			 if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search)){
				 return decodeURIComponent(name[1]);
			 }
		}
		
		tr.prototype.cc=function(name,value,seconds,domain) {
		    if (seconds) {
		        var date = new Date();
		        date.setTime(date.getTime()+(seconds*1000));
		        var expires = "; expires="+date.toGMTString();
		    }
		    if(domain){document.cookie = name+"="+value+expires+";domain="+domain+";path=/";}
			else{document.cookie = name+"="+value+expires+";path=/";};
		}
		
		tr.prototype.rc=function(name) {
		    var nameEQ = name + "=";
		    var ca = document.cookie.split(';');
		    for(var i=0;i < ca.length;i++) {
		        var c = ca[i];
		        while (c.charAt(0)==' ') c = c.substring(1,c.length);
		        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		    }
		    return false;
		}
		
		tr.prototype.gcv=function(field){
		    var re = new RegExp(field + "=([^;]+)");
		    var value = re.exec(document.cookie);
		    return (value != null) ? unescape(value[1]) : null;
		}
		
		tr.prototype.ec=function(name) {
		    createCookie(name,"",-1);
		}
		
		tr.prototype.idg=function(){
			 this.length = 8;
			 this.timestamp = +new Date;
			 
			 var _getRandomInt = function( min, max ) {
				return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
			 }

				 var ts = this.timestamp.toString();
				 var parts = ts.split( "" ).reverse();
				 var id = "";
				 
				 for( var i = 0; i < this.length; ++i ) {
					var index = _getRandomInt( 0, parts.length - 1 );
					id += parts[index];	 
				 }
				 
				 return id;
	
	   }
	
		
		var tRun=new tr();
		
		window.ttlib = (function(){
		    var _a = {};
		    var _g = {};

		    return {
		        init : function(args,gSettings) {
		            _a = args;
		            _g = gSettings;		            
		        },
				pageview: function() {
					tRun.i(_a[0],_a[1],_a[2],_a[3],_a[4],_a[5],_a[6],_g[0],_g[1]);
		        },
		        fireEvent: function(){
		        	
		        }
		    };
		}());

})(window,document);