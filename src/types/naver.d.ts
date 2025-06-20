export {};

declare global {
  interface Window {
    naver: any;
  }

  namespace naver.maps {
    class Map {
      constructor(el: HTMLElement, options: any);
      setCenter(latlng: LatLng): void;
    }
    class Marker {
      constructor(options: { position: LatLng; map: Map; draggable?: boolean });
      setMap(map: Map | null): void;
      setPosition(position: LatLng): void;
      setOptions(options: Partial<MarkerOptions>): void;
      setDraggable(draggable: boolean): void;
    }

    class LatLng {
      constructor(lat: number, lng: number);
    }

    namespace Event {
      function addListener(instance: any, eventName: string, handler: (e: any) => void): void;
      function trigger(instance: any, eventName: string): void;
    }
  }
}
