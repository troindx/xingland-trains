import { TrainNode } from "../models/models";

export interface GraphInterface{
    nodes: TrainNode[][];
    loadMapFromFile(source:string): boolean;
    addRoute(source: string, destination: string, weight:number) : void;
    getAllPaths(source:string, destination:string) : TrainNode[][];
    getAllPathsRecursive(u:string,d:string, localPathList: TrainNode[], iteration: number): void
    getShortestPath(source:string, destination:string): TrainNode[];
    getShortestPathWeight(source: string, destination: string): number
}
