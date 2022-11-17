var newIdSchRec = 0;

function getNewIdSchRec(){
  let newId = "newId";
  newIdSchRec = newIdSchRec + 1;
  return newId + newIdSchRec;
}

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
    if (!isNullOrEmpty(res.body)) {
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
    "<a id='btnUpdate' href='#' class='btn btn-primary'>Alterar</a>" +
    "<button id='btnDel' href='#' value='" +
    schRec.BulletinGrade.Id +
    "' class='btn btn-primary'>Deletar</button>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>";
  return card;
}

function isNullOrEmpty(info) {
  return ((info === "") || (info === null) || (info === undefined)) ? true : false;
}

function getStringDate(dt) {
  if (!isNullOrEmpty(dt)) {
    var minute = dt.getMinutes().toString();
    return `${dt.getDate()}/${dt.getMonth() < 12 ? dt.getMonth() + 1 : 1}/${dt.getFullYear()} ${dt.getHours()}:${
      minute.length == 1 ? "0" + minute : minute
    }`;
  } else {
    return "";
  }
}

function getStringDtBirth(dt) {
  if (!isNullOrEmpty(dt)) {
    return `${dt.getDate()}/${dt.getMonth() < 12 ? dt.getMonth() + 1 : 1}/${dt.getFullYear()}`;
  } else {
    return "";
  }
}

const Event = {
  btnSalvar: "btnSalvar",
  btnUpdate: "btnUpdate",
  btnDel: "btnDel",
};

document.addEventListener("click", function (e) {
  let event = e.target.id;
  if (event === Event.btnSalvar) postSchoolRecords();
  if (event === Event.btnDel) delSchoolRecord(e.target.value);

  let id = e.target.value;

  let schRec = schoolRecords.filter((s) => s.BulletinGrade.Id == id);
});

function postSchoolRecords() {
  if(isValidFields()){
    document.getElementById("txtIdSchRec").value = getNewIdSchRec();
    var newSchoolRec = SchoolRecord.getSchoolRecord("POST");
    API.postSchoolRecords(newSchoolRec);
  }
  else{
    document.getElementById("spanInvalidFields").style.display = "block";
  }
}

function delSchoolRecord(idBulletinGrade){
  API.delSchoolRecords(idBulletinGrade);
}

function getNewSchoolRec(){
  const scRec = {

  }
}

function isValidFields(){
  return !isNullOrEmpty(document.getElementById("txtAluno").value == "")
  && !isNullOrEmpty(document.getElementById("txtNota").value)
  && !isNullOrEmpty(document.getElementById("txtCargaHoraria").value)
  && !isNullOrEmpty(document.getElementById("txtDisciplina").value)
  && !isNullOrEmpty(document.getElementById("txtDtEntrega").value)
  && !isNullOrEmpty(document.getElementById("txtEmail").value)
  && !isNullOrEmpty(document.getElementById("txtDtNascimento").value)
  && !isNullOrEmpty(document.getElementById("txtCargaHoraria").value)
  ? true : false;
}

function hiddenShowSpan(){
  document.getElementById("spanInvalidFields").style.display = "none";
}
