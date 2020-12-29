// 请求数据层---->from commonjs

/**
 * @msg: 获取昭告信息
 * @param {*}
 * @return {*}
 */
function getContractsList() {
    var api = getRandomApi();
    var selfData = {
        json: true, // Get the response as json
        code: dexContractName, // Contract that we target
        scope: dexContractName, // Account that owns the data
        table: 'contracts', // Table name
        // index_position: 329,          // Table secondary index
        // lower_bound: getCookie("account"), // Table primary key value
        limit: 10, // Here we limit to 1 to get only the single row with primary key equal to 'testacc'
        reverse: false, // Optional: Get reversed data
        show_payer: false,
    }
    $.post(api + "/v1/chain/get_table_rows", JSON.stringify(selfData),
        function(data, status) {
            // var html = '';
            // $("#") = data["rows"];
            for (x in data["rows"]) {

                console.log("sdfff:", data["rows"][x]);
                nftcontract[x] = data["rows"][x];
            }
        }, "json");
}

/**
 * @msg: 获取用户token信息
 * @param {*} name 用户名
 * @return {*}
 */
function getUserToken(name) {

    var api = getRandomApi();
    $.post(api + "/v1/chain/get_currency_balance", '{"code":"eosio.token","symbol":"EOS","account":"' + name + '"}',
        function(data, status) {
            var num = data[0] || "0.00000000";
            $("#userToken").html(num);
        }, "json");
}

/**
 * @msg: 获取链接数据
 * @param {*} api 请求地址
 * @param {*} selfData 请求数据
 * @param {*} fun 回调
 * @return {*}
 */
function getLinkData(api, selfData, fun) {
    $.post(api + "/v1/chain/get_table_rows", JSON.stringify(selfData),
        function(data, status) {
            if (status) {
                fun(data);
            } else {
                console.log("获取不到数据", api, selfData)
                    // getLinkData(api,selfData,fun);
            }
        }, "json"
    );
}

export default {
    getUserToken,
    getContractsList,
    getLinkData
}