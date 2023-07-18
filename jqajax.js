document.addEventListener("DOMContentLoaded", function () {
  // Ajax Request for Retrieving Data
  function showdata() {
    let output = "";
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "retrieve.php", true);
    xhr.onload = function () {
      if (xhr.status === 200) {
        let data = JSON.parse(xhr.responseText);
        if (data) {
          x = data;
        } else {
          x = "";
        }
        for (let i = 0; i < x.length; i++) {
          output +=
            "<tr><td>" +
            x[i].id +
            "</td><td>" +
            x[i].name +
            "</td><td>" +
            x[i].email +
            "</td><td>" +
            x[i].password +
            "</td><td> <button class='btn-edit' data-sid='" +
            x[i].id +
            "'>Edit</button> <button class='btn-del' data-sid='" +
            x[i].id +
            "'>Delete</button></td><tr>";
        }
        document.getElementById("tbody").innerHTML = output;
      }
    };
    xhr.send();
  }
  showdata();

  // Ajax request For Insert data
  document.getElementById("btnadd").addEventListener("click", function (e) {
    e.preventDefault();
    console.log("Submit button click");
    let stid = document.getElementById("stuid").value;
    let nm = document.getElementById("nameid").value;
    let em = document.getElementById("emailid").value;
    let pw = document.getElementById("passwordid").value;

    let mydata = { id: stid, name: nm, email: em, password: pw };

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "insert.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
      if (xhr.status === 200) {
        let data = xhr.responseText;
        let msg = "<div class='alert alert-dark mt-3'>" + data + "</div>";
        document.getElementById("msg").innerHTML = msg;
        document.getElementById("myform").reset();
        showdata();
      }
    };
    xhr.send(JSON.stringify(mydata));
  });

  //   Ajax Request for Deleting Data
  document.getElementById("tbody").addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-del")) {
      let id = e.target.getAttribute("data-sid");
      let mydata = { sid: id };
      

      let xhr = new XMLHttpRequest();
      xhr.open("POST", "delete.php", true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onload = function () {
        if (xhr.status === 200) {
          let data = xhr.responseText;
          let msg;
          if (data == 1) {
            msg =
              "<div class='alert alert-dark mt-3'>Student data deleted</div>";
            e.target.closest("tr").style.display = "none";
          } else if (data == 0) {
            msg =
              "<div class='alert alert-dark mt-3'>Unable to delete Student data</div>";
          }
          document.getElementById("msg").innerHTML = msg;
        }
      };
      xhr.send(JSON.stringify(mydata));
    }
  });

  // Ajax Request for updating data
  document.getElementById("tbody").addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-edit")) {
      let id = e.target.getAttribute("data-sid");
      let mydata = { sid: id };

      let xhr = new XMLHttpRequest();
      xhr.open("POST", "edit.php", true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onload = function () {
        if (xhr.status === 200) {
          let data = JSON.parse(xhr.responseText);
          document.getElementById("stuid").value = data.id;
          document.getElementById("nameid").value = data.name;
          document.getElementById("emailid").value = data.email;
          document.getElementById("passwordid").value = data.password;
        }
      };
      xhr.send(JSON.stringify(mydata));
    }
  });
});
