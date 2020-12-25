

ScatterJS.plugins(new ScatterEOS());

var chainId , network ;
var nftContractName, dexContractName, saleContractName , blindBoxContractName;
const API_ENDPOINTS2 = [
  'eospush.tokenpocket.pro',
  'eos.blockeden.cn',
  'eos.greymass.com',
  'nodes.get-scatter.com',
  'api.eossweden.se',
];

function get_random_api2() {
  // const index = Math.floor(Math.random() * API_ENDPOINTS2.length);

  var index = getCookie("nodeIndex") || nodeIndex;
  // var node = 'https://'+API_ENDPOINTS2[index];
  var node = API_ENDPOINTS2[index];

  // var node = 'https://api-kylin.eosasia.one';
  console.log(index,node);
  return node;
}

const API_ENDPOINTS = [
  'https://eospush.tokenpocket.pro',
  'https://eos.blockeden.cn',
  'https://eos.greymass.com',
  // 'https://mainnet.meet.one',
  'https://api.eossweden.se',
  // 'https://api.eoslaomao.com'
  // 'https://api-kylin.eosasia.one'
];
  
function get_random_api() {
  const index = Math.floor(Math.random() * API_ENDPOINTS.length);
  return API_ENDPOINTS[index];

}

chainId = 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906';

nftContractName  = 'xlootshovel1';
saleContractName = 'looreception';
dexContractName  = 'xkingbattle2';
blindBoxContractName = 'xpetshovelco';

network = ScatterJS.Network.fromJson({
  blockchain: 'eos',
  host: get_random_api2(),
  protocol: 'https',
  port: 443,
  chainId: chainId
})

var isDev = true;
const EOS_CONFIG = {
  chainId: chainId, // 32 byte (64 char) hex string
  keyProvider: '', // WIF string or array of keys..
  httpEndpoint: 'https://' + get_random_api2(),
  mockTransactions: () => null, // or 'fail'
  expireInSeconds: 3600,
  broadcast: true,
  verbose: isDev,
  debug: isDev, // API and transactions
  sign: true
}


function connectEOS() {
  if (window.ScatterJS) {
    ScatterJS.connect(dexContractName, {
      network
    }).then(connected => {
      console.log("connected", connected)
      if (!connected) return false;
      // ScatterJS.someMethod();
    });
    loot.scatter = window.ScatterJS.scatter;
    window.ScatterJS = null;
    setTimeout(function(){
      eosLogin();
    },1000)
    
  }

}



function getDateRandom() {
  var n = 10000,
    m = 99999
  return Date.now() + parseInt(Math.random() * (n - m + 1) + m);
}


function eosLogin() {
  checkScatter(function(user) {
    pubKeySign(user.name);
    
    currencyBalance(user.name)
    getUserTime(user.name)
  })
}

function exit() {
  setCookie("account",'');
  loot.scatter.forgetIdentity();
  window.location.reload();
}

function getScatter() {
  if (window.scatter) {
    loot.scatter = window.scatter;
  }
  return loot.scatter;
}

function checkScatter(fun) {
  var scatter = getScatter();
  if (scatter) {
    if (scatter.identity) {
      // console.log(scatter.identity);
      const user = loot.scatter.identity.accounts.find(account => account.blockchain === 'eos');
      if (user.publicKey) {
        loot.publicKey = user.publicKey
      }
      loot.bomber = user.name;
      // fun(user.name);
      fun(user);
      // console.log("userMsg:",user);
    } else {
      const requiredFields = {
        accounts: [network]
      };
      if (scatter.getIdentity) {
        scatter.getIdentity(requiredFields).then(identity => {
          var user = '';
          if (getCookie("customerType") == 'BOS' || getCookie("blockchain") == 'BOS') {
            user = identity.accounts.find(account => account.blockchain === 'bos');
          } else {
            user = identity.accounts.find(account => account.blockchain === 'eos');
          }
          if (user.publicKey) {
            loot.publicKey = user.publicKey
          }
          if (isMYKEY()) {
            loot.publicKey = identity.publicKey;
          }
          loot.bomber = user.name;
          // fun(user.name);
          fun(user);
          // console.log("userMsg2:",user);
        }).catch(error => {
          eosErrorShow(error);
        });
      } else {
        showMsg("请打开钱包");
      }
    }
  } else {
    noScatterShow();
  }
}

function pubKeySign(eosName) {
  if (loot.publicKey) {
    eosSign(eosName);
  } else {
    const scatter = getScatter();
    const eos = loot.scatter.eos(network, Eos);
    eos.getAccount(eosName).then(data => {
      const pubKey = data.permissions[0].required_auth.keys[0].key;
      loot.publicKey = pubKey;
      eosSign(eosName);
    });
  }

}





$(function() {
  	connectEOS();

})