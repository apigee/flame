usage() {
  echo "Usage: $(basename $0) [-o <org name>] [-e <env name>] [-u <admin email>] [-p <admin password>]"
  echo "  -h | --help :                        Display usage information"
  echo "  -o | --org <orgname> :               Organisation Name"
  echo "  -e | --env <envname> :               Environment Name"
  echo "  -u | --username <adminusername> :    Admin Email"
  echo "  -p | --password <password> :         Admin Password"
  exit 0
}

# if [ $# -eq 0 ]; then
# 	usage
# fi

while [ $# -gt 0 ]; do
  case "$1" in
    -o|--org)
      if [ -n "$2" ]; then
        ORG=$2
        shift
        shift
      else
        usage
      fi
    ;;
    -e|--env)
      if [ -n "$2" ]; then
        ENV=$2
        shift
        shift
      else
        usage
      fi
    ;;
    -u|--username)
      if [ -n "$2" ]; then
        ADMIN_EMAIL=$2
        shift
        shift
      else
        usage
      fi
    ;;
    -p|--password)
      if [ -n "$2" ]; then
        APW=$2
        shift
        shift
      else
        usage
      fi
    ;;
    -h|--help)
      usage
    ;;
    *)
      usage
  esac
done

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
   # read -s -r APW
    read APW
fi

########################################################################

HOST=$ORG-$ENV.apigee.net

##  Creating target server  ##

if [ -z "${TARGETHOST}" ]; then
    echo "Enter target server host URL:"
    read TARGETHOST
fi

echo "Default target port is 80. Press Y if you want to change else press N followed by [ENTER]:"
read PORTFLAG

if [[ $PORTFLAG == "y" || $PORTFLAG == "Y" ]]; then
	echo "Enter target server port:"
    read TARGETPORT
fi

if [ -z "${TARGETPORT}" ]; then
	TARGETPORT=80
fi

echo "Press Y if target server has basepath else press N followed by [ENTER]:"
read BASEPATH_FLAG

if [[ $BASEPATH_FLAG == "y" || $BASEPATH_FLAG == "Y" ]]; then
	 echo "Enter basepath of target server, followed by [ENTER]:"
	 read TARGETBASEPATH	
fi

if  [ -z "${TARGETBASEPATH}" ]; then
	TARGETBASEPATH=""
fi

SERVER_RESULT=`curl -k -u "${ADMIN_EMAIL}:${APW}" -X POST "${URI}/v1/o/${ORG}/e/${ENV}/targetservers" -H "Content-Type: application/json" -d '{ "host": "'${TARGETHOST}'","isEnabled": true,"name": "fhirserver","port": "'${TARGETPORT}'"}' 1>&2`

echo "${SERVER_RESULT}"

### Create App Resources Now ###
echo `date`": Deleting Developer, Product, App ; Please hang On !!"
SETUP_RESULT=`curl -k -u "${ADMIN_EMAIL}:${APW}" -X DELETE "${URI}/v1/o/${ORG}/developers/testuser@apigee.com"  1>&2`
echo "${SETUP_RESULT}"
echo ""

SETUP_RESULT=`curl -k -u "${ADMIN_EMAIL}:${APW}" -X DELETE "${URI}/v1/o/${ORG}/apiproducts/testFHIRproduct"  1>&2`
echo "${SETUP_RESULT}"
echo ""

SETUP_RESULT=`curl -k -u "${ADMIN_EMAIL}:${APW}" -X DELETE "${URI}/v1/o/${ORG}/developers/testuser@apigee.com/apps/testFHIRApp"  1>&2`
echo "${SETUP_RESULT}"
echo ""
### End - Delete App Resources ###

### Create App Resources Now ###
echo `date`": Creating Developer, Product, App ; Please hang On !!"

SETUP_RESULT=`curl -k -u "${ADMIN_EMAIL}:${APW}" -X POST "${URI}/v1/o/${ORG}/developers" -H "Content-Type: application/json" -d '{"email":"testuser@apigee.com", "firstName":"test","lastName":"user","userName":"testuser"}' 1>&2`
echo "${SETUP_RESULT}"
echo ""

SETUP_RESULT=`curl -k -u "${ADMIN_EMAIL}:${APW}" -X POST "${URI}/v1/o/${ORG}/apiproducts" -H "Content-Type: application/json" -d '{"approvalType":"auto","attributes": [{"name": "RATE_LIMIT_OVERRIDE_LIMIT","value": "100ps"}],"displayName":"testFHIRproduct","name":"testFHIRproduct","environments":["'${ENV}'"],"proxies": ["FHIR-API"], "apiResources":["/","/**"],"quota": "10000", "quotaInterval": "1", "quotaTimeUnit": "minute","scopes" : ["patient/Allergyintolerance.read","patient/Allergyintolerance.write","patient/Careplan.read","patient/Careplan.write","patient/Condition.read","patient/Condition.write","patient/Diagnosticorder.read","patient/Diagnosticorder.write","patient/Diagnosticreport.read","patient/Diagnosticreport.write","patient/Documentreference.read","patient/Documentreference.write","patient/Encounter.read","patient/Encounter.write","patient/Immunization.read","patient/Immunization.write","patient/Medicationadministration.read","patient/Medicationadministration.write","patient/Medicationdispense.read","patient/Medicationdispense.write","patient/Medicationorder.read","patient/Medicationorder.write","patient/Medicationstatement.read","patient/Medicationstatement.write","patient/Observation.read","patient/Observation.write","patient/Patient.read","patient/Patient.write","patient/Practitioner.read","patient/Practitioner.write","patient/Procedure.read","patient/Procedure.write","user/Allergyintolerance.read","user/Allergyintolerance.write","user/Careplan.read","user/Careplan.write","user/Condition.read","user/Condition.write","user/Diagnosticorder.read","user/Diagnosticorder.write","user/Diagnosticreport.read","user/Diagnosticreport.write","user/Documentreference.read","user/Documentreference.write","user/Encounter.read","user/Encounter.write","user/Immunization.read","user/Immunization.write","user/Medicationadministration.read","user/Medicationadministration.write","user/Medicationdispense.read","user/Medicationdispense.write","user/Medicationorder.read","user/Medicationorder.write","user/Medicationstatement.read","user/Medicationstatement.write","user/Observation.read","user/Observation.write","user/Patient.read","user/Patient.write","user/Practitioner.read","user/Practitioner.write","user/Procedure.read","user/Procedure.write","patient/Schedule.read","patient/Schedule.write","user/Schedule.read","user/Schedule.write","patient/Coverage.read","patient/Coverage.write","user/Coverage.read","user/Coverage.write"]}' 1>&2
`
echo "${SETUP_RESULT}"
echo ""

callback_url=https://$HOST
app_data="{\"name\":\"testFHIRApp\", \"callbackUrl\":\"${callback_url}\"}"
SETUP_RESULT=`curl -k -u "${ADMIN_EMAIL}:${APW}" -X POST "${URI}/v1/o/${ORG}/developers/testuser@apigee.com/apps" -H "Content-Type: application/json" -d "$app_data" `
echo "${SETUP_RESULT}"

apikey=${SETUP_RESULT#*consumerKey*:}
apikey=`echo ${apikey%,*consumerSecret*} | tr -d ' '`
apisecret=${SETUP_RESULT#*consumerSecret*:}
apisecret=`echo ${apisecret%,*expiresAt*} | tr -d ' '`
echo "Generated API Key: ${apikey}"
echo "Generated API Secret: ${apisecret}"
echo ""

ckey=`echo ${apikey} | tr -d '"'`
SETUP_RESULT=`curl -k -u "${ADMIN_EMAIL}:${APW}" -X POST "${URI}/v1/o/${ORG}/developers/testuser@apigee.com/apps/testFHIRApp/keys/${ckey}" -H "Content-Type: application/xml" -d '<CredentialRequest><ApiProducts><ApiProduct>testFHIRproduct</ApiProduct></ApiProducts></CredentialRequest>' `
echo "${SETUP_RESULT}"
echo "Resource creation process is completed.You can find testuser@apigee.com(as Developer),testFHIRproduct(as product),testFHIRApp(as developer app) are craeted on given organization"
