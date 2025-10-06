<template>
  <div class="lunar-lander">
    <div class="game-container">
      <canvas ref="canvas" :width="canvasWidth" :height="canvasHeight"></canvas>
      
      <div class="game-overlay" v-if="!gameStarted">
        <div class="overlay-content">
          <h2>🚀 Посадка на Луну</h2>
          <p>Управление:</p>
          <div class="controls-info">
            <div>⬆️ Стрелка вверх или W - главный двигатель</div>
            <div>⬅️➡️ Стрелки влево/вправо или A/D - боковые двигатели</div>
          </div>
          <p class="goal">Цель: мягко приземлиться на посадочную площадку</p>
          <button @click="startGame" class="start-btn">Начать игру</button>
        </div>
      </div>
      
      <div class="game-overlay" v-if="gameOver">
        <div class="overlay-content">
          <h2 v-if="landed">🎉 Успешная посадка!</h2>
          <h2 v-else-if="crashed">💥 Крушение!</h2>
          <h2 v-else>⛽ Топливо закончилось!</h2>
          
          <div class="stats">
            <p v-if="landed">Скорость посадки: {{ Math.round(lastVelocity) }} м/с</p>
            <p v-if="landed">Оставшееся топливо: {{ Math.round(fuel) }}%</p>
            <p v-if="landed">Счёт: {{ score }}</p>
            <p v-if="crashed && crashReason">{{ crashReason }}</p>
          </div>
          
          <button @click="resetGame" class="start-btn">Играть снова</button>
        </div>
      </div>
      
      <div class="hud">
        <div class="hud-item">
          <span class="label">Высота</span>
          <span class="value">{{ Math.round(lander.y) }}м</span>
        </div>
        <div class="hud-item">
          <span class="label">Гор. скорость</span>
          <span class="value" :class="{ danger: Math.abs(lander.vx * 10) > 10 }">
            {{ Math.round(lander.vx * 10) }}м/с
          </span>
        </div>
        <div class="hud-item">
          <span class="label">Верт. скорость</span>
          <span class="value" :class="{ danger: lander.vy * 10 > 20 }">
            {{ Math.round(lander.vy * 10) }}м/с
          </span>
        </div>
        <div class="hud-item">
          <span class="label">Топливо</span>
          <div class="fuel-bar">
            <div class="fuel-level" :style="{ width: fuel + '%' }"></div>
          </div>
        </div>
        <div class="hud-item">
          <span class="label">Угол</span>
          <span class="value" :class="{ danger: Math.abs(lander.angle) > 15 }">
            {{ Math.round(lander.angle) }}°
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LunarLander',
  data() {
    return {
      canvasWidth: 800,
      canvasHeight: 600,
      gameStarted: false,
      gameOver: false,
      landed: false,
      crashed: false,
      crashReason: '',
      score: 0,
      lastVelocity: 0,
      
      lander: {
        x: 400,
        y: 100,
        vx: 0,
        vy: 0,
        angle: 0,
        width: 30,
        height: 40
      },
      
      fuel: 100,
      gravity: 0.05, // Уменьшил для правильной физики за кадр
      thrustPower: 0.15, // Тяга теперь правильно сбалансирована
      rotationSpeed: 1,
      
      keys: {
        up: false,
        left: false,
        right: false
      },
      
      particles: [],
      stars: [],
      terrain: [],
      landingPad: {
        x: 0,
        y: 0,
        width: 80
      },
      
      animationId: null
    }
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    this.ctx = this.canvas.getContext('2d');
    this.generateStars();
    this.generateTerrain();
    this.setupControls();
  },
  beforeUnmount() {
    this.removeControls();
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  },
  methods: {
    setupControls() {
      this.keydownHandler = (e) => {
        if (!this.gameStarted || this.gameOver) return;
        
        switch(e.key.toLowerCase()) {
          case 'arrowup':
          case 'w':
            this.keys.up = true;
            e.preventDefault();
            break;
          case 'arrowleft':
          case 'a':
            this.keys.left = true;
            e.preventDefault();
            break;
          case 'arrowright':
          case 'd':
            this.keys.right = true;
            e.preventDefault();
            break;
        }
      };
      
      this.keyupHandler = (e) => {
        switch(e.key.toLowerCase()) {
          case 'arrowup':
          case 'w':
            this.keys.up = false;
            break;
          case 'arrowleft':
          case 'a':
            this.keys.left = false;
            break;
          case 'arrowright':
          case 'd':
            this.keys.right = false;
            break;
        }
      };
      
      window.addEventListener('keydown', this.keydownHandler);
      window.addEventListener('keyup', this.keyupHandler);
    },
    
    removeControls() {
      window.removeEventListener('keydown', this.keydownHandler);
      window.removeEventListener('keyup', this.keyupHandler);
    },
    
    generateStars() {
      this.stars = [];
      for (let i = 0; i < 100; i++) {
        this.stars.push({
          x: Math.random() * this.canvasWidth,
          y: Math.random() * this.canvasHeight * 0.7,
          size: Math.random() * 2,
          brightness: Math.random()
        });
      }
    },
    
    generateTerrain() {
      this.terrain = [];
      const points = 30;
      const baseHeight = this.canvasHeight - 100;
      
      // Выбираем случайное место для посадочной площадки
      const padIndex = Math.floor(Math.random() * (points - 3)) + 1;
      
      for (let i = 0; i <= points; i++) {
        const x = (i / points) * this.canvasWidth;
        let y;
        
        // Создаём плоскую площадку для посадки
        if (i === padIndex || i === padIndex + 1) {
          y = baseHeight + Math.random() * 30;
          if (i === padIndex) {
            this.landingPad.x = x;
            this.landingPad.y = y;
          }
        } else {
          y = baseHeight + Math.random() * 150 - 50;
        }
        
        this.terrain.push({ x, y });
      }
    },
    
    startGame() {
      this.gameStarted = true;
      this.gameOver = false;
      this.landed = false;
      this.crashed = false;
      this.fuel = 100;
      this.score = 0;
      this.particles = [];
      
      // Сброс позиции посадочного модуля
      this.lander = {
        x: Math.random() * (this.canvasWidth - 200) + 100,
        y: 80, // Начинаем чуть ниже
        vx: (Math.random() - 0.5) * 0.5, // Ещё меньше начальная скорость
        vy: 0.2, // Совсем небольшая скорость падения
        angle: 0,
        width: 30,
        height: 40
      };
      
      this.gameLoop();
    },
    
    resetGame() {
      this.generateTerrain();
      this.startGame();
    },
    
    gameLoop() {
      if (this.gameOver) return;
      
      this.update();
      this.draw();
      this.animationId = requestAnimationFrame(() => this.gameLoop());
    },
    
    update() {
      // Обработка управления
      if (this.fuel > 0) {
        if (this.keys.up) {
          const angleRad = this.lander.angle * Math.PI / 180;
          const thrustX = Math.sin(angleRad) * this.thrustPower;
          const thrustY = -Math.cos(angleRad) * this.thrustPower;
          
          this.lander.vx += thrustX;
          this.lander.vy += thrustY;
          this.fuel -= 0.15; // Уменьшил расход топлива
          
          // Добавляем частицы выхлопа
          this.createExhaustParticles();
        }
        
        if (this.keys.left) {
          this.lander.angle -= this.rotationSpeed;
          this.fuel -= 0.02; // Уменьшил расход на повороты
        }
        
        if (this.keys.right) {
          this.lander.angle += this.rotationSpeed;
          this.fuel -= 0.02; // Уменьшил расход на повороты
        }
      }
      
      // Нормализация угла (держим в пределах -180 до 180)
      while (this.lander.angle > 180) this.lander.angle -= 360;
      while (this.lander.angle < -180) this.lander.angle += 360;
      
      // Гравитация
      this.lander.vy += this.gravity;
      
      // Обновление позиции
      this.lander.x += this.lander.vx;
      this.lander.y += this.lander.vy;
      
      // Ограничения по краям
      if (this.lander.x < 0) {
        this.lander.x = 0;
        this.lander.vx = -this.lander.vx * 0.5;
      }
      if (this.lander.x > this.canvasWidth) {
        this.lander.x = this.canvasWidth;
        this.lander.vx = -this.lander.vx * 0.5;
      }
      
      // Проверка столкновения с поверхностью
      this.checkCollision();
      
      // Обновление частиц
      this.updateParticles();
      
      // Проверка топлива
      if (this.fuel <= 0) {
        this.fuel = 0;
      }
    },
    
    createExhaustParticles() {
      const angleRad = this.lander.angle * Math.PI / 180;
      
      for (let i = 0; i < 5; i++) {
        this.particles.push({
          x: this.lander.x - Math.sin(angleRad) * 20,
          y: this.lander.y + this.lander.height/2 + Math.cos(angleRad) * 20,
          vx: (Math.random() - 0.5) * 100 - Math.sin(angleRad) * 200,
          vy: Math.random() * 100 + Math.cos(angleRad) * 200,
          life: 1,
          color: Math.random() > 0.5 ? '#ffaa00' : '#ff6600'
        });
      }
    },
    
    updateParticles() {
      this.particles = this.particles.filter(p => {
        p.x += p.vx * 0.016;
        p.y += p.vy * 0.016;
        p.vy += this.gravity * 0.5; // Частицы тоже падают
        p.life -= 0.02;
        return p.life > 0;
      });
    },
    
    checkCollision() {
      const groundY = this.getGroundY(this.lander.x);
      
      if (this.lander.y + this.lander.height/2 >= groundY) {
        this.lastVelocity = this.lander.vy;
        
        // Проверяем, приземлились ли мы на посадочную площадку
        const onPad = Math.abs(this.lander.x - (this.landingPad.x + this.landingPad.width/2)) < this.landingPad.width/2;
        
        if (onPad && 
            this.lander.vy < 2 && 
            Math.abs(this.lander.vx) < 1 && 
            Math.abs(this.lander.angle) < 15) {
          // Успешная посадка
          this.landed = true;
          this.gameOver = true;
          this.calculateScore();
        } else {
          // Крушение
          this.crashed = true;
          this.gameOver = true;
          
          if (!onPad) {
            this.crashReason = 'Промахнулись мимо посадочной площадки!';
          } else if (this.lander.vy >= 2) {
            this.crashReason = `Слишком высокая вертикальная скорость: ${Math.round(this.lander.vy * 10)} м/с`;
          } else if (Math.abs(this.lander.vx) >= 1) {
            this.crashReason = `Слишком высокая горизонтальная скорость: ${Math.round(Math.abs(this.lander.vx) * 10)} м/с`;
          } else if (Math.abs(this.lander.angle) >= 15) {
            this.crashReason = `Слишком большой угол наклона: ${Math.round(this.lander.angle)}°`;
          }
          
          this.createExplosion();
        }
      }
    },
    
    getGroundY(x) {
      for (let i = 0; i < this.terrain.length - 1; i++) {
        if (x >= this.terrain[i].x && x <= this.terrain[i + 1].x) {
          const t = (x - this.terrain[i].x) / (this.terrain[i + 1].x - this.terrain[i].x);
          return this.terrain[i].y + t * (this.terrain[i + 1].y - this.terrain[i].y);
        }
      }
      return this.canvasHeight;
    },
    
    createExplosion() {
      for (let i = 0; i < 30; i++) {
        const angle = (Math.PI * 2 * i) / 30;
        const speed = Math.random() * 200 + 100;
        this.particles.push({
          x: this.lander.x,
          y: this.lander.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          color: ['#ff0000', '#ff6600', '#ffaa00'][Math.floor(Math.random() * 3)]
        });
      }
    },
    
    calculateScore() {
      let baseScore = 1000;
      
      // Бонус за мягкую посадку
      baseScore += Math.max(0, 500 - this.lastVelocity * 10);
      
      // Бонус за экономию топлива
      baseScore += this.fuel * 10;
      
      // Бонус за точность угла
      baseScore += Math.max(0, 300 - Math.abs(this.lander.angle) * 20);
      
      this.score = Math.round(baseScore);
    },
    
    draw() {
      const ctx = this.ctx;
      
      // Очистка и фон
      ctx.fillStyle = '#000814';
      ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
      
      // Звёзды
      ctx.fillStyle = '#ffffff';
      this.stars.forEach(star => {
        ctx.globalAlpha = star.brightness;
        ctx.fillRect(star.x, star.y, star.size, star.size);
      });
      ctx.globalAlpha = 1;
      
      // Луна на фоне
      const gradient = ctx.createRadialGradient(100, 100, 0, 100, 100, 60);
      gradient.addColorStop(0, 'rgba(255, 255, 200, 0.3)');
      gradient.addColorStop(1, 'rgba(255, 255, 200, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 200, 200);
      
      // Поверхность Луны
      ctx.beginPath();
      ctx.moveTo(0, this.canvasHeight);
      this.terrain.forEach(point => {
        ctx.lineTo(point.x, point.y);
      });
      ctx.lineTo(this.canvasWidth, this.canvasHeight);
      ctx.closePath();
      
      ctx.fillStyle = '#4a4a4a';
      ctx.fill();
      ctx.strokeStyle = '#666666';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Посадочная площадка
      ctx.fillStyle = '#00ff00';
      ctx.fillRect(this.landingPad.x, this.landingPad.y - 5, this.landingPad.width, 5);
      
      // Маркеры площадки
      ctx.fillStyle = '#ffff00';
      ctx.fillRect(this.landingPad.x - 5, this.landingPad.y - 10, 5, 10);
      ctx.fillRect(this.landingPad.x + this.landingPad.width, this.landingPad.y - 10, 5, 10);
      
      // Частицы
      this.particles.forEach(p => {
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x - 2, p.y - 2, 4, 4);
      });
      ctx.globalAlpha = 1;
      
      // Посадочный модуль (если не взорвался)
      if (!this.crashed) {
        ctx.save();
        ctx.translate(this.lander.x, this.lander.y);
        ctx.rotate(this.lander.angle * Math.PI / 180);
        
        // Корпус
        ctx.fillStyle = '#cccccc';
        ctx.fillRect(-this.lander.width/2, -this.lander.height/2, this.lander.width, this.lander.height);
        
        // Ноги
        ctx.strokeStyle = '#888888';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-this.lander.width/2, this.lander.height/2);
        ctx.lineTo(-this.lander.width/2 - 10, this.lander.height/2 + 15);
        ctx.moveTo(this.lander.width/2, this.lander.height/2);
        ctx.lineTo(this.lander.width/2 + 10, this.lander.height/2 + 15);
        ctx.stroke();
        
        // Окно
        ctx.fillStyle = '#4488ff';
        ctx.fillRect(-8, -this.lander.height/2 + 5, 16, 10);
        
        // Сопло
        ctx.fillStyle = '#666666';
        ctx.fillRect(-5, this.lander.height/2 - 5, 10, 8);
        
        ctx.restore();
      }
    }
  }
}
</script>

<style scoped>
.lunar-lander {
  display: flex;
  justify-content: center;
  padding: 1rem;
  background: linear-gradient(135deg, #0a0814 0%, #1a1a2e 100%);
  border-radius: 12px;
  font-family: 'Courier New', monospace;
}

.game-container {
  position: relative;
}

canvas {
  border: 2px solid rgba(100, 100, 255, 0.3);
  border-radius: 8px;
  box-shadow: 0 0 30px rgba(100, 100, 255, 0.2);
  background: #000814;
}

.game-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 8, 20, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.overlay-content {
  text-align: center;
  color: white;
  padding: 2rem;
  background: rgba(20, 20, 40, 0.9);
  border-radius: 12px;
  border: 1px solid rgba(100, 100, 255, 0.3);
  max-width: 400px;
}

.overlay-content h2 {
  margin: 0 0 1rem 0;
  font-size: 2rem;
  color: #aaccff;
  text-shadow: 0 0 20px rgba(170, 204, 255, 0.5);
}

.controls-info {
  background: rgba(0, 0, 0, 0.3);
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
  text-align: left;
  font-size: 0.9rem;
  line-height: 1.8;
}

.goal {
  color: #00ff00;
  margin: 1rem 0;
  font-weight: bold;
}

.stats {
  margin: 1.5rem 0;
  font-size: 1.1rem;
  line-height: 1.6;
}

.stats p {
  margin: 0.5rem 0;
  color: #ccddff;
}

.start-btn {
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background: linear-gradient(135deg, #00aa00 0%, #00ff00 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 255, 0, 0.3);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}

.start-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 255, 0, 0.4);
}

.start-btn:active {
  transform: translateY(0);
}

.hud {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.7);
  padding: 1rem;
  border-radius: 8px;
  color: white;
  font-size: 0.9rem;
  min-width: 200px;
  border: 1px solid rgba(100, 255, 100, 0.3);
}

.hud-item {
  margin: 0.5rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.hud-item .label {
  color: #88aacc;
  margin-right: 1rem;
}

.hud-item .value {
  color: #00ff00;
  font-weight: bold;
  min-width: 60px;
  text-align: right;
}

.hud-item .value.danger {
  color: #ff4444;
  animation: blink 0.5s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  25%, 75% { opacity: 0.5; }
}

.fuel-bar {
  width: 80px;
  height: 12px;
  background: #333333;
  border: 1px solid #666666;
  border-radius: 2px;
  overflow: hidden;
}

.fuel-level {
  height: 100%;
  background: linear-gradient(90deg, #ff0000 0%, #ffaa00 50%, #00ff00 100%);
  transition: width 0.3s ease;
}

@media (max-width: 850px) {
  canvas {
    width: 100%;
    max-width: 600px;
    height: auto;
  }
  
  .hud {
    font-size: 0.8rem;
    min-width: 180px;
  }
}
</style>