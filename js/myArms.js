/*
 * @Author: your name
 * @Date: 2020-12-31 12:11:01
 * @LastEditTime: 2020-12-31 16:28:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nftsango2.xloot.io\js\myArms.js
 */





function getMyNftList() {
  myNftListPage = 0;
  var loadHtml = '<div class="flex"><div style="padding:30px;background: rgba(0,0,0,0.7);color:#fff;text-align: center;border-radius: 10px;"><img src="imgs/loading.gif" alt=""><br><div style="margin-top:13px;">加载中...</div></div></div>'
  $(".myNftListBox ul").html(loadHtml);


  var code = '';
  var scope = getCookie("account");
  for (var i = 0; i < armsData.length; i++) {
    if (armsData[i].id == selectMyNftTagNum) {
      code = armsData[i].name;
    }

  }

  var api = 'https://' + getRandomApi2();
  // var api = get_random_api();
  var selfData = {
    json: true,
    code: code,
    scope: scope,
    table: 'tokens',
    index_position: 3,
    key_type: "i64",
    lower_bound: '',
    limit: limit,
    reverse: true,
    show_payer: false,
  }
  $.post(api + "/v1/chain/get_table_rows", JSON.stringify(selfData),
    function(data, status) {

      myNftListData.content = [];
      myNftListData.more = data["more"];
      myNftListData.next_key = data["next_key"];
      for (x in data["rows"]) {
        var obj = data["rows"][x];
        myNftListData.content[x] = obj;
      }
      myNftListData.totalElements = data["rows"].length;
      myNftListData.size = myNftListSize;
      myNftListData.totalPages = Math.ceil(data["rows"].length / myNftListSize);

      getMyNftListShow(myNftListPage);


    }, "json");


}

function getMyNftListShow(page) {
  // var myNftListData = {};
  // var myNftListPage = 0;
  // var myNftListSize = 12;
  userSelectParvalue = 0;
  selectStackID = [];
  $(".myNftListBox .all").removeClass("active");

  myNftListPage = page;
  var data = myNftListData;
  var obj = myNftListData.content;
  var html = '';
  var html2 = '';
  var loadHtml = '<div class="flex"><div style="padding:30px;background: rgba(0,0,0,0.7);color:#fff;text-align: center;border-radius: 10px;"><img src="imgs/loading.gif" alt=""><br><div style="margin-top:13px;">加载中...</div></div></div>'
  $(".list").html(loadHtml);

  $.each(obj, function(i, n) {

    if (i >= myNftListPage * myNftListSize && ((myNftListPage + 1) * myNftListSize) > i) {


      html += '<li onclick="selectMyStackNft(' + n.id + ',this,' + Number(parseFloat(n.parvalue)) + ')">';
      html += '  <div style="width:93px;height:93px;"><img src="' + n.imageUrl + '"></div>';
      html += '  <div class="text">' + parseFloat(n.parvalue) + ' ' + String(n.parvalue).split(" ")[1] + '</div>';
      html += '  <div class="nftQualityBox">' + n.title + ' (' + n.quality + ')</div>';
      html += '</li>';

      // getNftMsg(n);
    }



  })

  if (html == '' || obj == '') {
    $(".myNftListBox ul").html('<div class="flex" style="color:#666;font-size:20px;padding-top: 52px;"">你没有该类型的武器</div>');
  } else {
    $(".myNftListBox ul").html(html);
  }

  html2 += '<div class="Pagination-pages">';
  var num = 10,
    startIndex, endIndex, total;
  total = data.totalPages;
  // if (total < num) {
  //   num = total;
  // }
  // if (page > 5) {
  //   if (total <= page + 5) {
  //     startIndex = page - (num - (total - page));
  //     endIndex = startIndex + 10;
  //   } else {
  //     startIndex = page - 5;
  //     endIndex = page + 5;
  //   }
  // } else {
  //   startIndex = 0;
  //   endIndex = num;
  // }
  // for (var i = startIndex; i < endIndex; i++) {
  //   if (i == page) {
  //     html2 += '<div class="Pagination-page active" onclick="getMyNftListShow(' + i + ')">' + (i + 1) + '</div>';
  //   } else {
  //     html2 += '<div class="Pagination-page" onclick="getMyNftListShow(' + i + ')">' + (i + 1) + '</div>';
  //   }
  // }
  // html2 += '</div>';
  html2 += '<div>';
  if (page == 0) {
    html2 += '  <div class="Pagination-button disabled">';
  } else {
    html2 += '  <div class="Pagination-button" onclick="getMyNftListShow(' + (page - 1) + ')">';
  }
  html2 += '      上一页';
  html2 += '  </div>';

  if (page == total - 1 || total == 0) {
    html2 += '  <div class="Pagination-button disabled">';
  } else {
    html2 += '  <div class="Pagination-button" onclick="getMyNftListShow(' + (page + 1) + ')">';
  }
  html2 += '      下一页';
  html2 += '  </div>';
  html2 += '</div>'
  $(".myNftListBox .Pagination").html(html2);

}
function getMyStackNftList() {

  myStackNftListPage = 0;
  var loadHtml = '<div class="flex"><div style="padding:30px;background: rgba(0,0,0,0.7);color:#fff;text-align: center;border-radius: 10px;"><img src="imgs/loading.gif" alt=""><br><div style="margin-top:13px;">加载中...</div></div></div>'
  $(".guoKuNftListBox ul").html(loadHtml);



  if (!checkLogin()) {
    return
  }

  var scope = getCookie("account");

  var api = 'https://' + getRandomApi2();
  // var api = get_random_api();
  var selfData = {
    json: true,
    code: kingContractName,
    scope: scope,
    table: 'stakenft',
    index_position: 4, //3面值  
    key_type: "i64",
    lower_bound: '',
    limit: limit,
    reverse: true,
    show_payer: false,
  }



  $.post(api + "/v1/chain/get_table_rows", JSON.stringify(selfData),
    function(data, status) {


      myStackNftListData.content = [];
      myStackNftListData.more = data["more"];
      myStackNftListData.next_key = data["next_key"];
      for (x in data["rows"]) {
        var obj = data["rows"][x];
        myStackNftListData.content[x] = obj;
        myNftOnkingMsg[x] = obj;
      }
      myStackNftListData.totalElements = data["rows"].length;
      myStackNftListData.size = myStackNftListSize;
      myStackNftListData.totalPages = Math.ceil(data["rows"].length / myStackNftListSize);

      getMyStackNftListShow(myStackNftListPage);



    }, "json");


}
function getMyStackNftListShow(page) {
  // var myStackNftListData = {};
  // var myStackNftListPage = 0;
  // var myStackNftListSize = 12;

  selectUnStackID = [];
  $(".guoKuNftListBox .all").removeClass("active");

  myStackNftListPage = page;
  var data = myStackNftListData;
  var obj = myStackNftListData.content;
  var html = '';
  var html2 = '';
  var loadHtml = '<div class="flex"><div style="padding:30px;background: rgba(0,0,0,0.7);color:#fff;text-align: center;border-radius: 10px;"><img src="imgs/loading.gif" alt=""><br><div style="margin-top:13px;">加载中...</div></div></div>'
  $(".guoKuNftListBox ul").html(loadHtml);

  $.each(obj, function(i, n) {

    if (i >= myStackNftListPage * myStackNftListSize && ((myStackNftListPage + 1) * myStackNftListSize) > i) {

      html += '<li id="UnStackNft_' + n.id + '" onclick="selectMyUnStackNft(' + n.id + ',this)">';
      html += '  <div class="stackNftImgs" style="width:93px;height:93px;background: #181b25;"><img src="' + n.imageUrl + '"></div>';
      html += '  <div class="text">' + parseFloat(n.parvalue) + ' ' + String(n.parvalue).split(" ")[1] + '</div>';
      html += '  <div class="kingText">' + getKingName(n.kingdomid) + '</div>';
      html += '  <div class="nftQualityBox">算力：' + n.power + '</div>';
      html += '  <div class="stackTimeTag"></div>';
      html += '</li>';
      // getNftMsg(n);
      stackTimeTagShow(n.id, n.stacktime);


      // id: 100016
      // imageUrl: "https://xpet-game-1251625178.file.myqcloud.com/imgss/shovellv4.png"
      // kingdomid: 3
      // nftcontract: "xlootshovel1"
      // parvalue: "4.0000 LOOT"
      // power: 83
      // quality: 9686
      // stacktime: "2020-11-27T07:21:26"

    }



  })

  if (html == '' || obj == '') {
    $(".guoKuNftListBox ul").html('<div class="flex" style="color:#e9d9b2;font-size:20px;padding-top: 52px;">你没有可出库的武器</div>');
  } else {
    $(".guoKuNftListBox ul").html(html);
  }
  html2 += '<div class="Pagination-pages">';
  var num = 10,
    startIndex, endIndex, total;
  total = data.totalPages;
  // if (total < num) {
  //   num = total;
  // }
  // if (page > 5) {
  //   if (total <= page + 5) {
  //     startIndex = page - (num - (total - page));
  //     endIndex = startIndex + 10;
  //   } else {
  //     startIndex = page - 5;
  //     endIndex = page + 5;
  //   }
  // } else {
  //   startIndex = 0;
  //   endIndex = num;
  // }
  // for (var i = startIndex; i < endIndex; i++) {
  //   if (i == page) {
  //     html2 += '<div class="Pagination-page active" onclick="getMyNftListShow(' + i + ')">' + (i + 1) + '</div>';
  //   } else {
  //     html2 += '<div class="Pagination-page" onclick="getMyNftListShow(' + i + ')">' + (i + 1) + '</div>';
  //   }
  // }
  // html2 += '</div>';
  html2 += '<div>';
  if (page == 0) {
    html2 += '  <div class="Pagination-button disabled">';
  } else {
    html2 += '  <div class="Pagination-button" onclick="getMyStackNftListShow(' + (page - 1) + ')">';
  }
  html2 += '      上一页';
  html2 += '  </div>';

  if (page == total - 1 || total == 0) {
    html2 += '  <div class="Pagination-button disabled">';
  } else {
    html2 += '  <div class="Pagination-button" onclick="getMyStackNftListShow(' + (page + 1) + ')">';
  }
  html2 += '      下一页';
  html2 += '  </div>';
  html2 += '</div>'
  $(".guoKuNftListBox .Pagination").html(html2);

}

function stackTimeTagShow(id, stackTime) {
  var time = getUTCTime(stackTime);
  if (stackTimer["UnStackNft_" + id]) {
    clearInterval(stackTimer["UnStackNft_" + id]);
  }

  if (time < 0) {
    $("#UnStackNft_" + id + " .stackTimeTag").html("");
  } else {
    stackTimer["UnStackNft_" + id] = setInterval(function() {
      var endTime = getUTCTime(stackTime);
      endTime = 0 - (endTime - 600);
      var m = String(parseInt(endTime / 60 % 60));
      var s = String(parseInt(endTime % 60));
      if (m.length == 1) {
        m = '0' + m;
      }
      if (s.length == 1) {
        s = '0' + s;
      }
      console.log("UnStackNft_" + id, time, stackTime, endTime);
      if (endTime < 0) {
        clearInterval(stackTimer["UnStackNft_" + id]);
        $("#UnStackNft_" + id + " .stackTimeTag").html("");
      } else {
        $("#UnStackNft_" + id + " .stackTimeTag").html(m + ":" + s);
      }
    }, 1000)
  }
}

function getNftMsg(obj) {

  var scope = getCookie("account");
  var contract = obj.nftcontract;
  var tokenid = obj.id;
  var api = get_random_api();
  var selfData = {
    json: true, // Get the response as json
    code: contract, // Contract that we target
    scope: kingContractName, // Account that owns the data
    table: 'tokens', // Table name
    index_position: 1, // Table secondary index
    lower_bound: tokenid, // Table primary key value
    key_type: 'i64',
    limit: 1, // Here we limit to 1 to get only the single row with primary key equal to 'testacc'
    reverse: false, // Optional: Get reversed data
    show_payer: false,
  }

  $.post(api + "/v1/chain/get_table_rows", JSON.stringify(selfData),
    function(data, status) {
      // console.log("nftMsgsjk:",status);
      if (!status) {
        getNftMsg(obj);
      }
      for (x in data["rows"]) {
        var obj = data["rows"][x];
        // console.log(obj,'#UnStackNft_' + obj.id + ' img');

        $('#UnStackNft_' + obj.id + ' .stackNftImgs').html('<img src="' + obj.imageUrl + '">');
        // $('#UnStackNft_' + obj.id + ' .text').html("品质:" + obj.quality);
      }
    }, "json");


}

function selectPanelShow(num, self) {
  $(".navList li").removeClass("active");
  $(self).addClass("active");
  if (num == 0) {
    clearInterval(battlelogTimer);
    getMyNftList();
    $(".myNFT").show();
    $(".sanguo").hide();
    $(".guoKu").hide();
  } else if (num == 1) {

    clearInterval(battlelogTimer);
    battlelogTimer = setInterval(function() {
      getBattleLog();
    }, 3000)
    getKingdomMsg();
    $(".myNFT").hide();
    $(".sanguo").show();
    $(".guoKu").hide();
  } else {
    clearInterval(battlelogTimer);
    getMyStackNftList();
    $(".myNFT").hide();
    $(".sanguo").hide();
    $(".guoKu").show();
  }
}
function selectNftListShow(num, self) {
  $(".nftList li").removeClass("active");
  $(self).addClass("active");
  selectMyNftTagNum = num;
  getMyNftList();
}
function selectMyNftAll() {
  selectStackID = [];
  $(".myNftListBox li").removeClass("active");
  if ($(".myNftListBox .all").hasClass("active")) {
    $(".myNftListBox .all").removeClass("active");
  } else {
    $(".myNftListBox .all").addClass("active");
    $(".myNftListBox li").click();
  }
}
function stacknftBoxShow() {
  selectKing = '';
  $("#stacknftBox .countryList li").removeClass("active");
  if (!checkLogin()) {
    return
  }
  if (selectStackID.length == 0) {
    showMsg("请选择武器");
    return
  }

  // var kingTag = getKingName(1);
  // if(selectKing){
  //   kingTag = getKingName(selectKing);
  // }
  // var money = Number(1.0000 * selectStackID.length).toFixed(4);
  // $("#stacknftBox .stackMsgBox").html("你确定花费"+ money +" eos，上交"+ selectStackID.length +"个武器进库到"+ kingTag +"吗？");

  $("#stacknftBox .stackMsgBox").html("请选择一个国家提交武器");

  $("#stacknftBox").show();
}

function stacknftLevelBoxShow() {
  selectKing = '';
  $("#stacknftBox .countryList li").removeClass("active");

  stacknftLevel();
  // if (selectStackID.length == 0) {
  //   showMsg("请选择武器");
  //   return
  // }


  //调试
  // if (!checkLogin()) {
  //   return
  // }

  // $("#stacknftBox .stackMsgBox").html("请选择一个国家提交武器");

  // $("#stacknftBox").show();
}

function selectMyStackNft(num, self, parvalue) {
  if ($(self).hasClass("active")) {
    $(self).removeClass("active");
    userSelectParvalue -= parvalue;
    var index = selectStackID.indexOf(num);
    selectStackID.splice(index, 1);
  } else {
    $(self).addClass("active");

    var checkExist = false;
    for (var i = 0; i < selectStackID.length; i++) {
      if (selectStackID[i] == num) {
        checkExist = true;
      }
    }
    if (checkExist) {
      return
    }

    userSelectParvalue += parvalue;
    selectStackID.push(num);
    selectStackID.sort(function(a, b) {
      return a - b
    });
  }
  // $(".myNftListBox li").removeClass("active");
  // $(self).addClass("active");
}

function selectStackCountry(num, self) {
  selectKing = num;
  var kingTag = getKingName(selectKing);
  var html = '';
  var parValue = 0;

  var money = Number(1.0000 * selectStackID.length).toFixed(4);
  $(".stackCountryBox .countryList li").removeClass("active");
  $(self).addClass("active");

  if (myknightMsg) {
    if (myknightMsg[selectKing]) {
      parValue = myknightMsg[selectKing].parvalue
    }
  }


  html += '已上交武器总面值：' + Number(parseFloat(parValue)).toFixed(4) + ' LOOT<br>';
  html += '本次上交武器面值：' + Number(userSelectParvalue).toFixed(4) + ' LOOT<br><br>';
  html += '国家总面值超过 200 后，再提交武器到该国家将不会产生算力<br><br>';
  html += "你确定花费" + money + " eos，上交" + selectStackID.length + "个武器进库到" + kingTag + "吗？";

  $("#stacknftBox .stackMsgBox").html(html);

}
function stacknft() {
  if (selectKing == '') {
    showMsg("请选择一个国家提交武器");
    return
  }

  var money = Number(1.0000 * selectStackID.length).toFixed(4);

  var fromUser = getCookie("account");
  var contract = '';
  var eosMemo = "BUYSLOT-" + selectStackID.length + "-" + selectKing;



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

    var contract = '';
    for (var i = 0; i < armsData.length; i++) {
      if (armsData[i].id == selectMyNftTagNum) {
        contract = armsData[i].name;
      }
    }
    $.each(selectStackID, function(i, n) {

      actions[i + 1] = {
        account: contract,
        name: 'transfer',
        authorization: authorization,
        data: {
          id: n,
          from: fromUser,
          to: kingContractName,
          memo: "STACKNFT-" + n + "-" + selectKing
        }
      }

    })

    // console.log("actions:",actions)
    // return

    eos.transaction({
      actions: actions
    }).then(res => {
      showMsg("进库成功！");
      $('#stacknftBox').hide();
      setTimeout(function() {
        getMyNftList();
      }, 3000)


    }).catch(e => {

      eosErrorShow(e);
    });
  })
}
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
function stacknftLevel() {
  if (selectKing == '') {
    showMsg("请选择武器升级");
    return
  }

  var money = Number(1.0000 * selectStackID.length).toFixed(4);

  var data = myNftListData;
  var obj = myNftListData.content;
  var levelObj = [];



  $.each(obj, function(i, n) {
    if (selectStackID == n.id) {
      levelObj[n.id] = n.level;
    }
  })


  console.log("sjkjk:",levelObj);


  checkScatter(function(user) {
    var authorization;
    const eos = loot.scatter.eos(network, Eos);
    const account = user.name;
    authorization = [{
      actor: account,
      permission: user.authority
    }]

    var actions = [];

    var contract = '';
    for (var i = 0; i < armsData.length; i++) {
      if (armsData[i].id == selectMyNftTagNum) {
        contract = armsData[i].name;
      }
    }
    $.each(selectStackID, function(i, n) {

      actions[i] = {
        account: contract,
        name: 'transfer',
        authorization: authorization,
        data: {
          id: n,
          from: fromUser,
          to: kingContractName,
          memo: "UPGRADE-xlootshovel1-" + n + "-" + levelObj[selectStackID]
        }
      }

    })

    // console.log("actions:",actions)
    // return

    eos.transaction({
      actions: actions
    }).then(res => {
      showMsg("进库成功！");
      $('#stacknftBox').hide();
      setTimeout(function() {
        getMyNftList();
      }, 3000)


    }).catch(e => {

      eosErrorShow(e);
    });
  })
}


setTimeout(()=>{
  getMyNftList()
},1000)