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
     * @created 2021-2-26
     * @updated 2023-9-26
     */
    default: { resumeID: "1earLmYYhSdNJdLAIvhX8dx3Uaobzty8C", features: null },
    
    //#region Special/Dev Formats
    /**
     * Special format used for testing; will result in invalid resume URLs\
     * (`features: null` *is a valid "don't add/adjust anything" value*)
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
     * @created 2025-6-23
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
     * @created 2025-6-2
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
     * @created 2025-3-20
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
     * @created 2025-1-1
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
     * @created 2025-1-1
     * @updated 2025-3-18
     */
    "ibm": {
        resumeID: "1V-nrlqD7tbo0uTK0oEf4UOWYraea14pQ", features: [
            { id: "remember-wonder", content: null },
            { id: "taste-of-culture", content: null },
            { id: "nasa-gpba", content: null },
        ]
    },
    /**
     * @created 2024-7-30
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
     * @created 2024-6-19
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