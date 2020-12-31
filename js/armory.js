/*
 * @Author: your name
 * @Date: 2020-12-31 11:32:17
 * @LastEditTime: 2020-12-31 16:27:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nftsango2.xloot.io\js\armory.js
 */
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
      html += '  <div class="kingText">' + zhanchang.getKingName(n.kingdomid) + '</div>';
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

function unStacknftBoxShow() {
  if (!checkLogin()) {
    return
  }
  if (selectUnStackID.length == 0) {
    showMsg("请选择武器");
    return
  }

  // var kingTag = 'A国家';
  // if(selectKing == 2){
  //   kingTag = 'B国家';
  // }else if(selectKing == 3){
  //   kingTag = 'C国家';
  // }
  // var money = Number(0.0001 * selectUnStackID.length).toFixed(4);
  $("#unStacknftBox .stackMsgBox").html("你确定出库" + selectUnStackID.length + "个武器吗？");

  $("#unStacknftBox").show();
}
function selectMyStackNftAll() {
  selectUnStackID = [];
  $(".guoKuNftListBox li").removeClass("active");
  if ($(".guoKuNftListBox .all").hasClass("active")) {
    $(".guoKuNftListBox .all").removeClass("active");
  } else {
    $(".guoKuNftListBox .all").addClass("active");
    $(".guoKuNftListBox li").click();
  }
}









