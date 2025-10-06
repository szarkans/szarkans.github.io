<template>
  <div class="galaxy-simulator">
    <canvas ref="canvas" :width="canvasSize" :height="canvasSize"></canvas>
    
    <div class="controls-panel">
      <h3>Галактика</h3>
      
      <div class="control-group">
        <label>
          <span>Кол-во звёд: {{ starsCount }}</span>
          <input type="range" v-model.number="starsCount" min="500" max="10000" step="100">
        </label>
      </div>
      
      <div class="control-group">
        <label>
          <span>Скорость вращения: {{ rotationSpeed.toFixed(3) }}</span>
          <input type="range" v-model.number="rotationSpeed" min="0" max="0.5" step="0.001">
        </label>
      </div>
      
      <div class="control-group">
        <label>
          <span>Кол-во рукавов: {{ spiralArms }}</span>
          <input type="range" v-model.number="spiralArms" min="2" max="12" step="1">
        </label>
      </div>
      
      <div class="control-group">
        <label>
          <span>Суженость спирали: {{ spiralTightness.toFixed(1) }}</span>
          <input type="range" v-model.number="spiralTightness" min="0.5" max="2.5" step="0.1">
        </label>
      </div>
      
      <div class="control-group">
        <label>
          <span>Размер галактики: {{ galaxySize }}%</span>
          <input type="range" v-model.number="galaxySize" min="10" max="80" step="5">
        </label>
      </div>
      
      <div class="control-group">
        <label>
          <span>Лимит ФПС: {{ fpsLimit }}</span>
          <input type="range" v-model.number="fpsLimit" min="15" max="120" step="15">
        </label>
      </div>
      
      <div class="control-group">
        <label>
          <span>Качество: {{ quality }}</span>
          <select v-model="quality">
            <option value="low">Низкое</option>
            <option value="medium">Среднее</option>
            <option value="high">Высокое</option>
          </select>
        </label>
      </div>
      
      <div class="control-group">
        <label>
          <input type="checkbox" v-model="isPaused">
          <span>Остановить анимацию</span>
        </label>
      </div>
      
      <button @click="regenerateGalaxy" class="regenerate-btn">Перезагрузить</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GalaxySimulator',
  data() {
    return {
      canvasSize: 600,
      starsCount: 500,
      rotationSpeed: 0.003,
      spiralArms: 4,
      spiralTightness: 1.5,
      galaxySize: 50,
      fpsLimit: 30,
      quality: 'medium',
      isPaused: false,
      animationId: null,
      backgroundStars: [],
      galaxyStars: [],
      rotation: 0,
      lastFrameTime: 0,
      frameInterval: 1000 / 30
    }
  },
  computed: {
    qualitySettings() {
      const settings = {
        low: {
          bgStars: 150,
          shadowBlur: false,
          glowEffect: false
        },
        medium: {
          bgStars: 250,
          shadowBlur: false,
          glowEffect: true
        },
        high: {
          bgStars: 500,
          shadowBlur: true,
          glowEffect: true
        }
      };
      return settings[this.quality];
    }
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    this.ctx = this.canvas.getContext('2d', { alpha: false });
    this.ctx.imageSmoothingEnabled = false;
    this.initBackground();
    this.initGalaxy();
    this.animate();
  },
  beforeUnmount() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  },
  watch: {
    starsCount() {
      this.initGalaxy();
    },
    spiralArms() {
      this.initGalaxy();
    },
    spiralTightness() {
      this.initGalaxy();
    },
    galaxySize() {
      this.initGalaxy();
    },
    quality() {
      this.initBackground();
      this.initGalaxy();
    },
    fpsLimit(newVal) {
      this.frameInterval = 1000 / newVal;
    }
  },
  methods: {
    initBackground() {
      this.backgroundStars = [];
      const bgStarCount = this.qualitySettings.bgStars;
      
      for (let i = 0; i < bgStarCount; i++) {
        this.backgroundStars.push({
          x: Math.random() * this.canvasSize,
          y: Math.random() * this.canvasSize,
          size: Math.random() * 1.2,
          brightness: Math.random() * 0.6 + 0.2
        });
      }
    },
    
    initGalaxy() {
      this.galaxyStars = [];
      const centerX = this.canvasSize / 2;
      const centerY = this.canvasSize / 2;
      const maxRadius = (this.canvasSize * this.galaxySize) / 200;
      
      for (let i = 0; i < this.starsCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const armIndex = Math.floor(Math.random() * this.spiralArms);
        const armAngle = (armIndex * Math.PI * 2) / this.spiralArms;
        
        const distance = Math.pow(Math.random(), 1.5) * maxRadius;
        const spiralAngle = armAngle + (distance / maxRadius) * this.spiralTightness * Math.PI;
        
        const scatter = (Math.random() - 0.5) * 0.5;
        const scatterDistance = distance + scatter * 15;
        
        const x = centerX + Math.cos(spiralAngle + angle * 0.2) * scatterDistance;
        const y = centerY + Math.sin(spiralAngle + angle * 0.2) * scatterDistance;
        
        const normalizedDistance = distance / maxRadius;
        const brightness = Math.max(0.3, 1 - normalizedDistance * 0.6);
        
        let color;
        if (normalizedDistance < 0.3) {
          color = '#ffeeaa';
        } else if (normalizedDistance < 0.6) {
          color = '#ffffff';
        } else {
          color = '#aaccff';
        }
        
        this.galaxyStars.push({
          x,
          y,
          originalX: x - centerX,
          originalY: y - centerY,
          size: Math.random() * 1.5 + 0.5,
          brightness,
          color,
          speed: (Math.random() * 0.5 + 0.5) * (1 - normalizedDistance * 0.3)
        });
      }
    },
    
    animate(currentTime) {
      this.animationId = requestAnimationFrame((time) => this.animate(time));
      
      if (!currentTime) {
        currentTime = performance.now();
      }
      
      const deltaTime = currentTime - this.lastFrameTime;
      
      if (deltaTime >= this.frameInterval) {
        this.lastFrameTime = currentTime - (deltaTime % this.frameInterval);
        
        if (!this.isPaused) {
          this.rotation += this.rotationSpeed;
          this.draw();
        }
      }
    },
    
    draw() {
      const ctx = this.ctx;
      
      // Clear canvas
      ctx.fillStyle = '#000008';
      ctx.fillRect(0, 0, this.canvasSize, this.canvasSize);
      
      // Draw background stars
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      this.backgroundStars.forEach(star => {
        ctx.globalAlpha = star.brightness;
        ctx.fillRect(star.x, star.y, star.size, star.size);
      });
      ctx.globalAlpha = 1;
      
      // Draw galaxy core glow only if quality allows
      if (this.qualitySettings.glowEffect) {
        const centerX = this.canvasSize / 2;
        const centerY = this.canvasSize / 2;
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 60);
        gradient.addColorStop(0, 'rgba(255, 255, 200, 0.2)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, this.canvasSize, this.canvasSize);
      }
      
      // Draw galaxy stars with rotation
      const centerX = this.canvasSize / 2;
      const centerY = this.canvasSize / 2;
      
      this.galaxyStars.forEach(star => {
        const cos = Math.cos(this.rotation * star.speed);
        const sin = Math.sin(this.rotation * star.speed);
        
        const x = centerX + star.originalX * cos - star.originalY * sin;
        const y = centerY + star.originalX * sin + star.originalY * cos;
        
        // Use fillRect instead of arc for better performance
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.brightness;
        ctx.fillRect(x - star.size/2, y - star.size/2, star.size, star.size);
      });
      
      ctx.globalAlpha = 1;
    },
    
    regenerateGalaxy() {
      this.initBackground();
      this.initGalaxy();
    }
  }
}
</script>

<style scoped>
.galaxy-simulator {
  display: flex;
  gap: 2rem;
  padding: 1rem;
  background: linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 100%);
  border-radius: 12px;
  color: #ffffff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

canvas {
  border: 2px solid rgba(100, 100, 255, 0.3);
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(100, 100, 255, 0.2);
  background: #000008;
  image-rendering: crisp-edges;
  image-rendering: pixelated;
}

.controls-panel {
  min-width: 250px;
  padding: 1.5rem;
  background: rgba(20, 20, 40, 0.8);
  border-radius: 8px;
  border: 1px solid rgba(100, 100, 255, 0.2);
}

.controls-panel h3 {
  margin: 0 0 1.5rem 0;
  text-align: center;
  color: #aaccff;
}

.control-group {
  margin-bottom: 1.2rem;
}

.control-group label {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  cursor: pointer;
}

.control-group span {
  font-size: 0.9rem;
  color: #ccddff;
}

.control-group input[type="range"] {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: linear-gradient(90deg, #2a2a4a 0%, #4a4a8a 100%);
  outline: none;
  -webkit-appearance: none;
}

.control-group input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #aaccff;
  cursor: pointer;
}

.control-group input[type="range"]::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #aaccff;
  cursor: pointer;
}

.control-group select {
  width: 100%;
  padding: 0.3rem;
  background: #2a2a4a;
  color: #ccddff;
  border: 1px solid #4a4a8a;
  border-radius: 4px;
  outline: none;
}

.control-group input[type="checkbox"] {
  margin-right: 0.5rem;
}

.regenerate-btn {
  width: 100%;
  padding: 0.8rem;
  margin-top: 1.5rem;
  background: linear-gradient(135deg, #4a4a8a 0%, #6a6aaa 100%);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.regenerate-btn:hover {
  background: linear-gradient(135deg, #5a5a9a 0%, #7a7aba 100%);
  transform: translateY(-2px);
}

.regenerate-btn:active {
  transform: translateY(0);
}

@media (max-width: 768px) {
  .galaxy-simulator {
    flex-direction: column;
    align-items: center;
  }
  
  canvas {
    width: 100%;
    max-width: 400px;
    height: auto;
  }
  
  .controls-panel {
    width: 100%;
    max-width: 400px;
  }
}
</style>