/*
	This javascript is used to set error response in OperationOutcome format
    if not provided by backend server.
*/

try
	{
                var statusCode = context.getVariable("response.status.code");
                // Flag is set to false if error message is already in OperationOutcome format else to true.
                var flag = false;
                var msg = context.getVariable("response.content");
                
                if(msg.toLowerCase().indexOf("operationoutcome") != -1){
                    
                      // Error response is in OperationOutcome format
                      // So error response will be same as sent by backend server
                      flag =  false;
                }
                // 
                else {
                    // Error response is not in OperationOutcome format, so backend error is stored in "errorMessage" variable.
                    // "errorMessage" variable is used in Fault_TargetErrors policy to show error response in OperationOutcome format.
                    flag = true;
                    var reasonPhrase = "";
                    var statusCodeMap = {
                                    "400":["Bad Request","invariant","Resource could not be parsed or failed basic FHIR validation rules."],
                                    "404":["Not Found","not-found","Resource type not supported, or not a FHIR end point."],
                                    "405":["Method Not allowed","not-supported","The resource did not exist prior to the update, and the server does not allow client defined ids."],
                                    "409":["Conflict","conflict","The request could not be completed due to a conflict with the current version of the resource."],
                                    "410":["Gone","not-found","Resource deleted"],
                                    "412":["Precondition Failed","processing","The client's criteria were not selective enough."],
                                    "422":["Unprocessable Entity","invalid","The proposed resource violated applicable FHIR profiles or server business rules."],
                                    "500":["Internal Server Error","exception","Internal Server Error"],
                                    "503":["Service Temporarily Unavailable","exception","The server is temporarily unable to service your request due to maintenance downtime or capacity problems. Please try again later."]
                                    };
                    if(statusCodeMap[statusCode]!=null){
                        reasonPhrase =	statusCodeMap[statusCode][0];
                        code = statusCodeMap[statusCode][1];
                        if(statusCode=="503"){
                            msg = statusCodeMap[statusCode][2];
                        }
                        else if(msg==null || msg==""){
                            msg = statusCodeMap[statusCode][2];
                        }
                    }	
                    else{
                        statusCode="500";
                        reasonPhrase =	statusCodeMap[statusCode][0];
                        code = statusCodeMap[statusCode][1];
                        msg = statusCodeMap[statusCode][2];
                    }	
                   //set updated varaibles
                   context.setVariable('response.reason.phrase',reasonPhrase);
                   context.setVariable('errorMessage',msg);
                   context.setVariable('code',code);
                }
                context.setVariable('flag',flag);
	}
catch(Error){
        print("Error " + Error);
        context.setVariable('JS_Error', true); 
        throw new Error("JS_Error");
   }
