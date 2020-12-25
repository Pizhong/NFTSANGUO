

function getStorychapeList(fun){
	var api = get_random_api();
	var selfData = {
	    json: true, // Get the response as json
	    code: "xkingbattle2", // Contract that we target
	    scope: "xkingbattle2", // Account that owns the data
	    table: 'storychape', // Table name
	    // index_position: 329,          // Table secondary index
	    // lower_bound: getCookie("account"), // Table primary key value
	    limit: 10, // Here we limit to 1 to get only the single row with primary key equal to 'testacc'
	    reverse: false, // Optional: Get reversed data
	    show_payer: false,
  	}
   $.post(api + "/v1/chain/get_table_rows", JSON.stringify(selfData),
    function(data, status) {

      console.log(data,'da');
      storychape(data.rows);
      // fun(data);
      
      // for (x in data["rows"]) {
      //   console.log("返回的数据块:", data["rows"][x]);
      // }
    }, "json"); 	
}







function getBulltin(fun){
	var api = get_random_api();
	var selfData = {
	    json: true, // Get the response as json
	    code: "xkingbattle2", // Contract that we target
	    scope: "xkingbattle2", // Account that owns the data
	    table: 'bulltin', // Table name
	    // index_position: 329,          // Table secondary index
	    // lower_bound: getCookie("account"), // Table primary key value
	    limit: 10, // Here we limit to 1 to get only the single row with primary key equal to 'testacc'
	    reverse: false, // Optional: Get reversed data
	    show_payer: false,
  	}
   $.post(api + "/v1/chain/get_table_rows", JSON.stringify(selfData),
    function(data, status) {

      console.log(data,'data');
      showPubliclyContent(data.rows)
     
    }, "json"); 	
}

function getUserTime(name){
  var api = get_random_api() ;
  $.post(api + "/v1/chain/get_currency_balance",'{"code":"xpettimecore" ,"symbol":"TIME","account":"'+ name +'"}',
  function(data,status){
    console.log(data,'time');
    var num = String(data[0]).split(" ")[0] || "0.0000";//零的个数取决与代币合约发行的小数精度
    $(".box3-midd").html(num.substring(0,s.indexOf(".")+7)+" TIME");
  }, "json");
}







$(document).ready(getStorychapeList())
$(document).ready(getBulltin())