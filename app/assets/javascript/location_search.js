let map;
let marker;

window.initMap = function () {
    document.addEventListener("turbo:load", function () {
        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 20.5937, lng: 78.9629 },
            zoom: 5,
        });

        initAutocomplete();

        const button = document.getElementById("get-location");
        if (button) {
            button.addEventListener("click", () => {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const lat = position.coords.latitude;
                            const lon = position.coords.longitude;
                            const latLng = new google.maps.LatLng(lat, lon);

                            map.setCenter(latLng);
                            map.setZoom(18);

                            // Ensure the elements are loaded before setting the values
                            const latitudeInput = document.getElementById("latitude");
                            const longitudeInput = document.getElementById("longitude");

                            if (latitudeInput && longitudeInput) {
                                latitudeInput.value = lat;
                                longitudeInput.value = lon;
                            }

                            const geocoder = new google.maps.Geocoder();
                            geocoder.geocode({ location: latLng }, (results, status) => {
                                if (status === "OK" && results[0]) {
                                    const components = results[0].address_components;

                                    let sublocality = "";
                                    let locality = "";
                                    let state = "";
                                    let postal = "";
                                    let country = "";

                                    components.forEach((comp) => {
                                        if (comp.types.includes("sublocality") || comp.types.includes("sublocality_level_1")) {
                                            sublocality = comp.long_name;
                                        }
                                        if (comp.types.includes("locality")) {
                                            locality = comp.long_name;
                                        }
                                        if (comp.types.includes("administrative_area_level_1")) {
                                            state = comp.long_name;
                                        }
                                        if (comp.types.includes("postal_code")) {
                                            postal = comp.long_name;
                                        }
                                        if (comp.types.includes("country")) {
                                            country = comp.long_name;
                                        }
                                    });

                                    const address = [sublocality, locality, state, postal, country]
                                        .filter((part) => part.length > 0)
                                        .join(", ");

                                    // Ensure searchInput is available before trying to set it
                                    const searchInput = document.getElementById("searchInput");
                                    if (searchInput) {
                                        searchInput.value = address;
                                    } else {
                                        console.warn("searchInput not found.");
                                    }
                                } else {
                                    alert("No address found");
                                }
                            });
                        },
                        (error) => {
                            alert(`Error: ${error.message}`);
                        },
                        { enableHighAccuracy: true }
                    );
                } else {
                    alert("Geolocation is not supported by your browser.");
                }
            });
        } else {
            console.warn("Get location button not found.");
        }
    });
};

function initAutocomplete() {
    const input = document.getElementById("searchInput");
    if (!input || !google.maps.places) {
        console.error("Autocomplete input not found or Google Places not loaded.");
        return;
    }

    const autocomplete = new google.maps.places.Autocomplete(input, {
        types: ["geocode"],
    });

    autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place || !place.geometry) {
            console.error("No details available for input: '" + input.value + "'");
            return;
        }

        input.value = place.formatted_address || input.value;
    });
}


document.addEventListener("turbo:load", function () {
    // Phone input setup
    const input = document.querySelector("#phone");
    if (input) {
        const iti = window.intlTelInput(input, {
            initialCountry: "us",
            separateDialCode: true,
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
        });

        input.addEventListener("countrychange", function () {
            const element = document.querySelector(".iti__selected-dial-code");
            if (element) {
                const countryCode = element.textContent.trim();
                const countryCodeInput = document.getElementById("country_code");
                if (countryCodeInput) countryCodeInput.value = countryCode;
            }
        });

        document.querySelector("form").addEventListener("submit", function () {
            const element = document.querySelector(".iti__selected-dial-code");
            if (element) {
                const countryCode = element.textContent.trim();
                const countryCodeInput = document.getElementById("country_code");
                if (countryCodeInput) countryCodeInput.value = countryCode;
            }

            console.log("values", iti.getNumber());
        });
    }

    // Password validation
    const passwordInput = document.getElementById('password_Input');
    const passwordFeedback = document.getElementById('passwordLengthFeedback');
    const passwordConfirmInput = document.getElementById('password_confirmationinput');
    const passwordConfirmFeedback = document.getElementById('passwordConfirmationFeedback');

    if (passwordInput && passwordConfirmInput) {
        function checkPasswordLength() {
            const isValid = passwordInput.value.length >= 6;
            if (passwordFeedback) passwordFeedback.style.display = isValid ? 'none' : 'block';
            return isValid;
        }

        function checkPasswordMatch() {
            const doMatch = passwordInput.value === passwordConfirmInput.value;
            if (passwordConfirmFeedback) passwordConfirmFeedback.style.display = doMatch ? 'none' : 'block';
            return doMatch;
        }

        passwordInput.addEventListener('input', checkPasswordLength);
        passwordConfirmInput.addEventListener('input', checkPasswordMatch);
    }
});

function isNumberKey(evt) {
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode == 32 || charCode == 46) return false;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
    return true;
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const fields = document.querySelectorAll('.validate-me');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('password_confirmation');
    const emailField = document.querySelector('input[type="email"]');

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    form.addEventListener('submit', function (event) {
        let valid = true;

        // Required field check
        fields.forEach(field => {
            field.classList.remove('is-valid', 'is-invalid');

            // Email field: check format
            if (field === emailField) {
                if (field.value.trim() === '' || !isValidEmail(field.value.trim())) {
                    field.classList.add('is-invalid');
                    valid = false;
                } else {
                    field.classList.add('is-valid');
                }
            } else {
                // Regular field check
                if (field.value.trim() === '') {
                    field.classList.add('is-invalid');
                    valid = false;
                } else {
                    field.classList.add('is-valid');
                }
            }
        });

        // Password match check
        if (password.value !== confirmPassword.value) {
            password.classList.remove('is-valid');
            confirmPassword.classList.remove('is-valid');
            password.classList.add('is-invalid');
            confirmPassword.classList.add('is-invalid');
            valid = false;
        }

        if (!valid) {
            event.preventDefault();
        }
    });
});
