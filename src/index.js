var number = 46899647,
  base = 232;

var constPrime = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37,
  41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101,
  103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173,
  179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251
];


module.exports = function getZerosCount(number, base) {
  var sumForEveryPrime = [];
  var primeFactors = [];


  /* разбиваем число на простые множители*/
  primeFactors = primeFactorize(base);

  /* находим сумму (n/a^k ) для каждого простого множителя */
  for (var i = 0; i < primeFactors.length; i++) {
    var k = 1;
    /* сумма для одного простого множителя*/
    sumForEveryPrime[i] = 0;
    while (number / Math.pow(primeFactors[i], k) > 1) {
      //Math.floor - !округляет в меньшую сторону
      sumForEveryPrime[i] = sumForEveryPrime[i] + Math.floor(number / Math.pow(primeFactors[i], k));
      k++;
    }

    /* делим сумму на количество одинаковых множителей*/
    sumForEveryPrime[i] = Math.floor(sumForEveryPrime[i] / countSameElem(primeFactors, i));
  }


  /*возвращаем минимальную из сумм, деленную на количество одинаковых множителей*/
  return Math.min.apply(null, sumForEveryPrime);
}

/**
* возвращает количество одинаковых элементов для заданного элемента массива
*
* @param {number} arr массив элементов 
* @param {number} j индекс в массиве (именно для этого элемента находим количество равных) 
* @return {number}  количество одинаковых элементов
*/
function countSameElem(arr, j) {

  // количество элементов начинается с 1
  var countSameElem = 1;
  const element = arr[j];

  for (let i = j + 1; i < arr.length; i++) {
    if (element === arr[i]) {
      countSameElem++;
    }
  }

  return countSameElem;
}


/**
 * проверка на простое число
 *
 * @param {number} num число 
 * @return {number} true/false
 */
function isPrime(num) {
  for (var j = 2; j < num; j++) {
    if (num % j == 0) return false;
  }

  return true;
}


/**
 * Находит  массив простых множителей числа
 *
 * @param {number} num число 
 * @return {number} массив простых множителей
 */
function primeFactorize(num) {
  var primeFactors = [];
  var i = 0,
    j = 0;
  var rest = num;
  /* пока не простое число*/
  while (isPrime(rest) != true) {
    /* если при делении на первое простое число в остатке 0*/
    if (rest % constPrime[j] == 0) {
      /* записываем первый простой множитель в массив*/
      primeFactors[i] = constPrime[j];
      /* делим число на этот простой множитель и возвращаем частное от деления */
      rest = rest / constPrime[j];
      i++;

      /* постоянно сбрасываем итератор, чтобы при каждом делении использовать 
       простой множитель - 2*/
      j = 0;

    } else if (constPrime[j] < rest) {
      j++;
    } else {
      break;
    }

  }
  /* также записываем в массив оставшееся частное от деления (оно простое) */
  primeFactors[i] = rest;

  return primeFactors;
}