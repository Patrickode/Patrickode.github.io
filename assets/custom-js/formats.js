/**
 * Use lit-html @ https://marketplace.visualstudio.com/items?itemName=bierner.lit-html to better view content overrides.
 * 
 * This function is needed to prevent null errors; it's basically a for loop that concats all the noninterpolated parts
 * with the interpolated parts, leaving the string unchanged. The ?? is for the end when index goes out of interpolated's bounds;
 * no more interpolated things to insert.
 * 
 * See https://www.zachsnoek.com/blog/understanding-tagged-template-literals-in-javascript#tagged-template-literals.
 */
let html = (notInterpolated, ...interpolated) => notInterpolated.reduce(
    (total, current, index) => total += current + (interpolated[index] ?? ""),
    ""
);

/**
 * A container for formats tailored to particular opportunities.
 * 
 * "@updated" is for updates to the format itself—such as its overrides to feature content—rather than external updates like 
 * changes to the resume the format's rCode points to.
 * 
 * Put a ++ at the start of content overrides to instead append to what's already there.
 */
export const formats = {

    //#region Special/Dev Formats
    /**
     * Format used when no other format is specified
     * 
     * NOTE: tailored-format.js references this rCode during resume replacement, so it needs to match the code in index.html.
     * @created 2021-2-26
     * @updated 2023-9-26
     */
    default: { resumeID: "1earLmYYhSdNJdLAIvhX8dx3Uaobzty8C", features: null },
    /**
     * Special format used when absolutely zero customization is desired
     * @created 2023-9-26
     * @updated N/A
     */
    none: { resumeID: null, features: null },
    /**
     * Format used for testing the functionality of format substitution
     * @created 2021-4-21
     * @updated 2023-8-31
     */
    test: {
        resumeID: "1earLmYYhSdNJdLAIvhX8dx3Uaobzty8C", features: [
            {
                id: "divinity", content: html`
                <p>This is a test of detail overriding. Now resuming your regularly scheduled content.</p>
                <p>Divinity is a fantasy story series about gods, angels, demons, and the war between
                them. <strong>I write it in my spare time out of passion.</strong> Divinity was initially
                conceived some time in 2012, and it's grown just as much as I have since. <strong> I built 
                this website from the ground up so I could put Divinity's chapters online, to share them with 
                others more easily.</strong></p>
                <ul>
                    <li>
                        <strong>
                            I got fed up with the lack of customization I had on WordPress and other
                            website builders,
                        </strong>
                        so using my designs from those sites as my specification,
                        <strong>I built this website starting from an empty html file.</strong>
                    </li>
                    <li>
                        I didn't want to copy and paste my work into the website every time I updated a
                        chapter, so I embedded the source google doc into the site.
                        <strong>
                            While trying to figure out how to style that embedded doc with CSS, I
                            discovered a way to extract that doc's contents and insert it into the
                            website by itself with a CORS request;
                        </strong>
                        this allows for live updates <em>and</em> full freedom with CSS.
                    </li>
                    <li>
                        I added Bookmark and Light/Dark mode buttons, programmed with JavaScript, to
                        make reading as convenient as I could for visitors.
                    </li>
                </ul>
                `
            },
            { id: "vr-independent-study", content: null },
            { id: "livewire-lifesaver", content: null },
        ]
    },
    //#endregion

    /**
     * @created 2024-4-16
     * @updated N/A
     */
    "hello-games": {
        resumeID: "1XchEZrotDKKKEgzUV7PT2YX0JSPN37Z6", features: [
            { id: "nasa-gpba", content: null },
            { id: "remember-wonder", content: null },
            { id: "livewire-lifesaver", content: null },
        ]
    },
    /**
     * @created 2024-4-16
     * @updated N/A
     */
    "apl": {
        resumeID: "1gZBaD3ibW71vqXAaALjXg8OEoQOPa24M", features: [
            { id: "nasa-gpba", content: null },
            { id: "taste-of-culture", content: null },
            { id: "remember-wonder", content: null },
        ]
    },
    /**
     * @created 2024-3-19
     * @updated 2024-4-16
     */
    "netflix": {
        resumeID: "1_MblCRB2f3258OGBP3M-NtX6UaZgC19d", features: [
            { id: "remember-wonder", content: null },
            { id: "nasa-gpba", content: null },
            { id: "taste-of-culture", content: null },
        ]
    },
    /**
     * @created 2024-3-19
     * @updated N/A
     */
    "applovin": {
        resumeID: "1dVCXOJ8-Z5NXqnUdKfbaYXDLrywdJ58s", features: null
    },
    /**
     * @created 2024-2-01
     * @updated 2024-4-16
     */
    "rockstar": {
        resumeID: "15fJBLUqvL7gP1J-OVpMdkBJl4ZW512X8", features: [
            { id: "remember-wonder", content: null },
            { id: "nasa-gpba", content: null },
            { id: "taste-of-culture", content: null },
        ]
    },
    /**
     * @created 2024-1-12
     * @updated N/A
     */
    "respawn": {
        resumeID: "1OT4py-FT6gUTALSS0LVWhoJxp9N1N8qn", features: [
            { id: "remember-wonder", content: null },
            { id: "changeling", content: null },
            { id: "taste-of-culture", content: null },
            { id: "livewire-lifesaver", content: null },
        ]
    },
    /**
     * @created 2024-1-12
     * @updated N/A
     */
    "NextGen": {
        resumeID: "1CGg2CypCV7GSQKN28nYDMqVUVi3RjM3L", features: [
            { id: "nasa-gpba", content: null },
            { id: "taste-of-culture", content: null },
            { id: "livewire-lifesaver", content: null },
            { id: "remember-wonder", content: null },
        ]
    },
    /**
     * @created 2024-1-12
     * @updated N/A
     */
    "wrp": {
        resumeID: "1Voz5fmxR6wncdLvV1vfia-9okcBxiIqy", features: [
            { id: "nasa-gpba", content: null },
            { id: "taste-of-culture", content: null },
            { id: "livewire-lifesaver", content: null },
            { id: "remember-wonder", content: null },
        ]
    },
    /**
     * @created 2023-11-15
     * @updated N/A
     */
    "iron-galaxy": {
        resumeID: "1tFd4VP1Tt_AjZtCVsMhLDnmmyghidosr", features: [
            { id: "nasa-gpba", content: null },
            { id: "remember-wonder", content: null },
            { id: "taste-of-culture", content: null },
            { id: "livewire-lifesaver", content: null },
        ]
    },
    /**
     * @created 2023-3-18
     * @updated N/A
     */
    "gdc2023": {
        resumeID: "1apJGHbuK6yFEbQRbZfqGPyK8QifoAm3u", features: null
    },
    /**
     * @created 2022-4-12
     * @updated 2022-4-18
     */
    "thatdamngoat": {
        resumeID: "1C8_CPWsFKx2K4GbutkKKHkIX3CqqLrI7", features: [
            { id: "livewire-lifesaver", content: null },
            { id: "vr-independent-study", content: null },
            { id: "changeling", content: null },
        ]
    },
    /**
     * @created 2022-2-28
     * @updated 2022-2-28
     */
    "epicgames": {
        resumeID: "1dYwGAgilw0cqN1pPJpA-ZtiJ-VjymPBr", features: [
            { id: "changeling", content: null },
            { id: "livewire-lifesaver", content: null },
            { id: "vr-independent-study", content: null },
            { id: "divinity", content: null },
        ]
    },
    /**
     * @created 2021-4-27
     * @updated N/A
     */
    "changeling": { resumeID: "1ZyPJy2a4LXnooWwJhXeA-SSlaDCACC4G", features: null },

};
Object.freeze(formats);