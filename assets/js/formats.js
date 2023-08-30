export const formats = {

    /**
     * Test Format
     * @created 2023-8-30
     * @updated N/A
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
    /**
     * Default Format
     * @created 2023-8-30
     * @updated N/A
     */
    default: { rCode: "1hYX119ocKAYXRaFw7V9kkYdolafDP59u", formats: undefined },

};
Object.freeze(formats);