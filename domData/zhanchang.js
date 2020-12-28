// 战场dom数据操作

/**
 * @msg: 弹窗操作
 * @param {*}
 * @return {*}
 */
function popUps() {
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

/**
 * @msg: 战斗目标弹窗
 * @param {*}
 * @return {*}
 */
function showActionMessage() {
    if ($('#action-message').length == 0) {

        var html = '';

        html += '<div class="alert-publicly" id="action-message" style="display: none;">';
        html += '<div class="alert-box flex">';
        html += '<div class="action-message-content" >';
        html += '<img src="../image/war-report-close.png" class="close" onclick="$(\'#action-message\').hide(),$(\'#battle-target\').hide()"></img>'
        html += '<div class="action-message-box1">';
        html += '<p>行动信息</p>'
        html += '<div class="action-message-icon-box">'
        html += '<img src="../image/gongji.png" onclick="zhanchang.selectAction(\'fire\')" style="cursor:pointer;">'
        html += '<img src="../image/fanyu.png" onclick="zhanchang.selectAction(\'defence\')" style="cursor:pointer;">'
        html += '<img src="../image/jiaxue.png" onclick="zhanchang.selectAction(\'heal\')" style="cursor:pointer;">'
        html += '<img src="../image/qianqi.png" onclick="zhanchang.selectAction(\'captureflag\')" style="cursor:pointer;">'
        html += '</div>'
        html += '</div>';
        html += '<div class="action-message-box2">';
        html += '<p>目标势力</p>'
        html += '<div class="action-message-icon-box">'
        html += '<img src="../image/action-message-icon-wei .png" onclick="zhanchang.selectCountry(1)" style="cursor:pointer;">'
        html += '<img src="../image/action-message-icon-shu .png" onclick="zhanchang.selectCountry(2)" style="cursor:pointer;">'
        html += '<img src="../image/action-message-icon-wu .png" onclick="zhanchang.selectCountry(3)" style="cursor:pointer;">'
        html += '</div>'
        html += '</div>';
        html += '<div class="action-message-box3">'
        html += '<p>现在可以使用行动点 : <span id="action-get"></span>，总算力 : <span id="action-totalPower"></span>，您准备使用：</p>'
        html += '<form>'
        html += '<input type="text" placeholder="输入行动点数" id="userUsePoint" oninput="zhanchang.estimatedResultShow()">'
        html += '</form>'
        html += '<p>预估效果：<span id="estimatedResultTag"</span> </p>'
        html += '</div>'
        html += '<img src="../image/action-message-sure-btn.png" class="sure-btn" onclick="zhanchang.userActionOK()">'
        html += '</div>';
        html += '</div>';
        html += '</div>';


        $('body').append(html);
    } else {

    }

}

/**
 * @msg: 战报弹窗
 * @param {*}
 * @return {*}
 */
function showWarReport() {
    if ($('#war-report').length == 0) {

        var html = '';

        html += '<div class="alert-publicly" id="war-report" style="display: none;">';
        html += '<div class="alert-box flex">';
        html += '<div class="war-report-content" >';
        html += '<img src="../image/war-report-close.png" class="close" onclick="$(\'#war-report\').hide()"></img>'
        html += '<div class="top">'
        html += '<p>这里是城市正中心,一个很宽阔的广场 ，中央有颗大榕树 ，据传已经有千年大树龄 ，是这座城市大历史 见证，树干大底部有个很大大树洞 </p>'
        html += '</div>'
        html += '<div class="middle">'
        html += '<ul>'
        html += '<li>安知水:百花秘术 > 阿贝尔.布鲁斯帝恩 ：<span>HP:5463/ </span><span> 3455</span></li>'
        html += '<li>安知水:百花秘术 > 阿贝尔.布鲁斯帝恩 ：<span>HP:5463/ </span><span>3455</span></li>'
        html += '<li>安知水:百花秘术 > 阿贝尔.布鲁斯帝恩 ：<span>HP:5463/ </span><span>3455</span></li>'
        html += '<li>安知水:百花秘术 > 阿贝尔.布鲁斯帝恩 ：<span>HP:5463/ </span><span>3455</span></li>'
        html += '<li>安知水:百花秘术 > 阿贝尔.布鲁斯帝恩 ：<span>HP:5463/ </span><span>3455</span></li>'
        html += '</ul>'
        html += '</div>'
        html += '<div class="btn-group">'
        html += '<img src="../image/war-report-back.png">'
        html += '<img src="../image/war-report-next.png">'
        html += '</div>'
        html += '</div>';
        html += '</div>';
        html += '</div>';


        $('body').append(html);
    } else {

    }
    $("#war-report").show();
}

/**
 * @msg: 战斗目标预估效果
 * @param {*}
 * @return {*}
 */
function estimatedResultShow() {

    var num = $("#userUsePoint").val();
    var html = '';
    if (num > 0) {
        var usePoint = zhanchang.getUserOnKingAct(userActionKing) / 100000000;
        console.log(usePoint, 'usepoint');
        var poingConstant = Math.pow(0.5, Math.floor(usePoint / 5000));

        console.log(poingConstant, 'poingConstant1');
        console.log(userActionType, 66666666);
        console.log(myknightMsg, 7777777);
        console.log(userActionType, 7777777);

        if (userActionType == "fire") {
            var tag = Number(myknightMsg[userActionKing].power * num * poingConstant * 3);
            console.log(myknightMsg[userActionKing].power, 'myknightMsg[userActionKing].power');
            console.log(num, 'num');
            console.log(poingConstant, 'poingConstant');
            if (tag < 0) {
                tag = 0;
            }
            html += '  <span>预计能给 ' + zhanchang.getKingName(userActionsOnKing) + ' 造成 ' + tag + ' 伤害 </span>';
        } else if (userActionType == "defence") {
            var tag = Number(myknightMsg[userActionKing].power * num * poingConstant / 2).toFixed(0);
            html += '  <span>预计能给 ' + zhanchang.getKingName(userActionsOnKing) + ' 加 ' + tag + ' 防御 </span>';
        } else if (userActionType == "heal") {
            var increaseBlood = objMsg[userActionsOnKing - 1].totalHP - objMsg[userActionsOnKing - 1].hp;
            var tag = myknightMsg[userActionKing].power * num * poingConstant;
            if (tag > increaseBlood) {
                tag = increaseBlood;
            }
            html += '  <span>预计能给 ' + zhanchang.getKingName(userActionsOnKing) + ' 加 ' + tag + ' 血量 </span>';
        } else {
            var tag = Number(myknightMsg[userActionKing].power * num * poingConstant * 3);
            if (tag < 0) {
                tag = 0;
            }
            html += '  <span>预计能给 ' + zhanchang.getKingName(userActionsOnKing) + ' 造成 ' + tag + ' 伤害 </span>';
        }

        $("#estimatedResultTag").html(html);
    } else {
        $("#estimatedResultTag").html('');
    }
}

export default {
    popUps,
    showActionMessage,
    showWarReport,
    estimatedResultShow
}