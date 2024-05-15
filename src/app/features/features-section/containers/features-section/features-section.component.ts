import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-features-section',
  templateUrl: './features-section.component.html',
  styleUrl: './features-section.component.css'
})
export class FeaturesSectionComponent implements OnInit{
  intervalLFO: any;
  lfo_rate: number = 47;
  lfo_depth: number = 30;
  time: number = 0;
  svgLFO: HTMLElement | null;

  ngOnInit(): void {
    this.svgLFO = document.getElementById('wavePathLFO');
    this.updateWaveLFO();
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
