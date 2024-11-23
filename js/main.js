var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var submitBtn = document.getElementById("submit");
var updateBtn = document.getElementById("update");
var tableContent = document.getElementById("tableContent");

console.log(tableContent);

var bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
renderBookmarks();

function  addBookmark() {
    var bookmark = {
        siteName: siteName.value,
        siteUrl: siteUrl.value,
    };
    if(validateForm(siteName) && validateForm(siteUrl)){
        bookmarks.push(bookmark);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
        siteName.value = "";
        siteUrl.value = "";
        renderBookmarks();
    }
    // renderBookmarks();
}

function renderBookmarks() {
    tableContent.innerHTML = "";
    for (var index in bookmarks) {
        var bookmark = bookmarks[index];
        console.log(bookmark);
        var row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${bookmark.siteName}</td>
            <td><button class="btn btn-success" onclick="visitBookmark(${index})">Visit</button></td>
            <td><button class="btn btn-warning" onclick="editBookmark(${index})">Edit</button></td>
            <td><button class="btn btn-danger"  onclick="deleteBookmark(${index})">Delete</button></td>`      
        
            tableContent.appendChild(row);
        }

}
function deleteBookmark(index) {
    bookmarks.splice(index, 1);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    renderBookmarks();
}

function editBookmark(index) {
    var bookmark = bookmarks[index];
    siteName.value = bookmark.siteName;
    siteUrl.value = bookmark.siteUrl;
    updateBtn.classList.remove("d-none");
    updateBtn.setAttribute("onclick", `updateBookmark(${index})`);
    submitBtn.classList.add("d-none");
}

function updateBookmark(index) {
    
    var bookmark = {
        siteName: siteName.value,
        siteUrl: siteUrl.value,
    };
    bookmarks[index] = bookmark;
    if(validateForm(siteName) && validateForm(siteUrl)){
    
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    renderBookmarks();
    siteName.value = "";
    siteUrl.value = "";
    updateBtn.classList.add("d-none");
    submitBtn.classList.remove("d-none");
    }
    // renderBookmarks();

}


function visitBookmark(index) {
    var bookmark = bookmarks[index];
    window.open(
        "http://"+bookmark.siteUrl,
        '_blank' // <- This is what makes it open in a new window.
      );
}

function validateForm(element){


    var regex = {
        'siteName' : {'regex' : /^[A-Z]\w{0,3}\w{0,10}$/,'message' : 'Enter a valid name starting with uppercase then a word may enter space then end by word'},
        'siteUrl' : {'regex' : /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/ ,'message' : 'Enter a valid url starting with http or https'}
    };

     
    var elmnt =document.getElementById(element.id)
    if(regex[element.id]['regex'].test(element.value)){
        element.classList.remove("is-invalid");
        element.classList.add("is-valid");
        elmnt.nextElementSibling.innerHTML = "";
        return true;
    }
    elmnt.nextElementSibling.innerHTML = regex[element.id]['message'];
    element.classList.remove("valid");
    element.classList.add("in-valid");
    return false;
   

}