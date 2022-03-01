const jsdom = require('jsdom')
const request = require('request')
const NodeCache = require('node-cache')
const logger = require('./logger')
const { JSDOM } = jsdom

const SECONDS_PER_MINUTE = 60
const SECONDS_PER_HOUR = SECONDS_PER_MINUTE * 60

// Refresh cache every hour
const cache = new NodeCache({
  stdTTL: SECONDS_PER_HOUR,
  checkperiod: SECONDS_PER_MINUTE
})

const getUrl = namespace => {
  if (namespace === 'dev') {
    // Dev
    const devUrl = 'https://www.dev.nav.no/person/'
    return `https://dekoratoren.dev.nav.no/?breadcrumbs=${JSON.stringify([
      {
        url: devUrl + 'dittnav/',
        title: 'Ditt NAV'
      },
      {
        url: devUrl + 'personopplysninger/',
        title: 'Personopplysninger'
      },
      {
        url: devUrl + 'pdl-fullmakt-ui/',
        title: 'Fullmakt'
      }
    ])}`
  } else {
    if (namespace !== 'p') {
    // Dev
      const devUrl = 'https://www-q0.nav.no/person/'
      return `https://appres-${namespace}.nav.no/common-html/v4/navno?header-withmenu=true&styles=true&scripts=true&footer-withmenu=true&skiplinks=true&megamenu-resources=true&breadcrumbs=${JSON.stringify([
      {
        url: devUrl + 'dittnav/',
        title: 'Ditt NAV'
      },
      {
        url: devUrl + 'personopplysninger/',
        title: 'Personopplysninger'
      },
      {
        url: devUrl + 'pdl-fullmakt-ui/',
        title: 'Fullmakt'
      }
    ])}`
    } else {
    // Prod
      const prodUrl = 'https://www.nav.no/person/'
      return `https://appres.nav.no/common-html/v4/navno?header-withmenu=true&styles=true&scripts=true&footer-withmenu=true&skiplinks=true&megamenu-resources=true&breadcrumbs=${JSON.stringify([
      {
        url: prodUrl + 'dittnav/',
        title: 'Ditt NAV'
      },
      {
        url: prodUrl + 'personopplysninger/',
        title: 'Personopplysninger'
      },
      {
        url: prodUrl + 'pdl-fullmakt-ui/',
        title: 'Fullmakt'
      }
    ])}`
    }
  }
}

const getDecorator = namespace =>
  new Promise((resolve, reject) => {
    const decorator = cache.get(namespace)
    if (decorator) {
      resolve(decorator)
    } else {
      request(getUrl(namespace), (error, response, body) => {
        if (!error && response.statusCode >= 200 && response.statusCode < 400) {
          const { document } = new JSDOM(body).window
          const prop = 'innerHTML'
          const data = {
            NAV_SKIPLINKS: document.getElementById('skiplinks')[prop],
            NAV_SCRIPTS: document.getElementById('scripts')[prop],
            NAV_STYLES: document.getElementById('styles')[prop],
            NAV_HEADING: document.getElementById('header-withmenu')[prop],
            NAV_FOOTER: document.getElementById('footer-withmenu')[prop],
            MEGAMENU_RESOURCES: document.getElementById('megamenu-resources')[prop]
          }
          cache.set(namespace, data)
          logger.info(`${namespace}: Creating cache`)
          resolve(data)
        } else {
          reject(new Error(error))
        }
      })
    }
  })

module.exports = getDecorator
