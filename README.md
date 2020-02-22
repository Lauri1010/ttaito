# ttaito
NOTE: you need to have a local server, such as apache (XAMPP) to test the inline tracking script and the alib.js tracking library. 
Please ask if you have any questions. 
Contents
- The inline tracking script installed to head of a webpage
- The tracking library called by the inline script.   note there are two options in the tracking library: JSNOP and .gif pixels. JSNOP enables call-backs from server (parameter s=c for img and s=c2 for JSNOP/JS response) 
- The node.js server endpoint managing the data saving and response to client if using JSNOP/JS response to pass cookies back to the client (for cookie id:s managed by the server)

Installation

1. Install node.js, latest LTS to root, eg: c:/node/
2. Add the ttaito to the node folder
3. npm install, follow the npm instructions in node webpage
4. Setup mongo db & connect or install xampp and use the mysql version. 

KNOWN ISSUES
- Using mongodb version 2.2.33 as the latest mongodb version has a bug: https://stackoverflow.com/questions/47662220/db-collection-is-not-a-function-when-using-mongoclient-v3-0

Development principles
- High performance. Let’s not use mongoose and other heavy systems to slow this down. This after all an analytics / DMP platform and smart use of resources is important


