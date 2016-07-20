/*
	This javascript is to change the request uri to have new basepath.
*/

try
	{
	    var requesturi = context.getVariable('request.uri');
	    //print("1requesturi:"+ requesturi);
	    requesturi = requesturi.replace("v2", "fhir/v1");
	    //print("2requesturi:"+ requesturi);
	    context.setVariable('request.uri', requesturi);
	}
catch(Error){
        print("Error " + Error);
        context.setVariable('JS_Error', true); 
		throw new Error("JS_Error");  
   }