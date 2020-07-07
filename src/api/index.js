import axios from "axios";

const url = "https://covid19.mathdro.id/api/";

export const fetchCountriesLocation = async () => {
  try {
    const { data } = await axios.get(`${url}confirmed`);
    const modifiedData = data
      .filter((data) => data.lat != null && data.long != null)
      .map((dailyData) => ({
        confirmed: dailyData.confirmed,
        deaths: dailyData.deaths,
        recovered: dailyData.recovered,
        provinceState: dailyData.provinceState,
        lat: dailyData.lat,
        long: dailyData.long,
        uid: dailyData.uid,
      }));
    return modifiedData;
  } catch (error) {}
};
