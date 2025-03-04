array = [];
let input = document.getElementById("input-text");
let ul = document.getElementById("ul");
let saveBtn = document.getElementById("save-btn");
let deleteBtn = document.getElementById("delete-btn");
let saveTab = document.getElementById("save-tab");
let arrayFromLocal = JSON.parse(localStorage.getItem("array"));

function renderLeads() {
  let listItems = "";
  for (let i = 0; i < array.length; i++) {
    listItems += `<li><a href="${array[i]}" target="_blank">${array[i]}</a></li>`;
  }
  ul.innerHTML = listItems;
}

if (arrayFromLocal) {
  array = arrayFromLocal;
  renderLeads();
}

saveBtn.addEventListener("click", function () {
  if (input.value) {
    array.push(input.value);
    localStorage.setItem("array", JSON.stringify(array));
    input.value = "";
    renderLeads();
  }
});

deleteBtn.addEventListener("dblclick", function () {
  array = [];
  ul.innerHTML = "";
  localStorage.clear();
});

saveTab.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    array.push(tabs[0].url);
    localStorage.setItem("array", JSON.stringify(array));
    renderLeads();
  });
});
