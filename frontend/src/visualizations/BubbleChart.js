import React, { Component } from 'react'
import * as d3 from "d3";
import { select } from 'd3-selection';
import './Visualization.css';

class BubbleChart extends Component {
   constructor(props) {
      super(props)
      this.state = {
          data : this.props.data
      };
      this.createBubbleChart = this.createBubbleChart.bind(this)
   }

   componentDidMount() {
     this.createBubbleChart()
   }

   componentDidUpdate() {
     this.createBubbleChart()
   }

   createBubbleChart() {
     const node = this.node;
     const data = this.state.data;
     const format = d3.format(",d");
     const svg = d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height");

     const color = d3.scaleOrdinal(d3.schemeCategory10);

     const bubble = d3.pack(data)
        .size([width, height])
        .padding(1.5);

     const nodes = d3.hierarchy(data)
        .sum(function(d) { return d.id; });


     let getSelect = select(node)
        .selectAll('circle')
        .data(bubble(nodes).descendants())
        .enter()
        .filter(function(d){
            return  !d.children
        })
        .append("g")
        .attr("class", "node")
        .attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
        });

    getSelect.append("circle")
        .attr("id", function(d) { return d.data.id; })
        .attr("r", function(d) { return d.r; })
        .style("fill", function(d) { return color(d.data.id); });

    getSelect.append("text")
        .attr("dy", ".3em")
        .attr("font-size","10px")
        .style("text-anchor", "middle")
        .text(function(d) {
            return d.data.title;
        });

    getSelect.append("title")
        .text(function(d) { return d.data.value; });


    }

    render(){
      return(
        <svg className="visualization-container" ref={node => this.node = node} width={750} height={750}></svg>
      );
    }
}
export default BubbleChart