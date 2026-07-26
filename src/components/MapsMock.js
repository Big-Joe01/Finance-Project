// Web mock for react-native-maps
// This provides a fallback component when react-native-maps is not available

import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

const MapView = ({ children, style, ...props }) => (
  <View style={[styles.container, style]} {...props}>
    {children}
    <View style={styles.placeholder}>
      <Text style={styles.placeholderText}>
        {Platform.OS === 'web' ? '🗺️ Map (Web Preview)' : 'Map Loading...'}
      </Text>
    </View>
  </View>
);

const Marker = ({ coordinate, title, description, children, ...props }) => (
  <View style={styles.marker}>
    <Text style={styles.markerIcon}>📍</Text>
    {title && <Text style={styles.markerTitle}>{title}</Text>}
  </View>
);

const MarkerView = Marker;

const PROVIDER_GOOGLE = 'google';
const PROVIDER_DEFAULT = 'default';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8e8e8',
  },
  placeholderText: {
    fontSize: 16,
    color: '#666',
  },
  marker: {
    alignItems: 'center',
  },
  markerIcon: {
    fontSize: 24,
  },
  markerTitle: {
    fontSize: 12,
    color: '#333',
    backgroundColor: 'white',
    padding: 2,
  },
});

export { MapView, Marker, MarkerView, PROVIDER_GOOGLE, PROVIDER_DEFAULT };
