import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const StepCounter = ({ count }) => {
    return (
        <View style={styles.textContainer}>
            <Text style={styles.counterLabel}>STEPS : </Text>
            <Text style={styles.counterNumber}>{count}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    counterLabel: {
        fontSize: 24,
        color: '#fff',
    },
    counterNumber: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#24a0ed',
    }
})

export default StepCounter;