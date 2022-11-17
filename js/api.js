var hostApi = "https://localhost:44344"; //Please don't forget to change host

  const Method = {
    POST: "POST",
    GET: "GET",
    PUT: "PUT",
    DELETE: "DELETE",
  };

var API = new (function () {
    this.getSchoolRecords = getSchoolRecords;
    this.postSchoolRecords = postSchoolRecords;
    this.putSchoolRecords = putSchoolRecords;
    this.delSchoolRecords = delSchoolRecords;
    
    function getSettings(uri, method) {
        var settings = {
          url: hostApi + uri,
          method: method,
          timeout: 0,
          async: false,
        };
        return settings;
      }

      function getSettingsWithDatas(uri, method, body) {
        var settings = {
          url: hostApi + uri,
          method: method,
          timeout: 0,
          async: false,
          data: JSON.stringify({ body }),
        };
        return settings;
      }

      async function getSchoolRecords() {
        let uri = "/api/deloitte/get/schoolrecords";
        var settings = getSettings(uri, Method.GET);
        return $.ajax(settings)
          .done(function (response) {
            if (response.body != null) {
              return response;
            }
          })
          .fail(function (response) {
            console.error(response);
            return null;
          });
      }

      async function postSchoolRecords(schoolRecords) {
        let uri = "/api/deloitte/post/schoolrecords";
        var settings = getSettingsWithDatas(uri, Method.POST, schoolRecords);
        return $.ajax(settings)
          .done(function (response) {
            if (response.body != null) {
              location.reload();
              return response;
            }
          })
          .fail(function (response) {
            console.error(response);
            return null;
          });
      }

      async function putSchoolRecords() {
        let uri = "/api/deloitte/put/schoolrecords";
        var settings = getSettings(uri, Method.PUT);
        return $.ajax(settings)
          .done(function (response) {
            if (response.body != null) {
              return response;
            }
          })
          .fail(function (response) {
            console.error(response);
            return null;
          });
      }
   
      async function delSchoolRecords(idBulletinGrade) {
        let uri = "/api/deloitte/del/schoolrecords/?idBulletinGrade=" + idBulletinGrade;
        var settings = getSettings(uri, Method.DELETE);
        return $.ajax(settings)
          .done(function (response) {
            if (response.body != null) {
              location.reload();
              return response;
            }
          })
          .fail(function (response) {
            console.error(response);
            return null;
          });
      }
    })();
