    console.log("hello");
    let data = [
    // {  title:800 },
    {  title:400 }
    // {  title:600 },
    // {  title:400 },
    // {  title:450 },
    // {  title:400 }
    //   { value: 400 },
    //   { value: 600 },
    //   { value: 400 },
    //   { name: 'Figma', value: 450 },
    //   { name: 'HTML', value: 400 },
    //   { name: 'CSS', value: 400 },
    //   { name: 'js', value: 200 }
    ];

    // しきい値
    let threshold = 1000;


    for (var variable of data) {

    // しきい値からパーセンテージを計算
    variable.percentage = Math.round(variable.title / threshold * 100);

    variable.view_width = 0;
    variable.view_value = 0;
    
  // containerに追加
    document.querySelector('#ps').insertAdjacentHTML('beforeend',
        //   <div><span class="data-name"> ${variable.src}</div></span>
        `<div class="graf">   
            <div class="graf-bar-bg">
                <div class="graf-bar" id="${variable.value}"><span></span></div>
        </div></div>`);
    

    }

// update


$(window).scroll(function (){
    setTimeout(function () {
    //時間を遅らせて動かしたいソースコードを記述する

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
    }, 1000);//この場合1秒後
});


// updateを実行
window.requestAnimationFrame(update);





// Resources


