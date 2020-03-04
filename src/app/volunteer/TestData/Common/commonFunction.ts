
function _strMapToObj(strMap) {
  let obj = Object.create(null);
  for ( let[k, v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

function _mapToJosn(map) {
  return JSON.stringify(_strMapToObj(map));
}


/**
 *map转化为对象（map所有键都是字符串，可以将其转换为对象）
 */
function strMapToObj(strMap) {
  let obj = Object.create(null);
  strMap.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
}
/**
*map转换为json
*/
 function mapToJson(map) {
return JSON.stringify(strMapToObj(map));
}



/**
*对象转换为Map
*/
function   objToStrMap(obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}
 /**
  *json转换为map
  */
 function jsonToMap(jsonStr) {
    return  objToStrMap(JSON.parse(jsonStr));
}

export { mapToJson , jsonToMap };


