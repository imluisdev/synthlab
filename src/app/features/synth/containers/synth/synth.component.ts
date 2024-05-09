import { Component } from '@angular/core';

@Component({
  selector: 'app-synth-generator',
  templateUrl: './synth.component.html',
  styleUrl: './synth.component.css'
})
export class SynthComponent {
  osc_unison: number = 0;
  osc_wave: number = 0;
  frequency_filter: number = 9500;
  resonance: number = 5;
  attack: number = 0.1;
  decay: number = 0.2;
  sustain: number = 0.5;
  release: number = 0.3;
  intervalId: any;
  intervalLFO: any;
  lfo_rate: number = 0;
  lfo_depth: number = 15;
  amplitude: number = 30;
  frequency: number = 10;
  time: number = 0;
  svgElement: HTMLElement | null; 
  svgLFO: HTMLElement | null;
  waveform: OscillatorType = 'sine';

  buttonStates: { [key: string]: boolean } = {};

  isHovered: boolean = false;
  hoveredElement: string = '¿Que elementos componen un sintetizador?';
  hoveredElementDescription: string = 'Coloca el mouse sobre un elemento del sintetizador para saber más sobre el';

  constructor() { }

  ngOnInit(): void {
    this.svgElement = document.getElementById('wavePath');
    this.updateWave();
    this.svgLFO = document.getElementById('wavePathLFO');
    this.updateWaveLFO();
  }

  handleMouseOver(element: string, description: string): void {
    this.isHovered = true;
    this.hoveredElement = element;
    this.hoveredElementDescription = description;
  }

  handleMouseLeave(): void {
    this.isHovered = false;
    this.hoveredElement = '¿Que elementos componen un sintetizador?';
    this.hoveredElementDescription = 'Coloca el mouse sobre un elemento del sintetizador para saber más sobre el';
  }

  initButtonStates() {
    const buttons = ['C2', 'Db2', 'D2', 'Eb2', 'E2', 'F2', 'Gb2', 'G2', 'Ab2', 'A2', 'Bb2', 'B2', 'C3', 'Db3', 'D3', 'Eb3', 'E3', 'F3', 'Gb3', 'G3', 'Ab3', 'A3', 'Bb3', 'B3', 'C4', 'Db4', 'D4', 'Eb4', 'E4', 'F4', 'Gb4', 'G4', 'Ab4', 'A4', 'Bb4', 'B4', 'C5', 'Db5', 'D5', 'Eb5', 'E5', 'F5', 'Gb5', 'G5', 'Ab5', 'A5', 'Bb5', 'B5', 'C6'];

    buttons.forEach(button => {
      this.buttonStates[button] = false;
    });
  }

  changeColor(button: string, pressed: boolean) {
    this.buttonStates[button] = pressed;
  }

  isPressed(button: string) {
    return this.buttonStates[button];
  }

  playNote(note: string): void {
    const oscBank = new Array(3);
    
    interface FrequencyMap {
      [note: string]: number;
    }
  
    const frequencies: FrequencyMap = {
      'C2': 65.41,
      'Db2': 69.30,
      'D2': 73.42,
      'Eb2': 77.78,
      'E2': 82.41,
      'F2': 87.31,
      'Gb2': 92.50,
      'G2': 98.00,
      'Ab2': 103.83,
      'A2': 110.00,
      'Bb2': 116.54,
      'B2': 123.47,
      'C3': 130.81,
      'Db3': 138.59,
      'D3': 146.83,
      'Eb3': 155.56,
      'E3': 164.81,
      'F3': 174.61,
      'Gb3': 185.00,
      'G3': 196.00,
      'Ab3': 207.65,
      'A3': 220.00,
      'Bb3': 233.08,
      'B3': 246.94,
      'C4': 261.63,
      'Db4': 277.18,
      'D4': 293.66,
      'Eb4': 311.13,
      'E4': 329.63,
      'F4': 349.23,
      'Gb4': 369.99,
      'G4': 392.00,
      'Ab4': 415.30,
      'A4': 440.00,
      'Bb4': 466.16,
      'B4': 493.88,
      'C5': 523.25,
      'Db5': 554.37,
      'D5': 587.33,
      'Eb5': 622.25,
      'E5': 659.26,
      'F5': 698.46,
      'Gb5': 739.99,
      'G5': 783.99,
      'Ab5': 830.61,
      'A5': 880.00,
      'Bb5': 932.33,
      'B5': 987.77,
      'C6': 1046.50
    };

    const createOscillators = (osc_unison: number) => {
      const frequency = frequencies[note];
      const audioContext = new AudioContext();
      const osc = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      const filterNode = audioContext.createBiquadFilter();
      const lfo = audioContext.createOscillator();
      const lfoGain = audioContext.createGain();
      osc.connect(filterNode);
      filterNode.connect(gainNode);
      gainNode.connect(audioContext.destination); 

      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);

      lfo.frequency.value = this.lfo_rate;
      lfo.type = 'sine';
      lfo.start();

      lfoGain.gain.value = this.lfo_depth * 10;

      osc.type = this.waveform;
      osc.frequency.value = frequency;
      osc.detune.value = osc_unison;
      osc.start();

      filterNode.type = 'lowpass';
      filterNode.frequency.value = this.frequency_filter;
      filterNode.Q.value = this.resonance;

      const now = audioContext.currentTime;
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(1, now + this.attack);
      gainNode.gain.linearRampToValueAtTime(this.sustain, now + this.attack + this.decay);
      gainNode.gain.setValueAtTime(this.sustain, now + this.attack + this.decay);
      gainNode.gain.linearRampToValueAtTime(0, now + this.attack + this.decay + this.release);

      osc.stop(audioContext.currentTime + this.attack + this.decay + this.release);

      return osc;
    }

    oscBank[0] = createOscillators(0);
    oscBank[1] = createOscillators(this.osc_unison*50);
    oscBank[2] = createOscillators(-this.osc_unison*50);
  }

  changeWaveform(value: number): void {
    if (value <= 33) {
      this.waveform = 'sine';
    } else if (value <= 66) {
      this.waveform = 'triangle';
    } else {
      this.waveform = 'square';
    }
    this.updateWave();
  }

  calculateWaveY(x: number): number {
    let y = 0;
    if (this.waveform === 'sine') {
      y = Math.sin(2 * Math.PI * this.frequency * (x / 600) + this.time) * this.amplitude + 35;
    } else if (this.waveform === 'triangle') {
      const period = 800 / this.frequency;
      const phase = this.time * (600 / period);
      const normalizedX = (x + phase) % period;
      const halfPeriod = period / 2;
      if (normalizedX <= halfPeriod) {
        y = (normalizedX / halfPeriod) * this.amplitude * 2 + 5;
      } else {
        y = ((period - normalizedX) / halfPeriod) * this.amplitude * 2 + 5;
      }
    } else if (this.waveform === 'square') {
      y = Math.sign(Math.sin(2 * Math.PI * this.frequency * (x / 600) + this.time)) * this.amplitude * 1.1 + 35;
    }
    return y;
  }

  updateWave(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  
    this.intervalId = setInterval(() => {
      this.time += 0.05;
      let path = '';
      for (let x = 0; x <= 600; x += 5) {
        const y = this.calculateWaveY(x);
        path += `${x},${y} `;
      }
      if (this.svgElement) {
        this.svgElement.setAttribute('d', `M 0 100 ${path}`);
      } else {
        console.error('this.svgElement is null or undefined');
      }
    }, 10);
  }

  calculateWaveYLFO(x: number): number {
    let y = 0;
    y = Math.sin(2 * Math.PI * this.lfo_rate * (x / 600) + this.time) * this.lfo_depth + 35;
    return y;
  }

  updateWaveLFO(): void {
    if (this.intervalLFO) {
      clearInterval(this.intervalLFO);
    }
  
    this.intervalLFO = setInterval(() => {
      this.time += 0.05;
      let path = '';
      for (let x = 0; x <= 600; x += 5) {
        const y = this.calculateWaveYLFO(x);
        path += `${x},${y} `;
      }
      if (this.svgLFO) {
        this.svgLFO.setAttribute('d', `M 0 100 ${path}`);
      } else {
        console.error('this.svgElement is null or undefined');
      }
    }, 10);
  }
}
