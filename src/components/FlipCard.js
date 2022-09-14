import React, { useRef, useState, useEffect } from 'react';
import { Text, StyleSheet, Animated, Dimensions, TouchableOpacity } from 'react-native';

const height = Dimensions.get('window').height;
const FlipCard = ({ hiddenValue, onTouch, keepOpen = false }) => {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const[disabled, setDisabled] = useState(false);

    useEffect(() => {
        if(!keepOpen && animatedValue._value >= 90){
            setDisabled(false);
            flipBack();
        }
    });

    const frontAnimatedStyle = () => {
        const frontInterpolate = animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg'],
        });
        return { transform: [{ rotateY: frontInterpolate }]};
    }

    const backAnimatedStyle = () => {
        const backInterpolate = animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg'],
        });
        return { transform: [{ rotateY: backInterpolate }]};
    }

    const popoutAnimationStyle = () => {
        const popInterpolate = animatedValue.interpolate({
          inputRange: [0, 90, 180],
          outputRange: [0, -5, 0],
        });
        return { top: popInterpolate };
    };
    
    const flipFront = () => {
        setDisabled(true);
        Animated.timing(animatedValue, {
            toValue: 180,
            duration: 500,
            useNativeDriver: false,
        }).start(onTouch);
    }

    const flipBack = () => {
        if(!keepOpen){
            Animated.timing(animatedValue, {
                toValue: 0,
                duration: 250,
                useNativeDriver: false,
            }).start();
        }
    }

    return (
        <TouchableOpacity onPress={flipFront} style={styles.container} disabled={disabled}>
            <Animated.View style={[styles.flipCard, styles.flipCardFront, popoutAnimationStyle(), frontAnimatedStyle()]}>
                <Text style={styles.flipTextFront}>?</Text>
            </Animated.View>
            <Animated.View style={[styles.flipCard, styles.flipCardBack, popoutAnimationStyle(), backAnimatedStyle()]}>
                <Text style={styles.flipTextBack}>{hiddenValue}</Text>
            </Animated.View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: height / 4.5,
    },
    flipCard: {
        alignItems: 'center',
        justifyContent: 'center',
        backfaceVisibility: 'hidden',
        width: '100%',
        height: '100%',
        borderColor: '#fff',
        borderWidth: 3,
        backgroundColor: '#24a0ed',
        transform: [{ perspective: 1000 }],
        borderRadius: 10,
    },
    flipCardBack: {
        position: 'absolute',
        backgroundColor: '#fff',
    },
    flipTextFront: {
        fontSize: 40,
        color: '#fff',
        fontWeight: '600',
    },
    flipTextBack: {
        fontSize: 40,
        color: '#000',
        fontWeight: '600',
    }
})

export default FlipCard;