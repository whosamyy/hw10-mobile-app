import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';

import { CustomCardsProvider } from '@/game/custom-cards';
import { palette } from '@/game/ui';

export default function TabLayout() {
  return (
    <CustomCardsProvider>
      <StatusBar style="dark" />
      <Tabs
        screenOptions={{
          headerShown: false,
          sceneStyle: { backgroundColor: palette.background },
          tabBarStyle: { backgroundColor: palette.cream, borderTopColor: palette.border },
          tabBarActiveTintColor: palette.berry,
          tabBarInactiveTintColor: palette.muted,
          tabBarLabelStyle: { fontSize: 12, fontWeight: '700' },
          tabBarHideOnKeyboard: true,
        }}>
        <Tabs.Screen name="index" options={{
          title: 'Play',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 23 }}>✦</Text>,
        }} />
        <Tabs.Screen name="my-cards" options={{
          title: 'My Cards',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 23 }}>▤</Text>,
        }} />
      </Tabs>
    </CustomCardsProvider>
  );
}
