**Identity Solution (includes OAuth) Deployment**
=================================================

Deployment of identity solution is a similar process as explained in previous section.

**Pre-requisite:**

1.  Ensure you have access to **Apigee App Services i.e. BAAS organization** and the name of the BAAS organization is known to you.

**Deployment Steps:**

1.  Go to **/flame/src/gateway/identityandoauth/setup-identity**

2.  For Linux machine, check permission of setup.sh script. Script should have execution permission. To change permission, use following command **chmod +x setup.sh**

3.  Execute '**setup.sh**' as per your platform.

    Run as '**. /setup.sh**', if you are on Mac.

    Run as '**bash setup.sh**', if you are on Linux/Cygwin.

    **Note:**

    The setup.sh needs to be executed from setup-identity folder.                 
It would fail otherwise since relative paths are used from the setup-identity folder.

4.  When you run the setup.sh script it will ask for your organization name on Apigee Edge, the environment to setup the Identity solution and the Apigee Edge credentials.

5.  It creates API service resources (4 cache resources named as **consent-session-cache, nonce-cache, auth-req-param-cache, session-cookie-cache** ), a developer ( **Identity User named as user@identity.com** ), product ( **Identity App product named as identityproduct** ) and an app ( **Identity App named as IdentityApp** ) for the created developer.

6.  Then it will ask for the name of the **App Services organization i.e. BAAS organization** (An app services organization will be created by default when you create an organization on Apigee Edge. So the same organization can be used.)

    Further the name for the **App to be created on App services organization i.e. BAAS organization** is to be given. Here you can choose to give any name for your app.

7.  Post this, it deploys the Identity API Proxies (7 proxies) to your specified organization and deploys to the environment you specified.

    Refer to **/flame/src/gateway/api-proxies-deployed.txt.** In this text file, **'Identity Solution Proxies'** section lists names of all proxies deployed.