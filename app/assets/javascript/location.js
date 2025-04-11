// $(document).ready(function () {
let map;
let marker;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 20.5937, lng: 78.9629}, // Centered on India
        zoom: 5
    });
}

document.addEventListener("DOMContentLoaded", function () {
    initMap()
    if (typeof google !== "undefined") {
        var options = {
            types: ['geocode'], // 'cities' is too restrictive, use 'geocode' for better accuracy
            // componentRestrictions: { country: "in" }
        };
        var input = document.getElementById("locationResult");
        var autocomplete = new google.maps.places.Autocomplete(input, options);

        autocomplete.addListener("place_changed", function () {
            var place = autocomplete.getPlace();
            if (!place.geometry) {
                console.error("No location data found.");
                return;
            }

            var latitude = place.geometry.location.lat();
            var longitude = place.geometry.location.lng();
            var formatted_address = place.formatted_address;

            document.getElementById("latitude").value = latitude;
            document.getElementById("longitude").value = longitude;
            sessionStorage.setItem("searchedLocation", formatted_address);

            console.log("Location Selected:", formatted_address, latitude, longitude);
        });
    } else {
        console.error("Google Maps API not loaded.");
    }

    // Handling manual location input using the crosshair icon
    document.getElementById("crosshair-icon").addEventListener("click", function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    var latitude = position.coords.latitude;
                    var longitude = position.coords.longitude;
                    document.getElementById("latitude").value = latitude;
                    document.getElementById("longitude").value = longitude;
                    document.getElementById("locationResult").value = `Lat: ${latitude}, Lng: ${longitude}`;
                },
                function (error) {
                    console.error("Geolocation error:", error);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    });
});
// })


document.addEventListener("DOMContentLoaded", function () {
    const input = document.querySelector("#phone");
    const iti = window.intlTelInput(input, {
        initialCountry: "us",
        separateDialCode: true,
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
    });
    console.log("itl", iti)
    input.addEventListener("countrychange", function () {
        const countryData = iti.getSelectedCountryData();
        console.log(countryData)
        var element = document.querySelector(".iti__selected-dial-code");
        var countryCode = element.textContent.trim();
        document.getElementById("country_code").value = countryCode;
        console.log("ewiuywe",countryCode);

        // document.querySelector("#phone_country_code").value = countryData.dialCode;
    });
    document.querySelector("form").addEventListener("submit", function () {
        var element = document.querySelector(".iti__selected-dial-code");
        var countryCode = element.textContent.trim();
        document.getElementById("country_code").value = countryCode;
        console.log("ewiuywe",countryCode);

        console.log("values",iti.getNumber())
    });
});


function isNumberKey(evt) {
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode == 32 || charCode == 46) {
        return false; // Prevent space and dot
    }
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false; // Prevent non-numeric characters
    }
    return true;
}



document.addEventListener("DOMContentLoaded", function () {
    var password_Input = document.getElementById('password_Input');
    var passwordLengthFeedback = document.getElementById('passwordLengthFeedback');
    var password_confirmationinput = document.getElementById('password_confirmationinput');
    var passwordConfirmationFeedback = document.getElementById('passwordConfirmationFeedback');

    function checkPasswordLength() {
        var isValid = password_Input.value.length >= 6;
        if (!isValid) {
            passwordLengthFeedback.style.display = 'block';
            return false;
        } else {
            passwordLengthFeedback.style.display = 'none';
            return true;
        }
    }

    function checkPasswordMatch() {
        var doPasswordsMatch = password_Input.value === password_confirmationinput.value;
        if (!doPasswordsMatch) {
            passwordConfirmationFeedback.style.display = 'block';
            return false;
        } else {
            passwordConfirmationFeedback.style.display = 'none';
            return true;
        }
    }

    password_Input.addEventListener('input', function () {
        checkPasswordLength();
    });

    password_confirmationinput.addEventListener('input', function () {
        checkPasswordMatch();
    });


});