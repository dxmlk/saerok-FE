/// <reference types="vite-plugin-svgr" />

declare module "*.svg" {
    import * as React from 'react';
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
  }
  
  // svg를 export 할 때 
  // 기본 default export(string URL)로도 쓸 수 있고 
  // ReactComponent로도 쓸 수 있게 함
