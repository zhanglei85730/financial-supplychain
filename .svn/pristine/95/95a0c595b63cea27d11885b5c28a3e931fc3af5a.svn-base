class Utils {
  /*
  将json转换为params
   */
  params(json) {
    let paramsString = '';
    for (const k in json) {
      if (json.hasOwnProperty(k)) {
        paramsString += `${k}=${json[k]}&`;
      }
    }
    return paramsString.slice(0, -1);
  }
}

export default new Utils();

