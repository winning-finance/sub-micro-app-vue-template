const {
  installDependencies,
  printMessage,
  validatePort
} = require('./utils')
const pkg = require('./package.json')

const templateVersion = pkg.version

const { addTestAnswers } = require('./scenarios')

module.exports = {
  metalsmith: {
    // When running tests for the template, this adds answers for the selected scenario
    before: addTestAnswers
  },
  helpers: {
    if_or (v1, v2, options) {
      if (v1 || v2) {
        return options.fn(this)
      }

      return options.inverse(this)
    },
    template_version () {
      return templateVersion
    }
  },

  prompts: {
    name: {
      when: 'isNotTest',
      type: 'string',
      required: true,
      message: 'Project name'
    },
    chineseName: {
      when: 'isNotTest',
      type: 'string',
      required: true,
      message: 'input the chineseName of the project',
      default: '页面标题'
    },
    description: {
      when: 'isNotTest',
      type: 'string',
      required: false,
      message: 'Project description',
      default: 'Vue.js project for micro sub app'
    },
    author: {
      when: 'isNotTest',
      type: 'string',
      message: 'Author'
    },
    router: {
      when: 'isNotTest',
      type: 'confirm',
      message: 'use vue-router?'
    },
    store: {
      when: 'isNotTest',
      type: 'confirm',
      message: 'use vuex?'
    },
    port: {
      when: 'isNotTest',
      type: 'number',
      required: true,
      message: 'webpack-dev-server port?',
      default: 3000,
      validate: validatePort
    },
    autoInstall: {
      when: 'isNotTest',
      type: 'confirm',
      message: 'auto install dependencies?',
      default: true
    }
  },
  filters: {
    'src/router/**/*': 'router',
    'src/store/**/*': 'store'
  },
  complete: function (data, { chalk }) {
    const green = chalk.green
    if (data.autoInstall) {
      installDependencies(process.cwd(), green)
        .then(() => {
          printMessage(data, green)
        })
        .catch(e => {
          console.log(chalk.red('Error:'), e)
        })
    } else {
      printMessage(data, chalk)
    }
  }
}
