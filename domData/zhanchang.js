// dom数据操作 ---> zhanchan.js



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
        html += '<img src="../imgs/action-point-button.png" style="cursor: pointer;" onclick="receiveActionPonit()">'
        html += '<img src="../imgs/action-point-close.png" class="close"  onclick="closeActionPointMsg()">'
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
        html += '<img src="../imgs/war-report-close.png" class="close" onclick="$(\'#action-message, #battle-target\').hide()"></img>'
        html += '<div class="action-message-box1">';
        html += '<p>行动信息</p>'
        html += '<div class="action-message-icon-box">'
        html += '<img src="../imgs/gongji.png" onclick="zhanchang.selectAction(\'fire\')" style="cursor:pointer;">'
        html += '<img src="../imgs/fanyu.png" onclick="zhanchang.selectAction(\'defence\')" style="cursor:pointer;">'
        html += '<img src="../imgs/jiaxue.png" onclick="zhanchang.selectAction(\'heal\')" style="cursor:pointer;">'
        html += '<img src="../imgs/qianqi.png" onclick="zhanchang.selectAction(\'captureflag\')" style="cursor:pointer;">'
        html += '</div>'
        html += '</div>';
        html += '<div class="action-message-box2">';
        html += '<p>目标势力</p>'
        html += '<div class="action-message-icon-box">'
        html += '<img src="../imgs/action-message-icon-wei .png" onclick="zhanchang.selectCountry(1)" style="cursor:pointer;">'
        html += '<img src="../imgs/action-message-icon-shu .png" onclick="zhanchang.selectCountry(2)" style="cursor:pointer;">'
        html += '<img src="../imgs/action-message-icon-wu .png" onclick="zhanchang.selectCountry(3)" style="cursor:pointer;">'
        html += '</div>'
        html += '</div>';
        html += '<div class="action-message-box3">'
        html += '<p>现在可以使用行动点 : <span id="action-get"></span>，总算力 : <span id="action-totalPower"></span>，您准备使用：</p>'
        html += '<form>'
        html += '<input type="text" placeholder="输入行动点数" id="userUsePoint" oninput="zhanchang.estimatedResultShow()">'
        html += '</form>'
        html += '<p>预估效果：<span id="estimatedResultTag"</span> </p>'
        html += '</div>'
        html += '<img src="../imgs/action-message-sure-btn.png" class="sure-btn" onclick="zhanchang.userActionOK()">'
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
        html += '<img src="../imgs/war-report-close.png" class="close" onclick="$(\'#war-report\').hide()"></img>'
            // html += '<div class="top">'
            // html += '<p>这里是城市正中心,一个很宽阔的广场 ，中央有颗大榕树 ，据传已经有千年大树龄 ，是这座城市大历史 见证，树干大底部有个很大大树洞 </p>'
            // html += '</div>'
        html += '<div class="middle">'
        html += '<ul id="battlelog-list">'
            // html += '<li>安知水:百花秘术 > 阿贝尔.布鲁斯帝恩 ：<span>HP:5463/ </span><span> 3455</span></li>'
            // html += '<li>安知水:百花秘术 > 阿贝尔.布鲁斯帝恩 ：<span>HP:5463/ </span><span>3455</span></li>'
            // html += '<li>安知水:百花秘术 > 阿贝尔.布鲁斯帝恩 ：<span>HP:5463/ </span><span>3455</span></li>'
            // html += '<li>安知水:百花秘术 > 阿贝尔.布鲁斯帝恩 ：<span>HP:5463/ </span><span>3455</span></li>'
            // html += '<li>安知水:百花秘术 > 阿贝尔.布鲁斯帝恩 ：<span>HP:5463/ </span><span>3455</span></li>'
        html += '</ul>'
        html += '</div>'
        html += '<div class="btn-group">'
        html += '<img src="../imgs/war-report-back.png">'
        html += '<img src="../imgs/war-report-next.png">'
        html += '</div>'
        html += '</div>';
        html += '</div>';
        html += '</div>';


        $('body').append(html);
    } else {

    }
    // $("#war-report").show();
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
        var usePoint = zhanchang.getUserOnKingAct(zhanchang.userActionKing) / 100000000;
        console.log(zhanchang.userActionType, 'usepoint');
        var poingConstant = Math.pow(0.5, Math.floor(usePoint / 5000));
        // console.log(zhanchang.myknightMsg, zhanchang.userActionKing, "999999999");
        if (!zhanchang.myknightMsg[zhanchang.userActionKing]) return
        if (zhanchang.userActionType == "fire") {
            var tag = Number(zhanchang.myknightMsg[zhanchang.userActionKing].power * num * poingConstant * 3);
            // console.log(zhanchang.myknightMsg[userActionKing].power, 'myknightMsg[userActionKing].power');
            // console.log(num, 'num');
            // console.log(poingConstant, 'poingConstant');
            if ($("#box" + zhanchang.userActionKing + "-flag").length === 1) {
              tag /= 10;
          }
            if (tag < 0) {
                tag = 0;
            }
            html += '  <span>预计能给 ' + zhanchang.getKingName(zhanchang.userActionsOnKing) + ' 造成 ' + tag + ' 伤害 </span>';
        } else if (zhanchang.userActionType == "defence") {
            var tag = Number(zhanchang.myknightMsg[zhanchang.userActionKing].power * num * poingConstant / 2).toFixed(0);
            html += '  <span>预计能给 ' + zhanchang.getKingName(zhanchang.userActionsOnKing) + ' 加 ' + tag + ' 防御 </span>';
        } else if (zhanchang.userActionType == "heal") {
            var increaseBlood = zhanchang.objMsg[zhanchang.userActionsOnKing - 1].totalHP - zhanchang.objMsg[zhanchang.userActionsOnKing - 1].hp;
            var tag = zhanchang.myknightMsg[zhanchang.userActionKing].power * num * poingConstant;
            if (tag > increaseBlood) {
                tag = increaseBlood;
            }
            html += '  <span>预计能给 ' + zhanchang.getKingName(zhanchang.userActionsOnKing) + ' 加 ' + tag + ' 血量 </span>';
        } else {
            var tag = Number(zhanchang.myknightMsg[zhanchang.userActionKing].power * num * poingConstant * 3);
            if ($("#box" + zhanchang.userActionKing + "-flag").length === 1) {
              tag /= 10;
            }
            if (tag < 0) {
                tag = 0;
            }
            html += '  <span>预计能给 ' + zhanchang.getKingName(zhanchang.userActionsOnKing) + ' 造成 ' + tag + ' 伤害 </span>';
        }

        $("#estimatedResultTag").html(html);
    } else {
        $("#estimatedResultTag").html('');
    }
}

/**
 * @description:获取battlelog表的数据
 * @param {*}
 * @return {*}
 */

async function getBattleLog() {
    var lower = Number(getCookie("battlelog")) || '';
    var api = getRandomApi();
    var selfData = {
        json: true,
        code: kingContractName,
        scope: kingContractName,
        table: 'battlelog',
        index_position: 1,
        key_type: "i64",
        lower_bound: lower,
        // upwer_bound:lower,
        limit: 1,
        reverse: true,
        show_payer: false,
    }
    var api = getRandomApi();
    await getLinkData(api, selfData, function(data) {
        // console.log('battlelogData', data);
        var obj = data.rows;
        $.each(obj, function(i, n) {
            var memo = '';
            if (n.act == "FIRE") {
                memo = window.zhanchang.getKingName(n.fromkingdom) + n.from + '消耗' + Math.floor(Number(n.point / Math.pow(10, 8))) + '行动点进攻' + window.zhanchang.getKingName(n.tokingdom) + '，造成' + n.value + '伤害';
            } else if (n.act == "DEFENCE") {
                memo = window.zhanchang.getKingName(n.fromkingdom) + n.from + '消耗' + Math.floor(Number(n.point / Math.pow(10, 8))) + '行动点增加' + window.zhanchang.getKingName(n.tokingdom) + n.value + '点防御';
            } else if (n.act == "HEAL") {
                memo = window.zhanchang.getKingName(n.fromkingdom) + n.from + '消耗' + Math.floor(Number(n.point / Math.pow(10, 8))) + '行动点回复' + window.zhanchang.getKingName(n.tokingdom) + n.value + '点血量';
            } else if (n.act == "ROB") {
                memo = window.zhanchang.getKingName(n.tokingdom) + '被' + window.zhanchang.getKingName(n.fromkingdom) + n.from + '打爆，金库被掠夺一空，损失' + Number(n.value / 10000).toFixed(4) + ' eos';
            }
            battlelogShow(memo, n.id);

            // console.log('memo:', memo);
        })

        // console.log("战斗记录:", data);
    });
}

/**
 * @description: 弹窗展示battlelog中的数据
 * @param {*}
 * @return {*}
 */
function battlelogShow(msg, id) {
    var log = Number(getCookie("battlelog2")) || 0;
    var logArray = zhanchang.logArray;
    if ($("#battlelog_" + id).length == 0) {
        var html = '';
        var html2 = ''
        if (id != log) {
            html += '<div id="battlelog_' + id + '" class="msgCon2" style="/* display: none; */">';
            html += '  <p class="msg">' + msg + '</p>';
            html += '</div>';
            $("body").append(html);
            $("#battlelog_" + id).animate({
                top: '10%',
                opacity: '0.52',
            }, 6800, function() {
                $("#battlelog_" + id).fadeOut().remove();
            });

            if (logArray.length > 20) {
                logArray.pop()
            } else {
                logArray.unshift(msg)
            }
            for (let i = 0; i < logArray.length; i++) {
                html2 = '<li>' + logArray[i] + '</li>' + html2;
            }
            $("#battlelog-list").html(html2);
            // setCookie("battlelog",log+1);
            setCookie("battlelog2", id);
            setCookie("battlelog", '');
        }

    }
}

/**
 * @description:盟约
 * @param {*}
 * @return {*}
 */
function showCovenant() {
    if ($('#covenant').length == 0) {
        var html = '';

        html += '<div class="alert-covenant" id="covenant" style="display:none;">';
        html += '<div class="alert-box flex">'
        html += '<div class="covenant-content">'
            // 标题
        html += '<div class="title">'
        html += '<span class="title-text">盟约</span>'
        html += '<img src="../imgs/closes1.png" class="close" onclick="$(\'#covenant\').hide()">'
        html += '</div>'
        html += '<div class="main flex" style="flex-wrap:wrap;">'
            //板块--魏
        html += '<div class="main-wei">'
        html += '<img src="../imgs/weiBG.png">'
        html += '<div class="wu">'
        html += '<span>吴</span>'
        html += '<img src="../imgs/progress-51.png" style="width:210px;margin:10px 10px 0 8px;">'
        html += '<span style="margin-right:21px;">51%</span>'
        html += '<img src="../imgs/voteBtn.png">'
        html += '</div>'
        html += '<div class="shu">'
        html += '<span>蜀</span>'
        html += '<img src="../imgs/progress-78.png" style="width:210px;margin:10px 10px 0 8px;">'
        html += '<span style="margin-right:21px;">78%</span>'
        html += '<img src="../imgs/voteBtn.png">'
        html += '</div>'
        html += '</div>'
            //板块--蜀
        html += '<div class="main-wei">'
        html += '<img src="../imgs/shuBG.png">'
        html += '<div class="wu">'
        html += '<span>魏</span>'
        html += '<img src="../imgs/progress-61.png" style="width:210px;margin:10px 10px 0 8px;">'
        html += '<span style="margin-right:21px;">61%</span>'
        html += '<img src="../imgs/voteBtn.png">'
        html += '</div>'
        html += '<div class="shu">'
        html += '<span>吴</span>'
        html += '<img src="../imgs/progress-78.png" style="width:210px;margin:10px 10px 0 8px;">'
        html += '<span style="margin-right:21px;">48%</span>'
        html += '<img src="../imgs/voteBtn.png">'
        html += '</div>'
        html += '</div>'
            //板块--吴
        html += '<div class="main-wei">'
        html += '<img src="../imgs/wuBG.png">'
        html += '<div class="wu">'
        html += '<span>蜀</span>'
        html += '<img src="../imgs/shuprogress-61.png" style="width:210px;margin:10px 10px 0 8px;">'
        html += '<span style="margin-right:21px;">61%</span>'
        html += '<img src="../imgs/voteBtn.png">'
        html += '</div>'
        html += '<div class="shu">'
        html += '<span>吴</span>'
        html += '<img src="../imgs/weiprogress-48.png" style="width:210px;margin:10px 10px 0 8px;">'
        html += '<span style="margin-right:21px;">48%</span>'
        html += '<img src="../imgs/voteBtn.png">'
        html += '</div>'
        html += '</div>'
        html += '</div>'
        html += '</div>'
        html += '</div>'
        html += '</div>'
        $('body').append(html);

    } else {

    }
}


/**
 * @description:军旗血条展示 
 * @param {*}
 * @return {*}
 */
function showFlagBlod(flagBlod,flagTime,id1,id2,HP,Ass){
  flagBlod=new CountUp(id1,0,0,0,3,options)
  flagBlod.update(HP)
  flagTime=new CountUp(id2,0,0,0,3,{
    useEasing: true,
    useGrouping: false,
    separator: ',',
    decimal: '.',
    prefix: '',
    suffix: ' ' + String(Ass).split(' ')[1]
})
  flagTime.update(parseFloat(Ass))
}




$(document).ready(showCovenant())
export default {
    popUps,
    showActionMessage,
    showWarReport,
    estimatedResultShow,
    getBattleLog,
    showFlagBlod
}