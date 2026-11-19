/** Approximate centre [lat, lng] of countries, for travel pins. Matching ignores case and accents. */
const RAW: Record<string, [number, number]> = {
  afghanistan: [34, 66], albania: [41, 20], algeria: [28, 3], argentina: [-34, -64], armenia: [40, 45],
  australia: [-25, 134], austria: [47.5, 14.5], azerbaijan: [40.3, 47.7], bahamas: [24, -76], bahrain: [26, 50.5],
  bangladesh: [24, 90], belarus: [53.5, 28], belgium: [50.6, 4.6], bhutan: [27.5, 90.4], bolivia: [-17, -65],
  "bosnia and herzegovina": [44, 18], botswana: [-22, 24], brazil: [-10, -52], bulgaria: [42.7, 25.3], cambodia: [12.5, 105],
  cameroon: [6, 12], canada: [56, -106], chile: [-33, -71], china: [35, 104], colombia: [4, -73], "costa rica": [10, -84],
  croatia: [45.2, 15.5], cuba: [21.5, -79], cyprus: [35, 33], "czech republic": [49.8, 15.5], czechia: [49.8, 15.5],
  denmark: [56, 10], "dominican republic": [19, -70.5], ecuador: [-1.5, -78], egypt: [26.5, 30], estonia: [58.6, 25],
  ethiopia: [9, 39.5], fiji: [-17.7, 178], finland: [64, 26], france: [46.5, 2.5], georgia: [42.3, 43.5], germany: [51, 10],
  ghana: [8, -1], greece: [39, 22], guatemala: [15.5, -90.3], hungary: [47, 19.5], iceland: [65, -18], india: [22, 79],
  indonesia: [-2.5, 118], iran: [32.5, 54], iraq: [33, 44], ireland: [53.2, -8], israel: [31.4, 35], italy: [42.8, 12.5],
  jamaica: [18.1, -77.3], japan: [36.5, 138], jordan: [31, 36.5], kazakhstan: [48, 67], kenya: [0.5, 38], kosovo: [42.6, 21],
  kuwait: [29.3, 47.7], kyrgyzstan: [41.5, 74.5], laos: [18, 103], latvia: [57, 25], lebanon: [33.9, 35.9], lithuania: [55.3, 24],
  luxembourg: [49.8, 6.1], madagascar: [-19, 47], malaysia: [3.5, 102], maldives: [3.2, 73.2], malta: [35.9, 14.4],
  mexico: [23.6, -102.5], moldova: [47.2, 28.5], monaco: [43.7, 7.4], mongolia: [46.8, 103], montenegro: [42.7, 19.3],
  morocco: [31.8, -7], mozambique: [-18.6, 35.5], myanmar: [21, 96], namibia: [-22.5, 17], nepal: [28.3, 84], netherlands: [52.2, 5.5],
  "new zealand": [-41.5, 172.5], nicaragua: [12.9, -85.2], nigeria: [9, 8], "north macedonia": [41.6, 21.7], norway: [61, 9],
  oman: [21, 57], pakistan: [30, 70], panama: [8.5, -80], paraguay: [-23.4, -58.4], peru: [-9.2, -75], philippines: [12.9, 122],
  poland: [52, 19.4], portugal: [39.6, -8], qatar: [25.3, 51.2], romania: [45.9, 25], russia: [61, 90], rwanda: [-2, 30],
  "saudi arabia": [24, 45], scotland: [56.8, -4.2], senegal: [14.5, -14.5], serbia: [44, 21], singapore: [1.35, 103.8],
  slovakia: [48.7, 19.7], slovenia: [46.1, 14.8], "south africa": [-29, 25], "south korea": [36.5, 127.8], korea: [36.5, 127.8],
  spain: [40.2, -3.6], "sri lanka": [7.8, 80.7], sweden: [62, 15], switzerland: [46.8, 8.2], taiwan: [23.7, 121],
  tajikistan: [38.9, 71], tanzania: [-6.4, 35], thailand: [15.5, 101], tunisia: [34, 9.5], turkey: [39, 35], turkiye: [39, 35],
  uganda: [1.4, 32.3], ukraine: [49, 31.4], "united arab emirates": [24, 54], uae: [24, 54], "united kingdom": [54, -2.5],
  uk: [54, -2.5], england: [52.5, -1.5], "united states": [39.5, -98.5], usa: [39.5, -98.5], us: [39.5, -98.5],
  uruguay: [-32.5, -56], uzbekistan: [41.4, 64.5], venezuela: [7, -66], vietnam: [16, 107.8], wales: [52.3, -3.7],
  zambia: [-13.1, 27.8], zimbabwe: [-19, 29.2],
};

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").trim().toLowerCase();

export function countryCoords(name: string): [number, number] | null {
  return RAW[norm(name)] ?? null;
}
