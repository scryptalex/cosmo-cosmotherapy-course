// Cosmic Music Player with Radio Stations and Meditative Generators
class CosmicMusicPlayer {
    constructor() {
        this.audio = null;
        this.isPlaying = false;
        this.currentStation = null;
        this.volume = 0.5;
        this.isVisible = false;
        
        this.radioStations = [
            {
                id: 'groovesalad',
                name: 'SomaFM Groove Salad',
                url: 'https://ice2.somafm.com/groovesalad-128-mp3',
                description: 'Ambient downtempo electronica',
                type: 'radio',
                genre: 'Ambient'
            },
            {
                id: 'deepspaceone',
                name: 'SomaFM Deep Space One',
                url: 'https://ice1.somafm.com/deepspaceone-128-mp3',
                description: 'Deep ambient electronic music',
                type: 'radio',
                genre: 'Deep Ambient'
            },
            {
                id: 'dronezone',
                name: 'SomaFM Drone Zone',
                url: 'https://ice1.somafm.com/dronezone-128-mp3',
                description: 'Atmospheric ambient soundscapes',
                type: 'radio',
                genre: 'Drone Ambient'
            },
            {
                id: 'spacestation',
                name: 'SomaFM Space Station Soma',
                url: 'https://ice1.somafm.com/spacestation-128-mp3',
                description: 'Psychedelic space music',
                type: 'radio',
                genre: 'Space Music'
            },
            {
                id: 'lush',
                name: 'SomaFM Lush',
                url: 'https://ice1.somafm.com/lush-128-mp3',
                description: 'Sensuous and mellow vocals',
                type: 'radio',
                genre: 'Chillout'
            },
            {
                id: 'thistle',
                name: 'SomaFM Thistle Radio',
                url: 'https://ice1.somafm.com/thistle-128-mp3',
                description: 'Celtic and world music',
                type: 'radio',
                genre: 'Celtic'
            },
            {
                id: 'cosmicmeditation',
                name: 'Cosmic Meditation',
                url: null,
                description: 'AI-generated cosmic meditation sounds',
                type: 'generator',
                genre: 'Meditation'
            },
            {
                id: 'binauralbeats',
                name: 'Binaural Beats Generator',
                url: null,
                description: 'Brainwave entrainment frequencies',
                type: 'generator',
                genre: 'Binaural'
            },
            {
                id: 'tibetanbowls',
                name: 'Tibetan Singing Bowls',
                url: null,
                description: 'Healing bowl frequencies',
                type: 'generator',
                genre: 'Healing'
            },
            {
                id: 'naturecosmic',
                name: 'Cosmic Nature Sounds',
                url: null,
                description: 'Space-themed nature ambience',
                type: 'generator',
                genre: 'Nature'
            }
        ];

        this.generators = {
            cosmicmeditation: new CosmicMeditationGenerator(),
            binauralbeats: new BinauralBeatsGenerator(),
            tibetanbowls: new TibetanBowlsGenerator(),
            naturecosmic: new CosmicNatureGenerator()
        };

        this.initializePlayer();
        this.createPlayerUI();
        this.startDefaultStation();
    }

    initializePlayer() {
        this.audio = new Audio();
        this.audio.volume = this.volume;
        this.audio.crossOrigin = 'anonymous';
        
        this.audio.addEventListener('loadstart', () => this.updateStatus('Подключение...'));
        this.audio.addEventListener('canplay', () => this.updateStatus('Готов к воспроизведению'));
        this.audio.addEventListener('playing', () => this.updateStatus('Играет'));
        this.audio.addEventListener('pause', () => this.updateStatus('Пауза'));
        this.audio.addEventListener('error', (e) => this.handleError(e));
        this.audio.addEventListener('ended', () => this.handleEnded());
    }

    createPlayerUI() {
        const playerHTML = `
            <div id="cosmic-music-player" class="music-player">
                <div class="player-toggle" onclick="cosmicPlayer.toggleVisibility()">
                    <span class="music-icon">🎵</span>
                    <span class="player-title">Космическая музыка</span>
                </div>
                
                <div class="player-content" style="display: none;">
                    <div class="player-header">
                        <div class="current-station">
                            <div class="station-name" id="current-station-name">Выберите станцию</div>
                            <div class="station-description" id="current-station-description">Космическая музыка для медитации</div>
                        </div>
                        <div class="player-controls">
                            <button class="control-btn" id="play-pause-btn" onclick="cosmicPlayer.togglePlayPause()">
                                <span class="play-icon">▶️</span>
                            </button>
                            <button class="control-btn" onclick="cosmicPlayer.stopPlayback()">⏹️</button>
                            <div class="volume-control">
                                <span class="volume-icon">🔊</span>
                                <input type="range" id="volume-slider" min="0" max="100" value="50" 
                                       oninput="cosmicPlayer.setVolume(this.value)">
                            </div>
                        </div>
                    </div>
                    
                    <div class="player-status" id="player-status">Готов к запуску</div>
                    
                    <div class="stations-container">
                        <div class="station-category">
                            <h4>📻 Радиостанции</h4>
                            <div class="stations-grid" id="radio-stations">
                                ${this.renderRadioStations()}
                            </div>
                        </div>
                        
                        <div class="station-category">
                            <h4>🎛️ Генераторы медитативной музыки</h4>
                            <div class="stations-grid" id="generator-stations">
                                ${this.renderGeneratorStations()}
                            </div>
                        </div>
                    </div>
                    
                    <div class="player-visualization" id="player-visualization">
                        <canvas id="visualizer-canvas" width="300" height="100"></canvas>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', playerHTML);
        this.initializeVisualizer();
    }

    renderRadioStations() {
        return this.radioStations
            .filter(station => station.type === 'radio')
            .map(station => `
                <div class="station-card" data-station="${station.id}" onclick="cosmicPlayer.selectStation('${station.id}')">
                    <div class="station-icon">📻</div>
                    <div class="station-info">
                        <div class="station-title">${station.name}</div>
                        <div class="station-genre">${station.genre}</div>
                        <div class="station-desc">${station.description}</div>
                    </div>
                </div>
            `).join('');
    }

    renderGeneratorStations() {
        return this.radioStations
            .filter(station => station.type === 'generator')
            .map(station => `
                <div class="station-card generator-card" data-station="${station.id}" onclick="cosmicPlayer.selectStation('${station.id}')">
                    <div class="station-icon">🎛️</div>
                    <div class="station-info">
                        <div class="station-title">${station.name}</div>
                        <div class="station-genre">${station.genre}</div>
                        <div class="station-desc">${station.description}</div>
                    </div>
                    <div class="generator-controls" id="controls-${station.id}">
                        <!-- Generator-specific controls will be added here -->
                    </div>
                </div>
            `).join('');
    }

    toggleVisibility() {
        this.isVisible = !this.isVisible;
        const content = document.querySelector('.player-content');
        content.style.display = this.isVisible ? 'block' : 'none';
        
        const toggle = document.querySelector('.player-toggle');
        toggle.classList.toggle('active', this.isVisible);
    }

    selectStation(stationId) {
        const station = this.radioStations.find(s => s.id === stationId);
        if (!station) return;

        // Update UI
        document.querySelectorAll('.station-card').forEach(card => {
            card.classList.remove('active');
        });
        document.querySelector(`[data-station="${stationId}"]`).classList.add('active');

        this.currentStation = station;
        document.getElementById('current-station-name').textContent = station.name;
        document.getElementById('current-station-description').textContent = station.description;

        if (station.type === 'radio') {
            this.playRadioStation(station);
        } else {
            this.playGenerator(station);
        }
    }

    playRadioStation(station) {
        this.stopCurrentPlayback();
        
        this.audio.src = station.url;
        this.audio.load();
        
        this.audio.play().then(() => {
            this.isPlaying = true;
            this.updatePlayButton();
        }).catch(e => {
            console.error('Radio playback failed:', e);
            this.updateStatus('Ошибка воспроизведения');
        });
    }

    playGenerator(station) {
        this.stopCurrentPlayback();
        
        const generator = this.generators[station.id];
        if (generator) {
            generator.start();
            this.isPlaying = true;
            this.updatePlayButton();
            this.updateStatus('Генератор запущен');
        }
    }

    stopCurrentPlayback() {
        if (this.audio) {
            this.audio.pause();
            this.audio.src = '';
        }
        
        // Stop all generators
        Object.values(this.generators).forEach(generator => {
            if (generator.isPlaying) {
                generator.stop();
            }
        });
        
        this.isPlaying = false;
        this.updatePlayButton();
    }

    togglePlayPause() {
        if (!this.currentStation) {
            this.startDefaultStation();
            return;
        }

        if (this.isPlaying) {
            this.pausePlayback();
        } else {
            this.resumePlayback();
        }
    }

    pausePlayback() {
        if (this.currentStation.type === 'radio') {
            this.audio.pause();
        } else {
            const generator = this.generators[this.currentStation.id];
            if (generator) generator.pause();
        }
        this.isPlaying = false;
        this.updatePlayButton();
    }

    resumePlayback() {
        if (this.currentStation.type === 'radio') {
            this.audio.play();
        } else {
            const generator = this.generators[this.currentStation.id];
            if (generator) generator.resume();
        }
        this.isPlaying = true;
        this.updatePlayButton();
    }

    stopPlayback() {
        this.stopCurrentPlayback();
        this.updateStatus('Остановлено');
    }

    setVolume(value) {
        this.volume = value / 100;
        this.audio.volume = this.volume;
        
        // Set volume for generators
        Object.values(this.generators).forEach(generator => {
            if (generator.setVolume) {
                generator.setVolume(this.volume);
            }
        });
    }

    updatePlayButton() {
        const btn = document.getElementById('play-pause-btn');
        const icon = btn.querySelector('.play-icon');
        icon.textContent = this.isPlaying ? '⏸️' : '▶️';
    }

    updateStatus(status) {
        document.getElementById('player-status').textContent = status;
    }

    handleError(e) {
        console.error('Audio error:', e);
        this.updateStatus('Ошибка воспроизведения');
        this.isPlaying = false;
        this.updatePlayButton();
    }

    handleEnded() {
        this.isPlaying = false;
        this.updatePlayButton();
    }

    startDefaultStation() {
        // Auto-start Groove Salad
        this.selectStation('groovesalad');
    }

    initializeVisualizer() {
        // Simple audio visualizer
        const canvas = document.getElementById('visualizer-canvas');
        const ctx = canvas.getContext('2d');
        
        this.visualizerAnimation = () => {
            if (!this.isPlaying) return;
            
            ctx.fillStyle = 'rgba(10, 10, 30, 0.3)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Generate cosmic visualization
            const time = Date.now() * 0.001;
            ctx.strokeStyle = `hsl(${time * 50}, 70%, 60%)`;
            ctx.lineWidth = 2;
            
            ctx.beginPath();
            for (let x = 0; x < canvas.width; x += 5) {
                const y = canvas.height / 2 + Math.sin(time + x * 0.01) * 30;
                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();
            
            requestAnimationFrame(this.visualizerAnimation);
        };
        
        setInterval(() => {
            if (this.isPlaying) {
                this.visualizerAnimation();
            }
        }, 100);
    }
}

// Meditative Music Generators
class CosmicMeditationGenerator {
    constructor() {
        this.audioContext = null;
        this.oscillators = [];
        this.isPlaying = false;
        this.volume = 0.5;
    }

    start() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.isPlaying = true;
        
        // Create cosmic meditation tones
        this.createCosmicTones();
    }

    createCosmicTones() {
        const frequencies = [432, 528, 639, 741]; // Healing frequencies
        
        frequencies.forEach((freq, index) => {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);
            
            gainNode.gain.setValueAtTime(this.volume * 0.1, this.audioContext.currentTime);
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.start();
            this.oscillators.push({ oscillator, gainNode });
        });
    }

    stop() {
        this.oscillators.forEach(({ oscillator }) => {
            oscillator.stop();
        });
        this.oscillators = [];
        this.isPlaying = false;
        
        if (this.audioContext) {
            this.audioContext.close();
        }
    }

    pause() {
        this.oscillators.forEach(({ gainNode }) => {
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        });
        this.isPlaying = false;
    }

    resume() {
        this.oscillators.forEach(({ gainNode }) => {
            gainNode.gain.setValueAtTime(this.volume * 0.1, this.audioContext.currentTime);
        });
        this.isPlaying = true;
    }

    setVolume(volume) {
        this.volume = volume;
        this.oscillators.forEach(({ gainNode }) => {
            gainNode.gain.setValueAtTime(volume * 0.1, this.audioContext.currentTime);
        });
    }
}

class BinauralBeatsGenerator {
    constructor() {
        this.audioContext = null;
        this.leftOscillator = null;
        this.rightOscillator = null;
        this.isPlaying = false;
        this.volume = 0.5;
        this.baseFreq = 200;
        this.beatFreq = 10; // 10 Hz alpha waves
    }

    start() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.isPlaying = true;
        
        this.createBinauralBeats();
    }

    createBinauralBeats() {
        // Left ear
        this.leftOscillator = this.audioContext.createOscillator();
        const leftGain = this.audioContext.createGain();
        const leftMerger = this.audioContext.createChannelMerger(2);
        
        this.leftOscillator.frequency.setValueAtTime(this.baseFreq, this.audioContext.currentTime);
        leftGain.gain.setValueAtTime(this.volume * 0.3, this.audioContext.currentTime);
        
        this.leftOscillator.connect(leftGain);
        leftGain.connect(leftMerger, 0, 0);
        
        // Right ear
        this.rightOscillator = this.audioContext.createOscillator();
        const rightGain = this.audioContext.createGain();
        
        this.rightOscillator.frequency.setValueAtTime(this.baseFreq + this.beatFreq, this.audioContext.currentTime);
        rightGain.gain.setValueAtTime(this.volume * 0.3, this.audioContext.currentTime);
        
        this.rightOscillator.connect(rightGain);
        rightGain.connect(leftMerger, 0, 1);
        
        leftMerger.connect(this.audioContext.destination);
        
        this.leftOscillator.start();
        this.rightOscillator.start();
    }

    stop() {
        if (this.leftOscillator) this.leftOscillator.stop();
        if (this.rightOscillator) this.rightOscillator.stop();
        this.isPlaying = false;
        
        if (this.audioContext) {
            this.audioContext.close();
        }
    }

    pause() {
        // Implementation for pause
        this.isPlaying = false;
    }

    resume() {
        // Implementation for resume
        this.isPlaying = true;
    }

    setVolume(volume) {
        this.volume = volume;
    }
}

class TibetanBowlsGenerator {
    constructor() {
        this.audioContext = null;
        this.isPlaying = false;
        this.volume = 0.5;
        this.bowlInterval = null;
    }

    start() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.isPlaying = true;
        
        this.startBowlSequence();
    }

    startBowlSequence() {
        const bowlFreqs = [256, 341, 426, 512]; // Tibetan bowl frequencies
        
        this.bowlInterval = setInterval(() => {
            if (!this.isPlaying) return;
            
            const freq = bowlFreqs[Math.floor(Math.random() * bowlFreqs.length)];
            this.createBowlSound(freq);
        }, 3000);
    }

    createBowlSound(frequency) {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        
        gainNode.gain.setValueAtTime(this.volume * 0.5, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 5);
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + 5);
    }

    stop() {
        if (this.bowlInterval) {
            clearInterval(this.bowlInterval);
        }
        this.isPlaying = false;
        
        if (this.audioContext) {
            this.audioContext.close();
        }
    }

    pause() {
        this.isPlaying = false;
    }

    resume() {
        this.isPlaying = true;
    }

    setVolume(volume) {
        this.volume = volume;
    }
}

class CosmicNatureGenerator {
    constructor() {
        this.audioContext = null;
        this.isPlaying = false;
        this.volume = 0.5;
        this.soundNodes = [];
    }

    start() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.isPlaying = true;
        
        this.createCosmicNatureSounds();
    }

    createCosmicNatureSounds() {
        // Create cosmic wind sounds
        const windNoise = this.createWhiteNoise();
        const windFilter = this.audioContext.createBiquadFilter();
        windFilter.type = 'lowpass';
        windFilter.frequency.setValueAtTime(200, this.audioContext.currentTime);
        
        const windGain = this.audioContext.createGain();
        windGain.gain.setValueAtTime(this.volume * 0.2, this.audioContext.currentTime);
        
        windNoise.connect(windFilter);
        windFilter.connect(windGain);
        windGain.connect(this.audioContext.destination);
        
        this.soundNodes.push({ noise: windNoise, gain: windGain });
    }

    createWhiteNoise() {
        const bufferSize = 2 * this.audioContext.sampleRate;
        const noiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }
        
        const whiteNoise = this.audioContext.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;
        whiteNoise.start(0);
        
        return whiteNoise;
    }

    stop() {
        this.soundNodes.forEach(({ noise }) => {
            noise.stop();
        });
        this.soundNodes = [];
        this.isPlaying = false;
        
        if (this.audioContext) {
            this.audioContext.close();
        }
    }

    pause() {
        this.isPlaying = false;
    }

    resume() {
        this.isPlaying = true;
    }

    setVolume(volume) {
        this.volume = volume;
        this.soundNodes.forEach(({ gain }) => {
            gain.gain.setValueAtTime(volume * 0.2, this.audioContext.currentTime);
        });
    }
}

// Initialize the cosmic music player
let cosmicPlayer;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize player after a short delay to ensure page is loaded
    setTimeout(() => {
        cosmicPlayer = new CosmicMusicPlayer();
    }, 1000);
});