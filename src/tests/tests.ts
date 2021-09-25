import {describe} from 'mocha';
import { expect } from 'chai';
import { Graph } from '../services/Graph';

let graph = new Graph();
graph.loadMapFromFile("data.txt");

describe ("Problem #1: Distance of route A-B-C", () => {
    
    it ("Paths should be direct",() =>{
        let distance1a = graph.getShortestPath("A","B");
        let distance1b = graph.getShortestPath("B","C");
        expect(distance1a.length).to.be.equal(2);
        expect(distance1b.length).to.be.equal(2);
    });

    it ("Path distance should be equal to 9",() =>{
        let distance1a = graph.getShortestPath("A","B");
        let distance1b = graph.getShortestPath("B","C");
        let distance = distance1a[1].weight + distance1b[1].weight;
        expect(distance).to.be.equal(9);
    });
});

describe ("Problem #2: Distance of route A-D", () => {


    it ("Path distance should be equal to 5",() =>{
        let distance2 = graph.getShortestPathWeight("A","D");

        expect(distance2).to.be.equal(5);
    });
});

describe ("Problem #3: Distance of route A-D-C should be 13", () => {
    it ("Paths should be direct",() =>{
        let distance1a = graph.getShortestPath("A","D");
        let distance1b = graph.getShortestPath("D","C");
        expect(distance1a.length).to.be.equal(2);
        expect(distance1b.length).to.be.equal(2);
    });

    it ("Path distance should be equal to 13",() =>{
        let distance2 = graph.getShortestPathWeight("A","D");
        let distance3 = graph.getShortestPathWeight("D","C");
        let distance = distance2 + distance3
        expect(distance).to.be.equal(13);
    });
});

describe ("Problem #4: Distance of route A-E-B-C-D should be 22", () => {
    it ("Paths should be direct",() =>{
        let distance4a = graph.getShortestPath("A","E");
        let distance4b = graph.getShortestPath("E","B");
        let distance4c = graph.getShortestPath("B","C");
        let distance4d = graph.getShortestPath("C","D");
        expect(distance4a.length).to.be.equal(2);
        expect(distance4b.length).to.be.equal(2);
        expect(distance4c.length).to.be.equal(2);
        expect(distance4d.length).to.be.equal(2);
    });

    it ("Path distance should be equal to 22",() =>{
        let distance4a = graph.getShortestPath("A","E");
        let distance4b = graph.getShortestPath("E","B");
        let distance4c = graph.getShortestPath("B","C");
        let distance4d = graph.getShortestPath("C","D");
        let problem4 = distance4a[1].weight + distance4b[1].weight + distance4c[1].weight + distance4d[1].weight
        expect(problem4).to.be.equal(22);
    });
});

describe ("Problem #5:  Route A-E-D does not exist", () => {
    let distance5a = graph.getShortestPath("A","E");
    let distance5b = graph.getShortestPath("E","D");
    it ("No direct path connection between E-D",() =>{
        expect(distance5a.length).to.be.equal(2);
    });
    it ("Direct path connection between A-E",() =>{
        expect(distance5b.length).to.be.greaterThan(2);
    });
});

describe ("Problem #6:", () => {
    it (" Number of routes between C and C with a maximum of 3 stops is 2",() =>{
        expect(graph.getAllPaths("C","C").filter(function(value,index, array){ return value.length<= 4}).length).length.to.be.equal(2);
    });
    
});

describe ("Problem #7:", () => {
    it (" Number of routes between A and C with exactly 4 stops is 3",() =>{
        expect(graph.getAllPaths("A","C").filter(function(value,index, array){ return value.length== 5}).length).length.to.be.equal(3);
    });
    
});

describe ("Problem #8:", () => {
    it (" Shortest path between A and C is 9",() =>{
        let distance8 = graph.getShortestPathWeight("A","C");
        expect(distance8).to.be.equal(9);
    });
    
});

describe ("Problem #9:", () => {
    it (" Shortest path between B and B is 9",() =>{
        let distance8 = graph.getShortestPathWeight("B","B");
        expect(distance8).to.be.equal(9);
    });
    
});

describe ("Problem #10:", () => {
    it (" Number of different routes from C to C with distance of less than 30 is 7",() =>{
        let paths = graph.getAllPaths("C","C").filter(function(value,index, array){ 
            let weight = 0;
            for (let route of value){
                weight += route.weight
            }
            return weight<30});
        expect(paths.length).to.be.equal(7);
    });
});