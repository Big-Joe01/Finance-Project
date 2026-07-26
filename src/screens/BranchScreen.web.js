// Web version of BranchScreen - No map support
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Linking,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const branches = [
  { id: "1", name: "Head Office, Marina", distance: "650 m", latitude: 6.4541, longitude: 3.3947 },
  { id: "2", name: "Victoria Island Branch", distance: "2.4 km", latitude: 6.4281, longitude: 3.4219 },
  { id: "3", name: "Lekki Phase 1 Branch", distance: "6.8 km", latitude: 6.4381, longitude: 3.4686 },
  { id: "4", name: "Bariga Branch", distance: "3.5 km", latitude: 6.5356, longitude: 3.3899 },
  { id: "5", name: "Surulere Branch", distance: "5.2 km", latitude: 6.5016, longitude: 3.3581 },
  { id: "6", name: "Yaba Branch", distance: "4.1 km", latitude: 6.5095, longitude: 3.3711 },
  { id: "7", name: "Shomolu Branch", distance: "4.8 km", latitude: 6.5384, longitude: 3.3679 },
  { id: "8", name: "Costain Branch", distance: "3.1 km", latitude: 6.4878, longitude: 3.3648 },
  { id: "9", name: "Ikeja Branch", distance: "11.7 km", latitude: 6.6018, longitude: 3.3515 },
];

const BranchScreenWeb = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [searchedLocation, setSearchedLocation] = useState(null);

  const filteredBranches = branches.filter((branch) =>
    branch.name.toLowerCase().includes(search.toLowerCase())
  );

  const openInMaps = (branch) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${branch.latitude},${branch.longitude}`;
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Branch</Text>
      </View>

      <View style={styles.mapPlaceholder}>
        <Ionicons name="map" size={48} color="#1D4ED8" />
        <Text style={styles.mapPlaceholderText}>🗺️ Map View</Text>
        <Text style={styles.mapPlaceholderSubtext}>Available on mobile app</Text>
      </View>

      <View style={styles.searchContainer}>
        {searchedLocation && (
          <View style={styles.resultCard}>
            <Ionicons name="location" size={22} color="#D32F2F" />
            <Text style={styles.resultText}>{searchedLocation.name}</Text>
          </View>
        )}

        <View style={styles.searchBox}>
          <Ionicons name="search" size={22} color="#8E8E93" />
          <TextInput
            placeholder="Search location..."
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")}>
              <Ionicons name="close-circle" size={22} color="#8E8E93" />
            </TouchableOpacity>
          )}
        </View>

        <FlatList
          data={filteredBranches}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.branchCard} onPress={() => openInMaps(item)}>
              <View style={styles.branchLeft}>
                <Ionicons name="location" size={22} color="#1D4ED8" />
                <Text style={styles.branchName}>{item.name}</Text>
              </View>
              <View style={styles.branchRight}>
                <Text style={styles.branchDistance}>{item.distance}</Text>
                <Ionicons name="arrow-forward" size={18} color="#8E8E93" />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingTop: 65, paddingBottom: 20 },
  title: { fontSize: 24, fontWeight: "700", color: "#000", marginLeft: 10 },
  mapPlaceholder: { marginHorizontal: 25, height: 200, backgroundColor: "#F0F4FF", borderRadius: 16, justifyContent: "center", alignItems: "center" },
  mapPlaceholderText: { fontSize: 18, fontWeight: "600", color: "#1D4ED8", marginTop: 10 },
  mapPlaceholderSubtext: { fontSize: 14, color: "#666", marginTop: 4 },
  searchContainer: { marginHorizontal: 25, marginTop: 20, flex: 1, backgroundColor: "#FFF", borderRadius: 20, padding: 18, elevation: 2, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 3 },
  searchBox: { flexDirection: "row", alignItems: "center", backgroundColor: "#F5F5F5", borderRadius: 14, paddingHorizontal: 14, height: 50 },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16, color: "#000" },
  branchCard: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: "#F1F1F1" },
  branchLeft: { flexDirection: "row", alignItems: "center", flex: 1 },
  branchRight: { flexDirection: "row", alignItems: "center" },
  branchName: { marginLeft: 10, fontSize: 15, color: "#000", flex: 1 },
  branchDistance: { fontSize: 14, color: "#8E8E93", marginRight: 8 },
  resultCard: { flexDirection: "row", alignItems: "center", marginTop: 15, padding: 15, backgroundColor: "#F8F8F8", borderRadius: 12 },
  resultText: { marginLeft: 10, flex: 1, fontSize: 14, color: "#333" },
});

export default BranchScreenWeb;
