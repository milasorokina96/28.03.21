// Создать небольшой обмен валют. Перевести гривну в доллар, евро, рубль.
// url: 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json',

class Exchange {
  constructor(url, btnExchange, uah, select, result) {
    this.url = url,
    this.btnExchange = btnExchange;
    this.uah = uah;
    this.select = select;
    this.result = result;

    this.getMoney();
  }

  async fetchData(url) {
    const res = await fetch(url);
    const data = await res.json();

    return data;
  }

  getMoney() {
     
    this.btnExchange.addEventListener('click', async () => {
      const data = await this.fetchData(this.url);
    
      if (this.uah.value){

        data.forEach((item) => {

          if(item.cc === this.select.value){

            this.result.innerText = (this.uah.value / item.rate).toFixed(2) + ' ' + this.select.value;
          }
    
        });
      }
  
    });
  }
}

new Exchange(
  'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json',
  document.getElementById('btnExchange'),
  document.forms.formExchange.elements.UAH,
  document.forms.formExchange.elements.exchange,
  document.getElementById('exchangeResult'),
);