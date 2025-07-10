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
  center: { lat: number; lng: number };
  onCenterChanged?: (lat: number, lng: number) => void;
  onOverlayClick?: (id: number) => void;
}

const NAVER_APP_KEY = import.meta.env.VITE_NAVER_APP_KEY;
const ZOOM_THRESHOLD = 18;

const NaverMap = ({ mapRef, markers, center, onCenterChanged, onOverlayClick }: NaverMapProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayInstancesRef = useRef<any[]>([]);
  const markerInstancesRef = useRef<any[]>([]);
  const [MarkerClustering, setMarkerClustering] = useState<any>(null);
  const [mapReady, setMapReady] = useState(false);
  const zoomRef = useRef<number>(17);

  // 1. 네이버맵 스크립트 robust load + 맵 인스턴스 생성
  useEffect(() => {
    let cancelled = false;
    function createMap() {
      if (!window.naver || !window.naver.maps || !containerRef.current) return;
      mapRef.current = new window.naver.maps.Map(containerRef.current, {
        center: new window.naver.maps.LatLng(center.lat, center.lng),
        zoom: 17,
      });
      setMapReady(true);
      if (onCenterChanged) {
        window.naver.maps.Event.addListener(mapRef.current, "center_changed", () => {
          if (mapRef.current) {
            const c = mapRef.current.getCenter();
            onCenterChanged(c.lat(), c.lng());
          }
        });
      }
    }

    // script가 없으면 삽입, 있으면 준비까지 반복 체크
    if (!document.getElementById("naver-maps-script")) {
      const script = document.createElement("script");
      script.id = "naver-maps-script";
      script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${NAVER_APP_KEY}`;
      script.async = true;
      script.onload = () => {
        if (!cancelled) createMap();
      };
      document.head.appendChild(script);
    } else {
      // script가 이미 있으면 window.naver.maps가 로딩됐는지 확인
      if (window.naver && window.naver.maps && containerRef.current) {
        createMap();
      } else {
        const interval = setInterval(() => {
          if (window.naver && window.naver.maps && containerRef.current) {
            clearInterval(interval);
            if (!cancelled) createMap();
          }
        }, 60);
      }
    }

    return () => {
      cancelled = true;
      markerInstancesRef.current.forEach((marker) => marker.setMap(null));
      markerInstancesRef.current = [];
      overlayInstancesRef.current.forEach((overlay) => overlay.setMap(null));
      overlayInstancesRef.current = [];
      if (mapRef.current) {
        mapRef.current = null;
      }
      setMapReady(false);
    };
  }, [mapRef, containerRef]);

  // 2. 지도 중심 이동: 외부에서 center prop이 변경될 때마다 반영
  useEffect(() => {
    if (mapReady && mapRef.current) {
      const map = mapRef.current as any;
      const cur = map.getCenter();
      if (cur.lat() !== center.lat || cur.lng() !== center.lng) {
        map.setCenter(new window.naver.maps.LatLng(center.lat, center.lng));
      }
    }
  }, [center, mapReady]);

  // 3. 줌 추적 (최신 zoom 값을 zoomRef로 보존)
  useEffect(() => {
    if (!mapReady || !mapRef.current) return;
    const map = mapRef.current as any;
    zoomRef.current = map.getZoom();
    const listener = window.naver.maps.Event.addListener(map, "zoom_changed", () => {
      zoomRef.current = map.getZoom();
    });
    return () => {
      window.naver.maps.Event.removeListener(listener);
    };
  }, [mapReady, mapRef.current]);

  // 4. markerClustering.js 동적 import
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

  // 5. 마커 및 클러스터/오버레이 관리 + renderByZoom
  useEffect(() => {
    if (!mapReady || !window.naver || !mapRef.current || !MarkerClustering) return;
    const map = mapRef.current as any;

    markerInstancesRef.current.forEach((marker) => marker.setMap(null));
    markerInstancesRef.current = [];
    overlayInstancesRef.current.forEach((overlay) => overlay.setMap(null));
    overlayInstancesRef.current = [];

    // 마커 생성
    const markerObjs = markers.map((item) => {
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(item.latitude, item.longitude),
        map: null,
        icon: {
          url: "data:image/gif;base64,R0lGODlhAQABAAAAACw=",
          size: new window.naver.maps.Size(1, 1),
          anchor: new window.naver.maps.Point(0.5, 0.5),
          scaledSize: new window.naver.maps.Size(1, 1),
        },
        opacity: 0,
      });
      (marker as any).__markerData = item;
      return marker;
    });
    markerInstancesRef.current = markerObjs;

    // 클러스터러
    const clusterer = new MarkerClustering({
      minClusterSize: 2,
      maxZoom: ZOOM_THRESHOLD,
      map: null, // 최초엔 꺼둠
      markers: markerObjs,
      disableClickZoom: false,
      gridSize: 60,
      icons: [
        {
          content: `
            <div style="
              width: 45px;
              height: 45px;
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
      ],
      indexGenerator: [10, 50, 100, 500, 1000],
      stylingFunction: function (clusterMarker: any, count: number) {
        const el = clusterMarker.getElement?.() || clusterMarker._element;
        if (el) {
          Array.from(el.childNodes as NodeListOf<ChildNode>).forEach((node: ChildNode) => {
            if (node.nodeType === Node.TEXT_NODE) el.removeChild(node);
          });
          const span = el.querySelector("span");
          if (span) span.textContent = count;
        }
      },
    });

    function addCustomOverlay(item: MapItemsType, showBalloon: boolean) {
      const { collectionId, koreanName, note, imageUrl, latitude, longitude } = item;
      const position = new window.naver.maps.LatLng(latitude, longitude);
      const content = showBalloon
        ? `<div class="flex flex-col items-center gap-10">
            
        <button
              type="button"
              class="collection-overlay-btn relative gap-7 flex flex-col items-center bg-[#FEFEFE] rounded-[10px] min-w-[100px] max-w-[172px] px-16 py-16 z-10"
              data-collection-id="${collectionId}"
            >
              <div class="font-moneygraphy text-body-3 text-black">${koreanName ?? "이름 모를 새"}</div>
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
              class="collection-overlay-btn w-[45px] h-[45px] rounded-full border-[3px] border-white bg-white overflow-hidden box-border"
              data-collection-id="${collectionId}"
              type="button"
            >
              <img src="${imageUrl}" class="w-full h-full object-cover" />
            </button>
          </div>`
        : `<div class="flex flex-col items-center gap-10">
            <button
              class="collection-overlay-btn w-[45px] h-[45px] rounded-full border-[3px] border-white bg-white overflow-hidden box-border"
              data-collection-id="${collectionId}"
              type="button"
            >
              <img src="${imageUrl}" class="w-full h-full object-cover" />
            </button>
          </div>`;

      class CustomOverlay extends window.naver.maps.OverlayView {
        element: HTMLElement;
        position: naver.maps.LatLng;
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

      const overlay = new CustomOverlay(position, content);
      overlay.setMap(map);
      overlayInstancesRef.current.push(overlay);
    }

    function renderByZoom(zoom: number) {
      overlayInstancesRef.current.forEach((o) => o.setMap(null));
      overlayInstancesRef.current = [];
      if (zoom >= ZOOM_THRESHOLD) {
        clusterer.setMap(null);
        markers.forEach((item) => addCustomOverlay(item, true));
      } else {
        clusterer.setMap(map);
        if (clusterer._clusters) {
          clusterer._clusters.forEach((cluster: any) => {
            if (cluster.getCount() === 1) {
              const marker = cluster.getClusterMember()[0];
              marker.setMap(null);
              addCustomOverlay(marker.__markerData, false);
            }
          });
        }
      }
    }

    // 최초 및 줌 변경 시에 renderByZoom 실행
    renderByZoom(map.getZoom());
    const zoomListener = window.naver.maps.Event.addListener(map, "zoom_changed", () => {
      renderByZoom(map.getZoom());
    });

    return () => {
      window.naver.maps.Event.removeListener(zoomListener);
      overlayInstancesRef.current.forEach((o) => o.setMap(null));
      overlayInstancesRef.current = [];
      if (clusterer) clusterer.setMap(null);
    };
  }, [markers, mapReady, mapRef.current, onOverlayClick, MarkerClustering, center.lat, center.lng]);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
};

export default NaverMap;
