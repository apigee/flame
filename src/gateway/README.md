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
+ node.js 
+ npm

#### Instructions

Install gulp 
```
npm install --global gulp-cli
```

Pull node modules
```
npm install
```

Run the deploy command
```
gulp deploy --resource fhir_apis
```

This will interactively prompt you for following details, and will then create / deploy all relevants bundles and artifacts and will provision the ** FHIR Sandbox** on your own Org.

+ Edge Org name
+ Edge Username
+ Edge Password
+ Edge Env for deployment
+ Target server host URL **eg**: fhirtest.uhn.ca
+ Target server port **eg**: 80
+ Target server basepath **eg**: /baseDstu2
+ BaaS Org Name
+ BaaS App Name **(**new app with this name is created in BaaS if it doesn't already exist**)**
+ BaaS Org Client Id **(**can be obtained from BaaS ui as shown in the fig 1**)**
+ BaaS Org Client Secret **(**can be obtained from BaaS ui as shown in the fig 1**)**



_A note on **Backend**_  
Healthapix connects to [FHIR Test server](http://fhirtest.uhn.ca) from HAPI community. 


[BaaS org credentials](https://raw.githubusercontent.com/kidiyoor/flame/master/readme-images/gateway/baas-cred.png "Where to find BaaS org credentials")
