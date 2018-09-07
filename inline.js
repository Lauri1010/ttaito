<script>  // NOTE: adjust for what port and settings you are using!, eg https://localhost:8888 
(function(w,d,u,c){w.ttdl=[];var s,r,t;r=false;s=d.createElement('script');s.type='text/javascript';s.src=u;s.onload=s.onreadystatechange=function(){if(!r&&(!this.readyState||this.readyState=='complete'))
{r=true;c();}};t=d.getElementsByTagName('script')[0];t.parentNode.insertBefore(s,t);}
(window,document,'https://kokeilu2.com/js/tracker_standalone_min.js',function(){
// Tracking code reference	
var ttid='10001';
// Custom page name
var pn=false;
var allowTracking=true;
var autoTrack=true;
var useCookies=true;
if(typeof window.ttlib!='undefined'){
ttlib.init([ttid,false,true,pn,false,true,autoTrack],[allowTracking,useCookies]);
ttlib.pageview();
}}
));
</script>