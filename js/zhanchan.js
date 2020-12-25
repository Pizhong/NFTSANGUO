
var actionPoint='' //行动点
var sanguoMsg = {
  'sanguo_01': {
    'id': 1,
    'hp': '',
    'def': '',
    'burse': '',
    'burse2':'',
    'supplyACT': '',
    'totalACT': '',
    'totalHP': '',
    'brokencount': '',
    'totalpower':'',
    'period':''
  },
  'sanguo_02': {
    'id': 2,
    'hp': '',
    'def': '',
    'burse': '',
    'burse2':'',
    'supplyACT': '',
    'totalACT': '',
    'totalHP': '',
    'brokencount': '',
    'totalpower':'',
    'period':''
  },
  'sanguo_03': {
    'id':3,
    'hp': '',
    'def': '',
    'burse': '',
    'burse2':'',
    'supplyACT': '',
    'totalACT': '',
    'totalHP': '',
    'brokencount': '',
    'totalpower':'',
    'period':''
  }
}
var objMsg=[]
var options = {
  useEasing: true, //使用缓和效果
  useGrouping: false, //使用分组效果
  separator: ',', //分离器，数据够三位，例如100,000
  decimal: '.', //小数点分割，例如：10.00
  prefix: '', //第一位默认数字
  suffix: '' //最后一位默认数字
};
var myknightMsg={}
var globalNum=''
// 数字格式化
function numberFormat(num){
  if(num>=100000000){
    num=Math.round(num/10000000)/10+'亿'
  }
  else if(num>10000000){
   num=Math.round(num/1000000)/10+'千万'
  }
  else if(num>=10000){
    num=Math.round(num/1000)/10+'万'
  }
  else{
    num=num
  }
  return num
 }


function getActionPotint(num){
  getMyknightMsg(num)
  if ($('#action-point').length == 0) {
    
    var html = '';
   
    html += '<div class="alert-publicly" id="action-point" style="display: none;">';
    html += '<div class="alert-box">';
    html +=  '<div class="action-content flex">';
    html +=  '<p>我可领取的行动点:<span id="callable-action-points"></span></p>'
    html +=  '<img src="../image/action-point-button.png" style="cursor: pointer;" onclick="receiveActionPonit()">'
    html +=  '<img src="../image/action-point-close.png" class="close"  onclick="closeActionPointMsg()">'
    html +=  '</div>';
    html += '</div>';
    html += '</div>';
    

    $('body').append(html);
  }else{

  }
  $("#action-point").show();
}
function closeActionPointMsg(){
  $('#action-point').hide()
  $('#callable-action-points').html('')
}

//领取行动点
function receiveActionPonit(){
  mining(globalNum)
}
function showWarReport(){
  if ($('#war-report').length == 0) {
    
    var html = '';
   
    html += '<div class="alert-publicly" id="war-report" style="display: none;">';
    html += '<div class="alert-box flex">';
    html +=  '<div class="war-report-content" >';
    html +=  '<img src="../image/war-report-close.png" class="close" onclick="$(\'#war-report\').hide()"></img>'
    html +=   '<div class="top">'
    html +=   '<p>这里是城市正中心,一个很宽阔的广场 ，中央有颗大榕树 ，据传已经有千年大树龄 ，是这座城市大历史 见证，树干大底部有个很大大树洞 </p>'
    html +=   '</div>'
    html +=    '<div class="middle">'
    html +=     '<ul>'
    html +=     '<li>安知水:百花秘术 > 阿贝尔.布鲁斯帝恩 ：<span>HP:5463/ </span><span> 3455</span></li>'
    html +=     '<li>安知水:百花秘术 > 阿贝尔.布鲁斯帝恩 ：<span>HP:5463/ </span><span>3455</span></li>'
    html +=     '<li>安知水:百花秘术 > 阿贝尔.布鲁斯帝恩 ：<span>HP:5463/ </span><span>3455</span></li>'
    html +=     '<li>安知水:百花秘术 > 阿贝尔.布鲁斯帝恩 ：<span>HP:5463/ </span><span>3455</span></li>'
    html +=     '<li>安知水:百花秘术 > 阿贝尔.布鲁斯帝恩 ：<span>HP:5463/ </span><span>3455</span></li>'
    html +=     '</ul>'
    html +=    '</div>'
    html +=    '<div class="btn-group">'
    html +=     '<img src="../image/war-report-back.png">'
    html +=     '<img src="../image/war-report-next.png">'
    html +=    '</div>'
    html +=  '</div>';
    html += '</div>';
    html += '</div>';
    

    $('body').append(html);
  }else{

  }
  $("#war-report").show();
}

function showActionMessage(){
  if ($('#action-message').length == 0) {
    
    var html = '';
   
    html += '<div class="alert-publicly" id="action-message" style="display: none;">';
    html += '<div class="alert-box flex">';
    html +=  '<div class="action-message-content" >';
    html +=  '<img src="../image/war-report-close.png" class="close" onclick="$(\'#action-message\').hide(),$(\'#battle-target\').hide()"></img>'
    html +=  '<div class="action-message-box1">';
    html +=   '<p>行动信息</p>'
    html +=   '<div class="action-message-icon-box">'
    html +=   '<img src="../image/gongji.png">'
    html +=   '<img src="../image/fanyu.png">'
    html +=   '<img src="../image/jiaxue.png">'
    html +=   '<img src="../image/qianqi.png">'
    html +=   '</div>'
    html += '</div>';
    html +=  '<div class="action-message-box2">';
    html +=   '<p>目标势力</p>'
    html +=   '<div class="action-message-icon-box">'
    html +=   '<img src="../image/action-message-icon-wei .png">'
    html +=   '<img src="../image/action-message-icon-shu .png">'
    html +=   '<img src="../image/action-message-icon-wu .png">'
    html +=   '</div>'
    html += '</div>';
    html += '<div class="action-message-box3">'
    html += '<p>现在可以使用行动点 : <span>999</span>，总算力 : <span>9999</span>，您准备使用：</p>'
    html += '<form>'
    html += '<input type="text" placeholder="输入行动点数" id="userUsePoint">'
    html += '</form>'
    html += '<p>预估效果：造成魏国 <span>9999999999</span> 点伤害</p>'
    html += '</div>'
    html += '<img src="../image/action-message-sure-btn.png" class="sure-btn">'
    html += '</div>';
    html += '</div>';
    html += '</div>';
    

    $('body').append(html);
  }else{

  }
  $("#action-message").show();
}

//返回首页
function gobackIndex(){
  window.location.href="../index.html"
}

//显示战斗目标图标
function showBattleTarget(){
  $("#battle-target").show()
}

//行动点更新
function updateActionPoint(){
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
  
  getLinkData(api, selfData, function(data) {
    for (x in data["rows"]) {
      objMsg[x] = data["rows"][x];  
      objMsg[x].supplyACT = Math.floor(Number(parseFloat(objMsg[x].supplyACT) / Math.pow(10, 8)));
      objMsg[x].totalACT = Math.floor(Number(parseFloat(objMsg[x].totalACT) / Math.pow(10, 8)));
      console.log(numberFormat(objMsg[x].totalHP));
      $.each(sanguoMsg, function(i, n) {
        console.log('each', i, n)
        if (Number(x) == Number(n.id - 1)) {
          // if (typeof n.hp != 'object') {
          //   n.hp = new CountUp("sanguoHp_0" + Number(n.id), 0, 0, 0, 3, options);
          // }
          // n.hp.update(obj[x].hp);

          if (typeof n.totalHP != 'object') {
            n.totalHP = new CountUp("totalHp" + Number(n.id), 0, 0, 0, 3, options);
          }
          n.totalHP.update(objMsg[x].totalHP);

          if (typeof n.def != 'object') {
            n.def = new CountUp("def" + Number(n.id), 0, 0, 0, 3, options);
          }
          n.def.update(objMsg[x].def);

          // if (typeof n.brokencount != 'object') {
          //   n.brokencount = new CountUp("sanguoBrokencount_0" + Number(n.id), 0, 0, 0, 3, options);
          // }
          // n.brokencount.update(obj[x].brokencount);



          // if (typeof n.totalpower != 'object') {
          //   n.totalpower = new CountUp("sanguoTotalpower_0" + Number(n.id), 0, 0, 0, 3, options);
          // }
          // n.totalpower.update(obj[x].totalpower);

          if (typeof n.supplyACT != 'object') {
            n.supplyACT = new CountUp("supplyACT" + Number(n.id), 0, 0, 0, 3, options);
          }
          n.supplyACT.update(objMsg[x].supplyACT);

          if (typeof n.totalACT != 'object') {
            n.totalACT = new CountUp("actionPoint" + Number(n.id), 0, 0, 0, 3, options);
           
          }
          n.totalACT.update(objMsg[x].totalACT);


          if (typeof n.burse != 'object') {
            n.burse = new CountUp("burse" + Number(n.id), 0, 0.0000, 4, 3, {
              useEasing: true,
              useGrouping: false,
              separator: ',',
              decimal: '.',
              prefix: '',
              suffix: ' ' + String(objMsg[x].burse).split(' ')[1]
            });
           
          }
          n.burse.update(parseFloat(objMsg[x].burse));
          
          if (typeof n.burse2 != 'object') {
            n.burse2 = new CountUp("burse2" + Number(n.id), 0, 0.0000, 4, 3, {
              useEasing: true,
              useGrouping: false,
              separator: ',',
              decimal: '.',
              prefix: '',
              suffix: ' ' + String(objMsg[x].burse2).split(' ')[1]
            });
           
          }
          n.burse2.update(parseFloat(objMsg[x].burse2));
        }
      })
    }
    if (objMsg == '') {
      return
    }
    setTimeout(()=>{
      document.getElementById("totalACT1").innerHTML=Math.round(Number(document.getElementById("actionPoint1").innerHTML))
      document.getElementById("totalACT2").innerHTML=Math.round(Number(document.getElementById("actionPoint3").innerHTML))
      document.getElementById("totalACT3").innerHTML=document.getElementById("actionPoint2").innerHTML
      //血量格式化
      document.getElementById("totalHp1").innerHTML=numberFormat(document.getElementById("totalHp1").innerHTML)
      document.getElementById("totalHp2").innerHTML=numberFormat(document.getElementById("totalHp2").innerHTML)
      document.getElementById("totalHp3").innerHTML=numberFormat(document.getElementById("totalHp3").innerHTML)
      //防御格式化
      document.getElementById("def1").innerHTML=numberFormat(document.getElementById("def1").innerHTML)
      document.getElementById("def2").innerHTML=numberFormat(document.getElementById("def2").innerHTML)
      document.getElementById("def3").innerHTML=numberFormat(document.getElementById("def3").innerHTML)
    },3100)
  })
}




$(document).ready(updateActionPoint())


function getMyknightMsg(num) {
  globalNum=num

  var api = get_random_api();
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
  }
  $.post(api + "/v1/chain/get_table_rows", JSON.stringify(selfData),
    function(data, status) {
      console.log(data,'getMykni')
      for (x in data["rows"]) {
        if (data["rows"][x].acc == getCookie("account")) {
          myknightMsg[num] = data["rows"][x];
          var balance = '';
          var times = 0;
          var myMiningAct;
          var proportion;
          $.each(objMsg, function(i, n) {
            if (n.id == num) {
              console.log(n,'n');
              balance = (n.totalACT - n.supplyACT) / n.period;
              proportion = myknightMsg[num].power / n.totalpower;
            }
          })

          // var nowTime=new Date().getTime()
          // var lastdriptime= new Date(myknightMsg[num]["lastdriptime"]).getTime()
          // console.log(nowTime,'nowTime');
          // var ctime=nowTime-lastdriptime
          // var cbalance=((objMsg[num-1].totalACT)-(objMsg[num-1].supplyACT))/objMsg[num-1].period
          // var cpow=(myknightMsg[num]["power"])/(objMsg[num-1].totalpower)
          // var callableActionPoints=ctime * cbalance * cpow
          // console.log(callableActionPoints,'call');
          console.log(objMsg[0].period);
          if(getUTCTime(objMsg[0].start) > objMsg[0].period){
            times = objMsg[0].period - (getUTCTime(objMsg[0].start) - getUserUTC(myknightMsg[num].lastdriptime))

          }else if (myknightMsg[num].lastdriptime) {
            times = getUserUTC(myknightMsg[num].lastdriptime);
          }

          myMiningAct = balance * times * proportion;
          console.log(times,'times');
          console.log(balance,'balance');
          console.log(myMiningAct,'act');
          $('#callable-action-points').html(Number(myMiningAct))
        }
      }
    }, "json");
}

//收取行动点
function mining(num) {
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
        getMyknightMsg(num);
      }, 500)

      // $('#stacknftBox').hide();
    }).catch(e => {

      eosErrorShow(e);
    });
  })
}

//战斗目标
function estimatedResultShow() {
  var num = $("#userUsePoint").val();
  var html = '';
  if (num > 0) {
    var usePoint = getUserOnKingAct(userActionKing);
    var poingConstant = Math.pow(0.5, Math.floor(usePoint / 5000));

    if (userActionType == "fire") {
      // var tag = Number(myknightMsg[userActionKing].power * num * poingConstant * 3) - kingMsg[userActionsOnKing-1].def;
      var tag = Number(myknightMsg[userActionKing].power * num * poingConstant * 3);
      if (tag < 0) {
        tag = 0;
      }
      html += '  <div>预计能给 ' + getKingName(userActionsOnKing) + ' 造成 ' + tag + ' 伤害 </div>';
      // html += '  <div>你确定花费 ' + num + ' 行动点，攻击 ' + getKingName(userActionsOnKing) + ' 吗？</div>';
    } else if (userActionType == "defence") {
      var tag = Number(myknightMsg[userActionKing].power * num * poingConstant / 2).toFixed(0);
      html += '  <div>预计能给 ' + getKingName(userActionsOnKing) + ' 加 ' + tag + ' 防御 </div>';
      // html += '  <div>你确定花费' + num + '行动点，给' + getKingName(userActionsOnKing) + '加防御？</div>';
    } else {
      var increaseBlood = kingMsg[userActionsOnKing - 1].totalHP - kingMsg[userActionsOnKing - 1].hp;
      var tag = myknightMsg[userActionKing].power * num * poingConstant;
      if (tag > increaseBlood) {
        tag = increaseBlood;
      }
      html += '  <div>预计能给 ' + getKingName(userActionsOnKing) + ' 加 ' + tag + ' 血量 </div>';
      // html += '  <div>你确定花费' + num + '行动点，给' + getKingName(userActionsOnKing) + '加血？</div>';
    }

    $("#estimatedResultTag").html(html);
  } else {
    $("#estimatedResultTag").html('');
  }
}

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
    const eos = loot.scatter.eos(network, Eos);
    const account = user.name;
    authorization = [{
      actor: account,
      permission: user.authority
    }]
    var selfData = {
      acc: fromUser,
      actpoint: actpoint,
      fromkingdom: userActionKing,
      tokingdom: userActionsOnKing
    }

    var actions = [{
      account: kingContractName,
      name: userActionType,
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
      $('#kingMsgSHow').hide();
      $('#userActionBox').hide();
      setTimeout(function() {
        getKingdomMsg();
      }, 1000)

    }).catch(e => {

      eosErrorShow(e);
    });
  })
}

function getUserOnKingAct(num) {
  var tag = '--';
  // $.each(myknightMsg,function(i,n){
  //   if(num == (i+1) ){
  //     tag = n.totalact;
  //   }
  // })
  if (myknightMsg) {
    if (myknightMsg[num]) {
      tag = myknightMsg[num].freeact;
    }
  }

  // console.log(tag,num,)
  return tag;
}
