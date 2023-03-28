import { View, TouchableOpacity, StyleSheet, StatusBar, Text, Button } from 'react-native'
import React, { useState } from 'react'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"


const App = () => {

  const [currentPlayer, setCurrentPlayer] = useState(1)
  const [playerWon, setPlayerWon] = useState(false)
  const [gameState, setGameState] = useState(
    [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ]
  )

  const initializeGame = () => {
    setPlayerWon(false)
    setGameState(
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ]
    )
  }

  const renderIcon = (row, col) => {
    const value = gameState[row][col]
    switch (value) {
      case 1:
        return <MaterialCommunityIcons name="close" size={40} style={styles.tileX} />
      case -1:
        return <MaterialCommunityIcons name="circle-outline" size={40} style={styles.tileY} />
      default: return <View />
    }
  }

  const getWinner = () => {

    const NUM_TILES = 3;
    var sum;
    var arr = gameState;

    for (let i = 0; i < NUM_TILES; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2]
      // Calculates value for the whole row
      console.log(arr[i][0])
      if (sum == 3) { return 1 }
      else if (sum == -3) { return -1 }
    }

    for (let i = 0; i < NUM_TILES; i++) {
      sum = arr[0][i] + arr[1][i] + arr[2][i]
      // Calculates value for the single tile
      console.log(arr[0][i])
      if (sum == 3) { return 1 }
      else if (sum == -3) { return -1 }
    }

    // Check the diagonals
    for (let i = 0; i < NUM_TILES; i++) {
      sum = arr[0][0] + arr[1][1] + arr[2][2]
      if (sum == 3) { return 1 }
      else if (sum == -3) { return -1 }
    }

    for (let i = 0; i < NUM_TILES; i++) {
      sum = arr[2][0] + arr[1][1] + arr[0][2]
      if (sum == 3) { return 1 }
      else if (sum == -3) { return -1 }
    }
  }

  const onTilePress = (row, col) => {

    // Don't allow the user to change the current occupied tile
    const value = gameState[row][col]
    if (value != 0) return

    var arr = gameState.slice()
    arr[row][col] = currentPlayer
    setGameState(arr)

    // Change the current Player
    const nextPlayer = (currentPlayer == 1) ? -1 : 1
    setCurrentPlayer(nextPlayer)

    var winner = getWinner()

    if (winner == 1) {
      setPlayerWon(true)
    } else if (winner == -1) {
      setPlayerWon(true)
    } else {
      setPlayerWon(true)
    }
  }


  return (
    <>
      <StatusBar backgroundColor={currentPlayer == 1 ? "red" : "green"} />
      <View style={{
        justifyContent: "center",
        alignItems: "center",
        top: 50
      }}>
        <Text style={styles.gameName}>Tic Tac Toe</Text>
        {playerWon && <Text style={[styles.playerWinState, { color: (currentPlayer == 1) ? "red" : "green" }]}>
          Player {(currentPlayer == 1) ? "One" : "Two"} has won.
        </Text>}
      </View>
      <View style={styles.centeredElement}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0 }]} onPress={() => onTilePress(0, 0)}>
            {renderIcon(0, 0)}
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tile, { borderTopWidth: 0 }]}
            onPress={() => onTilePress(0, 1)}>
            {renderIcon(0, 1)}
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tile, { borderTopWidth: 0, borderRightWidth: 0 }]}
            onPress={() => onTilePress(0, 2)}
          >
            {renderIcon(0, 2)}
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={[styles.tile, { borderLeftWidth: 0 }]} onPress={() => onTilePress(1, 0)}>
            {renderIcon(1, 0)}
          </TouchableOpacity>
          <TouchableOpacity style={styles.tile} onPress={() => onTilePress(1, 1)}>
            {renderIcon(1, 1)}
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tile, { borderRightWidth: 0 }]} onPress={() => onTilePress(1, 2)}>
            {renderIcon(1, 2)}
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={[styles.tile, { borderLeftWidth: 0, borderBottomWidth: 0 }]} onPress={() => onTilePress(2, 0)}>
            {renderIcon(2, 0)}
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tile, { borderBottomWidth: 0 }]} onPress={() => onTilePress(2, 1)}>
            {renderIcon(2, 1)}
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tile, { borderBottomWidth: 0, borderRightWidth: 0 }]} onPress={() => onTilePress(2, 2)}>
            {renderIcon(2, 2)}
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 50 }}>
          <Button title='Restart' onPress={() => initializeGame()} />
        </View>
      </View>
    </>
  )
}

export default App

const styles = StyleSheet.create({
  tile: {
    borderWidth: 5,
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: "center"
  },
  centeredElement: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  tileX: {
    color: "red",
  },
  tileY: {
    color: "green"
  },
  gameName: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
  },
  playerWinState: {
    marginTop: 10,
    fontSize: 19,
    top: 20,
    fontWeight: "bold",
    fontFamily: "monospace"
  }
})