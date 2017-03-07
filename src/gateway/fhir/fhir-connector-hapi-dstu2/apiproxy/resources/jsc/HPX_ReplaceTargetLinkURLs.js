/*
	* Rewrite all occurrences of target Urls in responseData with proxypath.
    * Use custom names for queryparams in target Urls
    * Rewrite ContentLocation Header in response
	
	This JS replaces the Backend URL with the apigee Internal proxy URL.
	
	Eg:
	1)For Resource  URLs
	http://fhirtest.uhn.ca/baseDstu2/Patient (Backend server URL)
		it replace with
	https://{organization}-{environment}.apigee.net/hapi-dstu2/patient (Apigee Internal API Proxy)
		
	2)For Pagination Request URLs
	http://fhirtest.uhn.ca/baseDstu2?_getpages=cdfc74e5-5175-434b-9ac0-7a77eac10316&_getpagesoffset=10&_count=10&_pretty=true&_bundletype=searchset (Backend server URL)
		it replace with
	https://{organization}-{environment}.apigee.net/hapi-dstu2/patient2?stateid=cdfc74e5-5175-434b-9ac0-7a77eac10316&page=10&page_size=10&_pretty=true&_bundletype=searchset (Apigee Internal API Proxy)
*/

    try{
            var responseData = response.content;
            var primaryResource = context.getVariable("primaryResource");

            // Extract required flow variables to form 'targetPath' url
			var targetHost = context.getVariable("target.host");
			var targetBasePath = context.getVariable("targetBaseURI");
			var targetPort = context.getVariable("target.port");
      		var targetPath="";
      		var targetSSLEnabled = context.getVariable("target.ssl.enabled");
      		var http = "";
      		
     		if(targetPort != "80" && targetPort != "443" )
     		    targetHost = targetHost + ":" +targetPort
     		
     		if(targetSSLEnabled)
     		   http =  "https://";
     		else
     		   http =  "http://";     		    
     		
     		print("targetBasePath"+ targetBasePath);
     		if(targetBasePath !="" && targetBasePath != null)
               targetPath = http + targetHost+"/"+targetBasePath ;
      		else
               targetPath = http + targetHost;
			print("replace "+ targetPath);
			
			if(primaryResource!=null && primaryResource!="")
			    targetBasePath =  targetPath + "/" + primaryResource;
			else
			    targetBasePath =  targetPath;
			print("replace "+ targetBasePath);
            
            // Extract required flow variables to form 'proxyPath' url
            var organizationName = context.getVariable("organization.name");
            var environmentName = context.getVariable("environment.name");
            var proxyBasePath = context.getVariable("proxy.basepath");
            print("proxyBasePath= "+proxyBasePath);
            var proxyPrefix = proxyBasePath;
            
            if(primaryResource!=null && primaryResource!="")
                proxyBasePath = proxyBasePath + "/" + primaryResource;
            
           
            print("proxyPrefix= "+proxyPrefix);      
            var proxyPath = "https://" + organizationName + "-" + environmentName + ".apigee.net" + proxyBasePath;
            
            var proxyPath_Bundle = "https://" + organizationName + "-" + environmentName + ".apigee.net" + proxyPrefix;
            print("proxypath= "+proxyPath);
            print("proxyPath_Bundle= "+proxyPath_Bundle);
            
            // Create instance of regex for all occurrences of 'targetPath' in responseData and replace them with 'proxyPath'
            
            var targetBasePaths=new RegExp(targetBasePath, 'g');
            responseData = responseData.replace(targetBasePaths, proxyPath);
            
            var targetPaths=new RegExp(targetPath, 'g');
            responseData = responseData.replace(targetPaths, proxyPath);
            
            // Replace the pagination query parameters name with custom name in responseData
            var _getpages = new RegExp("_getpages", 'g');
            var _getpagesoffset = new RegExp("_getpagesoffset", 'g');
            var _count = new RegExp("_count", 'g');
            var emptySpace = new RegExp("amp;", 'g');
            responseData = responseData.replace(_getpagesoffset, "page");
            responseData = responseData.replace(_getpages, "stateid");
            responseData = responseData.replace(_count, "page_size");
            responseData = responseData.replace(emptySpace, "");
            
            // Final connector proxy response is set
            context.setVariable("proxyResponse", responseData);
            
            // If 'Content-Location' header is present, it will be replace with targetPath and set to connector proxy response header
            var contentLocation = context.getVariable("response.header.Content-Location");
            if(contentLocation!="" && contentLocation!=null)
            {
              if(contentLocation.indexOf("Bundle") > -1){
              	contentLocation = contentLocation.replace(targetPaths, proxyPath_Bundle);
              }
              else
               contentLocation = contentLocation.replace(targetBasePaths, proxyPath);
              print("contentLocation = "+contentLocation);
              context.setVariable("response.header.Content-Location", contentLocation);
            }
  

   }
   catch(Error){
        print("Error " + Error);
        context.setVariable('JS_Error', true);  
        throw new Error("JS_Error");
   }
   