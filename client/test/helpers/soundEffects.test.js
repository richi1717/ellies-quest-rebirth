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
  describe('EnemyAttackFX', () => {
    it('renders EnemyAttackFX component', () => {
      const wrapper = shallow(<EnemyAttackFX />);
      expect(wrapper.length).toEqual(1);
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
  describe('HeroAttackFX', () => {
    it('renders HeroAttackFX component', () => {
      const wrapper = shallow(<HeroAttackFX />);
      expect(wrapper.length).toEqual(1);
      expect(wrapper.contains(
        <audio
          src="/resources/music/sword-slash.mp3"
          name="media"
          type="audio/mp3"
          controls
          autoPlay
        />
      )).toEqual(true);
    });
  });
  describe('NormalBattleMusic', () => {
    it('renders NormalBattleMusic component', () => {
      const wrapper = shallow(<NormalBattleMusic />);
      expect(wrapper.length).toEqual(1);
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
  describe('BattleVictoryMusic', () => {
    it('renders BattleVictoryMusic component', () => {
      const wrapper = shallow(<BattleVictoryMusic />);
      expect(wrapper.length).toEqual(1);
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
  describe('FireMagicFX', () => {
    it('renders FireMagicFX component', () => {
      const wrapper = shallow(<FireMagicFX />);
      expect(wrapper.length).toEqual(1);
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
  describe('CureMagicFX', () => {
    it('renders CureMagicFX component', () => {
      const wrapper = shallow(<CureMagicFX />);
      expect(wrapper.length).toEqual(1);
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
  describe('CursorMovementFX', () => {
    it('renders CursorMovementFX component', () => {
      const wrapper = shallow(<CursorMovementFX />);
      expect(wrapper.length).toEqual(1);
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
  describe('LightningMagicFX', () => {
    it('renders LightningMagicFX component', () => {
      const wrapper = shallow(<LightningMagicFX />);
      expect(wrapper.length).toEqual(1);
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
  describe('BossBattleMusicPart1', () => {
    it('renders BossBattleMusicPart1 component', () => {
      const wrapper = shallow(<BossBattleMusicPart1 />);
      expect(wrapper.length).toEqual(1);
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
  describe('BossBattleMusicPart2', () => {
    it('renders BossBattleMusicPart2 component', () => {
      const wrapper = shallow(<BossBattleMusicPart2 />);
      expect(wrapper.length).toEqual(1);
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
  describe('GameOverMusic', () => {
    it('renders GameOverMusic component', () => {
      const wrapper = shallow(<GameOverMusic />);
      expect(wrapper.length).toEqual(1);
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
  describe('IntroMusic', () => {
    it('renders IntroMusic component', () => {
      const wrapper = shallow(<IntroMusic />);
      expect(wrapper.length).toEqual(1);
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
  describe('OverworldMusic', () => {
    it('renders OverworldMusic component', () => {
      const wrapper = shallow(<OverworldMusic />);
      expect(wrapper.length).toEqual(1);
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
