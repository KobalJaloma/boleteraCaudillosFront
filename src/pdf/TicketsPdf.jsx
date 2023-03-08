import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Svg } from '@react-pdf/renderer';

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
    bottom: "70px",
    left: "180x",
    backgroundColor: '#E4E4E4',
    
    width: "125px",
    height: '125px'
  },
  qrImage:{
    width: "100%",
    height: '100%'
  },
  non: {
    margin: 0,
    padding: 0
  }
});


// Create Document Component
export const TicketsPdf = ({ticket, qr = []}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        {
          qr.map((codigo) => (<View key={codigo} style={styles.non}>
            <Image src={`layoutTickets/${ticket}.jpeg`} style={styles.ticket}/>
            <View style={styles.QrContainer}>
              <Image style={styles.qrImage} src={codigo} />
            </View>
          </View>
          ))
        }

      </View>
    </Page>
  </Document>
);