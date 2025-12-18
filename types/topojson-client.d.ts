declare module 'topojson-client' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export function feature(topology: any, object: any): any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export function mesh(topology: any, object?: any, filter?: any): any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export function merge(topology: any, objects: any[]): any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export function mergeArcs(topology: any, objects: any[]): any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export function neighbors(objects: any[]): any[];
}

