// import React from 'react';
// import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';

// const styles = StyleSheet.create({
//   page: {
//     fontFamily: 'Helvetica',
//     padding: 30,
//   },
//   title: {
//     fontSize: 18,
//     marginBottom: 10,
//     fontWeight: 'bold',
//   },
//   label: {
//     fontSize: 12,
//     marginBottom: 5,
//     fontWeight: 'bold',
//   },
//   value: {
//     fontSize: 12,
//     marginBottom: 10,
//   },
//   logo: {
//     width: 50,
//     height: 50,
//     marginBottom: 10,
//   },
// });

// const PDFDocument = ({ transferData }) => (
//   <Document>
//     <Page style={styles.page}>
//       <View style={styles.logo}>
//         {/* Insert Pokhara University logo here */}
//         <Image src="C:\Users\Niroj\Desktop\Bachelors\8th sem\OCTS-Frontend\images\PU_Logo.jpg" />
//       </View>
//       <Text style={styles.title}>Transfer Application Details</Text>
//       <Text style={styles.label}>Name:</Text>
//       <Text style={styles.value}>{transferData.name}</Text>
//       <Text style={styles.label}>Registration Number:</Text>
//       <Text style={styles.value}>{transferData.puRegNumber}</Text>
//       {/* Add other details here */}
//     </Page>
//   </Document>
// );

// export default PDFDocument;