// Написать асинхронный чат с браузером.
// Научить браузер отвечать через 1-10 секунд после вашего сообщения.
// Ответы генерируются случайным образом из подготовленного массива ответов
// Пользователь может в любой момент прекратить диалог написав сообщение, например, 'Bye'. 
// Тогда браузер должен вежливо попрощаться.


function timeout(sms, time) {
  return new Promise(resolve => {
    setTimeout(() => resolve(sms), time * 1000);
  });

}

function rand(min, max) {
  return Math.floor(Math.random() * max + min);

}

function createBrowserSms(userSms){
  let browserSms;
  if(userSms === 'Bye' || userSms === 'bye') {
    browserSms = 'Bye';
  } else {
    browserSms = [
      'Hello! I am a unicorn',
      'Let dance',
      'I can answer random sms',
      'Okey',
      'I am fine, and you?',
    ][rand(0, 4)];
  }
  return timeout(browserSms, rand(1, 10));
}

async function showBrowserAnswer(userSms) {
  
  let browserSms = await createBrowserSms(userSms); // дождаться выполнения Таймера

  createSms(browserSms, 'red');

}

function createSms(text, color){
  const chatArea = document.getElementById('chatArea');
  const sms = document.createElement('div');
  sms.innerText = text;
  sms.style.color = color;
  chatArea.appendChild(sms);

}

function sendSms() {
  const btnSend = document.getElementById('btnSend');
  btnSend.addEventListener('click', () => {
    const form = document.forms.chatForm;
    const userSms = form.elements.chatSms;

    if(userSms.value){
      createSms(userSms.value, 'blue');
      showBrowserAnswer(userSms.value);

    }

    userSms.value='';

  });
}


sendSms();