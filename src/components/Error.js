import React from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback, View, Text, StyleSheet, Dimensions } from 'react-native';
import { Icon } from 'native-base';

const { height: HEIGHT, width: WIDTH } = Dimensions.get('window');

const styles = StyleSheet.create({
  errorContainer: {
    position: 'absolute',
    height: HEIGHT,
    width: WIDTH,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorIcon: {
    paddingBottom: 10,
    fontSize: 40,
  },
  errorTxtTitle: {
    fontSize: 16,
    color: '#333',
  },
  errorTxtSubtitle: {
    fontSize: 14,
  },
});

const Error = ({ onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.errorContainer}>
        <Icon name="alert" style={styles.errorIcon}/>
        <Text style={styles.errorTxtTitle}>Ops! Failed to load</Text>
        <Text style={styles.errorTxtTitle}>Please check your connection</Text>
        <Text>Tap to try again</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

Error.propTypes = {
  onPress: PropTypes.func,
};

Error.defaultProps = {
  onPress: () => null,
};

export default Error;