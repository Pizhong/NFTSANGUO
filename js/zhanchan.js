
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
    'brokencount': ''
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
    'brokencount': ''
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
    'brokencount': ''
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


function getActionPotint(){
  if ($('#action-point').length == 0) {
    
    var html = '';
   
    html += '<div class="alert-publicly" id="action-point" style="display: none;">';
    html += '<div class="alert-box">';
    html +=  '<div class="action-content flex">';
    html +=  '<p>我可领取的行动点:<span>99999.99999999</span></p>'
    html +=  '<img src="../image/action-point-button.png" style="cursor: pointer;">'
    html +=  '<img src="../image/action-point-close.png" class="close"  onclick="$(\'#action-point\').hide()">'
    html +=  '</div>';
    html += '</div>';
    html += '</div>';
    

    $('body').append(html);
  }else{

  }
  $("#action-point").show();
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
    html += '<input type="text" placeholder="输入行动点数">'
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
      objMsg[x].supplyACT = Math.floor(Number(parseFloat(objMsg[x].supplyACT) / Math.pow(10, 1)));
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

    },3000)
  })
}




$(document).ready(updateActionPoint())
