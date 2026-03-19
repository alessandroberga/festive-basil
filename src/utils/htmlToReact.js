import React, { useEffect, useRef } from 'react';
import parse, { domToReact } from 'html-react-parser';
import _ from 'lodash';

function ScriptTag({ children, ...attrs }) {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const script = document.createElement('script');
        Object.entries(attrs).forEach(([key, value]) => {
            if (value != null) {
                script.setAttribute(key, value);
            }
        });

        const content = React.Children.toArray(children).join('');
        if (content) {
            script.text = content;
        }

        container.appendChild(script);
        return () => {
            if (container.contains(script)) {
                container.removeChild(script);
            }
        };
    }, [attrs, children]);

    return <span ref={containerRef} />;
}

export default function(html) {
    if (!html) {
        return null;
    }

    const options = {
        replace: domNode => {
            if (domNode.name === 'script') {
                const attrs = domNode.attribs || {};
                if (!_.isEmpty(domNode.children)) {
                    return (
                        <ScriptTag {...attrs}>
                            {domToReact(domNode.children, options)}
                        </ScriptTag>
                    );
                }
                return <ScriptTag {...attrs} />;
            }
        }
    };

    return parse(html, options);
};
