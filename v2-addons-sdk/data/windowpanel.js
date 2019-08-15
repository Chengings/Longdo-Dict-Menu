document.body.style.color = "#333333";
document.body.style.backgroundColor = "#FFF8DC";
function forceLinkToBlank() {
    var links = document.getElementsByTagName("a");
    for (var i = 0, l = links.length; i < l; i++) {
        links[i].target = "_blank";
    }
}
var a_blank = forceLinkToBlank();