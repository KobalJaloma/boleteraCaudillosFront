import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Svg } from '@react-pdf/renderer';
// Create styles
const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0
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
    width: '195px',
    height: '240px'
  },
  QrContainer: {
    position: 'absolute',
    bottom: "45px",
    left: "77px",
    backgroundColor: '#E4E4E4',
    
    width: "35px",
    height: '35px'
  },
  qrImage:{
    width: "100%",
    height: '100%'
  },
  non: {
    margin: 0,
    marginBottom: '10px',
    padding: 0
  },
  numContainer: {
    width: "20px",
    height: '10px',
    backgroundColor: 'transparent',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: "1px",
    left: "5x",
    borderRadius: '100%',
  },
  numTicket: {
    textAlign: 'left',
    fontSize: '5px',
    color: 'red'
  }
});
var i = 0;

// Create Document Component
export const TicketsPdf = ({ticket, qr = []}) => (
  <Document >
    <Page size={'SRA3'} style={styles.page} orientation='landscape'>
      <View style={styles.section}>
        {
          qr.map((codigo) => {
            i++;
            return (<View key={codigo} style={styles.non}>
            <Image src={`layoutTickets/${ticket}`} style={styles.ticket}/>
            <View style={styles.QrContainer}>
              <Image style={styles.qrImage} src={codigo} />
            </View>
            <View style={styles.numContainer}>
              <Text style={styles.numTicket}>{`#${i}`}</Text>
            </View>
          </View>
          )})
        }

      </View>
    </Page>
  </Document>
);