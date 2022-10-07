const FRAME_HEIGHT = 200;
const FRAME_WIDTH = 500; 
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};

const FRAME = d3.select("#vis1")
                  .append("svg")
                    .attr("height", FRAME_HEIGHT)
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame"); 

function build_interactive_plot() {

  d3.csv("data/data.csv").then((data) => {

    const MAX_X = d3.max(data, (d) => { return parseInt(d.x); });
    
    const X_SCALE = d3.scaleLinear() 
                      .domain([0, (MAX_X + 10000)]) 
                      .range([0, VIS_WIDTH]); 

    FRAME.selectAll("points")  
        .data(data)
        .enter()       
        .append("circle")  
          .attr("cx", (d) => { return (X_SCALE(d.x) + MARGINS.left); }) 
          .attr("cy", MARGINS.top) 
          .attr("r", 20)
          .attr("class", "point");


    FRAME.append("g") 
          .attr("transform", "translate(" + MARGINS.left + 
                "," + (VIS_HEIGHT + MARGINS.top) + ")") 
          .call(d3.axisBottom(X_SCALE).ticks(4)) 
            .attr("font-size", '20px'); 


  });
}

build_interactive_plot();








