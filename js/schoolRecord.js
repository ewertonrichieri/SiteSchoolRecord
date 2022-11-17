const TpEvent = {
    POST: "POST",
    PUT: "PUT",
  };

var SchoolRecord = new (function () {
    this.getSchoolRecord = getSchoolRecord;

    function getSchoolRecord(event) {
        const schoolRecord = [{
            Student: {
                Id: event === TpEvent.POST ? 0 : document.getElementById("txtIdSchRec").value,
                Name: document.getElementById("txtAluno").value,
                Email: document.getElementById("txtEmail").value,
                BirthDate: document.getElementById("txtDtNascimento").value,
            },
            Discipline: {
                Id: TpEvent.POST ? 0 : document.getElementById("txtIdSchRec").value,
                Name: document.getElementById("txtDisciplina").value,
                Workload: 80 
            },
            Bulletin: {
                Id: TpEvent.POST ? 0 : document.getElementById("txtIdSchRec").value,
                IdStudenty: TpEvent.POST ? 0 : document.getElementById("txtIdSchRec").value,
                DeliveryDate: "2021-11-06T09:00:35"
            },
            BulletinGrade: {
                Id: TpEvent.POST ? 0 : document.getElementById("txtIdSchRec").value,
                IdDiscipline: TpEvent.POST ? 0 : document.getElementById("txtIdSchRec").value,
                IdBulletin: TpEvent.POST ? 0 : document.getElementById("txtIdSchRec").value,
                Grade: 7
            }}
    ]
      return schoolRecord;
    }
})();

