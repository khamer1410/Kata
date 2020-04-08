/*
Treść zadania #01:
- Stwórz funkcję tworzącą promisę o nazwie recursivePromise(arrayOfPromises), którą przyjmuję jako argument listę z promisami
- Na potrzeby zadania zakładamy, że każdy z elementów arrayOfPromises jest promisem i elementów w arrayOfPromises jest minimum 7
- Promisy z listy mają się wywoływać kolejna po zakończeniu poprzedniej, a ostatnia w .then ma zwrócić listę ze wszystkimi wynikami promis z arrayOfPromises zachowując odpowiednią kolejność
- Jeśli wystąpi błąd w którejkolwiek promisie ma on zostać zwrócony do .catch wraz z poprzednimi wynikami z promis
*/
export function recursivePromise(promises) {
  if (!promises) throw new Error("promises not provided");

  return new Promise(async (resolve, reject) => {
    async function recurringTrigger(promises, index, promisesResults = []) {
      try {
        const result = await promises[index];
        promisesResults.push(result);
      } catch (error) {
        promisesResults.push(error.message);
        return reject(promisesResults);
      }

      if (index + 1 < promises.length) {
        recurringTrigger(promises, index + 1, promisesResults);
      } else {
        return resolve(promisesResults);
      }
    }

    // starting point
    recurringTrigger(promises, 0, []);
  });
}

export const mockPromise = (value, error, ms = 500) =>
  new Promise((resolve, reject) => {
    error
      ? setTimeout(() => reject(new Error("promise error")), ms)
      : setTimeout(resolve, ms, value);
  });


