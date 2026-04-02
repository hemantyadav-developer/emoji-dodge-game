/**
 * Emoji Dodge - arcade mobile game
 */

import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Dimensions,
  PanResponder,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
const PLAYER_SIZE = 52;
const EMOJI_SIZE = 36;
const PLAYER_Y_OFFSET = 80;
const SPAWN_INTERVAL_MS = 650;
const GAME_TICK_MS = 30;
const EMOJI_CHOICES = ['😈', '💀', '👾', '🕷️', '🔥', '❌', '☠️', '🎃', '🙀', '😱'];

type GameState = 'home' | 'playing' | 'gameover';
type EmojiProjectile = {id: number; x: number; y: number; speed: number; icon: string};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function App() {
  const [gameState, setGameState] = useState<GameState>('home');
  const [playerX, setPlayerX] = useState((SCREEN_WIDTH - PLAYER_SIZE) / 2);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [enemies, setEnemies] = useState<EmojiProjectile[]>([]);

  const scoreRef = useRef(0);
  const enemyRef = useRef<EmojiProjectile[]>([]);
  const playerXRef = useRef(playerX);
  const lastSpawnRef = useRef(Date.now());
  const startTimestampRef = useRef(Date.now());
  const nextIdRef = useRef(1);

  playerXRef.current = playerX;
  enemyRef.current = enemies;

  const spawnEmoji = () => {
    const x = Math.random() * (SCREEN_WIDTH - EMOJI_SIZE);
    const speed = 2 + Math.random() * 3;
    const emoji = EMOJI_CHOICES[Math.floor(Math.random() * EMOJI_CHOICES.length)];
    const id = nextIdRef.current++;
    const payload: EmojiProjectile = {id, x, y: -EMOJI_SIZE, speed, icon: emoji};
    setEnemies(prev => [...prev, payload]);
  };

  const startGame = () => {
    setEnemies([]);
    setScore(0);
    scoreRef.current = 0;
    setPlayerX((SCREEN_WIDTH - PLAYER_SIZE) / 2);
    playerXRef.current = (SCREEN_WIDTH - PLAYER_SIZE) / 2;
    startTimestampRef.current = Date.now();
    lastSpawnRef.current = Date.now();
    setGameState('playing');
  };

  const endGame = () => {
    setGameState('gameover');
    setBestScore(prev => Math.max(prev, scoreRef.current));
  };

  useEffect(() => {
    if (gameState !== 'playing') {
      return;
    }

    const timer = setInterval(() => {
      const now = Date.now();
      const elapsed = now - startTimestampRef.current;
      const nextScore = Math.floor(elapsed / 100);
      scoreRef.current = nextScore;
      setScore(nextScore);

      if (now - lastSpawnRef.current > SPAWN_INTERVAL_MS) {
        spawnEmoji();
        lastSpawnRef.current = now;
      }

      setEnemies(prev => {
        const next = prev
          .map(enemy => ({...enemy, y: enemy.y + enemy.speed}))
          .filter(enemy => enemy.y < SCREEN_HEIGHT + EMOJI_SIZE);

        const playerLeft = playerXRef.current;
        const playerRight = playerLeft + PLAYER_SIZE;
        const playerTop = SCREEN_HEIGHT - PLAYER_Y_OFFSET - PLAYER_SIZE / 2;
        const playerBottom = playerTop + PLAYER_SIZE;

        for (const enemy of next) {
          const enemyLeft = enemy.x;
          const enemyRight = enemy.x + EMOJI_SIZE;
          const enemyTop = enemy.y;
          const enemyBottom = enemy.y + EMOJI_SIZE;

          const overlapX = playerLeft < enemyRight && playerRight > enemyLeft;
          const overlapY = playerTop < enemyBottom && playerBottom > enemyTop;

          if (overlapX && overlapY) {
            endGame();
            return next;
          }
        }

        return next;
      });
    }, GAME_TICK_MS);

    return () => clearInterval(timer);
  }, [gameState]);

  const movePlayer = (targetX: number) => {
    const newX = clamp(targetX, 0, SCREEN_WIDTH - PLAYER_SIZE);
    setPlayerX(newX);
    playerXRef.current = newX;
  };

  const moveLeft = () => movePlayer(playerXRef.current - 40);
  const moveRight = () => movePlayer(playerXRef.current + 40);

  const panResponder = useMemo(() =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_ev, gestureState) => {
        const newX = clamp(playerXRef.current + gestureState.dx, 0, SCREEN_WIDTH - PLAYER_SIZE);
        setPlayerX(newX);
        playerXRef.current = newX;
      },
      onPanResponderRelease: () => {},
    }),
    [],
  );

  const renderHome = () => (
    <View style={styles.screenCenter}>
      <Text style={styles.title}>Emoji Dodge</Text>
      <Text style={styles.subtitle}>Avoid the falling emojis!</Text>
      <TouchableOpacity style={styles.button} onPress={startGame}>
        <Text style={styles.buttonText}>Start Game</Text>
      </TouchableOpacity>
    </View>
  );

  const renderGameOver = () => (
    <View style={styles.screenCenter}>
      <Text style={styles.title}>Game Over</Text>
      <Text style={styles.scoreText}>Score: {scoreRef.current}</Text>
      <Text style={styles.bestText}>Best: {bestScore}</Text>
      <TouchableOpacity style={styles.button} onPress={startGame}>
        <Text style={styles.buttonText}>Play Again</Text>
      </TouchableOpacity>
    </View>
  );

  const renderGameplay = () => {
    const playerStyle: ViewStyle = {
      position: 'absolute',
      width: PLAYER_SIZE,
      height: PLAYER_SIZE,
      borderRadius: PLAYER_SIZE / 2,
      backgroundColor: '#ff9f00',
      left: playerX,
      top: SCREEN_HEIGHT - PLAYER_Y_OFFSET,
      justifyContent: 'center',
      alignItems: 'center',
    };

    return (
      <View style={styles.gameContainer} {...panResponder.panHandlers}>
        <Text style={styles.scoreDisplay}>Score: {score}</Text>
        <Text style={styles.bestDisplay}>Best: {bestScore}</Text>

        {enemies.map(enemy => (
          <Text
            key={enemy.id}
            style={{
              position: 'absolute',
              left: enemy.x,
              top: enemy.y,
              fontSize: EMOJI_SIZE,
            }}>
            {enemy.icon}
          </Text>
        ))}

        <View style={playerStyle}>
          <Text style={styles.playerEmoji}>🙂</Text>
        </View>

        <View style={styles.controlsContainer}>
          <TouchableOpacity style={styles.controlButton} onPress={moveLeft}>
            <Text style={styles.controlText}>◀</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton} onPress={moveRight}>
            <Text style={styles.controlText}>▶</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {gameState === 'home' && renderHome()}
      {gameState === 'playing' && renderGameplay()}
      {gameState === 'gameover' && renderGameOver()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1f3d',
  },
  screenCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 42,
    fontWeight: '900',
    marginBottom: 12,
    color: '#fff',
  },
  subtitle: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 28,
  },
  button: {
    backgroundColor: '#0ccf9a',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginTop: 8,
  },
  buttonText: {
    color: '#0d1f3d',
    fontSize: 20,
    fontWeight: '700',
  },
  scoreText: {
    fontSize: 30,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
  },
  bestText: {
    fontSize: 20,
    color: '#f5f5f5',
    marginBottom: 24,
  },
  gameContainer: {
    flex: 1,
  },
  scoreDisplay: {
    position: 'absolute',
    top: 18,
    left: 18,
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
    zIndex: 10,
  },
  bestDisplay: {
    position: 'absolute',
    top: 18,
    right: 18,
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
    zIndex: 10,
  },
  playerEmoji: {
    fontSize: 30,
    color: '#0d1f3d',
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 24,
    zIndex: 20,
  },
  controlButton: {
    width: 120,
    height: 50,
    borderRadius: 14,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlText: {
    fontSize: 26,
    color: '#0d1f3d',
    fontWeight: 'bold',
  },
});
