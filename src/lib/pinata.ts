export async function uploadToPinata(file: File) {
    // Check if API keys are present
    const jwt = process.env.NEXT_PUBLIC_PINATA_JWT;
    if (!jwt) {
        console.warn("Pinata JWT not found. Returning mock CID.");
        return "QmHashMock123456789";
    }

    const formData = new FormData();
    formData.append("file", file);

    const metadata = JSON.stringify({
        name: file.name,
    });
    formData.append("pinataMetadata", metadata);

    const options = JSON.stringify({
        cidVersion: 0,
    });
    formData.append("pinataOptions", options);

    try {
        const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
            body: formData,
        });
        const resData = await res.json();
        return resData.IpfsHash;
    } catch (error) {
        console.error("Error uploading to Pinata:", error);
        throw error;
    }
}
