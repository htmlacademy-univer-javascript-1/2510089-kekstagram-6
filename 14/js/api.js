const Urls = {
  GET: 'https://29.javascript.htmlacademy.pro/kekstagram/data',
  POST: 'https://29.javascript.htmlacademy.pro/kekstagram',
};

const getDataFromServer = (onSuccess, onFail) => {
  fetch(Urls.GET)
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .then((photos) => onSuccess(photos))
    .catch(() => onFail('При загрузке данных с сервера произошла ошибка'));
};

const sendDataToServer = (onSuccess, onFail, body) => {
  fetch(Urls.POST,
    {
      method: 'POST',
      body,
    }
  ).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onFail('Не удалось опубликовать');
    }
  })
    .catch(() => onFail('Не удалось опубликовать'));
};

export { getDataFromServer, sendDataToServer };
