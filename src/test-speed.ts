import {ContextualCard} from '@faker-js/faker/helpers';
import {readFile} from 'node:fs/promises';
import {simpleSort} from './functions';
import {desc} from './functions/array/simple-sort';

// function generatePerson() {
//   const contextualCard = faker.helpers.contextualCard();
//   return {
//     ...contextualCard,
//     joined: faker.date.past(10),
//   };
// }

// console.time('Generate');
// const personList = Array(100000);
// for (let i = 0; i < 100000; i++) {
//   if (i % 10000 === 0) console.log(i / 1000);
//   personList[i] = generatePerson();
// }
// console.timeEnd('Generate');
// writeFile('person-list.json', JSON.stringify(personList));

async function main() {
  const cards: ContextualCard[] = JSON.parse(
    await readFile('src/person-list.json', 'utf-8')
  );
  console.log(cards[0]);
  console.time('Time to sort other');
  // const sortedCardsOther =
  Array.from(Array(10)).forEach(() => {
    simpleSort(
      cards,
      i => i.name.length,
      desc(i => i.name),
      i => recursivelyCountObjectsPropertiesLetters(i)
    );
  });

  console.timeEnd('Time to sort other');
  console.time('Time to sort');
  // const sortedCards =
  Array.from(Array(10)).forEach(() => {
    simpleSort(
      cards,
      i => i.name.length,
      desc(i => i.name),
      i => recursivelyCountObjectsPropertiesLetters(i)
    );
  });
  console.timeEnd('Time to sort');
  // console.log(
  //   sortedCards.slice(0, 100).map(card => `${card.name.length} ${card.name}`)
  // );
}

main();

function recursivelyCountObjectsPropertiesLetters(item: any): number {
  return Object.keys(item).reduce((count, key) => {
    switch (typeof item[key]) {
      case 'string':
        return count + item[key].length;
      case 'object':
        return recursivelyCountObjectsPropertiesLetters(item[key]);
    }
    return count;
  }, 0);
}
