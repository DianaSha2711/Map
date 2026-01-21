import ErrorRepository from './ErrorRepository.js';

/**
 * 
 * @returns {ErrorRepository} 
 */
export default function demo() {
  const errorRepo = new ErrorRepository();
  
  console.log('Демонстрация работы ErrorRepository с использованием Map');
  console.log('====================================================\n');
  

  try {
    errorRepo.addError(404, 'Not Found');
    console.log('✓ Добавлена ошибка: 404 - Not Found');
    
    errorRepo.addError(500, 'Internal Server Error');
    console.log('✓ Добавлена ошибка: 500 - Internal Server Error');
    
    errorRepo.addError(403, 'Forbidden');
    console.log('✓ Добавлена ошибка: 403 - Forbidden');
    
    errorRepo.addError(401, 'Unauthorized');
    console.log('✓ Добавлена ошибка: 401 - Unauthorized');
  } catch (error) {
    console.log(`✗ Ошибка при добавлении: ${error.message}`);
  }
  
  console.log(`\nВсего ошибок в репозитории: ${errorRepo.size}`);
  
  
  console.log('\nТестирование метода translate():');
  console.log('-----------------------------');
  
  const testCodes = [404, 500, 999, 403, 401, 0];
  
  testCodes.forEach(code => {
    const description = errorRepo.translate(code);
    console.log(`Код ${code}: ${description}`);
  });
  
  
  console.log('\nДополнительные методы:');
  console.log('---------------------');
  
  console.log(`Проверка наличия ошибки 404: ${errorRepo.hasError(404)}`);
  console.log(`Проверка наличия ошибки 999: ${errorRepo.hasError(999)}`);
  
  console.log('\nВсе коды ошибок:', errorRepo.getAllCodes());
  console.log('Все описания ошибок:', errorRepo.getAllDescriptions());
  
  console.log('\nВсе ошибки (пары код-описание):');
  errorRepo.getAllEntries().forEach(([code, desc]) => {
    console.log(`  ${code}: ${desc}`);
  });
  
  
  console.log('\nУдаление ошибки 403:');
  const removed = errorRepo.removeError(403);
  console.log(`Удалено: ${removed}, теперь размер: ${errorRepo.size}`);
  console.log(`Код 403 после удаления: "${errorRepo.translate(403)}"`);
  
  
  console.log('\nОчистка репозитория...');
  errorRepo.clear();
  console.log(`Размер после очистки: ${errorRepo.size}`);
  console.log(`Код 404 после очистки: "${errorRepo.translate(404)}"`);
  
  return errorRepo;
}