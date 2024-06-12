import {
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Text, View } from "@/components/Themed";
import { useDeviceContext } from "@/providers/device-provider";
import { generateImageSrc } from "@/services/image-utils";
import { Device, Folder } from "@/types/types";
import ApiService from "@/services/api-service";
import { Dropdown } from "react-native-element-dropdown";
import * as ImagePciker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

const statusData = [
  { label: "Active", value: 0 },
  { label: "Not Active", value: 1 },
  { label: "In Service", value: 2 },
];

export default function NewDevice() {
  const { device, setDevice } = useDeviceContext();
  const [folders, setFolders] = useState<Folder[]>([]);

  const fetchFolders = async () => {
    try {
      const response = await ApiService.get(`/folders/getAllFolders`);
      setFolders(response.data);
    } catch (error) {
      alert("Something went wrong with fetching the locations.");
    }
  };

  const handleImageCapture = async () => {
    try {
      await ImagePciker.requestCameraPermissionsAsync();
      let result = await ImagePciker.launchCameraAsync({
        cameraType: ImagePciker.CameraType.back,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
        const base64 = await FileSystem.readAsStringAsync(
          result.assets[0].uri,
          {
            encoding: FileSystem.EncodingType.Base64,
          }
        );
        setDevice((prevDevice: Device | null) => ({
          ...prevDevice!,
          deviceImage: base64!,
        }));
      }
    } catch (err) {}
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  const handleSave = async () => {
    try {
      const response = await ApiService.post("/devices/postNewDevice", device);
      setDevice(response.data);
    } catch (error) {
      alert("Something went wrong with adding new device.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <TouchableOpacity onPress={handleImageCapture}>
            <Image
              source={
                device?.deviceImage
                  ? { uri: generateImageSrc(device.deviceImage, "image/jpeg") }
                  : require("../assets/images/device-stock.jpg")
              }
              style={styles.image}
            />
          </TouchableOpacity>
          <View style={styles.rowContent}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              {device?.deviceName}
            </Text>
            <View style={styles.row}>
              <Text style={styles.label}>
                Here you can{" "}
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "gray",
                  }}
                >
                  enter
                </Text>{" "}
                basic information about the device.
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>
                For more detailed information use Med Track Website.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.row}>
            <Text style={styles.label}>Device Name:</Text>
            <View>
              <TextInput
                style={styles.value}
                placeholder="Device Name"
                onChangeText={(text) =>
                  setDevice((prevDevice: Device | null) => ({
                    ...prevDevice!,
                    deviceName: text!,
                  }))
                }
              />
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Device Status:</Text>
            <View>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={statusData}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select status"
                searchPlaceholder="Search..."
                onChange={(item) => {
                  console.log(item.value);
                  setDevice((prevDevice: Device | null) => ({
                    ...prevDevice!,
                    status: item.value!,
                  }));
                }}
              />
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Inventory Number:</Text>
            <View>
              <TextInput
                style={styles.value}
                inputMode="numeric"
                value={`${device?.inventoryNumber}`}
                onChangeText={(text) =>
                  setDevice((prevDevice: Device | null) => ({
                    ...prevDevice!,
                    inventoryNumber: Number(text!),
                  }))
                }
              />
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Location:</Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={folders}
              search
              maxHeight={300}
              labelField="title"
              valueField="folderId"
              placeholder="Select location"
              searchPlaceholder="Search..."
              onChange={(item) => {
                setDevice((prevDevice: Device | null) => ({
                  ...prevDevice!,
                  folderId: item.folderId!,
                }));
              }}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Installation Date:</Text>
            <View>
              <Text style={styles.value}>{device?.installationDate}</Text>
            </View>
          </View>
          <View
            style={{
              margin: 16,
            }}
          >
            <Pressable
              style={{
                backgroundColor: "#3498db",
                padding: 10,
                borderRadius: 4,
                alignItems: "center",
              }}
              onPress={handleSave}
            >
              <Text style={{ color: "#fff", fontSize: 16 }}>Add Device</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 50,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  image: {
    width: 150,
    height: 150,
    margin: 10,
    borderWidth: 2,
    borderColor: "gray",
  },
  content: {
    flex: 1,
    gap: 15,
  },
  rowContent: {
    margin: 10,
    flex: 1,
    width: "100%",
    gap: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  label: {
    color: "gray",
    fontSize: 20,
  },
  value: {
    fontWeight: "bold",
    fontSize: 15,
    textAlignVertical: "top",
    width: 150,
  },
  dropdown: {
    height: 50,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    width: 170,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
