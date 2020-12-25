var selectNum = 1;
// var kingContractName = "xkingbattle1";
var kingContractName = "xkingbattle2";
var kingMsg = [];
var myknightMsg = {};
var myNftOnkingMsg = [];
var selectKing = '';
var selectMyNftTagNum = 0;
var selectStackID = [];
var selectUnStackID = [];
var userActionKing = 1;
var userActionType = '';
var userActionsOnKing = 1;
var battlelogTimer = '';
var kingBattleTime = '';
var intMsgTimer = '';

var myNftListData = {};
var myNftListPage = 0;
var myNftListSize = 12;
var limit = 1288;
var myStackNftListData = {};
var myStackNftListPage = 0;
var myStackNftListSize = 12;
var stackTimer = {};
var userSelectParvalue = 0;



var armsData = [{
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

var options = {
  useEasing: true, //使用缓和效果
  useGrouping: false, //使用分组效果
  separator: ',', //分离器，数据够三位，例如100,000
  decimal: '.', //小数点分割，例如：10.00
  prefix: '', //第一位默认数字
  suffix: '' //最后一位默认数字
};
//hp totalHp  prizePool
var sanguoCommonPrizePool = '';
var commonNftcount = '';
var commonQuantity = '';
var commonTimebonus = '';
var myKingFreeAct_01 = '';
var myKingFreeAct_02 = '';
var myKingFreeAct_03 = '';
var myMiningActData = '';

var commonTimebonusNum = 0;
var commonEosbonusNum = 0;

var sanguoMsg = {
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
  battlelogTimer = setInterval(function() {
    // getBattleLog();
  }, 3000)
  // getMyNftList();
})

function intMsg() {
  
  
  
}





  var api = get_random_api();
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





function descriptionMsgBoxShow(tag) {
  var html = '';
  var title = '说明';
  switch (tag) {
    case "myMoney":
      $('.actionBtn').hide()
      title = '我的资产';
      html += '总锁定TIME：<span id="myMoneyLockTime" class="mgt20">--</span></br>';
      html += '已提取TIME：<span id="myMoneyWithTime" class="mgt20">--</span></br>';
      html += '待领取EOS：<span id="myMoneyEos" class="mgt20">--</span></br>';
      html += '锁定时间：<span id="myMoneyLockTimes" class="mgt20">--</span></br>';
      html += '上次提取时间：<span id="myMoneyLastWithTimes" class="mgt20">--</span></br>';
      html += '<div class="sanguoBox mgt20">可提取TIME：<span id="myMoneyLockWeek">--</span> TIME </div></br></br>';
      html += '<div clss="flex">'
      html += '<div class="actionBtnn" onclick="withMylockMoney()"><span>提现</span></div>';
      html += '</div>'
      break
    case "about":
      $('.actionBtn').show()
      title = '关于';

      html += '<span style="font-weight:bolder;">玩法介绍</span></br></br>';
      html += '1、三国争霸，每个国家的士兵使用行动点，对目标国家操作攻击、加防、回血三种指令，进行为期7天的国战，游戏结束时根据剩余血量排序分出冠亚季军，获得不同数量的time及eos奖励</br>';
      html += '2、和传统的国战玩法不同，士兵（单个EOS账号）无需加入固定国家，在该国家抵押NFT矿机即可获得对应行动点，可以同时在三个国家操作任意指令</br></br>';

      html += '<span style="font-weight:bolder;">关于国家</span></br></br>';
      html += '1、魏蜀吴三个国家，分为高行动点、高血、平衡三种类型：</br>';
      html += '<table style="margin-bottom: 10px;" border="">';
      html += '  <tbody>';
      html += '    <tr>';
      html += '      <td>国家</td>';
      html += '      <td>行动点上限</td>';
      html += '      <td>血量上限</td>';
      html += '      <td>初始防御力</td>';
      html += '    </tr>';
      html += '    <tr>';
      html += '      <td>魏国</td>';
      html += '      <td>675000</td>';
      html += '      <td>1亿</td>';
      html += '      <td>0</td>';
      html += '    </tr>';
      html += '    <tr>';
      html += '      <td>蜀国</td>';
      html += '      <td>600000</td>';
      html += '      <td>1亿500万</td>';
      html += '      <td>0</td>';
      html += '    </tr>';
      html += '    <tr>';
      html += '      <td>吴国</td>';
      html += '      <td>525000</td>';
      html += '      <td>1亿1000万</td>';
      html += '      <td>0</td>';
      html += '    </tr>';
      html += '  </tbody>';
      html += '</table>';
      html += '2、国家遭受攻击，先减防御力，再减血量，防御力为0，直接掉血</br>';
      html += '3、游戏结束时，血量最多的国家获得胜利</br></br>';

      html += '<span style="font-weight:bolder;">关于NFT质押</span></br></br>';
      html += '1、玩家可向任意国家质押任意NFT矿机，获取在该国的挖矿算力</br>';
      html += '2、可在“我的NFT”-“武器入库”点击问号查看详情</br></br>';

      html += '<span style="font-weight:bolder;">关于行动点</span></br></br>';
      html += '1、行动点根据单个账号抵押的NFT矿机总算力挖矿获得，需手动领取</br>';
      html += '2、行动点不能转移、交易、提取，只能在该国家中用于发起“进攻”“加防”“回血”三种指令</br>';
      html += '3、行动效果根据累积的行动点执行减半机制</br></br>';

      html += '<span style="font-weight:bolder;">关于金库</span></br></br>';
      html += '可在“战场”点击“金库”图标查看</br></br>';

      html += '<span style="font-weight:bolder;">关于保管费</span></br></br>';
      html += '用户每质押1件NFT矿机支付的1EOS保管费按分配规则：</br>';
      html += '10%官方收入</br>';
      html += '20%回购time：每笔按0.2eos比例，实时回购time</br>';
      html += '30%国家金库：每笔按0.3eos比例，进入该国家金库，当该国金库被掠夺后，再次抵押NFT，将重新累积国家金库</br>';
      html += '40%EOS奖池：每笔按0.3eos比例，，进入EOS奖池</br></br>';

      html += '<span style="font-weight:bolder;">关于奖池</span></br></br>';
      html += 'TIME奖励：可在“战场”-“TIME奖池”点击问号查看详情</br>';
      html += 'EOS奖励：可在“战场”-“EOS奖池”点击问号查看详情</br></br>';

      html += '<span style="font-weight:bolder;">关于胜利</span></br></br>';
      html += '1、游戏倒计时结束后，根据每个国家剩余血量排名，由于链上数据与前端数据同步有时间差，最终结果以链上数据返回前端后显示为准</br>';
      html += '2、如游戏结束后出现三个国家同血量情况，将根据国家总算力排行</br>';
      html += '3、赛季结果可在“战场”点击国家名字查看详情</br></br>';

      html += '<span style="font-weight:bolder;">关于邀请返佣</span></br></br>';
      html += '1、开NFT盲盒绑定的邀请人有矿税返佣，矿税为每笔收矿量（time和eos）的10%</br>';
      html += '2、一级邀请可获得40%矿税返佣，二级邀请可获得30%矿税返佣，官方获得矿税30%返佣</br></br>';

      html += '<span style="font-weight:bolder;">关于算法</span></br></br>';
      html += '1、矿机算力公式：</br>';
      html += '<table style="margin-bottom: 10px;" border="">';
      html += '  <tbody>';
      html += '    <tr>';
      html += '      <td>等级</td>';
      html += '      <td>品质范围</td>';
      html += '      <td>挖矿效率</td>';
      html += '    </tr>';
      html += '    <tr>';
      html += '      <td>木质</td>';
      html += '      <td>0-5000</td>';
      html += '      <td>1.1+0.4*（品质/2500）</td>';
      html += '    </tr>';
      html += '    <tr>';
      html += '      <td>铁质</td>';
      html += '      <td>4500-8000</td>';
      html += '      <td>1.2+0.4*（（品质-5000）/1500）</td>';
      html += '    </tr>';
      html += '    <tr>';
      html += '      <td>铜质</td>';
      html += '      <td>7200-9000</td>';
      html += '      <td>1.3+0.4*（（品质-8000）/500）</td>';
      html += '    </tr>';
      html += '    <tr>';
      html += '      <td>银质</td>';
      html += '      <td>8100-9800</td>';
      html += '      <td>1.4+0.4*（（品质-9000）/400）</td>';
      html += '    </tr>';
      html += '    <tr>';
      html += '      <td>金质</td>';
      html += '      <td>8800-9980</td>';
      html += '      <td>1.6+0.4*（（品质-9800）/90）</td>';
      html += '    </tr>';
      html += '    <tr>';
      html += '      <td>钻石质</td>';
      html += '      <td>9980-10000</td>';
      html += '      <td>1.4+0.4*（（品质-9980）/10）</td>';
      html += '    </tr>';
      html += '  </tbody>';
      html += '</table>';
      html += '2、我的算力=挖矿效率*面值*10</br>';
      html += '3、算力挖行动点公式：((国家总行动点 - 已挖出行动点 ) / 游戏周期) * 挖矿时间 * (我的算力/国家总算力)</br>';

      break
  }

  $("#descriptionMsgBox .desTitle").html(title);
  $("#descriptionMsgBox .stackCountryBox div").html(html);
  $("#descriptionMsgBox").show();
}

$(function() {
  console.log("启动了哈.......");
  connectEOS();
  console.log("连接钱包成功，eos节点登录.......");
  eosLogin();
})

// 时间格式化
function getTime(time){
      var YY=new Date(time).getFullYear()
      var MM=new Date(time).getMonth()+ 1
      if(MM < 10){ MM = '0' + MM }
      var DD=new Date(time).getDay()
      if(DD < 10){ DD = '0' + DD }
      var hh=new Date(time).getHours()
      if(hh < 10){ hh = '0' + hh }
      var mm=new Date(time).getMinutes()
      if(mm < 10){ mm = '0' + mm }
      var ss=new Date(time).getSeconds()
      if(ss < 10){ ss = '0' + ss }
      var Time=YY+"-"+MM+"-"+DD+" "+hh+":"+mm+":"+ss
      return Time
}
//时间戳格式化
function formatTime(obj){
    var time = new Date(parseInt(obj));
    var YY = time.getFullYear();  //年
    var MM = time.getMonth() + 1;  //月
    if(MM < 10){ MM = '0' + MM }
    var DD = time.getDate();  //日
    if(DD < 10){ DD = '0' + DD }
    var hh = time.getHours();  //时
    if(hh < 10){ hh = '0' + hh }
    var mm = time.getMinutes();  //分
    if(mm < 10){ mm = '0' + mm }
    var ss = time.getSeconds();  //秒
    if(ss < 10){ s = '0' + ss }
    var timeStr = YY+"-"+MM+"-"+DD+" "+hh+":"+mm+":"+ss;
    return timeStr;
}


function storychape(data){
  console.log(data,'storychape');
  var html2='';
  var backgroundMap = {
    13:'./image/label1.png',
    14:'./image/label2.png',
    15:'./image/label3.png',
  }
  var countryIconMap = {
    1:'./image/country-wei.png',
    2:'./image/country-shu.png',
    3:'./image/country-wu.png'
  }
  var status={
    1:'./image/end.png',
    2:'./image/keep.png'
  }
  if(data.length>0){
    for(let i =0;i<data.length;i++){
      var startTime=getTime(data[i]["start"])
      var endTime=data[i]["period"]+(new Date(data[i]["start"]).getTime())
      endTime = formatTime(endTime)
      console.log(endTime,'endTime');
     
        data[i]["eosass"]=parseInt((data[i]["eosass"]))+" EOS"
      
      
        data[i]["timeass"]=parseInt((data[i]["timeass"])) + " TIME"
      
      html2 += '<li class="main-first" id="id-main" style="background-image:url(' + backgroundMap[data[i]["id"]] + ')">';
      html2 +=    '<div class="huihe">'
      html2 +=    '<span>第'+data[i]["id"]+'回 '+ data[i]["name"]+'</span>'
      html2 +=    '</div>' 
      html2 +=    '<div class="country"><img src="'+countryIconMap[data[i]["kingdomid"]] +'" alt=""></div>'
      html2 +=    '<div class="jianli">'
      html2 +=    '<img src="./image/eos.png" alt="" class="jianli-eos">'
      html2 +=    '<span class="eos-text">'+data[i]["eosass"]+'</span>'
      html2 +=     '</div>'
      html2 +=    '<div class="jianli" style="margin-top:5px;">'
      html2 +=    '<img src="./image/time.png" alt="" class="jianli-eos">'
      html2 +=    '<span class="time-text">'+data[i]["timeass"]+'</span>'
      html2 +=     '</div>'
      html2 +=     '<div class="status">'
      html2 +=     '<img src="'+status[data[i]["stat"]]+'" alt="">'
      html2 +=     '</div>'
      html2 +=     '<div class="time">'
      html2 +=     ' <p>开始时间：&nbsp;'+startTime+'-'+ endTime +'</p>'
      html2 +=      '</div>'
      html2 += '</li>'
      $('#main-huihe').html(html2);
      
    }
  }
}

//eos转账
function transferAccounts(text){
  var fromUser = getCookie("account");
  var eosMemo = "BULLTIN-"+text+"-0";
  var money="1.0000"
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
      console.log(res,'转账res');

      var count=59;
      $('#time-countdown').css('visibility','visible')
      var timeId=setInterval(()=>{
        
        count-=1
        $('#time-countdown').html("公告板将于<span>"+count+"</span>秒后完成冷却")
          
        if(count == 0){
          clearInterval(timeId)
        $('#time-countdown').css('visibility','hidden')
        };
      },1000)
        
    }).catch(e => {

      eosErrorShow(e);
    });
  
  })
}




//展示昭告内容
function showPubliclyContent(data){
  console.log(data,'show');
  var html =''
      
  html += '<p>'+data[0].text+'</p>'
  $('#zhaogao-content').html(html)
}

//跳转我的武器页面
function goMyArms(){
  window.location.href="./html/myArms.html"
}

//跳转战场
function goZhanChan(){
  window.location.href="./html/zhanchan.html"
}

//跳转武器库
function goArmory(){
  window.location.href="./html/armory.html"
}

//跳转铁匠铺
function goSmithy(){
  window.location.href="./html/smithy.html"
}

//跳转结盟页
function goAlliance(){
  window.location.href="./html/alliance.html"
}

//跳转首页
function goIndex(){
  window.location.href="./index.html"
}

$("#select1").mouseenter(function(){
  $(this).attr("src",'./image/bottom1-hover.png')
})
$("#select2").mouseenter(function(){
  $(this).attr("src",'./image/bottom2-hover.png')
  
})
$("#select3").mouseenter(function(){
  $(this).attr("src",'./image/bottom3-hover.png')
})
$("#select4").mouseenter(function(){
  $(this).attr("src",'./image/bottom4-hover.png')
})
$("#select5").mouseenter(function(){
  $(this).attr("src",'./image/bottom5-hover.png')
})


$("#select1").mouseleave(function(){
  $(this).attr("src",'./image/bottom1.png')
})
$("#select2").mouseleave(function(){
  $(this).attr("src",'./image/bottom2.png')
})
$("#select3").mouseleave(function(){
  $(this).attr("src",'./image/bottom3.png')
})
$("#select4").mouseleave(function(){
  $(this).attr("src",'./image/bottom4.png')
})
$("#select5").mouseleave(function(){
  $(this).attr("src",'./image/bottom5.png')
})