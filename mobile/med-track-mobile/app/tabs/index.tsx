import { StyleSheet } from "react-native";

import React, { useState, useEffect } from "react";
import { Text, View } from "@/components/Themed";
import { Button } from "react-native";
import { CameraView, Camera } from "expo-camera";
import { router } from "expo-router";
import { useDeviceContext } from "@/providers/device-provider";
import { Device } from "@/types/types";
import ApiService from "@/services/api-service";
import { getCurrentDateFormatted } from "@/services/date-service";

export default function TabTwoScreen() {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [scanned, setScanned] = useState(false);
  const [barcode, setBarcode] = useState<number | null>(null);
  const { device, setDevice } = useDeviceContext();

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const fetchDevice = async () => {
    try {
      const response = await ApiService.get(
        `/devices/getDeviceByInvNumber/${barcode}`
      );
      setDevice(response.data);
      if (response.data.deviceId === null) {
        setDevice((prevDevice: Device | null) => ({
          ...prevDevice!,
          inventoryNumber: barcode!,
          installationDate: getCurrentDateFormatted(),
        }));
      }
    } catch (error) {
      alert("Something went wrong with fetching the device.");
    }
  };
  useEffect(() => {
    if (barcode !== null) {
      fetchDevice();
    }
  }, [barcode]);

  const handleBarCodeScanned = ({ data }: any) => {
    setScanned(true);
    setBarcode(Number(data));
    router.push("/tabs/first");
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["ean13"],
        }}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <View style={styles.scanAgainContainer}>
          <Text style={styles.scanAgainText}>Bar code scanned!</Text>
          <Button
            title={"Tap to Scan Again"}
            onPress={() => {
              setScanned(false);
              setBarcode(null);
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  scanAgainContainer: {
    height: 100, // Adjust the height as needed
    borderRadius: 10,
    alignItems: "center", // Center text horizontally
    justifyContent: "center", // Center text vertically
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  scanAgainText: {
    fontSize: 18,
    color: "white",
  },
});
