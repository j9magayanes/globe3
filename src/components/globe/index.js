import React from "react";
import Globe from "react-globe.gl";
import chroma from "chroma-js";
import { useCarbonData } from "../../hooks/useCarbonData";
import { useBioDiversityData } from "../../hooks/useBioDiversityData";
import { useNewsData } from "../../hooks/useNewsData";
import { useDispatch, useSelector, useStore } from "react-redux";

export default function GlobeComponent() {
  const dispatch = useDispatch();
  const store = useStore();
  const category = useSelector(() => store.getState().categoryReducer.category);
  const carbonData = useCarbonData();
  const newsData  = useNewsData();
  const bioDiversityData  = useBioDiversityData();
  const [hoverD, setHoverD] = React.useState();
  const globeEl = React.useRef();
  let categories = [];
  let datas = [];

  // for the data map
  const [globeData, setGlobeData] = React.useState({
    countries: {
      features: [],
    },
    points: {
      features: [],
    },
  });

  // for the data points
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const colorScale = chroma.scale(category === "biodiversity" ? ["white", "green"]: category === "wildfire" ? ["#fe8579", "#b21100"]: ["white", "black"]);
  let link;

  if (newsData && category) {
    newsData.items.map((data) => {
      if (data.category === category) {
        return categories.push(data);
      }
    });
  }

  if (category === "") {
    link = "https://raw.githubusercontent.com/j9magayanes/data/main/carbonclean.json";
  }

  if (category === "carbon") {
    link = "https://raw.githubusercontent.com/j9magayanes/data/main/carbonclean.json";
  }

  if (category === "biodiversity") {
      link = "https://raw.githubusercontent.com/j9magayanes/data/main/biodiversity.json";
  }



  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
       fetch(
         link
          )
          .then((response) => response.json())
          .then((data) => {
            const sortedData = data.sort((a, b) =>
              a.countryName.localeCompare(b.countryName)
            );
            setData(sortedData);
          });
        fetch(
          "https://raw.githubusercontent.com/iamanas20/geojson/main/map11.geojson"
        )
          .then((res) => res.json())
          .then(function (res) {
            setGlobeData({
              countries: res[0],
              points: res[1],
            });
          });
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };
    fetchData();
  }, [category]);

  React.useEffect(
    function () {
      if (globeEl.current !== undefined) {
        const scene = globeEl.current.scene();
        if (scene.children.length === 4) {
          scene.children[1].intensity = 1.5;
          scene.children[2].visible = false;
        }
        globeEl.current.controls().autoRotate = false;
        globeEl.current.controls().autoRotateSpeed = 0.5;
        globeEl.current.controls().enableZoom = true;
      }
    },
    [globeData]
  );

  let lookup = [];

  return (
    <div>
      {loading && <div>Loading...</div>}
      {!loading && (
        <>
          <Globe
            ref={globeEl}
            backgroundColor="#F6F7FB"
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            showAtmosphere={true}
            autoRotate={false}
            polygonsData={globeData.countries.features}
            polygonStrokeColor={() => "#A4B0BB"}
            polygonSideColor={() => "rgba(222,225,228,.6)"}
            onPolygonHover={setHoverD}
            polygonCapColor={function ({ properties: d }) {
              for (let i = 0, len = data.length; i < len; i++) {
                lookup[data[i].countryName] = data[i];
              }
              return colorScale(lookup[d.ADMIN]?.happinessScore * 0.1)
                .brighten(0.5)
                .hex();
            }}
            polygonLabel={function ({ properties: d }) {
              for (let i = 0, len = data.length; i < len; i++) {
                lookup[data[i].countryName] = data[i];
              }

              return `
                    <div style="position: relative; z-index: 4; min-width: 108px; padding: 3px;background: #fff;border: 1px solid #E5E5E5;box-shadow: 0px 2px 20px rgba(32, 32, 35, 0.13);border-radius: 4px; text-align: left;">
                    <div style="font-family: 'Open sans', sans-serif; margin-bottom:10px;font-weight: 600;font-size: 13px;line-height: 16px;text-transform: capitalize;color: #2D3032;">
                        ${d.ADMIN}
                    </div>
                        <div style="font-family: 'Open sans', sans-serif;font-size: 13px;line-height: 16px;color: #3E4850;">
                            Threat Level Value: ${
                              lookup[d.ADMIN]?.happinessScore
                            }
                        </div>
                        <div style="font-family: 'Open sans', sans-serif;font-size: 13px;line-height: 16px;color: #3E4850; margin-bottom:10px;">
                            Threat Level: ${lookup[d.ADMIN]?.happinessRank}
                        </div>

                        <div style="font-family: 'Open sans', sans-serif;font-size: 13px;line-height: 16px;color: #3E4850;">
                        Source: ""
                    </div>
                    </div>
                `;
            }}
            labelsData={categories}
            labelLat={(d) => d.lat}
            labelLng={(d) => d.long}
            labelAltitude={0.015}
            labelText={(d) => ""}
            labelLabel={(d) =>  `
                    <div style="position: relative; z-index: 4; width: 430px; background: #fff;border: 1px solid #E5E5E5;box-shadow: 0px 2px 20px rgba(32, 32, 35, 0.13);border-radius: 4px; text-align: center;">
                    <div style="font-family: 'Open sans', sans-serif; margin-bottom:10px;font-weight: 600;font-size: 13px;line-height: 16px;text-transform: capitalize;color: #2D3032;">          
                    </div>
                        <div style="font-family: 'Open sans', padding: 1px 1px; sans-serif;font-size: 12px;color: #3E4850;">
                            <h1> ${d.headline}</h1>
                        </div>
                        <img style="height: 200px" src=${d.image}>
                    <div style="font-family: 'Open sans', sans-serif;font-size: 13px;line-height: 16px;color: #3E4850;  padding: 1px 1px; ">
                            <h3>${d.content}...</h3>
                        </div>
                    </div>
                `}
            labelSize={(d) => 0.6}
            labelDotRadius={(d) => 1}
            labelColor={(d) => "gray"}
            labelResolution={1}
          />
        </>
      )}
    </div>
  );
}
