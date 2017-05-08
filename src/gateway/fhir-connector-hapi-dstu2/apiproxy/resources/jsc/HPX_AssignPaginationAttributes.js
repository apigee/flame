 /**
  This Javascript policy sets query parameters name required by server and remove extra query parameters in request for pagination.
 */
 
try
{
   
         //Get the custom named query-parameters from proxy request
         var _getpages = context.getVariable("request.queryparam.stateid");
         var _getpagesoffset = context.getVariable("request.queryparam.page");
         var _count = context.getVariable("request.queryparam.page_size");
        
         //Remove the custom named query-parameters
         context.removeVariable("request.queryparam.stateid");
         context.removeVariable("request.queryparam.page");
         context.removeVariable("request.queryparam.page_size");
        
        //Sets required query-parameters for request sent to server
         context.setVariable('request.queryparam._getpages', _getpages);
         context.setVariable('request.queryparam._getpagesoffset', _getpagesoffset);
         context.setVariable('request.queryparam._count', _count);
         
        context.setVariable("target.copy.pathsuffix", false);
        var targeturl = context.getVariable("proxy.pathsuffix");
		 print("targeturl = "+targeturl);
}
catch(Error){
        print("Error " + Error);
        context.setVariable('JS_Error', true);   
        throw new Error("JS_Error");
   }