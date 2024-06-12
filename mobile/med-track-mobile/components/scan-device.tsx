import { Image, StyleSheet, TextInput } from "react-native";
import React from "react";
import { Text, View } from "@/components/Themed";
import { useDeviceContext } from "@/providers/device-provider";
import { generateImageSrc } from "@/services/image-utils";
import { Status } from "@/types/types";

export default function ScannedDevice() {
  const { device, setDevice } = useDeviceContext();

  const getStatusText = (status: Status | undefined): string => {
    switch (status) {
      case Status.Active:
        return "Active";
      case Status.Not_Active:
        return "Not Active";
      case Status.In_Service:
        return "In Service";
      default:
        return "";
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Image
          source={
            device?.deviceImage
              ? { uri: generateImageSrc(device.deviceImage, "image/jpeg") }
              : require("../assets/images/device-stock.jpg")
          }
          style={styles.image}
        />
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
                see
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
          <Text style={styles.label}>Device Status:</Text>
          <View>
            <Text style={styles.value}>{getStatusText(device?.status)}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Inventory Number:</Text>
          <View>
            <Text style={styles.value}>{device?.inventoryNumber}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Location:</Text>
          <View>
            <Text style={styles.value}>{device?.folderName}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Installation Date:</Text>
          <View>
            <Text style={styles.value}>{device?.installationDate}</Text>
          </View>
        </View>
      </View>
    </View>
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
    alignItems: "flex-start", // Align items to the start of the container
    justifyContent: "space-between", // Space between the image and the content
  },
  image: {
    width: 150,
    height: 150,
    margin: 10, // Half of the width/height to make it circular
    borderWidth: 2,
    borderColor: "gray",
  },
  content: {
    flex: 1,
    gap: 15,
    /* width: "100%", */ // Adjust spacing between the image and the content
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
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});
