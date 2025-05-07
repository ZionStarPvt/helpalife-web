import { Application } from "@hotwired/stimulus"

const application = Application.start()

// Configure Stimulus development experience
application.debug = false
window.Stimulus   = application

export { application }
import "@hotwired/turbo-rails"

import * as bootstrap from "bootstrap"

// Re-initialize dropdowns after Turbo loads
document.addEventListener('turbo:load', () => {
    document.querySelectorAll('[data-bs-toggle="dropdown"]').forEach((dropdownToggleEl) => {
        new bootstrap.Dropdown(dropdownToggleEl)
    })
})
