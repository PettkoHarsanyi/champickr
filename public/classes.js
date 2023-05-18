export const classes = {
  "controller": {
    "counter": [],
    "strongAgainst": []
  },
  "tank": {
    "name": "tank",
    "counter": ["fighter", "marksman"],
    "strongAgainst": ["slayer", "mage"],
  },
  "slayer": {
    "name": "slayer",
    "counter": ["tank", "fighter"],
    "strongAgainst": ["mage", "marksman"],
  },
  "mage": {
    "name": "mage",
    "counter": ["slayer", "tank"],
    "strongAgainst": ["marksman", "fighter"],
  },
  "marksman": {
    "name": "marksman",
    "counter": ["mage", "slayer"],
    "strongAgainst": ["fighter", "tank"]
  },
  "fighter": {
    "name": "fighter",
    "counter": ["marksman", "mage"],
    "strongAgainst": ["tank", "slayer"]
  },
}