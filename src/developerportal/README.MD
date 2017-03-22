# 1. Introduction
---------------
The intent of this document is to guide step by step how to deploy and configure healthapix custom features on a default (out of the box) Apigee developer Portal.

To know more about Apigee developer portal, refer 
[http://apigee.com/docs/developer-services/content/what-developer-portal](http://apigee.com/docs/developer-services/content/what-developer-portal).

On successful deployment of customized site, you will be able to access following:

* Apigee Edge Developer Portal with a customized theme for Healthcare.
* FHIR API Documentation for easy understanding.
* FHIR Sandbox for trying out FHIR APIs.
* App Gallery to promote App ecosystem of your API program.

The deployment of custom changes would result into a similar site as Apigee [HealthAPIx](https://healthapix.apigee.com).

# 2. Pre-Requisites
-----------------

 -   You have created an Apigee developer portal either in the cloud or on-prem.
    On-prem instance is assumed to be created on a Linux server.  
 -   You have an Apigee Edge gateway exposing FHIR APIs.   
    The details to setup an Apigee Edge gateway instance with FHIR APIs is covered in <HealthAPIx_Deploy_APIs> document in /flame/docs folder.  
 -   If you have **In-Cloud** Instance:  
         1.  Apigee dev-portal admin access.  
         2.  Pantheon access to your site’s Git repo.   
    
-Refer [http://docs.apigee.com/developer-services/content/working-pantheon](http://docs.apigee.com/developer-services/content/working-pantheon).    
-You will need to connect with Apigee support team to request them to associate your Apigee dev portal with your created pantheon account.  

# 3. Getting Started
-------------------

### 3.1 Get code with customized changes
Clone **flame** repo.   
Go to **/flame/src/developerportal** – This contains custom portal source code.  

### 3.2 Customize default developer portal
Initially, before flame code migration to the default portal, default developer portal website will look like as below:
<img src="../../readme-images/devportal/Fig01.jpg" width="700px" height="350px"/>  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fig 1.
  
#### 3.2.1 Get default developer portal source 

The default portal code to be modified is in **sites** folder.

##### In-Cloud instance:

* Get the default site’s code from git via pantheon service.  
**Note:** Here, you can get clone of site’s code by using “git clone <git repository url> <repository path>” command followed by pantheon service credentials.  
* The code will be downloaded on your local system at <repository path>. 


##### On-prem instance:
You will find the default developer code at **/var/www/html/sites.**

#### 3.2.2 Backup of default developer portal  

A backup of default portal’s code is recommended before importing custom changes.   

For **In-Cloud** instance,   
Login Pantheon -> goto your portal site -> Backups -> and create a new backup. 

For **On-prem** instance, 
Take a backup of **/var/www/html/sites directory**.

#### 3.2.3 Replace **all** folder of default code with **all** folder from **flame** repo.  

The **all** folder from default portal code now has to be replaced with the **all** folder from the flame source code.  
Replace(Overwrite)   **/sites/all directory**  with  **/flame/src/developerportal/all**  directory.     
For **In-Cloud instance**, you will need to push the custom changes back to git.  

**Note** : All the changes can be reflect on **Cloud** instance, by using Git commands like $git add, $git commit, $git push followed by pantheon credentials.  

We further need to do few manual configurations.  
Access the developer portal website and login with admin credentials.  

# 4. Further Configurations
-------------------------
 

### 4.1 Applying HBR template:
  
•   Go to Configuration -> SmartDocs -> Advanced settings -> Click on **Choose File** button to select the **.hbr** file from cloned/downloaded flame source code i.e. **/flame/src/developerportal/smartdocTemplate.hbr**    
<img src="../../readme-images/devportal/Fig04.jpg" width="700px" height="350px"/>    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fig 2.   

•	Click Upload Button  
•	Save Configuration  
•	Clear Cache [hover Home icon of admin bar ->click Flush all caches ]  
•	Check the changes reflecting on SmartDoc page. [Apigee default theme changes to current theme as below]  

**NOTE:** If there are pre-existing swagger models, one need to republish and render it, to reflect theme changes.  
<img src="../../readme-images/devportal/Fig05.jpg" width="700px" height="350px"/>       
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fig 3.   

### 4.2 Enable FHIR Swagger module:  

To enable FHIR Swagger or any other module, go to admin -> modules and enable them.

- Select fhir_swagger module from the list of modules, enable it.

- Save the configuration.

- Clear Cache [hover Home icon of admin bar ->click Flush all caches ]

### 4.3 Deploy SmartDocs
The FHIR APIs description are available in Swagger JSON formats. These APIs description defines requests that point to the FHIR resources deployed on the Apigee edge gateway instance.

Swagger files are available at: **~\flame\src\developerportal\all\modules\custom\fhir_swagger\swaggers**

You will need to modify the **host** field in all the swagger JSON files to point to the Apigee Edge gateway URL where the FHIR APIs are deployed.

#### 4.3.1 Create a developer app.

  - 	Goto MY ACCOUNT -> My Apps.  
  - 	Select My Apps.  
  - 	Click on Add a new App and specify the following values.  
  - 	Specify any Name  
  - 	Do not add Callback URL.  
  - 	Select testFHIRproduct from the list of products  

#### 4.3.2 Create models and import all FHIR API’s swagger files.  
**NOTE:** Creating all models and import swagger feature is only to be used for first time deployment. For subsequent imports, [manual steps](http://docs.apigee.com/developer-services/content/using-smartdocs-document-apis#creatingamodel) would be needed.  

  - 	Goto address bar > enter dev-{org-name}.devportal.apigee.com**/swagger/import**  
  - 	replace {org-name} in above url with your portal organization name   
  - 	Creation of models and import of swagger will start and the progress of the same will be seen on UI.  
<img src="../../readme-images/devportal/Fig07.jpg" width="700px" height="230px"/>   

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fig 5.
  - 	Clear Cache  
  - 	Select Content->SmartDocs.  
  - 	You’ll find list of all FHIR APIs models which are unpublished.  

#### 4.3.3 Render and publish all API’s methods

  -   	Goto address bar > enter dev-{org-name}.devportal.apigee.com**/swagger/publish**  
  - 	Rendering and publishing of models will start and the progress of the same will be seen on UI.   
<img src="../../readme-images/devportal/Fig09.jpg" width="700px" height="211px"/>    

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fig 6.
  -         Clear Cache.  
  - 	Select Content->SmartDocs.  
  - 	You’ll find list of all FHIR APIs models, rendered and published.  
<img src="../../readme-images/devportal/Fig10.jpg" width="700px" height="350px"/>   

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fig 7.

#### 4.3.4 Configure OAuth 2.0 authentication

This section is applicable to all FHIR resources only i.e. should not be applied to OAuth and Basepath API documentation.
OAuth 2.0 authentication can be used to secure the access to the API. Following steps need to be done to accomplish this.  

##### 4.3.4.1 Update Security Scheme
 - 	Select Content > SmartDocs.  
 - 	For the API model which needs to be configured, select API Revisions from Operations drop-down.  
 - 	For an API revision, select Security Settings from Operations drop-down.  
<img src="../../readme-images/devportal/Fig11.jpg"/>  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fig 8.  

 - 	Select Edit for outhB2C security scheme.  
 <img src="../../readme-images/devportal/Fig12.jpg" width="700px" height="350px"/>    

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fig 9.
 - 	In Advanced Settings section set Authorization Request Method to Header.  
<img src="../../readme-images/devportal/Fig13.jpg" width="700px" height="350px"/>   

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fig 10.
 - 	Select Submit.  

##### 4.3.4.2 Configure Template Authentication Scheme
 - 	Select Content > SmartDocs.  
 - 	For the same model, select Settings from Operations drop-down.   
 - 	In Template authentication schemes, set Client Id & Client Secret to the previously created App’s Consumer key and Secret respectively. The app creation is explained in Section 4.3.1.   
 - 	Click the "Save template authentication schemes" button.  
<img src="../../readme-images/devportal/Fig14.jpg" width="700px" height="350px"/>  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fig 11.

### 4.4 Creating Quicktab instance 
 - 	Go to modules -> Enable Quicktab Module  
 - 	Go to Structure  -> Quicktabs -> Add Quicktabs Instance  
 - 	Fill the details as highlighted in RED 
<img src="../../readme-images/devportal/Fig15.jpg" width="700px" height="350px"/>   

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fig 12. 
 - 	Add Tabs for all APIs (e.g. Vaccination API) as shown in Fig.      
        (Ref. entries in RED colour box)  
 - 	Click “Save” Button.    
<img src="../../readme-images/devportal/Fig16.jpg" width="700px" height="350px"/>  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fig 13.  

 - 	Configure to display Quicktab block on SmartDoc Page.   
  - 	   Go to  Structures  -> Blocks -> Search for Created Quicktab name e.g. **FHIR_API**
  -    	   Select the region as a **SECONDARY**
  -    	   Click on **Configure** hyperlink as shown in below screenshot as BLUE 
<img src="../../readme-images/devportal/Fig17.jpg" width="700px" height="350px"/>  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fig 14.
 -      Fill the following details for “FHIR APIs” block as shown in below image 
    - 	    Css  : all-patient-left-nav  
    - 	    FHIR Responsive theme : Secondary  
    - 	    Content Type : SmartDocs Method  
    - 	    Click on **Save** button.  
<img src="../../readme-images/devportal/Fig18.jpg" width="555px" height="505px"/>  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fig 15.  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="../../readme-images/devportal/Fig19.jpg"width="700px" height="350px"/>   

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fig 16.  

 - 	Resultant screen should be as below.  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="../../readme-images/devportal/Fig20.jpg" width="700px" height="350px"/>  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fig 17.

This completes configuration of Smartdocs.  


Following all sections and steps above would enable a customized developer-portal similar to [https://healthapix.apigee.com/](https://healthapix.apigee.com/)

### 4.5 Enable FHIR responsive theme and other FHIR required modules:  

Fhir_responsive theme contains all fhir related customisation for the portal, and hence needs to be enabled and set as default.

- Goto {your_portal_site}/admin/appearance.
- Choose fhir_responsive responsive theme, enable it and set it as default.

To enable module, go to admin -> modules and enable them.

- Select fhir_responsive module from the list of modules, enable it.
- Select fhir_blocks module from the list of modules, enable it. 
- Select fhir_custom module from the list of modules, enable it.
- Save the configuration.
- Set APIS menu weight, goto -
    Structure->Menus->Main menu->Show row weights
    ->Set APIS  weight to -50->Save.
- Select fhir_install module from the list of modules, enable it.
- Save the configuration.
- Clear Cache [hover Home icon of admin bar ->click Flush all caches ]  

Here we go, now refresh you portal site and you will see all changes of flame code on your portal.  
See reference image below:  
<img src="../../readme-images/devportal/Fig03.jpg" width="700px" height="350px"/>    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fig 18.

# 5.	Configure GTM
--------------------

Site owner will share a GTM container id [GTM-XXXXXX] created using a google application i.e Google analytics tag manager [URL https://tagmanager.google.com](https://tagmanager.google.com), which has to be configured on the apigee portal to analyze site statistics.  

Follow below step to configure container id on apigee portal :-
•	    Login portal with admin credentials -> Admin menu bar -> Configurations -> System -> Google Tag Manager -> General Tab -> Container ID -> Fill in the text box with container id. -> Save configuration 

That’s it, now using your google tag manager application you can track your statistics.


Have fun!







