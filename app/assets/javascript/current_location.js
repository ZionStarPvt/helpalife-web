document.addEventListener("DOMContentLoaded", function () {

    document.getElementById('crosshair-icon').addEventListener('click', function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                const latLng = new google.maps.LatLng(lat, lon);
                map.setCenter(latLng);
                map.setZoom(18);

                if (!marker) {
                    marker = new google.maps.Marker({
                        position: latLng,
                        map: map
                    });
                } else {
                    marker.setPosition(latLng);
                }

                const geocoder = new google.maps.Geocoder();
                geocoder.geocode({location: latLng}, (results, status) => {
                    if (status === 'OK') {
                        if (results[0]) {
                            const addressComponents = results[0].address_components;
                            const formattedAddress = addressComponents.filter(component => component.types.includes("locality")).map(component => component.long_name).join(', ');
                            document.getElementById('locationResult').value = formattedAddress;
                        } else {
                            alert('No address found');
                        }
                    } else {
                        alert('Geocoder failed due to: ' + status);
                    }
                });
            }, (error) => {
                alert(`Error: ${error.message}`);
            }, {enableHighAccuracy: true});
        } else {
            alert('Geolocation is not supported by your browser.');
        }
    });

})


