/*
	This policy is to ensure only patient's data is fetched in B2C flow for paths having id as input path variable. 
	This restriction is achieved by replacing any id given in path by patient's id.
*/
//Get reuired flow variables.
try
{
		var proxyPathSuffix = context.getVariable("proxy.pathsuffix");
		print("proxy.pathsuffix = "+ proxyPathSuffix);
		//Get patient_id, which came along access token.
		var patient_id =  context.getVariable("patient_id");
		var primaryResourceId= context.getVariable('primaryResourceId');

		var pathSuffixWithPatient = proxyPathSuffix;
		//Following condition is true if path is having id as path variable.
		if(primaryResourceId!="_history" && primaryResourceId!="_search" && primaryResourceId!="$meta" && primaryResourceId!="$everything")
		{
		   if (patient_id!=null && (patient_id!=primaryResourceId || proxyPathSuffix.indexOf('id')!=-1)) 
		  {
			//var id="id";
			var regex = new RegExp(primaryResourceId, 'i');
			var res = proxyPathSuffix.replace(regex, patient_id);
					   print("res for B2C: "+res);
			pathSuffixWithPatient=res;
			
		  }
		}

		context.setVariable("pathsuffix",pathSuffixWithPatient);
}
catch(Error){
        print("Error " + Error);
        context.setVariable('JS_Error', true);   
        throw new Error("JS_Error");
   }
