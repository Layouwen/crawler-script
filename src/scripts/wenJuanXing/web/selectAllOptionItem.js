/**
 * auto select all option item
 */

const $allWrapper = document.querySelectorAll(".ui-controlgroup");
$allWrapper.forEach((i) => {
  i.childNodes[0].click();
});
