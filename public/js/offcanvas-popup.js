/*==========================
offcanvas js
 ==========================*/
window.addEventListener("load", (event) => {
  var myOffcanvas = document.getElementById("offcanvas");
  if (myOffcanvas) {
    var bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas);
    bsOffcanvas.show();
  }
});
