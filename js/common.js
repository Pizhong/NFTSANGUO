import DomDataCommon from "../domData/common.js";
import CommonApi from '../requestApi/common.js';

window.loot = {};
window.nodeIndex = 0;
window.nftcontract = [];
window.myMoneyLockWeek = '';
window.myMoneyLockWeekTimer = '';
// xlootshovel1 NFT合约
// looreception 前置接收合约
// xlootnftdex1 NFTDEX合约

ScatterJS.plugins(new ScatterEOS());

window.chainId;
var nftContractName, dexContractName, saleContractName, blindBoxContractName;


function getRandomApi() {
    console.log(window.API_ENDPOINTS, 999999999);
    const index = Math.floor(Math.random() * window.API_ENDPOINTS.length);
    return window.API_ENDPOINTS[index];
}



window.chainId = 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906';
// nftContractName = 'xlootshovel1';
window.nftContractName = 'xlootshovel1';
window.saleContractName = 'looreception';
window.dexContractName = 'xlootnftdex1';
window.blindBoxContractName = 'xpetshovelco';


window.isDev = true;


$(function() {
    // getNavPanel();
    connectEOS();
    if (getCookie("account")) {

        $(".myName").html(getCookie("account"));
    }
    // eosLogin();
})

function connectEOS() {
    if (window.ScatterJS) {
        ScatterJS.connect(window.dexContractName, {
            network
        }).then(connected => {
            console.log("connected", connected)
            if (!connected) return false;
            // ScatterJS.someMethod();
        });
        loot.scatter = window.ScatterJS.scatter;
        window.ScatterJS = null;
        setTimeout(function() {
            eosLogin();
        }, 1000)

    }

}



function getDateRandom() {
    var n = 10000,
        m = 99999
    return Date.now() + parseInt(Math.random() * (n - m + 1) + m);
}




function selectionNode(num) {
    $(".nodeList .icon").removeClass('act');
    $(".nodeList .icon").eq(num).addClass('act');
    nodeIndex = num;
}

function setNode() {
    setCookie('nodeIndex', nodeIndex);

    $('.nodeDialog').hide();
    window.location.reload();
}

function currencyBalance(eosName) {
    console.log(eosName, 'eosName');
    const eos = loot.scatter.eos(network, Eos);
    eos.getCurrencyBalance({
            account: eosName,
            code: 'eosio.token',
            symbol: 'EOS'
        })
        .then(result => {
            console.log(result, 'res')
            getBalance(result)
        })
        .catch(error => console.error(error));
}






function getScatter() {
    if (window.scatter) {
        loot.scatter = window.scatter;
    }
    return loot.scatter;
}

function checkScatter(fun) {
    var scatter = getScatter();
    if (scatter) {
        if (scatter.identity) {
            // console.log(scatter.identity);
            const user = loot.scatter.identity.accounts.find(account => account.blockchain === 'eos');
            if (user.publicKey) {
                loot.publicKey = user.publicKey
            }
            loot.bomber = user.name;
            // fun(user.name);
            fun(user);
            // console.log("userMsg:",user);
        } else {
            const requiredFields = {
                accounts: [network]
            };
            if (scatter.getIdentity) {
                scatter.getIdentity(requiredFields).then(identity => {
                    var user = '';
                    if (getCookie("customerType") == 'BOS' || getCookie("blockchain") == 'BOS') {
                        user = identity.accounts.find(account => account.blockchain === 'bos');
                    } else {
                        user = identity.accounts.find(account => account.blockchain === 'eos');
                    }
                    if (user.publicKey) {
                        loot.publicKey = user.publicKey
                    }
                    if (isMYKEY()) {
                        loot.publicKey = identity.publicKey;
                    }
                    loot.bomber = user.name;
                    // fun(user.name);
                    fun(user);
                    // console.log("userMsg2:",user);
                }).catch(error => {
                    eosErrorShow(error);
                });
            } else {
                showMsg("请打开钱包");
            }
        }
    } else {
        noScatterShow();
    }
}


function isMYKEY() {
    return navigator.userAgent.indexOf("MYKEY") > -1;
}

function noScatterShow() {
    alert("没有")
}

function pubKeySign(eosName) {
    if (loot.publicKey) {
        eosSign(eosName);
    } else {
        const scatter = getScatter();
        const eos = loot.scatter.eos(network, Eos);
        eos.getAccount(eosName).then(data => {
            const pubKey = data.permissions[0].required_auth.keys[0].key;
            loot.publicKey = pubKey;
            eosSign(eosName);
        });
    }

}

function eosSign(eosName) {

    console.log(eosName);
    if (!isNaN(eosName)) {
        showMsg("请选择不是全数字的eos账号登录游戏")
        return
    }
    if (getCookie("account") == '') {
        setCookie("account", eosName);
        window.location.reload();
    } else {
        setCookie("account", eosName);
        $(".myName").html(eosName);
        currencyBalance(eosName)
        getUserTime(eosName)
    }

}



function exit() {
    setCookie("account", '');
    loot.scatter.forgetIdentity();
    window.location.reload();
}

function setLanguage(lan) {
    setCookie('lan', lan);
    window.location.href = window.location.href;
}

function eosErrorShow(error) {
    if (error) {
        if (error.isError) {
            if (error.code == 423) {
                showMsg(error.message);
            } else {
                alert(error.message);
            }
        } else {
            var obj = JSON.stringify(error);
            if (obj.indexOf("{")) {
                obj = JSON.parse(error);
                if (obj.code) {
                    if (obj.code == 500 && obj.error.code == 3050003) {
                        alert(obj.error.details[0].message);
                        // alert(error);
                    } else {
                        showMsg(obj.error.details[0].message);
                        // showMsg(error);
                    }
                } else {
                    showMsg(error);
                }
            } else {
                showMsg(obj);
            }
            console.log("error:", error);
        }
    }
}


//对Date的扩展，将 Date 转化为指定格式的String
//月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
//年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
//例子：
//(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
//(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function(fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}



//写入cookie函数
function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
//获取cookie
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}
//清除cookie
function delCookie(name) {
    setCookie(name, "", -1);
}
//获取URL的参数
function getURLPara(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

/**
 * @msg: 判断用户端设备
 * @param {*}
 * @return {*}
 */
function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"
    ];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}





// getUTC();
function getUTC(utcStart, tag) {
    // var utcStart = "2020-10-05T17:20:16";
    // var oldtime = String(new Date(utcStart).getTime() + 7*24*60*60*1000);
    var oldtime = String(new Date(utcStart).getTime());
    var uy = String(new Date().getUTCFullYear());
    var um = String(new Date().getUTCMonth() + 1);
    var ud = String(new Date().getUTCDate());
    var uh = String(new Date().getUTCHours());
    var umin = String(new Date().getUTCMinutes());
    var us = String(new Date().getUTCSeconds());
    if (um.length == 1) {
        um = '0' + um;
    }
    if (ud.length == 1) {
        ud = '0' + ud;
    }
    if (uh.length == 1) {
        uh = '0' + uh;
    }
    if (umin.length == 1) {
        umin = '0' + umin;
    }
    if (us.length == 1) {
        us = '0' + us;
    }
    var utcNow = String(uy + "-" + um + "-" + ud + "T" + uh + ":" + umin + ":" + us);

    var newtime = new Date(utcNow).getTime();

    // return
    // var newtime = new Date();
    // var time = (oldtime % 604800 - newtime) / 1000;
    // var time = 604800 - (((newtime - oldtime) % 604800) / 1000);

    if (newtime - oldtime < 0) {
        getUTC2(utcStart, tag)
        console.log("未开始", newtime - oldtime)
        return
    }
    var time = 604800 - (((newtime - oldtime) / 1000) % 604800);

    // console.log("time",time,(newtime - oldtime)/1000);
    if (time < 0) {
        console.log("未开始", time)
        return
    }
    clearTimeout(midTimer[tag]);
    midTimer[tag] = setTimeout(function() {
        getUTC(utcStart, tag)
    }, 1000)
    var d = parseInt(time / (60 * 60 * 24));
    // var h = parseInt(time / 60 / 60 % 24);
    var h = parseInt(time / 60 / 60);
    var m = String(parseInt(time / 60 % 60));
    var s = String(parseInt(time % 60));
    if (m.length == 1) {
        m = '0' + m;
    }
    if (s.length == 1) {
        s = '0' + s;
    }
    // console.log(d + "天" + h + "小时" + m + "分钟" + s + "秒")
    $(tag).html(h + ":" + m + ":" + s + " 后减半")
        // return d + "天" + h + "小时" + m + "分钟" + s + "秒";
}


function getTokenImgs(id) {
    switch (String(id)) {
        case "TIME":
            return "time.png";
            break;
        case "time":
            return "lootglobcore-loot.png";
            break;
        case "39":
            return "minedfstoken-dfs.png";
            break;
        case "329":
            return "yfctokenmain-yfc.png";
            break;
        case "444":
        case "1":
        case "LOOT":
            return "lootglobcore-loot.png";
            break;
        case "nft":
            return "nft.png";
            break;
        case "3":
        case "YFC":
            return "yfctokenmain-yfc.png";
            break;
        case "4":
        case "DFS":
            return "minedfstoken-dfs.png";
            break;
    }
}


function getUserUTC(startTime) {
    // var utcStart = "2020-10-05T17:20:16";
    var oldtime = new Date(startTime).getTime();
    var uy = String(new Date().getUTCFullYear());
    var um = String(new Date().getUTCMonth() + 1);
    var ud = String(new Date().getUTCDate());
    var uh = String(new Date().getUTCHours());
    var umin = String(new Date().getUTCMinutes());
    var us = String(new Date().getUTCSeconds());
    if (um.length == 1) {
        um = '0' + um;
    }
    if (ud.length == 1) {
        ud = '0' + ud;
    }
    if (uh.length == 1) {
        uh = '0' + uh;
    }
    if (umin.length == 1) {
        umin = '0' + umin;
    }
    if (us.length == 1) {
        us = '0' + us;
    }
    var utcNow = String(uy + "-" + um + "-" + ud + "T" + uh + ":" + umin + ":" + us);

    var newtime = new Date(utcNow).getTime();
    var time = (newtime - oldtime) / 1000;

    if (time < 0) {
        console.log("未开始")
        return
    }
    // console.log(time)
    return time;
}

function getUTCTime(time) {
    var oldtime = new Date(time).getTime();
    var uy = String(new Date().getUTCFullYear());
    var um = String(new Date().getUTCMonth() + 1);
    var ud = String(new Date().getUTCDate());
    var uh = String(new Date().getUTCHours());
    var umin = String(new Date().getUTCMinutes());
    var us = String(new Date().getUTCSeconds());
    if (um.length == 1) {
        um = '0' + um;
    }
    if (ud.length == 1) {
        ud = '0' + ud;
    }
    if (uh.length == 1) {
        uh = '0' + uh;
    }
    if (umin.length == 1) {
        umin = '0' + umin;
    }
    if (us.length == 1) {
        us = '0' + us;
    }
    var utcNow = String(uy + "-" + um + "-" + ud + "T" + uh + ":" + umin + ":" + us);

    var newtime = new Date(utcNow).getTime();
    var time = (newtime - oldtime) / 1000;

    return time;
}



function getMyMoneyMsgShow() {
    myMoneyLockWeek = '';
    clearInterval(myMoneyLockWeekTimer);
    myMoneyLockWeekTimer = setInterval(function() {
        getUserBanklocker();
    }, 3000)
    descriptionMsgBoxShow('myMoney');
    getUserBanklocker();
}


function getUserBanklocker() {
    var api = getRandomApi();
    var selfData = {
        json: true,
        code: kingContractName,
        scope: kingContractName,
        table: 'banklocker',
        index_position: 1,
        key_type: "i64",
        lower_bound: getCookie("account"),
        limit: 1,
        reverse: false,
        show_payer: false,
    }
    getLinkData(api, selfData, function(data) {
        for (x in data["rows"]) {
            var obj = data["rows"][x];
            console.log('obj:', obj);



            if (obj.acc == getCookie("account")) {
                $("#myMoneyLockTime").html(obj.totallock);
                $("#myMoneyWithTime").html(obj.totalout);
                $("#myMoneyEos").html(obj.totaleos);
                $("#myMoneyLockTimes").html(obj.locktime);
                $("#myMoneyLastWithTimes").html(obj.lastdriptime);

                //每一秒释放 = 总金额 / 总秒数
                //上次提现时间
                var times = 0;

                if (getUTCTime(obj.locktime) > obj.period) {
                    times = obj.period - (getUTCTime(obj.locktime) - getUserUTC(obj.lastdriptime))
                } else {
                    times = getUserUTC(obj.lastdriptime);
                }

                var userWithMoney = Number((parseFloat(obj.totallock) / obj.period) * times).toFixed(8);
                if (typeof myMoneyLockWeek != 'object') {
                    myMoneyLockWeek = new CountUp("myMoneyLockWeek", 0, 0.00000000, 8, 3, options);
                }
                if (!isNaN(userWithMoney)) {
                    myMoneyLockWeek.update(userWithMoney);
                }

                console.log("sjjkjk:", times, userWithMoney, obj.totallock, obj.period)
                    // $("#myMoneyLockWeek").html(userWithMoney);myMoneyLockWeek

            }


        }
    })
}

function withMylockMoney() {

    var fromUser = getCookie("account");

    checkScatter(function(user) {
        var authorization;
        const eos = loot.scatter.eos(network, Eos);
        const account = user.name;
        authorization = [{
            actor: account,
            permission: user.authority
        }]

        var actions = [{
            account: kingContractName,
            name: 'withlock',
            authorization: authorization,
            data: {
                acc: fromUser
            }
        }];


        eos.transaction({
            actions: actions
        }).then(res => {
            showMsg("提现成功！");
            $('#descriptionMsgBox').hide();

            // $('#stacknftBox').hide();
        }).catch(e => {

            eosErrorShow(e);
        });
    })
}




function selectContract(num, contractData) {
    // if(num == 0){
    //   // nftContractName = "xlootshovel1";
    //   setCookie("nftcontract",'xlootshovel1');
    //   $.each(nftcontract,function(i,n){
    //     if("xlootshovel1" == n.nftcontract){
    //       setCookie("scope",n.mid);
    //     }
    //   })

    // }else if(num == 1){
    //   setCookie("nftcontract",'xpetartnftcc');
    //   $.each(nftcontract,function(i,n){
    //     if("xpetartnftcc" == n.nftcontract){
    //       setCookie("scope",n.mid);
    //     }
    //   })
    //   // nftContractName = "xpetartnftcc";
    // }else if(num == 2){
    //   setCookie("nftcontract",'xpetartnftcc');
    //   $.each(nftcontract,function(i,n){
    //     if("xpetartnftcc" == n.nftcontract){
    //       setCookie("scope",n.mid);
    //     }
    //   })
    //   // nftContractName = "xpetartnftcc";
    // }else if(num == -1){
    //   setCookie("scope",'');
    //   setCookie("nftcontract",'');

    // }else{
    //   if($("#userInputContractBox").val() == ''){
    //     showMsg("请输入您的NFT资产合约名");
    //     return
    //   }
    //   setCookie("nftcontract",$("#userInputContractBox").val())

    // }

    if (num >= 0) {
        setCookie("nftcontract", contractData);
        setCookie("scope", '');
        $.each(nftcontract, function(i, n) {
            if (contractData == n.nftcontract) {
                setCookie("scope", n.mid);
            }
        })
    } else if (num == -1) {
        setCookie("scope", '');
        setCookie("nftcontract", '');
    } else {
        if ($("#userInputContractBox").val() == '') {
            showMsg("请输入您的NFT资产合约名");
            return
        }
        setCookie("nftcontract", $("#userInputContractBox").val());
    }


    $('#contractBox').hide();
    window.location.reload();
}

function goBack() {
    history.go(-1);
}




function getUniteSalePriceShow(tag) {
    return parseFloat(tag).toFixed(4) + ' ' + String(tag).split(' ')[1];
}


//编辑昭告内容
function uploadPubliclyContent() {
    var publiclyContent = $("#publicly-content").val()
    console.log(publiclyContent);
    transferAccounts(publiclyContent)
}

window.uploadPubliclyContent = uploadPubliclyContent;
window.getUniteSalePriceShow = getUniteSalePriceShow;
window.goBack = goBack;
window.selectContract = selectContract;
window.withMylockMoney = withMylockMoney;
window.getUserBanklocker = getUserBanklocker;
window.getMyMoneyMsgShow = getMyMoneyMsgShow;
window.getUTCTime = getUTCTime;
window.getTokenImgs = getTokenImgs;
window.getUserUTC = getUserUTC;
window.getUTC = getUTC;
window.IsPC = IsPC;
window.getURLPara = getURLPara;
window.delCookie = delCookie;
window.getCookie = getCookie;
window.setCookie = setCookie;
window.eosErrorShow = eosErrorShow;
window.setLanguage = setLanguage;
window.exit = exit;
window.eosSign = eosSign;
window.pubKeySign = pubKeySign;
window.noScatterShow = noScatterShow;
window.isMYKEY = isMYKEY;
window.checkScatter = checkScatter;
window.getScatter = getScatter;
window.currencyBalance = currencyBalance;
window.setNode = setNode;
window.selectionNode = selectionNode;
window.getDateRandom = getDateRandom;
window.connectEOS = connectEOS;
window.getRandomApi = getRandomApi;
// 请求
window.getUserToken = CommonApi.getUserToken;
window.getContractsList = CommonApi.getContractsList;
window.getLinkData = CommonApi.getLinkData;

// dom
window.showMsg = DomDataCommon.showMsg;
window.getUserMsgBox = DomDataCommon.getUserMsgBox;
window.getNavPanel = DomDataCommon.getNavPanel;
window.getMenuPanel = DomDataCommon.getMenuPanel;
window.getDexContractBox = DomDataCommon.getDexContractBox;
window.getNodePanel = DomDataCommon.getNodePanel;
window.showLoadingMsg = DomDataCommon.showLoadingMsg;
window.getShowPublicly = DomDataCommon.getShowPublicly;
window.getBalance = DomDataCommon.getBalance;