const Urls = {
  GET: 'https://29.javascript.htmlacademy.pro/kekstagram/data',
  POST: 'https://29.javascript.htmlacademy.pro/kekstagram/',
};

const requestToServer = (method, onSuccess, onFail, body = null, errorMessage) => {
  fetch(Urls[method],
    {
      method: method,
      body,
    }
  ).then((response) => {
    if (response.ok) {
      if (method === 'GET') {
        return response.json();
      } else {
        onSuccess();
      }
    } else {
      onFail(errorMessage);
    }
  })
    .then((data) => {
      if (method === 'GET' && data) {
        onSuccess(data);
      }
    })
    .catch(() => onFail(errorMessage));
};

const getDataFromServer = (onSuccess, onFail) => {
  requestToServer('GET', onSuccess, onFail, null, 'При загрузке данных с сервера произошла ошибка');
};

const sendDataToServer = (onSuccess, onFail, body) => {
  requestToServer('POST', onSuccess, onFail, body, 'Не удалось опубликовать');
};

export { getDataFromServer, sendDataToServer };
