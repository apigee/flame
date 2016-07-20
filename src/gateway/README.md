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
Deploy the FHIR API as per steps mentioned [here](fhir/setup-apis).

**OAuth and Identity Solution**  
Healthapix also provides Identity solution for accessing FHIR APIs in a secured manner.  
This solution is built on top of open source project Grass from Apigee. It mainly consists of OAuth, Identity/User management and Consent Management.  
This component is intended for Untrusted Developers /B2C (Business to Consumer) Model.  
Deploy the identity solution as per steps mentioned [here](identityandoauth/setup-identity).

_A note on **Backend**_  
Healthapix connects to [FHIR Test server](http://fhirtest.uhn.ca) from HAPI community. 



