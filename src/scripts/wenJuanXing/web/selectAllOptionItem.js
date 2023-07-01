/**
 * auto select all option item
 */

// 多选题
const $allGroupWrapper = document.querySelectorAll(".ui-controlgroup");
$allGroupWrapper.forEach((i) => {
  i.childNodes[0].click();
});

// 单选题
const $allRadioWrapper = document.querySelectorAll(".ulradiocheck");
$allRadioWrapper.forEach((i) => {
  i.childNodes[0].click();
});

window.scrollTo(0,99999999)

document.querySelectorAll("textarea.inputtext").forEach((i) => (i.value = "八楼啊吧"));

document.querySelector('#submit_button').click()
