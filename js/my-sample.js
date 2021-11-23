let data = [
  { name: 'Ai', value: 800 },
  { name: 'Ps', value: 400 },
  { name: 'Ae', value: 600 },
  { name: 'Pr', value: 400 },
  { name: 'Figma', value: 450 },
  { name: 'HTML', value: 400 },
  { name: 'CSS', value: 400 },
  { name: 'js', value: 200 }
];

// しきい値
let threshold = 1000;

for (var variable of data) {

  // しきい値からパーセンテージを計算
  variable.percentage = Math.round(variable.value / threshold * 100);

  variable.view_width = 0;
  variable.view_value = 0;

  // containerに追加
  document.querySelector('#container').insertAdjacentHTML('beforeend', `<div class="graf">
  <div><span class="data-name">${variable.name}</span></div>
  <div class="graf-bar-bg">
  <div class="graf-bar" id="${variable.name}"><span></span></div>
  </div></div>`);
}


// update
function update(timestamp) {


  for (var variable of data) {

    // widthと値を更新
    if (variable.view_width < variable.percentage) {
      variable.view_width = variable.view_width + 2;

      // 一定値以上で減速
      if (variable.view_width > (variable.percentage * 0.8)) {
        variable.view_width = variable.view_width - 1.5;
      }

      // 値を更新
      variable.view_value = variable.view_width * threshold / 100;

    }

    // 値を再描画
    // document.querySelector(`#${variable.name} span`).innerHTML = variable.view_value;
    // グラフを再描画
    document.querySelector(`#${variable.name}`).style.width = variable.view_width + '%';
  }



  // 5000以内はupdateを繰り返す
  if (timestamp <= 5000) {
    window.requestAnimationFrame(update);
  }

}

// updateを実行
window.requestAnimationFrame(update);





Resources


