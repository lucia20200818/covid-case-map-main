import React, {useRef, useState} from "react";
import GoogleMapReact from "google-map-react";
import '../../App.css';
import {InfoRetrieveService} from "../../services/InfoRetrieveService";
import PointCard from "../PointCard";
import ClusterCard from "../ClusterCard";
import {MapUtil} from "../../util/map/MapUtil";

const Marker = ({children}) => children;

export default function SimpleMap() {
    const mapRef = useRef();
    const [bounds, setBounds] = useState(null);
    const [zoom, setZoom] = useState(10);
    const [points, setPoints] = useState({});

    return (
        <div style={{height: "100vh", width: "100%"}}>
            <GoogleMapReact
                bootstrapURLKeys={{key: 'AIzaSyA-uOrTHhgKjvyrrwzfI7J7GJnqfS5VWE4'}}
                defaultCenter={{lat: 42, lng: -74}}
                defaultZoom={10}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({map, maps}) => {
                    mapRef.current = map;
                    InfoRetrieveService.getAllUsData()
                        .then(response => {
                            const covidPoints = MapUtil.getCovidPoints(response.data);
                            setPoints(covidPoints);
                        })
                        .catch(error => console.log(error));
                }}
                onChange={({zoom, bounds}) => {
                    setZoom(zoom);
                    setBounds(bounds);
                }}
            >
                {renderPoints()}
            </GoogleMapReact>
        </div>
    );

    function renderPoints() {
        const cluster = points[zoom];
        const result = [];
        if (!cluster) {
            return result;
        }

        if (Array.isArray(cluster)) { // render all points inside boundary
            for (const point of cluster) {
                if (MapUtil.inBoundary(bounds, point.coordinates)) {
                    result.push(
                        <Marker
                            key={`county-${point.country}-${point.province}-${point.county}`}
                            lat={point.coordinates.latitude}
                            lng={point.coordinates.longitude}
                        >
                            <PointCard {...point} />
                        </Marker>
                    );
                }
            }
            return result;
        }


        if (cluster.type === "nation") {
            for (const nation of Object.keys(cluster)) {
                if (nation === 'nation') {
                    continue
                }
                if (MapUtil.inBoundary(bounds, cluster[nation].coordinates)) {
                    result.push(
                        <Marker
                            key={`cluster-${nation}`}
                            lat={cluster[nation].coordinates.latitude}
                            lng={cluster[nation].coordinates.longitude}
                        >
                            <div
                                className="cluster-marker"
                                style={{
                                    width: `${30}px`,
                                    height: `${30}px`
                                }}
                                onClick={() => {
                                    const expansionZoom = Math.min(
                                        zoom + 1,
                                        20
                                    );
                                    mapRef.current.setZoom(expansionZoom);
                                    mapRef.current.panTo(cluster[nation].location);
                                }}
                            >
                                <ClusterCard nation={nation} {...cluster[nation]} />
                            </div>
                        </Marker>
                    );
                }
            }
            return result;
        }

        //states
        for (const nation of Object.keys(cluster)) {
            if (nation === 'state') {
                continue;
            }
            for (const state of Object.keys(cluster[nation])) {
                if (MapUtil.inBoundary(bounds, cluster[nation][state].coordinates)) {
                    result.push(
                        <Marker
                            key={`cluster-${nation}-${state}`}
                            lat={cluster[nation][state].coordinates.latitude}
                            lng={cluster[nation][state].coordinates.longitude}
                        >
                            <div
                                className="cluster-marker"
                                onClick={() => {
                                    const expansionZoom = Math.min(
                                        zoom + 1,
                                        20
                                    );
                                    mapRef.current.setZoom(expansionZoom);
                                    mapRef.current.panTo(cluster[nation][state].location);
                                }}
                            >
                                <ClusterCard state={state} {...cluster[nation][state]} />
                            </div>
                        </Marker>
                    );
                }
            }

        }
        return result;
    }
}