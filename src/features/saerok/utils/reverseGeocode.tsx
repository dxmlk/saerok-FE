export interface ReverseGeocodeResult {
  roadAddress?: string;
  jibunAddress?: string;
}

export function reverseGeocode(lat: number, lng: number): Promise<ReverseGeocodeResult> {
  return new Promise((resolve, reject) => {
    // 1. API 및 Geocoder 인스턴스 체크
    if (
      !window.naver ||
      !window.naver.maps ||
      !window.naver.maps.Service ||
      typeof window.naver.maps.Service.Geocoder !== "function"
    ) {
      reject("네이버 지도 API/Service 미로딩");
      return;
    }
    const geocoder = new window.naver.maps.Service.Geocoder();

    console.log("역지오코딩 요청 lat, lng:", lat, lng);
    console.log("Geocoder instance:", geocoder);

    // 2. 역지오코딩 요청
    geocoder.reverseGeocode(
      {
        coords: new window.naver.maps.LatLng(lat, lng),
        orders: [window.naver.maps.Service.OrderType.ADDR, window.naver.maps.Service.OrderType.ROAD_ADDR],
      },
      function (status: any, response: any) {
        if (status !== window.naver.maps.Service.Status.OK) {
          reject("????�코???�패(status not OK)");
          return;
        }
        // 3. 주소 결과 robust하게 파싱
        const result = response?.v2?.addresses?.[0] ?? {};
        console.log("역지오코딩 응답:", status, response);

        resolve({
          roadAddress: result.roadAddress || "",
          jibunAddress: result.jibunAddress || "",
        });
      }
    );
  });
}
