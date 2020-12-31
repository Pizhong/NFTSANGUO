// dom数据层 --->common.js

/**
 * @msg: 消息弹窗
 * @param {*} content 需要显示的信息
 * @return {*} null
 */
function showMsg(content) {
    if ($('#msg').length == 0) {
        var str = '<div id="msg" class="msgCon hide">' +
            '<p class="msg">--</p>' +
            '</div>';
        $('body').append(str);
    }
    $(".msg").html(content);
    $("#msg").removeClass('hide').show();
    setTimeout('$("#msg").fadeOut()', 1500);
}

/**
 * @msg: 用户信息弹窗
 * @param {*}
 * @return {*}
 */
function getUserMsgBox() {
    if ($('#userMsgBox').length == 0) {
        var html = '';
        html += '<div class="alert" id="userMsgBox" style="display: none;">';
        html += '  <div class="flex" style="height: 100%;">';
        html += '    <div class="panel">';
        html += '      <div class="userName">' + getCookie("account") + '</div>';
        html += '      <div class="nav">';
        html += '        <a class="item" href="myAssets.html">我的资产 >></a>';
        html += '      </div>';
        html += '    </div>';
        html += '    <div style="flex:1;height: 100%;" onclick="showUserPanel()"></div>';
        html += '  </div>';
        html += '</div>';

        $('body').append(html);
    }
    $("#userMsgBox").show();
    $("#userMsgBox .panel").addClass("active");
}

/**
 * @msg: 查看钱包
 * @param {*}
 * @return {*}
 */
function getNavPanel() {
    if (!getCookie("account")) {
        $(".loginBtn").html('登录');
    } else {
        $(".loginBtn").html('我的钱包');
    }
    var html = '';
    html += '<div class="alert" id="myAssetsBox" style="display: none;">'
    html += '<div class="flex" style="height:100%;">';
    html += '  <div class="content" style="height: 300px;">';
    html += '    <div class="header flex">';
    html += '      <span>我的钱包 （<span class="userNameShow">' + getCookie("account") + '</span>）</span>';
    html += '      <span style="flex:1;"></span>';
    html += '      <span onclick="$(\'#myAssetsBox\').hide()">';
    html += '        <img src="./imgs/closes.png" alt="" class="closeSvg">';
    html += '      </span>';
    html += '    </div>';
    html += '    <div class="scroll" style="height: 150px;">';
    html += '      <div class="item flex" style="border-bottom:none;" onclick="$(\'#myAssetsBox\').hide()">';
    html += '        <div class="flex">';
    html += '          <img src="imgs/eosio.token-eos.png" alt="" class="coinImg">';
    html += '          <div>';
    html += '            <div class="coin"  id="userToken">--</div>';
    html += '            <!-- <div class="contractTip">UCAT</div> -->';
    html += '          </div>';
    html += '        </div>';
    html += '        <div style="flex:1;"></div>';
    html += '      </div>';
    html += '    </div>';
    html += '    <div style="padding:0 15px;">';
    html += '      <div class="exitBtn" onclick="exit()">退出</div>';
    html += '    </div>';
    html += '  </div>';
    html += '</div>';
    html += '</div>';
    $("body").append(html);
}

/**
 * @msg: 菜单面板弹窗
 * @param {*}
 * @return {*}
 */
function getMenuPanel() {
    if ($('#menuBox').length == 0) {

        var html = '';

        html += '<div class="alert" id="menuBox" onclick="$(\'#menuBox\').hide()" style="display: none;">';
        html += '  <div class="rightBox">';
        html += '    <div class="navList">';

        html += '      <div class="item" onclick="getNodePanel()">节点</div>';
        html += '      <div class="item" onclick="descriptionMsgBoxShow(\'about\')">关于</div>';

        if (getCookie("account")) {
            html += '      <div class="item" onclick="getMyMoneyMsgShow()">我的资产</div>';
            html += '      <div class="item" onclick="exit()">退出</div>';
        }
        html += '    </div>';
        html += '  </div>';
        html += '</div>';


        $('body').append(html);
    } else {

    }
    $("#menuBox").show();

}

/**
 * @msg: 选择合约弹窗
 * @param {*}
 * @return {*}
 */
function getDexContractBox() {
    if ($('#contractBox').length == 0) {
        var html = '';


        html += '<div class="alert" id="contractBox" style="display: none;">';
        html += '  <div class="flex" style="height:100%;">';
        html += '    <div class="content">';
        html += '      <div class="header flex">';
        html += '        <span>选择合约</span>';
        html += '        <span style="flex:1;"></span>';
        html += '        <span onclick="$(\'#contractBox\').hide()">';
        html += '          <img src="imgs/closes.png" alt="" class="closeSvg">';
        html += '        </span>';
        html += '      </div>';

        html += '<div class="iptSearch">';
        html += '  <div class="el-input--suffix flex">';
        html += '    <input type="text" autocomplete="off" placeholder="请输入您的NFT资产合约名" id="userInputContractBox" class="el-input__inner">';
        html += '    <div class="joinUserInputBtn flex" onclick="selectContract(-1,\'\')">';
        html += '      选择';
        html += '    </div>';
        html += '  </div>';
        html += '</div>';


        html += '      <div class="scroll">';

        html += '        <div class="item flex" onclick="selectContract(-1,\'\')">';
        html += '          <div class="flex">';
        // html += '            <img src="imgs/'+ n.nftcontract +'.png" alt="" class="coinImg">';
        html += '            <div style="min-width:128px;">';
        html += '              <div class="coin">全部</div>';
        // html += '              <div class="contractTip">'+ n.protocol +'</div>';
        html += '            </div>';
        // html += '            <div style="flex:1;padding-left:20px;font-size: 20px;">（数量：'+ n.tokencount +'）</div>';
        html += '          </div>';
        html += '          <div style="flex:1;"></div>';
        html += '        </div>';

        $.each(nftcontract, function(i, n) {

            html += '        <div class="item flex" onclick="selectContract(' + i + ',\'' + n.nftcontract + '\')">';
            html += '          <div class="flex">';
            html += '            <img src="imgs/' + n.nftcontract + '.png" alt="" class="coinImg">';
            html += '            <div style="min-width:128px;">';
            html += '              <div class="coin">' + n.nftcontract + '</div>';
            html += '              <div class="contractTip">' + n.protocol + '</div>';
            html += '            </div>';
            // html += '            <div style="flex:1;padding-left:20px;font-size: 20px;">（数量：'+ n.tokencount +'）</div>';
            html += '          </div>';
            html += '          <div style="flex:1;"></div>';
            html += '        </div>';
        })

        html += '        <div class="item flex" onclick="selectContract(2,\'xlootndxbow1\')">';
        html += '          <div class="flex">';
        html += '            <img src="imgs/xlootndxbow1.png" alt="" class="coinImg">';
        html += '            <div style="min-width:128px;">';
        html += '              <div class="coin">xlootndxbow1</div>';
        html += '              <div class="contractTip">UCAT</div>';
        html += '            </div>';
        html += '          </div>';
        html += '          <div style="flex:1;"></div>';
        html += '        </div>';



        html += '      </div>';

        html += '    </div>';
        html += '  </div>';
        html += '</div>';

        html += '<div class="alert" id="userMsgBox" style="display: none;">';
        html += '  <div class="flex" style="height: 100%;">';
        html += '    <div class="panel">';
        html += '      <div class="userName">' + getCookie("account") + '</div>';
        html += '      <div class="nav">';
        html += '        <a class="item" href="myAssets.html">我的资产 >></a>';
        html += '      </div>';
        html += '    </div>';
        html += '    <div style="flex:1;height: 100%;" onclick="showUserPanel()"></div>';
        html += '  </div>';
        html += '</div>';

        $('body').append(html);
    }
    $("#contractBox").show();
}

/**
 * @msg: 选择节点弹窗
 * @param {*}
 * @return {*}
 */
function getNodePanel() {
    if ($('#nodePanel').length == 0) {
        var html = '';


        html += '<div class="alert" id="nodePanel" style="">';
        html += '  <div class="flex" style="height:100%;">';
        html += '    <div class="content" style="padding-bottom:20px">';
        html += '      <div class="header flex">';
        html += '        <span style="flex:1;"></span>';
        html += '        <span style="flex:1.3">选择节点</span>';
        // html += '        <span style="flex:1;"></span>';
        html += '        <span onclick="$(\'#nodePanel\').hide()"><img src="./imgs/closes1.png" alt="" class="closeSvg"></span>';
        html += '      </div>';
        html += '      <div class="nodeSet">';


        $.each(API_ENDPOINTS2, function(i, n) {
            var active = '';
            var index = getCookie("nodeIndex") || nodeIndex;
            console.log(i, i == 0, i == "0")
            if (i == index) {
                active = 'act';
            }

            html += '        <div class="nodeList" onclick="selectionNode(' + i + ')">';
            html += '          <div class="icon ' + active + '">';
            html += '            <span>节点' + (i + 1) + '：</span>';
            html += '            <span>https://' + n + '</span>';
            html += '          </div>';
            html += '        </div>';


        })


        html += '        <div class="flex" style="margin-top:348px;"><div class="actionBtn" onclick="setNode()">确定</div></div>';
        html += '      </div>';
        html += '    </div>';
        html += '  </div>';
        html += '</div>';





        $('body').append(html);
    } else {

    }
    $("#nodePanel").show();

}

/**
 * @msg: 加载中
 * @param {*} content 显示内容
 * @return {*}
 */
function showLoadingMsg(content) {
    if ($('#loadingBox').length == 0) {
        var html = '';
        html += '<div id="loadingBox" style="position: fixed;top: 0;width: 100%;height: 100%;background: rgba(0,0,0,0.5);z-index:9999">';
        html += '  <div class="flex" style="width: 100%;height: 100%;">';
        html += '    <div style="padding:30px;background: rgba(0,0,0,0.7);color:#fff;text-align: center;border-radius: 10px;">';
        html += '      <img src="imgs/loading.gif" alt=""><br>';
        html += '      <div class="loadingMsg"></div>';
        html += '    </div>';
        html += '  </div>';
        html += '</div>';
        $("body").append(html)
    }
    if (content == '') {
        $(".loadingMsg").html('').css("margin-top", "0");
    } else {
        $(".loadingMsg").html(content).css("margin-top", "10px");
    }

    $("#loadingBox").show();
    // setTimeout('$("#loadingBox").fadeOut()', 1500);
}

/**
 * @msg: 昭告弹窗
 * @param {*}
 * @return {*}
 */
function getShowPublicly() {
    if ($('#publiclyBox').length == 0) {

        var html = '';

        html += '<div class="alert-publicly" id="publiclyBox" style="display: none;">';
        html += '<div class="alert-box flex">';
        html += '<div class="content">';
        html += '<p>群豪<span class="myName"></span>,您要昭告天下吗？（每次1EOS）</p>'
        html += '<form>'
        html += '<input type="text" placeholder="输入昭告内容，限制128字" maxlength="128" id="publicly-content"></input>'
        html += '</form>'
        html += '<p style="margin:5px 0;visibility:hidden;" id="time-countdown">公告板将于<span>59</span>秒后完成冷却</p>'
        html += '<div class="alert-box-button">'
        html += '<img src="./imgs/button-sure.png" onclick="uploadPubliclyContent()" id="publicly-sure">'
        html += '<img src="./imgs/button-cancle.png" onclick="$(\'#publiclyBox\').hide()">'
        html += '</div>'
        html += '</div>';
        html += '</div>';
        html += '</div>';


        $('body').append(html);
    } else {

    }
    // $("#publiclyBox").show();

}
$(document).ready(getShowPublicly())

/**
 * @msg: 获取账户余额
 * @param {*} 账户余额
 * @return {*}
 */
function getBalance(balance) {
    var html = '';
    if (balance) {
        html += '<div class="box2-midd">' + balance + '</div>'
    } else {
        html += '<div class="box2-midd">--</div>'
    }
    $('.box2').append(html)
}

export default {
    showMsg,
    getUserMsgBox,
    getNavPanel,
    getMenuPanel,
    getDexContractBox,
    getNodePanel,
    showLoadingMsg,
    getShowPublicly,
    getBalance
}