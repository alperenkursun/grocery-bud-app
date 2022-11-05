var inputt = document.getElementById("input");
var add = document.getElementById("add");
var itemss = document.getElementById("items");
var edit = document.getElementById("edit");
var del = document.getElementById("delete");
var clear = document.getElementById("clear");
var alertt = document.getElementById("alertt");
var ite;
var inputtext = "";
var id = 0;
var index = 0;
let isEdit = 0;

// { id: "1", item: "asdasdasdsadsadassaz" }

let data = [];
data = JSON.parse(localStorage.getItem("data"));
var text = "";
display();

function display() {
  itemss.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    text = `
    <div class="input-group mb-3 mt-3">
            <input
              type="text"
              class="form-control"
              placeholder="${data[i].item}"
              aria-label="Example text with two button addons"
              disabled
            />
            <button id="edit${data[i].id}" onclick="editt(id)" class="btn btn-sm btn-secondary" type="button">
              <i class="fa-regular fa-pen-to-square text-white"></i>
            </button>
            <button id="delete${data[i].id}" onclick="dell(id)" class="btn btn-sm btn-danger" type="button">
              <i class="fa-solid fa-trash-can text-white"></i>
            </button>
          </div>
     `;

    itemss.insertAdjacentHTML("beforeend", text); // console.log(text);
  }
  console.log(data.length);
  if (data.length == 0) {
  } else {
    let txt = `<button
    id="clear"
    onclick="clearr()"
    type="button"
    class="btn btn-danger mt-4 "
    >
    Clear Items
    </button>`;

    itemss.insertAdjacentHTML("beforeend", txt); // console.log(text);
  }

  localStorage.setItem("data", JSON.stringify(data));
  console.log(localStorage);
}

add.addEventListener("click", () => {
  if (!inputt.value) {
    alertt.classList.remove("d-none");
    alertt.classList.add("bg-danger");
    alertt.classList.remove("bg-success");
    alertt.innerText = "Please Enter Value";
    setTimeout(() => {
      alertt.classList.add("d-none");
    }, 2000);
  } else {
    if (isEdit == 0) {
      alertt.classList.remove("d-none");
      alertt.classList.remove("bg-danger");
      alertt.classList.add("bg-success");
      alertt.innerText = "Item Added To The List";
      setTimeout(() => {
        alertt.classList.add("d-none");
      }, 2000);
      inputtext = inputt.value;
      tempobj = { id: `${id}`, item: `${inputtext}` };
      data.push(tempobj);
    } else {
      inputtext = inputt.value;
      for (let indexx in data) {
        if (data[indexx].id == index) {
          data[indexx].item = inputtext;
        }
      }
      alertt.classList.remove("d-none");
      alertt.classList.remove("bg-danger");
      alertt.classList.add("bg-success");
      alertt.innerText = "Value Changed";
      setTimeout(() => {
        alertt.classList.add("d-none");
      }, 2000);
    }
  }
  inputt.value = "";
  console.log(data);
  isEdit = 0;
  add.innerText = "Submit";
  //console.log(data);
  id++;
  input++;
  display();
});

function dell(deleteid) {
  let idd = deleteid.slice(6);
  for (let i = 0; i < data.length; i++) {
    if (data[i].id == idd) {
      //console.log("asdasd:" + idd);
      data.splice(i, 1);
    }
  }
  alertt.classList.remove("d-none");
  alertt.classList.add("bg-danger");
  alertt.classList.remove("bg-success");
  alertt.innerText = "Item Removed";
  setTimeout(() => {
    alertt.classList.add("d-none");
  }, 2000);
  itemss.innerHTML = "";

  display();
}

function editt(editid) {
  let idd = editid.slice(4);
  for (let dataa of data) {
    if (dataa.id == idd) {
      //console.log("asdasd:" + idd);
      inputt.value = dataa.item;
      index = dataa.id;
    }
    console.log(dataa);
  }
  isEdit = 1;
  add.innerText = "Edit";
  console.log(count);
}

function clearr() {
  data = [];
  itemss.innerHTML = "";
  inputt.innerText = "";
  alertt.classList.remove("d-none");
  alertt.classList.remove("bg-danger");
  alertt.classList.add("bg-success");
  alertt.innerText = "Empty List";
  setTimeout(() => {
    alertt.classList.add("d-none");
  }, 2000);

  display();
}
