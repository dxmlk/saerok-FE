import { useEffect, useRef, useState } from "react";
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
  const markerInstancesRef = useRef<any[]>([]);
  const [MarkerClustering, setMarkerClustering] = useState<any>(null);

  // 1. 네이버맵 스크립트 로드
  useEffect(() => {
    if (document.getElementById("naver-maps-script")) return;
    const script = document.createElement("script");
    script.id = "naver-maps-script";
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${NAVER_APP_KEY}`;
    script.async = true;

    script.onload = () => {
      // 스크립트가 로드되면 네이버맵 인스턴스 생성
      if (!window.naver || !containerRef.current) return;
      mapRef.current = new window.naver.maps.Map(containerRef.current, {
        center: new window.naver.maps.LatLng(37.58939182281775, 127.02990237554194),
        zoom: 17,
      });
      if (onCenterChanged) {
        window.naver.maps.Event.addListener(mapRef.current, "center_changed", () => {
          if (mapRef.current) {
            const center = (mapRef.current as any).getCenter();
            onCenterChanged(center.lat(), center.lng());
          }
        });
      }
    };
    document.head.appendChild(script);

    // 언마운트 시 클린업
    return () => {
      markerInstancesRef.current.forEach((marker) => marker.setMap(null));
      markerInstancesRef.current = [];
      overlayInstancesRef.current.forEach((overlay) => overlay.setMap(null));
      overlayInstancesRef.current = [];
    };
    // eslint-disable-next-line
  }, [mapRef]);

  // 2. 네이버맵 객체가 준비된 후에 markerClustering.js 동적 import
  useEffect(() => {
    if (!window.naver) return;
    let isMounted = true;
    import("features/map/utils/markerClustering.js").then((module) => {
      if (isMounted) setMarkerClustering(() => module.default);
    });
    return () => {
      isMounted = false;
    };
  }, [window.naver]);

  // 3. 마커 및 클러스터 관리
  const ZOOM_THRESHOLD = 17;
  useEffect(() => {
    if (!window.naver || !mapRef.current || !MarkerClustering) return;
    const map = mapRef.current as any;

    // 기존 마커/오버레이/클러스터 제거
    markerInstancesRef.current.forEach((marker) => marker.setMap(null));
    markerInstancesRef.current = [];
    overlayInstancesRef.current.forEach((overlay) => overlay.setMap(null));
    overlayInstancesRef.current = [];

    // 마커 생성
    const markerObjs = markers.map((item) => {
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(item.latitude, item.longitude),
        map: null,
      });
      (marker as any).__collectionId = item.collectionId;
      return marker;
    });
    markerInstancesRef.current = markerObjs;

    // 클러스터러 인스턴스 생성
    const clusterer = new MarkerClustering({
      minClusterSize: 1,
      maxZoom: ZOOM_THRESHOLD,
      map: map,
      markers: markerObjs,
      disableClickZoom: false,
      gridSize: 60,
      icons: [
        {
          content: `
      <div style="
        width: 46px;
        height: 46px;
        background: #F7BE65;
        border-radius: 50%;
        box-shadow: 0 0 12px 3px rgba(255,200,0,0.55), 0 2px 6px 0 rgba(0,0,0,0.13);
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #fff;
        ">
        <span style="
          font-family: Pretendard, sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          color: #fff;
          font-size: 15px;
          font-weight: 400;
          letter-spacing: 0.5px;
        "></span>
      </div>
    `,
          size: new window.naver.maps.Size(46, 46),
          anchor: new window.naver.maps.Point(23, 23),
        },
      ], // 스타일 변경 필요
      indexGenerator: [10, 50, 100, 500, 1000], // 아이콘 여러 개일 때 필요!
      stylingFunction: function (clusterMarker: any, count: number) {
        const el = clusterMarker.getElement?.() || clusterMarker._element;
        if (el) {
          // (1) 텍스트 노드 제거
          Array.from(el.childNodes as NodeListOf<ChildNode>).forEach((node: ChildNode) => {
            if (node.nodeType === Node.TEXT_NODE) el.removeChild(node);
          });
          // (2) span에만 숫자 표시
          const span = el.querySelector("span");
          if (span) span.textContent = count;
        }
      },
    });

    // 클러스터 클릭/마커 클릭 이벤트
    window.naver.maps.Event.addListener(clusterer, "clusterclick", (cluster: any) => {
      if (cluster.getMarkers().length === 1 && onOverlayClick) {
        const marker = cluster.getMarkers()[0];
        onOverlayClick((marker as any).__collectionId);
      }
    });

    markerObjs.forEach((marker) => {
      window.naver.maps.Event.addListener(marker, "click", () => {
        if (onOverlayClick) onOverlayClick((marker as any).__collectionId);
      });
    });

    // 오버레이 클래스
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

    // 클러스터 대신 오버레이 표시/숨김
    const updateOverlaysVisibility = () => {
      const zoom = map.getZoom();
      if (zoom >= ZOOM_THRESHOLD) {
        clusterer.setMap(null);
        overlayInstancesRef.current.forEach((o) => o.setMap(null));
        overlayInstancesRef.current = [];
        markers.forEach(({ latitude, longitude, collectionId, koreanName, note, imageUrl }) => {
          const position = new window.naver.maps.LatLng(latitude, longitude);
          const content = `<div class="flex flex-col items-center gap-10">
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
            </div>`;
          const overlay = new CustomOverlay(position, content);
          overlay.setMap(map);
          overlayInstancesRef.current.push(overlay);
        });
      } else {
        // 클러스트러만, 오버레이는 ㄴ
        overlayInstancesRef.current.forEach((o) => o.setMap(null));
        overlayInstancesRef.current = [];
        clusterer.setMap(map);
      }
    };
    const listener = window.naver.maps.Event.addListener(map, "zoom_changed", updateOverlaysVisibility);
    updateOverlaysVisibility();

    // 언마운트 시 클린업
    return () => {
      window.naver.maps.Event.removeListener(listener);
      overlayInstancesRef.current.forEach((o) => o.setMap(null));
      overlayInstancesRef.current = [];
      if (clusterer) clusterer.setMap(null);
    };
  }, [markers, mapRef.current, onOverlayClick, MarkerClustering]);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
};

export default NaverMap;
