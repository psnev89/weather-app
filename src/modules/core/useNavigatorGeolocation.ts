import { ref } from "vue";
import type { Ref } from "vue";

export const useNavigatorGeolocation = function () {
  const geolocation: Ref<null | GeolocationCoordinates> = ref(null);
  const lastUpdate: Ref<null | number> = ref(null);
  const error: Ref<null | string> = ref(null);
  const isGettingGeolocation: Ref<boolean> = ref(false);
  const TIMEOUT = 10000;

  if (!window.navigator?.geolocation)
    error.value = "Geolocation API not supported";

  function onSuccess(geo: GeolocationPosition) {
    geolocation.value = geo.coords;
    error.value = null;
    lastUpdate.value = geo.timestamp;
  }
  function onError(err: GeolocationPositionError | Error) {
    geolocation.value = null;
    error.value = err.message;
    lastUpdate.value = null;
  }
  function getCurrentPositionWrapper() {
    return new Promise((resolve, reject) => {
      window.navigator?.geolocation?.getCurrentPosition?.(resolve, reject, {
        timeout: TIMEOUT,
      });
    });
  }
  async function get() {
    isGettingGeolocation.value = true;
    try {
      const geo: GeolocationPosition = await getCurrentPositionWrapper();
      onSuccess(geo);
    } catch (err: GeolocationPositionError | Error) {
      onError(err);
    } finally {
      isGettingGeolocation.value = false;
    }
  }

  return {
    get,
    geolocation,
    lastUpdate,
    isGettingGeolocation,
    error,
  };
};
