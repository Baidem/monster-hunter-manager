/*
{
    "id": 1,
    "type": "head",
    "rank": "low",
    "rarity": 1,
    "defense": {
        "base": 2,
        "max": 38,
        "augmented": 68
    },
    "resistances": {
        "fire": 2,
        "water": 0,
        "ice": 0,
        "thunder": 0,
        "dragon": 0
    },
    "attributes": {},
    "name": "Leather Headgear",
    "slots": [],
    "skills": [
        {
            "id": 207,
            "level": 1,
            "modifiers": {},
            "description": "Extends the time until your stamina cap decreases by 50%.",
            "skill": 67,
            "skillName": "Hunger Resistance"
        }
    ],
    "armorSet": {
        "id": 1,
        "rank": "low",
        "name": "Leather",
        "pieces": [
            1,
            2,
            3,
            4,
            5
        ],
        "bonus": null
    },
    "assets": {
        "imageMale": "https://assets.mhw-db.com/armor/e7cfa0acf10c8439b78639a0f59c2eb9ee9e2923.c8685d97610f608eae4850d6f53b9226.png",
        "imageFemale": "https://assets.mhw-db.com/armor/33c032e75365c3d3ee4ee7365395fb1bca1e22c3.d3343d2b227e3b9be99d001ad09ba31f.png"
    },
    "crafting": {
        "materials": [
            {
                "quantity": 2,
                "item": {
                    "id": 116,
                    "rarity": 4,
                    "carryLimit": 99,
                    "value": 60,
                    "name": "Iron Ore",
                    "description": "Ore that can be smelted into metal and used for many different purposes."
                }
            }
        ]
    }
}
*/
// ARMOR HTTP INTERFACE
export interface ArmorHttp {
  id: number;
  type: string;
  rank: string;
  rarity: number;
  defense: {
    base: number;
    max: number;
    augmented: number;
  };
  resistances: {
    fire: number;
    water: number;
    ice: number;
    thunder: number;
    dragon: number;
  };
  attributes: {};
  name: string;
  slots: { rank: number }[];
  skills: {
    id: number;
    level: number;
    modifiers: {};
    description: string;
    skill: number;
    skillName: string;
  }[];
  armorSet: {
    id: number;
    rank: string;
    name: string;
    pieces: number[];
    bonus: null | string;
  };
  assets: {
    imageMale: string | null;
    imageFemale: string | null
  } | null;
  crafting: {
    materials: {
      quantity: number;
      item: {
        id: number;
        rarity: number;
        carryLimit: number;
        value: number;
        name: string;
        description: string;
      };
    }[];
  };
};
// ARMOR INTERFACE
export interface Armor {
  id: number;
  type: string;
  rank: string;
  rarity: number;
  name: string;
  defense: {
    base: number;
    max: number;
    augmented: number;
  };
  resistances: {
    fire: number;
    water: number;
    ice: number;
    thunder: number;
    dragon: number;
  };
  armorSet: {
    id: number;
    rank: string;
    name: string;
    pieces: number[];
    bonus: null | string;
  };
  imageMale: string | null
  imageFemale: string | null
};
// ARMOR FORM INTERFACE
export interface ArmorForm {
  type: string;
  rank: string;
  rarity: number;
  name: string;
  armorSetId: number;
  imageMale: string | null
  imageFemale: string | null
};
// ARMOR NAMESPACE
export namespace Armor {
  export function mapperArmorHttpToArmor(armorHttp: ArmorHttp): Armor {
    let mapperImageMale = null;
    let mapperImageFemal = null;
    if (armorHttp.assets !== null) {
      mapperImageMale = armorHttp.assets.imageMale
      mapperImageFemal = armorHttp.assets.imageFemale
    }
    return {
      id: armorHttp.id,
      type: armorHttp.type,
      rank: armorHttp.rank,
      rarity: armorHttp.rarity,
      name: armorHttp.name,
      defense: {
        base: armorHttp.defense.base,
        max: armorHttp.defense.max,
        augmented: armorHttp.defense.augmented
      },
      resistances: {
        fire: armorHttp.resistances.fire,
        water: armorHttp.resistances.water,
        ice: armorHttp.resistances.ice,
        thunder: armorHttp.resistances.thunder,
        dragon: armorHttp.resistances.dragon
      },
      armorSet: {
        id: armorHttp.armorSet.id,
        rank: armorHttp.armorSet.rank,
        name: armorHttp.armorSet.name,
        pieces: armorHttp.armorSet.pieces,
        bonus: armorHttp.armorSet.bonus
      },
      imageMale: mapperImageMale,
      imageFemale: mapperImageFemal,
    };
  };
};
