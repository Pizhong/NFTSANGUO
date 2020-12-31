//在ajax中使用
// $(document).ready(function(){
//   var selfData = {
//     json: true, // Get the response as json
//     code: "xkingbattle2", // Contract that we target
//     scope: "xkingbattle2", // Account that owns the data
//     table: 'storychape', // Table name
//     // index_position: 329,          // Table secondary index
//     // lower_bound: getCookie("account"), // Table primary key value
//     limit: 10, // Here we limit to 1 to get only the single row with primary key equal to 'testacc'
//     reverse: false, // Optional: Get reversed data
//     show_payer: false,
//   }
//   $.ajax({
//     url:"/get_row",
//     type:"post",
//     async:true,
//     dataType:'json',
//     data: JSON.stringify(selfData),
//     success:function(data){
//         console.log('mock模拟请求成功')
//         console.log(data,'mockData');
//         storychape(data.rows)
//     },
//   })
// })

