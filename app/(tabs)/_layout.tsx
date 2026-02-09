import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSizes } from '../../src/constants/theme';

type TabIconName = keyof typeof Ionicons.glyphMap;

const tabs: { name: string; title: string; icon: TabIconName; iconFocused: TabIconName }[] = [
  { name: 'index', title: 'Dashboard', icon: 'grid-outline', iconFocused: 'grid' },
  { name: 'projects', title: 'Projects', icon: 'construct-outline', iconFocused: 'construct' },
  { name: 'clients', title: 'Clients', icon: 'people-outline', iconFocused: 'people' },
  { name: 'invoices', title: 'Invoices', icon: 'receipt-outline', iconFocused: 'receipt' },
  { name: 'time', title: 'Time', icon: 'time-outline', iconFocused: 'time' },
  { name: 'schedule', title: 'Schedule', icon: 'calendar-outline', iconFocused: 'calendar' },
  { name: 'profile', title: 'Profile', icon: 'person-outline', iconFocused: 'person' },
];

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.tabBarActive,
        tabBarInactiveTintColor: Colors.tabBarInactive,
        tabBarLabelStyle: {
          fontSize: FontSizes.xs,
          fontWeight: '500',
        },
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopColor: Colors.border,
          paddingTop: 4,
          height: 60,
        },
        headerShown: false,
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons name={focused ? tab.iconFocused : tab.icon} size={size} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
