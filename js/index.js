$(":input").inputmask();

(function () {
  try {
    var schoolRecords = null;
    populateCards();
  } catch (e) {
    console.error(e);
  }
})();

async function populateCards() {
  try {
    let res = await API.getSchoolRecords();
    if (!Validation.isNullOrEmpty(res.body)) {
      schoolRecords = JSON.parse(res.body);
      schoolRecords.forEach(createCards);
    }
  } catch (e) {
    console.error(e);
  }
}

function createCards(schoolRecord) {
  let card = getCard(schoolRecord);
  $("#cardsSchoolRecords").append(card);
}

function getCard(schRec) {
  var card =
    "<div class='col-md-4'>" +
    "<div class='card border-light mb-3' style='max-width: 18rem;'>" +
    "<div class='card text-center' style='width: 18rem;'>" +
    "<div class='card-header'>" +
    schRec?.Student?.Name +
    "</div>" +
    "<div class='card-body'>" +
    "<h4 class='card-title'>Nota: " +
    schRec?.BulletinGrade?.Grade +
    "</h4>" +
    "<h7 class='card-subtitle text-muted mb-2'>" +
    schRec?.Discipline?.Name +
    " " +
    schRec?.Discipline?.Workload +
    " hr</h7>" +
    "<br />" +
    "<h7 class='card-subtitle text-muted mb-2'>Data da Entrega: " +
    getStringDate(new Date(schRec.Bulletin.DeliveryDate)) +
    "</h7>" +
    "<br />" +
    "<br />" +
    "<p class='card-text p-y-1'><span>Email: </span>" +
    schRec?.Student?.Email +
    "</p>" +
    "<p class='card-text p-y-1'><span>Data Nascimento: </span>" +
    getStringDtBirth(new Date(schRec.Student.BirthDate)) +
    "</p>" +
    "<button id='btnUpdate' value='" +
    schRec.BulletinGrade.Id +
    "' class='btn btn-primary'>Alterar</button>" +
    "<button id='btnDel' value='" +
    schRec.BulletinGrade.Id +
    "' class='btn btn-primary'>Deletar</button>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>";
  return card;
}

function getStringDate(dt) {
  if (!Validation.isNullOrEmpty(dt)) {
    var minute = dt.getMinutes().toString();
    return `${dt.getDate()}/${dt.getMonth() < 12 ? dt.getMonth() + 1 : 1}/${dt.getFullYear()} ${dt.getHours()}:${
      minute.length == 1 ? "0" + minute : minute
    }`;
  } else {
    return "";
  }
}

function getStringDtBirth(dt) {
  if (!Validation.isNullOrEmpty(dt)) {
    return `${dt.getDate()}/${dt.getMonth() < 12 ? dt.getMonth() + 1 : 1}/${dt.getFullYear()}`;
  } else {
    return "";
  }
}

const Btn = {
  btnSalvar: "btnSalvar",
  btnUpdate: "btnUpdate",
  btnDel: "btnDel",
};

const Event = {
  post: "POST",
  put: "PUT",
};

document.addEventListener("click", function (e) {
  let event = e.target.id;
  if (event === Btn.btnDel) delSchoolRecord(e.target.value);
  if (event === Btn.btnSalvar) {
    if (sessionStorage.getItem("methodRequest") == Event.post) postSchoolRecords();
    else putSchoolRecords();
  }
});

function insertOrUpdateSchoolRecord() {
  if (Validation.isValidFields()) {
  } else {
    document.getElementById("spanInvalidFields").style.display = "block";
  }
}

function putSchoolRecords() {
  if (Validation.isValidFields()) {
    let oldSchoolRec = SchoolRecord.getSchoolRecord();
    API.putSchoolRecords(oldSchoolRec);
  } else {
    Validation.showSpanInvalidField();
  }
}

function postSchoolRecords() {
  if (Validation.isValidFields()) {
    let newSchoolRec = SchoolRecord.getSchoolRecord();
    API.postSchoolRecords(newSchoolRec);
  } else {
    Validation.showSpanInvalidField();
  }
}

function delSchoolRecord(idBulletinGrade) {
  API.delSchoolRecords(idBulletinGrade);
}

$(document).on("click", "#btnUpdate", function (e) {
  sessionStorage.setItem("methodRequest", Event.put);
  $("#mdIdModal").modal("show");

  let idBulletinGrade = e.target.value;
  let schoolRec = schoolRecords.filter((s) => s.BulletinGrade.Id == idBulletinGrade);
  $("#txtAluno").val(schoolRec[0].Student.Name);
  $("#txtNota").val(schoolRec[0].BulletinGrade.Grade);
  $("#txtCargaHoraria").val(schoolRec[0].Discipline.Workload);
  $("#txtDisciplina").val(schoolRec[0].Discipline.Name);
  $("#txtDtEntrega").val(getStringDate(new Date(schoolRec[0].Bulletin.DeliveryDate)));
  $("#txtEmail").val(schoolRec[0].Student.Email);
  $("#txtDtNascimento").val(getStringDtBirth(new Date(schoolRec[0].Student.BirthDate)));

  $("#dvIdStudent").val(schoolRec[0].Student.Id);
  $("#dvIdDiscipline").val(schoolRec[0].Discipline.Id);
  $("#dvIdBulletin").val(schoolRec[0].Bulletin.Id);
  $("#dvIdBulletinGrade").val(schoolRec[0].BulletinGrade.Id);
});

$("#btnAddNew").click(function () {
  sessionStorage.setItem("methodRequest", Event.post);
  $("#txtAluno").val("");
  $("#txtNota").val("");
  $("#txtCargaHoraria").val("");
  $("#txtDisciplina").val("");
  $("#txtDtEntrega").val("");
  $("#txtEmail").val("");
  $("#txtDtNascimento").val("");

  $("#dvIdStudent").val(0);
  $("#dvIdDiscipline").val(0);
  $("#dvIdBulletin").val(0);
  $("#dvIdBulletinGrade").val(0);
});
