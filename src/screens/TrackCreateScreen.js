// import '../_mockLocation';
import React, { useCallback, useContext } from 'react';
import { StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text } from "react-native-elements";
import Map from "../components/Map";
import { Context as LocationContext } from '../context/LocationContext';
import useLocation from "../hooks/useLocation";
import { withNavigationFocus } from "react-navigation";
import TrackForm from "../components/TrackForm";
import { MaterialIcons } from '@expo/vector-icons';

const TrackCreateScreen = ( { isFocused } ) => {
  const {
    state: { recording },
    addLocation
  } = useContext( LocationContext );
  const callback = useCallback( ( location ) => {
    addLocation( location, recording )
  }, [ recording ] );
  const [ err ] = useLocation( isFocused || recording, callback );

  return (
    <SafeAreaView
      style={ styles.viewContainer }
    >
      <Text h3 style={ { alignSelf: 'center' } }>TrackCreateScreen</Text>
      <Map/>
      {
        err
          ? <Text>Please enable location services</Text>
          : null
      }
      <TrackForm/>
    </SafeAreaView>
  );
};

TrackCreateScreen.navigationOptions = () => {
  return {
    headerShown: false,
    title: 'Add Track',
    tabBarIcon: <MaterialIcons name="add-location-alt" size={24} color="black" />
  };
};

const styles = StyleSheet.create( {
  viewContainer: {
    flex: 1,
    justifyContent: 'flex-start'
  }
} );

export default withNavigationFocus( TrackCreateScreen );
