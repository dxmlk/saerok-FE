export {};

declare global {
  interface Window {
    naver: typeof naver;
  }

  namespace naver.maps {
    class Map {
      constructor(el: HTMLElement, options: any);
      setCenter(latlng: LatLng): void;
    }

    class LatLng {
      constructor(lat: number, lng: number);
    }
  }
}
