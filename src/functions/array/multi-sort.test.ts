import {multiSort, sortBy as by, DESC} from './multi-sort';
import json from '../../../assets/pokemon-test-data.json';

describe('multiSort', () => {
  it('should sort list by whether its type is flying, then by name', () => {
    const result = multiSort(
      json.pokemon,
      by.num(i => (i.type.includes('Flying') ? 1 : 0)),
      by.str(i => i.name)
      // Non shorthand version:
      // (a, b) =>
      //   (a.type.includes('Flying') ? 1 : 0) -
      //   (b.type.includes('Flying') ? 1 : 0),
      // (a, b) => a.name.localeCompare(b.name)
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
    const result = multiSort(
      json.pokemon,
      by.num(i => i.name.length, DESC),
      by.str(i => i.name, DESC)
      // Non shorthand version:
      // (a, b) => b.name.length - a.name.length,
      // (a, b) => b.name.localeCompare(a.name)
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

  it('should return new list even when not sorted', () => {
    const result = multiSort(json.pokemon);

    expect(result).not.toBe(json.pokemon);
  });

  it('should sort by name descending', () => {
    const result = multiSort(
      json.pokemon,
      by.str(i => i.name, DESC)
      // Non shorthand version:
      // (a, b) => b.name.localeCompare(a.name)
    );

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
    const result = multiSort(
      json.pokemon,
      by.str(i => i.name[0]),
      by.num(i => Number.parseFloat(i.weight), DESC)
      // Non shorthand version:
      // (a, b) => a.name[0].localeCompare(b.name[0]), // Names first letter
      // (a, b) => Number.parseFloat(b.weight) - Number.parseFloat(a.weight) // Weight
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
