import { GraphInterface } from "../interfaces/Graph";
import {TrainNode} from '../models/models'
import * as fs from 'fs';
import { start } from "repl";

export class Graph implements GraphInterface{
    getRouteDistance(route: string): number {
        let totalWeight = 0;
        for (let i = 0; i< route.length-1; i++){
            let currentNode = this.nodes[route[i]];
            let flag = false;
            for(let connection of currentNode){
                if (connection.name == route[i+1]){
                    totalWeight+=connection.weight
                    flag = true;
                }
            }
            if (!flag){
                return Infinity;
            }
        }
        return totalWeight;
    }
    nodes: TrainNode[][] = [];
    private numberOfVertex = 0;

    public getNumberOfVertex(){ return this.numberOfVertex};

    /***
     * Loads the map from a given file
     * @param Source is the location of a txt file in utf8 with the format AB8, CB1, AC9, EA3, ...
     * @returns True if loaded or false + exception if not 
     * */
    loadMapFromFile(source: string): boolean {
        let data, dataArray;
        try {
            data = fs.readFileSync(source,'utf8');
            dataArray = data.split(", ");
        } catch (error) {
            console.log(error);
            return false; 
        }
        
        for(let i = 0; i< dataArray.length;i++){
            let node = dataArray[i].charAt(0);
            let destination = dataArray[i].charAt(1);
            let weight = Number.parseInt(dataArray[i].charAt(2));
            this.addRoute(node, destination, weight);
            this.numberOfVertex++;
        }
        return true;
    }

    addRoute(source: string, destination: string, weight: number): void {
        const node: TrainNode = {name: destination, weight:weight};    
        if (this.nodes[source]==undefined){ this.nodes[source] = new Array<TrainNode>(node);}
        else this.nodes[source].push(node);
    }

    getShortestPath(source: string, destination: string): TrainNode[] {
        let paths = this.getAllPaths(source,destination);
        let shortestPath: TrainNode[] = [];
        let minCost = Infinity;
        for (let path of paths){
            let cost = 0;
            for (let node of path)
            {
                cost +=node.weight;
            }
            if (cost < minCost){ minCost = cost; shortestPath = path}
        }
        return shortestPath;
    }
    getShortestPathWeight(source: string, destination: string): number{
        let paths = this.getAllPaths(source,destination);
        let shortestPath: TrainNode[] = [];
        let minCost = Infinity;
        for (let path of paths){
            let cost = 0;
            for (let node of path)
            {
                cost +=node.weight;
            }
            if (cost < minCost){ minCost = cost; shortestPath = path}
        }
        return minCost;
    }

    private originalSource = "";
    private originalDestination = ""
    private pathsToDestination: TrainNode[][] = []
    public getAllPaths(s: string,d: string): TrainNode[][]
    {
        this.pathsToDestination = [];
        this.originalDestination = d;
        this.originalSource = s;
        let pathList: TrainNode[] = [];
        const start = {name: s, weight:0};
        pathList.push(start);
        let iteration = 0;
        this.getAllPathsRecursive(s, d, pathList, iteration);
        return  this.pathsToDestination;
    }
    
    public  getAllPathsRecursive(u:string,d:string, localPathList: TrainNode[], iteration: number): void {
        if (iteration >= this.numberOfVertex+1){return;}
        
        //console.log(this.pathsToDestination, u, d, iteration, this.numberOfVertex + "\n");
        if (u == d  && localPathList.length > 1 && localPathList[0].name == this.originalSource && localPathList[localPathList.length-1].name == this.originalDestination){
            const pathToAdd = [...localPathList];
            this.pathsToDestination.push(pathToAdd);
            //console.log(localPathList);

        }
        for (let destination of this.nodes[u]){
            // store current node in path[]
            localPathList.push(destination)
            let nextLocalPathList = [...localPathList];
            this.getAllPathsRecursive(destination.name, d, nextLocalPathList, iteration+1);
            // remove current node in path[]
            localPathList.splice(localPathList.indexOf(destination),1); 
        }

        
    }

}