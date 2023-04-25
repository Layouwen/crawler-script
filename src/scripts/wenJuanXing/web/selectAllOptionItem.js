/**
 * auto select all option item
 */

// 多选题
const $allGroupWrapper = document.querySelectorAll('.ui-controlgroup')
$allWrapper.forEach(i => {
  i.childNodes[0].click()
})

// 单选题
const $allRadioWrapper = document.querySelectorAll('.ulradiocheck')
$allWrapper.forEach(i => {
  i.childNodes[0].click()
})
