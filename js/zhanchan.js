import domData from "../domData/zhanchang.js";
import zhanchangApi from "../requestApi/zhanchangApi.js";


var actionPoint = ''; //行动点
var sanguoMsg = { //三国基本信息
    'sanguo_01': {
        'id': 1,
        'hp': '',
        'def': '',
        'burse': '',
        'burse2': '',
        'supplyACT': '',
        'totalACT': '',
        'totalHP': '',
        'brokencount': '',
        'totalpower': '',
        'period': ''
    },
    'sanguo_02': {
        'id': 2,
        'hp': '',
        'def': '',
        'burse': '',
        'burse2': '',
        'supplyACT': '',
        'totalACT': '',
        'totalHP': '',
        'brokencount': '',
        'totalpower': '',
        'period': ''
    },
    'sanguo_03': {
        'id': 3,
        'hp': '',
        'def': '',
        'burse': '',
        'burse2': '',
        'supplyACT': '',
        'totalACT': '',
        'totalHP': '',
        'brokencount': '',
        'totalpower': '',
        'period': ''
    }
};
var objMsg = [];
var options = {
    useEasing: true, //使用缓和效果
    useGrouping: false, //使用分组效果
    separator: ',', //分离器，数据够三位，例如100,000
    decimal: '.', //小数点分割，例如：10.00
    prefix: '', //第一位默认数字
    suffix: '' //最后一位默认数字
};
var myknightMsg = {};
var globalNum = '';
var userActionKing = 1;
var userActionType = '';
var userActionsOnKing = 1;
var globalCountry = '';
var battlelogTimer = ''; //battlelog定时器
var logArray = []; //列表数组
var treasureMsg = []; //军旗表相关数据
var treasureTimer = '';
// 数字格式化
function numberFormat(num) {
    if (num >= 100000000) {
        num = Math.round(num / 10000000) / 10 + '亿'
    } else if (num > 10000000) {
        num = Math.round(num / 1000000) / 10 + '千万'
    } else if (num >= 10000) {
        num = Math.round(num / 1000) / 10 + '万'
    } else {
        num = num
    }
    return num
}

// 弹窗显示可领取行动点
function getActionPotint(num) {
    // $(event.target).hide();
    // $("#box-btn-" + num).show();
    getMyknightMsg(num);
}

function closeActionPointMsg() {
    $('#action-point').hide()
    $('#callable-action-points').html('')
}

//领取行动点
function receiveActionPonit(event, num) {
    // $(event.target).hide();
    // $("#box" + num + "-btn").show();
    mining(zhanchang.globalNum)
}



// 显示战斗目标信息
async function showActionMessage() {
    await domData.showActionMessage();
    // await getMyknightMsg(zhanchang.globalCountry);
    $('#action-get').html(Number(zhanchang.myknightMsg[zhanchang.globalCountry].freeact) / 100000000)
    $('#action-totalPower').html(zhanchang.myknightMsg[zhanchang.globalCountry].power)

    $("#action-message").show();
}

//返回首页
function gobackIndex() {
    window.location.href = "../index.html"
}

//显示战斗目标图标
function showBattleTarget(num) {
    // $("#battle-target").show();
    showActionMessage()
    zhanchang.globalCountry = num;
}

//行动点更新
async function updateActionPoint() {
    var api = getRandomApi();
    var selfData = {
        json: true,
        code: kingContractName,
        scope: kingContractName,
        table: 'kingdom',
        index_position: 1,
        key_type: "i64",
        lower_bound: '',
        limit: 10,
        reverse: false,
        show_payer: false,
    };
    //commonjs方法
    await getLinkData(api, selfData, function(data) {
        for (const x in data.rows) {
            zhanchang.objMsg[x] = data["rows"][x];
            zhanchang.objMsg[x].supplyACT = Math.floor(Number(parseFloat(zhanchang.objMsg[x].supplyACT) / Math.pow(10, 8)));
            zhanchang.objMsg[x].totalACT = Math.floor(Number(parseFloat(zhanchang.objMsg[x].totalACT) / Math.pow(10, 8)));
            $.each(zhanchang.sanguoMsg, function(i, n) {
                console.log('each', i, n)
                if (Number(x) == Number(n.id - 1)) {
                    // if (typeof n.hp != 'object') {
                    //   n.hp = new CountUp("sanguoHp_0" + Number(n.id), 0, 0, 0, 3, options);
                    // }
                    // n.hp.update(obj[x].hp);

                    if (typeof n.totalHP != 'object') {
                        n.totalHP = new CountUp("totalHp" + Number(n.id), 0, 0, 0, 3, zhanchang.options);
                    }
                    n.totalHP.update(zhanchang.objMsg[x].totalHP);

                    if (typeof n.def != 'object') {
                        n.def = new CountUp("def" + Number(n.id), 0, 0, 0, 3, zhanchang.options);
                    }
                    n.def.update(zhanchang.objMsg[x].def);

                    // if (typeof n.brokencount != 'object') {
                    //   n.brokencount = new CountUp("sanguoBrokencount_0" + Number(n.id), 0, 0, 0, 3, options);
                    // }
                    // n.brokencount.update(obj[x].brokencount);



                    // if (typeof n.totalpower != 'object') {
                    //   n.totalpower = new CountUp("sanguoTotalpower_0" + Number(n.id), 0, 0, 0, 3, options);
                    // }
                    // n.totalpower.update(obj[x].totalpower);

                    if (typeof n.supplyACT != 'object') {
                        n.supplyACT = new CountUp("supplyACT" + Number(n.id), 0, 0, 0, 3, zhanchang.options);
                    }
                    n.supplyACT.update(zhanchang.objMsg[x].supplyACT);

                    if (typeof n.totalACT != 'object') {
                        n.totalACT = new CountUp("actionPoint" + Number(n.id), 0, 0, 0, 3, zhanchang.options);

                    }
                    n.totalACT.update(zhanchang.objMsg[x].totalACT);


                    if (typeof n.burse != 'object') {
                        n.burse = new CountUp("burse" + Number(n.id), 0, 0.0000, 4, 3, {
                            useEasing: true,
                            useGrouping: false,
                            separator: ',',
                            decimal: '.',
                            prefix: '',
                            suffix: ' ' + String(zhanchang.objMsg[x].burse).split(' ')[1]
                        });

                    }
                    n.burse.update(parseFloat(zhanchang.objMsg[x].burse));

                    if (typeof n.burse2 != 'object') {
                        n.burse2 = new CountUp("burse2" + Number(n.id), 0, 0.0000, 4, 3, {
                            useEasing: true,
                            useGrouping: false,
                            separator: ',',
                            decimal: '.',
                            prefix: '',
                            suffix: ' ' + String(zhanchang.objMsg[x].burse2).split(' ')[1]
                        });

                    }
                    n.burse2.update(parseFloat(zhanchang.objMsg[x].burse2));
                }
            })
        }
        if (zhanchang.objMsg == '') {
            return
        }
        setTimeout(() => {
            document.getElementById("totalACT1").innerHTML = Math.round(Number(document.getElementById("actionPoint1").innerHTML))
            document.getElementById("totalACT2").innerHTML = Math.round(Number(document.getElementById("actionPoint3").innerHTML))
            document.getElementById("totalACT3").innerHTML = document.getElementById("actionPoint2").innerHTML
                //血量格式化
            document.getElementById("totalHp1").innerHTML = numberFormat(document.getElementById("totalHp1").innerHTML)
            document.getElementById("totalHp2").innerHTML = numberFormat(document.getElementById("totalHp2").innerHTML)
            document.getElementById("totalHp3").innerHTML = numberFormat(document.getElementById("totalHp3").innerHTML)
                //防御格式化
            document.getElementById("def1").innerHTML = numberFormat(document.getElementById("def1").innerHTML)
            document.getElementById("def2").innerHTML = numberFormat(document.getElementById("def2").innerHTML)
            document.getElementById("def3").innerHTML = numberFormat(document.getElementById("def3").innerHTML)
        }, 3100)
    });
    await getActionPotint(1);
    await getActionPotint(2);
    await getActionPotint(3);
}






// 获取行动点数据
async function getMyknightMsg(num) {
    zhanchang.globalNum = num;

    var api = getRandomApi();
    var selfData = {
        json: true,
        code: kingContractName,
        scope: num,
        table: 'knight',
        index_position: 1,
        key_type: "i64",
        lower_bound: getCookie("account"),
        limit: 1,
        reverse: false,
        show_payer: false,
    };
    await zhanchangApi.getKnightMsg(api, selfData, num);
}





//收取行动点
function mining(num) {
    var fromUser = getCookie("account");



    checkScatter(function(user) {
        var authorization;
        const eos = loot.scatter.eos(window.network, Eos);
        const account = user.name;
        authorization = [{
            actor: account,
            permission: user.authority
        }]

        var actions = [{
            account: kingContractName,
            name: 'mining',
            authorization: authorization,
            data: {
                acc: fromUser,
                kingdomid: num
            }
        }];


        // console.log("actions:",actions)
        // return

        eos.transaction({
            actions: actions
        }).then(res => {
            alert("收取行动点成功！");
            setTimeout(function() {
                zhanchang.getMyknightMsg(num);
            }, 500)

            // $('#stacknftBox').hide();
        }).catch(e => {
            eosErrorShow(e);
        });
    })
}

/**
 * @msg: 选择行动信息
 * @param {*} type 行动信息类型 string
 * @return {*}
 */
function selectAction(type) {
    zhanchang.userActionType = userActionType = type;
}

/**
 * @msg: 选择国家
 * @param {*} king number [1-3]
 * @return {*}
 */
async function selectCountry(king) {
    zhanchang.userActionKing = king
    zhanchang.userActionsOnKing = king;
    await getMyknightMsg(king);
}

/**
 * @msg: 战斗目标预估效果
 * @param {*}
 * @return {*}
 */
function estimatedResultShow() {
    domData.estimatedResultShow();
}


/**
 * @msg: 确认战斗操作
 * @param {*}
 * @return {*}
 */
function userActionOK() {
    if (userActionsOnKing == '') {
        showMsg("请选择目标国家");
        return
    }
    if ($("#userUsePoint").val() == '') {
        showMsg("请输入要使用的点数");
        return
    }


    var actpoint = Number($("#userUsePoint").val()) * Math.pow(10, 8);
    var fromUser = getCookie("account");
    checkScatter(function(user) {
        var authorization;
        const eos = loot.scatter.eos(window.network, Eos);
        const account = user.name;
        authorization = [{
            actor: account,
            permission: user.authority
        }]
        var selfData = {
            acc: fromUser,
            actpoint: actpoint,
            fromkingdom: zhanchang.userActionKing,
            tokingdom: zhanchang.userActionsOnKing
        }

        var actions = [{
            account: kingContractName,
            name: zhanchang.userActionType,
            authorization: authorization,
            data: selfData
        }];
        eos.transaction({
            actions: actions
        }).then(res => {
            if (userActionType == "fire") {
                showMsg("攻击成功！");
            } else if (userActionType == "heal") {
                showMsg("回血成功！");
            } else if (userActionType == "defence") {
                showMsg("加防成功！");
            }

            // setTimeout(function() {
            //     getKingdomMsg();
            // }, 1000)

        }).catch(e => {

            eosErrorShow(e);
        });
    })
}

/**
 * @msg: 根据数值返回国家名称
 * @param {*} num number
 * @return {*}
 */
function getKingName(num) {
    var tag = '魏国';
    switch (String(num)) {
        case "2":
            tag = '蜀国';
            break
        case "3":
            tag = '吴国';
            break
    }
    return tag;
}





function getUserOnKingAct(num) {
    var tag = '--';
    if (zhanchang.myknightMsg) {
        if (zhanchang.myknightMsg[num]) {
            tag = zhanchang.myknightMsg[num].freeact;
        }
    }
    return tag;
}

/**
 * @description:获取军旗表的数据
 * @param {*}
 * @return {*}
 */
async function getMyTreasureBox() {
    var api = getRandomApi();
    var selfData = {
        json: true,
        code: kingContractName,
        scope: kingContractName,
        table: 'treasurebox',
        index_position: 1,
        key_type: "i64",
        lower_bound: 0,
        // limit: 9,
        reverse: false,
        show_payer: false,
    };
    let res = await zhanchangApi.getTreasureBox(api, selfData);
    // console.log(res,'getmytrea');
    let nowTime = new Date().getTime()
        // console.log(nowTime,'现在时间');
    for (let k in res["rows"]) {
        // console.log(res["rows"][k],'kkkkk');
        treasureMsg = res["rows"][k]
        let effectiveTime = (new Date(treasureMsg["start"])).getTime() + treasureMsg["period"]
            // console.log(effectiveTime,'effectiveTime');
        if (treasureMsg["kingdomid"] == 1 && treasureMsg["HP"] > 0 && effectiveTime > nowTime) {
            // console.log('魏国');
            $(".box1-flag").show()
        } else if (treasureMsg["kingdomid"] == 2 && treasureMsg["HP"] > 0 && effectiveTime > nowTime) {
            // console.log("蜀国");
            $(".box2-flag").show()

        } else if (treasureMsg["kingdomid"] == 3 && treasureMsg["HP"] > 0 && effectiveTime > nowTime) {
            // console.log("吴国");
            $(".box4-flag").show()

        }
    }
}


// module引入文件不会暴露到全局，需要通过window对象引出
window.zhanchang = {
    //方法
    getActionPotint,
    closeActionPointMsg,
    receiveActionPonit,
    showWarReport: domData.showWarReport,
    gobackIndex,
    estimatedResultShow,
    selectAction,
    selectCountry,
    userActionOK,
    numberFormat,
    showBattleTarget,
    showActionMessage,
    getMyknightMsg,
    getUserOnKingAct,
    getKingName,
    updateActionPoint,
    getMyTreasureBox,
    // 变量
    actionPoint,
    sanguoMsg,
    objMsg,
    options,
    myknightMsg,
    globalNum,
    userActionKing,
    userActionType,
    userActionsOnKing,
    globalCountry,
    battlelogTimer,
    logArray,
    treasureTimer

}
$(document).ready(() => (zhanchang.showWarReport(), updateActionPoint()))
battlelogTimer = setInterval(function() {
    domData.getBattleLog();
}, 3000)

treasureTimer = setInterval(() => {
    getMyTreasureBox()
}, 3000)