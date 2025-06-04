import { useEffect, useRef } from "react";

interface NaverMapProps {
  mapRef: React.MutableRefObject<naver.maps.Map | null>;
}

const NaverMap = ({ mapRef }: NaverMapProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=2m89rpilcf`;
    script.async = true;
    script.onload = () => {
      if (!window.naver || !containerRef.current) return;
      mapRef.current = new window.naver.maps.Map(containerRef.current, {
        center: new window.naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 17,
      });
    };
    document.head.appendChild(script);
  }, [mapRef]);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
};

export default NaverMap;
