$(function(){
    $('#flipbook').turn(
        {
            
                // 自動でページをめくったときの高さ
                elevation: 100,

                // ページめくりのスピード(ms)
                duration: 1000,

                // ページをめくるときの影->有効
                gradients: true,

                // 自動中央揃え->無効
                autoCenter: false,

                // 右開きか左開きかの設定->右開き
                direction: 'ltr',
        }
    );

    $('#prevpage').click(function(){
        $('#katudon_turn').turn('previous');
    });

    $('#nextpage').click(function(){
        $('#katudon_turn').turn('next');
    });

});