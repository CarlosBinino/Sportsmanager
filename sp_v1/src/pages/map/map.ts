import { Component, OnInit  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
   lattop = 57.9;
   lonleft = 7.8;
   lonright = 15.3;
   scalemap = 56
   chartDiv = document.getElementById("map");
   totalWidth: any;
   w: any;
   h: any;
   zoomExtent = 500;
   scale:
   kommune = "";
   textHeight: any;
   xPosition = 20
   yPosition = 20;
   xZoomScale = 1;
   yZoomScale = 1;

   svg: any;
   reset: any;
   g: any;
   zoom: any;
   setWidth: any;
   projection: any;
   trans: any;
   path: any;
   textHeight: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.totalWidth = this.chartDiv.clientWidth;
      this.setWidth = d3.min([this.totalWidth, window.innerHeight/0.8])
      this.w = this.setWidth*0.95;
      this.h = this.w*0.8;
      this.scale = this.scalemap * this.w / (this.lonright - this.lonleft);
      this.textHeight = this.h*0.032;
      this.zoom = d3.zoom().scaleExtent([1, this.zoomExtent]).translateExtent([[0, 0],[this.w, this.h]]).on("zoom", zoomed);
      this.projection = d3.geoMercator.scale(this.scale).translate([0, 0]);
      this.trans = projection([this.lonleft, this.lattop]);
      this.projection.translate([-1 * this.trans[0], -1 * this.trans[1]]);
      this.path = d3.geoPath(this.projection);
  }

    ionViewDidEnter() {
        this.init();
        this.initCSV();
    }

    init() {
        this.svg = d3.select('#map')
         .append('svg')
         .attr("id", "svg")
         .attr("width", w)
         .attr("height", h)

        this.svg.append("rect")
            .attr("class", "background")
            .attr("width", w)
            .attr("height", h)
            .on("click", reset);

        this.g = this.svg.append('g')

        this.svg.call(this.zoom);
    }

    zoomed() {
       this.g.attr("transform", d3.event.transform);
       this.g.selectAll("text")
           .attr("font-size", function() {
               this.textHeight = (this.h * 0.032) / (d3.event.transform.k);
           })
           .attr("transform", function() {
               this.xZoomScale = d3.event.transform.k;
               this.yZoomScale = d3.event.transform.k;
           })
       ;
   }

}
