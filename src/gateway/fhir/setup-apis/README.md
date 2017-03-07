
**Deployment of API Proxies**
=============================

This section explains the how to deploy FHIR API proxies on Apigee Edge account.

The API mainly consists of two proxies, one External proxy and one Connector(Internal) proxy.  
-fhir-api proxy which is external.  
-fhir-connector-hapi-dstu2 which is connector/internal proxy.

Additionally following proxies are also deployed:  
-'oauth-b2b' proxy to generate a bearer token.  
-'catch-all' proxy to catch incorrect uri.

 **Pre-requisites**

- You need to have access to deployed Apigee Edge Services with organization details.  
If you don't have this – please signup at  [Apigee Edge](https://accounts.apigee.com/accounts/sign_in?client_id=apiplatform&response_type=token&redirect_uri=https%3A%2F%2Fenterprise.apigee.com%2FoAuth2ImplicitGrantCallback) now.  [Maven ](http://maven.apache.org/)is used for managing thedependencies and for build automation.  
- Get it installed beforehand.If you are installing from a Windows machine, you need Cygwin package installed on Windows machine.
Download Cygwin DLL according to the Windows machine type - [setup-x86.exe](https://www.cygwin.com/setup-x86.exe) (32-bit installation) or [setup-x86\_64.exe](https://www.cygwin.com/setup-x86_64.exe) (64-bit installation).

 Run the 64-bit exe as follows. (Change the exe name for 32 bit installation).  
setup-x86.exe -q -P curl

 This would install Cygwin with curl package. Follow instructions ahead.

<h4>Steps for Deployment of All FHIR API proxies</h4>

 This deployment process deploys all proxies by executing a parent install script. Please see the steps below.


1. Go to folder at location : **/flame/src/gateway/fhir/setup-apis**  
2. For Linux machine, check execution permission of setup.sh script. To change permission, use following command  
 chmod +x setup.sh  
3. Run setup.sh script using following command.  
   For Linux/Cygwin, run bash ./setup.sh

 Note:
	The setup.sh needs to be executed from setup-apis folder. It would fail otherwise since relative paths are used from the setup-identity folder.  

4. Following manual inputs required

          * Enter Apigee Enterprise Organization, followed by [ENTER]:  
  Here user need to give Apigee edge organization name.  

        * Enter Organization's Environment, followed by [ENTER]:  
 Here user need to enter environment on which deployment is required.  
 E.g. free account either test or prod. In case of paid organization one of value  from test/dev/prod can be entered.    

        * Enter Apigee Enterprise LOGIN EMAIL, followed by [ENTER]:  
 Here enter registered Email Id  

        * Enter Apigee Enterprise PASSWORD, followed by [ENTER]:  
Here enter valid password  

          * Enter target host URL followed by [ENTER]:  
Here enter the target server's host URL without specifying protocol (http, https) or basepath or port of server.  
        * Press Y if you want to change server port else press N, followed by [ENTER]:  
If you press Y it will ask to enter the server port, else default port will be 80.  
        * Press Y if target server has basepath else press N, followed by [ENTER]:  
If you press Y it will ask to enter basepath for your target server.  

 After above step it will ask following inputs:  

        * To enable connector proxy security, press Y else press N [ENTER]:    
Here you should enter Y, if you want to connector proxies to be accessed from restricted IPs.  
Press Y only if you have IPs from Apigee for message-processors.  
Press N if you do not have the IPs right now. If N is chosen, script starts deployment of proxies directly.  
If Y is chosen, you will be asked for number of IPs you have. You can give max 10 IPs at a time:  

          * Enter the number of IP address (max 10), followed by [ENTER]:  
Based on number given, it will ask IPs. Enter IPs.    

 Deployment of proxies will be started and will take few minutes to deploy all proxies.  
This deployment also includes creation of a Product **(testFHIRproduct**), developer ( **test user** ) and developer app ( **testFHIRApp** ).  
	  You would see execution messages related to developer, product and developer app creation.  
	  On completion, you will see following message -    
        
 "Finally, this setup is complete. Have fun by visiting:[https://enterprise.apigee.com/platform/#/{OrganizationName}/apis](https://enterprise.apigee.com/platform/#/%7BOrganizationName%7D/apis)"

 Refer to **/flame/src/gateway/api-proxies-deployed.txt**. In this text file **, 'FHIR API Proxies deployed'** section lists names of all proxies deployed.  
Your edge account is now set to explore APIs.

<h4>Steps for Deployment of Single API proxy</h4>
In case you want to deploy any single proxy, execute this section.  
The process is similar to above, the only difference is to run the deployment script of a single proxy instead of running a parent install script. Please see the steps below.

 1. If a user wants to deploy single proxy, go to corresponding proxy directory.  
E.g. for an exposed FHIR API, go to **/flame/src/gateway/fhir/fhir-api** folder.  
For a HAPI Connector API, go to **/flame/src/gateway/fhir/fhir-connector-hapi-dstu2 folder.**  

 2. On a Linux platform, check execution permission of setup.sh script. To change permission, use following command.  
chmod +x setup.sh  

 3. Run setup.sh script using following command.  
For Linux/Cygwin, run bash ./setup.sh  
For Mac, run bash ./setup.sh

 4. Following manual inputs required
		
        * Enter Apigee Enterprise Organization, followed by [ENTER]:
        * Enter Organization's Environment, followed by [ENTER]:
		* Enter Apigee Enterprise LOGIN EMAIL, followed by [ENTER]:
		* Enter Apigee Enterprise PASSWORD, followed by [ENTER]:
If you are installing a connector proxy, further inputs are asked :
               
        * To enable connector proxy security, press Y else press N [ENTER]:

   Here you should enter Y, if you want to connector proxies to be accessed from restricted IPs.  
Press Y only if you have IPs from APIGEE for message-processors.  
Press N if you do not have the IPs right now.

   If N is chosen, script starts deployment of proxies directly.

  If Y is chosen, you will be asked for number of IPs you have. You can give max 10 IPs at a time :

         * Enter the count of IP addresses (max 10), followed by [ENTER]:

 Based on the count given, it will ask those number of IPs. Enter valid IPs.

 Deployment of proxy will be started and will take few minutes to deploy the proxy.   
After successful execution of script. It shows following message.   

 "Finally, this setup is complete. Have fun by visiting: [https://enterprise.apigee.com/platform/#/{OrganizationName}/apis](https://enterprise.apigee.com/platform/#/%7BOrganizationName%7D/apis)"

  If the Product ( **testFHIRproduct** ), developer ( **test user** ) and developer app ( **testFHIRApp** ) are not already created, you can create separately by executing script **/flame/src/gateway/fhir/setup\_apis/resources.sh**.

 After executing, following message appears:

 "Resource creation process is completed. You can find
testuser@apigee.com (as Developer), testFHIRproduct (as product),testFHIRApp(as developer app) are created on given organization."
