import { useEffect, useRef } from "react";
import bubbleTail from "assets/icons/icon/bubble-tail.svg?url";

export interface MapItemsType {
  collectionId: number;
  imageUrl: string;
  koreanName: string;
  latitude: number;
  longitude: number;
  note: string;
}

interface NaverMapProps {
  mapRef: React.MutableRefObject<naver.maps.Map | null>;
  markers: MapItemsType[];
  onCenterChanged?: (lat: number, lng: number) => void;
  onOverlayClick?: (id: number) => void;
}

const NAVER_APP_KEY = import.meta.env.VITE_NAVER_APP_KEY;

const NaverMap = ({ mapRef, markers, onCenterChanged, onOverlayClick }: NaverMapProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayInstancesRef = useRef<any[]>([]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${NAVER_APP_KEY}`;
    script.async = true;

    script.onload = () => {
      if (!window.naver || !containerRef.current) return;

      mapRef.current = new window.naver.maps.Map(containerRef.current, {
        center: new window.naver.maps.LatLng(37.58939182281775, 127.02990237554194),
        zoom: 16,
      });

      if (onCenterChanged) {
        window.naver.maps.Event.addListener(mapRef.current, "center_changed", () => {
          if (mapRef.current) {
            const center = (mapRef.current as any).getCenter();
            onCenterChanged(center.lat(), center.lng());
          }
        });
        // (필요하면 "zoom_changed"도 같은 식으로 콜백)
      }
    };
    document.head.appendChild(script);
  }, [mapRef]);

  useEffect(() => {
    if (!window.naver || !mapRef.current) return;

    const map = mapRef.current as naver.maps.Map & {
      getZoom: () => number;
    };

    // 커스텀 오버레이 클래스 정의
    class CustomOverlay extends window.naver.maps.OverlayView {
      private element: HTMLElement;
      private position: naver.maps.LatLng;

      constructor(position: naver.maps.LatLng, content: string) {
        super();
        this.position = position;

        const wrapper = document.createElement("div");
        wrapper.innerHTML = content;
        this.element = wrapper.firstElementChild as HTMLElement;
        this.element.style.position = "absolute";
      }

      onAdd() {
        const pane = this.getPanes()?.overlayLayer;
        if (pane) {
          pane.appendChild(this.element);
          const btns = this.element.querySelectorAll(".collection-overlay-btn");
          btns.forEach((btn) => {
            const button = btn as HTMLButtonElement;
            button.addEventListener("click", (e) => {
              e.stopPropagation();
              const id = button.getAttribute("data-collection-id");
              if (id && typeof onOverlayClick === "function") {
                onOverlayClick(Number(id));
              }
            });
          });
        }
      }

      draw() {
        const projection = this.getProjection();
        if (!projection) return;

        const pixel = projection.fromCoordToOffset(this.position);
        if (pixel) {
          this.element.style.left = `${pixel.x}px`;
          this.element.style.top = `${pixel.y}px`;
          this.element.style.transform = "translate(-50%, -80%)";
        }
      }

      onRemove() {
        if (this.element && this.element.parentNode) {
          this.element.parentNode.removeChild(this.element);
        }
      }
    }

    // 기존 오버레이 제거
    overlayInstancesRef.current.forEach((overlay) => overlay.setMap(null));
    overlayInstancesRef.current = [];

    // 새로운 오버레이 생성
    markers.forEach(({ latitude, longitude, collectionId, koreanName, note, imageUrl }) => {
      const position = new window.naver.maps.LatLng(latitude, longitude);

      const content = `
  <div class="flex flex-col items-center gap-10">
    <button
      type="button"
      class="collection-overlay-btn relative gap-7 flex flex-col items-center bg-[#FEFEFE] rounded-[10px] min-w-[120px] max-w-[180px] px-16 py-16 z-10"
      data-collection-id="${collectionId}"
    >
      <div class="font-moneygraphy text-body-3 text-black mb-1">${koreanName}</div>
      <div
        class="font-pretendard text-caption-1 text-center text-font-black"
        style="
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        "
      >
        ${note}
      </div>
    </button>
    <div class="relative -mt-12 z-0">
      <img src="${bubbleTail}" width="22" height="19" />
    </div>
    <button
      class="collection-overlay-btn w-[60px] h-[60px] rounded-full border-[3px] border-white bg-white overflow-hidden box-border"
      data-collection-id="${collectionId}"
      type="button"
    >
      <img src="${imageUrl}" class="w-full h-full object-cover" />
    </button>
  </div>
`;

      const overlay = new CustomOverlay(position, content);
      overlayInstancesRef.current.push(overlay);
    });

    //  줌 변화에 따라 표시 여부 업데이트
    const updateOverlaysVisibility = () => {
      const zoom = map.getZoom();
      overlayInstancesRef.current.forEach((overlay) => {
        overlay.setMap(zoom >= 14 ? map : null);
      });
    };

    const listener = window.naver.maps.Event.addListener(map, "zoom_changed", updateOverlaysVisibility);

    updateOverlaysVisibility();

    return () => {
      window.naver.maps.Event.removeListener(listener);
      overlayInstancesRef.current.forEach((overlay) => overlay.setMap(null));
    };
  }, [markers, mapRef.current]);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
};

export default NaverMap;
