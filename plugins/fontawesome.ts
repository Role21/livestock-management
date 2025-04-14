// import { library, config } from '@fortawesome/fontawesome-svg-core'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import { fas } from '@fortawesome/free-solid-svg-icons'
// import '@fortawesome/fontawesome-svg-core/styles.css'

// config.autoAddCss = false
// library.add(fas)

// export default defineNuxtPlugin((nuxtApp) => {
//   nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon)
// })


// plugins/fontawesome.ts

import { config, library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

// ✅ Import FontAwesome styles
import '@fortawesome/fontawesome-svg-core/styles.css'

// ❗️ Disable automatic CSS injection (we manually import it above)
config.autoAddCss = false

// ✅ Add all solid icons
library.add(fas)

// ✅ Register the component globally
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon)
})
