import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

import { modes, type Mode } from './cards';
import { palette } from './ui';

const reactions = {
  sweet: 'Aww, that’s adorable!',
  chaotic: 'OH??? Spill it 👀',
  spicy: 'Now we’re getting somewhere 🌶️',
  deep: 'Okay, we’re getting deep…',
};

const pearls = [
  { left: 5, bottom: 4 }, { left: 17, bottom: 1 }, { left: 30, bottom: 5 },
  { left: 11, bottom: 15 }, { left: 36, bottom: 15 },
];

export function BobaMascot({ mode, progress, reveal, hasCard, hasPlayer, duo, mysteryPending, active, shaking, onShake }: {
  mode: Mode;
  progress: Animated.Value;
  reveal: Animated.Value;
  hasCard: boolean;
  hasPlayer: boolean;
  duo: boolean;
  mysteryPending: boolean;
  active: boolean;
  shaking: boolean;
  onShake: () => void;
}) {
  const disabled = !active || shaking;
  const expression = shaking ? styles.blink : {
    sweet: null, chaotic: styles.wideEye, deep: styles.softEye, spicy: styles.sideEye,
  }[mode];
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Shake the Boba!"
      accessibilityHint={active ? 'Draws another card of the active type' : 'Choose Truth or Dare first'}
      accessibilityState={{ disabled, busy: shaking }}
      disabled={disabled}
      onPress={onShake}
      style={({ pressed }) => [styles.station, pressed && { opacity: 0.78 }]}>
      <Animated.View style={[styles.sticker, { backgroundColor: modes[mode].tint, transform: [{
        rotate: progress.interpolate({ inputRange: [0, 0.18, 0.38, 0.58, 0.78, 1], outputRange: ['0deg', '-12deg', '11deg', '-8deg', '5deg', '0deg'] }),
      }] }]}>
        <View style={styles.straw} />
        <View style={styles.cup}>
          <View style={[styles.eye, styles.leftEye, expression]} />
          <View style={[styles.eye, styles.rightEye, expression]} />
          <View style={[styles.blush, { left: 5 }]} />
          <View style={[styles.blush, { right: 5 }]} />
          <View style={[styles.mouth, mode === 'chaotic' && styles.gasp, mode === 'deep' && styles.thoughtful, mode === 'spicy' && styles.smirk]} />
          {pearls.map((position, index) => (
            <Animated.View key={position.left} style={[styles.pearl, position, { transform: [{
              translateY: progress.interpolate({ inputRange: [0, 0.22, 0.43, 0.63, 0.82, 1], outputRange: [0, -4 - index % 3 * 3, 0, -5 - index % 2 * 3, -2, 0] }),
            }] }]} />
          ))}
        </View>
        <View style={styles.lid} />
        {hasCard && <Animated.Text style={[styles.sparkle, { opacity: reveal }]}>{duo ? '♥♥' : hasPlayer ? '♥' : '✦'}</Animated.Text>}
      </Animated.View>
      <View style={styles.copy}>
        <Text style={styles.action}>{shaking ? 'Shaking…' : 'Shake the Boba!'}</Text>
        <Text style={styles.reaction}>{mysteryPending ? 'Mystery Boba incoming…' : duo ? 'Double the pearls, double the trouble!' : reactions[mode]}</Text>
        {!active && <Text style={styles.reaction}>Choose Truth or Dare first.</Text>}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  station: { minHeight: 88, flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: palette.cream, borderColor: palette.border, borderWidth: 1, borderRadius: 20, padding: 9 },
  sticker: { height: 72, width: 76, borderRadius: 22, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 5 },
  copy: { flex: 1, gap: 3 },
  action: { color: palette.berry, fontSize: 16, fontWeight: '800' },
  reaction: { color: palette.muted, fontSize: 13 },
  straw: { position: 'absolute', top: 3, left: 43, width: 7, height: 21, backgroundColor: '#CB6487', borderRadius: 3, transform: [{ rotate: '15deg' }] },
  cup: { width: 51, height: 49, borderWidth: 2, borderColor: '#A76B5A', borderRadius: 12, backgroundColor: '#F3C794', overflow: 'hidden' },
  lid: { position: 'absolute', top: 15, width: 57, height: 8, borderRadius: 4, backgroundColor: '#FFF4E5', borderWidth: 1.5, borderColor: '#A76B5A' },
  eye: { position: 'absolute', top: 10, width: 5, height: 7, borderRadius: 4, backgroundColor: palette.ink },
  leftEye: { left: 11 },
  rightEye: { left: 31 },
  blink: { height: 2, top: 14 },
  wideEye: { height: 8, width: 8, borderWidth: 2, borderColor: '#FFF4E5' },
  softEye: { height: 3, top: 13, transform: [{ rotate: '-14deg' }] },
  sideEye: { width: 8, height: 6, borderLeftWidth: 4, borderLeftColor: '#FFF4E5' },
  blush: { position: 'absolute', top: 18, width: 7, height: 4, borderRadius: 3, backgroundColor: '#E88791' },
  mouth: { position: 'absolute', top: 17, alignSelf: 'center', width: 8, height: 5, borderBottomWidth: 2, borderColor: palette.ink, borderRadius: 5 },
  gasp: { height: 7, width: 6, borderWidth: 1.5 },
  thoughtful: { height: 2, width: 5, top: 20 },
  smirk: { transform: [{ rotate: '-20deg' }] },
  pearl: { position: 'absolute', width: 7, height: 7, borderRadius: 4, backgroundColor: '#74465A' },
  sparkle: { position: 'absolute', right: 3, top: 2, color: palette.berry, fontSize: 14 },
});
