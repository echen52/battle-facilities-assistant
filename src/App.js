import React, { useState, useMemo } from 'react';
import { TRAINERS, POKEMON } from './data';
import { TRAINERS_HGSS, POKEMON_HGSS } from './data-hgss';
import { TRAINERS_BW, POKEMON_BW } from './data-bw';

// Pokemon National Dex number mapping for sprite URLs
const POKEMON_DEX = {
  'Bulbasaur': 1, 'Ivysaur': 2, 'Venusaur': 3, 'Charmander': 4, 'Charmeleon': 5,
  'Charizard': 6, 'Squirtle': 7, 'Wartortle': 8, 'Blastoise': 9, 'Caterpie': 10,
  'Metapod': 11, 'Butterfree': 12, 'Weedle': 13, 'Kakuna': 14, 'Beedrill': 15,
  'Pidgey': 16, 'Pidgeotto': 17, 'Pidgeot': 18, 'Rattata': 19, 'Raticate': 20,
  'Spearow': 21, 'Fearow': 22, 'Ekans': 23, 'Arbok': 24, 'Pikachu': 25,
  'Raichu': 26, 'Sandshrew': 27, 'Sandslash': 28, 'Nidoran♀': 29, 'Nidorina': 30,
  'Nidoqueen': 31, 'Nidoran♂': 32, 'Nidorino': 33, 'Nidoking': 34, 'Clefairy': 35,
  'Clefable': 36, 'Vulpix': 37, 'Ninetales': 38, 'Jigglypuff': 39, 'Wigglytuff': 40,
  'Zubat': 41, 'Golbat': 42, 'Oddish': 43, 'Gloom': 44, 'Vileplume': 45,
  'Paras': 46, 'Parasect': 47, 'Venonat': 48, 'Venomoth': 49, 'Diglett': 50,
  'Dugtrio': 51, 'Meowth': 52, 'Persian': 53, 'Psyduck': 54, 'Golduck': 55,
  'Mankey': 56, 'Primeape': 57, 'Growlithe': 58, 'Arcanine': 59, 'Poliwag': 60,
  'Poliwhirl': 61, 'Poliwrath': 62, 'Abra': 63, 'Kadabra': 64, 'Alakazam': 65,
  'Machop': 66, 'Machoke': 67, 'Machamp': 68, 'Bellsprout': 69, 'Weepinbell': 70,
  'Victreebel': 71, 'Tentacool': 72, 'Tentacruel': 73, 'Geodude': 74, 'Graveler': 75,
  'Golem': 76, 'Ponyta': 77, 'Rapidash': 78, 'Slowpoke': 79, 'Slowbro': 80,
  'Magnemite': 81, 'Magneton': 82, 'Farfetch\'d': 83, 'Doduo': 84, 'Dodrio': 85,
  'Seel': 86, 'Dewgong': 87, 'Grimer': 88, 'Muk': 89, 'Shellder': 90,
  'Cloyster': 91, 'Gastly': 92, 'Haunter': 93, 'Gengar': 94, 'Onix': 95,
  'Drowzee': 96, 'Hypno': 97, 'Krabby': 98, 'Kingler': 99, 'Voltorb': 100,
  'Electrode': 101, 'Exeggcute': 102, 'Exeggutor': 103, 'Cubone': 104, 'Marowak': 105,
  'Hitmonlee': 106, 'Hitmonchan': 107, 'Lickitung': 108, 'Koffing': 109, 'Weezing': 110,
  'Rhyhorn': 111, 'Rhydon': 112, 'Chansey': 113, 'Tangela': 114, 'Kangaskhan': 115,
  'Horsea': 116, 'Seadra': 117, 'Goldeen': 118, 'Seaking': 119, 'Staryu': 120,
  'Starmie': 121, 'Mr. Mime': 122, 'Scyther': 123, 'Jynx': 124, 'Electabuzz': 125,
  'Magmar': 126, 'Pinsir': 127, 'Tauros': 128, 'Magikarp': 129, 'Gyarados': 130,
  'Lapras': 131, 'Ditto': 132, 'Eevee': 133, 'Vaporeon': 134, 'Jolteon': 135,
  'Flareon': 136, 'Porygon': 137, 'Omanyte': 138, 'Omastar': 139, 'Kabuto': 140,
  'Kabutops': 141, 'Aerodactyl': 142, 'Snorlax': 143, 'Articuno': 144, 'Zapdos': 145,
  'Moltres': 146, 'Dratini': 147, 'Dragonair': 148, 'Dragonite': 149, 'Mewtwo': 150,
  'Mew': 151, 'Chikorita': 152, 'Bayleef': 153, 'Meganium': 154, 'Cyndaquil': 155,
  'Quilava': 156, 'Typhlosion': 157, 'Totodile': 158, 'Croconaw': 159, 'Feraligatr': 160,
  'Sentret': 161, 'Furret': 162, 'Hoothoot': 163, 'Noctowl': 164, 'Ledyba': 165,
  'Ledian': 166, 'Spinarak': 167, 'Ariados': 168, 'Crobat': 169, 'Chinchou': 170,
  'Lanturn': 171, 'Pichu': 172, 'Cleffa': 173, 'Igglybuff': 174, 'Togepi': 175,
  'Togetic': 176, 'Natu': 177, 'Xatu': 178, 'Mareep': 179, 'Flaaffy': 180,
  'Ampharos': 181, 'Bellossom': 182, 'Marill': 183, 'Azumarill': 184, 'Sudowoodo': 185,
  'Politoed': 186, 'Hoppip': 187, 'Skiploom': 188, 'Jumpluff': 189, 'Aipom': 190,
  'Sunkern': 191, 'Sunflora': 192, 'Yanma': 193, 'Wooper': 194, 'Quagsire': 195,
  'Espeon': 196, 'Umbreon': 197, 'Murkrow': 198, 'Slowking': 199, 'Misdreavus': 200,
  'Unown': 201, 'Wobbuffet': 202, 'Girafarig': 203, 'Pineco': 204, 'Forretress': 205,
  'Dunsparce': 206, 'Gligar': 207, 'Steelix': 208, 'Snubbull': 209, 'Granbull': 210,
  'Qwilfish': 211, 'Scizor': 212, 'Shuckle': 213, 'Heracross': 214, 'Sneasel': 215,
  'Teddiursa': 216, 'Ursaring': 217, 'Slugma': 218, 'Magcargo': 219, 'Swinub': 220,
  'Piloswine': 221, 'Corsola': 222, 'Remoraid': 223, 'Octillery': 224, 'Delibird': 225,
  'Mantine': 226, 'Skarmory': 227, 'Houndour': 228, 'Houndoom': 229, 'Kingdra': 230,
  'Phanpy': 231, 'Donphan': 232, 'Porygon2': 233, 'Stantler': 234, 'Smeargle': 235,
  'Tyrogue': 236, 'Hitmontop': 237, 'Smoochum': 238, 'Elekid': 239, 'Magby': 240,
  'Miltank': 241, 'Blissey': 242, 'Raikou': 243, 'Entei': 244, 'Suicune': 245,
  'Larvitar': 246, 'Pupitar': 247, 'Tyranitar': 248, 'Lugia': 249, 'Ho-Oh': 250,
  'Celebi': 251, 'Treecko': 252, 'Grovyle': 253, 'Sceptile': 254, 'Torchic': 255,
  'Combusken': 256, 'Blaziken': 257, 'Mudkip': 258, 'Marshtomp': 259, 'Swampert': 260,
  'Poochyena': 261, 'Mightyena': 262, 'Zigzagoon': 263, 'Linoone': 264, 'Wurmple': 265,
  'Silcoon': 266, 'Beautifly': 267, 'Cascoon': 268, 'Dustox': 269, 'Lotad': 270,
  'Lombre': 271, 'Ludicolo': 272, 'Seedot': 273, 'Nuzleaf': 274, 'Shiftry': 275,
  'Taillow': 276, 'Swellow': 277, 'Wingull': 278, 'Pelipper': 279, 'Ralts': 280,
  'Kirlia': 281, 'Gardevoir': 282, 'Surskit': 283, 'Masquerain': 284, 'Shroomish': 285,
  'Breloom': 286, 'Slakoth': 287, 'Vigoroth': 288, 'Slaking': 289, 'Nincada': 290,
  'Ninjask': 291, 'Shedinja': 292, 'Whismur': 293, 'Loudred': 294, 'Exploud': 295,
  'Makuhita': 296, 'Hariyama': 297, 'Azurill': 298, 'Nosepass': 299, 'Skitty': 300,
  'Delcatty': 301, 'Sableye': 302, 'Mawile': 303, 'Aron': 304, 'Lairon': 305,
  'Aggron': 306, 'Meditite': 307, 'Medicham': 308, 'Electrike': 309, 'Manectric': 310,
  'Plusle': 311, 'Minun': 312, 'Volbeat': 313, 'Illumise': 314, 'Roselia': 315,
  'Gulpin': 316, 'Swalot': 317, 'Carvanha': 318, 'Sharpedo': 319, 'Wailmer': 320,
  'Wailord': 321, 'Numel': 322, 'Camerupt': 323, 'Torkoal': 324, 'Spoink': 325,
  'Grumpig': 326, 'Spinda': 327, 'Trapinch': 328, 'Vibrava': 329, 'Flygon': 330,
  'Cacnea': 331, 'Cacturne': 332, 'Swablu': 333, 'Altaria': 334, 'Zangoose': 335,
  'Seviper': 336, 'Lunatone': 337, 'Solrock': 338, 'Barboach': 339, 'Whiscash': 340,
  'Corphish': 341, 'Crawdaunt': 342, 'Baltoy': 343, 'Claydol': 344, 'Lileep': 345,
  'Cradily': 346, 'Anorith': 347, 'Armaldo': 348, 'Feebas': 349, 'Milotic': 350,
  'Castform': 351, 'Kecleon': 352, 'Shuppet': 353, 'Banette': 354, 'Duskull': 355,
  'Dusclops': 356, 'Tropius': 357, 'Chimecho': 358, 'Absol': 359, 'Wynaut': 360,
  'Snorunt': 361, 'Glalie': 362, 'Spheal': 363, 'Sealeo': 364, 'Walrein': 365,
  'Clamperl': 366, 'Huntail': 367, 'Gorebyss': 368, 'Relicanth': 369, 'Luvdisc': 370,
  'Bagon': 371, 'Shelgon': 372, 'Salamence': 373, 'Beldum': 374, 'Metang': 375,
  'Metagross': 376, 'Regirock': 377, 'Regice': 378, 'Registeel': 379, 'Latias': 380,
  'Latios': 381, 'Kyogre': 382, 'Groudon': 383, 'Rayquaza': 384, 'Jirachi': 385,
  'Deoxys': 386, 'Turtwig': 387, 'Grotle': 388, 'Torterra': 389, 'Chimchar': 390,
  'Monferno': 391, 'Infernape': 392, 'Piplup': 393, 'Prinplup': 394, 'Empoleon': 395,
  'Starly': 396, 'Staravia': 397, 'Staraptor': 398, 'Bidoof': 399, 'Bibarel': 400,
  'Kricketot': 401, 'Kricketune': 402, 'Shinx': 403, 'Luxio': 404, 'Luxray': 405,
  'Budew': 406, 'Roserade': 407, 'Cranidos': 408, 'Rampardos': 409, 'Shieldon': 410,
  'Bastiodon': 411, 'Burmy': 412, 'Wormadam': 413, 'Mothim': 414, 'Combee': 415,
  'Vespiquen': 416, 'Pachirisu': 417, 'Buizel': 418, 'Floatzel': 419, 'Cherubi': 420,
  'Cherrim': 421, 'Shellos': 422, 'Gastrodon': 423, 'Ambipom': 424, 'Drifloon': 425,
  'Drifblim': 426, 'Buneary': 427, 'Lopunny': 428, 'Mismagius': 429, 'Honchkrow': 430,
  'Glameow': 431, 'Purugly': 432, 'Chingling': 433, 'Stunky': 434, 'Skuntank': 435,
  'Bronzor': 436, 'Bronzong': 437, 'Bonsly': 438, 'Mime Jr.': 439, 'Happiny': 440,
  'Chatot': 441, 'Spiritomb': 442, 'Gible': 443, 'Gabite': 444, 'Garchomp': 445,
  'Munchlax': 446, 'Riolu': 447, 'Lucario': 448, 'Hippopotas': 449, 'Hippowdon': 450,
  'Skorupi': 451, 'Drapion': 452, 'Croagunk': 453, 'Toxicroak': 454, 'Carnivine': 455,
  'Finneon': 456, 'Lumineon': 457, 'Mantyke': 458, 'Snover': 459, 'Abomasnow': 460,
  'Weavile': 461, 'Magnezone': 462, 'Lickilicky': 463, 'Rhyperior': 464, 'Tangrowth': 465,
  'Electivire': 466, 'Magmortar': 467, 'Togekiss': 468, 'Yanmega': 469, 'Leafeon': 470,
  'Glaceon': 471, 'Gliscor': 472, 'Mamoswine': 473, 'Porygon-Z': 474, 'Gallade': 475,
  'Probopass': 476, 'Dusknoir': 477, 'Froslass': 478, 'Rotom': 479, 'Uxie': 480,
  'Mesprit': 481, 'Azelf': 482, 'Dialga': 483, 'Palkia': 484, 'Heatran': 485,
  'Regigigas': 486, 'Giratina': 487, 'Cresselia': 488, 'Phione': 489, 'Manaphy': 490,
  'Darkrai': 491, 'Shaymin': 492, 'Arceus': 493, 'Victini': 494, 'Snivy': 495,
  'Servine': 496, 'Serperior': 497, 'Tepig': 498, 'Pignite': 499, 'Emboar': 500,
  'Oshawott': 501, 'Dewott': 502, 'Samurott': 503, 'Patrat': 504, 'Watchog': 505,
  'Lillipup': 506, 'Herdier': 507, 'Stoutland': 508, 'Purrloin': 509, 'Liepard': 510,
  'Pansage': 511, 'Simisage': 512, 'Pansear': 513, 'Simisear': 514, 'Panpour': 515,
  'Simipour': 516, 'Munna': 517, 'Musharna': 518, 'Pidove': 519, 'Tranquill': 520,
  'Unfezant': 521, 'Blitzle': 522, 'Zebstrika': 523, 'Roggenrola': 524, 'Boldore': 525,
  'Gigalith': 526, 'Woobat': 527, 'Swoobat': 528, 'Drilbur': 529, 'Excadrill': 530,
  'Audino': 531, 'Timburr': 532, 'Gurdurr': 533, 'Conkeldurr': 534, 'Tympole': 535,
  'Palpitoad': 536, 'Seismitoad': 537, 'Throh': 538, 'Sawk': 539, 'Sewaddle': 540,
  'Swadloon': 541, 'Leavanny': 542, 'Venipede': 543, 'Whirlipede': 544, 'Scolipede': 545,
  'Cottonee': 546, 'Whimsicott': 547, 'Petilil': 548, 'Lilligant': 549, 'Basculin': 550,
  'Sandile': 551, 'Krokorok': 552, 'Krookodile': 553, 'Darumaka': 554, 'Darmanitan': 555,
  'Maractus': 556, 'Dwebble': 557, 'Crustle': 558, 'Scraggy': 559, 'Scrafty': 560,
  'Sigilyph': 561, 'Yamask': 562, 'Cofagrigus': 563, 'Tirtouga': 564, 'Carracosta': 565,
  'Archen': 566, 'Archeops': 567, 'Trubbish': 568, 'Garbodor': 569, 'Zorua': 570,
  'Zoroark': 571, 'Minccino': 572, 'Cinccino': 573, 'Gothita': 574, 'Gothorita': 575,
  'Gothitelle': 576, 'Solosis': 577, 'Duosion': 578, 'Reuniclus': 579, 'Ducklett': 580,
  'Swanna': 581, 'Vanillite': 582, 'Vanillish': 583, 'Vanilluxe': 584, 'Deerling': 585,
  'Sawsbuck': 586, 'Emolga': 587, 'Karrablast': 588, 'Escavalier': 589, 'Foongus': 590,
  'Amoonguss': 591, 'Frillish': 592, 'Jellicent': 593, 'Alomomola': 594, 'Joltik': 595,
  'Galvantula': 596, 'Ferroseed': 597, 'Ferrothorn': 598, 'Klink': 599, 'Klang': 600,
  'Klinklang': 601, 'Tynamo': 602, 'Eelektrik': 603, 'Eelektross': 604, 'Elgyem': 605,
  'Beheeyem': 606, 'Litwick': 607, 'Lampent': 608, 'Chandelure': 609, 'Axew': 610,
  'Fraxure': 611, 'Haxorus': 612, 'Cubchoo': 613, 'Beartic': 614, 'Cryogonal': 615,
  'Shelmet': 616, 'Accelgor': 617, 'Stunfisk': 618, 'Mienfoo': 619, 'Mienshao': 620,
  'Druddigon': 621, 'Golett': 622, 'Golurk': 623, 'Pawniard': 624, 'Bisharp': 625,
  'Bouffalant': 626, 'Rufflet': 627, 'Braviary': 628, 'Vullaby': 629, 'Mandibuzz': 630,
  'Heatmor': 631, 'Durant': 632, 'Deino': 633, 'Zweilous': 634, 'Hydreigon': 635,
  'Larvesta': 636, 'Volcarona': 637, 'Cobalion': 638, 'Terrakion': 639, 'Virizion': 640,
  'Tornadus': 641, 'Thundurus': 642, 'Reshiram': 643, 'Zekrom': 644, 'Landorus': 645,
  'Kyurem': 646, 'Keldeo': 647, 'Meloetta': 648, 'Genesect': 649
};

const BattleFrontierAssistant = () => {
  const [generation, setGeneration] = useState('gen3'); // 'gen3', 'gen4', or 'gen5'
  const [level, setLevel] = useState(50); // Default to Level 50
  const [selectedTrainer, setSelectedTrainer] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [analysisState, setAnalysisState] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState([]);
  const [expandedSpecies, setExpandedSpecies] = useState(null);

  // Get current generation data
  const currentTrainers = generation === 'gen3' ? TRAINERS : generation === 'gen4' ? TRAINERS_HGSS : TRAINERS_BW;
  const currentPokemon = generation === 'gen3' ? POKEMON : generation === 'gen4' ? POKEMON_HGSS : POKEMON_BW;

  // Alarm sets - Different for each generation
  const ALARMS_1 = generation === 'gen5'
    ? new Set(['Fake Out', 'Quick Attack', 'Mach Punch', 'Bullet Punch', 'Aqua Jet', 'Ice Shard', 'Shadow Sneak', 'Sucker Punch', 'ExtremeSpeed'])
    : new Set(['Sheer Cold', 'Horn Drill', 'Fissure', 'Guillotine', 'Reversal']);
  
  const ALARMS_2 = generation === 'gen5'
    ? new Set(['Rain Dance', 'Hail', 'Trick Room', 'Sunny Day', 'Sandstorm'])
    : new Set(['Swords Dance', 'Dragon Dance', 'Double Team']);
  
  const ALARMS_3 = generation === 'gen5'
    ? new Set(['Counter', 'Mirror Coat', 'Fling'])
    : new Set(['Counter', 'Mirror Coat', 'Psych Up']);
  
  const ALARM_TOTAL = new Set([...ALARMS_1, ...ALARMS_2, ...ALARMS_3]);
  
  const ITEM_ALARM_TOTAL = generation === 'gen3'
    ? new Set(['BrightPowder', 'Lax Incense', 'Quick Claw'])
    : generation === 'gen4'
    ? new Set(['Brightpowder', 'Lax Incense', 'Focus Sash', 'Choice Scarf', 'Quick Claw'])
    : new Set(['Bright Powder', 'Lax Incense', 'Focus Sash', 'Choice Scarf', 'Quick Claw']); // Gen V uses "Bright Powder" with space

  // Get alarm labels based on generation
  const getAlarmLabels = () => {
    if (generation === 'gen5') {
      return {
        alarm1: 'Priority Moves',
        alarm2: 'Weather/Trick Room',
        alarm3: 'Counter/Mirror Coat/Fling'
      };
    } else {
      return {
        alarm1: 'OHKO/Reversal',
        alarm2: 'Setup',
        alarm3: 'Counter/Mirror Coat'
      };
    }
  };

  const alarmLabels = getAlarmLabels();

  // Get trainer list for autocomplete
  const trainerList = useMemo(() => {
    return currentTrainers.map(row => row.name);
  }, [currentTrainers]);

  // Filter trainers based on search
  const filteredTrainers = useMemo(() => {
    if (!searchQuery) return [];
    return trainerList.filter(name => 
      name.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 10);
  }, [trainerList, searchQuery]);

  // Create Pokemon Set object
  const createPokemonSet = (identifier) => {
    const pokemon = currentPokemon.find(p => p.name === identifier);
    if (!pokemon) return null;

    const moveList = [pokemon.move1, pokemon.move2, pokemon.move3, pokemon.move4];
    const hasAlarm = moveList.some(move => ALARM_TOTAL.has(move));
    const hasItemAlarm = ITEM_ALARM_TOTAL.has(pokemon.item);

    return {
      name: pokemon.name,
      entry: pokemon.entry,
      species: pokemon.species,
      instance: pokemon.instance,
      item: pokemon.item,
      nature: pokemon.nature,
      moveList,
      speed: generation === 'gen3' && level === 100 ? pokemon.speed100 : pokemon.speed,
      hasAlarm,
      hasItemAlarm,
      localOdds: 0
    };
  };

  // Generate unique teams
  const generateUniqueTeams = (pokemonList) => {
    const teams = [];
    const n = pokemonList.length;

    for (let i = 0; i < n - 2; i++) {
      for (let j = i + 1; j < n - 1; j++) {
        for (let k = j + 1; k < n; k++) {
          const p1 = pokemonList[i];
          const p2 = pokemonList[j];
          const p3 = pokemonList[k];

          const species = new Set([p1.species, p2.species, p3.species]);
          const items = new Set([p1.item, p2.item, p3.item]);

          if (species.size === 3 && items.size === 3) {
            teams.push([p1, p2, p3]);
          }
        }
      }
    }

    return teams;
  };

  // Calculate alarm probabilities
  // numSelected determines how many pokemon to check:
  // 0 selected -> check all 3 (indices 0,1,2)
  // 1 selected -> check 2 (indices 1,2)
  // 2 selected -> check 1 (index 2)
  const calculateAlarmStats = (teams, numSelected = 0) => {
    let alarm1Counter = 0;
    let alarm2Counter = 0;
    let alarm3Counter = 0;
    let itemAlarmCounter = 0;

    teams.forEach(team => {
      let teammoves = [];
      let teamitems = [];
      
      if (numSelected === 0) {
        // Check all 3 Pokemon
        teammoves = team.flatMap(p => p.moveList);
        teamitems = team.map(p => p.item);
      } else if (numSelected === 1) {
        // Check pokemon at indices 1 and 2
        teammoves = [...team[1].moveList, ...team[2].moveList];
        teamitems = [team[1].item, team[2].item];
      } else if (numSelected === 2) {
        // Check only pokemon at index 2
        teammoves = team[2].moveList;
        teamitems = [team[2].item];
      }
      
      if (teammoves.some(m => ALARMS_1.has(m))) alarm1Counter++;
      if (teammoves.some(m => ALARMS_2.has(m))) alarm2Counter++;
      if (teammoves.some(m => ALARMS_3.has(m))) alarm3Counter++;
      if (teamitems.some(i => ITEM_ALARM_TOTAL.has(i))) itemAlarmCounter++;
    });

    return {
      alarm1: alarm1Counter / teams.length,
      alarm2: alarm2Counter / teams.length,
      alarm3: alarm3Counter / teams.length,
      itemAlarm: itemAlarmCounter / teams.length
    };
  };

  // Start analysis
  const startAnalysis = (trainer) => {
    const trainerRow = currentTrainers.find(row => row.name === trainer);
    if (!trainerRow) return;

    // Entry limits: Gen III has level-based filtering, Gen IV & V are always <=1000
    const entryLimit = generation === 'gen3' ? (level === 100 ? Infinity : 850) : 1000;

    const sets = trainerRow.pokemon
      .map(identifier => createPokemonSet(identifier))
      .filter(p => p && p.entry <= entryLimit);

    const teams = generateUniqueTeams(sets);

    // Calculate local odds for each Pokemon
    sets.forEach(pokemon => {
      const count = teams.filter(team => team.some(p => p.name === pokemon.name)).length;
      pokemon.localOdds = count / (3 * teams.length);
    });

    // Calculate species probabilities
    const speciesMap = {};
    sets.forEach(pokemon => {
      if (!speciesMap[pokemon.species]) {
        speciesMap[pokemon.species] = 0;
      }
      speciesMap[pokemon.species] += pokemon.localOdds;
    });

    const alarmStats = calculateAlarmStats(teams, 0);

    setAnalysisState({
      pokemonList: sets,
      teams,
      speciesMap,
      alarmStats
    });
    setSelectedTrainer(trainer);
    setSearchQuery('');
  };

  // Select a Pokemon
  const selectPokemon = (pokemonSet) => {
    const newSelected = [...selectedPokemon, pokemonSet];
    setSelectedPokemon(newSelected);
    setExpandedSpecies(null);

    // Filter teams - EXCLUDE teams that have any selected species or items
    // This matches Python logic: keep teams where NO pokemon matches the selected ones
    let filteredTeams = analysisState.teams.filter(team =>
      team.every(p => 
        !newSelected.some(selected => 
          p.species === selected.species || p.item === selected.item
        )
      )
    );

    // Recalculate odds using the ORIGINAL pokemonList from the initial analysis
    // This maintains object references that teams use
    const updatedPokemonList = analysisState.pokemonList.map(pokemon => {
      const count = filteredTeams.filter(team => 
        team.some(p => p.name === pokemon.name)
      ).length;
      return {
        ...pokemon,
        localOdds: filteredTeams.length > 0 ? count / (3 * filteredTeams.length) : 0
      };
    });

    // Recalculate species probabilities
    const speciesMap = {};
    updatedPokemonList.forEach(pokemon => {
      if (!speciesMap[pokemon.species]) {
        speciesMap[pokemon.species] = 0;
      }
      speciesMap[pokemon.species] += pokemon.localOdds;
    });

    // Normalize probabilities so they sum to 1.0 (exclude selected species)
    const selectedSpecies = new Set(newSelected.map(p => p.species));
    let totalOdds = 0;
    Object.entries(speciesMap).forEach(([species, odds]) => {
      if (!selectedSpecies.has(species)) {
        totalOdds += odds;
      }
    });
    
    // Normalize the species probabilities
    if (totalOdds > 0) {
      Object.keys(speciesMap).forEach(species => {
        if (!selectedSpecies.has(species)) {
          speciesMap[species] = speciesMap[species] / totalOdds;
        } else {
          speciesMap[species] = 0; // Set selected species to 0
        }
      });
    }

    const alarmStats = filteredTeams.length > 0 ? calculateAlarmStats(filteredTeams, newSelected.length) : {
      alarm1: 0, alarm2: 0, alarm3: 0, itemAlarm: 0
    };

    setAnalysisState({
      ...analysisState,
      pokemonList: updatedPokemonList,
      teams: filteredTeams,
      speciesMap,
      alarmStats
    });
  };

  // Reset analysis
  const reset = () => {
    setSelectedTrainer('');
    setAnalysisState(null);
    setSelectedPokemon([]);
    setExpandedSpecies(null);
  };

  // Change level
  const changeLevel = (newLevel) => {
    setLevel(newLevel);
    // Reset everything when changing level
    reset();
  };

  // Change generation
  const changeGeneration = (newGen) => {
    setGeneration(newGen);
    // Reset everything when changing generation
    setLevel(50); // Gen IV is always level 50
    reset();
  };

  // Get sets for a species
  const getSetsForSpecies = (species) => {
    if (!analysisState) return [];
    
    const sets = analysisState.pokemonList.filter(p => p.species === species);
    const totalOdds = analysisState.speciesMap[species] || 0;
    
    return sets.map(set => ({
      ...set,
      normalizedOdds: totalOdds > 0 ? set.localOdds / totalOdds : 0
    }));
  };

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'monospace', 
      maxWidth: '1200px', 
      margin: '0 auto',
      minHeight: '100vh',
      backgroundColor: '#1a1a2e',
      color: '#eee'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ margin: 0, color: '#eee' }}>Battle Facilities Assistant</h1>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          {/* Generation Selector */}
          <div>
            <span style={{ marginRight: '10px', fontWeight: 'bold' }}>Generation:</span>
            <button
              onClick={() => changeGeneration('gen3')}
              style={{
                padding: '8px 16px',
                marginRight: '5px',
                cursor: 'pointer',
                backgroundColor: generation === 'gen3' ? '#16213e' : '#0f3460',
                color: generation === 'gen3' ? '#00d9ff' : '#eee',
                border: generation === 'gen3' ? '2px solid #00d9ff' : '2px solid #16213e',
                fontFamily: 'monospace',
                fontSize: '14px'
              }}
            >
              Gen III
            </button>
            <button
              onClick={() => changeGeneration('gen4')}
              style={{
                padding: '8px 16px',
                marginRight: '5px',
                cursor: 'pointer',
                backgroundColor: generation === 'gen4' ? '#16213e' : '#0f3460',
                color: generation === 'gen4' ? '#00d9ff' : '#eee',
                border: generation === 'gen4' ? '2px solid #00d9ff' : '2px solid #16213e',
                fontFamily: 'monospace',
                fontSize: '14px'
              }}
            >
              Gen IV
            </button>
            <button
              onClick={() => changeGeneration('gen5')}
              style={{
                padding: '8px 16px',
                cursor: 'pointer',
                backgroundColor: generation === 'gen5' ? '#16213e' : '#0f3460',
                color: generation === 'gen5' ? '#00d9ff' : '#eee',
                border: generation === 'gen5' ? '2px solid #00d9ff' : '2px solid #16213e',
                fontFamily: 'monospace',
                fontSize: '14px'
              }}
            >
              Gen V
            </button>
          </div>
          {/* Level Selector (only for Gen III) */}
          {generation === 'gen3' && (
            <div>
              <span style={{ marginRight: '10px', fontWeight: 'bold' }}>Level:</span>
              <button
                onClick={() => changeLevel(50)}
                style={{
                  padding: '8px 16px',
                  marginRight: '5px',
                  cursor: 'pointer',
                  backgroundColor: level === 50 ? '#16213e' : '#0f3460',
                  color: level === 50 ? '#00d9ff' : '#eee',
                  border: level === 50 ? '2px solid #00d9ff' : '2px solid #16213e',
                  fontFamily: 'monospace',
                  fontSize: '14px'
                }}
              >
                50
              </button>
              <button
                onClick={() => changeLevel(100)}
                style={{
                  padding: '8px 16px',
                  cursor: 'pointer',
                  backgroundColor: level === 100 ? '#16213e' : '#0f3460',
                  color: level === 100 ? '#00d9ff' : '#eee',
                  border: level === 100 ? '2px solid #00d9ff' : '2px solid #16213e',
                  fontFamily: 'monospace',
                  fontSize: '14px'
                }}
              >
                100
              </button>
            </div>
          )}
        </div>
      </div>

      {!analysisState ? (
        <div>
          <h2 style={{ color: '#eee' }}>Select Trainer</h2>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search trainer name..."
              style={{ 
                width: '100%', 
                padding: '10px', 
                fontSize: '16px',
                marginBottom: '10px',
                backgroundColor: '#0f3460',
                color: '#eee',
                border: '2px solid #16213e',
                fontFamily: 'monospace'
              }}
            />
            {filteredTrainers.length > 0 && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                backgroundColor: '#16213e',
                border: '2px solid #0f3460',
                maxHeight: '300px',
                overflowY: 'auto',
                zIndex: 1000
              }}>
                {filteredTrainers.map(trainer => (
                  <div
                    key={trainer}
                    onClick={() => startAnalysis(trainer)}
                    style={{
                      padding: '10px',
                      cursor: 'pointer',
                      borderBottom: '1px solid #0f3460',
                      color: '#eee'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#0f3460'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#16213e'}
                  >
                    {trainer}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ color: '#eee' }}>Trainer: {selectedTrainer}</h2>
            <button onClick={reset} style={{ 
              padding: '8px 16px', 
              cursor: 'pointer',
              backgroundColor: '#0f3460',
              color: '#eee',
              border: '2px solid #16213e',
              fontFamily: 'monospace'
            }}>
              Reset
            </button>
          </div>

          {/* Stats */}
          <div style={{ 
            backgroundColor: '#16213e', 
            padding: '15px', 
            marginBottom: '20px',
            border: '2px solid #0f3460',
            color: '#eee'
          }}>
            <div><strong>Total Sets:</strong> {analysisState.pokemonList.length}</div>
            <div><strong>Total Teams:</strong> {analysisState.teams.length}</div>
            <div style={{ marginTop: '10px' }}>
              <strong>Alarm Probabilities:</strong>
              <div>Alarm 1 ({alarmLabels.alarm1}): {(analysisState.alarmStats.alarm1 * 100).toFixed(2)}%</div>
              <div>Alarm 2 ({alarmLabels.alarm2}): {(analysisState.alarmStats.alarm2 * 100).toFixed(2)}%</div>
              <div>Alarm 3 ({alarmLabels.alarm3}): {(analysisState.alarmStats.alarm3 * 100).toFixed(2)}%</div>
              <div>Item Alarm: {(analysisState.alarmStats.itemAlarm * 100).toFixed(2)}%</div>
            </div>
          </div>

          {/* Selected Pokemon */}
          {selectedPokemon.length > 0 && (
            <div style={{ marginBottom: '20px', color: '#eee' }}>
              <strong>Selected Pokémon:</strong>
              {selectedPokemon.map((p, i) => (
                <span key={i} style={{ marginLeft: '10px' }}>
                  {p.species} (#{p.instance})
                </span>
              ))}
            </div>
          )}

          {/* Species Cards */}
          <h3 style={{ color: '#eee' }}>Pokémon Probabilities (Click to expand)</h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '10px',
            marginBottom: '20px'
          }}>
            {Object.entries(analysisState.speciesMap)
              .sort((a, b) => b[1] - a[1])
              .map(([species, odds]) => {
                const isSelected = selectedPokemon.some(p => p.species === species);
                const canClick = !isSelected && selectedPokemon.length < 3;
                
                // Get Pokemon sprite URL using National Dex number
                const dexNumber = POKEMON_DEX[species];
                const spriteUrl = dexNumber 
                  ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dexNumber}.png`
                  : null;
                
                return (
                  <div
                    key={species}
                    onClick={() => canClick && setExpandedSpecies(species)}
                    style={{
                      padding: '15px',
                      border: '2px solid #0f3460',
                      backgroundColor: isSelected ? '#0f3460' : '#16213e',
                      cursor: canClick ? 'pointer' : 'default',
                      opacity: isSelected ? 0.6 : 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      if (canClick) e.currentTarget.style.backgroundColor = '#0f3460';
                    }}
                    onMouseLeave={(e) => {
                      if (canClick && !isSelected) e.currentTarget.style.backgroundColor = '#16213e';
                    }}
                  >
                    {spriteUrl && (
                      <img 
                        src={spriteUrl} 
                        alt={species}
                        style={{ width: '96px', height: '96px', imageRendering: 'pixelated' }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    )}
                    <div style={{ fontWeight: 'bold', fontSize: '16px', textAlign: 'center', marginTop: spriteUrl ? '5px' : '0', color: '#eee' }}>{species.toUpperCase()}</div>
                    <div style={{ fontSize: '14px', marginTop: '5px', color: '#00d9ff' }}>
                      {(odds * 100).toFixed(2)}%
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Expanded Species Sets */}
          {expandedSpecies && (
            <div style={{ 
              backgroundColor: '#16213e', 
              padding: '20px', 
              border: '2px solid #0f3460',
              marginBottom: '20px'
            }}>
              <h3 style={{ color: '#eee' }}>
                {expandedSpecies.toUpperCase()} - Select Set
                <button 
                  onClick={() => setExpandedSpecies(null)}
                  style={{ 
                    marginLeft: '20px', 
                    padding: '5px 10px',
                    backgroundColor: '#0f3460',
                    color: '#eee',
                    border: '2px solid #16213e',
                    cursor: 'pointer',
                    fontFamily: 'monospace'
                  }}
                >
                  Close
                </button>
              </h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#0f3460', color: '#eee' }}>
                      <th style={{ padding: '8px', border: '1px solid #16213e' }}>⚠️</th>
                      <th style={{ padding: '8px', border: '1px solid #16213e' }}>Instance</th>
                      <th style={{ padding: '8px', border: '1px solid #16213e' }}>Probability</th>
                      <th style={{ padding: '8px', border: '1px solid #16213e' }}>Item</th>
                      <th style={{ padding: '8px', border: '1px solid #16213e' }}>Nature</th>
                      <th style={{ padding: '8px', border: '1px solid #16213e' }}>Move 1</th>
                      <th style={{ padding: '8px', border: '1px solid #16213e' }}>Move 2</th>
                      <th style={{ padding: '8px', border: '1px solid #16213e' }}>Move 3</th>
                      <th style={{ padding: '8px', border: '1px solid #16213e' }}>Move 4</th>
                      <th style={{ padding: '8px', border: '1px solid #16213e' }}>Speed</th>
                      <th style={{ padding: '8px', border: '1px solid #16213e' }}>Select</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getSetsForSpecies(expandedSpecies).map(set => {
                      const hasZeroProbability = set.normalizedOdds === 0;
                      const backgroundColor = hasZeroProbability ? '#0f3460' : (set.hasAlarm || set.hasItemAlarm ? '#3d1f1f' : '#16213e');
                      const textColor = hasZeroProbability ? '#666' : '#eee';
                      
                      return (
                        <tr key={set.name} style={{ backgroundColor, color: textColor }}>
                          <td style={{ padding: '8px', border: '1px solid #0f3460', textAlign: 'center' }}>
                            {(set.hasAlarm || set.hasItemAlarm) ? '⚠️' : ''}
                          </td>
                          <td style={{ padding: '8px', border: '1px solid #0f3460' }}>{set.instance}</td>
                          <td style={{ padding: '8px', border: '1px solid #0f3460', color: hasZeroProbability ? '#666' : '#00d9ff' }}>
                            {(set.normalizedOdds * 100).toFixed(2)}%
                          </td>
                          <td style={{ padding: '8px', border: '1px solid #0f3460' }}>{set.item}</td>
                          <td style={{ padding: '8px', border: '1px solid #0f3460' }}>{set.nature}</td>
                          <td style={{ padding: '8px', border: '1px solid #0f3460' }}>{set.moveList[0]}</td>
                          <td style={{ padding: '8px', border: '1px solid #0f3460' }}>{set.moveList[1]}</td>
                          <td style={{ padding: '8px', border: '1px solid #0f3460' }}>{set.moveList[2]}</td>
                          <td style={{ padding: '8px', border: '1px solid #0f3460' }}>{set.moveList[3]}</td>
                          <td style={{ padding: '8px', border: '1px solid #0f3460' }}>{set.speed}</td>
                          <td style={{ padding: '8px', border: '1px solid #0f3460', textAlign: 'center' }}>
                            <button 
                              onClick={() => selectPokemon(set)}
                              style={{ 
                                padding: '5px 10px', 
                                cursor: hasZeroProbability ? 'not-allowed' : 'pointer',
                                opacity: hasZeroProbability ? 0.5 : 1,
                                backgroundColor: '#0f3460',
                                color: '#eee',
                                border: '1px solid #16213e',
                                fontFamily: 'monospace'
                              }}
                              disabled={hasZeroProbability}
                            >
                              Select
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {selectedPokemon.length === 3 && (
            <div style={{ 
              backgroundColor: '#1f3a2e', 
              padding: '20px', 
              border: '2px solid #2ecc71',
              textAlign: 'center',
              color: '#eee'
            }}>
              <h3 style={{ color: '#2ecc71' }}>Analysis Complete!</h3>
              <p>You have identified all three Pokémon in the opponent's team.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BattleFrontierAssistant;
