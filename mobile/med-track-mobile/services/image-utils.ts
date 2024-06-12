export const fileToByteArray = async (file: File): Promise<number[]> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.result instanceof ArrayBuffer) {
                const arrayBuffer = reader.result;
                const byteArray = Array.from(new Uint8Array(arrayBuffer));
                resolve(byteArray);
            } else {
                reject(new Error("Failed to read file"));
            }
        };
        reader.onerror = () => {
            reject(new Error("Failed to read file"));
        };
        reader.readAsArrayBuffer(file);
    });
};

export const generateImageSrc = (imageData: number[] | string | Uint8Array, mimeType: string): string => {
    if (typeof imageData === "string") {
        return `data:${mimeType};base64,${imageData}`;
    } else {
        const base64String = Buffer.from(imageData).toString("base64");
        return `data:${mimeType};base64,${base64String}`;
    }
};