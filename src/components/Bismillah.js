import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Bismillah = () => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.titleTxt}>{'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'silver',
    paddingVertical: 8,
  },
  titleTxt: {
    fontFamily: 'AmiriQuran',
    fontSize: 28,
  },
});

export default Bismillah;