export const classes = {
  "controller": {
    "counter": [],
    "strongAgainst": []
  },
  "tank": {
    "name": "tank",
    "counter": ["fighter", "marksman"],
    "strongAgainst": ["assassin", "mage"],
  },
  "assassin": {
    "name": "assassin",
    "counter": ["tank", "fighter"],
    "strongAgainst": ["mage", "marksman"],
  },
  "mage": {
    "name": "mage",
    "counter": ["assassin", "tank"],
    "strongAgainst": ["marksman", "fighter"],
  },
  "marksman": {
    "name": "marksman",
    "counter": ["mage", "assassin"],
    "strongAgainst": ["fighter", "tank"]
  },
  "fighter": {
    "name": "fighter",
    "counter": ["marksman", "mage"],
    "strongAgainst": ["tank", "assassin"]
  },
}