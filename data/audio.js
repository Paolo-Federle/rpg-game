const audio = {
  Map: new Howl({
    src: 'https://github.com/Paolo-Federle/rpg-game/raw/main/Audio/map.mp3?raw=true',
    html5: true,
    volume: 0.5
  }),
  initBattle: new Howl({
    src: 'https://github.com/Paolo-Federle/rpg-game/raw/main/Audio/initBattle.mp3?raw=true',
    html5: true,
    volume: 0.02
  }),
  battle: new Howl({
    src: 'https://github.com/Paolo-Federle/rpg-game/raw/main/Audio/battle.mp3?raw=true',
    html5: true,
    volume: 0.1
  }),
  tackleHit: new Howl({
    src: 'https://github.com/Paolo-Federle/rpg-game/raw/main/Audio/tackleHit.mp3?raw=true',
    html5: true,
    volume: 0.1
  }),
  fireballHit: new Howl({
    src: 'https://github.com/Paolo-Federle/rpg-game/raw/main/Audio/fireballHit.mp3?raw=true',
    html5: true,
    volume: 0.05
  }),
  initFireball: new Howl({
    src: 'https://github.com/Paolo-Federle/rpg-game/raw/main/Audio/fireballHit.mp3?raw=true',
    html5: true,
    volume: 0.1
  }),
  victory: new Howl({
    src: 'https://github.com/Paolo-Federle/rpg-game/raw/main/Audio/victory.mp3?raw=true',
    html5: true,
    volume: 0.5
  })
}