import noDataImageUrl from '../../images/marker-no-data.png';
import okImageUrl from '../../images/marker-ok.png';
import warningImageUrl from '../../images/marker-warning.png';
import errorImageUrl from '../../images/marker-error.png';
import Leaflet from 'leaflet';
import assign from 'lodash.assign';

const defaultProperties = {
    iconSize: [25, 41],
    iconAnchor: [13, 40],
    popupAnchor: [0, -30]
};

export const noDataIcon = Leaflet.icon(assign(
    {
        iconUrl: noDataImageUrl,
    }, defaultProperties
));

export const okIcon = Leaflet.icon(assign(
    {
        iconUrl: okImageUrl,
    }, defaultProperties
));

export const warningIcon = Leaflet.icon(assign(
    {
        iconUrl: warningImageUrl,
    }, defaultProperties
));

export const errorIcon = Leaflet.icon(assign(
    {
        iconUrl: errorImageUrl,
    }, defaultProperties
));
