/*
	* Rewrite all occurrences of Internal proxy Urls in responseData with proxypath.
    * Rewrite ContentLocation Header in response

	This JS replaces the apigee Internal proxy URL with the apigee External proxy URL.

	Eg:
	1)For Resource  URLs
	https://{organization}-{environment}.apigee.net/hapi-dstu2/Patient (Apigee Internal API Proxy)
	it replace with
	https://{organization}-{environment}.apigee.net/fhir/v2/Patient (Apigee External API Proxy)
	
	2)For Pagination Request URLs
	https://{organization}-{environment}.apigee.net/hapi-dstu2/patient2?stateid=cdfc74e5-5175-434b-9ac0-7a77eac10316&page=10&page_size=10&_pretty=true&_bundletype=searchset (Apigee Internal API Proxy)
	it replace with
	https://{organization}-{environment}.apigee.net/fhir/v2/patient?stateid=cdfc74e5-5175-434b-9ac0-7a77eac10316&page=	10&page_size=10&_pretty=true&_bundletype=searchset(Apigee External API Proxy)

*/
try {

    var responseData = context.getVariable("invokeConnectorAPIResponse.content");
    var statusCode = context.getVariable("invokeConnectorAPIResponse.status.code");
    print("statusCode" + statusCode);

    // Extract required flow variables to form 'targetBasePath' url
    var serviceCalloutDomain = context.getVariable("connector_domain");
    var serviceCalloutBasepath = context.getVariable("connector_basepath");
    var targetBasePath = "https://" + serviceCalloutDomain + "/" + serviceCalloutBasepath;
    print("targetBasePath= " + targetBasePath);

    // Extract required flow variables to form 'proxyPath' url
    var organizationName = context.getVariable("organization.name");
    var environmentName = context.getVariable("environment.name");
    var proxyBasePath = context.getVariable("proxy.basepath");
    print("proxyBasePath" + proxyBasePath);
    var proxyPath = "https://" + organizationName + "-" + environmentName + ".apigee.net" + proxyBasePath;
    print("proxyPath" + proxyPath);

    // Create instance of regex for all occurrences of 'targetPath' in responseData and replace them with 'proxyPath'
    var targetBasePaths = new RegExp(targetBasePath, 'g');
    responseData = responseData.replace(targetBasePaths, proxyPath);
    print("Response Data..." + responseData);

    // Set final response
    var contentType = context.getVariable("invokeConnectorAPIResponse.header.Content-Type");
    context.setVariable("response.content", responseData);
    context.setVariable("response.header.Content-Type", contentType);
    context.setVariable("response.status.code", statusCode);

    // If 'Content-Location' header is present, it will be replace with targetPath and set to final response header
    var contentLocation = context.getVariable("invokeConnectorAPIResponse.header.Content-Location");
    if (contentLocation != "" && contentLocation != null) {
        contentLocation = contentLocation.replace(targetBasePaths, proxyPath);
        context.setVariable("response.header.Content-Location", contentLocation);
    }
} catch (Error) {
    print("Error " + Error);
    context.setVariable('JS_Error', true);
    throw new Error("JS_Error");
}