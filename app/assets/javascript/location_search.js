let map;
let marker;

// Attach the initMap function globally
window.initMap = function () {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 20.5937, lng: 78.9629 },
        zoom: 5,
    });

    initAutocomplete();

    const button = document.getElementById('get-location');
    if (button) {
        button.addEventListener('click', () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const lat = position.coords.latitude;
                        const lon = position.coords.longitude;
                        const latLng = new google.maps.LatLng(lat, lon);

                        map.setCenter(latLng);
                        map.setZoom(18);

                        if (!marker) {
                            marker = new google.maps.Marker({
                                position: latLng,
                                map: map,
                            });
                        } else {
                            marker.setPosition(latLng);
                        }

                        const geocoder = new google.maps.Geocoder();
                        geocoder.geocode({ location: latLng }, (results, status) => {
                            if (status === 'OK' && results[0]) {
                                const address = results[0].address_components
                                    .filter(c =>
                                        !c.types.includes('plus_code') &&
                                        !c.types.includes('postal_code_prefix')
                                    )
                                    .map(c => c.long_name)
                                    .join(', ');

                                const searchInput = document.getElementById('searchInput');
                                if (searchInput) {
                                    searchInput.value = address;
                                } else {
                                    console.warn("searchInput not found when trying to set address.");
                                }
                            } else {
                                alert('No address found');
                            }
                        });
                    },
                    (error) => {
                        alert(`Error: ${error.message}`);
                    },
                    { enableHighAccuracy: true }
                );
            } else {
                alert('Geolocation is not supported by your browser.');
            }
        });
    } else {
        console.warn("Get location button not found.");
    }
};

function initAutocomplete() {
    const input = document.getElementById('searchInput');
    if (!input) {
        console.error("Search input not found.");
        return;
    }

    const autocomplete = new google.maps.places.Autocomplete(input, {
        types: ['geocode']
    });

    autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();

        if (!place || !place.geometry) {
            console.error("No details available for input: '" + input.value + "'");
            return;
        }

        if (place.formatted_address) {
            input.value = place.formatted_address;
        } else {
            console.warn("formatted_address not available for selected place.");
        }
    });
}
