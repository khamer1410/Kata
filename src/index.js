import "./styles.css";

document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use Parcel to bundle this sandbox, you can find more info about Parcel
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
`;
/*
Treść zadania #01:
- Stwórz funkcję tworzącą promisę o nazwie recursivePromise(arrayOfPromises), którą przyjmuję jako argument listę z promisami
- Na potrzeby zadania zakładamy, że każdy z elementów arrayOfPromises jest promisem i elementów w arrayOfPromises jest minimum 7
- Promisy z listy mają się wywoływać kolejna po zakończeniu poprzedniej, a ostatnia w .then ma zwrócić listę ze wszystkimi wynikami promis z arrayOfPromises zachowując odpowiednią kolejność
- Jeśli wystąpi błąd w którejkolwiek promisie ma on zostać zwrócony do .catch wraz z poprzednimi wynikami z promis
*/

export const mockPromise = (value, error, ms = 500) =>
  new Promise((resolve, reject) => {
    error
      ? setTimeout(() => reject(new Error("promise error")), ms)
      : setTimeout(resolve, ms, value);
  });

export function recursivePromise(promises) {
  if (!promises) throw new Error("promises not provided");

  return new Promise(resolve => {
    const promisesResults = [];

    promises.forEach((promise, index) => {
      promise
        .then(result => {
          promisesResults.push(result);
          index === promises.length && resolve(promisesResults);
        })
        .catch(error => {
          promisesResults.push(error.message);
          resolve(promisesResults);
        });
    });
  });
}
