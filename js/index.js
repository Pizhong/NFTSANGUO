import DomData from "../domData/index.js";


window.selectNum = 1;
// window.kingContractName = "xkingbattle1";
window.kingContractName = "xkingbattle2";
window.kingMsg = [];
window.myknightMsg = {};
window.myNftOnkingMsg = [];
window.selectKing = '';
window.selectMyNftTagNum = 0;
window.selectStackID = [];
window.selectUnStackID = [];
window.userActionKing = 1;
window.userActionType = '';
window.userActionsOnKing = 1;
window.battlelogTimer = '';
window.kingBattleTime = '';
window.intMsgTimer = '';

window.myNftListData = {};
window.myNftListPage = 0;
window.myNftListSize = 12;
window.limit = 1288;
window.myStackNftListData = {};
window.myStackNftListPage = 0;
window.myStackNftListSize = 12;
window.stackTimer = {};
window.userSelectParvalue = 0;



window.armsData = [{
    "id": 0,
    "name": "xlootshovel1"
}, {
    "id": 1,
    "name": "xlootndxbow1"
}, {
    "id": 2,
    "name": "lootnftarrow"
}, {
    "id": 3,
    "name": "lootnftsickl"
}, {
    "id": 4,
    "name": "lootnftsword"
}, {
    "id": 5,
    "name": "lootnftaxe11"
}, {
    "id": 6,
    "name": "lootnftspear"
}, {
    "id": 7,
    "name": "lootnfthamme"
}]

window.options = {
    useEasing: true, //使用缓和效果
    useGrouping: false, //使用分组效果
    separator: ',', //分离器，数据够三位，例如100,000
    decimal: '.', //小数点分割，例如：10.00
    prefix: '', //第一位默认数字
    suffix: '' //最后一位默认数字
};
//hp totalHp  prizePool
window.sanguoCommonPrizePool = '';
window.commonNftcount = '';
window.commonQuantity = '';
window.commonTimebonus = '';
window.myKingFreeAct_01 = '';
window.myKingFreeAct_02 = '';
window.myKingFreeAct_03 = '';
window.myMiningActData = '';

window.commonTimebonusNum = 0;
window.commonEosbonusNum = 0;

window.sanguoMsg = {
    'sanguo_01': {
        'id': 1,
        'hp': '',
        'def': '',
        'burse': '',
        'supplyACT': '',
        'totalACT': '',
        'totalHP': '',
        'brokencount': ''
    },
    'sanguo_02': {
        'id': 2,
        'hp': '',
        'def': '',
        'burse': '',
        'supplyACT': '',
        'totalACT': '',
        'totalHP': '',
        'brokencount': ''
    },
    'sanguo_03': {
        'id': 3,
        'hp': '',
        'def': '',
        'burse': '',
        'supplyACT': '',
        'totalACT': '',
        'totalHP': '',
        'brokencount': ''
    }
}

$(function() {
    intMsg();
    // clearInterval(intMsgTimer);
    intMsgTimer = setInterval(function() {
        intMsg();
    }, 5000)

    // clearInterval(battlelogTimer);

    // getMyNftList();
})

function intMsg() {



}





window.api = getRandomApi();
window.selfData = {
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
}




function checkLogin() {
    if (!getCookie("account")) {
        showMsg("请登录");
        setTimeout(function() {
            eosLogin();
        }, 520)

        return false
    }
    return true
}



$(function() {
    console.log("启动了哈.......");
    connectEOS();
    console.log("连接钱包成功，eos节点登录.......");
    eosLogin();
})






//eos转账
function transferAccounts(text) {
    var fromUser = getCookie("account");
    var eosMemo = "BULLTIN-" + text + "-0";
    var money = "1.0000"
    checkScatter(function(user) {
        var authorization;
        const eos = loot.scatter.eos(network, Eos);
        const account = user.name;
        authorization = [{
            actor: account,
            permission: user.authority
        }]

        var actions = [{
            account: "eosio.token",
            name: 'transfer',
            authorization: authorization,
            data: {
                from: fromUser,
                to: kingContractName,
                quantity: money + " EOS",
                memo: eosMemo
            }
        }];

        eos.transaction({
            actions: actions
        }).then(res => {
            console.log(res, '转账res');

            var count = 59;
            $('#time-countdown').css('visibility', 'visible')
            var timeId = setInterval(() => {

                count -= 1
                $('#time-countdown').html("公告板将于<span>" + count + "</span>秒后完成冷却")

                if (count == 0) {
                    clearInterval(timeId)
                    $('#time-countdown').css('visibility', 'hidden')
                };
            }, 1000)

        }).catch(e => {

            eosErrorShow(e);
        });

    })
}




//展示昭告内容
function showPubliclyContent(data) {
    // console.log(data, 'show');
    var html = ''

    html += '<p>' + data[0].text + '</p>'
    $('#zhaogao-content').html(html)
}

//跳转我的武器页面
function goMyArms() {
    window.location.href = "./html/myArms.html"
}

//跳转战场
function goZhanChan() {
    window.location.href = "./html/zhanchan.html"
}

//跳转武器库
function goArmory() {
    window.location.href = "./html/armory.html"
}

//跳转铁匠铺
function goSmithy() {
    window.location.href = "./html/smithy.html"
}

//跳转结盟页
function goAlliance() {
    window.location.href = "./html/alliance.html"
}

//跳转首页
function goIndex() {
    window.location.href = "./index.html"
}



window.descriptionMsgBoxShow = DomData.descriptionMsgBoxShow;
window.goIndex = goIndex;
window.goAlliance = goAlliance;
window.goSmithy = goSmithy;
window.goArmory = goArmory;
window.goMyArms = goMyArms;
window.goZhanChan = goZhanChan;
window.showPubliclyContent = showPubliclyContent;
window.transferAccounts = transferAccounts;
window.storychape = DomData.storychape;
window.checkLogin = checkLogin;
// window.showPubliclyContent = showPubliclyContent;