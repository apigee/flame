# Revert to original, if we have ever changed these files ...
#cp config.orig config.json

## setup.sh

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

HOST=$ORG-$ENV.apigee.net

mvn clean install -Dusername=${ADMIN_EMAIL} -Dpassword=${APW} -Dorg=${ORG} -P${ENV}

echo " Finally, this setup is complete. Have fun by visiting: https://enterprise.apigee.com/platform/#/"${ORG}"/apis"

# Revert to original, if we have ever changed these files ...
#cp config.orig config.json