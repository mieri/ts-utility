import {asc, desc, simpleSort} from './simple-sort';
import json from '../../../assets/pokemon-test-data.json';

describe('simpleSort', () => {
  it('should sort list by whether its type is flying, then by name', () => {
    const result = simpleSort(
      json.pokemon,
      i => (i.type.includes('Flying') ? 1 : 0), // Only accepts methods returning string | number
      i => i.name
    );

    expect(result.slice(0, 10).map(i => `${i.num} ${i.name}`)).toEqual([
      '063 Abra',
      '065 Alakazam',
      '024 Arbok',
      '059 Arcanine',
      '015 Beedrill',
      '069 Bellsprout',
      '009 Blastoise',
      '001 Bulbasaur',
      '010 Caterpie',
      '113 Chansey',
    ]);
  });

  it('should sort list by length of name desc, then by name desc', () => {
    const result = simpleSort(
      json.pokemon,
      [i => i.name.length, 'desc'],
      [i => i.name, 'desc']
    );

    expect(result.slice(0, 10).map(i => `${i.num} ${i.name}`)).toEqual([
      '029 Nidoran ♀ (Female)',
      '032 Nidoran ♂ (Male)',
      '040 Wigglytuff',
      '070 Weepinbell',
      '071 Victreebel',
      '073 Tentacruel',
      '115 Kangaskhan',
      '039 Jigglypuff',
      '107 Hitmonchan',
      "083 Farfetch'd",
    ]);
  });

  it('should return a new array', () => {
    const result = simpleSort(json.pokemon);

    expect(result).not.toBe(json.pokemon);
  });

  it('should sort by name descending', () => {
    const result = simpleSort(json.pokemon, [i => i.name, 'desc']);

    expect(result.slice(0, 10).map(i => i.name)).toEqual([
      'Zubat',
      'Zapdos',
      'Wigglytuff',
      'Weezing',
      'Weepinbell',
      'Weedle',
      'Wartortle',
      'Vulpix',
      'Voltorb',
      'Vileplume',
    ]);
  });

  it('should sort pokemons on first letter of name and then by weight, descending ', () => {
    const result = simpleSort(
      json.pokemon,
      asc(i => i.name[0]), // Names first letter
      desc(i => Number.parseFloat(i.weight)) // Weight
    );

    expect(result.slice(0, 10).map(i => `${i.name} ${i.weight}`)).toEqual([
      'Arcanine 155.0 kg',
      'Arbok 65.0 kg',
      'Aerodactyl 59.0 kg',
      'Articuno 55.4 kg',
      'Alakazam 48.0 kg',
      'Abra 19.5 kg',
      'Blastoise 85.5 kg',
      'Butterfree 32.0 kg',
      'Beedrill 29.5 kg',
      'Bulbasaur 6.9 kg',
    ]);
  });
});
