import "dotenv/config";

export const config = {
    runner: 'local',
    specs: [
        '../test/specs/**/*.js'
    ],
    exclude: [],
    maxInstances: 1,
    capabilities: [
        {
            browserName: "firefox",
            'moz:firefoxOptions': {
                args: [...((process.env.HEADLESS === "true") ? [ '--headless'] : ["--width=1280", "--height=720"])]
            }
        }
    ],

    logLevel: 'info',
    bail: 0,
    baseUrl: "https://www.saucedemo.com",
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'mocha',
    
    reporters: [["allure", {
        outputDir: "allure-results"
    }]],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
}
