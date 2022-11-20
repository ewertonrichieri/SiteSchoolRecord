var SchoolRecord = new (function () {
  this.getSchoolRecord = getSchoolRecord;

  function getSchoolRecord() {
    const schoolRecord = [
      {
        Student: {
          Id: document.getElementById("dvIdStudent").value,
          Name: document.getElementById("txtAluno").value,
          Email: document.getElementById("txtEmail").value,
          BirthDate: document.getElementById("txtDtNascimento").value,
        },
        Discipline: {
          Id: document.getElementById("dvIdDiscipline").value,
          Name: document.getElementById("txtDisciplina").value,
          Workload: $("#txtCargaHoraria").val(),
        },
        Bulletin: {
          Id: document.getElementById("dvIdBulletin").value,
          IdStudenty: document.getElementById("dvIdStudent").value,
          DeliveryDate: convertToDateTimeIso8601($("#txtDtEntrega").val()),
        },
        BulletinGrade: {
          Id: document.getElementById("dvIdBulletinGrade").value,
          IdDiscipline: document.getElementById("dvIdDiscipline").value,
          IdBulletin: document.getElementById("dvIdBulletin").value,
          Grade: $("#txtNota").val(),
        },
      },
    ];
    return schoolRecord;
  }
})();

function convertToDateTimeIso8601(date) {
  try {
    if (!Validation.isNullOrEmpty(date)) {
      var dateObj = date.split("/");
      var newDt = `${dateObj[1]}/${dateObj[0]}/${dateObj[2]}`;
      var dt = new Date(newDt);

      const dtWithTimezone = new Date(dt.valueOf() - dt.getTimezoneOffset() * 60000);
      return dtWithTimezone.toISOString();
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
  }
}
