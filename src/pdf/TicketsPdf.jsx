import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Svg } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    margin: 10,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center'
    
  },
  ticket: {
    width: '120px',
    height: '170px'
  },
  QrContainer: {
    position: 'absolute',
    bottom: "20px",
    left: "45x",
    backgroundColor: '#E4E4E4',
    
    width: "30px",
    height: '30px'
  },
  qrImage:{
    width: "100%",
    height: '100%'
  },
  non: {
    margin: 0,
    marginBottom: '10px',
    padding: 0
  }
});


// Create Document Component
export const TicketsPdf = ({ticket, qr = []}) => (
  <Document >
    <Page size="A4" style={styles.page} orientation='landscape'>
      <View style={styles.section}>
        {
          qr.map((codigo) => (<View key={codigo} style={styles.non}>
            <Image src={`layoutTickets/${ticket}`} style={styles.ticket}/>
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