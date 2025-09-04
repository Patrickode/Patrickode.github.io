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
 * ! **Each of these "keys" should be LOWERCASE ONLY; this is so the query string in the URL can be case insensitive (by casting to lowercase).** !\
 *       (*This, of course, means they can be capitalized however on the resume itself. Just not the keys in this file.*)
 * 
 * &emsp; "@updated" is for updates to the format itself; a new resumeID, a different order, etc.\
 * &emsp; External edits, like changes to the document the resumeID points to, aren't recorded here.
 * 
 * &emsp; Put a `+<`, `+>`, or `++` at the start of `content:` overrides to instead prepend/append to what's already there.
 */
export const formats = {

    /**
     * Format used when no other format is specified
     * - **NOTE:** `tailored-format.js` references the following `resumeID` during resume\
     * replacement, so it *must* match the one in `index.html#resume-preview`'s URL.
     * @created 2021-02-26
     * @updated 2023-09-26
     */
    default: { resumeID: "1earLmYYhSdNJdLAIvhX8dx3Uaobzty8C", features: null },

    //#region Special/Dev Formats
    /**
     * Special format used for testing; will result in invalid resume URLs\
     * (`features: null` *is a valid "don't add/adjust anything" value*)
     * @created 2023-09-26
     * @updated N/A
     */
    none: { resumeID: null, features: null },
    /**
     * Format used for testing the functionality of format substitution
     * @created 2021-04-21
     * @updated 2023-08-31
     */
    test: {
        resumeID: "1earLmYYhSdNJdLAIvhX8dx3Uaobzty8C", features: [
            {
                id: "divinity", content: html`+<
                <p>This is a test of detail overriding. Now resuming your regularly scheduled content.</p>
                `
            },
            { id: "vr-independent-study", content: null },
            { id: "livewire-lifesaver", content: null },
        ]
    },
    //#endregion

    /**
     * @created 2024-04-16
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
     * @created 2024-03-19
     * @updated N/A
     */
    "applovin": {
        resumeID: "1dVCXOJ8-Z5NXqnUdKfbaYXDLrywdJ58s", features: null
    },
    /**
     * @created 2021-04-27
     * @updated N/A
     */
    "changeling": {
        resumeID: "1ZyPJy2a4LXnooWwJhXeA-SSlaDCACC4G", features: null
    },
    /**
     * @created 2025-09-04
     * @updated 2022-02-28
     */
    "double-fine": {
        resumeID: "12YpB5kFQOPxPLQx7sPa_5EimJ55dZydj", features: [
            { id: "remember-wonder", content: null },
            { id: "taste-of-culture", content: null },
            { id: "nasa-gpba", content: null },
            { id: "changeling", content: null },
            { id: "livewire-lifesaver", content: null },
        ]
    },
    /**
     * @created 2022-02-28
     * @updated 2022-02-28
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
     * @created 2023-03-18
     * @updated N/A
     */
    "gdc2023": {
        resumeID: "1apJGHbuK6yFEbQRbZfqGPyK8QifoAm3u", features: null
    },
    /**
     * @created 2024-07-30
     * @updated N/A
     */
    "grumpyface": {
        resumeID: "1pO-Z_ChlhbUD2QWvDfvDsISWZwHGw_JO", features: [
            { id: "remember-wonder", content: null },
            { id: "taste-of-culture", content: null },
            { id: "nasa-gpba", content: null },
            { id: "livewire-lifesaver", content: null },
        ]
    },
    /**
     * @created 2024-04-16
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
     * @created 2025-01-01
     * @updated 2025-03-18
     */
    "ibm": {
        resumeID: "1V-nrlqD7tbo0uTK0oEf4UOWYraea14pQ", features: [
            { id: "remember-wonder", content: null },
            { id: "taste-of-culture", content: null },
            { id: "nasa-gpba", content: null },
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
     * @created 2025-03-20
     * @updated N/A
     */
    "medtelligent": {
        resumeID: "1gIzZaXR9ULATM7ZBEq8ydWEinHVVJ3Gs", features: [
            { id: "remember-wonder", content: null },
            { id: "nasa-gpba", content: null },
            { id: "livewire-lifesaver", content: null },
        ]
    },
    /**
     * @created 2024-03-19
     * @updated 2024-04-16
     */
    "netflix": {
        resumeID: "1_MblCRB2f3258OGBP3M-NtX6UaZgC19d", features: [
            { id: "remember-wonder", content: null },
            { id: "nasa-gpba", content: null },
            { id: "taste-of-culture", content: null },
        ]
    },
    /**
     * @created 2024-01-12
     * @updated N/A
     */
    "nextgen": {
        resumeID: "1CGg2CypCV7GSQKN28nYDMqVUVi3RjM3L", features: [
            { id: "nasa-gpba", content: null },
            { id: "taste-of-culture", content: null },
            { id: "livewire-lifesaver", content: null },
            { id: "remember-wonder", content: null },
        ]
    },
    /**
     * @created 2025-01-01
     * @updated N/A
     */
    "nintendo": {
        resumeID: "1Zu2Mo1pdzmqCCPOkJM1A2iFYFm_xX_dW", features: [
            { id: "remember-wonder", content: null },
            { id: "nasa-gpba", content: null },
            { id: "livewire-lifesaver", content: null },
        ]
    },
    /**
     * @created 2024-01-12
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
     * @created 2024-02-01
     * @updated 2025-08-01
     */
    "rockstar": {
        resumeID: "15fJBLUqvL7gP1J-OVpMdkBJl4ZW512X8", features: [
            { id: "remember-wonder", content: null },
            { id: "taste-of-culture", content: null },
            { id: "nasa-gpba", content: null },
            { id: "livewire-lifesaver", content: null },
        ]
    },
    /**
     * @created 2025-06-23
     * @updated N/A
     */
    "rubrik": {
        resumeID: "1KgIdJww_jJhPEMWdCT2x-vWmCHfhkDJh", features: [
            { id: "remember-wonder", content: null },
            { id: "taste-of-culture", content: null },
            { id: "nasa-gpba", content: null },
        ]
    },
    /**
     * @created 2025-06-02
     * @updated N/A
     */
    "sigma": {
        resumeID: "18NuDhy97SNPtxUZoop0anHsuXylYiKCw", features: [
            { id: "remember-wonder", content: null },
            { id: "taste-of-culture", content: null },
            { id: "nasa-gpba", content: null },
        ]
    },
    /**
     * @created 2022-04-12
     * @updated 2022-04-18
     */
    "thatdamngoat": {
        resumeID: "1C8_CPWsFKx2K4GbutkKKHkIX3CqqLrI7", features: [
            { id: "livewire-lifesaver", content: null },
            { id: "vr-independent-study", content: null },
            { id: "changeling", content: null },
        ]
    },
    /**
     * @created 2024-06-19
     * @updated N/A
     */
    "vizmoo": {
        resumeID: "1pO-Z_ChlhbUD2QWvDfvDsISWZwHGw_JO", features: [
            { id: "nasa-gpba", content: null },
            { id: "changeling", content: null },
            { id: "livewire-lifesaver", content: null },
        ]
    },
    /**
     * @created 2024-01-12
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

};
Object.freeze(formats);