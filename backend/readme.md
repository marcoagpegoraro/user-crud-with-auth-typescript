# Quake 3 Arena log parser


> Truth can only be found in one place: the code. <br/>
> -- Robert C. Martin


This project reads a Quake 3 log inside the "resources" folder, line by line, and then transforms the log data into two reports, the first one is a list of games, and each game has a total kill count of the match, the players of the match and a map containing the player name and the kill count of the player.

The second report contains data from all games but only with a map containing the death cause and the number of the deaths in the game.

The reports are printed in the standard output in the json format. 

## Run the project

You need to have NPM installed in your machine to run this project, open this project in your favorite IDE and please run this command in the terminal:
```
npm install
```
and then run:
```
npm run dev
```
if you want to run the unit tests, run this command:
```
npm run test
```

The unit tests covered 100% of the the lines of the app.


#### Example

```
21:42 Kill: 1022 2 22: <world> killed Isgalamido by MOD_TRIGGER_HURT
```
  
_The player "Isgalamido" died because he was wounded and fell from a height enough to kill him._

```
2:22 Kill: 3 2 10: Isgalamido killed Dono da Bola by MOD_RAILGUN
```
  
_The player "Isgalamido" killed the player "Dono da Bola" using the Railgun weapon._
  
Additional notes:

1. When `<world>` kill a player, that player loses -1 kill score.
2. Since `<world>` is not a player, it should not appear in the list of players or in the dictionary of kills.
3. The counter `total_kills` includes player and world deaths.


### Examples (took from the unit test):

#### Grouped information for each match:

```json
[
  "game_1": {
    "total_kills": 21,
    "players": [
      "Dono da Bola",
      "Isgalamido",
      "Oootsimo",
      "Assasinu Credi",
      "Chessus",
      "Zeh",
      "Mal"
    ],
    "kills": {
      "Dono da Bola": 1,
      "Isgalamido": 7,
      "Assasinu Credi": 0,
      "Oootsimo": 4
    }
  }
]
```

#### Grouped death cause information for each match:


```json
[
  "game-1": {
    "kills_by_means": {
      "MOD_TRIGGER_HURT": 7,
      "MOD_ROCKET_SPLASH": 5,
      "MOD_CRUSH": 1,
      "MOD_BFG_SPLASH": 3,
      "MOD_MACHINEGUN": 1,
      "MOD_RAILGUN": 4
    }
  }
]
```