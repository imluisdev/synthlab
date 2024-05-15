import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  intervalSine: any;
  intervalSquare: any;
  intervalTriangle: any;
  lfo_rate: number = 0;
  lfo_depth: number = 15;
  amplitude: number = 30;
  frequency: number = 10;
  time: number = 0;
  svgSine: HTMLElement | null; 
  svgSquare: HTMLElement | null; 
  svgTriangle: any;

  ngOnInit(): void {
    this.svgSine = document.getElementById('wavePathSine');
    this.svgSquare = document.getElementById('wavePathSquare');
    this.svgTriangle = document.getElementById('wavePathTriangle');
    this.updateWaveSine();
    this.updateWaveSquare();
    this.updateWaveTriangle();
  }

  calculateWaveSine(x: number): number {
    let y = 0;
      y = Math.sin(2 * Math.PI * this.frequency * (x / 600) + this.time) * this.amplitude + 35;
    return y;
  }

  calculateWaveSquare(x: number): number {
    let y = 0;
    y = Math.sign(Math.sin(2 * Math.PI * this.frequency * (x / 600) + this.time)) * this.amplitude * 1.1 + 35;
    return y;
  }

  calculateWaveTriangle(x: number): number {
    let y = 0;
    const period = 800 / this.frequency;
      const phase = this.time * (600 / period);
      const normalizedX = (x + phase) % period;
      const halfPeriod = period / 2;
      if (normalizedX <= halfPeriod) {
        y = (normalizedX / halfPeriod) * this.amplitude * 2 + 5;
      } else {
        y = ((period - normalizedX) / halfPeriod) * this.amplitude * 2 + 5;
      }
    return y;
  }

  updateWaveSine(): void {
    if (this.intervalSine) {
      clearInterval(this.intervalSine);
    }
  
    this.intervalSine = setInterval(() => {
      this.time += 0.05;
      let path = '';
      for (let x = 0; x <= 600; x += 5) {
        const y = this.calculateWaveSine(x);
        path += `${x},${y} `;
      }
      if (this.svgSine) {
        this.svgSine.setAttribute('d', `M 0 100 ${path}`);
      } else {
        console.error('this.svgElement is null or undefined');
      }
    }, 10);
  }

  updateWaveSquare(): void {
    if (this.intervalSquare) {
      clearInterval(this.intervalSquare);
    }
  
    this.intervalSquare = setInterval(() => {
      this.time += 0.05;
      let path = '';
      for (let x = 0; x <= 600; x += 5) {
        const y = this.calculateWaveSquare(x);
        path += `${x},${y} `;
      }
      if (this.svgSquare) {
        this.svgSquare.setAttribute('d', `M 0 100 ${path}`);
      } else {
        console.error('this.svgElement is null or undefined');
      }
    }, 10);
  }

  updateWaveTriangle(): void {
    if (this.intervalTriangle) {
      clearInterval(this.intervalTriangle);
    }
  
    this.intervalTriangle = setInterval(() => {
      this.time += 0.05;
      let path = '';
      for (let x = 0; x <= 600; x += 5) {
        const y = this.calculateWaveTriangle(x);
        path += `${x},${y} `;
      }
      if (this.svgSquare) {
        this.svgTriangle.setAttribute('d', `M 0 100 ${path}`);
      } else {
        console.error('this.svgElement is null or undefined');
      }
    }, 10);
  }
}
