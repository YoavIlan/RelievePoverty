import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import { max } from 'd3-array'
import { select } from 'd3-selection'
import * as d3 from "d3";


const color = d3.scaleOrdinal(d3.schemeCategory10);

function getCharities(d) {
    if (d > 1) {
        return " charities.";
    } else {
        return " charity."
    }
}

class BarChart extends Component {
   constructor(props){
      super(props)
      this.createBarChart = this.createBarChart.bind(this)
   }

   componentDidMount() {
      this.createBarChart()
   }
   componentDidUpdate() {
      this.createBarChart()
   }
   createBarChart() {
    var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("background", "#b35c22")
    .style("color", "#e2e2e2")
    .text("a simple tooltip");
      const node = this.node
      const names = this.props.names
      const dataMax = max((this.props.data))
      const yScale = scaleLinear()
         .domain([0, dataMax])
         .range([0, this.props.size[1]])
    
   select(node)
      .selectAll('rect')
      .data(this.props.data)
      .enter()
      .append('rect')
 
    select(node)
      .selectAll('rect')
      .data((this.props.data))
      .exit()
      .remove()
   
   select(node)
      .selectAll('rect')
      .data(this.props.data)
      .style("fill", function(d, i) { return color(i); })
      .attr('x', (d,i) => i*25)
      .attr('y', d => this.props.size[1] - yScale(d))
      .attr('height', d => yScale(d))
      .attr('width', 25)
      .text(function(d, i) {
        return names[i];
      })
      .on("mouseover", function(d, i){tooltip.text(names[i] + " has " + d + getCharities(d)); return tooltip.style("visibility", "visible");})
   }

render() {
      return <svg ref={node => this.node = node}
      width={1250} height={550}>
      </svg>
   }
}
export default BarChart