import {browser} from 'k6/browser'
import {check, sleep} from 'k6'
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export const options = {
    scenarios: {
        k6_demo: {
            executor: 'constant-vus',
            vus: 10,
            duration: '20s',
            options: {
                browser: {
                    type: 'chromium'
                }
            }
        }
    },
    thresholds: {
        iteration_duration: ['avg>2000']
    }
} 

export default async function () {
    const page = await browser.newPage()

    await page.goto("https://www.google.com")

    let value = await page.title()

    check(value, {
        "check value: ": v => v === "Google",
    })

    sleep(1)
}

export function handleSummary(data) {
return {
    './reports/report.html': htmlReport(data),
    stdout: textSummary(data)
}
}
