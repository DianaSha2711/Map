import demo from './js/app.js';


document.addEventListener('DOMContentLoaded', () => {
  const output = document.getElementById('output');
  const errorRepo = demo();
  
  
  const displayRepo = new ErrorRepository();
  
  
  displayRepo.addError(100, 'Continue');
  displayRepo.addError(200, 'OK');
  displayRepo.addError(301, 'Moved Permanently');
  displayRepo.addError(400, 'Bad Request');
  displayRepo.addError(503, 'Service Unavailable');
  
  
  let html = '<h2>Пример репозитория ошибок:</h2>';
  html += `<p>Всего ошибок: ${displayRepo.size}</p>`;
  html += '<table border="1" style="border-collapse: collapse; width: 100%;">';
  html += '<tr><th>Код ошибки</th><th>Описание</th><th>translate()</th></tr>';
  
  const testCodes = [100, 200, 301, 400, 503, 999];
  
  testCodes.forEach(code => {
    const description = displayRepo.hasError(code) ? displayRepo.errors.get(code) : '—';
    const translation = displayRepo.translate(code);
    const translationClass = translation === 'Unknown error' ? 'unknown' : 'known';
    
    html += `<tr>
      <td style="text-align: center;">${code}</td>
      <td>${description}</td>
      <td class="${translationClass}">${translation}</td>
    </tr>`;
  });
  
  html += '</table>';
  
  html += '<h3>Особенности реализации:</h3>';
  html += '<ul>';
  html += '<li>Используется Map для хранения пар "код-описание"</li>';
  html += '<li>Метод translate() возвращает описание или "Unknown error"</li>';
  html += '<li>Гарантируется уникальность кодов ошибок</li>';
  html += '<li>Проверка типов данных при добавлении ошибок</li>';
  html += '</ul>';
  
  output.innerHTML = html;
});