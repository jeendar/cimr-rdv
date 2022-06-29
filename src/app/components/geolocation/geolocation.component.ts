import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.css']
})
export class GeolocationComponent implements OnInit {
  isVisible = false;

  constructor() { }

  ngOnInit(): void {
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }
  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
