const puppeteer = require("puppeteer");

const generateBarangayForm = async (html = "") => {

    const browser = await puppeteer.launch({
        // https://stackoverflow.com/questions/59979188/error-failed-to-launch-the-browser-process-puppeteer
        // Setting Up Chrome Linux Sandbox (Tab) and Install Debian/Ubuntu missing dependencies
        // https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md/#chrome-headless-doesnt-launch-on-unix
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--allow-file-access-from-files",
            "--enable-local-file-accesses",
        ],
    });

    const page = await browser.newPage();
    await page.emulateMediaType("print");

    await page.setContent(html);
    const buffer = await page.pdf({
        format: "A4",
        headless: false,
        margin: {
            bottom: 40,
            left: 50,
            right: 50,
            top: 40,
        },
        printBackground: true,
    });

    await page.close();
    await browser.close();

    return buffer;
};


// Modularized Functions
module.exports = { generateBarangayForm };