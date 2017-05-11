import React from 'react';
import { shallow } from 'enzyme';
import {
  EnemyAttackFX,
  HeroAttackFX,
  NormalBattleMusic,
  BattleVictoryMusic,
  FireMagicFX,
  CureMagicFX,
  CursorMovementFX,
  LightningMagicFX,
  BossBattleMusicPart1,
  BossBattleMusicPart2,
  GameOverMusic,
  IntroMusic,
  OverworldMusic
} from '../../js/components/SoundEffects';

describe('sounds/music helper function', () => {
  describe('<EnemyAttackFX />', () => {
    test('renders EnemyAttackFX component', () => {
      const wrapper = shallow(<EnemyAttackFX />);
      expect(wrapper).toHaveLength(1);
      expect(wrapper.contains(
        <audio
          src="/resources/music/swipe.mp3"
          name="media"
          type="audio/mpeg"
          controls
          autoPlay
        />
      )).toEqual(true);
    });
  });

  describe('<HeroAttackFX />', () => {
    test('renders HeroAttackFX component', () => {
      const wrapper = shallow(<HeroAttackFX />);
      // expect(wrapper).toHaveLength(1);
      expect(wrapper.contains(
        <audio
          src="/resources/music/sword-slash.mp3"
          name="media"
          type="audio/mpeg"
          controls
          autoPlay
        />
      )).toEqual(true);
    });
  });

  describe('<NormalBattleMusic />', () => {
    test('renders NormalBattleMusic component', () => {
      const wrapper = shallow(<NormalBattleMusic />);
      expect(wrapper).toHaveLength(1);
      expect(wrapper.contains(
        <audio
          src="/resources/music/better-battle.m4a"
          name="media"
          type="audio/mpeg"
          controls
          autoPlay
        />
      )).toEqual(true);
    });
  });

  describe('<BattleVictoryMusic />', () => {
    test('renders BattleVictoryMusic component', () => {
      const wrapper = shallow(<BattleVictoryMusic />);
      expect(wrapper).toHaveLength(1);
      expect(wrapper.contains(
        <audio
          src="/resources/music/1-06 Victory Fanfare.mp3"
          name="media"
          type="audio/mpeg"
          controls
          autoPlay
        />
      )).toEqual(true);
    });
  });

  describe('<FireMagicFX />', () => {
    test('renders FireMagicFX component', () => {
      const wrapper = shallow(<FireMagicFX />);
      expect(wrapper).toHaveLength(1);
      expect(wrapper.contains(
        <audio
          src="/resources/music/fire1.mp3"
          name="media"
          type="audio/mpeg"
          controls
          autoPlay
        />
      )).toEqual(true);
    });
  });

  describe('<CureMagicFX />', () => {
    test('renders CureMagicFX component', () => {
      const wrapper = shallow(<CureMagicFX />);
      expect(wrapper).toHaveLength(1);
      expect(wrapper.contains(
        <audio
          src="/resources/music/healingSpell.mp3"
          name="media"
          type="audio/mpeg"
          controls
          autoPlay
        />
      )).toEqual(true);
    });
  });

  describe('<CursorMovementFX />', () => {
    test('renders CursorMovementFX component', () => {
      const wrapper = shallow(<CursorMovementFX />);
      expect(wrapper).toHaveLength(1);
      expect(wrapper.contains(
        <audio
          src="/resources/music/cursor.mp3"
          name="media"
          type="audio/mpeg"
          controls
          autoPlay
        />
      )).toEqual(true);
    });
  });

  describe('<LightningMagicFX />', () => {
    test('renders LightningMagicFX component', () => {
      const wrapper = shallow(<LightningMagicFX />);
      expect(wrapper).toHaveLength(1);
      expect(wrapper.contains(
        <audio
          src="/resources/music/lightning1.m4a"
          name="media"
          type="audio/mpeg"
          controls
          autoPlay
        />
      )).toEqual(true);
    });
  });

  describe('<BossBattleMusicPart1 />', () => {
    test('renders BossBattleMusicPart1 component', () => {
      const wrapper = shallow(<BossBattleMusicPart1 />);
      expect(wrapper).toHaveLength(1);
      expect(wrapper.contains(
        <audio
          src="/resources/music/boss-battle1.m4a"
          name="media"
          type="audio/mpeg"
          controls
          autoPlay
        />
      )).toEqual(true);
    });
  });

  describe('<BossBattleMusicPart2 />', () => {
    test('renders BossBattleMusicPart2 component', () => {
      const wrapper = shallow(<BossBattleMusicPart2 />);
      expect(wrapper).toHaveLength(1);
      expect(wrapper.contains(
        <audio
          src="/resources/music/boss-battle2.m4a"
          name="media"
          type="audio/mpeg"
          controls
          autoPlay
        />
      )).toEqual(true);
    });
  });

  describe('<GameOverMusic />', () => {
    test('renders GameOverMusic component', () => {
      const wrapper = shallow(<GameOverMusic />);
      expect(wrapper).toHaveLength(1);
      expect(wrapper.contains(
        <audio
          src="/resources/music/19 Game Over.mp3"
          name="media"
          type="audio/mpeg"
          controls
          autoPlay
        />
      )).toEqual(true);
    });
  });

  describe('<IntroMusic />', () => {
    test('renders IntroMusic component', () => {
      const wrapper = shallow(<IntroMusic />);
      expect(wrapper).toHaveLength(1);
      expect(wrapper.contains(
        <audio
          src="/resources/music/3-16 The Prelude.mp3"
          name="media"
          type="audio/mpeg"
          controls
          autoPlay
        />
      )).toEqual(true);
    });
  });

  describe('<OverworldMusic />', () => {
    test('renders OverworldMusic component', () => {
      const wrapper = shallow(<OverworldMusic />);
      expect(wrapper).toHaveLength(1);
      expect(wrapper.contains(
        <audio
          src="/resources/music/2-01 Terra's Theme.mp3"
          name="media"
          type="audio/mpeg"
          controls
          autoPlay
        />
      )).toEqual(true);
    });
  });
});
