import React, { useState } from "react";
import DownloadIcon from '@mui/icons-material/Download';
import { Button } from "@mui/material";
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

export const generatePdf = (data) => {
    return (
        <Document>
            <Page>
                <View style={styles.section}>
                    <Text>Vehicle Type ID: {data.vtId}</Text>
                    <Text>Vehicle ID: {data.vId}</Text>
                    <Text>STS ID: {data.stsId}</Text>
                    <Text>Weight of Waste: {data.weightWaste}</Text>
                    <Text>Arrival Time: {data.arrivalTime}</Text>
                    <Text>Departure Time: {data.departureTime}</Text>
                    <Text>Total Fuel Cost: {data.totalFuelCost}</Text>
                </View>
            </Page>
        </Document>
    );
};

const styles = StyleSheet.create({
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});

export default function BillsCard({ billData }) {
    const [showPdf, setShowPdf] = useState(false);
    const [pdfContent, setPdfContent] = useState(null);

    const handleDownloadPdf = (data) => {
        const pdfContent = generatePdf(data);
        setPdfContent(pdfContent);
        setShowPdf(true);
    };

    return (
        <>
            {billData.map((data, index) => (
                <div key={index} className="flex items-center w-full bg-white border border-gray-100 rounded-lg shadow hover:bg-gray-200 mb-4">
                    <div className="p-5">
                        <b>
                            <h4 className="mb-1">Vehicle Type ID: {data.vtId}</h4>
                            <h4 className="mb-1">Vehicle ID: {data.vId}</h4>
                            <h4 className="mb-1">STS ID: {data.stsId}</h4>
                            <h4 className="mb-1">Weight of Waste: {data.weightWaste}</h4>
                            <h4 className="mb-1">Arrival Time: {data.arrivalTime}</h4>
                            <h4 className="mb-1">Departure Time: {data.departureTime}</h4>
                            <h4 className="mb-1">Total Fuel Cost: {data.totalFuelCost}</h4>
                        </b>
                        <Button
                            variant="contained"
                            className="w-48"
                            endIcon={<DownloadIcon />}
                            onClick={() => handleDownloadPdf(data)}
                        >
                            Download Bill
                        </Button>
                    </div>
                </div>
            ))}
            {showPdf && (
                <div className="fixed top-0 left-0 z-40 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white flex-col p-4 rounded-lg shadow flex w-full h-full">
                        <PDFViewer style={{ width: "100%", height: "100%" }}>
                            {pdfContent}
                        </PDFViewer>
                        <Button variant="contained" onClick={() => setShowPdf(false)}>Close</Button>
                    </div>
                </div>
            )}
        </>
    );
}
