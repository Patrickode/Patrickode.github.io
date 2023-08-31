/*
Use lit-html @ https://marketplace.visualstudio.com/items?itemName=bierner.lit-html to better view content overrides.
*/

/**
 * A container for formats tailored to particular opportunities.
 * 
 * "@updated" is for updates to the format itself, not updates to the resume the format's rCode points to.
 */
export const formats = {

    //#region Special/Dev Formats
    /**
     * Format used when no other format is specified
     * @created 2021-2-26
     * @updated N/A
     */
    default: { rCode: "1hYX119ocKAYXRaFw7V9kkYdolafDP59u", formats: undefined },
    /**
     * Format used for testing the functionality of format substitution
     * @created 2021-4-21
     * @updated 2023-8-31
     */
    test: {
        rcode: "1hYX119ocKAYXRaFw7V9kkYdolafDP59u", formats: [
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
            { id: "vr-independent-study", content: undefined },
            { id: "livewire-lifesaver", content: undefined },
        ]
    },
    //#endregion

    /**
     * @created 2023-3-18
     * @updated N/A
     */
    gdc2023: {
        rcode: "1apJGHbuK6yFEbQRbZfqGPyK8QifoAm3u", formats: undefined
    },
    /**
     * @created 2022-4-12
     * @updated 2022-4-18
     */
    thatdamngoat: {
        rCode: "1C8_CPWsFKx2K4GbutkKKHkIX3CqqLrI7", formats: [
            { id: "livewire-lifesaver", content: undefined },
            { id: "vr-independent-study", content: undefined },
            { id: "changeling", content: undefined },
        ]
    },
    /**
     * @created 2022-2-28
     * @updated 2022-2-28
     */
    epicgames: {
        rCode: "1dYwGAgilw0cqN1pPJpA-ZtiJ-VjymPBr", formats: [
            { id: "changeling", content: undefined },
            { id: "livewire-lifesaver", content: undefined },
            { id: "vr-independent-study", content: undefined },
            { id: "divinity", content: undefined },
        ]
    },
    /**
     * @created 2021-4-27
     * @updated N/A
     */
    changeling: { rCode: "1ZyPJy2a4LXnooWwJhXeA-SSlaDCACC4G", formats: undefined },

};
Object.freeze(formats);