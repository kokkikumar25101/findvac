/* global document */
// import * as React from 'react';
import React, {useState, useEffect} from 'react';
// import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { usePosition } from 'use-position';
// import {Component} from 'react';
// import {render} from 'react-dom';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MapGL, {
  Marker, 
  NavigationControl, 
  GeolocateControl, 
  AttributionControl, 
  Popup, 
  Source, 
  Layer,
  FlyToInterpolator
} from 'react-map-gl';

import ControlPanel from './control-panel';
// import API, { graphqlOperation } from '@aws-amplify/api';
import Auth from '@aws-amplify/auth';
import Amplify from '@aws-amplify/core';
import { Signer } from "@aws-amplify/core";
import styled from 'styled-components';
import {dataLayer} from './map-style.js';

// import "mapbox-gl/dist/mapbox-gl.css";

import Hospital from './hospital';
import Pin from './pin';
import 'mapbox-gl/dist/mapbox-gl.css'
// import 'react-map-gl-directions/dist/mapbox-gl-directions.css'
// import amplifyConfig from "../../../aws-exports";
// Amplify.configure(amplifyConfig);
// Amplify.configure({
//   ...aws_exports,
//   Analytics: {
//     disabled: true,
//   },
// });
const StyledPopup = styled.div`
  background: white;
  color: #3f618c;
  font-weight: 400;
  padding: 5px;
  border-radius: 2px;
  font-size: 12px;
  max-width: 200px;
  display: flex;  
  flex-wrap: wrap;
`;

// const MAPBOX_TOKEN = ''; // Set your mapbox token here
const geolocateStyle = {
  top: 100,
  left: 0,
  margin: 10
};
const positionOptions = {enableHighAccuracy: true};

const attributionStyle= {
  right: 0,
  top: 0
};


const navStyle = {
  // position: 'absolute',
  top: 0,
  right: 0,
  padding: '10px'
};
const aws_region = 'us-east-1'
const transformRequest = (credentials) => (url, resourceType) => {
  // Resolve to an AWS URL
  if (resourceType === "Style" && !url?.includes("://")) {
    url = `https://maps.geo.${aws_region}.amazonaws.com/maps/v0/maps/${url}/style-descriptor`;
  }

  // Only sign AWS requests (with the signature as part of the query string)
  if (url?.includes("amazonaws.com")) {
    return {
      url: Signer.signUrl(url, {
        access_key: credentials.accessKeyId,
        secret_key: credentials.secretAccessKey,
        session_token: credentials.sessionToken,
      })
    };
  }
  return { url: url || "" };
};

const mapName = "ChennaiNaviDemo";

const ClassicApp = ({centers, centersMap, selectedLocateCenter}) => {
  const watch = true;
  let { centerId } = useParams();
  const mapRef = React.createRef()
  const [credentials, setCredentials] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [coordinates, setCoordinates] = useState([]);
  const [enableUserTracking, setEnableUserTracking] = useState(true);
  // const [centersMap, setCentersMap] = useState({});
  
  // const [events, logEvents] = useState({});
  const {
    latitude,
    longitude,
    speed,
    timestamp,
    accuracy,
    error,
  } = usePosition(watch);

  const [viewport, setViewport] = useState({
    // latitude: 12.967810395239184,
    // longitude: 80.25415062904356,
    // latitude: 11.903130930350533,
    // longitude: 79.80623245239258,
    latitude: 12.96738,
    longitude: 80.25404,
    zoom: 10,
    // bearing: 0,
    // pitch: 0
  });
  const [route, setRoute] = useState({
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: [],
          },
          style: {
            fill: 'red',
            strokeWidth: '10',
            fillOpacity: 0.6,
          },
          paint: {
            'fill-color': '#088',
            'fill-opacity': 0.8,
          },
        },
      ],
    });
 
  const setSelectedMarker = (index) => {
    setSelectedIndex(index)
  }
  
  const handleOnGeolocate = () => {
    console.log('handleOnGeolocate')
  };
  const closePopup = () => {
    setSelectedMarker(null)
  };
  const openPopup = (index) => {
    setSelectedMarker(index)
  }
  const CustomMarker = ({index, marker}) => {
    return (
      <Marker
        longitude={parseFloat(marker.longitude)}
        latitude={parseFloat(marker.latitude)}>
        <div className="marker"  onClick={() => openPopup(index)}>
          {/* <span><b>{index}</b></span> */}
          <Hospital size={20} />
        </div>
      </Marker>
    )
  };
  const CustomPopup = ({index, marker, closePopup}) => {
    // debugger
    return (
      <Popup
        latitude={parseFloat(marker.latitude)}
        longitude={parseFloat(marker.longitude)}
        onClose={closePopup}
        closeButton={true}
        closeOnClick={false}
        // offsetTop={-30}
       >
        {/* <p>{marker.hospitalName}</p> */}
        {/* <div width="10"><strong>{marker.hospitalName}</strong><p>{marker.address}</p></div> */}
        <StyledPopup>
          <strong>{marker.hospitalName}</strong><p>{marker.address}</p>
        </StyledPopup>
      </Popup>
    )};
  

  useEffect(() => {
    
    const fetchCredentials = async () => {
      setCredentials(await Auth.currentUserCredentials());
    };

    fetchCredentials();
    updateLocation();
    // setUserLocation();
  }, []);

  useEffect(() => {
    updateLocation();
  }, [selectedLocateCenter]);

  const updateLocation = () => {
    console.log('centerId Locate : ' + centerId)
    // debugger
    if(Object.keys(selectedLocateCenter).length === 0){

      navigator.geolocation.getCurrentPosition(pos => {
        setViewport({
          ...viewport,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        });
      });
    }else {
      setViewport({
        ...viewport,
        latitude: parseFloat(selectedLocateCenter.latitude),
        longitude: parseFloat(selectedLocateCenter.longitude),
        zoom: 16,
        transitionInterpolator: new FlyToInterpolator({speed: 1.2}),
        transitionDuration: 'auto'
      });
    }
    // if (typeof centerId !== "undefined"){
    //   let selectedCenterObj = centersMap[parseInt(centerId)]
    //   console.log(selectedCenterObj)
    //   if(selectedCenterObj){
    //     setViewport({
    //       ...viewport,
    //       latitude: parseFloat(selectedCenterObj.latitude),
    //       longitude: parseFloat(selectedCenterObj.longitude),
    //       zoom: 16,
    //       transitionInterpolator: new FlyToInterpolator({speed: 1.2}),
    //       transitionDuration: 'auto'
    //     });
    //   }
    //   // } else {
    //   //   navigator.geolocation.getCurrentPosition(pos => {
    //   //     // debugger
    //   //     setViewport({
    //   //       ...viewport,
    //   //       latitude: pos.coords.latitude,
    //   //       longitude: pos.coords.longitude
    //   //     });
    //   //   });
    //   // }
    // }
  }

return (
  <>
  { credentials ? (
    <>
    <MapGL
        // ref={this.mapRef}
        {...viewport}
        width="100vw"
        height="100vh"
        transformRequest={transformRequest(credentials)}
        mapStyle={mapName}
        // perspectiveEnabled
        // onViewportChange={viewport => setViewport(viewport)}
        onViewportChange={(viewport) => setViewport(viewport)}
      >
        <Source type="geojson" data={route}>
          <Layer {...dataLayer} />
        </Source>
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={positionOptions} 
          trackUserLocation={enableUserTracking}
          onGeolocate={handleOnGeolocate}
          auto={true}
        />
        <div className="nav" style={navStyle}>
          <NavigationControl />
        </div>
        <>
        {
            centers.map((center, key) => 
            // <Marker
            //   longitude={parseFloat(center.longitude)}
            //   latitude={parseFloat(center.latitude)}
            //   offsetTop={-20}
            //   offsetLeft={-10}
            // >
            //   <Pin size={20} />
            // </Marker>
            <CustomMarker
                key={key}
                index={key}
                marker={center}
                openPopup={openPopup}
              />
            // <CustomPopup />
            )}</>
            <>{
              selectedIndex !== null &&
                <CustomPopup
                  index={selectedIndex}
                  marker={centers[selectedIndex]}
                  closePopup={closePopup}
                />
            }</>
      </MapGL>
      {/* <ControlPanel events={events} /> */}
      {/* <AttributionControl compact={true} style={attributionStyle} /> */}
      </>
  ) : (
    <h1>Loading...</h1>
  )}
      
    </>
  );
}

// export default ClassicApp;
ClassicApp.propTypes = {
  centers: PropTypes.array.isRequired,
  centersMap: PropTypes.object.isRequired,
  selectedLocateCenter: PropTypes.object.isRequired
  };
  
  function mapStateToProps(state, ownProps) {
    return {
        // centers: state.center.dataList,
        // centersMap: state.center.dataMap,
        selectedLocateCenter: state.center.selectedLocateCenter
    };
  }
  
  const mapDispatchToProps = {
  };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClassicApp);