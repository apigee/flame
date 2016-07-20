# Revert to original, if we have ever changed these files ...
cp ../identity-consent-app/config.orig ../identity-consent-app/config.json
cp ../identity-consentmgmt-api/config.orig ../identity-consentmgmt-api/config.json
cp ../identity-consentmgmt-api-node-module/consentmgmt/package.orig ../identity-consentmgmt-api-node-module/consentmgmt/package.json
cp ../identity-oauthv2-api/config.orig ../identity-oauthv2-api/config.json
cp ../identity-usermgmt-api/config.orig ../identity-usermgmt-api/config.json
cp ../identity-usermgmt-node-module/usermgmt/package.orig ../identity-usermgmt-node-module/usermgmt/package.json
cp ../identity-demo-app/config.orig ../identity-demo-app/config.json
cp ../setup-identity/config.orig ../setup-identity/config.sh
cp ../setup-identity/usergrid.orig ../setup-identity/usergrid.sh

### Cache Configuration files
cp ../setup-identity/resources/consent-session-cache.orig ../setup-identity/resources/consent-session-cache.xml
cp ../setup-identity/resources/nonce-cache.orig ../setup-identity/resources/nonce-cache.xml
cp ../setup-identity/resources/session-cookie-cache.orig ../setup-identity/resources/session-cookie-cache.xml
cp ../setup-identity/resources/auth-req-param-cache.orig ../setup-identity/resources/auth-req-param-cache.xml

### setup.sh
unamestr=`uname`

usage() {
  echo "Usage: $(basename $0) [-o <org name>] [-e <env name>] [-u <admin email>] [-p <admin password>]"
  echo "  -h | --help :                        Display usage information"
  echo "  -o | --org <orgname> :               Organisation Name"
  echo "  -e | --env <envname> :               Environment Name"
  echo "  -u | --username <adminusername> :    Admin Email"
  echo "  -p | --password <password> :         Admin Password"
  exit 0
}

#Get apigee Management URI from user or set to default value.

echo "Default Apigee Management URI is: https://api.enterprise.apigee.com"
echo "To change Management URI press Y else press N [ENTER]:"
read URIFLAG


if [[ $URIFLAG == "y" || $URIFLAG == "Y" ]]; then
	 echo "Enter Management URI, followed by [ENTER]:"
	 read URI	
fi

if [ -z "${URI}" ]; then
	URI="https://api.enterprise.apigee.com"	
fi	

if [ -z "${ORG}" ]; then
    echo "Enter Apigee Enterprise Organization, followed by [ENTER]:"
    read ORG
fi

if [ -z "${ENV}" ]; then
    echo "Enter Organization's Environment, followed by [ENTER]:"
    read ENV
fi

if [ -z "${ADMIN_EMAIL}" ]; then
    echo "Enter Apigee Enterprise LOGIN EMAIL, followed by [ENTER]:"
    read ADMIN_EMAIL
fi

if [ -z "${APW}" ]; then
    echo "Enter Apigee Enterprise PASSWORD, followed by [ENTER]:"
    read APW
fi

HOST=$ORG-$ENV.apigee.net
echo $HOST

### Delete Resources First ###
echo `date`": Deleting Cache Resources, Please hang On !!"
echo ""
SETUP_RESULT=`curl -k -u "${ADMIN_EMAIL}:${APW}" -X DELETE "${URI}/v1/o/${ORG}/environments/${ENV}/caches/consent-session-cache" 1>&2`
echo "${SETUP_RESULT}"
echo ""

SETUP_RESULT=`curl -k -u "${ADMIN_EMAIL}:${APW}" -X DELETE "${URI}/v1/o/${ORG}/environments/${ENV}/caches/nonce-cache" 1>&2`
echo "${SETUP_RESULT}"
echo ""

SETUP_RESULT=`curl -k -u "${ADMIN_EMAIL}:${APW}" -X DELETE "${URI}/v1/o/${ORG}/environments/${ENV}/caches/auth-req-param-cache" 1>&2`
echo "${SETUP_RESULT}"
echo ""

SETUP_RESULT=`curl -k -u "${ADMIN_EMAIL}:${APW}" -X DELETE "${URI}/v1/o/${ORG}/environments/${ENV}/caches/session-cookie-cache" 1>&2`
echo "${SETUP_RESULT}"
echo ""
### End - Delete Resources ###

### Configuring Cache Resources start ###
cachefiles=("../setup-identity/resources/consent-session-cache.xml" "../setup-identity/resources/nonce-cache.xml" "../setup-identity/resources/auth-req-param-cache.xml" "../setup-identity/resources/session-cookie-cache.xml")

if [[ "$unamestr" == 'Linux' || "$unamestr" == *"NT"* ]] ; then
	for file in "${cachefiles[@]}"
	do
		if [ -f "$file" ]
		then
			echo "$file Configured."
			sed -i "s/__ENV__/$ENV/g" $file 
		else
			echo "$file file not found."
		fi
	done
else
	for file in "${cachefiles[@]}"
	do
		if [ -f "$file" ]
		then
			echo "$file Configured."
			sed -i "" "s/__ENV__/$ENV/g" $file 
		else
			echo "$file file not found."
		fi
	done
fi
### end Configuring Cache Resources ###

### Create Cache Resources Now ###
echo `date`": Creating Cache Resources, Please hang On !!"
echo ""
SETUP_RESULT=`curl -k -u "${ADMIN_EMAIL}:${APW}" -X POST "${URI}/v1/o/${ORG}/environments/${ENV}/caches" -T ./resources/consent-session-cache.xml -H "Content-Type: application/xml" -H "Accept: application/xml" 1>&2`
echo "${SETUP_RESULT}"
echo ""

SETUP_RESULT=`curl -k -u "${ADMIN_EMAIL}:${APW}" -X POST "${URI}/v1/o/${ORG}/environments/${ENV}/caches" -T ./resources/nonce-cache.xml -H "Content-Type: application/xml" -H "Accept: application/xml" 1>&2`
echo "${SETUP_RESULT}"
echo ""

SETUP_RESULT=`curl -k -u "${ADMIN_EMAIL}:${APW}" -X POST "${URI}/v1/o/${ORG}/environments/${ENV}/caches" -T ./resources/auth-req-param-cache.xml -H "Content-Type: application/xml" -H "Accept: application/xml" 1>&2`
echo "${SETUP_RESULT}"
echo ""

SETUP_RESULT=`curl -k -u "${ADMIN_EMAIL}:${APW}" -X POST "${URI}/v1/o/${ORG}/environments/${ENV}/caches" -T ./resources/session-cookie-cache.xml -H "Content-Type: application/xml" -H "Accept: application/xml" 1>&2`
echo "${SETUP_RESULT}"
echo ""
### End - Create Cache Resources ###

### Create App Resources Now ###
echo `date`": Deleting Developer, Product, App ; Please hang On !!"
SETUP_RESULT=`curl -k -u "${ADMIN_EMAIL}:${APW}" -X DELETE "${URI}/v1/o/${ORG}/developers/user@identity.com"  1>&2`
echo "${SETUP_RESULT}"
echo ""

SETUP_RESULT=`curl -k -u "${ADMIN_EMAIL}:${APW}" -X DELETE "${URI}/v1/o/${ORG}/apiproducts/identityproduct"  1>&2`
echo "${SETUP_RESULT}"
echo ""

SETUP_RESULT=`curl -k -u "${ADMIN_EMAIL}:${APW}" -X DELETE "${URI}/v1/o/${ORG}/developers/user@identity.com/apps/IdentityApp"  1>&2`
echo "${SETUP_RESULT}"
echo ""

### End - Delete App Resources ###

### Create App Resources Now ###
echo `date`": Creating Developer, Product, App ; Please hang On !!"

SETUP_RESULT=`curl -k -u "${ADMIN_EMAIL}:${APW}" -X POST "${URI}/v1/o/${ORG}/developers" -H "Content-Type: application/json" -d '{"email":"user@identity.com", "firstName":"Identity","lastName":"User","userName":"iuser"}' 1>&2`
echo "${SETUP_RESULT}"
echo ""

SETUP_RESULT=`curl -k -u "${ADMIN_EMAIL}:${APW}" -X POST "${URI}/v1/o/${ORG}/apiproducts" -H "Content-Type: application/json" -d '{"approvalType":"auto","attributes": [{"name": "RATE_LIMIT_OVERRIDE_LIMIT","value": "100ps"}],"displayName":"Identity App Product","name":"identityproduct","environments":["'${ENV}'"], "quota": "100", "quotaInterval": "1", "quotaTimeUnit": "minute","scopes" :["patient/Allergyintolerance.read","patient/Allergyintolerance.write","patient/Careplan.read","patient/Careplan.write","patient/Condition.read","patient/Condition.write","patient/Diagnosticorder.read","patient/Diagnosticorder.write","patient/Diagnosticreport.read","patient/Diagnosticreport.write","patient/Documentreference.read","patient/Documentreference.write","patient/Encounter.read","patient/Encounter.write","patient/Immunization.read","patient/Immunization.write","patient/Medicationadministration.read","patient/Medicationadministration.write","patient/Medicationdispense.read","patient/Medicationdispense.write","patient/Medicationorder.read","patient/Medicationorder.write","patient/Medicationstatement.read","patient/Medicationstatement.write","patient/Observation.read","patient/Observation.write","patient/Patient.read","patient/Patient.write","patient/Practitioner.read","patient/Practitioner.write","patient/Procedure.read","patient/Procedure.write","patient/Schedule.read","patient/Schedule.write","patient/Coverage.read","patient/Coverage.write"]}' 1>&2`
echo "${SETUP_RESULT}"
echo ""

callback_url=https://$HOST/identity_app/callback
app_data="{\"name\":\"IdentityApp\", \"callbackUrl\":\"${callback_url}\"}"
SETUP_RESULT=`curl -k -u "${ADMIN_EMAIL}:${APW}" -X POST "${URI}/v1/o/${ORG}/developers/user@identity.com/apps" -H "Content-Type: application/json" -d "$app_data" `
echo "${SETUP_RESULT}"

apikey=${SETUP_RESULT#*consumerKey*:}
apikey=`echo ${apikey%,*consumerSecret*} | tr -d ' '`
apisecret=${SETUP_RESULT#*consumerSecret*:}
apisecret=`echo ${apisecret%,*expiresAt*} | tr -d ' '`
echo "Generated API Key: ${apikey}"
echo "Generated API Secret: ${apisecret}"
echo ""

ckey=`echo ${apikey} | tr -d '"'`
SETUP_RESULT=`curl -k -u "${ADMIN_EMAIL}:${APW}" -X POST "${URI}/v1/o/${ORG}/developers/user@identity.com/apps/IdentityApp/keys/${ckey}" -H "Content-Type: application/xml" -d '<CredentialRequest><ApiProducts><ApiProduct>identityproduct</ApiProduct></ApiProducts></CredentialRequest>' `
echo "${SETUP_RESULT}"

echo "$unamestr"
if [[ "$unamestr" == 'Linux' || "$unamestr" == *"NT"* ]] ; then
	APW_NEW=$(echo $APW | sed -e 's/\\/\\\\/g' -e 's/\//\\\//g' -e 's/&/\\\&/g' -e "s/'/'\"'\"'/g")
	sed -i "s/__KEY__/$apikey/g" ./config.sh
	sed -i "s/__SECRET__/$apisecret/g" ./config.sh
	sed -i "s/__ORG__/$ORG/g" ./config.sh
	sed -i "s/__ENV__/$ENV/g" ./config.sh
	sed -i "s/__ADMINEMAIL__/$ADMIN_EMAIL/g" ./usergrid.sh
	sed -i "s/'__APW__'/'$APW_NEW'/g" ./usergrid.sh
else
	APW_NEW=$(echo $APW | sed -e 's/\\/\\\\/g' -e 's/\//\\\//g' -e 's/&/\\\&/g' -e "s/'/'\"'\"'/g")
	sed -i "" "s/__KEY__/$apikey/g" ./config.sh
	sed -i "" "s/__SECRET__/$apisecret/g" ./config.sh
	sed -i "" "s/__ORG__/$ORG/g" ./config.sh
	sed -i "" "s/__ENV__/$ENV/g" ./config.sh
	sed -i "" "s/__ADMINEMAIL__/$ADMIN_EMAIL/g" ./usergrid.sh
	sed -i "" "s/'__APW__'/'$APW_NEW'/g" ./usergrid.sh
fi

### End - Create App Resources ###

echo "Calling usergrid.sh ==> for Usergrid dependencies. Hold tight, for some more time."
echo
echo "I promise, we'll have a gala time together ..."

if [[ "$unamestr" == 'Linux' || "$unamestr" == *"NT"* ]] ; then
	bash ./usergrid.sh
else
	sh ./usergrid.sh
fi

cd ../parent-pom/
mvn clean install -Dusername=${ADMIN_EMAIL} -Dpassword=${APW} -Dorg=${ORG} -P${ENV}

echo "Finally, this setup is complete. Have fun by visiting: https://${ORG}-${ENV}.apigee.net/identity_app/index"

# Revert to original, if we have ever changed these files ...
cp ../identity-consent-app/config.orig ../identity-consent-app/config.json
cp ../identity-consentmgmt-api/config.orig ../identity-consentmgmt-api/config.json
cp ../identity-consentmgmt-api-node-module/consentmgmt/package.orig ../identity-consentmgmt-api-node-module/consentmgmt/package.json
cp ../identity-oauthv2-api/config.orig ../identity-oauthv2-api/config.json
cp ../identity-usermgmt-api/config.orig ../identity-usermgmt-api/config.json
cp ../identity-usermgmt-node-module/usermgmt/package.orig ../identity-usermgmt-node-module/usermgmt/package.json
cp ../identity-demo-app/config.orig ../identity-demo-app/config.json
cp ../setup-identity/config.orig ../setup-identity/config.sh
cp ../setup-identity/usergrid.orig ../setup-identity/usergrid.sh

### Cache Configuration files
cp ../setup-identity/resources/consent-session-cache.orig ../setup-identity/resources/consent-session-cache.xml
cp ../setup-identity/resources/nonce-cache.orig ../setup-identity/resources/nonce-cache.xml
cp ../setup-identity/resources/session-cookie-cache.orig ../setup-identity/resources/session-cookie-cache.xml
cp ../setup-identity/resources/auth-req-param-cache.orig ../setup-identity/resources/auth-req-param-cache.xml
