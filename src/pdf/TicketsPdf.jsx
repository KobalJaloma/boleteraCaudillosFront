import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
  },
  ticket: {
    width: '500px'
  },
  QrContainer: {
    position: 'absolute',
    bottom: "80px",
    left: "190x",
    backgroundColor: '#E4E4E4',
    padding: '20px',
    width: "125px",
    height: '125px'
  }
});

// Create Document Component
export const TicketsPdf = ({ticket, informacion}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Image src={`layoutTickets/${ticket}.jpeg`} style={styles.ticket}/>
        <Text style={styles.QrContainer}>{ informacion }</Text>
      </View>
    </Page>
  </Document>
);