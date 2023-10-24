const audio = {
  Map: new Howl({
    src: './audio/map.mp3',
    html5: true,
    volume: 0.5
  }),
  initBattle: new Howl({
    src: './audio/initBattle.mp3',
    html5: true,
    volume: 0.02
  }),
  battle: new Howl({
    src: 'https://github.com/Paolo-Federle/rpg-game/raw/main/Audio/battle.mp3?raw=true',
    html5: true,
    volume: 0.1
  }),
  tackleHit: new Howl({
    src: './audio/tackleHit.mp3',
    html5: true,
    volume: 0.1
  }),
  fireballHit: new Howl({
    src: './audio/fireballHit.mp3',
    html5: true,
    volume: 0.05
  }),
  initFireball: new Howl({
    src: './audio/initFireball.mp3',
    html5: true,
    volume: 0.1
  }),
  victory: new Howl({
    src: './audio/victory.mp3',
    html5: true,
    volume: 0.5
  })
}