/**
 * @msg: 获取首页战争活动信息
 * @param {*} fun
 * @return {*}
 */
function getStorychapeList(fun) {
    console.log(window);
    var api = window.getRandomApi();
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
            // console.log(status, 'status');
            console.log(data, 'da');
            window.storychape(data.rows);
            // fun(data);

            // for (x in data["rows"]) {
            //   console.log("返回的数据块:", data["rows"][x]);
            // }
        }, "json");
}


/**
 * @msg: 首页昭告内容
 * @param {*} fun
 * @return {*}
 */
function getBulltin(fun) {
    var api = window.getRandomApi();
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

            // console.log(data, 'data');
            window.showPubliclyContent(data.rows)

        }, "json");
}


/**
 * @msg: 头部时间获取
 * @param {*} name 用户名
 * @return {*}
 */
function getUserTime(name) {
    var api = window.getRandomApi();
    $.post(api + "/v1/chain/get_currency_balance", '{"code":"xpettimecore" ,"symbol":"TIME","account":"' + name + '"}',
        function(data, status) {
            console.log(data, 'time');
            var num = String(data[0]).split(" ")[0] || "0.0000"; //零的个数取决与代币合约发行的小数精度
            $(".box3-midd").html((/([0-9])+\.([0-9]){4}/g).exec(num)[0] + " TIME");
        }, "json");
}







$(document).ready(() => {
    setTimeout(() => (getStorychapeList(), getBulltin()))
});