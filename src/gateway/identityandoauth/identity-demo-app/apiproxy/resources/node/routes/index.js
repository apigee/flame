exports.index = function(req, res) {
  res.render('index', {
    title : 'Home',
    client_id : req.query.client_id,
    redirect_uri : req.query.redirect_uri,
    authorization_req_url : req.query.authorization_req_url
  })
};

exports.error = function(req, res) {
  res.render('error', {
    title : 'Error'
  })
};

exports.callback = function(req, res) {
	//Added logout_uri with accessToken and logoutRedircetUri as queryparams
    var accessToken =  req.query.accessToken || "" ;
    var logout_uri =  req.query.logout_uri || "" ;
    var logoutRedircetUri = req.query.logoutRedircetUri || "" ;
    logout_uri = logout_uri + "?accessToken="+accessToken+"&logoutRedircetUri="+logoutRedircetUri;
    res.render('success', {
    title : 'Welcome',
    name : req.query.name || "",
    surname : req.query.surname||"",
    id : req.query.id ||"",
    family_name : req.query.family_name ||"",
    given_name : req.query.given_name ||"",
    name_suffix : req.query.name_suffix ||"",
    gender : req.query.gender ||"",
    birth_date : req.query.birth_date ||"",
    version : req.query.version ||"",
    last_updated : req.query.last_updated ||"",
    email : req.query.email ||"",
    relation : req.query.relation ||"",
	get_all_encounters_uri: req.query.get_all_encounters_uri || "",
    logout_uri :logout_uri
  })
};


exports.encounters = function(req, res) {
  res.render('encounters', {
    title : 'Encounters',
    id_array : req.query.id_array || "",
    status_array : req.query.status_array|| "",
    class_array : req.query.class_array || "",
    last_updated_array : req.query.last_updated_array|| "",
    version_array : req.query.version_array|| "",
    get_encounter : req.query.get_encounter || ""
  })
};

exports.encounter = function(req, res) {
  res.render('encounter', {
    title : 'Encounter',
    patient_display : req.query.patient_display || "",
    identifier : req.query.identifier || "",
    reason : req.query.reason || "",
    indication : req.query.indication || "",
    length : req.query.length || "",
    status : req.query.status || "",
    res_class : req.query.res_class || "",
    diagnosis : req.query.diagnosis || "",
    priority : req.query.priority || ""
	
  })
};