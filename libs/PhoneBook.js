var fs = require("fs");

const namePattern = /<(.*?)>/g;
const phonePattern = /\+(.*?)[ \b]/g;
// const replaceNoneDataPattern = /[^\w\s]/gi
const replaceNoneDataPattern = /[^\sA-Za-z0-9\-\.]/g
const replaceNoneDataForPhoneNoPattern = /[^0-9\-]/g

class PhoneBook{
    //----------------------------------------------------
    constructor(){
        this.data = [];
        this.init();
    }
    //----------------------------------------------------
    init(){
        let items = [];
        let rawFile = fs.readFileSync(__dirname+"./../resources/phonebook.txt", "utf-8");

        rawFile.split("\r\n").forEach((item, index)=>{
            this.buildRecord(item+" ", index);
        });

    }
    //----------------------------------------------------
    buildRecord(rawItem, lineNo){

        let names = rawItem.match(namePattern);
        let phoneNos = rawItem.match(phonePattern);
                
        let name = "";
        let phoneNo = "";
        let address = "";

        if(Array.isArray(names) && names.length>0 && names[0].length>2){
            name = names[0].substr(1, names[0].length-2).trim();

            if(name.length==0){
                console.log("line ", lineNo, " Error => name is blank.");
                return;    
            }

        }else{
            console.log("line ", lineNo, " Error => name not found.");
            return;
        }

        if(Array.isArray(phoneNos) && phoneNos.length>0 && phoneNos[0].length>1){
            phoneNo = phoneNos[0].replace(replaceNoneDataForPhoneNoPattern, '');
            // console.log('--'+phoneNo+'--');            
        }else{
            console.log("line ", lineNo, " Error => phone not found.");
            console.log(phoneNos);
            console.log(rawItem);
            console.log("-------------------------------------------");
            return;
        }

        address = rawItem.replace(namePattern, '').replace(phonePattern, '').replace(replaceNoneDataPattern, '').trim();

        if(address.length==0){
            console.log("line ", lineNo, " Error => address not found.");
            return;
        }

        let newItem = new PhoneRecord(name, phoneNo, address);
    
        // console.log(lineNo, newItem);
        this.data.push(newItem);

    }
    //----------------------------------------------------
    get allRecord(){
        return this.data;
    }
    //----------------------------------------------------
    findByName(name){
        return this.data.filter(item=>{
            return (item.name==name);
        });
    }
    //----------------------------------------------------
    findByPhone(phoneNo){
        return this.data.filter((item, index)=>{
            return (item.phoneNo==phoneNo);
        });
    }
    //----------------------------------------------------
    findByPhoneWithResult(phoneNo){
        let result = this.findByPhone(phoneNo);

        if(result.length==0){
            return this.buildResultNotfound(phoneNo);
        }else if(result.length==1){
            return this.buildResult(result[0]);
        }else{
            return this.buildResultMultiple(phoneNo);
        }
    }
    //----------------------------------------------------
    buildResult(item){
        return "Phone => "+item.phoneNo+", Name => "+item.name+", Address => "+item.address;
    }
    //----------------------------------------------------
    buildResultNotfound(phoneNo){
        return "Error => Not found:"+phoneNo;
    }
    //----------------------------------------------------
    buildResultMultiple(phoneNo){
        return "Error => Too many people: "+phoneNo;
    }
    //----------------------------------------------------
}

class PhoneRecord{
    constructor(name="", phoneNo="", address=""){        
        this.name = name;
        this.phoneNo = phoneNo;
        this.address = address;
    }
}

module.exports = PhoneBook;