import ErrorRepository from '../src/js/ErrorRepository.js';

describe('ErrorRepository', () => {
  let errorRepo;

  beforeEach(() => {
    errorRepo = new ErrorRepository();
  });

  describe('constructor', () => {
    test('should create empty ErrorRepository', () => {
      expect(errorRepo.errors).toBeInstanceOf(Map);
      expect(errorRepo.size).toBe(0);
    });
  });

  describe('addError', () => {
    test('should add error successfully', () => {
      errorRepo.addError(404, 'Not Found');
      expect(errorRepo.size).toBe(1);
      expect(errorRepo.hasError(404)).toBe(true);
      expect(errorRepo.errors.get(404)).toBe('Not Found');
    });

    test('should throw error when adding duplicate code', () => {
      errorRepo.addError(404, 'Not Found');
      expect(() => {
        errorRepo.addError(404, 'Different Description');
      }).toThrow('Ошибка с кодом 404 уже существует');
    });

    test('should throw error when code is not a number', () => {
      expect(() => {
        errorRepo.addError('404', 'Not Found');
      }).toThrow('Код ошибки должен быть числом');
    });

    test('should throw error when description is not a string', () => {
      expect(() => {
        errorRepo.addError(404, 12345);
      }).toThrow('Описание ошибки должно быть строкой');
    });

    test('should add multiple errors', () => {
      errorRepo.addError(404, 'Not Found');
      errorRepo.addError(500, 'Internal Server Error');
      errorRepo.addError(403, 'Forbidden');
      
      expect(errorRepo.size).toBe(3);
      expect(errorRepo.hasError(404)).toBe(true);
      expect(errorRepo.hasError(500)).toBe(true);
      expect(errorRepo.hasError(403)).toBe(true);
    });
  });

  describe('translate', () => {
    beforeEach(() => {
      errorRepo.addError(404, 'Not Found');
      errorRepo.addError(500, 'Internal Server Error');
    });

    test('should return description for existing code', () => {
      expect(errorRepo.translate(404)).toBe('Not Found');
      expect(errorRepo.translate(500)).toBe('Internal Server Error');
    });

    test('should return "Unknown error" for non-existing code', () => {
      expect(errorRepo.translate(999)).toBe('Unknown error');
      expect(errorRepo.translate(0)).toBe('Unknown error');
      expect(errorRepo.translate(-1)).toBe('Unknown error');
    });

    test('should handle various numeric inputs', () => {
      expect(errorRepo.translate(404)).toBe('Not Found');
      expect(errorRepo.translate(500)).toBe('Internal Server Error');
      expect(errorRepo.translate(403)).toBe('Unknown error');
    });
  });

  describe('removeError', () => {
    beforeEach(() => {
      errorRepo.addError(404, 'Not Found');
      errorRepo.addError(500, 'Internal Server Error');
    });

    test('should remove existing error', () => {
      const result = errorRepo.removeError(404);
      expect(result).toBe(true);
      expect(errorRepo.size).toBe(1);
      expect(errorRepo.hasError(404)).toBe(false);
      expect(errorRepo.translate(404)).toBe('Unknown error');
    });

    test('should return false for non-existing error', () => {
      const result = errorRepo.removeError(999);
      expect(result).toBe(false);
      expect(errorRepo.size).toBe(2);
    });

    test('should not affect other errors when removing', () => {
      errorRepo.removeError(404);
      expect(errorRepo.hasError(500)).toBe(true);
      expect(errorRepo.translate(500)).toBe('Internal Server Error');
    });
  });

  describe('hasError', () => {
    beforeEach(() => {
      errorRepo.addError(404, 'Not Found');
    });

    test('should return true for existing error', () => {
      expect(errorRepo.hasError(404)).toBe(true);
    });

    test('should return false for non-existing error', () => {
      expect(errorRepo.hasError(999)).toBe(false);
      expect(errorRepo.hasError(0)).toBe(false);
    });
  });

  describe('size property', () => {
    test('should return 0 for empty repository', () => {
      expect(errorRepo.size).toBe(0);
    });

    test('should return correct size after adding errors', () => {
      errorRepo.addError(404, 'Not Found');
      expect(errorRepo.size).toBe(1);
      
      errorRepo.addError(500, 'Internal Server Error');
      expect(errorRepo.size).toBe(2);
    });

    test('should update size after removing errors', () => {
      errorRepo.addError(404, 'Not Found');
      errorRepo.addError(500, 'Internal Server Error');
      expect(errorRepo.size).toBe(2);
      
      errorRepo.removeError(404);
      expect(errorRepo.size).toBe(1);
    });
  });

  describe('clear', () => {
    test('should clear all errors', () => {
      errorRepo.addError(404, 'Not Found');
      errorRepo.addError(500, 'Internal Server Error');
      expect(errorRepo.size).toBe(2);
      
      errorRepo.clear();
      expect(errorRepo.size).toBe(0);
      expect(errorRepo.translate(404)).toBe('Unknown error');
      expect(errorRepo.translate(500)).toBe('Unknown error');
    });

    test('should work on empty repository', () => {
      expect(() => errorRepo.clear()).not.toThrow();
      expect(errorRepo.size).toBe(0);
    });
  });

  describe('getAllCodes', () => {
    test('should return empty array for empty repository', () => {
      expect(errorRepo.getAllCodes()).toEqual([]);
    });

    test('should return all error codes', () => {
      errorRepo.addError(404, 'Not Found');
      errorRepo.addError(500, 'Internal Server Error');
      errorRepo.addError(403, 'Forbidden');
      
      const codes = errorRepo.getAllCodes();
      expect(codes).toHaveLength(3);
      expect(codes).toContain(404);
      expect(codes).toContain(500);
      expect(codes).toContain(403);
    });
  });

  describe('getAllDescriptions', () => {
    test('should return empty array for empty repository', () => {
      expect(errorRepo.getAllDescriptions()).toEqual([]);
    });

    test('should return all error descriptions', () => {
      errorRepo.addError(404, 'Not Found');
      errorRepo.addError(500, 'Internal Server Error');
      
      const descriptions = errorRepo.getAllDescriptions();
      expect(descriptions).toHaveLength(2);
      expect(descriptions).toContain('Not Found');
      expect(descriptions).toContain('Internal Server Error');
    });
  });

  describe('getAllEntries', () => {
    test('should return empty array for empty repository', () => {
      expect(errorRepo.getAllEntries()).toEqual([]);
    });

    test('should return all entries as [code, description] pairs', () => {
      errorRepo.addError(404, 'Not Found');
      errorRepo.addError(500, 'Internal Server Error');
      
      const entries = errorRepo.getAllEntries();
      expect(entries).toHaveLength(2);
      expect(entries).toContainEqual([404, 'Not Found']);
      expect(entries).toContainEqual([500, 'Internal Server Error']);
    });
  });

  describe('integration tests', () => {
    test('should handle full lifecycle', () => {
      
      expect(errorRepo.size).toBe(0);
      
      
      errorRepo.addError(100, 'Continue');
      errorRepo.addError(200, 'OK');
      errorRepo.addError(300, 'Multiple Choices');
      
      expect(errorRepo.size).toBe(3);
      
      
      expect(errorRepo.translate(100)).toBe('Continue');
      expect(errorRepo.translate(200)).toBe('OK');
      
      
      expect(errorRepo.translate(999)).toBe('Unknown error');
      
      
      errorRepo.removeError(200);
      expect(errorRepo.size).toBe(2);
      expect(errorRepo.translate(200)).toBe('Unknown error');
      
      
      errorRepo.clear();
      expect(errorRepo.size).toBe(0);
      expect(errorRepo.translate(100)).toBe('Unknown error');
    });

    test('should maintain data integrity', () => {
      errorRepo.addError(1, 'Error 1');
      errorRepo.addError(2, 'Error 2');
      errorRepo.addError(3, 'Error 3');
      
      const copy = new ErrorRepository();
      errorRepo.getAllEntries().forEach(([code, desc]) => {
        copy.addError(code, desc);
      });
      
      expect(copy.size).toBe(errorRepo.size);
      expect(copy.translate(1)).toBe('Error 1');
      expect(copy.translate(2)).toBe('Error 2');
      expect(copy.translate(3)).toBe('Error 3');
    });
  });
});