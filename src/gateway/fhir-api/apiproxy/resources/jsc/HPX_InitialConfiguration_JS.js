var pathsuffix = context.getVariable('proxy.pathsuffix');
//Obtain the primary FHIR resource name via the incoming request's path
var primaryResource = context.getVariable('proxy.pathsuffix');

//Set path for conditional flows
var path = "";
var index = primaryResource.indexOf("/", 1);
if (index != -1)
    path = primaryResource.substring(index);

//Set isPreflight flag
var isPreflight = false;
var verb = context.proxyRequest.method;
if (verb == "OPTIONS") {
    var reqHeaders = context.proxyRequest.headers;
    print(reqHeaders);
    if ('Access-Control-Request-Method' in reqHeaders) {
        var accessReqVeb = reqHeaders['Access-Control-Request-Method'];
        if ((accessReqVeb !== null) && (accessReqVeb !== ""))
            isPreflight = true;
    }
}
print("isprefight=" + isPreflight);

//Set isBasePath flag
var isBasePath = false;
if (primaryResource == "")
    isBasePath = true;
primaryResource = primaryResource.split("/")[1];
var baseEndpoints = ["_history", "$meta", "Binary", "Composition", "metadata", ""];
if (baseEndpoints.indexOf(primaryResource) != -1)
    isBasePath = true;
print("isBasePath: " + isBasePath);

var isAllowedResource = true;
var validScopeFound = true;
var isValidFhirResource = true;

if (!isBasePath) {
    var availableResources = ["AllergyIntolerance", "CarePlan", "Condition", "Coverage", "DiagnosticOrder", "DiagnosticReport", "DocumentReference", "Encounter", "Immunization", "MedicationAdministration", "MedicationDispense", "MedicationOrder", "MedicationStatement", "Observation", "Patient", "Practitioner", "Procedure", "Schedule"];

    var allValidResources = ["AllergyIntolerance","Appointment","AppointmentResponse","AuditEvent","Basic","Binary","BodySite","Bundle","CarePlan","Claim","ClaimResponse","ClinicalImpression","Communication","CommunicationRequest","Composition","ConceptMap","Condition","Conformance","Contract","DetectedIssue","Coverage","DataElement","Device","DeviceComponent","DeviceMetric","DeviceUseRequest","DeviceUseStatement","DiagnosticOrder","DiagnosticReport","DocumentManifest","DocumentReference","EligibilityRequest","EligibilityResponse","Encounter","EnrollmentRequest","EnrollmentResponse","EpisodeOfCare","ExplanationOfBenefit","FamilyMemberHistory","Flag","Goal","Group","HealthcareService","ImagingObjectSelection","ImagingStudy","Immunization","ImmunizationRecommendation","ImplementationGuide","List","Location","Media","Medication","MedicationAdministration","MedicationDispense","MedicationOrder","MedicationStatement","MessageHeader","NamingSystem","NutritionOrder","Observation","OperationDefinition","OperationOutcome","Order","OrderResponse","Organization","Parameters","Patient","PaymentNotice","PaymentReconciliation","Person","Practitioner","Procedure","ProcessRequest","ProcessResponse","ProcedureRequest","Provenance","Questionnaire","QuestionnaireResponse","ReferralRequest","RelatedPerson","RiskAssessment","Schedule","SearchParameter","Slot","Specimen","StructureDefinition","Subscription","Substance","SupplyRequest","SupplyDelivery","TestScript","ValueSet","VisionPrescription"];
	
	if (allValidResources.indexOf(primaryResource) == -1) {
		isValidFhirResource = false;
		isAllowedResource = false;
	}else if (availableResources.indexOf(primaryResource) == -1) {
        //TODO handle unavailable primaryResource condition.
        isAllowedResource = false;
    }

    if (!isPreflight) {
        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        var scope = context.getVariable('scope');
        scopes = scope.split(" ");

        var capitalizedResource = capitalizeFirstLetter(primaryResource.toLowerCase());

        var validScopes = ["patient/" + capitalizedResource + ".write", "patient/" + capitalizedResource + ".read", "user/" + capitalizedResource + ".write", "user/" + capitalizedResource + ".read"];

        var validScopesLength = validScopes.length;

        validScopeFound = false;
        print("in: " + scopes);
        print("compare: " + validScopes);
        var index = 0;
        for (; index < validScopesLength; index++) {
            if (scopes.indexOf(validScopes[index]) != -1) {
                validScopeFound = true;
                break;
            }
        }
    }
}
if (isBasePath) {
    primaryResource = "";
	path = context.getVariable('proxy.pathsuffix');
}

context.setVariable("isAllowedResource", isAllowedResource);
context.setVariable("isValidFhirResource", isValidFhirResource);
context.setVariable("validScopeFound", validScopeFound);

if (validScopeFound) {
    //context.setVariable("service_callout_domain", "fhirsandbox-prod.apigee.net");
    //context.setVariable("service_callout_basepath", "hapi-dstu2");
    context.setVariable("primaryResource", primaryResource);
    context.setVariable("isBasePath", isBasePath);
    context.setVariable("isPreflight", isPreflight);
    context.setVariable("pathsuffix", pathsuffix);
	context.setVariable("path", path);
}