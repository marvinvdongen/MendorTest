import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { DashboardScreen } from '../screens/DashboardScreen';
import { ProjectsScreen } from '../screens/ProjectsScreen';
import { ClientsScreen } from '../screens/ClientsScreen';
import { InvoicesScreen } from '../screens/InvoicesScreen';
import { TimeTrackingScreen } from '../screens/TimeTrackingScreen';
import { ScheduleScreen } from '../screens/ScheduleScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { Colors, FontSizes } from '../constants/theme';

const Tab = createBottomTabNavigator();

type TabIconName = keyof typeof Ionicons.glyphMap;

const tabs: { name: string; component: React.ComponentType; icon: TabIconName; iconFocused: TabIconName }[] = [
  { name: 'Dashboard', component: DashboardScreen, icon: 'grid-outline', iconFocused: 'grid' },
  { name: 'Projects', component: ProjectsScreen, icon: 'construct-outline', iconFocused: 'construct' },
  { name: 'Clients', component: ClientsScreen, icon: 'people-outline', iconFocused: 'people' },
  { name: 'Invoices', component: InvoicesScreen, icon: 'receipt-outline', iconFocused: 'receipt' },
  { name: 'Time', component: TimeTrackingScreen, icon: 'time-outline', iconFocused: 'time' },
  { name: 'Schedule', component: ScheduleScreen, icon: 'calendar-outline', iconFocused: 'calendar' },
  { name: 'Profile', component: ProfileScreen, icon: 'person-outline', iconFocused: 'person' },
];

export function TabNavigator() {
  return (
    <Tab.Navigator
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
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons name={focused ? tab.iconFocused : tab.icon} size={size} color={color} />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
