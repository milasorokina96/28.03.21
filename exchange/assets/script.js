// Создать небольшой обмен валют. Перевести гривну в доллар, евро, рубль.
// url https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json


fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    getMoney(data);
    
  });


function getMoney(data) {
  const btnExchange = document.getElementById('btnExchange');
  const form = document.forms.formExchange;
  const uah = form.elements.UAH;
  const select = form.elements.exchange;
  const result = document.getElementById('exchangeResult');

  btnExchange.addEventListener('click', () => {
    data.forEach(function(item){
      if(item.cc === select.value){
        result.innerText = (uah.value / item.rate).toFixed(2) + ' ' + select.value;
      }

    });
    

  });
}
