import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList, View, StyleSheet, Alert } from 'react-native';
import FlipCard from '../components/FlipCard';
import StaticCard from '../components/StaticCard';
import Button from '../components/Button';
import StepCounter from '../components/StepCounter';
import { startGame, selectItem } from '../store/slices';

const MainScreen = () => {
    const dispatch = useDispatch();
    const { data: items, totalSteps, isWin } = useSelector((state) => state.game);

    useEffect(() => {
        dispatch(startGame());
    }, [dispatch]);

    const handleTouch = (item) => () => dispatch(selectItem(item));

    const renderCard = (item) => {
        console.log(item)
        if(item.matched) return <StaticCard value={item.value} />;
        return <FlipCard hiddenValue={item.value} onTouch={handleTouch(item)} keepOpen={item.selected} />;
    };

    const handleResetGame = () => dispatch(startGame());

    const showWinMsg = () => Alert.alert('Congratulations!', `You win the game by ${totalSteps} steps!`, [{ text: 'Try Another Round', onPress: () => dispatch(startGame())}]);

    if (isWin) showWinMsg();
    return(
        <View style={styles.mainScreen}>
            <View style={styles.headerContainer}>
                <Button onPress={handleResetGame} text="Restart" />
                <StepCounter count={totalSteps} />
            </View>
            <FlatList keyExtractor={(item) => item.id} data={items} renderItem={({ item }) => renderCard(item)} numColumns={3} style={styles.flatView} />
        </View>
    )
}

const styles = StyleSheet.create({
    mainScreen: {
        marginHorizontal: 10,
        flexGrow: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 5,
    },
    flatView: {
        flex: 1
    },
})

export default MainScreen;