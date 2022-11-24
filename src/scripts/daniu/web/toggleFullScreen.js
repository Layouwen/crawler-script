const $video = document.querySelector(".pv-video-player");
const $style = document.createElement("style");

const removeStyleItem = [
  {
    key: "width",
    value: "700px",
  },
  {
    key: "height",
    value: "435px",
  },
];

// add style
const customVideoWrapperClassName = "custom-video-wrapper";
const customControlClassName = "custom-control";

$style.innerHTML = `
.${customVideoWrapperClassName} {
    z-index: 99999;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
}
.${customControlClassName} {
    z-index: 999999;
    position: fixed;
    top: 50%;
    right: 10%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-radius: 50%;
    background: gray;
    color: white;
    -moz-user-select:none; /*火狐*/
    -webkit-user-select:none; /*webkit浏览器*/
    -ms-user-select:none; /*IE10*/
    -khtml-user-select:none; /*早期浏览器*/
    user-select:none;
    cursor: pointer;
} 
`;
document.head.appendChild($style);

// add control
const $control = document.createElement("div");
$control.classList.add(customControlClassName);
$control.innerHTML = `全屏`;
let isFull = false;
$control.onclick = () => {
  if (isFull) {
    $video.classList.remove(customVideoWrapperClassName);
    removeStyleItem.forEach((item) =>
      $video.style.setProperty(item.key, item.value)
    );
    $control.innerHTML = `全屏`;
  } else {
    $video.classList.add(customVideoWrapperClassName);
    removeStyleItem.forEach((item) => $video.style.removeProperty(item.key));
    $control.innerHTML = `窗口`;
  }
  isFull = !isFull;
};
document.body.appendChild($control);
