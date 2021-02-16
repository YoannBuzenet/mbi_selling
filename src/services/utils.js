function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function transformArrayIntoDictionnaryWithKey(array, key = "id") {
  var dictionnaryToReturn = {};

  if (array) {
    for (let i = 0; i < array.length; i++) {
      dictionnaryToReturn[array[i][key]] = array[i];
    }
  }

  return dictionnaryToReturn;
}

function compareBySetName(a, b) {
  if (a.mcmname < b.mcmname) {
    return -1;
  }
  if (a.mcmname > b.mcmname) {
    return 1;
  }
  return 0;
}

module.exports = {
  capitalizeFirstLetter,
  transformArrayIntoDictionnaryWithKey,
  compareBySetName,
};
