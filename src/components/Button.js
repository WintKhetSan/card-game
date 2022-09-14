import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, text }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: '#24a0ed',
        padding: 10,
        borderRadius: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 17,
        fontWeight: '600',
    }
})

export default Button;