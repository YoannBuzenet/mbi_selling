//Takes array of objects, returns object structured with ID
function transformPercentPerLangArrayIntoObject(array) {
  var objectToReturn = {};

  if (array) {
    for (let i = 0; i < array.length; i++) {
      const langToCreate = {};

      langToCreate.id = array[i].id;
      langToCreate.percentPerLang = array[i].percent;
      objectToReturn[array[i].language] = langToCreate;
    }
  }

  return objectToReturn;
}

function getLocalStorageSession() {
  const localStorage = JSON.parse(window.localStorage.getItem("userInfos"));

  return localStorage;
}

function saveLocalStorage(nameToUpdate, variable) {
  window.localStorage.setItem(nameToUpdate, JSON.stringify(variable));
}

export default {
  transformPercentPerLangArrayIntoObject,
  getLocalStorageSession,
  saveLocalStorage,
};
