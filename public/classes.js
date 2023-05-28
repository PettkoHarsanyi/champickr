export const classes = {
  "Controller": {
    "counter": [],
    "strongAgainst": []
  },
  "Tank": {
    "name": "Tank",
    "counter": ["Fighter", "Marksman"],
    "strongAgainst": ["Assassin", "Mage"],
  },
  "Assassin": {
    "name": "Assassin",
    "counter": ["Tank", "Fighter"],
    "strongAgainst": ["Mage", "Marksman"],
  },
  "Mage": {
    "name": "Mage",
    "counter": ["Assassin", "Tank"],
    "strongAgainst": ["Marksman", "Fighter"],
  },
  "Marksman": {
    "name": "Marksman",
    "counter": ["Mage", "Assassin"],
    "strongAgainst": ["Fighter", "Tank"]
  },
  "Fighter": {
    "name": "Fighter",
    "counter": ["Marksman", "Mage"],
    "strongAgainst": ["Tank", "Assassin"]
  },
}