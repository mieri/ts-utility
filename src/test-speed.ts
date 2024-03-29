import {ContextualCard} from '@faker-js/faker/helpers';
import {readFile} from 'node:fs/promises';
import {simpleSort} from './functions';
import {asc, desc} from './functions/array/simple-sort';
import {AnyObject} from './types';

// import faker from '@faker-js/faker';

// function generatePerson() {
//  const contextualCard = faker.helpers.contextualCard();
//   return {
//     ...contextualCard,
//     joined: faker.date.past(10),
//   };
// }

// console.time('Generate');
// const personList = Array(1000);
// for (let i = 0; i < 1000; i++) {
//   if (i % 10000 === 0) console.log(i / 1000);
//   personList[i] = generatePerson();
// }
// console.timeEnd('Generate');
// writeFile('person-list.json', JSON.stringify(personList));

async function main() {
  const cards: ContextualCard[] = JSON.parse(
    await readFile('person-list.json', 'utf-8')
  );
  console.log(cards[0]);
  console.time('Time to sort other');
  // const sortedCardsOther =
  Array.from(Array(10)).forEach(() => {
    simpleSort(
      cards,
      asc(i => i.name.length),
      desc(i => i.name),
      asc(i => recursivelyCountObjectsPropertiesLetters(i))
    );
  });

  console.timeEnd('Time to sort other');
  console.time('Time to sort');
  // const sortedCards =
  Array.from(Array(10)).forEach(() => {
    simpleSort(
      cards,
      asc(i => i.name.length),
      desc(i => i.name),
      asc(i => recursivelyCountObjectsPropertiesLetters(i))
    );
  });
  console.timeEnd('Time to sort');
  // console.log(
  //   sortedCards.slice(0, 100).map(card => `${card.name.length} ${card.name}`)
  // );
}

main();

function recursivelyCountObjectsPropertiesLetters(item: AnyObject): number {
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
