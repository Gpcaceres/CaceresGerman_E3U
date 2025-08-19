const { calcWeightedGrade, percentile } = require('../src/utils');

describe('calcWeightedGrade', () => {
test('caso de referencia: 80@0.4 + 90@0.6 = 86.00', () => {
    const r = calcWeightedGrade([
        { score: 80, weight: 0.4 },
        { score: 90, weight: 0.6 },
    ]);
    expect(r).toBeCloseTo(86.0, 2);
    });

    test('tolera suma de weights dentro de ±0.001', () => {
    const r = calcWeightedGrade([
        { score: 100, weight: 0.5005 },
        { score: 80, weight: 0.4995 },
    ]);
    // 100*0.5005 + 80*0.4995 = ~90.01
    expect(r).toBeCloseTo(90.01, 2);
    });

    test('lanza RangeError si suma de weights fuera de tolerancia', () => {
        expect(() =>
        calcWeightedGrade([
        { score: 80, weight: 0.5 },
        { score: 90, weight: 0.6 },
    ])
    ).toThrow(RangeError);
    });

    test('valida rangos score/weight', () => {
    expect(() =>
    calcWeightedGrade([{ score: -1, weight: 1 }])
    ).toThrow(RangeError);
    expect(() =>
        calcWeightedGrade([{ score: 50, weight: 1.2 }])
    ).toThrow(RangeError);
    });

    test('valida tipos', () => {
    expect(() => calcWeightedGrade('x')).toThrow(TypeError);
    expect(() => calcWeightedGrade([])).toThrow(RangeError);
    expect(() =>
    calcWeightedGrade([{ score: '90', weight: 1 }])
    ).toThrow(TypeError);
    expect(() =>
    calcWeightedGrade([{ score: 90, weight: NaN }])
    ).toThrow(TypeError);
    });
});

describe('percentile (nearest-rank)', () => {
    test('bordes: p=0 → min; p=100 → max', () => {
    expect(percentile(0, [1, 2, 3])).toBeCloseTo(1.0, 2);
    expect(percentile(100, [1, 2, 3])).toBeCloseTo(3.0, 2);
});

    test('caso de referencia: p=50 en [1,2,3,4] → 2.00', () => {
    expect(percentile(50, [1, 2, 3, 4])).toBeCloseTo(2.0, 2);
    });

    test('orden y duplicados', () => {
    expect(percentile(75, [10, 10, 20, 30])).toBeCloseTo(30.0, 2);
    expect(percentile(25, [3, 1, 2, 2])).toBeCloseTo(2.0, 2);
});

    test('valida tipos y rangos', () => {
    expect(() => percentile(-1, [1])).toThrow(RangeError);
    expect(() => percentile(101, [1])).toThrow(RangeError);
    expect(() => percentile(50, [])).toThrow(RangeError);
    expect(() => percentile(50, 'x')).toThrow(TypeError);
    expect(() => percentile(50, [1, 'a'])).toThrow(TypeError);
    });

    test('decimales se redondean a 2', () => {
    expect(percentile(50, [1.005, 2.005, 3.005, 4.005])).toBeCloseTo(2.01, 2);
    });
});
