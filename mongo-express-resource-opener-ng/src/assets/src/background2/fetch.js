
importScripts(
  './background2/services/storeService2.js'
);

const storeService = new StoreService2();

function getResults() {

  Promise.all([
    storeService._getFromStores(null, true, true)
  ])
  .then((settings) => {
    console.log(settings);
  })
  .catch((error) => console.log(error));

}
