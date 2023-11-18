/*
{
  "id": 1,
  "rank": "low",
  "name": "Leather",
  "pieces": [
    {
      "id": 1,
      "type": "head",
      "rank": "low",
      "rarity": 1,
      "attributes": {},
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
      "name": "Leather Headgear",
      "slots": [],
      "skills": [
        {
          "id": 207,
          "level": 1,
          "modifiers": {},
          "skill": 67,
          "description": "Extends the time until your stamina cap decreases by 50%.",
          "skillName": "Hunger Resistance"
        }
      ],
      "armorSet": 1,
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
      "bonus": null
  },
*/
// ARMOR SETS HTTP INTERFACE
export interface ArmorSetsHttp {
  id: number;
  rank: string;
  name: string;
  pieces: any[];
};
// ARMOR SETS INTERFACE
export interface ArmorSets {
  id: number;
  name: string;
  rank: string;
  pieces: string[];
};
// ARMOR SETS FORM INTERFACE
export interface ArmorSetsForm {
  name: string;
  rank: string;
};
// ARMOR SETS NAMESPACE
export namespace ArmorSets {
  export function mapperArmorSetsHttpToArmorSets(armorSetsHttp: ArmorSetsHttp): ArmorSets {
    let pieceList: string[] = ["re", "dqs"];
    for (let index = 0; index < armorSetsHttp.pieces.length; index++) {
      pieceList[index] = ` id: ${armorSetsHttp.pieces[index].id} name: ${armorSetsHttp.pieces[index].name}`;
    }
    return {
      id: armorSetsHttp.id,
      name: armorSetsHttp.name,
      rank: armorSetsHttp.rank,
      pieces: pieceList,
    };
  };
};
