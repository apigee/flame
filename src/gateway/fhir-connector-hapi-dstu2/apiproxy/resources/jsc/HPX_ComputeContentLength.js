/* 
     This policy is used to specify the number of bytes present 
     in the payload to Content-Length header 
*/

try
{       
        var body= context.getVariable('response.content');
         var rt=context.getVariable('returnType');
         if(rt.indexOf("json") >= 0)
         {
            var bodyStr = JSON.stringify(JSON.parse(body));
         }
         else{
              var bodyStr = String(body);
         }
         var noBytes=  (unescape(encodeURIComponent((bodyStr)))).length;
         context.setVariable('response.header.Content-Length', noBytes);

}
catch(Error){
        print("Error " + Error);
        context.setVariable('JS_Error', true); 
        throw new Error("JS_Error");
   }

