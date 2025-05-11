import { useEffect, useRef } from "react";

const NaverMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<naver.maps.Map | null>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=2m89rpilcf`;
    script.async = true;
    script.onload = () => {
      if (!window.naver || !mapRef.current) return;
      mapInstance.current = new window.naver.maps.Map(mapRef.current, {
        center: new window.naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 10,
      });
    };
    document.head.appendChild(script);
  }, []);

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
};

export default NaverMap;
