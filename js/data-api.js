/*
 * @Author: your name
 * @Date: 2020-12-25 09:35:50
 * @LastEditTime: 2020-12-29 16:19:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \NFTSANGUO\js\data-api.js
 */


function getStorychapeList(fun) {
    var api = getRandomApi();
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
            console.log(status, 'status');
            console.log(data, 'da');
            storychape(data.rows);
            // fun(data);

            // for (x in data["rows"]) {
            //   console.log("返回的数据块:", data["rows"][x]);
            // }
        }, "json");
}







function getBulltin(fun) {
    var api = getRandomApi();
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

            console.log(data, 'data');
            showPubliclyContent(data.rows)

        }, "json");
}

function getUserTime(name) {
    var api = getRandomApi();
    $.post(api + "/v1/chain/get_currency_balance", '{"code":"xpettimecore" ,"symbol":"TIME","account":"' + name + '"}',
        function(data, status) {
            console.log(data, 'time');
            var num = String(data[0]).split(" ")[0] || "0.0000"; //零的个数取决与代币合约发行的小数精度
            $(".box3-midd").html(num.substring(0, num.indexOf(".") + 5) + " TIME");
        }, "json");
}







$(document).ready(getStorychapeList())
$(document).ready(getBulltin())