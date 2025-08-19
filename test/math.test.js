const { esPrimo, potencia, esPar, promedio } = require('../math');

describe('Pruebas de esPrimo', () => {
  test('2 es primo', () => {
    expect(esPrimo(2)).toBe(true);
  });

  test('4 no es primo', () => {
    expect(esPrimo(4)).toBe(false);
  });

  test('números menores que 2 no son primos', () => {
    expect(esPrimo(1)).toBe(false);
    expect(esPrimo(0)).toBe(false);
    expect(esPrimo(-5)).toBe(false);
  });
});

describe('Pruebas de potencia', () => {
  test('2 elevado a 3 debe ser 8', () => {
    expect(potencia(2, 3)).toBe(8);
  });

  test('5 elevado a 0 debe ser 1', () => {
    expect(potencia(5, 0)).toBe(1);
  });

  test('lanza error si los argumentos no son números', () => {
    expect(() => potencia('2', 3)).toThrow();
  });
});

describe('Pruebas de esPar', () => {
  test('4 es par', () => {
    expect(esPar(4)).toBe(true);
  });

  test('5 no es par', () => {
    expect(esPar(5)).toBe(false);
  });

  test('lanza error si el argumento no es entero', () => {
    expect(() => esPar(3.5)).toThrow();
  });
});

describe('Pruebas de promedio', () => {
  test('promedio de [2, 4, 6] es 4', () => {
    expect(promedio([2, 4, 6])).toBe(4);
  });

  test('lanza error si el arreglo está vacío', () => {
    expect(() => promedio([])).toThrow();
  });

  test('lanza error si no todos son números', () => {
    expect(() => promedio([1, 'a', 3])).toThrow();
  });
});
