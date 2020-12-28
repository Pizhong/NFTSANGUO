// 战场dom数据操作

/**
 * @msg: 弹窗操作
 * @param {*}
 * @return {*}
 */
function popUps() {
    console.log(111111111);
    if ($('#action-point').length == 0) {

        var html = '';

        html += '<div class="alert-publicly" id="action-point" style="display: none;">';
        html += '<div class="alert-box">';
        html += '<div class="action-content flex">';
        html += '<p>我可领取的行动点:<span id="callable-action-points"></span></p>'
        html += '<img src="../image/action-point-button.png" style="cursor: pointer;" onclick="receiveActionPonit()">'
        html += '<img src="../image/action-point-close.png" class="close"  onclick="closeActionPointMsg()">'
        html += '</div>';
        html += '</div>';
        html += '</div>';


        $('body').append(html);
    } else {

    }
    $("#action-point").show();
}

export default {
    popUps
}