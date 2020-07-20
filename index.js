function getHostnamebyIp(ip){
  const MAX_TRIES=10

  const hostnameDispacher = {
    result:null,
    tries:0,
    execute: function () {
      const self = this;
      return new Promise(function (resolve, reject) {
        dns.reverse(ip,(err,hostnames)=>{

          if((empty(hostnames)||hostnames==undefined || err) && self.tries<MAX_TRIES){
            self.tries++;
            self.execute().then(function () {
                resolve(true);
            });
          }   
          else if(self.tries==MAX_TRIES){
            self.result= ({message:"Max tries reached to get hostname (10)", hostname: null})
            resolve(true)
          }
          else{
            self.result= ({hostname: hostnames[0]})
            resolve(true) 
        }
        })
      });
    }
  }

  return new Promise((resolve,reject)=>{
    hostnameDispacher.execute().then(res=>{
      resolve(hostnameDispacher.result)
    })
  })
}

function empty(data){
  if(typeof(data) == 'number' || typeof(data) == 'boolean') return false; 
  if(typeof(data) == 'undefined' || data === null) return true; 
  if(typeof(data.length) != 'undefined') return data.length == 0;
}


//Test 
getHostnameByIp("64.233.160.0").then(res=>{
  console.log(res)
});
