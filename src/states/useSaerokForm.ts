import { useRecoilState } from "recoil";
import { saerokFormState } from "./saerokFormAtom";

export const useSaerokForm = () => {
  const [form, setForm] = useRecoilState(saerokFormState);

  const setBirdName = (name: string | null) => setForm((prev) => ({ ...prev, birdName: name }));
  const setBirdId = (id: number | null) => setForm((prev) => ({ ...prev, birdId: id }));
  const setPlaceName = (place: string) => setForm((prev) => ({ ...prev, placeName: place }));
  const setAddress = (addr: string) => setForm((prev) => ({ ...prev, address: addr }));
  const setLocationAlias = (alias: string) => setForm((prev) => ({ ...prev, locationAlias: alias }));
  const setLatitude = (lat: number | null) => setForm((prev) => ({ ...prev, latitude: lat }));
  const setLongitude = (lng: number | null) => setForm((prev) => ({ ...prev, longitude: lng }));
  const setDate = (date: string) => setForm((prev) => ({ ...prev, date }));
  const setMemo = (memo: string) => setForm((prev) => ({ ...prev, memo }));
  const setImageFile = (file: File | null) => setForm((prev) => ({ ...prev, imageFile: file }));
  const setImagePreviewUrl = (url: string | null) => setForm((prev) => ({ ...prev, imagePreviewUrl: url }));

  const setPlaceNameDetails = ({
    placeName,
    address,
    locationAlias,
    latitude,
    longitude,
  }: {
    placeName: string;
    address: string;
    locationAlias: string;
    latitude: number;
    longitude: number;
  }) =>
    setForm((prev) => ({
      ...prev,
      placeName,
      address,
      locationAlias,
      latitude,
      longitude,
    }));

  const resetForm = () =>
    setForm({
      birdName: "",
      birdId: null,
      placeName: "",
      address: "",
      locationAlias: "",
      latitude: null,
      longitude: null,
      date: "",
      memo: "",
      imageFile: null,
      imagePreviewUrl: null,
    });

  return {
    form,
    setForm,
    setBirdName,
    setBirdId,
    setPlaceName,
    setAddress,
    setLocationAlias,
    setLatitude,
    setLongitude,
    setDate,
    setMemo,
    setImageFile,
    setImagePreviewUrl,
    setPlaceNameDetails,
    resetForm,
  };
};
