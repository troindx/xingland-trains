import {Graph} from './services/Graph';

let graph = new Graph();
graph.loadMapFromFile("data.txt");

/* 1. The distance of the route A-B-C. */
let distance1a = graph.getShortestPath("A","B");
let distance1b = graph.getShortestPath("B","C");
if (distance1a.length > 2 ||distance1b.length > 2){
    console.log("Problem #1: NO SUCH ROUTE");
}
else {
    let problem1 = distance1a[1].weight + distance1b[1].weight;
    if (problem1 == Infinity) console.log("Problem #1: NO SUCH ROUTE");
    else console.log("Problem #1: ", problem1);
}

/* 1. The distance of the route A-B-C. but done only recurring on the nodes rather than searching between paths */
let problem1bis = graph.getRouteDistance("ABC");
if (problem1bis == Infinity) console.log("Problem #1 bis: NO SUCH ROUTE");
else console.log("Problem #1 bis: ", problem1bis);



/*2. The distance of the route A-D */
let distance2 = graph.getShortestPathWeight("A","D");
if (distance2 == Infinity) console.log("Problem #2: NO SUCH ROUTE");
else console.log("Problem #2: ", distance2);

/* 3. The distance of the route A-D-C. */
let distance3a = graph.getShortestPath("A","D");
let distance3b = graph.getShortestPath("D","C");
if (distance3a.length > 2  || distance3b.length > 2)  
    console.log("Problem #3: NO SUCH ROUTE"); //Not a direct route
else{
    let problem3 = distance3a[1].weight + distance3b[1].weight;
    if (problem3 == Infinity) console.log("Problem #3: NO SUCH ROUTE");
    else console.log("Problem #3: ", problem3);
}

/* The same but optimally */
let problem3bis = graph.getRouteDistance("ADC");
if (problem3bis == Infinity) console.log("Problem #3 bis: NO SUCH ROUTE");
else console.log("Problem #3 bis: ", problem3bis);

/* 4. The distance of the route A-E-B-C-D. */
let distance4a = graph.getShortestPath("A","E");
let distance4b = graph.getShortestPath("E","B");
let distance4c = graph.getShortestPath("B","C");
let distance4d = graph.getShortestPath("C","D");
if (distance4d.length > 2 ||distance4c.length > 2 || distance4b.length > 2 || distance4a.length > 2 ) 
    console.log("Problem #4: NO SUCH ROUTE");
else{
    let problem4 = distance4a[1].weight + distance4b[1].weight + distance4c[1].weight + distance4d[1].weight
    if (problem4 == Infinity) console.log("Problem #4: NO SUCH ROUTE");
    else console.log("Problem #4: ",problem4 );
}

/* The same but optimally */
let problem4bis = graph.getRouteDistance("AEBCD");
if (problem4bis == Infinity) console.log("Problem #4 bis: NO SUCH ROUTE");
else console.log("Problem #4 bis: ", problem4bis);


/*5. Distance of the route A-E-D */
let distance5a = graph.getShortestPath("A","E");
let distance5b = graph.getShortestPath("E","D");
if (distance5a.length > 2  || distance5b.length > 2)  
    console.log("Problem #5: NO SUCH ROUTE"); //Not a direct route
else{
    let problem5 = distance5a[1].weight + distance5b[0].weight;
    if (problem5 == Infinity) console.log("Problem #5: NO SUCH ROUTE");
    else console.log("Problem #5: ", problem5);
}

/* The same but optimally */
let problem5bis = graph.getRouteDistance("AED");
if (problem5bis == Infinity) console.log("Problem #3 bis: NO SUCH ROUTE");
else console.log("Problem #4 bis: ", problem5bis);


/* 6. Number of Routes starting at C and ending at C with a maximum of 3 Stops */
console.log("Problem #6: ", graph.getAllPaths("C","C").filter(function(value,index, array){ return value.length<= 4}).length);

/* 7. Number of Routes starting at A and ending at C with 4 Stops */
console.log("Problem #7: ", graph.getAllPaths("A","C").filter(function(value,index, array){ return value.length== 5}).length);

/*8 Length of the shortest route (in terms of distance to travel) from A to C */
let distance8 = graph.getShortestPathWeight("A","C");
console.log("Problem #8: ",distance8);

/*9 The length of the shortest route (in terms of distance to travel) from B to B */
let distance9 = graph.getShortestPathWeight("B","B");
console.log("Problem #9: ", distance9);

/*10 The number of different routes from C to C with a distance of less than 30 */
console.log("Problem #10: ", graph.getAllPaths("C","C").filter(function(value,index, array){ 
    let weight = 0;
    for (let route of value){
        weight += route.weight
    }
    return weight<30}).length);
