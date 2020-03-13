const defaultEncodeString = "WUB";

function StringDecoder(data, decodeString=null){

    let encodeString = decodeString ? decodeString : defaultEncodeString;
    let pattern = new RegExp(encodeString, "g");
    let result = data.replace(pattern, " ").replace(/\s\s+/g, ' ').trim();

    return result;
}

module.exports = StringDecoder