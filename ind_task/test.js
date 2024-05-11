const width = 600; 
const height = 600; 
let svg = d3.select("svg")     
    .attr("width", width)     
    .attr("height", height);  

function drawClover() {     
    let clover = svg.append("g")         
        .style("stroke", "lightgreen")         
        .style("stroke-width", 1)       
        .style("fill", "lightgreen");     

    clover.append("circle")          
        .attr("cx", -18.5)         
        .attr("cy", -18.5)         
        .attr("r", 25)
        .style("fill", "green");     

    clover.append("circle")          
        .attr("cx", 18.5)         
        .attr("cy", -18.5)         
        .attr("r", 25)
        .style("fill", "green");    

    clover.append("circle")          
        .attr("cx", 18.5)         
        .attr("cy", 18.5)         
        .attr("r", 25)
        .style("fill", "green");     
    
    clover.append("circle")          
        .attr("cx", -18.5)         
        .attr("cy", 18.5)         
        .attr("r", 25)
        .style("fill", "green");     

    clover.append("circle")
        .attr("cx", 0)         
        .attr("cy", 0)         
        .attr("r", 5)         
        .style("fill","green"); 

    let arc = d3.arc()        
        .innerRadius(5)        
        .outerRadius(20)
        .cornerRadius(18);
                          
    clover.append("path")        
        .attr("d", arc({startAngle: Math.PI /10 * 3, endAngle: Math.PI/13 * 3}))   
    clover.append("path")        
        .attr("d", arc({startAngle: Math.PI /-10 * 3, endAngle: Math.PI/-13 * 3}))   
    clover.append("path")        
        .attr("d", arc({startAngle: Math.PI /5 * 4, endAngle: Math.PI/26 * 19}))   
    clover.append("path")        
        .attr("d", arc({startAngle: Math.PI /-5 * 4, endAngle: Math.PI/-26 * 19}))  
    
    clover.append("path")        
        .attr("d", arc({startAngle: Math.PI /20 * 11, endAngle: Math.PI/52 * 25}))   
    clover.append("path")        
        .attr("d", arc({startAngle: Math.PI /-20 * 11, endAngle: Math.PI/-52 * 25}))   
    clover.append("path")        
        .attr("d", arc({startAngle: Math.PI /20 * 21 , endAngle: Math.PI/52 * 51}))   
    clover.append("path")        
        .attr("d", arc({startAngle: Math.PI /20 * 41, endAngle: Math.PI/52 * 103}))  
   
    return clover   
}     

let clean = () => svg.selectAll('*').remove();



let runAnimation = (dataForm) => {    
    let pict = drawClover()
    let path = drawPath();                  
    pict.transition()         
        .ease(d3.easeLinear)        
        .duration(dataForm.cx.value)         
        .attrTween('transform', translateAlong(path.node(), dataForm.ang.value, dataForm.mx.value, dataForm.my.value));
    
} 

// let options={"0":d3.easeLinear, "1":d3.easeElastic, "2":d3.easeBounce}



///////////////////////////////////

function f(x){
    return width/1.5 + (- 0.01 * x * x);
}


function createPathCircle() {     
    let data = []; 
  
    for (let t = 150 ; t >= -150; t -= 1) {
        data.push(             
            {x: f(t),              
             y: height/2 + t}         
        );       
    }     
    return data 
}
    
let drawPath =() => {     
    const dataPoints = createPathCircle();      
    const line = d3.line()         
        .x((d) => d.x)         
        .y((d) => d.y);      
    const path = svg.append('path')         
        .attr('d', line(dataPoints))         
        .attr('stroke', 'none')         
        .attr('fill', 'none');              
    return path;     
} 
    
function translateAlong(path, ang, mx, my) {     
    const length = path.getTotalLength();     
    return function() {         
        return function(t) {             
            const {x, y} = path.getPointAtLength(t * length);

            return `translate(${x},${y}) scale(${t*(mx-1)+1}, ${t*(my-1)+1}) rotate(${ang*t})`;         
        }     
    } 
} 