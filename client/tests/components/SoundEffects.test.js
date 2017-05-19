import React from 'react';
import { shallow } from 'enzyme';
import {
  enemyAttackFX,
  heroAttackFX,
  normalBattleMusic,
  battleVictoryMusic,
  fireMagicFX,
  cureMagicFX,
  cursorMovementFX,
  lightningMagicFX,
  bossBattleMusicPart1,
  bossBattleMusicPart2,
  gameOverMusic,
  introMusic,
  overworldMusic
} from '../../js/components/SoundEffects';

describe('sounds/music helper function', () => {
  describe('<enemyAttackFX />', () => {
    test('renders enemyAttackFX component', () => {
      const wrapper = shallow(<enemyAttackFX />);
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

  describe('<heroAttackFX />', () => {
    test('renders heroAttackFX component', () => {
      const wrapper = shallow(<heroAttackFX />);
      expect(wrapper).toHaveLength(1);
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

  describe('<normalBattleMusic />', () => {
    test('renders normalBattleMusic component', () => {
      const wrapper = shallow(<normalBattleMusic />);
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

  describe('<battleVictoryMusic />', () => {
    test('renders battleVictoryMusic component', () => {
      const wrapper = shallow(<battleVictoryMusic />);
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

  describe('<fireMagicFX />', () => {
    test('renders fireMagicFX component', () => {
      const wrapper = shallow(<fireMagicFX />);
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

  describe('<cureMagicFX />', () => {
    test('renders cureMagicFX component', () => {
      const wrapper = shallow(<cureMagicFX />);
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

  describe('<cursorMovementFX />', () => {
    test('renders cursorMovementFX component', () => {
      const wrapper = shallow(<cursorMovementFX />);
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

  describe('<lightningMagicFX />', () => {
    test('renders lightningMagicFX component', () => {
      const wrapper = shallow(<lightningMagicFX />);
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

  describe('<bossBattleMusicPart1 />', () => {
    test('renders bossBattleMusicPart1 component', () => {
      const wrapper = shallow(<bossBattleMusicPart1 />);
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

  describe('<bossBattleMusicPart2 />', () => {
    test('renders bossBattleMusicPart2 component', () => {
      const wrapper = shallow(<bossBattleMusicPart2 />);
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

  describe('<gameOverMusic />', () => {
    test('renders gameOverMusic component', () => {
      const wrapper = shallow(<gameOverMusic />);
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

  describe('<introMusic />', () => {
    test('renders introMusic component', () => {
      const wrapper = shallow(<introMusic />);
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

  describe('<overworldMusic />', () => {
    test('renders overworldMusic component', () => {
      const wrapper = shallow(<overworldMusic />);
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
