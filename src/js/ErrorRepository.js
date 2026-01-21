/**

 * @class 
 */
export default class ErrorRepository {
  /**
   
   */
  constructor() {
    /**
     
     * @type {Map<number, string>}
     */
    this.errors = new Map();
  }

  /**
   * 
   * @param {number} code 
   * @param {string} description 
   * @throws {Error} 
   */
  addError(code, description) {
    if (this.errors.has(code)) {
      throw new Error(`Ошибка с кодом ${code} уже существует`);
    }
    if (typeof code !== 'number') {
      throw new Error('Код ошибки должен быть числом');
    }
    if (typeof description !== 'string') {
      throw new Error('Описание ошибки должно быть строкой');
    }
    this.errors.set(code, description);
  }

  /**
   * 
   * @param {number} code 
   * @returns {string} 
   */
  translate(code) {
    return this.errors.has(code) ? this.errors.get(code) : 'Unknown error';
  }

  /**
   * 
   * @param {number} code 
   * @returns {boolean} 
   */
  removeError(code) {
    return this.errors.delete(code);
  }

  /**
   *
   * @param {number} code 
   * @returns {boolean} 
   */
  hasError(code) {
    return this.errors.has(code);
  }

  /**
   
   * @returns {number} 
   */
  get size() {
    return this.errors.size;
  }

  /**
  
   */
  clear() {
    this.errors.clear();
  }

  /**
   
   * @returns {Array<number>} 
   */
  getAllCodes() {
    return Array.from(this.errors.keys());
  }

  /**
   
   * @returns {Array<string>} 
   */
  getAllDescriptions() {
    return Array.from(this.errors.values());
  }

  /**
   
   * @returns {Array<[number, string]>} 
   */
  getAllEntries() {
    return Array.from(this.errors.entries());
  }
}