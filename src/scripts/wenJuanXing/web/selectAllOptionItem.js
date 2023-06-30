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

document.querySelectorAll("textarea").forEach((i) => (i.value = "八楼啊吧"));
document.querySelectorAll("input").forEach((i) => (i.value = "巴拉巴拉"));
