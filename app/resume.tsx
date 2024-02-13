import React from "react";

export default function Resume() {
    return (
        <div>
            <p>Download Here <a href="/Master-Resume.pdf" download="Master-Resume">Download Here</a></p>
            <iframe
                src="/Master-Resume.pdf"
                width="100%"
                height="600px"
                style={{border: 'none'}}
                title="Resume">
            </iframe>
        </div>
    );
}
