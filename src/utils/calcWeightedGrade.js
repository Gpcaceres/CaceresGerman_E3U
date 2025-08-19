/**
 * Utilidades: calcWeightedGrade y percentile (nearest-rank)
 */

function assertNumber(n, name) {
    if (typeof n !== 'number' || !Number.isFinite(n)) {
    throw new TypeError(`${name} debe ser un número finito`);
    }
}

function round2(n) {
    return Number(n.toFixed(2));
}

/**
 * Calcula una nota final ponderada (0–100) con 2 decimales.
 * items: [{ score: 0..100, weight: 0..1 }], sum(weight) ≈ 1 (±0.001)
 */
function calcWeightedGrade(items) {
    if (!Array.isArray(items)) {
    throw new TypeError('items debe ser un arreglo');
    }
    if (items.length === 0) {
    throw new RangeError('items no puede estar vacío');
    }

    let sumW = 0;
    let acc = 0;

    for (const [idx, it] of items.entries()) {
    if (typeof it !== 'object' || it == null) {
        throw new TypeError(`items[${idx}] debe ser un objeto {score, weight}`);
    }
    const { score, weight } = it;

    assertNumber(score, `items[${idx}].score`);
    assertNumber(weight, `items[${idx}].weight`);

    if (score < 0 || score > 100) {
        throw new RangeError(`items[${idx}].score fuera de rango [0,100]`);
    }
    if (weight < 0 || weight > 1) {
        throw new RangeError(`items[${idx}].weight fuera de rango [0,1]`);
    }

    sumW += weight;
    acc += score * weight;
    }

    if (Math.abs(sumW - 1) > 0.001) {
    throw new RangeError(
        `La suma de los weights debe ser 1±0.001; actual=${sumW}`
    );
    }

    return round2(acc);
}

/**
 * Percentil por método nearest-rank (sin interpolación).
 * p en [0,100]; values: arreglo de números, longitud ≥1.
 * Reglas de borde: p=0 → mínimo; p=100 → máximo.
 */
function percentile(p, values) {
    assertNumber(p, 'p');
    if (!Array.isArray(values)) {
    throw new TypeError('values debe ser un arreglo');
    }
    if (values.length < 1) {
    throw new RangeError('values debe tener al menos 1 elemento');
    }
    if (p < 0 || p > 100) {
    throw new RangeError('p debe estar en el rango [0,100]');
    }

    const nums = values.map((v, i) => {
    assertNumber(v, `values[${i}]`);
    return v;
    });

    const sorted = [...nums].sort((a, b) => a - b);
    const N = sorted.length;

    if (p === 0) return round2(sorted[0]);
    if (p === 100) return round2(sorted[N - 1]);

  const rank = Math.ceil((p / 100) * N); // 1..N
    const idx = Math.max(0, Math.min(N - 1, rank - 1));
    return round2(sorted[idx]);
}

module.exports = {
    calcWeightedGrade,
    percentile,
};
