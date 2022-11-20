var Validation = new (function () {
  this.isNullOrEmpty = isNullOrEmpty;
  this.isValidFields = isValidFields;
  this.showSpanInvalidField = showSpanInvalidField;

  function isNullOrEmpty(info) {
    return info === "" || info === null || info === undefined ? true : false;
  }

  function isValidFields() {
    return !isNullOrEmpty(document.getElementById("txtAluno").value == "") &&
      !isNullOrEmpty(document.getElementById("txtNota").value) &&
      !isNullOrEmpty(document.getElementById("txtCargaHoraria").value) &&
      !isNullOrEmpty(document.getElementById("txtDisciplina").value) &&
      !isNullOrEmpty(document.getElementById("txtDtEntrega").value) &&
      !isNullOrEmpty(document.getElementById("txtEmail").value) &&
      !isNullOrEmpty(document.getElementById("txtDtNascimento").value) &&
      !isNullOrEmpty(document.getElementById("txtCargaHoraria").value)
      ? true
      : false;
  }

  function showSpanInvalidField() {
    document.getElementById("spanInvalidFields").style.display = "block";
  }
})();
