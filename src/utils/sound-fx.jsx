import React, { Component } from 'react';

export class EnemyAttackFX extends Component {
  render() {
    return (
      <audio
        src="/resources/music/swipe.mp3"
        name="media"
        type="audio/mpeg"
        controls
        autoPlay
      />
    );
  }
}

export class HeroAttackFX extends Component {
  render() {
    return (
      <audio
        src="/resources/music/sword-slash.mp3"
        name="media"
        type="audio/mp3"
        controls
        autoPlay
      />
    );
  }
}

export class NormalBattleMusic extends Component {
  render() {
    return (
      <audio
        src="/resources/music/better-battle.m4a"
        name="media"
        type="audio/mpeg"
        controls
        autoPlay
      />
    );
  }
}

export class BattleVictoryMusic extends Component {
  render() {
    return (
      <audio
        src="/resources/music/1-06 Victory Fanfare.mp3"
        name="media"
        type="audio/mpeg"
        controls
        autoPlay
      />
    );
  }
}

export class FireMagicFX extends Component {
  render() {
    return (
      <audio
        src="/resources/music/fire1.mp3"
        name="media"
        type="audio/mpeg"
        controls
        autoPlay
      />
    );
  }
}

export class CureMagicFX extends Component {
  render() {
    return (
      <audio
        src="/resources/music/healingSpell.mp3"
        name="media"
        type="audio/mpeg"
        controls
        autoPlay
      />
    );
  }
}

export class CursorMovementFX extends Component {
  render() {
    return (
      <audio
        src="/resources/music/cursor.mp3"
        name="media"
        type="audio/mpeg"
        controls
        autoPlay
      />
    );
  }
}

export class LightningMagicFX extends Component {
  render() {
    return (
      <audio
        src="/resources/music/lightning1.m4a"
        name="media"
        type="audio/mpeg"
        controls
        autoPlay
      />
    );
  }
}

export class BossBattleMusicPart1 extends Component {
  render() {
    return (
      <audio
        src="/resources/music/boss-battle1.m4a"
        name="media"
        type="audio/mpeg"
        controls
        autoPlay
      />
    );
  }
}

export class BossBattleMusicPart2 extends Component {
  render() {
    return (
      <audio
        src="/resources/music/boss-battle2.m4a"
        name="media"
        type="audio/mpeg"
        controls
        autoPlay
      />
    );
  }
}

export class GameOverMusic extends Component {
  render() {
    return (
      <audio
        src="/resources/music/19 Game Over.mp3"
        name="media"
        type="audio/mpeg"
        controls
        autoPlay
      />
    );
  }
}

export class IntroMusic extends Component {
  render() {
    return (
      <audio
        src="/resources/music/3-16 The Prelude.mp3"
        name="media"
        type="audio/mpeg"
        controls
        autoPlay
      />
    );
  }
}

export class OverworldMusic extends Component {
  render() {
    return (
      <audio
        src="/resources/music/2-01 Terra's Theme.mp3"
        name="media"
        type="audio/mpeg"
        controls
        autoPlay
      />
    );
  }
}
