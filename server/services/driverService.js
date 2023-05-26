
var driverModel = require('./driverModel');
var key = '123456789trytryrtyr';
var encryptor = require('simple-encryptor')(key);
 
module.exports.createStudentDBService = (driverDetails) => {
 
 
   return new Promise(function myFn(resolve, reject) {
 
       var driverModelData = new driverModel();
 
       driverModelData.firstname = driverDetails.firstname;
       driverModelData.lastname = driverDetails.lastname;
       driverModelData.email = driverDetails.email;
       driverModelData.password = driverDetails.password;
       var encrypted = encryptor.encrypt(driverDetails.password);
       driverModelData.password = encrypted;
 
       driverModelData.save(function resultHandle(error, result) {
 
           if (error) {
               reject(false);
           } else {
               resolve(true);
           }
       });
 
   });
 
}
 
module.exports.loginuserDBService = (driverDetails)=>
{
   return new Promise(function myFn(resolve, reject)
   {
      driverModel.findOne({ email: driverDetails.email},function getresult(errorvalue, result)
      {
         if(errorvalue)
         {
            reject({status: false, msg: "Invaild Data"});
         }
         else
         {
            if(result !=undefined &&  result !=null)
            {
               var decrypted = encryptor.decrypt(result.password);
 
               if(decrypted== driverDetails.password)
               {
                  resolve({status: true,msg: "Student Validated Successfully"});
               }
               else
               {
                  reject({status: false,msg: "Student Validated failed"});
               }
            }
            else
            {
               reject({status: false,msg: "Student Error Detailssss"});
            }
 
         }
      
      });
      
   });
}