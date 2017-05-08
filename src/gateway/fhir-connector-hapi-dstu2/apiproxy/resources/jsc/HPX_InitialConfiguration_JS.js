//Obtain the primary FHIR resource name via the incoming request's path
var primaryResource = context.getVariable('proxy.pathsuffix');

//Set path for conditional flows
var path = "";
var index = primaryResource.indexOf("/", 1);
if (index != -1)
    path = primaryResource.substring(index);


//Set isBasePath flag
var isBasePath = false;
if (primaryResource == "")
    isBasePath = true;
primaryResource = primaryResource.split("/")[1];
var baseEndpoints = ["_history", "$meta", "Binary", "Composition", ""];
if (baseEndpoints.indexOf(primaryResource) != -1)
    isBasePath = true;

if(isBasePath)
{
    path = context.getVariable('proxy.pathsuffix');
    primaryResource = "";
}

print("isBasePath: " + isBasePath);
print("primaryResource= "+ primaryResource);
print("path= "+ path);

//Setting the necessary variables for subsequent call to the FHIR server.
context.setVariable("primaryResource", primaryResource);
//context.setVariable("targetBaseURI", "baseDstu2");
context.setVariable("path", path);
context.setVariable("isBasePath", isBasePath);