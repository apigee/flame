**API Gateway**
=====================

Apigee edge platform hosts a collection of pre-configured  API proxies.   
These include FHIR APIs, OAuth and Identity Management proxies.  
**FHIR APIs**  
Healthapix supports following 18 FHIR APIs   
1.	Patient  
2.	Encounter  
3.	Observation  
4.	Condition  
5.	MedicationPrescription/ MedicationOrder  
6.	MedicationDispense  
7.	MedicationAdministration  
8.	MedicationStatement  
9.	Immunization  
10.	AllergyIntolerance  
11.	DiagnosticOrder  
12.	DiagnosticReport  
13.	CarePlan  
14.	Procedure  
15.	Practitioner  
16.	DocumentReference  
17.	Schedule  
18.	Coverage  

**OAuth and Identity Solution**  
Healthapix also provides Identity solution for accessing FHIR APIs in a secured manner.  
This solution is built on top of open source project Grass from Apigee. It mainly consists of OAuth, Identity/User management and Consent Management.  
This component is intended for Untrusted Developers /B2C (Business to Consumer) Model.  


To deploy all the APIs, OAuth and Identity Solution on your own org please run the following
script from the root folder of the cloned repo.

### Installation 

#### Pre-requisites
+ [node.js](https://nodejs.org/en/download/) 
+ [npm](https://docs.npmjs.com/getting-started/installing-node)

#### Instructions

Install gulp 
```
npm install --global gulp-cli
```

Pull node modules and execute gulp task
```
npm start
```

+ Do you have cloud datastore instance? Enter true/false **(** This will ask you if you have your own Datastore instance, or want to use the Apigee's public south-bound endpoint for Goole Cloud Datastore **)**

--start if true -- _If you choose to use your own Datastore instance, the script will additionally prompt you all this_
+ Enter the cloud datastore project id
+ Enter the service account private key
+ Enter the token uri of the service account
+ Enter the client email of the service account

-- end if --

Once above inputs are provided, this will interactively prompt you for following details, and will then create / deploy all relevants bundles and artifacts and will provision the **FHIR Sandbox** on your own Org.

+ Edge Org name
+ Edge Username
+ Edge Password
+ Edge Env for deployment
+ Target server host URL **eg**: fhirtest.uhn.ca
+ Target server port **eg**: 80
+ Target server basepath **eg**: /baseDstu2


_A note on **Backend**_  
Healthapix connects to [FHIR Test server](http://fhirtest.uhn.ca) from HAPI community. 

_A note on **Datastore instance**_  
The OpenBank Solution is using Google Cloud Datastore as backend. To setup the OpenBank solution, there are two options available:
+ Using one's own Google Cloud Datastore instance
+ If you do not have Goole Cloud Platform access then OpenBank solution can still be deployed and run with public south-bound endpoint for Datastore hosted by Apigee 
