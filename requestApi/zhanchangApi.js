// 战场请求api

/**
 * @msg: 请求获取行动点数据
 * @param {*} api 请求地址
 * @param {*} selfData 请求发送数据
 * @param {*} num 类型
 * @return {*}
 */
function getKnightMsg(api, selfData, num) {
    return new Promise(resolve => {
        $.post(api + "/v1/chain/get_table_rows", JSON.stringify(selfData)).then((data) => resolve(data))
    }).then(function(data) {
        for (const x in data["rows"]) {

            if (data["rows"][x].acc == getCookie("account")) {
                zhanchang.myknightMsg[num] = data["rows"][x];
                // console.log(zhanchang.myknightMsg, 'getMykni')
                var balance = '';
                var times = 0;
                var myMiningAct;
                var proportion;
                $.each(zhanchang.objMsg, function(i, n) {
                        if (n.id == num) {
                            // console.log(n, 'n');
                            balance = (n.totalACT - n.supplyACT) / n.period;
                            proportion = zhanchang.myknightMsg[num].power / n.totalpower;
                        }
                    })
                    // console.log(objMsg[0].period);
                if (getUTCTime(zhanchang.objMsg[0].start) > zhanchang.objMsg[0].period) {
                    times = zhanchang.objMsg[0].period - (getUTCTime(zhanchang.objMsg[0].start) - getUserUTC(zhanchang.myknightMsg[num].lastdriptime))

                } else if (zhanchang.myknightMsg[num].lastdriptime) {
                    times = getUserUTC(zhanchang.myknightMsg[num].lastdriptime);
                }

                myMiningAct = balance * times * proportion;
                // console.log(times, 'times');
                // console.log(balance, 'balance');
                // console.log(myMiningAct, 'act');
                var MiningAct = ''
                MiningAct = new CountUp("callable-action-points", 0, 0.00000000, 8, 3, zhanchang.options)
                    // $('#callable-action-points').html(Number(myMiningAct))
                MiningAct.update(Number(myMiningAct))
            }

            return Promise.resolve();
        }
    })
}

export default {
    getKnightMsg,
}